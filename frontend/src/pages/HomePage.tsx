import SEO from "../components/seo/SEO";
import HeroSection from "../components/hero/HeroSection";
import LiveMetrics from "../components/metrics/LiveMetrics";
import QuestionChips from "../components/chips/QuestionChips";
import SystemStatusPanel from "../components/status/SystemStatusPanel";
import FeaturedProjects from "../components/projects/FeaturedProjects";
import RecruiterCTA from "../components/recruiter/RecruiterCTA";

export default function HomePage() {
  return (
    <>
      <SEO
        title="YugAI Command Center | AI Career Twin & Full Stack Developer"
        description="AI-powered portfolio of Yug Sathavara featuring AI projects, recruiter dashboard, full stack development, and interactive AI career twin."
        ogUrl="https://yugai.vercel.app/"
        canonical="https://yugai.vercel.app/"
      />
      <HeroSection />
      <LiveMetrics />
      <QuestionChips />
      <SystemStatusPanel />
      <FeaturedProjects />
      <RecruiterCTA />
    </>
  );
}
