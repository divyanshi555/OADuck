"use client";

import { useEffect, useRef } from "react";

export default function WorkflowRoad({ path, mobile = false }) {
  const svgRef = useRef(null);
  const pathRefs = useRef([]);
  const revealMaskRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const paths = [...pathRefs.current, revealMaskRef.current].filter(Boolean);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reducedMotion) {
      paths.forEach((roadPath) =>
        roadPath.setAttribute("stroke-dashoffset", "0"),
      );
      return;
    }

    if (mobile) {
      let frame = 0;
      const updateProgress = () => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const bounds = svg.getBoundingClientRect();
          const progress = Math.min(
            1,
            Math.max(
              0,
              (window.innerHeight - bounds.top) /
                (window.innerHeight + bounds.height),
            ),
          );
          const dashOffset = String(1 - progress);
          paths.forEach((roadPath) =>
            roadPath.setAttribute("stroke-dashoffset", dashOffset),
          );
        });
      };

      updateProgress();
      window.addEventListener("scroll", updateProgress, { passive: true });
      window.addEventListener("resize", updateProgress);

      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("scroll", updateProgress);
        window.removeEventListener("resize", updateProgress);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        requestAnimationFrame(() => {
          paths.forEach((roadPath) =>
            roadPath.setAttribute("stroke-dashoffset", "0"),
          );
        });
        observer.unobserve(entry.target);
      },
      { threshold: 0.15 },
    );

    observer.observe(svg);
    return () => observer.disconnect();
  }, [mobile]);

  const roadPath = path;
  const pathProps = {
    pathLength: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    fill: "none",
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  return (
    <svg
      ref={svgRef}
      className={`pointer-events-auto absolute inset-x-0 w-full ${mobile ? "-top-12 h-[calc(100%+3rem)] overflow-hidden" : "inset-y-0 h-full"}`}
      viewBox={mobile ? "0 0 360 1000" : "0 0 1200 440"}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <mask
          id={`road-reveal-${mobile ? "mobile" : "desktop"}`}
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={mobile ? 360 : 1200}
          height={mobile ? 1000 : 440}
        >
          <path
            ref={revealMaskRef}
            d={path}
            pathLength="1"
            fill="none"
            stroke="white"
            strokeWidth="100"
            strokeDasharray="1"
            strokeDashoffset="1"
            strokeLinecap="round"
            className={
              mobile
                ? "transition-none"
                : "transition-[stroke-dashoffset] duration-[1800ms] ease-out motion-reduce:transition-none"
            }
          />
        </mask>
      </defs>
      <g className="origin-center transition-transform duration-300 ease-out hover:scale-[1.03] motion-reduce:transition-none">
        <path
          ref={(element) => {
            pathRefs.current[0] = element;
          }}
          d={roadPath}
          {...pathProps}
          className={
            mobile
              ? "transition-none"
              : "transition-[stroke-dashoffset] duration-[1800ms] ease-out motion-reduce:transition-none"
          }
          stroke="#62696b"
          strokeWidth={mobile ? 56 : 68}
        />
        <path
          ref={(element) => {
            pathRefs.current[1] = element;
          }}
          d={roadPath}
          {...pathProps}
          className={
            mobile
              ? "transition-none"
              : "transition-[stroke-dashoffset] duration-[1800ms] ease-out motion-reduce:transition-none"
          }
          stroke="#858c8e"
          strokeWidth={mobile ? 46 : 56}
        />
        <path
          d={roadPath}
          fill="none"
          stroke="#f4f3ea"
          strokeDasharray="14 18"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={mobile ? 2.5 : 3}
          mask={`url(#road-reveal-${mobile ? "mobile" : "desktop"})`}
        />
      </g>
    </svg>
  );
}
