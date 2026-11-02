import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const builders = [
  {
    name: "Ankur Singh",
    image: "/Ankur.jpeg",
    imageAlt: "Ankur",
    imageSize: { width: 1200, height: 900 },
    linkedIn: "https://www.linkedin.com/in/ankurrr27/",
    github: "https://github.com/Ankurrr27/",
  },
  {
    name: "Divyanshi Purohit",
    image: "/Divya.jpg",
    imageAlt: "Divya",
    imageSize: { width: 1000, height: 1000 },
    linkedIn: "https://www.linkedin.com/in/divyanshipurohit555/",
    github: "https://github.com/Divyansh-Purohit",
  },
];

function SocialLink({ href, label, children }) {
  return (
    <a
      className="grid size-9 place-items-center rounded-full border border-[#24292f] text-[#24292f] transition hover:bg-[#24292f] hover:text-white sm:size-10"
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
    >
      {children}
    </a>
  );
}

function BuilderCard({ builder }) {
  return (
    <ScrollReveal
      as="article"
      className="grid overflow-hidden rounded-2xl bg-[#fffdf6] shadow-xl sm:grid-cols-[minmax(10rem,.85fr)_minmax(0,1.15fr)]"
    >
      <div className="h-60 min-h-0 bg-[#dfe7d7] sm:h-auto sm:min-h-80">
        <Image
          className="h-full min-h-0 w-full object-cover sm:min-h-80"
          src={builder.image}
          alt={builder.imageAlt}
          width={builder.imageSize.width}
          height={builder.imageSize.height}
          quality={95}
          sizes="(max-width: 760px) 100vw, 40vw"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center p-4 sm:p-6">
        <h3 className="text-lg font-bold text-[#172033]">
          {builder.name}
        </h3>
        <p className="mt-4 border-t border-[#dfe8df] pt-4 text-base leading-6 text-[#5f6d65]">
          Builds the assessment foundation behind OA Duck, from reliable code
          execution and evaluation to a focused testing environment.
        </p>
        <div
          className="mt-5 flex gap-3"
          aria-label={`${builder.name}'s social profiles`}
        >
          <SocialLink href={builder.linkedIn} label={`${builder.name} on LinkedIn`}>
            <svg
              className="size-4 fill-current sm:size-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M6.5 8.2H3.2V20h3.3V8.2ZM4.85 3A1.95 1.95 0 1 0 4.85 6.9 1.95 1.95 0 0 0 4.85 3ZM20.8 13.23c0-3.55-1.9-5.2-4.44-5.2-2.05 0-2.97 1.13-3.48 1.92V8.2H9.58V20h3.3v-5.84c0-1.54.29-3.03 2.2-3.03 1.89 0 1.92 1.76 1.92 3.13V20h3.3l.5-6.77Z" />
            </svg>
          </SocialLink>
          <SocialLink href={builder.github} label={`${builder.name} on GitHub`}>
            <svg
              className="size-4 fill-current sm:size-5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.47.09.64-.2.64-.45v-1.7c-2.62.57-3.17-1.11-3.17-1.11-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.84 1.45 2.2 1.03 2.74.79.09-.61.33-1.03.6-1.27-2.09-.24-4.29-1.05-4.29-4.66 0-1.03.37-1.86.98-2.52-.1-.24-.42-1.2.09-2.49 0 0 .8-.26 2.62.96a9.1 9.1 0 0 1 4.77 0c1.82-1.22 2.62-.96 2.62-.96.51 1.29.19 2.25.09 2.49.61.66.98 1.49.98 2.52 0 3.62-2.2 4.42-4.3 4.65.34.3.64.88.64 1.78v2.64c0 .25.17.55.65.45A9.5 9.5 0 0 0 12 2.5Z" />
            </svg>
          </SocialLink>
        </div>
      </div>
    </ScrollReveal>
  );
}

export default function LandingBuilders() {
  return (
    <section
      className="flex min-h-svh flex-col justify-center bg-white px-5 pt-4 pb-12 sm:px-8 sm:pt-8 sm:pb-16 lg:px-14"
      id="about"
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 text-center sm:mb-10">
          <h2
            id="about-title"
            className="text-3xl font-bold tracking-tight text-[#172033] sm:text-4xl"
          >
            Developed by
          </h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {builders.map((builder) => (
            <BuilderCard key={builder.name} builder={builder} />
          ))}
        </div>
      </div>
    </section>
  );
}
