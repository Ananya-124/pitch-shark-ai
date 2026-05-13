"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const STEPS = [
  { label: "PITCH", href: "/pitch", num: "01" },
  { label: "ANALYSIS", href: "/analysis", num: "02" },
  { label: "SHARKS", href: "/investors", num: "03" },
  { label: "OFFERS", href: "/results", num: "04" },
  { label: "NEGOTIATE", href: "/negotiation", num: "05" },
];

const ORDER = ["/pitch", "/analysis", "/investors", "/results", "/negotiation"];

export default function TopNav() {
  const pathname = usePathname();
  const currentIdx = ORDER.indexOf(pathname);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: "rgba(2,4,8,0.9)",
        borderBottom: "1px solid var(--border-soft)",
        backdropFilter: "blur(20px)",
      }}
    >
      <Link
        href="/"
        className="font-orbitron text-sm font-bold tracking-[2px] text-neon-cyan hover:text-white transition-colors"
      >
        PITCHPILOT AI
      </Link>

      <div className="flex items-center gap-1">
        {STEPS.map((step, i) => {
          const stepIdx = ORDER.indexOf(step.href);
          const isDone = stepIdx < currentIdx;
          const isActive = stepIdx === currentIdx;

          return (
            <div key={step.href} className="flex items-center gap-1">
              {i > 0 && (
                <span
                  className="text-[10px] mx-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  ›
                </span>
              )}
              <span
                className={clsx(
                  "font-mono text-[11px] px-3 py-1 rounded tracking-[1px] transition-all",
                  isDone && "text-neon-emerald",
                  isActive &&
                    "text-neon-cyan bg-neon-cyan/10 border border-neon-cyan/20",
                  !isDone && !isActive && "text-[var(--text-muted)]"
                )}
              >
                {step.num} {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
