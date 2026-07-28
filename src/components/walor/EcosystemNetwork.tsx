import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { 
  Truck, 
  Package, 
  Factory, 
  Zap, 
  Wallet, 
  Bus 
} from "lucide-react";
import { Reveal } from "@/components/walor/Reveal";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

interface NodeData {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  x: number;
  y: number;
}

const nodes: NodeData[] = [
  {
    id: "node-1",
    title: "Fleet Operators",
    description: "Maximized uptime & lower TCO",
    icon: Truck,
    x: 250,
    y: 100,
  },
  {
    id: "node-2",
    title: "EV Logistics",
    description: "Reliable commercial transport",
    icon: Package,
    x: 750,
    y: 100,
  },
  {
    id: "node-3",
    title: "OEM Partners",
    description: "Battery lifecycle management",
    icon: Factory,
    x: 180,
    y: 300,
  },
  {
    id: "node-4",
    title: "Charging Partners",
    description: "Grid & infrastructure synergy",
    icon: Zap,
    x: 820,
    y: 300,
  },
  {
    id: "node-5",
    title: "Fleet Finance",
    description: "De-risked asset underwriting",
    icon: Wallet,
    x: 300,
    y: 500,
  },
  {
    id: "node-6",
    title: "Public Transport",
    description: "Sustainable mass transit",
    icon: Bus,
    x: 700,
    y: 500,
  },
];

const CENTER_X = 500;
const CENTER_Y = 300;

export function EcosystemNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pulseRef = useRef<SVGCircleElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const hoveredNodeRef = useRef<string | null>(null);

  const handleMouseEnter = (id: string) => {
    setHoveredNode(id);
    hoveredNodeRef.current = id;
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
    hoveredNodeRef.current = null;
  };
  
  const [scale, setScale] = useState(1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScale = () => {
      if (wrapperRef.current) {
        const width = wrapperRef.current.offsetWidth;
        setScale(Math.min(1, width / 1000));
      }
    };
    
    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Entrance Animation Sequence
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // Animate center hub
      tl.fromTo(
        ".center-hub",
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out" },
        0
      );

      // Animate SVG paths (lines from center to nodes)
      tl.fromTo(
        ".connection-path",
        { strokeDasharray: 500, strokeDashoffset: 500 },
        { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut", stagger: 0.1 },
        0.2
      );

      // Animate Node Cards appearing without layout shifts
      tl.fromTo(
        ".node-card",
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
        1.0
      );

      // 2. Idle Pulse Animation Loop
      let currentPulseNodeIndex = 0;
      
      const playPulse = () => {
        if (!pulseRef.current) return;
        
        // Don't pulse while hovering to keep interactions clean
        if (hoveredNodeRef.current) {
          gsap.delayedCall(0.5, playPulse);
          return;
        }

        const node = nodes[currentPulseNodeIndex];
        const pathId = `#path-${node.id}`;

        // Reset pulse
        gsap.set(pulseRef.current, { opacity: 0, scale: 0 });

        // Pulse animation sequence
        const pulseTl = gsap.timeline({
          onComplete: () => {
            currentPulseNodeIndex = (currentPulseNodeIndex + 1) % nodes.length;
            // Wait 1.5 seconds before next pulse (faster idle loop)
            gsap.delayedCall(1.5, playPulse);
          }
        });

        // Flash the connection path briefly
        pulseTl.to(pathId, { 
          stroke: "rgba(35, 35, 255, 0.4)", 
          duration: 0.3 
        }, 0);

        // Move the pulse dot along the path (faster)
        pulseTl.to(pulseRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.15
        }, 0);
        
        pulseTl.to(pulseRef.current, {
          motionPath: {
            path: pathId,
            align: pathId,
            alignOrigin: [0.5, 0.5],
            autoRotate: false,
          },
          duration: 1.0, // sped up from 2s to 1s
          ease: "power1.inOut"
        }, 0);

        // Flash the destination node
        pulseTl.to(`#card-${node.id}`, {
          boxShadow: "0 0 20px rgba(35, 35, 255, 0.25)",
          borderColor: "rgba(35, 35, 255, 0.4)",
          duration: 0.4,
          yoyo: true,
          repeat: 1
        }, 0.7);

        // Fade out pulse dot
        pulseTl.to(pulseRef.current, {
          opacity: 0,
          scale: 0,
          duration: 0.2
        }, 0.9);

        // Restore path color
        pulseTl.to(pathId, { 
          stroke: "rgba(0, 0, 0, 0.06)", 
          duration: 0.4 
        }, 1.1);
      };

      // Start the pulse loop immediately after entrance sequence completes (wait ~300ms)
      tl.add(() => {
        gsap.delayedCall(0.3, playPulse);
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Generate a smooth curved path from center to a node
  const getPathData = (x: number, y: number) => {
    // Control point for quadratic curve to give it a nice organic feel
    const dx = x - CENTER_X;
    const dy = y - CENTER_Y;
    const cx = CENTER_X + dx * 0.5;
    const cy = CENTER_Y + dy * 0.2; // Offset control point slightly
    
    return `M ${CENTER_X} ${CENTER_Y} Q ${cx} ${cy} ${x} ${y}`;
  };

  return (
    <section ref={containerRef} className="walor-section relative overflow-hidden bg-[#F7F8FA] min-h-[800px] flex flex-col justify-center">
      {/* Background aesthetics */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft radial blue glow behind hub */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2323FF]/[0.02] blur-[100px] rounded-full" />
        {/* Faint blueprint/grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: `40px 40px`
          }}
        />
      </div>

      <div className="walor-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#2323FF]/70">
              // Ecosystem
            </span>
          </Reveal>
          <Reveal delay={0.05} as="h2" className="mt-4 text-3xl md:text-5xl font-bold tracking-tight leading-[1.1] text-[#0A0A0A]">
            Building with India's EV Ecosystem
          </Reveal>
          <Reveal delay={0.1} as="p" className="mt-5 text-base md:text-lg text-[#555555] leading-relaxed">
            Walor Energy is the central platform connecting commercial fleet operators, mobility providers, and OEM partners to build India's most reliable battery revival infrastructure.
          </Reveal>
        </div>

        <div ref={wrapperRef} className="w-full max-w-[1000px] mx-auto mt-10">
          <div 
            className="relative w-full overflow-visible flex items-center justify-center"
            style={{ height: `${600 * scale}px` }}
          >
            <div 
              className="absolute w-[1000px] h-[600px] origin-center flex items-center justify-center"
              style={{ transform: `scale(${scale})` }}
            >
              {/* SVG Connection Layer */}
              <svg 
                ref={svgRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 1000 600"
                preserveAspectRatio="xMidYMid meet"
              >
                {nodes.map((node) => (
                  <path
                    key={`path-${node.id}`}
                    id={`path-${node.id}`}
                    className="connection-path"
                    d={getPathData(node.x, node.y)}
                    fill="none"
                    stroke={hoveredNode === node.id ? "rgba(35, 35, 255, 0.4)" : "rgba(0, 0, 0, 0.06)"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{ transition: "stroke 0.4s ease" }}
                  />
                ))}
                
                {/* The traveling energy pulse */}
                <circle
                  ref={pulseRef}
                  r="4"
                  fill="#2323FF"
                  className="opacity-0"
                  style={{ filter: "drop-shadow(0 0 6px rgba(35,35,255,0.8))" }}
                />
              </svg>

              {/* HTML Nodes Layer */}
              <div className="absolute inset-0 w-full h-full">
                {/* Center Hub */}
                <div 
                  className="center-hub absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10"
                  style={{
                    left: '50%',
                    top: '50%'
                  }}
                >
                  {/* Concentric rings */}
                  <div className={`absolute w-32 h-32 rounded-full border border-[#2323FF]/10 transition-all duration-500 ${hoveredNode ? 'scale-110 border-[#2323FF]/30' : ''}`} />
                  <div className={`absolute w-24 h-24 rounded-full border border-[#2323FF]/20 transition-all duration-500 delay-75 ${hoveredNode ? 'scale-110 border-[#2323FF]/40' : ''}`} />
                  
                  {/* Core node */}
                  <div className={`relative w-16 h-16 rounded-full bg-white shadow-xl shadow-[#2323FF]/10 border border-[#2323FF]/20 flex items-center justify-center backdrop-blur-md transition-all duration-300 ${hoveredNode ? 'shadow-[#2323FF]/30 scale-105' : ''}`}>
                    <span className="font-mono text-xl font-bold text-[#2323FF]">W</span>
                    <div className="absolute inset-0 rounded-full bg-[#2323FF]/5 blur-sm" />
                  </div>
                </div>

                {/* Surrounding Nodes */}
                {nodes.map((node) => {
                  const isHovered = hoveredNode === node.id;
                  const isDimmed = hoveredNode !== null && hoveredNode !== node.id;

                  // Convert exact SVG coordinates (0-1000, 0-600) to percentage for absolute positioning
                  const leftPercent = (node.x / 1000) * 100;
                  const topPercent = (node.y / 600) * 100;

                  return (
                    <div
                      key={node.id}
                      className="node-card absolute z-20"
                      style={{ 
                        left: `${leftPercent}%`, 
                        top: `${topPercent}%`,
                        transform: "translate(-50%, -50%)"
                      }}
                      onMouseEnter={() => handleMouseEnter(node.id)}
                      onMouseLeave={() => handleMouseLeave()}
                    >
                      <div 
                        id={`card-${node.id}`}
                        style={{
                          transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
                          transform: `scale(${isHovered ? 1.02 : 1})`,
                          opacity: isDimmed ? 0.4 : 1
                        }}
                        className={`flex items-center gap-4 bg-white/70 backdrop-blur-xl border p-4 pr-6 rounded-2xl transition-all duration-400 ${
                          isHovered 
                            ? 'border-[#2323FF]/30 shadow-[0_12px_32px_rgba(35,35,255,0.12)]' 
                            : 'border-black/5 shadow-[0_8px_24px_rgba(0,0,0,0.04)]'
                        }`}
                      >
                        <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-400 ${
                          isHovered ? 'bg-[#2323FF]/10' : 'bg-black/5'
                        }`}>
                          <node.icon className={`size-5 transition-colors duration-400 ${
                            isHovered ? 'text-[#2323FF]' : 'text-[#0A0A0A]/60'
                          }`} />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#0A0A0A] tracking-tight whitespace-nowrap">{node.title}</h4>
                          <p className="text-[11px] font-medium text-[#555555]/80 mt-0.5 whitespace-nowrap">{node.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
