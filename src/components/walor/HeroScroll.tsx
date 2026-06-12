import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useAnimate, useMotionValueEvent } from "motion/react";

const BLUE = "#2D7DFF";
const ACCENT = "#2323FF";

export function HeroScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // 0 - 0.5 of hero progress drives the charge-up
  const carOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [0.2, 0.55, 0.9]);
  const packOpacity = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);
  const packGlow = useTransform(scrollYProgress, [0.05, 0.5], [0, 1]);
  const boltScale = useTransform(scrollYProgress, [0.35, 0.45, 0.5], [0.9, 1.1, 1]);

  // sweep + headline triggered at 50%
  const [sweepScope, animateSweep] = useAnimate();
  const [headlineScope, animateHeadline] = useAnimate();
  const playedRef = useRef(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.5 && !playedRef.current) {
      playedRef.current = true;
      animateSweep(
        sweepScope.current,
        { x: ["-60%", "120%"], opacity: [0, 0.55, 0.55, 0] },
        { duration: 1.2, ease: [0.65, 0, 0.35, 1], times: [0, 0.2, 0.8, 1] },
      );
      animateHeadline(
        headlineScope.current,
        { opacity: [0, 1], y: [24, 0] },
        { duration: 0.8, delay: 0.9, ease: "easeOut" },
      );
    }
  });

  // ensure visible if user lands deep
  useEffect(() => {
    if (scrollYProgress.get() >= 0.5 && !playedRef.current) {
      playedRef.current = true;
      animateHeadline(headlineScope.current, { opacity: 1, y: 0 }, { duration: 0.3 });
    }
  }, []);

  return (
    <section ref={ref} className="relative h-[220vh] bg-black" id="hero-scroll">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Soft ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 55%, rgba(45,125,255,0.18), transparent 60%)",
          }}
        />

        {/* Car X-ray + battery composition */}
        <div className="relative w-[min(92vw,1100px)] aspect-[16/10]">
          {/* Yellow diagonal sweep */}
          <motion.div
            ref={sweepScope}
            className="absolute -inset-y-20 -left-1/3 w-[55%] pointer-events-none z-30"
            style={{
              transform: "rotate(15deg)",
              background:
                "linear-gradient(90deg, transparent, rgba(232,179,57,0.0) 20%, rgba(232,179,57,0.55) 50%, rgba(232,179,57,0.0) 80%, transparent)",
              filter: "blur(6px)",
              opacity: 0,
            }}
          />

          {/* Car wireframe */}
          <motion.svg
            viewBox="0 0 1000 620"
            className="absolute inset-0 w-full h-full"
            style={{ opacity: carOpacity }}
            fill="none"
            stroke={BLUE}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <defs>
              <filter id="carGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2.5" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g filter="url(#carGlow)" opacity="0.95">
              {/* Outer body (3/4 top view) */}
              <path d="M180 380 C 180 230, 280 150, 500 140 C 720 150, 820 230, 820 380 L 820 470 C 820 510, 780 540, 730 540 L 270 540 C 220 540, 180 510, 180 470 Z" />
              {/* Roof */}
              <path d="M280 240 C 320 200, 400 185, 500 185 C 600 185, 680 200, 720 240 L 700 360 L 300 360 Z" opacity="0.85" />
              {/* Windshield split */}
              <path d="M340 245 L 660 245" opacity="0.5" />
              <path d="M500 185 L 500 360" opacity="0.4" />
              {/* Doors */}
              <path d="M300 360 L 300 530" />
              <path d="M500 360 L 500 530" opacity="0.7" />
              <path d="M700 360 L 700 530" />
              {/* Door handles */}
              <path d="M360 430 L 420 430" opacity="0.6" />
              <path d="M580 430 L 640 430" opacity="0.6" />
              {/* Seats */}
              <rect x="335" y="265" width="120" height="80" rx="14" opacity="0.55" />
              <rect x="545" y="265" width="120" height="80" rx="14" opacity="0.55" />
              {/* Rear seat bench */}
              <rect x="340" y="380" width="320" height="60" rx="10" opacity="0.4" />
              {/* Wheels */}
              <ellipse cx="260" cy="500" rx="55" ry="22" />
              <ellipse cx="740" cy="500" rx="55" ry="22" />
              <ellipse cx="260" cy="220" rx="48" ry="18" opacity="0.85" />
              <ellipse cx="740" cy="220" rx="48" ry="18" opacity="0.85" />
              {/* Headlights/taillights */}
              <path d="M210 200 L 250 180" opacity="0.7" />
              <path d="M790 200 L 750 180" opacity="0.7" />
              {/* Bumpers */}
              <path d="M200 170 L 800 170" opacity="0.5" />
              <path d="M210 555 L 790 555" opacity="0.5" />
            </g>
          </motion.svg>

          {/* Battery pack — sits between axles, underbody */}
          <motion.div
            className="absolute z-10"
            style={{
              left: "27%",
              right: "27%",
              top: "52%",
              height: "22%",
              opacity: packOpacity,
            }}
          >
            <motion.div
              className="relative w-full h-full rounded-[14px] border"
              style={{
                background:
                  "linear-gradient(135deg, #3CFF8C 0%, #2BD976 45%, #1A8F4C 100%)",
                borderColor: "rgba(60,255,140,0.55)",
                boxShadow: useTransform(
                  packGlow,
                  [0, 1],
                  [
                    "0 0 0px rgba(60,255,140,0)",
                    "0 0 60px rgba(60,255,140,0.55), 0 0 120px rgba(26,143,76,0.45), inset 0 0 30px rgba(255,255,255,0.18)",
                  ],
                ) as unknown as string,
              }}
            >
              {/* cell grid texture */}
              <div className="absolute inset-2 grid grid-cols-8 gap-[3px] opacity-40">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div key={i} className="rounded-[2px] bg-white/25" />
                ))}
              </div>
              {/* Lightning bolt */}
              <motion.div
                className="absolute inset-0 grid place-items-center"
                style={{ scale: boltScale }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-[28%] h-[70%]"
                  style={{
                    filter:
                      "drop-shadow(0 0 14px rgba(255,255,255,0.9)) drop-shadow(0 0 40px rgba(255,255,255,0.55))",
                  }}
                >
                  <path
                    d="M13 2 L4 14 h6 l-1 8 9-12 h-6 l1-8 z"
                    fill="#ffffff"
                    stroke="#ffffff"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Headline */}
        <div
          ref={headlineScope}
          className="absolute inset-x-0 bottom-[8%] md:bottom-[10%] text-center px-6 pointer-events-none"
          style={{ opacity: 0 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Bringing Batteries{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${ACCENT}, #8FA8FF)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Back to Life
            </span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/55 font-mono">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
}
