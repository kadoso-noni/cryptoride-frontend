
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChoosUs";
import { HowItWorks } from "./components/HowItWorks";
import { GetStarted } from "./components/GetStarted";
export default function LandingPage() {
  return (
    <div className="scroll-smooth">
        <main>
            <Hero />
            <WhyChooseUs />
            <HowItWorks />
            <GetStarted />
        </main>
    </div>
  );
}
