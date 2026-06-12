import { useScroll, useTransform, motion, MotionValue } from "motion/react";
import { useIsMobile } from "@/hooks/use-mobile";

const ACCENT = "#2323FF";
const MUTED = "#3A3A4A";

function LabelText({ progress }: { progress: MotionValue<number> }) {
  // We render all label states and crossfade based on threshold
  const labels = [
    "Cell 0/5 — Diagnosing",
    "Cell 1/5 Refurbished",
    "Cell 2/5 Refurbished",
    "Cell 3/5 Refurbished",
    "Cell 4/5 Refurbished",
    "Cell 5/5 Refurbished — Pack Restored",
  ];
  return (
    <div className="relative h-5 w-full">
      {labels.map((txt, i) => {
        const start = i === 0 ? 0 : i * 0.2 - 0.04;
        const end = i === 0 ? 0.04 : i * 0.2 + 0.04;
        const next = i === labels.length - 1 ? 1.01 : (i + 1) * 0.2 - 0.04;
        const opacity = useTransform(
          progress,
          [start, end, next, next + 0.04],
          [0, 1, 1, 0],
        );
        const isFinal = i === labels.length - 1;
        return (
          <motion.div
            key={i}
            className={`absolute inset-0 text-center font-mono text-[10px] md:text-[11px] tracking-wide text-[#0A1024] ${
              isFinal ? "font-bold" : ""
            }`}
            style={{ opacity }}
          >
            {txt}
          </motion.div>
        );
      })}
    </div>
  );
}

function Cell({
  index,
  progress,
  finalPulse,
  orientation,
}: {
  index: number;
  progress: MotionValue<number>;
  finalPulse: MotionValue<number>;
  orientation: "v" | "h";
}) {
  const t = index * 0.2;
  // grey cell: visible until its threshold, then slides out
  const greyOpacity = useTransform(progress, [t, t + 0.12], [1, 0]);
  const greyShift = useTransform(progress, [t, t + 0.12], [0, 40]);
  // new blue cell: slides in from left
  const newOpacity = useTransform(progress, [t + 0.04, t + 0.16], [0, 1]);
  const newShift = useTransform(progress, [t + 0.04, t + 0.16], [-40, 0]);
  // lightning flash
  const boltScale = useTransform(
    progress,
    [t + 0.08, t + 0.12, t + 0.18],
    [0, 1.4, 1],
  );
  const boltOpacity = useTransform(
    progress,
    [t + 0.08, t + 0.12, t + 0.2, t + 0.24],
    [0, 1, 0.9, 0.7],
  );
  // sync pulse at 100%
  const pulseShadow = useTransform(
    finalPulse,
    [0, 0.5, 1],
    [
      `0 0 20px ${ACCENT}`,
      `0 0 30px ${ACCENT}, 0 0 60px ${ACCENT}`,
      `0 0 20px ${ACCENT}`,
    ],
  );

  const sizeStyle =
    orientation === "v"
      ? { width: 40, height: 70 }
      : { width: 38, height: 60 };

  const slideAxis = orientation === "v" ? "x" : "y";

  return (
    <div className="relative" style={sizeStyle}>
      {/* Muted grey cell */}
      <motion.div
        className="absolute inset-0 rounded-[8px] overflow-hidden"
        style={{
          backgroundColor: MUTED,
          border: "1px solid rgba(255,255,255,0.2)",
          opacity: greyOpacity,
          [slideAxis]: greyShift,
        }}
      >
        {/* crack texture */}
        <svg className="absolute inset-0 w-full h-full opacity-50" viewBox="0 0 40 70">
          <path d="M8 6 L18 28 L12 40 L24 58" stroke="rgba(255,255,255,0.35)" strokeWidth="0.6" fill="none" />
          <path d="M28 10 L20 22 L30 36" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" fill="none" />
          <path d="M6 50 L16 62" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" fill="none" />
        </svg>
      </motion.div>

      {/* New blue cell */}
      <motion.div
        className="absolute inset-0 rounded-[8px] grid place-items-center"
        style={{
          backgroundColor: ACCENT,
          border: "1px solid #FFFFFF",
          opacity: newOpacity,
          [slideAxis]: newShift,
          boxShadow: pulseShadow,
        }}
      >
        <motion.svg
          viewBox="0 0 24 24"
          width="55%"
          height="55%"
          style={{ scale: boltScale, opacity: boltOpacity }}
        >
          <path
            d="M13 2 L4 14 h6 l-1 8 9-12 h-6 l1-8 z"
            fill="#fff"
            stroke="#fff"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </div>
  );
}

export function ScrollBattery() {
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll();
  // final pulse activates near completion
  const finalPulse = useTransform(scrollYProgress, [0.96, 0.985, 1], [0, 1, 0]);

  const cells = [0, 1, 2, 3, 4];

  if (isMobile) {
    return (
      <div className="fixed top-0 inset-x-0 z-[95] bg-white/90 backdrop-blur border-b border-black/10 px-3 py-2 flex flex-col gap-1.5">
        <div className="flex items-center justify-center gap-2">
          {cells.map((i) => (
            <Cell
              key={i}
              index={i}
              progress={scrollYProgress}
              finalPulse={finalPulse}
              orientation="h"
            />
          ))}
        </div>
        <LabelText progress={scrollYProgress} />
      </div>
    );
  }

  return (
    <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-[95] flex-col items-center gap-3 bg-white/85 backdrop-blur-md border border-black/10 rounded-2xl px-3 py-4 shadow-[0_8px_30px_rgba(35,35,255,0.15)]">
      <div className="flex flex-col gap-2">
        {cells.map((i) => (
          <Cell
            key={i}
            index={i}
            progress={scrollYProgress}
            finalPulse={finalPulse}
            orientation="v"
          />
        ))}
      </div>
      <div className="w-[140px]">
        <LabelText progress={scrollYProgress} />
      </div>
    </div>
  );
}
