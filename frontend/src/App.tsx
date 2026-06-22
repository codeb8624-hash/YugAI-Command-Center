import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import BootSequence from "./components/boot/BootSequence";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatWidget from "./components/chat/ChatWidget";
import HomePage from "./pages/HomePage";
import ResumePage from "./pages/ResumePage";
import SkillsPage from "./pages/SkillsPage";
import RecruiterPage from "./pages/RecruiterPage";
import ProjectCaseStudyPage from "./pages/ProjectCaseStudyPage";

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);

  if (!bootComplete) {
    return <BootSequence onComplete={() => setBootComplete(true)} />;
  }

  return (
    <ChatProvider>
      <div className="min-h-screen bg-deep-void flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
          Skip to main content
        </a>
        <main id="main-content" className="flex-1">
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/resume" element={<ResumePage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/recruiter" element={<RecruiterPage />} />
            <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </ChatProvider>
  );
}
