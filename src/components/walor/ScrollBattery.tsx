import { useScroll, useTransform, motion, useSpring } from "motion/react";
import { Zap } from "lucide-react";

const SEGMENTS = ["Hero", "How It Works", "Impact", "Contact"];

export function ScrollBattery() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <>
      {/* Mobile: horizontal top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-[90] h-1 bg-black/60 backdrop-blur-sm">
        <motion.div
          className="h-full origin-left"
          style={{
            scaleX: progress,
            background: "linear-gradient(90deg, #39FF14, #00CED1)",
            boxShadow: "0 0 12px rgba(57,255,20,0.6)",
          }}
        />
      </div>

      {/* Desktop: vertical battery on right */}
      <div className="hidden md:flex fixed right-5 top-1/2 -translate-y-1/2 z-[90] flex-col items-center gap-2 pointer-events-none">
        <div className="grid place-items-center size-7 rounded-md bg-black/60 border border-[#39FF14]/40 backdrop-blur">
          <Zap className="size-3.5 text-[#39FF14]" strokeWidth={2.5} fill="#39FF14" />
        </div>
        <div className="w-3 h-1 rounded-sm bg-white/40" />
        <div className="relative w-7 h-[300px] rounded-md border-2 border-white/30 bg-black/50 backdrop-blur-sm p-[3px] flex flex-col-reverse gap-[3px]">
          {SEGMENTS.map((label, i) => {
            const start = i / SEGMENTS.length;
            const end = (i + 1) / SEGMENTS.length;
            const fill = useTransform(progress, [start, end], [0, 1]);
            return (
              <div key={label} className="relative flex-1 overflow-hidden rounded-sm bg-white/[0.04]">
                <motion.div
                  className="absolute inset-0 origin-bottom"
                  style={{
                    scaleY: fill,
                    background: "linear-gradient(180deg, #00CED1, #39FF14)",
                    boxShadow: "0 0 10px rgba(57,255,20,0.6)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
