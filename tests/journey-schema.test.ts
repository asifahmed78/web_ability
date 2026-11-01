import assert from "node:assert/strict";
import test from "node:test";
import { parseJourney } from "../src/core/journey-schema";

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

test("rejects public hosts before browser startup", () => {
  assert.throws(() => parseJourney({ ...validJourney, baseUrl: "https://example.com" }));
});

test("rejects URL credentials", () => {
  assert.throws(() => parseJourney({ ...validJourney, baseUrl: "http://user:secret@localhost:3000" }));
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
