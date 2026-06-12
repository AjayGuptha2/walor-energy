import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

type Stat = {
  value: string;
  label: string;
  /** numeric target for count-up; undefined => letter fade */
  num?: number;
  prefix?: string;
  suffix?: string;
};

const STATS: Stat[] = [
  { value: "94%", label: "Capacity Restored", num: 94, suffix: "%" },
  { value: "3x", label: "Battery Life Extended", num: 3, suffix: "x" },
  { value: "₹1.2L", label: "Avg. Fleet Savings", num: 1.2, prefix: "₹", suffix: "L" },
  { value: "Zero", label: "Batteries Landfilled" },
];

function CountUp({ to, prefix = "", suffix = "", play }: { to: number; prefix?: string; suffix?: string; play: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!play) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setN(to * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [play, to]);

  const display = Number.isInteger(to) ? Math.round(n).toString() : n.toFixed(1);
  return (
    <span className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function ZeroWord({ play }: { play: boolean }) {
  const letters = "Zero".split("");
  return (
    <span>
      {letters.map((l, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 12 }}
          animate={play ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 + i * 0.18, duration: 0.5, ease: "easeOut" }}
        >
          {l}
        </motion.span>
      ))}
    </span>
  );
}

export function StatsOdometer() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} id="impact-stats" className="bg-foreground/[0.03] py-24 md:py-32">
      <div className="walor-container">
        <div className="text-center mb-14">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#2323FF]">// Impact</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold text-foreground">Numbers that move fleets forward</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease: "easeOut" }}
              className="text-center md:text-left"
            >
              <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-none tracking-tight">
                {s.num !== undefined ? (
                  <CountUp to={s.num} prefix={s.prefix} suffix={s.suffix} play={inView} />
                ) : (
                  <ZeroWord play={inView} />
                )}
              </div>
              <motion.div
                className="mt-4 h-[2px] bg-[#2323FF] origin-left"
                style={{ boxShadow: "0 0 8px rgba(57,255,20,0.6)" }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 1.8 + i * 0.1, ease: "easeOut" }}
              />
              <div className="mt-3 text-sm font-medium uppercase tracking-[0.2em] text-[#2323FF]">
                {s.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
