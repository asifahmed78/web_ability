import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { ZodError } from "zod";
import { parseJourney } from "./core/journey-schema";
import { runJourney } from "./core/run-journey";

function usage(): never {
  console.error("Usage: npm run webability -- run <journey.json> [--out <report.json>]");
  process.exit(2);
}

async function main(): Promise<void> {
  const [, , command, journeyPath, ...args] = process.argv;
  if (command !== "run" || !journeyPath) usage();

  let outputPath: string | undefined;
  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--out" && args[index + 1]) {
      outputPath = args[index + 1];
      index += 1;
    } else {
      usage();
    }
  }

  try {
    const raw = JSON.parse(await readFile(resolve(journeyPath), "utf8")) as unknown;
    const journey = parseJourney(raw);
    console.log(`\nWebAbility · ${journey.name}\nTarget: ${journey.baseUrl}\n`);
    const report = await runJourney(journey);

    for (const step of report.steps) {
      const icon = step.status === "passed" ? "✓" : "✗";
      console.log(`${icon} ${step.name} (${step.durationMs}ms)`);
      for (const finding of step.violations) {
        console.log(`  [${finding.impact ?? "unknown"}] ${finding.id}: ${finding.help}`);
      }
      if (step.error) console.error(`  ${step.error}`);
    }

    if (outputPath) {
      await writeFile(resolve(outputPath), `${JSON.stringify(report, null, 2)}\n`, "utf8");
      console.log(`\nJSON report written to ${resolve(outputPath)}`);
    }

    console.log(`\n${report.summary.passedSteps}/${report.summary.steps} steps passed · ${report.summary.violations} accessibility rule violations`);
    if (report.status === "failed" || report.summary.violations > 0) process.exitCode = 1;
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Invalid journey file:");
      for (const issue of error.issues) console.error(`- ${issue.path.join(".") || "journey"}: ${issue.message}`);
    } else {
      console.error(error instanceof Error ? error.message : "WebAbility could not complete the run.");
    }
    process.exitCode = 1;
  }
}

void main();
