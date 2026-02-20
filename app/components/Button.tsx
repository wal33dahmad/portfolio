"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { type ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-all duration-300 cursor-pointer";

  const variants = {
    primary:
      "bg-accent text-white hover:brightness-110 shadow-lg shadow-accent/25",
    secondary:
      "liquid-glass-thin text-foreground",
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.04 },
    whileTap: { scale: 0.97 },
    transition: { type: "spring" as const, damping: 20, stiffness: 300 },
  };

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <motion.a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={combinedClassName}
          {...motionProps}
        >
          {children}
        </motion.a>
      );
    }
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link href={href} className={combinedClassName}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={combinedClassName}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}
