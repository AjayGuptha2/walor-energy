import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function HeroScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const topHalfY = useTransform(scrollYProgress, [0.4, 0.85], ["0%", "-60%"]);
  const bottomHalfY = useTransform(scrollYProgress, [0.4, 0.85], ["0%", "60%"]);
  const glow = useTransform(scrollYProgress, [0.3, 0.85], [0.25, 1]);
  const cellsOpacity = useTransform(scrollYProgress, [0.55, 0.9], [0, 1]);
  const headlineOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.85, 1], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.95]);

  return (
    <section ref={ref} className="relative h-[300vh] bg-[#0A0A0A]" id="hero-scroll">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* radial glow */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: "90vw",
            height: "90vw",
            maxWidth: 1100,
            maxHeight: 1100,
            background: "radial-gradient(circle, rgba(0,191,255,0.35) 0%, rgba(0,191,255,0.08) 35%, transparent 65%)",
            opacity: glow,
            filter: "blur(20px)",
          }}
        />

        {/* battery cell */}
        <motion.div
          className="relative"
          style={{ rotate, scale, width: "min(60vw, 620px)", aspectRatio: "1 / 1.6" }}
        >
          {/* glowing fresh cells (revealed inside) */}
          <motion.div
            className="absolute inset-[18%] grid grid-cols-3 gap-2 z-0"
            style={{ opacity: cellsOpacity }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <motion.div
                key={i}
                className="rounded-md border border-[#00BFFF]/60"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0,191,255,0.7), rgba(0,191,255,0.15))",
                  boxShadow: "0 0 24px rgba(0,191,255,0.7), inset 0 0 12px rgba(224,247,255,0.4)",
                }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.12 }}
              />
            ))}
          </motion.div>

          {/* top half */}
          <motion.div
            className="absolute top-0 inset-x-0 h-1/2 z-10 rounded-t-[18%] border-2 border-[#00BFFF]/40"
            style={{
              y: topHalfY,
              background: "linear-gradient(180deg, #1a1a1a, #0f0f0f)",
              boxShadow: "inset 0 8px 30px rgba(0,191,255,0.15), 0 -10px 40px rgba(0,191,255,0.2)",
            }}
          >
            <div className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[35%] h-[10%] rounded-md bg-[#0a0a0a] border border-white/10" />
          </motion.div>

          {/* bottom half */}
          <motion.div
            className="absolute bottom-0 inset-x-0 h-1/2 z-10 rounded-b-[18%] border-2 border-[#00BFFF]/40"
            style={{
              y: bottomHalfY,
              background: "linear-gradient(0deg, #1a1a1a, #0f0f0f)",
              boxShadow: "inset 0 -8px 30px rgba(0,191,255,0.15), 0 10px 40px rgba(0,191,255,0.2)",
            }}
          >
            <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 text-[8px] md:text-[10px] font-mono tracking-[0.3em] text-[#00BFFF]/60">
              WALOR · LFP
            </div>
          </motion.div>
        </motion.div>

        {/* headline */}
        <motion.div
          className="absolute inset-x-0 bottom-[10%] md:bottom-[12%] text-center px-6 pointer-events-none"
          style={{ opacity: headlineOpacity, y: headlineY }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Bringing Batteries{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00BFFF, #E0F7FF)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Back to Life
            </span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/60">Scroll to explore</p>
        </motion.div>
      </div>
    </section>
  );
}
