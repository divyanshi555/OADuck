import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import BrandLogo from "./components/BrandLogo";

const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || "/docs/overview";

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/practice");

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
          <Link href="/register" className="site-nav__signin">
            Sign In
          </Link>
          <Link href="/login" className="site-nav__login">
            Login
          </Link>
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
            <Link href="/register" className="site-button site-button--hero">
              Get Started <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="site-hero__art">
          <span className="site-hero__heart" aria-hidden="true">♡</span>
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
            <p>From your first question to your next breakthrough</p>
          </div>
          <ol className="site-process__steps">
            <li className="site-process__step site-process__step--one">
              <span aria-hidden="true">01</span>
              <div>
                <h3>Login &amp; Profile</h3>
                <p>Create your account and personalize your profile.</p>
              </div>
            </li>
            <li className="site-process__step site-process__step--two">
              <span aria-hidden="true">02</span>
              <div>
                <h3>Select a Question</h3>
                <p>Choose a challenge yourself or let OA Duck pick one for you.</p>
              </div>
            </li>
            <li className="site-process__step site-process__step--three">
              <span aria-hidden="true">03</span>
              <div>
                <h3>Assessment Sandbox</h3>
                <p>Solve in a focused, secure environment built for assessments.</p>
              </div>
            </li>
            <li className="site-process__step site-process__step--four">
              <span aria-hidden="true">04</span>
              <div>
                <h3>AI Diagnostic Analysis</h3>
                <p>Review your evaluation, complexity, and AI-powered walkthrough.</p>
              </div>
            </li>
            <li className="site-process__step site-process__step--five">
              <span aria-hidden="true">05</span>
              <div>
                <h3>Dashboard Activity</h3>
                <p>Track your progress, readiness, and performance over time.</p>
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
            <p className="site-kicker">Behind the practice</p>
            <h2 id="about-title">Meet the builders</h2>
          </div>
          <div className="site-builder-grid">
            <article className="site-builder">
              <div className="site-builder__identity">
                <span className="site-builder__avatar site-builder__avatar--ankur" aria-hidden="true">
                  A
                </span>
                <div>
                  <h3>Ankur</h3>
                  <p className="site-builder__role">Co-founder · Engineering &amp; Platform</p>
                </div>
              </div>
              <p className="site-builder__bio">
                Builds the assessment foundation behind OA Duck, from reliable
                code execution and evaluation to a focused testing environment.
              </p>
            </article>
            <article className="site-builder">
              <div className="site-builder__identity">
                <span className="site-builder__avatar site-builder__avatar--divyanshi" aria-hidden="true">
                  D
                </span>
                <div>
                  <h3>Divyanshi</h3>
                  <p className="site-builder__role">Co-founder · Product &amp; Experience</p>
                </div>
              </div>
              <p className="site-builder__bio">
                Shapes the practice journey, helping candidates move from
                choosing a challenge to understanding results and tracking
                progress.
              </p>
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
            <Link href="/register" className="site-footer__start">
              Start practicing <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="site-footer__links">
            <div>
              <strong>Platform</strong>
              <Link href="/practice">Coding practice</Link>
              <Link href="/questions">Question library</Link>
              <Link href="/duck-insight">Duck Insight</Link>
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
              <Link href="/register">Create an account</Link>
              <Link href="/login">Log in</Link>
              <a href="mailto:hello@oaduck.dev">Contact OA Duck</a>
            </div>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 OA Duck. Built for better coding practice.</span>
          <span>Practice with purpose.</span>
        </div>
      </footer>
    </main>
  );
}
