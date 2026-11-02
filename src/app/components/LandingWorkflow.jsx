const steps = [
  {
    title: "Login & Profile",
    description:
      "Create your account, set your goals, and personalize your practice profile so OA Duck can keep your journey focused.",
    color: "sky",
  },
  {
    title: "Select a Question",
    description:
      "Browse the question library by topic and difficulty, or let OA Duck choose a challenge that matches your current level.",
    color: "violet",
  },
  {
    title: "Assessment Sandbox",
    description:
      "Write and run your solution in a focused assessment workspace with language support, test cases, timers, and a secure testing flow.",
    color: "emerald",
  },
  {
    title: "AI Diagnostic Analysis",
    description:
      "After a submission, understand what worked, what failed, and how to improve through complexity notes and an AI-powered walkthrough.",
    color: "rose",
  },
  {
    title: "Dashboard Activity",
    description:
      "Return to your dashboard to see solved problems, accuracy, assessment history, and the progress you are making over time.",
    color: "amber",
  },
];

const desktopLayout = [
  {
    position: "left-[17%] top-[40%]",
    card: "bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2",
  },
  {
    position: "left-[30%] top-[70%]",
    card: "left-1/2 top-[calc(100%+1rem)] -translate-x-1/2",
  },
  {
    position: "left-[47%] top-[43%]",
    card: "bottom-[calc(100%+1rem)] left-1/2 -translate-x-1/2",
  },
  {
    position: "left-[74.5%] top-[17%]",
    card: "left-[calc(50%+4.25rem)] top-[calc(50%-1rem)] -translate-y-1/2",
  },
  {
    position: "left-[87%] top-[54%]",
    card: "left-1/2 top-[calc(100%+1rem)] -translate-x-1/2",
  },
];

const mobileLayout = [
  "self-start justify-self-start",
  "self-start justify-self-end",
  "self-start justify-self-start",
  "self-start justify-self-end",
  "self-start justify-self-center",
];

const colors = {
  sky: "border-sky-500 text-sky-700",
  violet: "border-violet-500 text-violet-700",
  emerald: "border-emerald-500 text-emerald-700",
  rose: "border-rose-500 text-rose-700",
  amber: "border-amber-500 text-amber-700",
};

const desktopRoad =
  "M-24 350 C78 335 111 191 202 199 S317 330 414 286 S517 186 597 214 S724 291 795 178 S894 80 947 155 S1050 245 1224 185";
const mobileRoad =
  "M180 -20 C180 70 78 68 78 154 S282 238 282 326 S78 410 78 498 S282 582 282 670 S78 754 78 842 S180 892 180 960";

function Road({ path, mobile = false }) {
  const roadPath = mobile
    ? `${path} M-40 -20 H400 M-40 960 H400`
    : path;

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={mobile ? "0 0 360 900" : "0 0 1200 440"}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d={roadPath}
        fill="none"
        stroke="#737a7d"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={mobile ? 40 : 58}
      />
      <path
        d={roadPath}
        fill="none"
        stroke="#8b9294"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={mobile ? 32 : 48}
      />
      <path
        d={roadPath}
        fill="none"
        stroke="#e3e5e3"
        strokeDasharray={mobile ? "10 14" : "14 17"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={mobile ? 2 : 2.5}
      />
    </svg>
  );
}

function WorkflowStep({ step, index, layout, mobile = false }) {
  return (
    <li
      className={
        mobile
          ? `flex w-[84%] items-start gap-2 rounded-2xl border border-[#d7e0ea] bg-white/95 p-3 shadow-xl ${layout}`
          : `absolute ${layout.position} w-[19%] -translate-x-1/2 -translate-y-1/2 text-center`
      }
    >
      <span
        className={`relative z-10 grid shrink-0 place-items-center rounded-full border-[3px] bg-white font-bold shadow-md ${colors[step.color]} ${
          mobile ? "h-9 w-14 text-xs" : "mx-auto h-12 w-20 border-4 text-base shadow-lg"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div
        className={
          mobile
            ? ""
            : `absolute ${layout.card} flex min-h-[10.25rem] w-[min(20rem,19vw)] flex-col justify-center rounded-2xl border border-[#d7e0ea] bg-white/95 p-4 text-center shadow-xl`
        }
      >
        <h3 className="text-sm font-bold text-[#172033] lg:uppercase">
          {step.title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-[#687488] lg:mt-2 lg:text-sm lg:leading-6">
          {step.description}
        </p>
      </div>
    </li>
  );
}

export default function LandingWorkflow() {
  return (
    <section
      className="relative bg-white px-5 py-14 sm:px-8 sm:py-20 lg:min-h-svh lg:px-0 lg:py-0"
      id="how-it-works"
      aria-labelledby="process-title"
    >
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <Road path={mobileRoad} mobile />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-none lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:py-12">
        <div className="mb-8 text-center sm:mb-12 lg:absolute lg:left-1/2 lg:top-[6%] lg:z-10 lg:mb-0 lg:w-full lg:-translate-x-1/2">
          <h2
            id="process-title"
            className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl"
          >
            How OA Duck works
          </h2>
        </div>

        <div className="relative hidden h-[min(100svh,58rem)] min-h-[38rem] lg:block">
          <Road path={desktopRoad} />
          <ol className="absolute inset-0">
            {steps.map((step, index) => (
              <WorkflowStep
                key={step.title}
                step={step}
                index={index}
                layout={desktopLayout[index]}
              />
            ))}
          </ol>
        </div>

        <div className="relative lg:hidden">
          <ol className="relative grid min-h-[70rem] grid-rows-5 gap-2 py-6">
            {steps.map((step, index) => (
              <WorkflowStep
                key={step.title}
                step={step}
                index={index}
                layout={mobileLayout[index]}
                mobile
              />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
