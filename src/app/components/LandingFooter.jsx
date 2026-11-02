import Link from "next/link";
import BrandLogo from "./BrandLogo";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "/docs/overview";

export default function LandingFooter({ isSignedIn }) {
  return (
    <footer className="flex flex-1 flex-col justify-between bg-[#304d3c] px-5 py-5 text-[#c6d4ca] sm:px-8 sm:py-7 lg:px-14">
      <div className="mx-auto mb-4 grid w-full max-w-7xl gap-5 sm:mb-5 sm:gap-7 lg:grid-cols-[minmax(14rem,.9fr)_minmax(0,1.5fr)] lg:gap-10">
        <div>
          <BrandLogo dark />
          <p className="mt-3 max-w-sm text-sm leading-5 text-[#c1d0c4]">
            A focused place to practice coding questions, simulate online
            assessments, and learn from every attempt.
          </p>
          <Link
            href={isSignedIn ? "/practice" : "/register"}
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#f6ce54] hover:text-white"
          >
            {isSignedIn ? "Open dashboard" : "Start practicing"}{" "}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 text-sm sm:grid-cols-3">
          <div className="grid content-start gap-2">
            <strong className="text-xs uppercase tracking-widest text-white">
              Platform
            </strong>
            <Link className="hover:text-white" href="/practice">
              Coding practice
            </Link>
            <Link className="hover:text-white" href="/questions">
              Question library
            </Link>
            <Link className="hover:text-white" href="/profile">
              Progress dashboard
            </Link>
          </div>
          <div className="grid content-start gap-2">
            <strong className="text-xs uppercase tracking-widest text-white">
              Explore
            </strong>
            <Link className="hover:text-white" href="#features">
              Features
            </Link>
            <Link className="hover:text-white" href="#how-it-works">
              How it works
            </Link>
            <Link className="hover:text-white" href="#about">
              Meet the builders
            </Link>
            <a
              className="hover:text-white"
              href={DOCS_URL}
              target="_blank"
              rel="noreferrer"
            >
              Documentation
            </a>
          </div>
          <div className="grid content-start gap-2">
            <strong className="text-xs uppercase tracking-widest text-white">
              Account
            </strong>
            {isSignedIn ? (
              <Link className="hover:text-white" href="/practice">
                Dashboard
              </Link>
            ) : (
              <>
                <Link className="hover:text-white" href="/register">
                  Create an account
                </Link>
                <Link className="hover:text-white" href="/login">
                  Log in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 border-t border-white/20 pt-2 text-xs text-[#a9c0ae] sm:flex-row sm:justify-between">
        <span>© 2026 OA Duck. Built for better coding practice.</span>
      </div>
    </footer>
  );
}
