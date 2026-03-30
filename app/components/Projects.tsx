"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project, ProjectType } from "@/lib/types";
import { fadeInUp, staggerContainer, extraItem } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import Card from "./Card";
import { DeviceShowcase } from "./DeviceFrames";
import { Code2, ExternalLink, Globe, LayoutGrid, Smartphone } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
}

function TypeBadge({ type }: { type: ProjectType }) {
  const isMobile = type === "mobile";
  const isBoth = type === "both";
  const Icon = isBoth ? LayoutGrid : isMobile ? Smartphone : Globe;
  const label = isBoth ? "Web + Mobile" : isMobile ? "Mobile" : "Web";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm ${
        isMobile
          ? "bg-accent-mobile/15 text-accent-mobile"
          : isBoth
            ? "bg-foreground/10 text-foreground"
            : "bg-accent/15 text-accent"
      }`}
    >
      <Icon size={10} />
      {label}
    </span>
  );
}

function ProjectLink({ link, github }: { link?: string; github?: string }) {
  const href = link ?? github;
  if (!href) return null;
  const isGithub = !link && !!github;
  const Icon = isGithub ? Code2 : ExternalLink;
  const label = isGithub ? "View on GitHub" : "Visit site";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="shrink-0 cursor-pointer rounded-full p-1.5 text-muted transition-colors hover:text-foreground"
    >
      <Icon size={14} className="cursor-pointer" />
    </a>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const isMobile = project.type === "mobile";
  return (
    <motion.div variants={fadeInUp}>
      <Card className="rounded-3xl">
        <div
          className={`h-[2px] shrink-0 rounded-t-3xl ${isMobile ? "bg-accent-mobile" : "bg-accent"}`}
          aria-hidden
        />
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="relative overflow-hidden">
            <DeviceShowcase
              screenshots={project.screenshots}
              variant="wide"
            />
            <div className="absolute top-3 left-3 z-20 flex items-center gap-2 sm:top-4 sm:left-4">
              <TypeBadge type={project.type} />
              {project.highlight && (
                <span className="liquid-glass-thin rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                  {project.highlight}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 left-0 z-20 p-3 sm:p-4">
              <div className="max-w-md rounded-2xl border border-glass-border bg-glass p-5 backdrop-blur-2xl backdrop-saturate-150 sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                    {project.title}
                  </h3>
                  <ProjectLink link={project.link} github={project.github} />
                </div>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`liquid-glass-thin rounded-full px-2.5 py-0.5 text-[10px] font-medium sm:text-xs ${isMobile ? "text-accent-mobile" : "text-accent"}`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function BentoCard({
  project,
  fillHeight = false,
}: {
  project: Project;
  fillHeight?: boolean;
}) {
  const isMobile = project.type === "mobile";

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="relative flex flex-col overflow-hidden pt-8 sm:min-h-0 sm:flex-1 sm:pt-0">
          <DeviceShowcase
            screenshots={project.screenshots}
            variant="standard"
            fillHeight={fillHeight}
          />
          <div className="absolute top-2 left-2 z-10">
            <TypeBadge type={project.type} />
          </div>
        </div>
      )}

      {fillHeight ? (
        // Natural footer — sits below the phone, no overlap
        <div className="shrink-0 border-t border-glass-border bg-glass p-3 backdrop-blur-2xl backdrop-saturate-150 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
            <ProjectLink link={project.link} github={project.github} />
          </div>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
            {project.description}
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`liquid-glass-thin rounded-full px-2 py-0.5 text-[10px] font-medium ${isMobile ? "text-accent-mobile" : "text-accent"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        // Mobile: natural flow below device. Desktop (sm+): absolute overlay.
        <div className="border-t border-glass-border bg-glass p-3 backdrop-blur-2xl backdrop-saturate-150 sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-20 sm:p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-semibold text-foreground">{project.title}</h3>
            <ProjectLink link={project.link} github={project.github} />
          </div>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
              {project.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`liquid-glass-thin rounded-full px-2 py-0.5 text-[10px] font-medium ${isMobile ? "text-accent-mobile" : "text-accent"}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
      )}
    </Card>
  );
}

export default function Projects({ projects }: ProjectsProps) {
  const [visibleExtraIds, setVisibleExtraIds] = useState<string[]>([]);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    return () => {
      timerRefs.current.forEach(clearTimeout);
    };
  }, []);

  const [featured, ...rest] = projects;
  const visible = rest.slice(0, 5);
  const extra = rest.slice(5);

  function handleToggle() {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
    if (visibleExtraIds.length === 0) {
      setVisibleExtraIds(extra.map((p) => p.id));
    } else {
      [...extra].reverse().forEach((project, i) => {
        const t = setTimeout(() => {
          setVisibleExtraIds((prev) => prev.filter((id) => id !== project.id));
        }, i * 80);
        timerRefs.current.push(t);
      });
    }
  }

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-center px-6 py-20"
    >
      <SectionTitle
        title="Things I've Built"
        subtitle="Web apps, mobile apps, and full-stack products — from idea to launch."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto flex w-full max-w-5xl flex-col gap-5"
        layout
      >
        {featured && <FeaturedCard project={featured} />}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[360px]">
          {visible[0] && (
            <motion.div variants={fadeInUp} className="sm:col-span-2 sm:row-span-2">
              <BentoCard project={visible[0]} fillHeight={true} />
            </motion.div>
          )}
          {visible[1] && (
            <motion.div variants={fadeInUp} className="sm:col-span-4">
              <BentoCard project={visible[1]} />
            </motion.div>
          )}
          {visible[2] && (
            <motion.div variants={fadeInUp} className="sm:col-span-4">
              <BentoCard project={visible[2]} />
            </motion.div>
          )}
          {visible[3] && (
            <motion.div variants={fadeInUp} className="sm:col-span-3">
              <BentoCard project={visible[3]} />
            </motion.div>
          )}
          {visible[4] && (
            <motion.div variants={fadeInUp} className="sm:col-span-3">
              <BentoCard project={visible[4]} />
            </motion.div>
          )}
        </div>

        {visibleExtraIds.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[360px]">
            {extra.map((project, i) => (
              <div key={project.id} className="sm:col-span-3">
                <AnimatePresence>
                  {visibleExtraIds.includes(project.id) && (
                    <motion.div
                      key={project.id}
                      className="h-full"
                      custom={i}
                      variants={extraItem}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <BentoCard project={project} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}

        {extra.length > 0 && (
          <motion.div layout className="flex justify-center">
            <button
              onClick={handleToggle}
              className="liquid-glass-thin rounded-full px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {visibleExtraIds.length > 0 ? "Show less" : `Load more (${extra.length})`}
            </button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
