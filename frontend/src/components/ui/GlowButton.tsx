import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function GlowButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  href,
  className = "",
}: GlowButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 cursor-pointer select-none";

  const sizes: Record<string, string> = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3.5 text-lg",
  };

  const variants: Record<string, string> = {
    primary:
      "bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20 hover:shadow-primary/40",
    secondary:
      "border border-primary/40 text-primary hover:bg-primary/10 hover:border-primary",
    ghost:
      "text-text-secondary hover:text-text-primary hover:bg-surface-elevated",
  };

  const content = (
    <motion.span
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return (
      <a href={href} className="inline-block">
        {content}
      </a>
    );
  }

  return content;
}
