import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type PartId = "cells-old" | "cells-new" | "bms" | "casing";

const PANELS: { id: PartId; title: string; desc: string }[] = [
  { id: "cells-old", title: "Old Degraded Cells Removed", desc: "We extract every underperforming cell from the pack — no patchwork, no compromises." },
  { id: "cells-new", title: "Fresh LFP Cells Installed", desc: "Grade-matched LFP cells within ±0.5% capacity variance restore full-pack performance." },
  { id: "bms", title: "BMS Preserved & Recalibrated", desc: "The original Battery Management System is retained and recalibrated to the new cell chemistry." },
  { id: "casing", title: "Pack Resealed to IP67 Rating", desc: "The outer casing is resealed and validated for water and dust ingress to IP67." },
];

export function StickyExplainer() {
  return (
    <section className="relative bg-[#0A0A0A] py-20 md:py-28" id="how-it-works">
      <div className="walor-container">
        <div className="text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00BFFF]">// How It Works</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">Inside a Walor Revival</h2>
        </div>

        {/* Mobile: stacked */}
        <div className="md:hidden flex flex-col gap-10">
          {PANELS.map((p) => (
            <MobileBlock key={p.id} part={p.id} title={p.title} desc={p.desc} />
          ))}
        </div>

        {/* Desktop: sticky diagram + scrolling panels */}
        <div className="hidden md:grid grid-cols-2 gap-12">
          <DesktopSticky />
          <div className="flex flex-col">
            {PANELS.map((p) => (
              <DesktopPanel key={p.id} part={p.id} title={p.title} desc={p.desc} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* shared diagram */
function PackDiagram({ active }: { active: PartId | null }) {
  const is = (p: PartId) => active === p;
  const dim = (p: PartId) => (active && !is(p) ? 0.25 : 1);
  const glow = (p: PartId) =>
    is(p) ? "drop-shadow(0 0 12px #00BFFF) drop-shadow(0 0 24px rgba(0,191,255,0.6))" : "none";

  return (
    <svg viewBox="0 0 400 320" className="w-full h-full">
      {/* Casing */}
      <motion.rect
        x="20" y="40" width="360" height="240" rx="20"
        fill="#0d0d0d"
        stroke={is("casing") ? "#00BFFF" : "#ffffff22"}
        strokeWidth={is("casing") ? 3 : 2}
        animate={{ opacity: dim("casing"), filter: glow("casing") }}
        transition={{ duration: 0.4 }}
      />
      {/* BMS board */}
      <motion.g
        animate={{ opacity: dim("bms"), filter: glow("bms") }}
        transition={{ duration: 0.4 }}
      >
        <rect x="50" y="60" width="300" height="36" rx="4" fill="#0a1f2e" stroke={is("bms") ? "#00BFFF" : "#00BFFF55"} strokeWidth="1.5" />
        {Array.from({ length: 10 }).map((_, i) => (
          <rect key={i} x={62 + i * 30} y={70} width="18" height="6" rx="1" fill={is("bms") ? "#00BFFF" : "#00BFFF99"} />
        ))}
        <circle cx="340" cy="78" r="3" fill={is("bms") ? "#39FF14" : "#39FF1488"} />
      </motion.g>

      {/* Old degraded cell cluster (left side) */}
      <motion.g
        animate={{ opacity: dim("cells-old"), filter: glow("cells-old") }}
        transition={{ duration: 0.4 }}
      >
        {Array.from({ length: 8 }).map((_, i) => {
          const col = i % 4;
          const row = Math.floor(i / 4);
          return (
            <rect
              key={i}
              x={50 + col * 22}
              y={120 + row * 70}
              width="18"
              height="60"
              rx="3"
              fill={is("cells-old") ? "#444" : "#2a2a2a"}
              stroke={is("cells-old") ? "#00BFFF" : "#ffffff22"}
              strokeWidth="1"
            />
          );
        })}
      </motion.g>

      {/* Fresh LFP cells (right side) */}
      <motion.g
        animate={{ opacity: dim("cells-new"), filter: glow("cells-new") }}
        transition={{ duration: 0.4 }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const col = i % 6;
          const row = Math.floor(i / 6);
          return (
            <rect
              key={i}
              x={160 + col * 36}
              y={120 + row * 70}
              width="28"
              height="60"
              rx="3"
              fill={is("cells-new") ? "url(#cellGrad)" : "#0a1f1a"}
              stroke={is("cells-new") ? "#39FF14" : "#39FF1466"}
              strokeWidth="1.2"
            />
          );
        })}
      </motion.g>

      <defs>
        <linearGradient id="cellGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#39FF14" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#00CED1" stopOpacity="0.4" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DesktopSticky() {
  // Reads active panel via custom event from panels in the same section
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="relative">
      <div className="sticky top-24 h-[80vh] flex items-center justify-center">
        <ActiveBoundary />
      </div>
    </div>
  );
}



function ActiveBoundary() {
  const [active, setActive] = useState<PartId | null>(null);
  useEffect(() => {
    const onActive = (e: Event) => {
      const detail = (e as CustomEvent<PartId | null>).detail;
      setActive(detail);
    };
    window.addEventListener("walor:active-part", onActive);
    return () => window.removeEventListener("walor:active-part", onActive);
  }, []);
  return (
    <div className="w-full max-w-[520px] aspect-[4/3] rounded-2xl border border-white/10 bg-black/40 p-6">
      <PackDiagram active={active} />
    </div>
  );
}

function DesktopPanel({ part, title, desc }: { part: PartId; title: string; desc: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });
  useEffect(() => {
    if (inView) window.dispatchEvent(new CustomEvent("walor:active-part", { detail: part }));
  }, [inView, part]);
  return (
    <div ref={ref} className="min-h-[80vh] flex flex-col justify-center">
      <motion.div
        animate={{ opacity: inView ? 1 : 0.35, x: inView ? 0 : 8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00BFFF] mb-3">Step</div>
        <h3 className="text-2xl md:text-3xl font-bold text-white">{title}</h3>
        <p className="mt-4 text-white/65 text-base leading-relaxed">{desc}</p>
      </motion.div>
    </div>
  );
}

function MobileBlock({ part, title, desc }: { part: PartId; title: string; desc: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-30%" });
  return (
    <div ref={ref} className="flex flex-col gap-4">
      <div className="rounded-xl border border-white/10 bg-black/40 p-4 aspect-[4/3]">
        <PackDiagram active={inView ? part : null} />
      </div>
      <div>
        <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#00BFFF]">Step</div>
        <h3 className="mt-2 text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-white/65 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
