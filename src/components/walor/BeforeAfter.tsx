import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "motion/react";
import { Zap } from "lucide-react";

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const x = useMotionValue(0.8); // 0..1, 0=full right(after), 1=full left(before)
  const [pos, setPos] = useState(80);
  const dragging = useRef(false);

  useEffect(() => {
    const unsub = x.on("change", (v) => setPos(v * 100));
    return () => unsub();
  }, [x]);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(x, 0.5, { duration: 1.6, ease: [0.16, 1, 0.3, 1] });
    return () => controls.stop();
  }, [inView, x]);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    x.set(ratio);
  };

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-[#0A0A0A]">
      <div className="walor-container">
        <div className="text-center mb-12">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00CED1]">// Transformation</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-white">Before · After</h2>
          <p className="mt-3 text-white/60">Drag the lightning bolt to compare</p>
        </div>

        <div
          ref={containerRef}
          className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 select-none cursor-ew-resize"
          onPointerMove={onPointerMove}
        >
          {/* AFTER (full background) */}
          <div className="absolute inset-0">
            <PackVisual variant="after" />
            {/* pulsing teal glow on after side */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 75% 50%, rgba(57,255,20,0.25), transparent 70%)",
              }}
            />
            <Label position="right" text="After: 94% Capacity Restored" tone="after" />
          </div>

          {/* BEFORE clipped */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <PackVisual variant="before" />
            <Label position="left" text="Before: 41% Capacity" tone="before" />
          </div>

          {/* Divider handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#39FF14] via-[#00CED1] to-[#39FF14] pointer-events-none"
            style={{ left: `${pos}%`, transform: "translateX(-50%)", boxShadow: "0 0 18px rgba(57,255,20,0.7)" }}
          />
          <div
            className="absolute top-1/2 grid place-items-center size-12 rounded-full border-2 border-[#39FF14] bg-black/80 backdrop-blur cursor-grab active:cursor-grabbing touch-none"
            style={{
              left: `${pos}%`,
              transform: "translate(-50%, -50%)",
              boxShadow: "0 0 24px rgba(57,255,20,0.8), inset 0 0 12px rgba(0,206,209,0.4)",
            }}
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <Zap className="size-5 text-[#39FF14]" fill="#39FF14" strokeWidth={2} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ position, text, tone }: { position: "left" | "right"; text: string; tone: "before" | "after" }) {
  return (
    <div
      className={`absolute top-5 ${position === "left" ? "left-5" : "right-5"} px-3 py-1.5 rounded-md text-xs font-mono uppercase tracking-wider backdrop-blur ${
        tone === "before"
          ? "bg-black/60 border border-white/20 text-white/70"
          : "bg-[#39FF14]/15 border border-[#39FF14]/50 text-[#39FF14]"
      }`}
    >
      {text}
    </div>
  );
}

function PackVisual({ variant }: { variant: "before" | "after" }) {
  const isBefore = variant === "before";
  return (
    <div
      className="absolute inset-0"
      style={{
        background: isBefore
          ? "linear-gradient(135deg, #1a1a1a, #2a2a2a)"
          : "linear-gradient(135deg, #051a1a, #0a2e2e)",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <div
          className="relative w-full max-w-[640px] aspect-[16/8] rounded-xl border-2 p-4 grid grid-cols-8 grid-rows-3 gap-2"
          style={{
            borderColor: isBefore ? "rgba(255,255,255,0.15)" : "rgba(0,206,209,0.5)",
            background: isBefore ? "#0d0d0d" : "#021414",
            boxShadow: isBefore ? "none" : "0 0 60px rgba(0,206,209,0.3), inset 0 0 30px rgba(57,255,20,0.1)",
            filter: isBefore ? "grayscale(0.7)" : "none",
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="rounded-sm border"
              style={
                isBefore
                  ? {
                      borderColor: "rgba(255,255,255,0.1)",
                      background: "linear-gradient(180deg, #2a2a2a, #1a1a1a)",
                    }
                  : {
                      borderColor: "rgba(57,255,20,0.5)",
                      background: "linear-gradient(180deg, rgba(57,255,20,0.55), rgba(0,206,209,0.35))",
                      boxShadow: "0 0 8px rgba(57,255,20,0.4)",
                    }
              }
            />
          ))}
          {/* Cracks overlay on before */}
          {isBefore && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 50" preserveAspectRatio="none">
              <g stroke="rgba(255,255,255,0.2)" strokeWidth="0.2" fill="none">
                <path d="M10,5 L25,20 L20,35 L40,45" />
                <path d="M60,8 L70,22 L65,30 L80,42" />
                <path d="M30,2 L45,15 L55,25" />
              </g>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
