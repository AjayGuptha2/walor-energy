import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { Counter } from "@/components/walor/Counter";
import { Reveal } from "@/components/walor/Reveal";

/* ─── Metric Data ───────────────────────────────────────────────── */
const METRICS = [
  {
    v: 50,
    suffix: "%",
    label: "CAPEX Savings",
    desc: "Achieved compared to the expense of complete battery pack replacement, directly improving operational cash flows.",
    size: "wide", // large main card
    theme: "blue",
  },
  {
    v: 2,
    suffix: "×",
    label: "Battery Life Extension",
    desc: "Extended operational lifespan beyond the original degradation point, delaying costly battery replacements.",
    size: "tall", // vertical card
    theme: "indigo",
  },
  {
    v: 60,
    suffix: "%",
    label: "Battery Waste Reduction",
    desc: "Diverting high-value minerals and cells from hazardous disposal, aligning fleets with standard ESG frameworks.",
    size: "medium",
    theme: "light-blue",
  },
  {
    v: 98,
    suffix: "%",
    label: "Fleet Uptime Target",
    desc: "Post-revival operational availability, reducing roadside breakdowns and route disruptions.",
    size: "small",
    theme: "slate",
  },
];

/* ─── Premium Card Wrapper with Parallax & Hover ────────────────── */
function ImpactCard({
  metric,
  index,
  mouseX,
  mouseY,
}: {
  metric: typeof METRICS[0];
  index: number;
  mouseX: any;
  mouseY: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Parallax spring settings for ultra-smooth movement
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cardX = useSpring(0, springConfig);
  const cardY = useSpring(0, springConfig);

  // Handle subtle mouse parallax movement per card
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const unsubscribeX = mouseX.on("change", (latestX: number) => {
      const rect = el.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const dist = latestX - cardCenterX;
      // Active parallax if mouse is within 400px of card
      if (Math.abs(dist) < 400) {
        cardX.set((dist / 400) * 8); // subtle 8px shift
      } else {
        cardX.set(0);
      }
    });

    const unsubscribeY = mouseY.on("change", (latestY: number) => {
      const rect = el.getBoundingClientRect();
      const cardCenterY = rect.top + rect.height / 2;
      const dist = latestY - cardCenterY;
      if (Math.abs(dist) < 400) {
        cardY.set((dist / 400) * 8);
      } else {
        cardY.set(0);
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY, cardX, cardY]);

  // Dynamic layout class selection
  const gridClasses = {
    wide: "col-span-1 md:col-span-2 md:row-span-1",
    tall: "col-span-1 md:col-span-1 md:row-span-2",
    medium: "col-span-1 md:col-span-1 md:row-span-1",
    small: "col-span-1 md:col-span-1 md:row-span-1",
  }[metric.size];

  // Floating offset based on index to offset timing
  const floatDelay = index * 0.4;

  return (
    <motion.div
      ref={cardRef}
      className={`imp-card-outer ${gridClasses}`}
      style={{
        x: cardX,
        y: cardY,
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      <div
        className={`imp-card-inner ${hovered ? "is-hovered" : ""}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          animation: `imp-float 6s ease-in-out infinite alternate`,
          animationDelay: `${floatDelay}s`,
        }}
      >
        {/* Soft Light Sweep Overlay (triggers once on mount) */}
        <div className="imp-sweep-glow" />

        {/* Card Header/Metric */}
        <div className="imp-metric-wrapper">
          <span className="imp-number-prefix">// 0{index + 1}</span>
          <div className="imp-big-number">
            <Counter value={metric.v} suffix={metric.suffix} />
          </div>
        </div>

        {/* Info Block */}
        <div className="imp-info-wrapper">
          <h3 className="imp-label">{metric.label}</h3>
          <p className="imp-description">{metric.desc}</p>

          {/* Premium Battery Health Extension Indicator (Only for tall card index 1) */}
          {index === 1 && (
            <div className="imp-battery-health-wrapper">
              <div className="imp-battery-health-header">
                <span className="imp-battery-health-label">Extended capacity</span>
                <span className="imp-battery-health-val">Revived</span>
              </div>
              <div className="imp-battery-bar-container">
                <div className="imp-battery-bar-bg">
                  {/* Original 50% marker */}
                  <div className="imp-battery-bar-divider" />
                  
                  {/* Progress Fill animating 50% -> 100% */}
                  <motion.div
                    className="imp-battery-bar-fill"
                    initial={{ width: "50%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1], delay: 0.4 }}
                  />
                </div>
                {/* Labels below progress track */}
                <div className="imp-battery-bar-markers">
                  <span>50% Degradation Point</span>
                  <span>100% Health</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Subtle Corner Accent */}
        <div className="imp-corner-accent" />
      </div>
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */
export function BusinessImpactV2() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    rawMouseX.set(e.clientX);
    rawMouseY.set(e.clientY);
  }, [rawMouseX, rawMouseY]);

  return (
    <section
      id="impact"
      className="imp-section"
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {/* Blueprint Grid / Engineering Aesthetics */}
      <div className="imp-grid-overlay" />
      <div className="imp-radial-glow imp-glow-left" />
      <div className="imp-radial-glow imp-glow-right" />

      <div className="walor-container relative z-10">
        {/* Section Header */}
        <div className="imp-header">
          <Reveal>
            <span className="imp-eyebrow">Business Impact</span>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="imp-title">
              Numbers That Move Your<br />
              <span className="imp-title-accent">Bottom Line</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="imp-lead">
              Restoring degraded EV packs optimizes battery health, unlocks massive
              CAPEX efficiency, and drives ESG compliance.
            </p>
          </Reveal>
        </div>

        {/* Editorial Layout Grid */}
        <div className="imp-editorial-grid">
          {METRICS.map((metric, i) => (
            <ImpactCard
              key={metric.label}
              metric={metric}
              index={i}
              mouseX={rawMouseX}
              mouseY={rawMouseY}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
