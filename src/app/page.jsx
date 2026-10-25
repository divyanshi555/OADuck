import Link from "next/link";
import Image from "next/image";
import { auth } from "../auth";
import BrandLogo from "./components/BrandLogo";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "/docs/overview";

export default async function Home() {
  const session = await auth();

  return (
    <main className="site-landing">
      <nav className="site-nav" aria-label="Main navigation">
        <BrandLogo />
        <div className="site-nav__links">
          <Link href="#home">Home</Link>
          <Link href="#features">Features</Link>
          <Link href="#how-it-works">How it Works</Link>
          <Link href="#about">Developed by</Link>
        </div>
        <div className="site-nav__actions">
          {session?.user ? (
            <Link href="/practice" className="site-nav__signin">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/register" className="site-nav__signin">
                Register
              </Link>
              <Link href="/login" className="site-nav__login">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>

      <section id="home" className="site-hero" aria-labelledby="site-hero-title">
        <div className="site-hero__copy">
          <h1 id="site-hero-title">
            Hi, I&apos;m Duck! Do you have to face frequent OAs and want to
            practice and train yourself in a constrained environment?
          </h1>
          <p className="site-hero__lead">
            Welcome to <strong>OADuck</strong> — a dedicated platform that
            provides realistic assessment simulations, structured problem
            practice, and smart diagnostic insights to help you build technical
            confidence and master coding evaluations.
          </p>
          <div className="site-hero__actions">
            <Link href={session?.user ? "/practice" : "/register"} className="site-button site-button--hero">
              {session?.user ? "Open Dashboard" : "Get Started"} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="site-hero__art">
          <Image
            src="/duck-hero.png"
            alt="OA Duck mascot"
            width={545}
            height={711}
            priority
            draggable="false"
          />
        </div>
      </section>

     

      <section
        className="site-section site-features"
        id="features"
        aria-labelledby="features-title"
      >
        <div className="site-features__heading">
          <h2 id="features-title">Features</h2>
        </div>
        <div className="site-features__content">
          <aside className="site-features__mascot">
            <Image
              src="/duck-hero.png"
              alt="OA Duck mascot"
              width={545}
              height={711}
              draggable="false"
            />
            <p>Here is everything packed in fluffy feature boxes</p>
          </aside>
          <div className="site-feature-grid">
            <article className="site-feature site-feature--wide">
              <span className="site-feature__icon site-feature__icon--code" aria-hidden="true">
                &lt;/&gt;
              </span>
              <h3>Multi-Language Support</h3>
              <p>Execute natively in C++20, Java 17, and Python 3.11.</p>
              <ul className="site-feature__tags" aria-label="Supported languages">
                <li>C++</li>
                <li>Python</li>
                <li>Java</li>
              </ul>
            </article>
            <article className="site-feature site-feature--wide">
              <span className="site-feature__icon site-feature__icon--lock" aria-hidden="true">
                ◆
              </span>
              <h3>Constrained Environment</h3>
              <p>
                Full-screen focus lock, copy and paste disabled, tab-switch
                warnings, and reliable countdown timers. Practice under
                authentic high-pressure test conditions.
              </p>
            </article>
            <article className="site-feature">
              <span className="site-feature__icon site-feature__icon--modes" aria-hidden="true">
                ◆
              </span>
              <h3>Multiple Modes</h3>
              <p>Random pick or choose the question you want to attempt.</p>
            </article>
            <article className="site-feature">
              <span className="site-feature__icon site-feature__icon--insights" aria-hidden="true">
                ◈
              </span>
              <h3>Diagnostic Insights</h3>
              <p>
                AI-based solution walkthroughs, complexity analysis, and
                bottleneck detection after a wrong submission.
              </p>
            </article>
            <article className="site-feature">
              <span className="site-feature__icon site-feature__icon--dashboard" aria-hidden="true">
                ◔
              </span>
              <h3>Dashboard</h3>
              <p>
                Submission velocity graphs, accuracy heatmaps, violation
                history, and a readiness score tailored per company tier.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section
        className="site-process"
        id="how-it-works"
        aria-labelledby="process-title"
      >
        <div className="site-process__trail">
          <svg
            className="site-process__road"
            viewBox="0 0 1200 440"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="site-process__road-edge"
              d="M-24 350 C78 335 111 191 202 199 S317 330 414 286 S517 186 597 214 S724 291 795 178 S894 80 947 155 S1050 245 1224 185"
            />
            <path
              className="site-process__road-line"
              d="M-24 350 C78 335 111 191 202 199 S317 330 414 286 S517 186 597 214 S724 291 795 178 S894 80 947 155 S1050 245 1224 185"
            />
            <path
              className="site-process__road-dashes"
              d="M-24 350 C78 335 111 191 202 199 S317 330 414 286 S517 186 597 214 S724 291 795 178 S894 80 947 155 S1050 245 1224 185"
            />
            <path
              className="site-process__road-edge site-process__road-edge--mobile"
              d="M180 -20 C180 70 78 68 78 154 S282 238 282 326 S78 410 78 498 S282 582 282 670 S78 754 78 842 S180 892 180 960"
            />
            <path
              className="site-process__road-line site-process__road-line--mobile"
              d="M180 -20 C180 70 78 68 78 154 S282 238 282 326 S78 410 78 498 S282 582 282 670 S78 754 78 842 S180 892 180 960"
            />
            <path
              className="site-process__road-dashes site-process__road-dashes--mobile"
              d="M180 -20 C180 70 78 68 78 154 S282 238 282 326 S78 410 78 498 S282 582 282 670 S78 754 78 842 S180 892 180 960"
            />
          </svg>
          <div className="site-process__heading">
            <h2 id="process-title">How OA Duck works</h2>
           
          </div>
          <ol className="site-process__steps">
            <li className="site-process__step site-process__step--one !top-[40%] !left-[17%] max-[760px]:!top-[20%] max-[760px]:!left-[22%]">
              <span className="[&::after]:!hidden" aria-hidden="true">01<i className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l-[3px] border-t-[3px] border-current bg-white" /></span>
              <div className="ml-35 !top-auto !bottom-[calc(100%+0.85rem)] !left-1/2 !-translate-x-1/2">
                <h3>Login &amp; Profile</h3>
                <p>Create your account, set your goals, and personalize your practice profile so OA Duck can keep your journey focused.</p>
              </div>
            </li>
            <li className="site-process__step site-process__step--two !top-[70%] !left-[30%] max-[760px]:!top-[34%] max-[760px]:!left-[78%]">
              <span aria-hidden="true">02</span>
              <div className="ml-35 !top-[calc(100%+0.85rem)] !bottom-auto !left-1/2 !-translate-x-1/2">
                <h3>Select a Question</h3>
                <p>Browse the question library by topic and difficulty, or let OA Duck choose a challenge that matches your current level.</p>
              </div>
            </li>
            <li className="site-process__step site-process__step--three !top-[43%] !left-[47%] max-[760px]:!top-[52%] max-[760px]:!left-[22%]">
              <span className="[&::after]:!hidden" aria-hidden="true">03<i className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l-[3px] border-t-[3px] border-current bg-white" /></span>
              <div className="ml-35 !top-auto !bottom-[calc(100%+0.85rem)] !left-1/2 !-translate-x-1/2">
                <h3>Assessment Sandbox</h3>
                <p>Write and run your solution in a focused assessment workspace with language support, test cases, timers, and a secure testing flow.</p>
              </div>
            </li>
            <li className="site-process__step site-process__step--four !top-[17%] !left-[74.5%] max-[760px]:!top-[70%] max-[760px]:!left-[78%]">
              <span className="[&::after]:!hidden" aria-hidden="true">04<i className="absolute top-1/2 -right-2 h-3 w-3 -translate-y-1/2 rotate-45 border-r-[3px] border-t-[3px] border-current bg-white" /></span>
              <div className="mb-33 ml-40 !top-[calc(38%-10px)] !bottom-auto !left-1/2 !translate-x-[50px] !-translate-y-1/2 max-[760px]:!top-auto max-[760px]:!bottom-[calc(100%+0.85rem)] max-[760px]:!left-1/2 max-[760px]:!translate-x-1/2 max-[760px]:!-translate-y-0">
                <h3>AI Diagnostic Analysis</h3>
                <p>After a submission, understand what worked, what failed, and how to improve through complexity notes and an AI-powered walkthrough.</p>
              </div>
            </li>
            <li className="site-process__step site-process__step--five !top-[54%] !left-[87%] max-[760px]:!top-[89%] max-[760px]:!left-[50%]">
              <span aria-hidden="true">05</span>
              <div className="ml-35 !top-[calc(100%+0.85rem)] !bottom-auto !left-1/2 !-translate-x-1/2">
                <h3>Dashboard Activity</h3>
                <p>Return to your dashboard to see solved problems, accuracy, assessment history, and the progress you are making over time.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section
        className="site-section site-about"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="site-about__content">
          <div className="site-about__heading">

            <h2 id="about-title">Developed by</h2>
          </div>
          <div className="site-builder-grid">
            <article className="site-builder">
              <div className="site-builder__photo">
                <Image
                  className="site-builder__photo-image"
                  src="/Ankur.jpeg"
                  alt="Ankur"
                  width={1200}
                  height={900}
                  quality={95}
                  sizes="(max-width: 760px) 40vw, 28vw"
                />
              </div>
              <div className="site-builder__copy">
                <div className="site-builder__identity">
                <div>
                  <h3>Ankur Singh Sir</h3>
                </div>
                </div>
                <p className=" text-lg site-builder__bio">
                  Builds the assessment foundation behind OA Duck, from reliable
                  code execution and evaluation to a focused testing environment.
                </p>
                <div className="site-builder__socials" aria-label="Ankur's social profiles">
                  <a className="site-builder__social-link site-builder__social-link--linkedin" href="https://www.linkedin.com/in/ankurrr27/" target="_blank" rel="noreferrer" aria-label="Ankur on LinkedIn">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.2H3.2V20h3.3V8.2ZM4.85 3A1.95 1.95 0 1 0 4.85 6.9 1.95 1.95 0 0 0 4.85 3ZM20.8 13.23c0-3.55-1.9-5.2-4.44-5.2-2.05 0-2.97 1.13-3.48 1.92V8.2H9.58V20h3.3v-5.84c0-1.54.29-3.03 2.2-3.03 1.89 0 1.92 1.76 1.92 3.13V20h3.3l.5-6.77Z" /></svg>
                  </a>
                  <a className="site-builder__social-link site-builder__social-link--github" href="https://github.com/Ankurrr27/" target="_blank" rel="noreferrer" aria-label="Ankur on GitHub">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.47.09.64-.2.64-.45v-1.7c-2.62.57-3.17-1.11-3.17-1.11-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.84 1.45 2.2 1.03 2.74.79.09-.61.33-1.03.6-1.27-2.09-.24-4.29-1.05-4.29-4.66 0-1.03.37-1.86.98-2.52-.1-.24-.42-1.2.09-2.49 0 0 .8-.26 2.62.96a9.1 9.1 0 0 1 4.77 0c1.82-1.22 2.62-.96 2.62-.96.51 1.29.19 2.25.09 2.49.61.66.98 1.49.98 2.52 0 3.62-2.2 4.42-4.3 4.65.34.3.64.88.64 1.78v2.64c0 .25.17.55.65.45A9.5 9.5 0 0 0 12 2.5Z" /></svg>
                  </a>
                </div>
              </div>
            </article>
            <article className="site-builder">
              <div className="site-builder__photo">
                <Image
                  className="site-builder__photo-image"
                  src="/Divya.jpg"
                  alt="Divya"
                  width={1000}
                  height={1000}
                  quality={95}
                  sizes="(max-width: 760px) 40vw, 28vw"
                />
              </div>
              <div className="site-builder__copy">
                <div className="site-builder__identity">
                <div>
                  <h3>Divyanshi Pure hit</h3>
                </div>
                </div>
                <p className="site-builder__bio">
                 Builds the assessment foundation behind OA Duck, from reliable
                  code execution and evaluation to a focused testing environment.
                </p>
                <div className="site-builder__socials" aria-label="Divya's social profiles">
                  <a className="site-builder__social-link site-builder__social-link--linkedin" href="https://www.linkedin.com/in/divyanshipurohit555/" target="_blank" rel="noreferrer" aria-label="Divya on LinkedIn">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 8.2H3.2V20h3.3V8.2ZM4.85 3A1.95 1.95 0 1 0 4.85 6.9 1.95 1.95 0 0 0 4.85 3ZM20.8 13.23c0-3.55-1.9-5.2-4.44-5.2-2.05 0-2.97 1.13-3.48 1.92V8.2H9.58V20h3.3v-5.84c0-1.54.29-3.03 2.2-3.03 1.89 0 1.92 1.76 1.92 3.13V20h3.3l.5-6.77Z" /></svg>
                  </a>
                  <a className="site-builder__social-link site-builder__social-link--github" href="https://github.com/Divyansh-Purohit" target="_blank" rel="noreferrer" aria-label="Divya on GitHub">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.47.09.64-.2.64-.45v-1.7c-2.62.57-3.17-1.11-3.17-1.11-.43-1.09-1.05-1.38-1.05-1.38-.86-.59.07-.58.07-.58.95.07 1.45.98 1.45.98.84 1.45 2.2 1.03 2.74.79.09-.61.33-1.03.6-1.27-2.09-.24-4.29-1.05-4.29-4.66 0-1.03.37-1.86.98-2.52-.1-.24-.42-1.2.09-2.49 0 0 .8-.26 2.62.96a9.1 9.1 0 0 1 4.77 0c1.82-1.22 2.62-.96 2.62-.96.51 1.29.19 2.25.09 2.49.61.66.98 1.49.98 2.52 0 3.62-2.2 4.42-4.3 4.65.34.3.64.88.64 1.78v2.64c0 .25.17.55.65.45A9.5 9.5 0 0 0 12 2.5Z" /></svg>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__main">
          <div className="site-footer__brand">
            <BrandLogo />
            <p>
              A focused place to practice coding questions, simulate online
              assessments, and learn from every attempt.
            </p>
            <Link href={session?.user ? "/practice" : "/register"} className="site-footer__start">
              {session?.user ? "Open dashboard" : "Start practicing"} <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="site-footer__links">
            <div>
              <strong>Platform</strong>
              <Link href="/practice">Coding practice</Link>
              <Link href="/questions">Question library</Link>
        
              <Link href="/profile">Progress dashboard</Link>
            </div>
            <div>
              <strong>Explore</strong>
              <Link href="#features">Features</Link>
              <Link href="#how-it-works">How it works</Link>
              <Link href="#about">Meet the builders</Link>
              <a href={DOCS_URL} target="_blank" rel="noreferrer">
                Documentation
              </a>
            </div>
            <div>
              <strong>Account</strong>
              {session?.user ? (
                <Link href="/practice">Dashboard</Link>
              ) : (
                <>
                  <Link href="/register">Create an account</Link>
                  <Link href="/login">Log in</Link>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 OA Duck. Built for better coding practice.</span>

        </div>
      </footer>
    </main>
  );
}
