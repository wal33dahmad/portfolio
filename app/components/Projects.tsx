"use client";

import { motion } from "motion/react";
import { projects, type Project, type ProjectType } from "@/lib/data";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import Card from "./Card";
import { DeviceShowcase } from "./DeviceFrames";
import { Globe, LayoutGrid, Smartphone } from "lucide-react";

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
            ? "bg-white/15 text-white"
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
            <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-background/70 via-background/20 to-transparent" />
            <DeviceShowcase
              screenshots={project.screenshots}
              variant="wide"
            />
            <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
              <div className="mb-2 flex items-center gap-2">
                <TypeBadge type={project.type} />
                {project.highlight && (
                  <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
                    {project.highlight}
                  </span>
                )}
              </div>
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
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium sm:text-xs ${isMobile ? "bg-accent-mobile/10 text-accent-mobile" : "bg-accent/10 text-accent"}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

function BentoCard({ project }: { project: Project }) {
  const isMobile = project.type === "mobile";

  return (
    <Card className="flex h-full flex-col">
      {project.screenshots && project.screenshots.length > 0 && (
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <div className="pointer-events-none absolute inset-0 z-10 bg-linear-to-t from-background/60 via-transparent to-transparent" />
          <DeviceShowcase
            screenshots={project.screenshots}
            variant="standard"
            fillHeight={project.id === "patron-manager"}
          />
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5">
            <TypeBadge type={project.type} />
          </div>
        </div>
      )}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-foreground sm:text-base">
          {project.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${isMobile ? "bg-accent-mobile/10 text-accent-mobile" : "bg-accent/10 text-accent"}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 py-32"
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

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[320px]">
          {rest[0] && (
            <motion.div variants={fadeInUp} className="sm:col-span-2 sm:row-span-2">
              <BentoCard project={rest[0]} />
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
