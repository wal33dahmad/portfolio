"use client";

import Image from "next/image";
import { type ProjectScreenshot } from "@/lib/data";

/* ─── Phone Frame ─────────────────────────────────────────────── */

interface PhoneFrameProps {
  screenshot: ProjectScreenshot;
  className?: string;
}

export function PhoneFrame({ screenshot, className = "" }: PhoneFrameProps) {
  const isPixel = screenshot.device === "pixel";

  return (
    <div className={`relative ${className}`}>
      <div
        className="relative overflow-hidden rounded-4xl border-[3px] border-foreground/10 bg-foreground/5 shadow-2xl sm:rounded-[2.5rem]"
        style={{ width: "100%", aspectRatio: "9 / 19.5" }}
      >
        <div className="absolute inset-[3px] overflow-hidden rounded-[1.7rem] bg-black sm:rounded-[2.2rem]">
          {isPixel ? (
            <div className="absolute left-1/2 top-2 z-10 h-2 w-2 -translate-x-1/2 rounded-full bg-black ring-1 ring-foreground/10 sm:top-2.5 sm:h-2.5 sm:w-2.5" />
          ) : (
            <div className="absolute left-1/2 top-1.5 z-10 h-3 w-11 -translate-x-1/2 rounded-full bg-black ring-1 ring-foreground/10 sm:top-2 sm:h-[14px] sm:w-[60px]" />
          )}
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            className="object-cover object-top"
            sizes="200px"
          />
        </div>
        <div className="absolute -right-[4px] top-[25%] h-6 w-[3px] rounded-l-sm bg-foreground/10 sm:h-8" />
        <div className="absolute -right-[4px] top-[35%] h-10 w-[3px] rounded-l-sm bg-foreground/10 sm:h-12" />
        {!isPixel && (
          <div className="absolute -left-[4px] top-[22%] h-5 w-[3px] rounded-r-sm bg-foreground/10 sm:h-6" />
        )}
      </div>
    </div>
  );
}

/* ─── Browser Frame ───────────────────────────────────────────── */

interface BrowserFrameProps {
  screenshot: ProjectScreenshot;
  className?: string;
}

export function BrowserFrame({
  screenshot,
  className = "",
}: BrowserFrameProps) {
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 shadow-2xl sm:rounded-xl">
        <div className="flex h-6 items-center gap-1.5 border-b border-foreground/5 bg-foreground/3 px-2.5 sm:h-8 sm:px-3">
          <div className="h-2 w-2 rounded-full bg-[#FF5F57] sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-[#FEBC2E] sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-[#28C840] sm:h-2.5 sm:w-2.5" />
          <div className="mx-auto h-3.5 w-24 rounded-md bg-foreground/5 sm:h-4 sm:w-32" />
        </div>
        <div className="relative" style={{ aspectRatio: "16 / 10" }}>
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 640px) 90vw, 500px"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Triple phone showcase (e.g. Telegram app with 3 screens) ─── */

function TriplePhoneShowcase({ phones }: { phones: ProjectScreenshot[] }) {
  const [left, center, right] = phones;
  return (
    <div className="relative flex w-full items-center justify-center overflow-hidden py-8 sm:py-10">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(124,58,237,0.06), transparent)",
        }}
      />
      <div className="relative mx-auto" style={{ width: "min(90%, 420px)", height: "320px" }}>
        {left && (
          <div
            className="absolute z-1 drop-shadow-2xl"
            style={{
              width: "35%",
              left: "2%",
              bottom: "4%",
              transform: "rotate(-8deg)",
            }}
          >
            <PhoneFrame screenshot={left} />
          </div>
        )}
        {center && (
          <div
            className="absolute z-3 drop-shadow-2xl"
            style={{
              width: "38%",
              left: "50%",
              top: "0",
              transform: "translateX(-50%)",
            }}
          >
            <PhoneFrame screenshot={center} />
          </div>
        )}
        {right && (
          <div
            className="absolute z-1 drop-shadow-2xl"
            style={{
              width: "35%",
              right: "2%",
              bottom: "4%",
              transform: "rotate(8deg)",
            }}
          >
            <PhoneFrame screenshot={right} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Device Showcase (Bento-aware) ───────────────────────────── */

interface DeviceShowcaseProps {
  screenshots: ProjectScreenshot[];
  variant: "wide" | "standard";
  fillHeight?: boolean;
}

export function DeviceShowcase({
  screenshots,
  variant,
  fillHeight = false,
}: DeviceShowcaseProps) {
  if (!screenshots || screenshots.length === 0) return null;

  const phones = screenshots.filter(
    (s) => s.device === "iphone" || s.device === "pixel"
  );
  const browsers = screenshots.filter((s) => s.device === "browser");

  const hasPhone = phones.length > 0;
  const hasBrowser = browsers.length > 0;
  const isMultiDevice = hasPhone && hasBrowser;

  if (hasPhone && phones.length >= 3 && variant === "wide") {
    return <TriplePhoneShowcase phones={phones.slice(0, 3)} />;
  }

  if (isMultiDevice && variant === "wide") {
    return (
      <div className="relative overflow-hidden px-4 py-4 sm:px-5 sm:py-5">
        <div className="w-full translate-y-2 sm:translate-y-4">
          <BrowserFrame screenshot={browsers[0]} />
        </div>
        <div className="absolute right-4 top-[121px] z-10 w-[165px] shrink-0 sm:right-6 sm:top-[121px] sm:w-[260px]">
          <PhoneFrame screenshot={phones[0]} />
        </div>
      </div>
    );
  }

  if (hasBrowser) {
    return (
      <div className="max-h-[200px] overflow-hidden px-4 pt-4 sm:max-h-[280px] sm:px-5 sm:pt-6">
        <div className="translate-y-2 sm:translate-y-4">
          <BrowserFrame screenshot={browsers[0]} />
        </div>
      </div>
    );
  }

  if (hasPhone) {
    if (fillHeight) {
      return (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-4 py-4">
          <div className="flex h-full w-full items-center justify-center">
            <div
              className="h-full w-auto max-w-[70%] shrink-0"
              style={{ aspectRatio: "9/19.5" }}
            >
              <PhoneFrame screenshot={phones[0]} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="flex max-h-[260px] flex-col items-center overflow-hidden pt-5 sm:max-h-[300px] sm:pt-6">
        <div className="w-[52%] max-w-[165px] shrink-0 sm:w-[70%] sm:max-w-[260px]">
          <PhoneFrame screenshot={phones[0]} />
        </div>
      </div>
    );
  }

  return null;
}
