"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useTheme } from "next-themes";
import { personalInfo } from "@/lib/data";
import { heroTitle, heroSubtitle } from "@/lib/animations";
import Button from "./Button";
import { ArrowDown, Globe, Smartphone } from "lucide-react";
import Aurora from "./Aurora";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const isDark = resolvedTheme === "dark";
  const auroraColors = isDark
    ? ["#2997ff", "#a78bfa", "#ec4899"]
    : ["#0071e3", "#7c3aed", "#ec4899"];

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <motion.div style={{ y: y1 }} className={`absolute inset-0 ${isDark ? "" : "opacity-60"}`}>
        <Aurora
          colorStops={auroraColors}
          blend={0.5}
          amplitude={isDark ? 1.0 : 0.8}
          speed={1}
        />
      </motion.div>

      {!isDark && (
        <div
          className="pointer-events-none absolute inset-0 z-5"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(245,245,247,0.7), transparent 70%)",
          }}
        />
      )}

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
          className="mt-6 max-w-lg text-lg leading-relaxed text-foreground/70 md:text-xl"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <span className="liquid-glass-thin inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-accent">
            <Globe size={14} />
            Web
          </span>
          <span className="liquid-glass-thin inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-accent-mobile">
            <Smartphone size={14} />
            Mobile
          </span>
        </motion.div>

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
