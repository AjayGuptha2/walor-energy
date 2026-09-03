import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import mobileCarImage from "@/assets/mobilecar.png";

export function HeroCellsMobile() {
  // Refs for camera layers
  const bgRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Touch/Mobile: setup a simple infinite idle breathing cycle using GSAP sways
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        x: "+=1.6",
        y: "+=0.8",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(typoRef.current, {
        x: "+=3.2",
        y: "+=1.6",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(vehicleRef.current, {
        x: "+=8",
        y: "+=4",
        duration: 6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex h-fit w-full flex-col overflow-hidden bg-[#F7F8FA] select-none">
      {/* 1. CSS Studio Background (z-0) - GSAP Translated */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <div
          className="w-full h-full"
          style={{
            background: `
              /* Subtle radial blue glow inspired by Walor brand */
              radial-gradient(circle at 78% 48%, rgba(35, 35, 255, 0.035) 0%, transparent 60%),
              /* Floor spotlight / horizon blend */
              radial-gradient(ellipse at 60% 65%, rgba(251, 252, 253, 0.9) 0%, rgba(247, 248, 250, 0.4) 60%, rgba(243, 245, 247, 0) 100%),
              /* Base off-white studio linear gradient */
              linear-gradient(to bottom, #FBFCFD 0%, #F7F8FA 40%, #F3F5F7 100%)
            `,
          }}
        />
      </div>

      {/* 2. Main Content Container (z-10) */}
      <div className="relative z-10 mx-auto flex w-full flex-col items-start px-5 pt-24 pb-9 sm:px-6 sm:pt-28 sm:pb-10 md:h-fit md:px-10 md:pt-32 md:pb-0">
        <div ref={typoRef} className="relative z-10 w-full">
          {/* Editorial eyebrow */}
          <motion.div
            className="relative z-10 w-full max-w-[720px]"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="whitespace-nowrap font-mono text-[clamp(0.5625rem,2.67vw,0.625rem)] uppercase tracking-[0.08em] text-[#0A0A0A]/40">
              // MODULE-LEVEL DIAGNOSTICS & SYSTEM REVIVAL
            </div>
          </motion.div>
        </div>

        {/* Primary vehicle visual — intentionally separated from the eyebrow. */}
        <div
          ref={vehicleRef}
          className="z-20 mt-2 flex w-full select-none items-end justify-center pointer-events-none sm:mt-4 md:mt-4"
        >
          <motion.div
            className="relative w-[115%] max-w-none"
            initial={{ opacity: 0, scale: 1.05, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <img
              src={mobileCarImage}
              alt="Walor EV Fleet Vehicle"
              className="relative z-10 block h-auto w-full"
              style={{
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 12%, #000 100%), linear-gradient(to bottom, transparent 0%, #000 18%, #000 84%, transparent 100%)",
                WebkitMaskComposite: "source-in",
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 12%, #000 100%), linear-gradient(to bottom, transparent 0%, #000 18%, #000 84%, transparent 100%)",
                maskComposite: "intersect",
              }}
            />
          </motion.div>
        </div>

        {/* Brand statement follows the car in the natural document flow. */}
        <div className="relative z-10 -mt-3 flex w-full flex-col items-start sm:-mt-2">
          <motion.div
            className="relative z-10 w-full"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="origin-left font-semibold text-[clamp(2.5rem,10.25vw+0.15rem,3rem)] leading-[0.98] tracking-[-0.04em] text-[#0A0A0A] max-[374px]:scale-x-[0.86]">
              <span className="block whitespace-nowrap">Powering the Next</span>
              <span className="block whitespace-nowrap">
                Life <span className="font-light text-[#2323FF]">of EV Batteries.</span>
              </span>
            </h1>
          </motion.div>

          <motion.div
            className="relative z-30 mt-5 w-full pointer-events-auto sm:mt-6"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="max-w-[340px] text-[17px] font-normal leading-[1.55] text-[#555555]/80 sm:text-[18px] md:max-w-lg md:text-base">
              Walor revives EV batteries to deliver longer life, lower costs, and sustainable
              mobility.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
