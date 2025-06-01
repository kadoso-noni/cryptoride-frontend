
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChoosUs";
import { HowItWorks } from "./components/HowItWorks";

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
        <main>
            <Hero />
            <WhyChooseUs />
            <HowItWorks />
        </main>
    </div>
  );
}
