"use client";

import { motion } from "motion/react";
import type { SkillDomain } from "@/lib/types";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import { Globe, Smartphone } from "lucide-react";

const domainIcons: Record<string, React.ElementType> = {
  Globe,
  Smartphone,
};

interface SkillsProps {
  skillDomains: SkillDomain[];
}

export default function Skills({ skillDomains }: SkillsProps) {
  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center px-6 py-20"
    >
      <SectionTitle
        title="What I Work With"
        subtitle="Web and mobile — the tools and technologies I use to ship products."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-2"
      >
        {skillDomains.map((domain) => {
          const Icon = domainIcons[domain.icon] ?? Globe;
          const isMobile = domain.id === "mobile";
          const accentVar = isMobile ? "var(--accent-mobile)" : "var(--accent)";
          const chipClass = isMobile
            ? "liquid-glass-thin rounded-full px-3 py-1.5 text-xs font-medium text-accent-mobile transition-all duration-300 hover:shadow-[0_0_24px_rgba(124,58,237,0.12)]"
            : "liquid-glass-thin rounded-full px-3 py-1.5 text-xs font-medium text-accent transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,113,227,0.12)]";

          return (
            <motion.div
              key={domain.id}
              variants={fadeInUp}
              className="liquid-glass group relative flex flex-col overflow-hidden p-6 sm:p-8"
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: isMobile
                    ? "radial-gradient(ellipse at 30% 0%, rgba(124, 58, 237, 0.06), transparent 60%)"
                    : "radial-gradient(ellipse at 30% 0%, rgba(0, 113, 227, 0.06), transparent 60%)",
                }}
              />
              <div className="relative z-10">
                <div
                  className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: isMobile
                      ? "rgba(124, 58, 237, 0.12)"
                      : "rgba(0, 113, 227, 0.12)",
                    color: accentVar,
                  }}
                >
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                  {domain.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {domain.description}
                </p>
                <div className="mt-6 space-y-5">
                  {domain.categories.map((cat) => (
                    <div key={cat.name}>
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
                        {cat.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill) => (
                          <span key={skill} className={chipClass}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
