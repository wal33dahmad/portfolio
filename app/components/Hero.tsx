"use client";

import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { personalInfo } from "@/lib/data";
import { heroTitle, heroSubtitle } from "@/lib/animations";
import Button from "./Button";
import { ArrowDown, Globe, Smartphone } from "lucide-react";

function FloatingOrb({
  size,
  x,
  y,
  delay,
  color,
}: {
  size: number;
  x: string;
  y: string;
  delay: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 2,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className="pointer-events-none absolute rounded-full"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
        filter: "blur(100px)",
      }}
    />
  );
}

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        <FloatingOrb
          size={500}
          x="5%"
          y="10%"
          delay={0.2}
          color="rgba(0, 113, 227, 0.15)"
        />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        <FloatingOrb
          size={400}
          x="60%"
          y="15%"
          delay={0.5}
          color="rgba(124, 58, 237, 0.12)"
        />
      </motion.div>
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        <FloatingOrb
          size={350}
          x="35%"
          y="55%"
          delay={0.8}
          color="rgba(236, 72, 153, 0.08)"
        />
      </motion.div>

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
          className="mt-6 max-w-lg text-lg leading-relaxed text-muted md:text-xl"
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
          className="mt-20"
        >
          <a
            href="#skills"
            className="flex flex-col items-center gap-2 text-muted transition-colors hover:text-foreground"
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
