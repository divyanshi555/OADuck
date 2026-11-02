import ScrollReveal from "./ScrollReveal";
import WorkflowRoad from "./WorkflowRoad";

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

const cardColors = {
  sky: "border-sky-200 bg-sky-50/95",
  violet: "border-violet-200 bg-violet-50/95",
  emerald: "border-emerald-200 bg-emerald-50/95",
  rose: "border-rose-200 bg-rose-50/95",
  amber: "border-amber-200 bg-amber-50/95",
};

const desktopRoad =
  "M-24 350 C78 335 111 191 202 199 S317 330 414 286 S517 186 597 214 S724 291 795 178 S894 80 947 155 S1050 245 1224 185";
const mobileRoad =
  "M-40 154 C0 154 42 154 78 154 C156 154 282 214 282 326 S78 410 78 498 S282 582 282 670 S78 754 78 842 C78 884 99 914 135 932 S220 960 420 960";

function WorkflowStep({ step, index, layout, mobile = false }) {
  return (
    <ScrollReveal
      as="li"
      className={
        mobile
          ? `flex w-[84%] items-start gap-2 rounded-2xl border p-3 shadow-xl ${cardColors[step.color]} ${layout}`
          : `absolute ${layout.position} w-[19%] -translate-x-1/2 -translate-y-1/2 text-center`
      }
      style={{ transitionDelay: `${index * 90}ms` }}
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
            : `absolute ${layout.card} flex min-h-[10.25rem] w-[min(20rem,19vw)] flex-col justify-center rounded-2xl border p-4 text-center shadow-xl ${cardColors[step.color]}`
        }
      >
        <h3 className="text-sm font-bold text-[#172033] lg:uppercase">
          {step.title}
        </h3>
        <p className="mt-1 text-xs leading-5 text-[#687488] lg:mt-2 lg:text-sm lg:leading-6">
          {step.description}
        </p>
      </div>
    </ScrollReveal>
  );
}

export default function LandingWorkflow() {
  return (
    <section
      className="relative bg-white px-5 py-14 sm:px-8 sm:py-20 lg:h-[calc(100svh-3.5rem)] lg:min-h-[34rem] lg:px-0 lg:py-0"
      id="how-it-works"
      aria-labelledby="process-title"
    >
      <div className="pointer-events-none absolute inset-0 lg:hidden">
        <WorkflowRoad path={mobileRoad} mobile />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-none lg:flex lg:h-full lg:min-h-0 lg:flex-col lg:justify-center">
        <div className="mb-8 text-center sm:mb-12 lg:absolute lg:left-1/2 lg:top-[4%] lg:z-10 lg:mb-0 lg:w-full lg:-translate-x-1/2">
          <h2
            id="process-title"
            className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl"
          >
            How OA Duck works
          </h2>
        </div>

        <div className="relative hidden h-full min-h-0 lg:block">
          <WorkflowRoad path={desktopRoad} />
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
