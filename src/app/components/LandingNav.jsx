"use client";

import { useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function LandingNav({ isSignedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How it Works" },
    { href: "#about", label: "Developed by" },
  ];

  return (
    <nav
      className="relative z-20 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-white/10 bg-[#304d3c] px-5 py-4 sm:px-8 lg:px-14"
      aria-label="Main navigation"
    >
      <BrandLogo dark />

      <div className="hidden items-center gap-4 text-sm font-bold text-[#c6d4ca] sm:flex lg:gap-8">
        {links.map(({ href, label }) => (
          <Link className="whitespace-nowrap transition-colors hover:text-white" href={href} key={href}>
            {label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2 text-sm font-bold">
        {isSignedIn ? (
          <Link
            href="/practice"
            className="rounded-md bg-[#e56b91] px-3 py-2 text-white transition-colors hover:bg-[#f080a3] sm:px-4"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/register"
              className="rounded-md bg-[#e56b91] px-3 py-2 text-white transition-colors hover:bg-[#f080a3] sm:px-4"
            >
              Register
            </Link>
            <Link href="/login" className="px-2 py-2 text-white">
              Login
            </Link>
          </>
        )}
        <button
          type="button"
          className="grid size-10 place-items-center rounded-md text-white transition hover:bg-white/10 sm:hidden"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="landing-mobile-menu"
          onClick={() => setIsOpen((open) => !open)}
        >
          <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 6 12 12M18 6 6 18" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          id="landing-mobile-menu"
          className="absolute left-0 top-full flex w-full flex-col gap-1 border-t border-white/10 bg-[#304d3c] px-5 py-3 text-sm font-bold text-[#c6d4ca] shadow-xl sm:hidden"
        >
          {links.map(({ href, label }) => (
            <Link
              className="rounded-md px-3 py-3 transition-colors hover:bg-white/10 hover:text-white"
              href={href}
              key={href}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
