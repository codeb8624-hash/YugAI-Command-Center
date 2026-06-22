export default function Footer() {
  return (
    <footer className="border-t border-border bg-deep-void">
      <div className="container-main py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-mono text-lg font-bold text-gradient">
              YugAI
            </span>
            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
              AI-powered career twin portfolio. Built with React, TypeScript,
              and the spirit of a hacker.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Quick Links
            </h3>
            <div className="space-y-2">
              {["Projects", "Skills", "Resume", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-sm text-text-secondary hover:text-primary transition-colors duration-200"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">
              Connect
            </h3>
            <div className="space-y-2">
              {[
                { label: "GitHub", href: "https://github.com/yugsathavara" },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/yugsathavara",
                },
                { label: "Email", href: "mailto:yug@example.com" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-text-secondary hover:text-secondary transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted font-mono">
            &copy; {new Date().getFullYear()} Yug Sathavara. Built with
            precision.
          </p>
          <p className="text-xs text-text-muted font-mono">
            <span className="text-success">AI_TWIN_ONLINE</span> — v2.0.0
          </p>
        </div>
      </div>
    </footer>
  );
}
