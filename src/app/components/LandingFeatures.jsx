const features = [
  {
    icon: "</>",
    iconClass: "bg-[#29252c] text-white",
    title: "Multi-Language Support",
    description: "Execute natively in C++20, Java 17, and Python 3.11.",
    languages: ["C++", "Python", "Java"],
  },
  {
    icon: "◆",
    iconClass: "bg-[#e80b7a] text-white",
    title: "Constrained Environment",
    description:
      "Full-screen focus lock, copy and paste disabled, tab-switch warnings, and reliable countdown timers. Practice under authentic high-pressure test conditions.",
  },
  {
    icon: "◆",
    iconClass: "bg-[#4be875] text-[#173521]",
    title: "Multiple Modes",
    description: "Random pick or choose the question you want to attempt.",
  },
  {
    icon: "◈",
    iconClass: "bg-[#1458d4] text-white",
    title: "Diagnostic Insights",
    description:
      "AI-based solution walkthroughs, complexity analysis, and bottleneck detection after a wrong submission.",
    desktopPosition: "lg:col-start-2",
  },
  {
    icon: "◔",
    iconClass: "bg-[#f5a21b] text-white",
    title: "Dashboard",
    description:
      "Submission velocity graphs, accuracy heatmaps, violation history, and a readiness score tailored per company tier.",
    desktopPosition: "lg:col-start-4",
  },
];

export default function LandingFeatures() {
  return (
    <section
      className="flex min-h-svh flex-col justify-center bg-white px-5 py-12 sm:px-8 sm:py-14 lg:px-14"
      id="features"
      aria-labelledby="features-title"
    >
      <div className="mb-10 text-center sm:mb-14">
        <h2
          id="features-title"
          className="text-3xl font-bold tracking-tight text-[#21162a] sm:text-4xl lg:text-5xl"
        >
          Features
        </h2>
      </div>
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-x-5 lg:gap-y-12">
        {features.map((feature) => (
          <article
            className={`relative rounded-xl bg-[#f3edef] px-5 pb-5 pt-9 shadow-[0_8px_18px_rgba(70,37,83,.12)] sm:px-6 sm:pb-6 sm:pt-10 lg:col-span-2 ${feature.desktopPosition ?? ""}`}
            key={feature.title}
          >
            <span
              className={`absolute -top-4 left-4 grid size-10 place-items-center rounded-full text-sm font-bold shadow-sm sm:left-5 sm:size-11 ${feature.iconClass}`}
              aria-hidden="true"
            >
              {feature.icon}
            </span>
            <h3 className="text-base font-bold text-[#211b21] sm:text-lg">
              {feature.title}
            </h3>
            <p className="mt-3 text-sm leading-5 text-[#514a52]">
              {feature.description}
            </p>
            {feature.languages && (
              <ul
                className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-[#354056]"
                aria-label="Supported languages"
              >
                {feature.languages.map((language) => (
                  <li
                    className="rounded-full bg-white/80 px-2.5 py-1"
                    key={language}
                  >
                    {language}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
