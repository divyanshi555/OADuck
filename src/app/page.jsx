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
          <Link href="#features">Features</Link>
          <Link href="#about">About</Link>
          <Link href="#contact">Contact</Link>
          <a href={DOCS_URL} target="_blank" rel="noreferrer">Docs</a>
          <Link href="/login" className="site-nav__login">
            Log in
          </Link>
          <Link href="/register" className="site-nav__signup">
            Get started <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </nav>

      <section className="site-hero" aria-labelledby="site-hero-title">
        <div className="site-hero__copy">
       
          <h1 id="site-hero-title">
            Turn practice into <em>progress.</em>
          </h1>
          <p className="site-hero__lead">
            OA Duck gives you a focused place to solve coding questions, learn
            from every attempt, and walk into interviews with confidence.
          </p>
          <div className="site-hero__actions">
            <Link href="/register" className="site-button site-button--dark">
              Start practicing <span aria-hidden="true">↗</span>
            </Link>
            <Link href="#features" className="site-text-link">
              See how it works <span aria-hidden="true">↓</span>
            </Link>
          </div>
         
        </div>
        <div
          className="site-hero__art"
          aria-label="OA Duck mascot illustration"
        >
          <div className="site-hero__halo" />
          <div className="site-hero__dialog">
            Hey! Ready to solve
            <br />
            <strong>one more question?</strong>
            <span aria-hidden="true" />
          </div>
          <Image
            src="/duck-hero.png"
            alt="OA Duck mascot"
            width={545}
            height={711}
            priority
            draggable="false"
          />
          <div className="site-hero__note site-hero__note--bottom">
            Practice. Reflect.
            <br />
            <strong>Repeat.</strong>
          </div>
        </div>
      </section>

     

      <section
        className="site-section site-features"
        id="features"
        aria-labelledby="features-title"
      >
        <div className="site-section__heading">
          <h2 id="features-title">A better loop for getting better.</h2>
          <p>
            Good preparation is not about doing more. It is about knowing what
            to do next.
          </p>
        </div>
        <div className="site-feature-grid">
          <article className="site-feature">
            <span>01</span>
            <h3>Practice with purpose</h3>
            <p>
              Work through focused questions with constraints, examples, and
              hints that keep you moving.
            </p>
            <Link href="/practice">Explore practice ↗</Link>
          </article>
          <article className="site-feature">
            <span>02</span>
            <h3>Learn from the attempt</h3>
            <p>
              See your history, revisit tricky ideas, and turn mistakes into a
              plan for the next session.
            </p>
            <Link href="/profile">Track your progress ↗</Link>
          </article>
          <article className="site-feature">
            <span>03</span>
            <h3>Build interview confidence</h3>
            <p>
              Use assessment-style practice to improve your speed, clarity, and
              decisions under pressure.
            </p>
            <Link href="/register">Get ready ↗</Link>
          </article>
        </div>
      </section>

      <section
        className="site-section site-process"
        aria-labelledby="process-title"
      >
        <div className="site-process__heading">
          <p className="site-kicker">The OA Duck method</p>
          <h2 id="process-title">
            Show up.
            <br />
            Solve one.
            <br />
            <em>Keep going.</em>
          </h2>
        </div>
        <div className="site-process__steps">
          <div>
            <span>1</span>
            <h3>Choose a challenge</h3>
            <p>Pick a question that meets you where you are today.</p>
          </div>
          <div>
            <span>2</span>
            <h3>Think it through</h3>
            <p>Make your approach clear before you make it fast.</p>
          </div>
          <div>
            <span>3</span>
            <h3>Keep the signal</h3>
            <p>Use every result to make the next attempt smarter.</p>
          </div>
        </div>
      </section>

      <section
        className="site-section site-about"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="site-about__card">
          <div className="site-about__duck">
            <Image
              src="/OADuck.png"
              alt="OA Duck icon"
              width={220}
              height={176}
            />
          </div>
          <div>
            <p className="site-kicker">Why OA Duck exists</p>
            <h2 id="about-title">
              Preparation should feel like a place you want to return to.
            </h2>
            <p>
              OA Duck is built around a simple belief: consistent practice works
              best when the experience feels clear, encouraging, and genuinely
              yours.
            </p>
          </div>
        </div>
      </section>

      <section className="site-cta" id="contact" aria-labelledby="cta-title">
        <div>
          <p className="site-kicker">Your next step is simple</p>
          <h2 id="cta-title">Make today’s question count.</h2>
          <p>
            Start free, build your rhythm, and let the duck keep you company.
          </p>
        </div>
        <Link href="/register" className="site-button site-button--light">
          Create your account <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <BrandLogo />
          <p>Focused practice for ambitious learners.</p>
        </div>
        <div className="site-footer__links">
          <div>
            <strong>Explore</strong>
            <Link href="/practice">Practice</Link>
            <Link href="/questions">Library</Link>
            <Link href="/profile">Profile</Link>
            <a href={DOCS_URL} target="_blank" rel="noreferrer">Documentation</a>
            <Link href="#features">Features</Link>
          </div>
          <div>
            <strong>Connect</strong>
            <Link href="#about">About OA Duck</Link>
            <Link href="#contact">Contact</Link>
            <a href="mailto:hello@oaduck.dev">hello@oaduck.dev</a>
            <Link href="/login">Log in</Link>
            <Link href="/register">Sign up</Link>
          </div>
        </div>
        <div className="site-footer__bottom">
          <span>© 2026 OA Duck</span>
          <span>Practice with purpose.</span>
        </div>
      </footer>
    </main>
  );
}
