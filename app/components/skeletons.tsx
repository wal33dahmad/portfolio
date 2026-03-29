/* Skeleton fallbacks for Suspense boundaries — animate-pulse blocks that
   preserve section height while data streams in. */

function Pulse({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-foreground/5 ${className}`} />
  );
}

/* ─── Hero ─────────────────────────────────────────────────────── */
export function HeroSkeleton() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="flex w-full max-w-3xl flex-col items-center gap-5">
        <Pulse className="h-4 w-28" />
        <Pulse className="h-14 w-3/4" />
        <Pulse className="h-5 w-2/4" />
        <div className="flex gap-3">
          <Pulse className="h-7 w-24 rounded-full" />
          <Pulse className="h-7 w-24 rounded-full" />
        </div>
        <div className="mt-2 flex gap-3">
          <Pulse className="h-10 w-32 rounded-full" />
          <Pulse className="h-10 w-32 rounded-full" />
        </div>
      </div>
    </section>
  );
}

/* ─── Generic section (Experience / Skills / Education) ─────────── */
export function SectionSkeleton() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="mb-4 flex flex-col items-center gap-3">
          <Pulse className="h-5 w-36" />
          <Pulse className="h-3.5 w-56" />
        </div>
        <Pulse className="h-44" />
        <Pulse className="h-44" />
        <Pulse className="h-44" />
      </div>
    </section>
  );
}

/* ─── Projects ─────────────────────────────────────────────────── */
export function ProjectsSkeleton() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <div className="mb-4 flex flex-col items-center gap-3">
          <Pulse className="h-5 w-40" />
          <Pulse className="h-3.5 w-64" />
        </div>
        {/* Featured wide card */}
        <Pulse className="h-[420px] rounded-3xl" />
        {/* Bento grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[360px]">
          <Pulse className="sm:col-span-2 sm:row-span-2" />
          <Pulse className="sm:col-span-4" />
          <Pulse className="sm:col-span-4" />
          <Pulse className="sm:col-span-3" />
          <Pulse className="sm:col-span-3" />
        </div>
      </div>
    </section>
  );
}

/* ─── TrustLine (testimonials) ─────────────────────────────────── */
export function TrustLineSkeleton() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-3xl flex-col gap-5">
        <div className="mb-4 flex flex-col items-center gap-3">
          <Pulse className="h-5 w-36" />
          <Pulse className="h-3.5 w-52" />
        </div>
        <Pulse className="mx-auto h-10 w-36 rounded-full" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Pulse className="h-36" />
          <Pulse className="h-36" />
          <Pulse className="h-36" />
          <Pulse className="h-36" />
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ──────────────────────────────────────────────────── */
export function ContactSkeleton() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto flex max-w-2xl flex-col gap-5">
        <div className="mb-4 flex flex-col items-center gap-3">
          <Pulse className="h-5 w-32" />
          <Pulse className="h-3.5 w-48" />
        </div>
        <Pulse className="h-80" />
      </div>
    </section>
  );
}
