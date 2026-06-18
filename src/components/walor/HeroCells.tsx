import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

const COLS = 4;
const ROWS = 3;
const TOTAL = COLS * ROWS;

// snake/zigzag order: row 0 L→R, row 1 R→L, row 2 L→R
const order: number[] = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const col = r % 2 === 0 ? c : COLS - 1 - c;
    order.push(r * COLS + col);
  }
}
const stepOf = (idx: number) => order.indexOf(idx);

const rand = (seed: number) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

export function HeroCells() {
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const STAGGER = 0.15;
  const lastStep = TOTAL - 1;
  const packPulseDelay = 0.4 + lastStep * STAGGER + 0.8;
  const headlineDelay = packPulseDelay + 0.5;
  const subDelay = headlineDelay + 0.3;
  const ctaDelay = subDelay + 0.3;

  return (
    <section className="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 pt-28 pb-16">
      {/* Battery pack */}
      <motion.div
        className="relative"
        style={{ width: "min(92vw, 500px)", aspectRatio: "500 / 250" }}
        initial={false}
        animate={
          reduced
            ? {}
            : started
              ? { scale: [1, 1, 1.03, 1], boxShadow: ["0 0 0 #2323FF00", "0 0 0 #2323FF00", "0 0 25px #2323FF", "0 0 0 #2323FF00"] }
              : {}
        }
        transition={{ duration: 0.7, delay: packPulseDelay, times: [0, 0.2, 0.5, 1] }}
      >
        {/* Outer outline */}
        <div
          className="absolute inset-0 rounded-3xl border-[3px]"
          style={{ borderColor: "#2323FF" }}
        />
        {/* Battery terminal nub */}
        <div
          className="absolute top-1/2 -right-2 -translate-y-1/2 h-10 w-3 rounded-r-md"
          style={{ background: "#2323FF" }}
        />

        {/* Cells grid */}
        <div
          className="absolute inset-0 grid p-5 gap-3"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 1fr)`,
            gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          }}
        >
          {Array.from({ length: TOTAL }).map((_, i) => {
            const step = stepOf(i);
            const exitDelay = 0.4 + step * STAGGER;
            const enterDelay = exitDelay + 0.2;
            const tx = (rand(i + 1) - 0.5) * 100;
            const rot = (rand(i + 7) - 0.5) * 360;
            return (
              <div key={i} className="relative w-full h-full">
                {/* Red degraded cell */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "#FF3B3B",
                    border: "1px solid #B02020",
                  }}
                  initial={{ opacity: 1, y: 0, x: 0, rotate: 0 }}
                  animate={
                    reduced
                      ? { opacity: 0 }
                      : started
                        ? {
                            rotate: [0, -3, 3, -3, 3, 0, 0],
                            y: [0, 0, 0, 0, 0, 0, -300],
                            x: [0, 0, 0, 0, 0, 0, tx],
                            opacity: [1, 1, 1, 1, 1, 1, 0],
                          }
                        : {}
                  }
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          duration: 0.7,
                          delay: exitDelay - 0.15,
                          times: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 1],
                          ease: ["linear", "linear", "linear", "linear", "linear", "easeIn"],
                        }
                  }
                  // separate rotate spin handled via keyframes above end
                />
                {/* Green fresh cell */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: "#2ED573" }}
                  initial={{ opacity: 0, y: 300 }}
                  animate={
                    reduced
                      ? { opacity: 1, y: 0, boxShadow: "0 0 0 #2ED57300" }
                      : started
                        ? {
                            opacity: 1,
                            y: 0,
                            boxShadow: [
                              "0 0 0px #2ED57300",
                              "0 0 0px #2ED57300",
                              "0 0 20px #2ED573",
                              "0 0 0px #2ED57300",
                            ],
                          }
                        : { opacity: 0, y: 300 }
                  }
                  transition={
                    reduced
                      ? { duration: 0 }
                      : {
                          y: { type: "spring", stiffness: 120, damping: 10, delay: enterDelay },
                          opacity: { duration: 0.3, delay: enterDelay },
                          boxShadow: { duration: 0.6, delay: enterDelay + 0.2, times: [0, 0.1, 0.5, 1] },
                        }
                  }
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h1
        className="mt-12 text-center text-3xl md:text-5xl font-bold tracking-tight"
        style={{ color: "#0A0A0A" }}
        initial={{ opacity: 0, y: 12 }}
        animate={reduced ? { opacity: 1, y: 0 } : started ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: reduced ? 0 : headlineDelay }}
      >
        Old Cells Out. <span style={{ color: "#2323FF" }}>New Power In.</span>
      </motion.h1>

      <motion.p
        className="mt-5 text-center text-base md:text-lg max-w-2xl"
        style={{ color: "#555555" }}
        initial={{ opacity: 0, y: 12 }}
        animate={reduced ? { opacity: 1, y: 0 } : started ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: reduced ? 0 : subDelay }}
      >
        WALOR refurbishes pre-owned EV battery packs — replacing degraded cells, restoring full range.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 12 }}
        animate={reduced ? { opacity: 1, y: 0 } : started ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: reduced ? 0 : ctaDelay }}
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.03]"
          style={{ background: "#2323FF" }}
        >
          Get a Fleet Assessment <ArrowRight className="size-4" />
        </a>
      </motion.div>
    </section>
  );
}
