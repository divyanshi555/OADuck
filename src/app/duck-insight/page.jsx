"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AppHeader from "../components/AppHeader";
import Sidebar from "../components/Sidebar";
import { DuckInsightSchema } from "../../lib/duck-insight-schema";

const INSIGHT_STORAGE_KEY = "oaduck-duck-insight";

function InsightBody({ analysis, optimalCode }) {
  return <>
    {optimalCode && <section className="duck-insight-card duck-insight-card--lead"><p className="duck-insight-label">Reference Optimal Solution ({analysis.language})</p><pre className="duck-insight-code"><code>{optimalCode}</code></pre></section>}

    <section className="duck-insight-card"><p className="duck-insight-label">Optimal approach walkthrough</p><p>{analysis.approach}</p>
      <ol className="duck-insight-steps">{analysis.walkthrough.map((step, index) => <li key={index}><strong>{step.title}</strong><p>{step.detail}</p></li>)}</ol>
    </section>

    <section className="duck-insight-card"><p className="duck-insight-label">Complexity</p><div className="duck-insight-complexity"><p><span>Time</span><strong>{analysis.complexity.time}</strong></p><p><span>Space</span><strong>{analysis.complexity.space}</strong></p></div><p>{analysis.complexity.reason}</p></section>

    <section className="duck-insight-card"><p className="duck-insight-label">What went wrong in your code</p><p>{analysis.summary}</p>
      {analysis.bugs.length > 0 && <ul>{analysis.bugs.map((bug, index) => <li key={index}>{bug}</li>)}</ul>}
    </section>

    {analysis.performanceAnalysis && <section className="duck-insight-card"><p className="duck-insight-label">Performance analysis</p><p>{analysis.performanceAnalysis}</p></section>}

    {analysis.compilerOrRuntimeErrorAnalysis && <section className="duck-insight-card"><p className="duck-insight-label">Error analysis</p><p>{analysis.compilerOrRuntimeErrorAnalysis}</p></section>}

    {analysis.recommendations.length > 0 && <section className="duck-insight-card"><p className="duck-insight-label">Recommendations</p><ul>{analysis.recommendations.map((recommendation, index) => <li key={index}>{recommendation}</li>)}</ul></section>}

    {analysis.tests.length > 0 && <section className="duck-insight-card"><p className="duck-insight-label">Example tests explained</p><div className="duck-insight-tests">{analysis.tests.map((test, index) => <article key={index}><h3>Example {index + 1}</h3><div className="duck-insight-test-grid"><div><span>Input</span><pre>{test.input}</pre></div><div><span>Expected output</span><pre>{test.expected}</pre></div></div><p>{test.explanation}</p></article>)}</div></section>}
  </>;
}

export default function DuckInsightPage() {
  const [pending, setPending] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [optimalCode, setOptimalCode] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const loaded = useRef(false);

  async function generate(payload) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/duck-insight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not generate Duck Insight.");
      const validatedAnalysis = DuckInsightSchema.parse(data.analysis);
      if (validatedAnalysis.language !== data.languageLabel) {
        throw new Error("The returned analysis language did not match the submission.");
      }
      const savedInsight = {
        ...payload,
        languageLabel: data.languageLabel,
        analysis: validatedAnalysis,
        optimalCode: data.optimalCode,
      };
      localStorage.setItem(INSIGHT_STORAGE_KEY, JSON.stringify(savedInsight));
      setAnalysis(validatedAnalysis);
      setOptimalCode(data.optimalCode);
    } catch (requestError) {
      setError(requestError.message || "Could not generate Duck Insight.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    try {
      const raw = localStorage.getItem(INSIGHT_STORAGE_KEY);
      const payload = raw ? JSON.parse(raw) : null;
      if (!payload?.submissionId || !payload?.problemId) {
        setError("No submitted assessment was provided. Open Duck Insight from an incorrect assessment result.");
        return;
      }
      setPending(payload);
      if (payload.analysis) {
        const cachedAnalysis = DuckInsightSchema.safeParse(payload.analysis);
        if (cachedAnalysis.success && cachedAnalysis.data.language === payload.languageLabel) {
          setAnalysis(cachedAnalysis.data);
          setOptimalCode(payload.optimalCode || null);
          return;
        }
      }
      void generate(payload);
    } catch {
      setError("Could not read or save the assessment insight in this browser. Check browser storage and try again.");
    }
  }, []);

  return <main className="min-h-screen bg-[#f5f4ef] text-[#17221e]">
    <AppHeader />
    <div className="flex min-h-[calc(100vh-60px)]">
      <Sidebar />
      <section className="w-full max-w-[1200px] flex-1 mx-auto px-[clamp(24px,4vw,56px)] py-8">
        <Link href="/questions" className="duck-insight-back">← Back to questions</Link>
        <p className="duck-insight-kicker">Duck Insight</p>

        {loading && <section className="duck-insight-state" role="status"><span className="duck-insight-spinner" /><h2>Loading your analysis…</h2><p>Checking for a saved insight before generating a new analysis.</p></section>}

        {error && <section className="duck-insight-state duck-insight-state--error" role="alert">
          <h2>Insight unavailable</h2>
          <p>{error}</p>
          {pending && <button type="button" onClick={() => void generate(pending)} disabled={loading}>Try again</button>}
        </section>}

        {analysis && <div className="duck-insight-results">
          <p className="duck-insight-label">Analysis language: {analysis.language}</p>
          <InsightBody analysis={analysis} optimalCode={optimalCode} />
          <p className="duck-insight-privacy">Your Duck Insight is saved only in this browser and reused when you return. It is replaced when you submit again and is not saved to your account or database.</p>
        </div>}
      </section>
    </div>
  </main>;
}
