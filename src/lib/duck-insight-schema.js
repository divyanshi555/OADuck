import { z } from "zod";

const DuckInsightBaseSchema = {
  language: z.string().min(1),
  approach: z.string(),
  walkthrough: z.array(z.strictObject({
    title: z.string(),
    detail: z.string(),
  })),
  complexity: z.strictObject({
    time: z.string(),
    space: z.string(),
    reason: z.string(),
  }),
  summary: z.string(),
  bugs: z.array(z.string()),
  recommendations: z.array(z.string()),
  tests: z.array(z.strictObject({
    input: z.string(),
    expected: z.string(),
    explanation: z.string(),
  })),
};

export const DuckInsightSchema = z.strictObject({
  ...DuckInsightBaseSchema,
  compilerOrRuntimeErrorAnalysis: z.string().nullable(),
  performanceAnalysis: z.string().nullable(),
});

export const DuckInsightModelSchema = z.strictObject({
  ...DuckInsightBaseSchema,
  compilerOrRuntimeErrorAnalysis: z.string(),
  performanceAnalysis: z.string(),
});
