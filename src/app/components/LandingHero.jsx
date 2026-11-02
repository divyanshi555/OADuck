import Link from "next/link";
import Image from "next/image";

export default function LandingHero({ isSignedIn }) {
  return (
    <section
      id="home"
      className="bg-white px-4 sm:px-8 lg:px-10 xl:px-14"
      aria-labelledby="site-hero-title"
    >
      <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center gap-4 py-6 sm:gap-8 sm:py-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(14rem,.9fr)] lg:gap-5 lg:py-8 xl:gap-8">
        <div className="mx-auto w-full max-w-xl lg:mx-0 lg:ml-4 xl:ml-6">
          <h1
            id="site-hero-title"
            className="font-[var(--font-space-grotesk),sans-serif] text-2xl font-bold leading-[1.2] tracking-[-.035em] text-[#172033] sm:text-4xl lg:text-3xl lg:leading-tight"
          >
            Hi, I&apos;m Duck!
            <br />
            Do you have to face frequent OAs and want to practice and train
            yourself in a constrained environment?
          </h1>
          <p className="mt-3 text-sm leading-5 text-[#78838d] sm:mt-5 sm:text-lg sm:leading-7 lg:mt-4 lg:text-base lg:leading-6">
            Welcome to <strong>OADuck</strong> — a dedicated platform that
            provides realistic assessment simulations, structured problem
            practice, and smart diagnostic insights to help you build technical
            confidence and master coding evaluations.
          </p>
          <Link
            href={isSignedIn ? "/practice" : "/register"}
            className="mt-4 inline-flex items-center gap-2.5 rounded-xl bg-[#f5a21b] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#e9940f] hover:shadow-lg sm:mt-7 sm:gap-3 sm:rounded-2xl sm:px-6 sm:py-3.5 sm:text-base"
          >
            {isSignedIn ? "Open Dashboard" : "Get Started"}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="relative mx-auto grid min-h-[10rem] w-full max-w-sm place-items-center sm:min-h-[22rem] lg:min-h-[22rem]">
          <Image
            className="relative z-10 h-auto w-[min(52%,12rem)] drop-shadow-[0_16px_14px_rgba(80,61,35,.12)] sm:w-[min(72%,18rem)] lg:w-[min(100%,15rem)]"
            src="/duck-hero.png"
            alt="OA Duck mascot"
            width={545}
            height={711}
            priority
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}
