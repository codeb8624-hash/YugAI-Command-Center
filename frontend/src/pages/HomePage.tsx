import HeroSection from "../components/hero/HeroSection";
import LiveMetrics from "../components/metrics/LiveMetrics";
import QuestionChips from "../components/chips/QuestionChips";
import SystemStatusPanel from "../components/status/SystemStatusPanel";
import FeaturedProjects from "../components/projects/FeaturedProjects";
import RecruiterCTA from "../components/recruiter/RecruiterCTA";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LiveMetrics />
      <QuestionChips />
      <SystemStatusPanel />
      <FeaturedProjects />
      <RecruiterCTA />
    </>
  );
}
