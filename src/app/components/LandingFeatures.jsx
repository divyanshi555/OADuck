import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: "code",
    iconClass: "bg-[#29252c] text-white",
    cardClass: "bg-[#211f23]",
    title: "Multi-Language Support",
    description: "Execute natively in C++20, Java 17, and Python 3.11.",
    languages: ["C++", "Python", "Java"],
  },
  {
    icon: "shield",
    iconClass: "bg-[#e80b7a] text-white",
    cardClass: "bg-[#321426]",
    title: "Constrained Environment",
    description:
      "Full-screen focus lock, copy and paste disabled, tab-switch warnings, and reliable countdown timers. Practice under authentic high-pressure test conditions.",
  },
  {
    icon: "shuffle",
    iconClass: "bg-[#4be875] text-[#173521]",
    cardClass: "bg-[#172b1d]",
    title: "Multiple Modes",
    description: "Random pick or choose the question you want to attempt.",
  },
  {
    icon: "search",
    iconClass: "bg-[#1458d4] text-white",
    cardClass: "bg-[#17233a]",
    title: "Diagnostic Insights",
    description:
      "AI-based solution walkthroughs, complexity analysis, and bottleneck detection after a wrong submission.",
  },
  {
    icon: "chart",
    iconClass: "bg-[#f5a21b] text-white",
    cardClass: "bg-[#332515]",
    title: "Dashboard",
    description:
      "Submission velocity graphs, accuracy heatmaps, violation history, and a readiness score tailored per company tier.",
  },
  {
    icon: "checklist",
    iconClass: "bg-[#0f9f88] text-white",
    cardClass: "bg-[#142c29]",
    title: "Test Case Results",
    description:
      "Run your solution against test cases and see which cases pass or fail.",
  },
];

function FeatureIcon({ name }) {
  const paths = {
    code: (
      <>
        <path d="m8 8-5 4 5 4m8-8 5 4-5 4m-2-12-4 16" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    shuffle: (
      <>
        <path d="m18 14 4 4-4 4m0-20 4 4-4 4M2 18h2.5a6 6 0 0 0 4.2-1.7L17 8a6 6 0 0 1 4.2-1.7H22M2 6h2.5a6 6 0 0 1 4.2 1.7l1.2 1.2m4.2 4.2 2.9 2.9a6 6 0 0 0 4.2 1.7H22" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4m-5-8v6m-3-3h6" />
      </>
    ),
    chart: (
      <>
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="5" rx="1" />
        <rect x="13" y="8" width="3" height="9" rx="1" />
        <rect x="19" y="5" width="2" height="12" rx="1" />
      </>
    ),
    checklist: (
      <>
        <path d="m4 6 1.5 1.5L8 5m-4 7 1.5 1.5L8 11m-4 7 1.5 1.5L8 17" />
        <path d="M11 6h9M11 12h9M11 18h9" />
      </>
    ),
  };

  return (
    <svg
      className="size-6 sm:size-7"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function LandingFeatures() {
  return (
    <section
      className="flex min-h-svh flex-col justify-center bg-black px-5 py-8 sm:px-8 sm:py-10 lg:h-svh lg:px-14 lg:py-6"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="mb-10 text-center sm:mb-14">
        <h2
          id="features-title"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
        >
          Features
        </h2>
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
        {features.map((feature, index) => (
          <ScrollReveal
            className="h-full"
            key={feature.title}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            <article
              className={`group relative h-full rounded-xl px-5 pb-5 pt-9 shadow-[0_8px_18px_rgba(0,0,0,.35)] transition-[transform,box-shadow,filter] duration-300 ease-out hover:z-10 hover:-translate-y-2 hover:scale-[1.05] hover:brightness-110 hover:shadow-[0_18px_36px_rgba(0,0,0,.65)] motion-reduce:transition-none sm:px-6 sm:pb-6 sm:pt-10 ${feature.cardClass}`}
            >
              <span
                className={`absolute -top-4 left-4 grid size-10 place-items-center rounded-full shadow-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125 motion-reduce:transition-none sm:left-5 sm:size-11 ${feature.iconClass}`}
                aria-hidden="true"
              >
                <FeatureIcon name={feature.icon} />
              </span>
              <h3 className="text-base font-bold text-white sm:text-lg">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-5 text-[#d0d2d7]">
                {feature.description}
              </p>
              {feature.languages && (
                <ul
                  className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#e3e5e8]"
                  aria-label="Supported languages"
                >
                  {feature.languages.map((language) => (
                    <li
                      className="rounded-full bg-white/10 px-2.5 py-1"
                      key={language}
                    >
                      {language}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
