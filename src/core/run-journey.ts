import AxeBuilder from "@axe-core/playwright";
import { chromium, type Page } from "playwright";
import type { Journey, JourneyStep } from "./journey-schema";

export interface Finding {
  id: string;
  impact: string | null;
  help: string;
  helpUrl: string;
  description: string;
  nodes: Array<{ target: string[]; summary: string | null }>;
}

export interface StepResult {
  name: string;
  type: JourneyStep["type"];
  status: "passed" | "failed";
  url: string | null;
  durationMs: number;
  violations: Finding[];
  error?: string;
}

export interface JourneyReport {
  tool: "webability";
  schemaVersion: 1;
  journey: string;
  baseUrl: string;
  startedAt: string;
  durationMs: number;
  status: "passed" | "failed";
  summary: { steps: number; passedSteps: number; failedSteps: number; violations: number };
  steps: StepResult[];
}

async function executeStep(page: Page, journey: Journey, step: JourneyStep): Promise<void> {
  const timeout = journey.timeoutMs;
  switch (step.type) {
    case "goto": {
      const target = new URL(step.path, journey.baseUrl);
      if (target.origin !== new URL(journey.baseUrl).origin) {
        throw new Error("Navigation outside the journey's local origin is not allowed.");
      }
      await page.goto(target.href, { waitUntil: "domcontentloaded", timeout });
      break;
    }
    case "click":
      await page.locator(step.selector).click({ timeout });
      break;
    case "fill":
      await page.locator(step.selector).fill(step.value, { timeout });
      break;
    case "press":
      await page.locator(step.selector).press(step.key, { timeout });
      break;
    case "expect-visible":
      await page.locator(step.selector).waitFor({ state: "visible", timeout });
      break;
  }
}

async function scanPage(page: Page): Promise<Finding[]> {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
    .analyze();

  return results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact ?? null,
    help: violation.help,
    helpUrl: violation.helpUrl,
    description: violation.description,
    nodes: violation.nodes.map((node) => ({
      target: node.target.map(String),
      summary: node.failureSummary ?? null,
    })),
  }));
}

export async function runJourney(journey: Journey): Promise<JourneyReport> {
  const startedAt = new Date().toISOString();
  const started = Date.now();
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const steps: StepResult[] = [];

  try {
    await page.goto(journey.baseUrl, { waitUntil: "domcontentloaded", timeout: journey.timeoutMs });

    for (const step of journey.steps) {
      const stepStarted = Date.now();
      try {
        await executeStep(page, journey, step);
        const violations = journey.scanAfterEachStep ? await scanPage(page) : [];
        steps.push({
          name: step.name,
          type: step.type,
          status: "passed",
          url: page.url(),
          durationMs: Date.now() - stepStarted,
          violations,
        });
      } catch (error) {
        steps.push({
          name: step.name,
          type: step.type,
          status: "failed",
          url: page.url() || null,
          durationMs: Date.now() - stepStarted,
          violations: [],
          error: error instanceof Error ? error.message : "Unknown step error",
        });
        break;
      }
    }
  } finally {
    await browser.close();
  }

  const failedSteps = steps.filter((step) => step.status === "failed").length;
  const violations = steps.reduce((total, step) => total + step.violations.length, 0);

  return {
    tool: "webability",
    schemaVersion: 1,
    journey: journey.name,
    baseUrl: journey.baseUrl,
    startedAt,
    durationMs: Date.now() - started,
    status: failedSteps > 0 ? "failed" : "passed",
    summary: {
      steps: steps.length,
      passedSteps: steps.length - failedSteps,
      failedSteps,
      violations,
    },
    steps,
  };
}
