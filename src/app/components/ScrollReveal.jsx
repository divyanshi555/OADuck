"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  as: Element = "div",
  className = "",
  children,
  style,
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.remove("opacity-0");
      element.classList.add("opacity-100");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        observer.unobserve(entry.target);
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Element
      ref={elementRef}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transform-none motion-reduce:transition-none ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={style}
    >
      {children}
    </Element>
  );
}
