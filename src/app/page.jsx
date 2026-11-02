import { auth } from "../auth";
import LandingNav from "./components/LandingNav";
import LandingHero from "./components/LandingHero";
import LandingFeatures from "./components/LandingFeatures";
import LandingWorkflow from "./components/LandingWorkflow";
import LandingBuilders from "./components/LandingBuilders";
import LandingFooter from "./components/LandingFooter";

export default async function Home() {
  const session = await auth();
  const isSignedIn = Boolean(session?.user);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#171916]">
      <LandingNav isSignedIn={isSignedIn} />
      <LandingHero isSignedIn={isSignedIn} />
      <LandingFeatures />
      <LandingWorkflow />
      <LandingBuilders />
      <LandingFooter isSignedIn={isSignedIn} />
    </main>
  );
}
