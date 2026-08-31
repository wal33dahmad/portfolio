"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import type { PersonalInfo } from "@/lib/types";
import { heroTitle, heroSubtitle } from "@/lib/animations";
import { HERO_TECH, PROOF_POINTS } from "@/lib/brand";
import Button from "./Button";
import { ArrowDown } from "lucide-react";
import Aurora from "./Aurora";

interface HeroProps {
  personalInfo: PersonalInfo;
}

export default function Hero({ personalInfo }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const emptySubscribe = () => () => {};
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  const isDark = resolvedTheme === "dark";
  const auroraColors = mounted && isDark
    ? ["#2997ff", "#a78bfa", "#ec4899"]
    : ["#0071e3", "#7c3aed", "#ec4899"];

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <motion.div style={{ y: y1 }} className="absolute inset-0 opacity-75 dark:opacity-100">
        <Aurora
          colorStops={auroraColors}
          blend={0.5}
          amplitude={mounted && isDark ? 1.0 : 0.8}
          speed={1}
        />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 z-5 dark:hidden"
        style={{
          background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(245,245,247,0.7), transparent 70%)",
        }}
      />

      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 flex max-w-3xl flex-col items-center text-center"
      >
        <motion.p
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
          className="mb-4 text-sm font-medium uppercase tracking-widest text-accent"
        >
          {personalInfo.title}
        </motion.p>

        <motion.h1
          variants={heroTitle}
          initial="hidden"
          animate="visible"
          className="font-bold tracking-tight text-foreground"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)" }}
        >
          {personalInfo.name}
        </motion.h1>

        <motion.p
          variants={heroSubtitle}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-2xl text-lg leading-relaxed text-balance text-foreground/70 md:text-xl"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
        >
          {HERO_TECH.map((tech) => (
            <span
              key={tech}
              className={`liquid-glass-thin rounded-full px-3.5 py-1.5 text-xs font-medium ${
                tech === "AI/LLMs" ? "text-accent-mobile" : "text-accent"
              }`}
            >
              {tech}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium tracking-wide text-muted sm:text-sm"
        >
          {PROOF_POINTS.map((point, i) => (
            <span key={point} className="flex items-center gap-x-3">
              {i > 0 && (
                <span aria-hidden className="text-foreground/25">
                  ·
                </span>
              )}
              {point}
            </span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="#projects" variant="primary">
            View Projects
          </Button>
          <Button href="#contact" variant="secondary">
            Contact Me
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-14"
        >
          <a
            href="#experience"
            className="flex flex-col items-center gap-2 text-foreground/50 transition-colors hover:text-foreground"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown size={16} />
            </motion.div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
