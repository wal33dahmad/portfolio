"use client";

import { motion } from "motion/react";
import { fadeInUp } from "@/lib/animations";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  className = "",
}: SectionTitleProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`text-center mb-16 ${className}`}
    >
      <h2
        className="font-semibold tracking-tight text-foreground"
        style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-muted text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
