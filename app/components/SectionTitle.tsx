"use client";

import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { fadeInUp } from "@/lib/animations";
import GradientText from "./GradientText";

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
  const { resolvedTheme } = useTheme();

  const gradientColors =
    resolvedTheme === "dark"
      ? ["#a78bfa", "#FF9FFC", "#2997ff"]
      : ["#5227FF", "#ec4899", "#0071e3"];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`text-center mb-10 ${className}`}
    >
      <GradientText
        colors={gradientColors}
        animationSpeed={8}
        showBorder={false}
      >
        <h2
          className="font-semibold tracking-tight"
          style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
        >
          {title}
        </h2>
      </GradientText>
      {subtitle && (
        <p className="mt-4 text-muted text-lg max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
