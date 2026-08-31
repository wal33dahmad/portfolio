"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project, ProjectType } from "@/lib/types";
import { fadeInUp, staggerContainer, extraGrid, extraItem } from "@/lib/animations";
import SectionTitle from "./SectionTitle";
import Card from "./Card";
import { DeviceShowcase } from "./DeviceFrames";
import { Code2, ExternalLink, Globe, LayoutGrid, Smartphone } from "lucide-react";

interface ProjectsProps {
  projects: Project[];
}

const TYPE_META = {
  web: { Icon: Globe, label: "Web" },
  mobile: { Icon: Smartphone, label: "Mobile" },
  both: { Icon: LayoutGrid, label: "Web + Mobile" },
} as const;

/** Featured Work — the rest of the list falls through to "More Projects". */
const FEATURED_COUNT = 5;

function TypeBadge({ type }: { type: ProjectType }) {
  const { Icon, label } = TYPE_META[type];
  const isMobile = type === "mobile";
  const isBoth = type === "both";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-glass-panel px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur-sm ${
        isMobile
          ? "text-accent-mobile"
          : isBoth
            ? "text-foreground"
            : "text-accent"
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

/* Screenshots pending — an accent wash behind a faded device glyph, so the
   card keeps its shape and reads as deliberate rather than broken. */
function NoShotsCanvas({
  type,
  className = "",
}: {
  type: ProjectType;
  className?: string;
}) {
  const { Icon } = TYPE_META[type];
  const isMobile = type === "mobile";
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: isMobile
            ? "radial-gradient(ellipse 60% 60% at 50% 45%, rgba(124,58,237,0.10), transparent)"
            : "radial-gradient(ellipse 60% 60% at 50% 45%, rgba(0,113,227,0.10), transparent)",
        }}
        aria-hidden
      />
      <Icon
        size={56}
        strokeWidth={1}
        className={`relative ${isMobile ? "text-accent-mobile/25" : "text-accent/25"}`}
        aria-hidden
      />
    </div>
  );
}

/* ─── Featured layout ──────────────────────────────────────────── */

/** The tall column is only ~330px wide, so it holds exactly one portrait
    phone — a three-phone fan or a browser + phone pair needs a wide slot.
    That constraint, not editorial preference, picks the sidebar card. */
function fitsNarrowColumn(project: Project): boolean {
  const shots = project.screenshots ?? [];
  return (
    shots.length === 1 &&
    shots[0].device !== "browser" &&
    shots[0].device !== "iphone-landscape"
  );
}

/** Featured tier: a lead hero, then a three-card block — one narrow
    full-height sidebar plus two 2/3-width cards stacked beside it — then any
    remaining featured projects as full-width cards. Filled positionally from
    `order`, so the DB still decides which project lands in which slot. */
function featuredLayout(featured: Project[]) {
  const [lead, ...rest] = featured;
  const sidebar = rest.find(fitsNarrowColumn);
  const remaining = rest.filter((p) => p !== sidebar);
  return {
    lead,
    sidebar,
    block: remaining.slice(0, 2),
    trailing: remaining.slice(2),
  };
}

/* ─── Cards ────────────────────────────────────────────────────── */

function FeaturedCard({ project }: { project: Project }) {
  const isMobile = project.type === "mobile";
  const shots = project.screenshots ?? [];

  return (
    <motion.div variants={fadeInUp}>
      <Card className="rounded-3xl">
        <div
          className={`h-[2px] shrink-0 rounded-t-3xl ${isMobile ? "bg-accent-mobile" : "bg-accent"}`}
          aria-hidden
        />
        <div className="relative overflow-hidden">
          {shots.length > 0 ? (
            <DeviceShowcase screenshots={shots} variant="wide" />
          ) : (
            <NoShotsCanvas type={project.type} className="h-48 sm:h-72" />
          )}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2 sm:top-4 sm:left-4">
            <TypeBadge type={project.type} />
            {project.highlight && (
              <span className="rounded-full border border-glass-border bg-glass-panel px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground backdrop-blur-sm">
                {project.highlight}
              </span>
            )}
          </div>
        </div>

        {/* Mobile: flows below the shot — a phone-width hero is too short to
            sit under an overlay. Desktop (sm+): glass panel on its lower edge. */}
        <div className="p-3 sm:absolute sm:bottom-0 sm:left-0 sm:z-20 sm:p-4">
          <div className="max-w-md rounded-2xl border border-glass-border bg-glass-panel p-5 backdrop-blur-2xl backdrop-saturate-150 sm:p-6">
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
      </Card>
    </motion.div>
  );
}

function BentoCard({
  project,
  fillHeight = false,
  wide = false,
}: {
  project: Project;
  fillHeight?: boolean;
  /** A 2/3-width slot is roomy enough for the wide compositions. */
  wide?: boolean;
}) {
  const isMobile = project.type === "mobile";
  const shots = project.screenshots ?? [];

  const footer = (
    <>
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
    </>
  );

  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <div className="relative flex flex-col overflow-hidden pt-8 sm:min-h-0 sm:flex-1 sm:pt-0">
        {shots.length > 0 ? (
          <DeviceShowcase
            screenshots={shots}
            variant={wide ? "wide" : "standard"}
            compact={wide}
            fillHeight={fillHeight}
          />
        ) : (
          <NoShotsCanvas type={project.type} className="min-h-40 flex-1" />
        )}
        <div className="absolute top-2 left-2 z-10">
          <TypeBadge type={project.type} />
        </div>
      </div>

      {fillHeight ? (
        // Natural footer — sits below the phone, no overlap
        <div className="shrink-0 border-t border-glass-border bg-glass-panel p-3 backdrop-blur-2xl backdrop-saturate-150 sm:p-4">
          {footer}
        </div>
      ) : (
        // Mobile: natural flow below device. Desktop (sm+): absolute overlay.
        <div className="border-t border-glass-border bg-glass-panel p-3 backdrop-blur-2xl backdrop-saturate-150 sm:absolute sm:inset-x-0 sm:bottom-0 sm:z-20 sm:p-4">
          {footer}
        </div>
      )}
    </Card>
  );
}

/* ─── Section ──────────────────────────────────────────────────── */

export default function Projects({ projects }: ProjectsProps) {
  const [expanded, setExpanded] = useState(false);

  const featured = projects.slice(0, FEATURED_COUNT);
  const more = projects.slice(FEATURED_COUNT);
  const { lead, sidebar, block, trailing } = featuredLayout(featured);

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-center px-6 py-20"
    >
      <SectionTitle
        title="Featured Work"
        subtitle="Web apps, mobile apps, and full-stack products — from idea to launch."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto flex w-full max-w-5xl flex-col gap-5"
      >
        {lead && <FeaturedCard project={lead} />}

        {(sidebar || block.length > 0) && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[460px]">
            {sidebar && (
              <motion.div
                variants={fadeInUp}
                className="sm:col-span-2 sm:row-span-2"
              >
                <BentoCard project={sidebar} fillHeight />
              </motion.div>
            )}
            {block.map((project) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="sm:col-span-4"
              >
                <BentoCard project={project} wide />
              </motion.div>
            ))}
          </div>
        )}

        {trailing.map((project) => (
          <FeaturedCard key={project.id} project={project} />
        ))}
      </motion.div>

      {more.length > 0 && (
        /* Its own viewport trigger — sharing the section's stagger clock would
           have the last card finish animating far below the fold. */
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-12 flex w-full max-w-5xl flex-col gap-5"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-4">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted">
              More Projects
            </h3>
            <span className="h-px flex-1 bg-glass-border" aria-hidden />
          </motion.div>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="more-grid"
                variants={extraGrid}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[360px]"
              >
                {more.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={extraItem}
                    className="sm:col-span-3"
                  >
                    <BentoCard project={project} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div variants={fadeInUp} className="flex justify-center">
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              className="liquid-glass-thin rounded-full px-6 py-2.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
            >
              {expanded ? "Show less" : `Show more (${more.length})`}
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
