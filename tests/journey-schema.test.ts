import assert from "node:assert/strict";
import test from "node:test";
import { createServer } from "node:http";
import { parseJourney } from "../src/core/journey-schema";
import { renderHtmlReport } from "../src/core/html-report";
import { runJourney } from "../src/core/run-journey";

const validJourney = {
  name: "Sample checkout",
  baseUrl: "http://127.0.0.1:3000",
  steps: [
    { type: "expect-visible", name: "Checkout heading", selector: "h1" },
    { type: "click", name: "Continue", selector: "button[type=submit]" },
  ],
};

test("accepts a valid local journey and applies defaults", () => {
  const journey = parseJourney(validJourney);
  assert.equal(journey.timeoutMs, 5_000);
  assert.equal(journey.scanAfterEachStep, true);
  assert.equal(journey.steps.length, 2);
});

test("accepts explicit keyboard focus assertions", () => {
  const journey = parseJourney({
    ...validJourney,
    steps: [{ type: "expect-focused", name: "Submit button receives focus", selector: "button" }],
  });
  assert.equal(journey.steps[0].type, "expect-focused");
});

test("rejects public hosts before browser startup", () => {
  assert.throws(() => parseJourney({ ...validJourney, baseUrl: "https://example.com" }));
});

test("rejects URL credentials", () => {
  assert.throws(() => parseJourney({ ...validJourney, baseUrl: "http://user:secret@localhost:3000" }));
});

test("rejects query strings and fragments in the target URL", () => {
  assert.throws(() => parseJourney({ ...validJourney, baseUrl: "http://localhost:3000/?token=secret" }));
  assert.throws(() => parseJourney({ ...validJourney, baseUrl: "http://localhost:3000/#private" }));
});

test("rejects unsupported keyboard keys", () => {
  assert.throws(() => parseJourney({
    ...validJourney,
    steps: [{ type: "press", name: "Press key", selector: "body", key: "F12" }],
  }));
});

test("rejects journeys with too many steps", () => {
  const steps = Array.from({ length: 31 }, (_, index) => ({
    type: "expect-visible" as const,
    name: `Step ${index}`,
    selector: "body",
  }));
  assert.throws(() => parseJourney({ ...validJourney, steps }));
});

test("runs a keyboard journey, detects an axe issue, and renders safe HTML", async () => {
  const server = createServer((_request, response) => {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    response.end(`<!doctype html><html lang="en"><head><title>Keyboard fixture</title></head><body><main><h1>Checkout</h1><label for="email">Email</label><input id="email" type="email"><button type="submit" aria-label="">Continue</button></main></body></html>`);
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    const journey = parseJourney({
      name: "Keyboard checkout",
      baseUrl: `http://127.0.0.1:${address.port}`,
      steps: [
        { type: "press", name: "Tab from email to submit", selector: "#email", key: "Tab" },
        { type: "expect-focused", name: "Submit button is focused", selector: "button" },
      ],
    });
    const report = await runJourney(journey);
    assert.equal(report.steps.length, 2, JSON.stringify(report.steps));
    assert.equal(report.steps[1].status, "passed");
    assert.ok(report.steps[1].violations.some((finding) => finding.id === "button-name"));
    assert.equal(report.status, "issues-found");

    const html = renderHtmlReport(report);
    assert.match(html, /Keyboard checkout/);
    assert.match(html, /button-name/);
    assert.match(html, /Submit button is focused/);
    assert.ok(!html.includes("<script>"));
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});
