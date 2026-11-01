import { z } from "zod";

const selector = z.string().trim().min(1).max(500);
const journeyStep = z.discriminatedUnion("type", [
  z.object({ type: z.literal("goto"), name: z.string().min(1).max(100), path: z.string().startsWith("/").max(2_000) }),
  z.object({ type: z.literal("click"), name: z.string().min(1).max(100), selector }),
  z.object({ type: z.literal("fill"), name: z.string().min(1).max(100), selector, value: z.string().max(2_000) }),
  z.object({ type: z.literal("press"), name: z.string().min(1).max(100), selector, key: z.enum(["Tab", "Enter", "Escape", "Space", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"]) }),
  z.object({ type: z.literal("expect-visible"), name: z.string().min(1).max(100), selector }),
]);

export const journeySchema = z.object({
  name: z.string().trim().min(1).max(120),
  baseUrl: z.string().url().superRefine((value, context) => {
    try {
      const url = new URL(value);
      const localHosts = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);
      if (!["http:", "https:"].includes(url.protocol) || !localHosts.has(url.hostname) || url.username || url.password) {
        context.addIssue({ code: "custom", message: "For this early release, baseUrl must use HTTP(S) on localhost, 127.0.0.1, or ::1 and must not contain credentials." });
      }
    } catch {
      context.addIssue({ code: "custom", message: "baseUrl must be a valid URL." });
    }
  }),
  timeoutMs: z.number().int().min(500).max(30_000).default(5_000),
  scanAfterEachStep: z.boolean().default(true),
  steps: z.array(journeyStep).min(1).max(30),
}).strict();

export type Journey = z.infer<typeof journeySchema>;
export type JourneyStep = Journey["steps"][number];

export function parseJourney(input: unknown): Journey {
  return journeySchema.parse(input);
}
