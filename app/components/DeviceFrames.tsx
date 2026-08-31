"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import type { ProjectScreenshot } from "@/lib/types";

/* ─── iOS-style radial spinner ────────────────────────────────── */

function DeviceLoader({ size = 18 }: { size?: number }) {
  const bars = 8;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      style={{
        animation: "device-spin 0.8s steps(8, end) infinite",
        transformBox: "fill-box",
        transformOrigin: "center",
        flexShrink: 0,
      }}
      aria-hidden
    >
      <style>{`@keyframes device-spin { to { transform: rotate(360deg); } }`}</style>
      {Array.from({ length: bars }).map((_, i) => (
        <rect
          key={i}
          x="9"
          y="2.5"
          width="2"
          height="5"
          rx="1"
          fill="white"
          opacity={(i + 1) / bars}
          transform={`rotate(${(360 / bars) * i} 10 10)`}
        />
      ))}
    </svg>
  );
}

/* ─── Phone Frame ─────────────────────────────────────────────── */

const FRAME = { w: 971, h: 2048 } as const;

const SCREEN = { x: 43, y: 44, w: 879, h: 1962, rx: 120 } as const;

/* Landscape reuses the same frame asset rotated 90deg clockwise, so the screen
   box rotates with it: portrait (x, y) maps to (FRAME.h - y, x). */
function screenStyle(landscape: boolean): CSSProperties {
  if (landscape) {
    return {
      left: `${((FRAME.h - SCREEN.y - SCREEN.h) / FRAME.h) * 100}%`,
      top: `${(SCREEN.x / FRAME.w) * 100}%`,
      width: `${(SCREEN.h / FRAME.h) * 100}%`,
      height: `${(SCREEN.w / FRAME.w) * 100}%`,
      borderRadius: `${(SCREEN.rx / SCREEN.h) * 100}% / ${(SCREEN.rx / SCREEN.w) * 100}%`,
    };
  }
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
  /** Rotate the device 90deg — for screens mounted horizontally. */
  landscape?: boolean;
}

export function PhoneFrame({
  screenshot,
  className = "",
  landscape = false,
}: PhoneFrameProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className={`relative w-full ${className}`}
      style={{
        aspectRatio: landscape
          ? `${FRAME.h} / ${FRAME.w}`
          : `${FRAME.w} / ${FRAME.h}`,
      }}
    >
      <div
        className="absolute z-10 overflow-hidden bg-[#080810]"
        style={screenStyle(landscape)}
      >
        {/* Spinner visible until image fully loads */}
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
          <DeviceLoader size={18} />
        </div>
        <Image
          src={screenshot.src}
          alt={screenshot.alt}
          fill
          className={`object-cover object-center transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          sizes={landscape ? "(max-width: 640px) 90vw, 420px" : "(max-width: 640px) 50vw, 280px"}
          style={{ objectFit: "cover", minHeight: "100%", minWidth: "100%" }}
          onLoad={() => setLoaded(true)}
        />
      </div>
      {landscape ? (
        /* Sized to the portrait box, then rotated — the result exactly fills
           the landscape container, so the frame hole lands on the screen box. */
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-20 select-none"
          style={{
            width: `${(FRAME.w / FRAME.h) * 100}%`,
            height: `${(FRAME.h / FRAME.w) * 100}%`,
            transform: "translate(-50%, -50%) rotate(90deg)",
          }}
        >
          <Image
            src="/images/phone-frame.webp"
            alt=""
            fill
            aria-hidden="true"
            className="select-none"
            sizes="400px"
          />
        </div>
      ) : (
        <Image
          src="/images/phone-frame.webp"
          alt=""
          fill
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 h-full w-full select-none"
          sizes="200px"
        />
      )}
    </div>
  );
}

/* ─── Browser Frame ───────────────────────────────────────────── */

interface BrowserFrameProps {
  screenshot: ProjectScreenshot;
  className?: string;
  /** Override for hero placements — the default is tuned for bento cards. */
  sizes?: string;
}

export function BrowserFrame({
  screenshot,
  className = "",
  sizes = "(max-width: 640px) 90vw, 500px",
}: BrowserFrameProps) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden rounded-lg border border-foreground/10 bg-foreground/5 shadow-2xl sm:rounded-xl">
        <div className="flex h-6 items-center gap-1.5 border-b border-foreground/5 bg-foreground/3 px-2.5 sm:h-8 sm:px-3">
          <div className="h-2 w-2 rounded-full bg-[#FF5F57] sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-[#FEBC2E] sm:h-2.5 sm:w-2.5" />
          <div className="h-2 w-2 rounded-full bg-[#28C840] sm:h-2.5 sm:w-2.5" />
          <div className="mx-auto h-3.5 w-24 rounded-md bg-foreground/5 sm:h-4 sm:w-32" />
        </div>
        <div className="relative bg-foreground/3" style={{ aspectRatio: "16 / 10" }}>
          {/* Spinner visible until image fully loads */}
          <div className="absolute inset-0 flex justify-center pt-[20%]" aria-hidden>
            <DeviceLoader size={16} />
          </div>
          <Image
            src={screenshot.src}
            alt={screenshot.alt}
            fill
            className={`object-cover object-top transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            sizes={sizes}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Triple phone showcase (e.g. Telegram app with 3 screens) ─── */

function TriplePhoneShowcase({
  phones,
  compact = false,
}: {
  phones: ProjectScreenshot[];
  compact?: boolean;
}) {
  const [left, center, right] = phones;
  return (
    <div
      className={`relative flex w-full items-center justify-center overflow-hidden ${compact ? "py-4" : "py-6 sm:py-12"}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(124,58,237,0.06), transparent)",
        }}
      />

      {/* Mobile: single centered phone */}
      {center && (
        <div className="relative z-10 w-[52%] max-w-[200px] drop-shadow-2xl sm:hidden">
          <PhoneFrame screenshot={center} />
        </div>
      )}

      {/* Desktop: triple phone fan */}
      <div
        className="relative mx-auto hidden sm:block"
        style={
          compact
            ? { width: "min(95%, 420px)", height: "320px" }
            : { width: "min(95%, 600px)", height: "420px" }
        }
      >
        {left && (
          <div
            className="absolute z-1 drop-shadow-2xl"
            style={{ width: "34%", left: "2%", bottom: "2%", transform: "rotate(-6deg)" }}
          >
            <PhoneFrame screenshot={left} />
          </div>
        )}
        {center && (
          <div
            className="absolute z-3 drop-shadow-2xl"
            style={{ width: "36%", left: "50%", top: "0", transform: "translateX(-50%)" }}
          >
            <PhoneFrame screenshot={center} />
          </div>
        )}
        {right && (
          <div
            className="absolute z-1 drop-shadow-2xl"
            style={{ width: "34%", right: "2%", bottom: "2%", transform: "rotate(6deg)" }}
          >
            <PhoneFrame screenshot={right} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Device Showcase (Bento-aware) ───────────────────────────── */

/* A full-width featured card is ~976 CSS px — the bento default under-requests it. */
const HERO_SIZES = "(max-width: 640px) 92vw, 1024px";

interface DeviceShowcaseProps {
  screenshots: ProjectScreenshot[];
  variant: "wide" | "standard";
  /** Wide compositions scaled for a 2/3-width bento slot rather than a
      full-width hero card. */
  compact?: boolean;
  fillHeight?: boolean;
}

export function DeviceShowcase({
  screenshots,
  variant,
  compact = false,
  fillHeight = false,
}: DeviceShowcaseProps) {
  if (!Array.isArray(screenshots) || screenshots.length === 0) return null;

  const phones = screenshots.filter(
    (s) =>
      s.device === "iphone" ||
      s.device === "iphone-landscape" ||
      s.device === "pixel"
  );
  const browsers = screenshots.filter((s) => s.device === "browser");

  const hasPhone = phones.length > 0;
  const hasBrowser = browsers.length > 0;
  const isMultiDevice = hasPhone && hasBrowser;

  if (hasPhone && phones.length >= 3 && variant === "wide") {
    return <TriplePhoneShowcase phones={phones.slice(0, 3)} compact={compact} />;
  }

  if (isMultiDevice && variant === "wide") {
    // The phone is absolutely positioned, so it adds no height — without an
    // explicit min-height it overflows the browser block and gets clipped.
    if (compact) {
      return (
        <div className="relative min-h-[300px] overflow-hidden px-4 py-5 sm:min-h-[380px]">
          <div className="w-[82%] sm:w-[76%]">
            <BrowserFrame
              screenshot={browsers[0]}
              sizes="(max-width: 640px) 74vw, 520px"
            />
          </div>
          <div className="absolute right-3 top-[70px] z-10 w-[92px] shrink-0 sm:right-4 sm:top-[92px] sm:w-[124px]">
            <PhoneFrame screenshot={phones[0]} />
          </div>
        </div>
      );
    }
    return (
      <div className="relative min-h-[500px] overflow-hidden px-4 py-4 sm:min-h-[700px] sm:px-5 sm:py-5">
        <div className="w-full translate-y-2 sm:translate-y-4">
          <BrowserFrame screenshot={browsers[0]} sizes={HERO_SIZES} />
        </div>
        <div className="absolute right-4 top-[121px] z-10 w-[165px] shrink-0 sm:right-6 sm:top-[121px] sm:w-[260px]">
          <PhoneFrame screenshot={phones[0]} />
        </div>
      </div>
    );
  }

  if (hasBrowser) {
    // Featured hero — a taller crop, so the shot still reads once the glass
    // info panel overlaps its lower edge.
    if (variant === "wide") {
      return (
        <div
          className={`max-h-[300px] overflow-hidden px-4 pt-4 sm:px-6 sm:pt-8 ${compact ? "sm:max-h-[380px]" : "sm:max-h-[640px]"}`}
        >
          <div className="translate-y-2 sm:translate-y-4">
            <BrowserFrame screenshot={browsers[0]} sizes={HERO_SIZES} />
          </div>
        </div>
      );
    }

    // Tall bento slot — centre it, or the fixed cap below leaves the frame
    // floating at the top of a 740px card.
    if (fillHeight) {
      return (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-4 py-4">
          <div className="w-full shrink-0">
            <BrowserFrame screenshot={browsers[0]} />
          </div>
        </div>
      );
    }

    return (
      <div className="max-h-[200px] overflow-hidden px-4 pt-4 sm:max-h-[280px] sm:px-5 sm:pt-6">
        <div className="translate-y-2 sm:translate-y-4">
          <BrowserFrame screenshot={browsers[0]} />
        </div>
      </div>
    );
  }

  if (hasPhone) {
    const phone = phones[0];
    // A rotated device is ~2.1x wider than tall, so it needs the card's width
    // rather than the narrow column a portrait phone sits in.
    const isLandscape = phone.device === "iphone-landscape";

    if (fillHeight) {
      return (
        <div className="flex min-h-0 flex-1 flex-col items-center justify-center overflow-hidden px-4 py-4">
          <div
            className={
              isLandscape
                ? "w-full shrink-0"
                : "w-[60%] max-w-[220px] shrink-0 sm:w-[80%] sm:max-w-[300px]"
            }
          >
            <PhoneFrame screenshot={phone} landscape={isLandscape} />
          </div>
        </div>
      );
    }

    if (isLandscape) {
      return (
        <div className="flex max-h-[260px] flex-col items-center justify-center overflow-hidden px-4 py-6 sm:max-h-[300px]">
          <div className="w-full max-w-[420px] shrink-0">
            <PhoneFrame screenshot={phone} landscape />
          </div>
        </div>
      );
    }

    return (
      <div className="flex max-h-[260px] flex-col items-center overflow-hidden pt-5 sm:max-h-[300px] sm:pt-6">
        <div className="w-[52%] max-w-[165px] shrink-0 sm:w-[70%] sm:max-w-[260px]">
          <PhoneFrame screenshot={phone} />
        </div>
      </div>
    );
  }

  return null;
}
