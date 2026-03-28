"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import type { ProjectScreenshot } from "@/lib/types";

/* ─── Phone Frame ─────────────────────────────────────────────── */

/** Matches `public/images/phone-frame.svg` viewBox. */
const FRAME = { w: 971, h: 2048 } as const;

/** Screen cutout as defined in phone-frame.svg. */
const SCREEN = { x: 43, y: 44, w: 879, h: 1962, rx: 120 } as const;

function screenStyle(): CSSProperties {
  return {
    left: `${(SCREEN.x / FRAME.w) * 100}%`,
    top: `${(SCREEN.y / FRAME.h) * 100}%`,
    width: `${(SCREEN.w / FRAME.w) * 100}%`,
    height: `${(SCREEN.h / FRAME.h) * 100}%`,
    borderRadius: `${(SCREEN.rx / SCREEN.w) * 100}% / ${(SCREEN.rx / SCREEN.h) * 100}%`,
  };
}

interface PhoneFrameProps {
  screenshot: ProjectScreenshot;
  className?: string;
}

export function PhoneFrame({ screenshot, className = "" }: PhoneFrameProps) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${FRAME.w} / ${FRAME.h}` }}
    >
      <div
        className="absolute z-10 overflow-hidden bg-[#080810]"
        style={screenStyle()}
      >
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, 280px"
          style={{ objectFit: "cover", minHeight: "100%", minWidth: "100%" }}
        />
      </div>
      <Image
        src="/images/phone-frame.webp"
        alt=""
        fill
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none"
        sizes="200px"
      />
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
    <div className="relative flex w-full items-center justify-center overflow-hidden py-8 sm:py-12">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(124,58,237,0.06), transparent)",
        }}
      />
      <div className="relative mx-auto" style={{ width: "min(95%, 600px)", height: "420px" }}>
        {left && (
          <div
            className="absolute z-1 drop-shadow-2xl"
            style={{
              width: "34%",
              left: "2%",
              bottom: "2%",
              transform: "rotate(-6deg)",
            }}
          >
            <PhoneFrame screenshot={left} />
          </div>
        )}
        {center && (
          <div
            className="absolute z-3 drop-shadow-2xl"
            style={{
              width: "36%",
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
              width: "34%",
              right: "2%",
              bottom: "2%",
              transform: "rotate(6deg)",
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
          <div className="w-[60%] max-w-[220px] shrink-0 sm:w-[70%] sm:max-w-[260px]">
            <PhoneFrame screenshot={phones[0]} />
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
