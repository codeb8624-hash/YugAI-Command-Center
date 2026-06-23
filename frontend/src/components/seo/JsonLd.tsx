import { Helmet } from "react-helmet-async";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yug Sathavara",
    jobTitle: "Full Stack Developer",
    description:
      "AI-focused Full Stack Developer building web apps, Android apps, and intelligent systems.",
    url: "https://yugai.vercel.app",
    knowsAbout: [
      "React",
      "Node.js",
      "TypeScript",
      "Java",
      "MySQL",
      "AI Integration",
    ],
    sameAs: [
      "https://github.com/codeb8624-hash",
      "https://linkedin.com/in/yug-sathavara",
    ],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
}
