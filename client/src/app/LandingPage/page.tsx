
import { Hero } from "./components/Hero";
import { WhyChooseUs } from "./components/WhyChoosUs";

export default function LandingPage() {
  return (
    <div className="scroll-smooth">
        <main>
            <Hero />
            <WhyChooseUs />
        </main>
    </div>
  );
}
