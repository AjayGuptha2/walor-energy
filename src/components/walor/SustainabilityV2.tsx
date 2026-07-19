import { useEffect, useRef, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Factory,
  BatteryCharging,
  Gauge,
  Wrench,
  RotateCw,
  Leaf,
  ChevronRight,
} from "lucide-react";

/* ─── Data ─────────────────────────────────────────────────────── */
const STAGES = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    kicker: "01 / Origin",
    copy: "Every pack begins with high-value cells and materials designed to move India forward.",
    detail: "Materials kept in motion",
    icon: Factory,
    color: "#1479E9",
  },
  {
    id: "deployment",
    title: "Deployment",
    kicker: "02 / In service",
    copy: "Packs deliver dependable power across the routes that keep commercial fleets moving.",
    detail: "Powering daily operations",
    icon: BatteryCharging,
    color: "#1479E9",
  },
  {
    id: "degradation",
    title: "Degradation",
    kicker: "03 / Diagnosed",
    copy: "Walor identifies recoverable capacity before a degraded pack becomes costly waste.",
    detail: "Data-led health assessment",
    icon: Gauge,
    color: "#1479E9",
  },
  {
    id: "revival",
    title: "Walor Revival",
    kicker: "04 / Our intervention",
    copy: "Precision diagnostics and module-level restoration return the pack to productive service.",
    detail: "The Walor revival protocol",
    icon: Wrench,
    color: "#1479E9",
  },
  {
    id: "extended",
    title: "Extended Life",
    kicker: "05 / Back in motion",
    copy: "A renewed pack keeps vehicles earning for longer — with lower lifecycle cost and less extraction.",
    detail: "More kilometres per pack",
    icon: RotateCw,
    color: "#1479E9",
  },
  {
    id: "reuse",
    title: "Sustainable Reuse",
    kicker: "06 / Circular value",
    copy: "When traction life ends, usable energy and materials stay valuable in the next application.",
    detail: "A closed-loop future",
    icon: Leaf,
    color: "#1479E9",
  },
];

/* ─── Constants ─────────────────────────────────────────────────── */
const SVG_SIZE = 500;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;
const ORBIT_R = 188;
const NODE_R = 24;

function nodePosition(index: number) {
  const angle = (index / STAGES.length) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CX + Math.cos(angle) * ORBIT_R,
    y: CY + Math.sin(angle) * ORBIT_R,
    angle,
  };
}

/* ─── Energy Core Component ─────────────────────────────────────── */
function EnergyCore({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const tiltX = mouseY * 12;
  const tiltY = -mouseX * 12;

  return (
    <div
      className="sv2-energy-core-wrap"
      style={{
        transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Very subtle expanding ripple rings for minimal depth */}
      <div className="sv2-core-ripple sv2-ripple-1" />
      <div className="sv2-core-ripple sv2-ripple-2" />

      {/* A thin circular outline with very low opacity and soft radial blue glow */}
      <div className="sv2-core-outline">
        <div className="sv2-core-outline-glow" />
      </div>
    </div>
  );
}

/* ─── Main Component ────────────────────────────────────────────── */
export function SustainabilityV2() {
  const [activeStage, setActiveStage] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [pathDrawn, setPathDrawn] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [pulseOffset, setPulseOffset] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const pulseStartRef = useRef<number | null>(null);

  const CIRCUMFERENCE = 2 * Math.PI * ORBIT_R;

  /* ── Intersection observer — draw path on entry ── */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !pathDrawn) {
          setPathDrawn(true);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [pathDrawn]);

  /* ── Continuous Highlight flow & Stage Activation ── */
  useEffect(() => {
    if (!pathDrawn) return;
    const DURATION = 10000; // time to complete a full orbit cycle
    const animate = (ts: number) => {
      if (!pulseStartRef.current) pulseStartRef.current = ts;
      const elapsed = ts - pulseStartRef.current;
      const progress = (elapsed % DURATION) / DURATION;

      setPulseOffset(progress * CIRCUMFERENCE);

      // Map progress to active stage only when not hovered
      if (hovered === null) {
        // Adjust mapping so the active node updates exactly when the pulse reaches it
        // The stages are located at angles index * 60deg (i.e. progress = index / 6)
        // Adding 0.5 / STAGES.length aligns the transition window nicely
        const stageIndex =
          Math.floor((progress + 0.5 / STAGES.length) * STAGES.length) % STAGES.length;
        setActiveStage(stageIndex);
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [pathDrawn, hovered, CIRCUMFERENCE]);

  /* ── Mouse parallax ── */
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setMousePos({
      x: (e.clientX - cx) / rect.width,
      y: (e.clientY - cy) / rect.height,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  /* ── Node interaction ── */
  const handleNodeEnter = (i: number) => {
    setHovered(i);
    setActiveStage(i);
  };
  const handleNodeLeave = () => {
    setHovered(null);
  };

  const activeIndex = hovered ?? activeStage;
  const active = STAGES[activeIndex];

  return (
    <section
      id="sustainability"
      ref={sectionRef}
      className="sv2-section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="walor-container">
        {/* Header */}
        <div className="sv2-header">
          <span className="sv2-eyebrow">Sustainability</span>
          <h2 className="sv2-title">
            Every Battery Revived Is
            <br />
            <span className="sv2-title-accent">One Less Battery in Landfill</span>
          </h2>
          <p className="sv2-lead">
            A precision closed-loop revival system that extends battery life, cuts costs, and
            eliminates waste.
          </p>
        </div>

        {/* Main canvas */}
        <div className="sv2-canvas">
          {/* Left: SVG orbit + Energy Core */}
          <div className="sv2-orbit-wrap">
            <svg
              viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
              className="sv2-svg"
              aria-label="Walor closed-loop battery lifecycle"
            >
              {/* Defs */}
              <defs>
                <radialGradient id="sv2-orbitGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#1479E9" stopOpacity="0.07" />
                  <stop offset="100%" stopColor="#1479E9" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="sv2-pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1479E9" stopOpacity="0.06" />
                  <stop offset="50%" stopColor="#1479E9" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#1479E9" stopOpacity="0.06" />
                </linearGradient>
                <filter id="sv2-glow">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter id="sv2-glass-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow
                    dx="0"
                    dy="4"
                    stdDeviation="6"
                    floodColor="#1479E9"
                    floodOpacity="0.08"
                  />
                </filter>
              </defs>

              {/* Background glow */}
              <circle cx={CX} cy={CY} r={ORBIT_R + 50} fill="url(#sv2-orbitGlow)" />

              {/* 3 Concentric Background Depth Rings */}
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R + 32}
                fill="none"
                stroke="rgba(20,121,233,0.04)"
                strokeWidth="1.5"
                className="sv2-bg-depth-ring sv2-depth-1"
              />
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R}
                fill="none"
                stroke="rgba(20,121,233,0.03)"
                strokeWidth="8"
                className="sv2-bg-depth-ring sv2-depth-2"
              />
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R - 32}
                fill="none"
                stroke="rgba(20,121,233,0.05)"
                strokeWidth="1"
                className="sv2-bg-depth-ring sv2-depth-3"
              />

              {/* Thick Premium Track Path (6px) - Reduced Opacity */}
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R}
                fill="none"
                stroke="url(#sv2-pathGradient)"
                strokeWidth="6"
                opacity="0.45"
              />

              {/* Softer, Desaturated SINGLE Travelling Light highlight segment along path */}
              {pathDrawn && (
                <circle
                  cx={CX}
                  cy={CY}
                  r={ORBIT_R}
                  fill="none"
                  stroke="rgba(20, 121, 233, 0.65)"
                  strokeWidth="5.5"
                  strokeLinecap="round"
                  strokeDasharray={`70 ${CIRCUMFERENCE}`}
                  strokeDashoffset={-pulseOffset}
                  style={{
                    transformOrigin: `${CX}px ${CY}px`,
                    transform: "rotate(-90deg)",
                  }}
                  filter="url(#sv2-glow)"
                  opacity="0.7"
                />
              )}

              {/* Inner guide ring */}
              <circle
                cx={CX}
                cy={CY}
                r={ORBIT_R * 0.55}
                fill="none"
                stroke="rgba(20,121,233,0.05)"
                strokeWidth="1"
              />

              {/* Connector spokes */}
              {STAGES.map((_, i) => {
                const pos = nodePosition(i);
                const innerX = CX + Math.cos(pos.angle) * (ORBIT_R * 0.52);
                const innerY = CY + Math.sin(pos.angle) * (ORBIT_R * 0.52);
                return (
                  <line
                    key={i}
                    x1={innerX}
                    y1={innerY}
                    x2={pos.x}
                    y2={pos.y}
                    stroke="rgba(20,121,233,0.06)"
                    strokeWidth="1"
                    strokeDasharray="3 4"
                  />
                );
              })}

              {/* Stage nodes */}
              {STAGES.map((stage, i) => {
                const pos = nodePosition(i);
                const Icon = stage.icon;
                const isActive = activeIndex === i;
                return (
                  <g
                    key={stage.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    style={{ cursor: "pointer" }}
                    onMouseEnter={() => handleNodeEnter(i)}
                    onMouseLeave={handleNodeLeave}
                    onClick={() => {
                      setActiveStage(i);
                      setHovered(i);
                    }}
                  >
                    {/* Inner scaling group for active highlight */}
                    <g
                      style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                        transform: isActive ? "scale(1.15)" : "scale(1)",
                        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {/* Hit area */}
                      <circle r={NODE_R + 12} fill="transparent" />

                      {/* Node Glass Background */}
                      <circle
                        r={NODE_R}
                        fill={isActive ? "#1479E9" : "rgba(255, 255, 255, 0.85)"}
                        stroke={isActive ? "#1479E9" : "rgba(20, 121, 233, 0.18)"}
                        strokeWidth={isActive ? "2.5" : "1.5"}
                        filter={isActive ? "url(#sv2-glow)" : "url(#sv2-glass-shadow)"}
                        style={{
                          transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                        }}
                      />

                      {/* Icon */}
                      <foreignObject
                        x={-12}
                        y={-12}
                        width={24}
                        height={24}
                        style={{ pointerEvents: "none" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "100%",
                            color: isActive ? "#ffffff" : "#1479E9",
                            opacity: isActive ? 1 : 0.85,
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Icon size={15} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                      </foreignObject>
                    </g>

                    {/* Label */}
                    <text
                      y={NODE_R + 15}
                      textAnchor="middle"
                      fill={isActive ? "#1479E9" : "rgba(10,10,10,0.5)"}
                      fontSize="9"
                      fontWeight="600"
                      fontFamily="Inter, system-ui, sans-serif"
                      style={{ transition: "fill 0.3s ease" }}
                    >
                      {stage.title.split(" ").map((word, wi) => (
                        <tspan key={wi} x="0" dy={wi === 0 ? 0 : 10}>
                          {word}
                        </tspan>
                      ))}
                    </text>

                    {/* Index badge */}
                    <text
                      y={-NODE_R - 6}
                      textAnchor="middle"
                      fill="rgba(20,121,233,0.5)"
                      fontSize="7"
                      fontWeight="700"
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Premium Energy Core center */}
            <div className="sv2-battery-container">
              <EnergyCore mouseX={mousePos.x} mouseY={mousePos.y} />
            </div>
          </div>

          {/* Right: Info panel */}
          <div className="sv2-panel">
            {/* Panel header */}
            <div className="sv2-panel-header">
              <span className="sv2-panel-label">Live Lifecycle</span>
              <span className="sv2-panel-counter">
                {String(activeIndex + 1).padStart(2, "0")} / 06
              </span>
            </div>

            {/* Stage progress bar */}
            <div className="sv2-progress-bar">
              {STAGES.map((_, i) => (
                <div key={i} className={`sv2-progress-seg ${activeIndex === i ? "active" : ""}`} />
              ))}
            </div>

            {/* Stage content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(3px)" }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="sv2-stage-content"
              >
                {/* Icon + kicker */}
                <div className="sv2-stage-meta">
                  <div className="sv2-stage-icon-wrap">
                    <active.icon size={18} strokeWidth={1.75} />
                  </div>
                  <span className="sv2-stage-kicker">{active.kicker}</span>
                </div>

                {/* Title */}
                <h3 className="sv2-stage-title">{active.title}</h3>

                {/* Description */}
                <p className="sv2-stage-desc">{active.copy}</p>

                {/* Detail link */}
                <div className="sv2-stage-detail">
                  <span>{active.detail}</span>
                  <ChevronRight size={15} />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Stage selector dots */}
            <div className="sv2-dots">
              {STAGES.map((s, i) => (
                <button
                  key={s.id}
                  className={`sv2-dot ${activeIndex === i ? "active" : ""}`}
                  onClick={() => {
                    setActiveStage(i);
                    setHovered(i);
                    setTimeout(() => setHovered(null), 2000);
                  }}
                  aria-label={`Go to ${s.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
