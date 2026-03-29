"use client";

import { motion } from "motion/react";
import type { Project, ProjectType } from "@/lib/types";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import Card from "./Card";
import { DeviceShowcase } from "./DeviceFrames";
import { Globe, LayoutGrid, Smartphone } from "lucide-react";

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
                <h3 className="text-lg font-semibold text-foreground sm:text-xl">
                  {project.title}
                </h3>
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
    <Card className="flex h-full min-h-[400px] flex-col overflow-hidden sm:min-h-0">
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
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
          <h3 className="text-sm font-semibold text-foreground">
            {project.title}
          </h3>
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
        // Overlay footer — sits on top of image for standard cards
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="border-t border-glass-border bg-glass p-3 backdrop-blur-2xl backdrop-saturate-150 sm:p-4">
            <h3 className="text-sm font-semibold text-foreground">
              {project.title}
            </h3>
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
        </div>
      )}
    </Card>
  );
}

export default function Projects({ projects }: ProjectsProps) {
  const [featured, ...rest] = projects;

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
      >
        {featured && <FeaturedCard project={featured} />}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[360px]">
          {rest[0] && (
            <motion.div variants={fadeInUp} className="sm:col-span-2 sm:row-span-2">
              <BentoCard project={rest[0]} fillHeight={true} />
            </motion.div>
          )}
          {rest[1] && (
            <motion.div variants={fadeInUp} className="sm:col-span-4">
              <BentoCard project={rest[1]} />
            </motion.div>
          )}
          {rest[2] && (
            <motion.div variants={fadeInUp} className="sm:col-span-4">
              <BentoCard project={rest[2]} />
            </motion.div>
          )}
          {rest[3] && (
            <motion.div variants={fadeInUp} className="sm:col-span-3">
              <BentoCard project={rest[3]} />
            </motion.div>
          )}
          {rest[4] && (
            <motion.div variants={fadeInUp} className="sm:col-span-3">
              <BentoCard project={rest[4]} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
