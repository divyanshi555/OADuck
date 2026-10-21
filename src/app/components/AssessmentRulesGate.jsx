"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

export default function AssessmentRulesGate({ mode = "NORMAL", durationMinutes = 30, onBegin, isStarting = false, error = "", rulesReady = true }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState("");
  const [hasReadRules, setHasReadRules] = useState(false);
  const isMounted = useSyncExternalStore(() => () => {}, () => true, () => false);

  useEffect(() => {
    document.body.classList.add("assessment-rules-open");
    const updateFullscreen = () => {
      const entered = Boolean(document.fullscreenElement);
      setIsFullscreen(entered);
    };
    document.addEventListener("fullscreenchange", updateFullscreen);
    const frame = requestAnimationFrame(updateFullscreen);
    return () => {
      document.body.classList.remove("assessment-rules-open");
      cancelAnimationFrame(frame);
      document.removeEventListener("fullscreenchange", updateFullscreen);
    };
  }, []);

  async function enterFullscreen() {
    setFullscreenError("");
    try {
      if (!document.fullscreenElement) await document.documentElement.requestFullscreen();
    } catch {
      setFullscreenError("Your browser did not allow full screen. Use the full screen button or check your browser permissions.");
    }
  }

  const canStart = isFullscreen && hasReadRules && rulesReady && !isStarting;

  const gate = <div className="assessment-gate-backdrop">
    <section className="assessment-gate" role="dialog" aria-modal="true" aria-labelledby="assessment-gate-title">
      <div className="assessment-gate__content">
        <h1 id="assessment-gate-title">Session Rules</h1>
        <p className="assessment-gate__intro">This test is actively monitored. Keep this tab active and remain in verified full screen until completion.</p>
        <ol className="assessment-gate__rules">
          <li><strong>30-Minute Duration</strong><span>Session is strictly timed for {durationMinutes} minutes. Once started, the timer cannot be paused.</span></li>
          <li className="assessment-gate__strict-rule"><strong>Full Screen Required <em>Strict</em></strong><span>Exiting full screen immediately terminates the session.</span></li>
          <li><strong>Switching Tabs &amp; Windows</strong><span>Leaving this tab or unfocusing the window counts as a violation.</span></li>
          <li><strong>Copying and Pasting</strong><span>Ctrl/Cmd+C and Ctrl/Cmd+V are blocked and count as violations.</span></li>
          <li><strong>Back Navigation</strong><span>Using the browser Back button or navigation counts as a violation.</span></li>
          <li><strong>Violation Limit</strong><span>{mode === "STRICT" ? "The first violation terminates the session." : "The first two violations show warnings. The third terminates the session."}</span></li>
        </ol>
      </div>
      <div className="assessment-gate__footer">
        <div className="assessment-gate__checks">
          <label><input type="checkbox" checked={hasReadRules} onChange={(event) => setHasReadRules(event.target.checked)} /><span>I have read, understood, and agree to adhere to all session rules and proctoring requirements.</span></label>
        </div>
        <div className="assessment-gate__actions">
          <button type="button" className="assessment-gate__secondary" onClick={enterFullscreen} disabled={!rulesReady || isFullscreen}>
            <span aria-hidden="true">⛶</span>{isFullscreen ? "Full screen active" : "Enter full screen"}
          </button>
          <button type="button" className="assessment-gate__primary" onClick={onBegin} disabled={!canStart}>
            {isStarting ? "Starting session…" : "Start session"}<span aria-hidden="true">→</span>
          </button>
        </div>
      </div>
      {(fullscreenError || error) && <p className="assessment-gate__error" role="alert">{fullscreenError || error}</p>}
    </section>
  </div>;

  return isMounted ? createPortal(gate, document.body) : null;
}
