export const runtime = "nodejs";

import { auth } from "../../../auth";
import prisma from "../../../lib/prisma";
import { analyzeDuckInsight } from "../../../lib/duck-insight";
import { isSupportedLanguage, languageLabel, languageValue } from "../../../lib/languages";

const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export async function POST(request) {
  const authSession = await auth();
  if (!authSession?.user?.email) {
    return Response.json({ error: "Sign in to use Duck Insight." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!body || typeof body !== "object"
      || !UUID_PATTERN.test(body.submissionId || "")
      || !UUID_PATTERN.test(body.problemId || "")) {
      return Response.json({ error: "A valid submission and problem are required." }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: authSession.user.email },
      select: { id: true },
    });
    if (!user) return Response.json({ error: "User not found." }, { status: 401 });

    const submission = await prisma.submission.findFirst({
      where: {
        id: body.submissionId,
        userId: user.id,
        questionId: body.problemId,
        session: { completedAt: { not: null }, terminationReason: null },
      },
      select: {
        language: true,
        sourceCode: true,
        status: true,
        runtimeMs: true,
        memoryKb: true,
        errorMessage: true,
        problem: {
          select: {
            id: true,
            title: true,
            description: true,
            constraints: true,
            examples: true,
            expectedTC: true,
            expectedSC: true,
            testCases: {
              where: { isSample: true },
              orderBy: { id: "asc" },
              select: { input: true, expectedOutput: true },
            },
          },
        },
      },
    });
    if (!submission) return Response.json({ error: "Assessment submission not found." }, { status: 404 });
    if (!submission.problem) return Response.json({ error: "The submitted problem was not found." }, { status: 404 });
    if (!isSupportedLanguage(submission.language)) {
      return Response.json({ error: "This submission uses an unsupported language." }, { status: 400 });
    }
    if (submission.status.toLowerCase() === "accepted") {
      return Response.json({ error: "Duck Insight is available only for an incorrect submission." }, { status: 403 });
    }

    const label = languageLabel(submission.language);
    const aliases = [...new Set([submission.language, label, label.toLowerCase(), label.toUpperCase()])];
    const solutions = await prisma.optimalSolution.findMany({
      where: { questionId: submission.problem.id, language: { in: aliases } },
      select: { language: true, code: true },
    });
    const optimal = solutions.find((solution) => languageValue(solution.language) === submission.language);
    if (!optimal?.code?.trim()) {
      return Response.json({
        error: `No ${label} reference solution is available for this question.`,
        language: submission.language,
        languageLabel: label,
      }, { status: 422 });
    }

    const analysis = await analyzeDuckInsight({
      language: label,
      verdict: submission.status,
      title: submission.problem.title || "Untitled problem",
      description: submission.problem.description || "Not provided",
      constraints: JSON.stringify(submission.problem.constraints || []),
      examples: JSON.stringify(submission.problem.examples || []),
      tests: JSON.stringify(submission.problem.testCases),
      expectedTC: submission.problem.expectedTC || "Not specified",
      expectedSC: submission.problem.expectedSC || "Not specified",
      runtime: submission.runtimeMs === null ? "Not available" : `${submission.runtimeMs} ms`,
      memory: submission.memoryKb === null ? "Not available" : `${submission.memoryKb} KB`,
      candidateCode: submission.sourceCode || "",
      optimalCode: optimal.code,
      errorMessage: submission.errorMessage || "None",
    });

    return Response.json({
      analysis,
      optimalCode: optimal.code,
      language: submission.language,
      languageLabel: label,
    });
  } catch (error) {
    console.error("Duck Insight failed:", error);
    const message = error?.message?.includes("AI_API_KEY") || error?.message?.includes("not configured")
      ? error.message
      : error?.message?.includes("valid analysis")
        ? error.message
        : "Duck Insight could not generate the analysis right now. Please try again later.";
    return Response.json({ error: message }, { status: 503 });
  }
}
