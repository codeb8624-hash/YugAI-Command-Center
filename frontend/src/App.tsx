import { useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext";
import ErrorBoundary from "./components/ErrorBoundary";
import BootSequence from "./components/boot/BootSequence";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ChatWidget from "./components/chat/ChatWidget";

const HomePage = lazy(() => import("./pages/HomePage"));
const ResumePage = lazy(() => import("./pages/ResumePage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const RecruiterPage = lazy(() => import("./pages/RecruiterPage"));
const ProjectCaseStudyPage = lazy(() => import("./pages/ProjectCaseStudyPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);

  if (!bootComplete) {
    return <BootSequence onComplete={() => setBootComplete(true)} />;
  }

  return (
    <ChatProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-deep-void flex flex-col">
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:text-sm focus:font-medium">
            Skip to main content
          </a>
          <main id="main-content" className="flex-1">
          <Navbar />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/recruiter" element={<RecruiterPage />} />
              <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </ErrorBoundary>
    </ChatProvider>
  );
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 p-8 text-center">
      <div className="text-6xl font-bold text-primary">404</div>
      <h1 className="text-2xl font-bold text-gray-100">Page not found</h1>
      <p className="text-gray-400 max-w-md">The page you&apos;re looking for doesn&apos;t exist.</p>
      <a href="/" className="px-6 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity">
        Go Home
      </a>
    </div>
  );
}
