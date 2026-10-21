import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import BrandLogo from "./components/BrandLogo";

const features = [
  ["01", "Practice with purpose", "Solve focused coding questions with clear constraints, examples, and helpful hints."],
  ["02", "Build real progress", "Keep your attempts, results, and activity in one calm workspace that is easy to return to."],
  ["03", "Think like an interview", "Use timed assessment sessions to sharpen your speed, accuracy, and confidence."],
];

export default async function Home() {
  const session = await auth();
  if (session?.user) redirect("/practice");

  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Main navigation">
        <BrandLogo />
        <div className="landing-nav__links">
          <Link href="#why-oa-duck">Why OA Duck</Link>
          <Link href="/login" className="landing-nav__login">Log in <span aria-hidden="true">→</span></Link>
        </div>
      </nav>

      <section className="landing-hero" aria-labelledby="landing-title">
        <div className="landing-hero__copy">
          <p className="landing-eyebrow"><span aria-hidden="true">●</span> A better way to practice</p>
          <h1 id="landing-title">Build better answers, one question at a time.</h1>
          <p className="landing-hero__intro">OA Duck is a focused coding workspace for learning, practicing, and becoming interview-ready without the noise.</p>
          <div className="landing-hero__actions">
            <Link href="/register" className="landing-button landing-button--primary">Start practicing <span aria-hidden="true">→</span></Link>
            <Link href="/login" className="landing-button landing-button--secondary">I already have an account</Link>
          </div>
          <p className="landing-hero__note">Free to get started · Learn at your own pace</p>
        </div>

        <div className="landing-hero__visual" aria-label="A preview of the OA Duck practice workspace">
          <div className="landing-orbit landing-orbit--one" />
          <div className="landing-orbit landing-orbit--two" />
          <div className="landing-card landing-card--question">
            <span className="landing-card__label">TODAY&apos;S FOCUS</span>
            <strong>Reverse Integer</strong>
            <span className="landing-card__meta">Medium <i>•</i> Math</span>
            <div className="landing-progress"><span /></div>
            <small>Keep going — you&apos;re building momentum.</small>
          </div>
          <div className="landing-card landing-card--score"><span className="landing-score__icon">↗</span><span><strong>12</strong><small>solved this week</small></span></div>
          <div className="landing-hero__duck"><Image src="/OADuck.png" alt="" width={145} height={145} priority /></div>
        </div>
      </section>

      <section className="landing-features" id="why-oa-duck" aria-labelledby="features-title">
        <div className="landing-section-heading"><p className="landing-eyebrow">Everything you need</p><h2 id="features-title">Make practice feel productive.</h2></div>
        <div className="landing-feature-grid">
          {features.map(([number, title, text]) => <article className="landing-feature" key={number}><span className="landing-feature__number">{number}</span><h3>{title}</h3><p>{text}</p></article>)}
        </div>
      </section>

      <section className="landing-cta"><div><p className="landing-eyebrow">Your next breakthrough is one question away.</p><h2>Ready to get started?</h2></div><Link href="/register" className="landing-button landing-button--light">Create your account <span aria-hidden="true">→</span></Link></section>
      <footer className="landing-footer"><BrandLogo /><span>Practice with purpose.</span></footer>
    </main>
  );
}
