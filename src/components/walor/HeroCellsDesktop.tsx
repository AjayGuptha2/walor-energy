import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import carImage from "@/assets/hero-car.png";

export function HeroCellsDesktop() {
  // Refs for camera layers
  const bgRef = useRef<HTMLDivElement>(null);
  const typoRef = useRef<HTMLDivElement>(null);
  const vehicleRef = useRef<HTMLDivElement>(null);

  // Mouse coordinates target [-1, 1]
  const targetX = useRef(0);
  const targetY = useRef(0);

  useEffect(() => {
    // Desktop: Setup GSAP quickTo for highly efficient mouse tracking and ticker breathing
    const ctx = gsap.context(() => {
      // Background quickTo trackers (20% parallax)
      const xToBg = gsap.quickTo(bgRef.current, "x", { duration: 0.8, ease: "power3.out" });
      const yToBg = gsap.quickTo(bgRef.current, "y", { duration: 0.8, ease: "power3.out" });

      // Typography quickTo trackers (40% parallax)
      const xToTypo = gsap.quickTo(typoRef.current, "x", { duration: 0.8, ease: "power3.out" });
      const yToTypo = gsap.quickTo(typoRef.current, "y", { duration: 0.8, ease: "power3.out" });

      // Vehicle quickTo trackers (100% parallax)
      const xToVehicle = gsap.quickTo(vehicleRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });
      const yToVehicle = gsap.quickTo(vehicleRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const handleTick = (time: number) => {
        // Compute slow, handheld camera breathing sway (sine/cosine)
        const breatheX = Math.sin(time * 0.8) * 0.15;
        const breatheY = Math.cos(time * 1.0) * 0.1;

        // Combine mouse target and breathing offset
        const finalX = targetX.current + breatheX;
        const finalY = targetY.current + breatheY;

        // Animate layers at differential coefficients (subtle bounds: 8px / 4px max)
        xToBg(finalX * 8 * 0.2);
        yToBg(finalY * 4 * 0.2);

        xToTypo(finalX * 8 * 0.4);
        yToTypo(finalY * 4 * 0.4);

        xToVehicle(finalX * 8);
        yToVehicle(finalY * 4);
      };

      // Add camera movement calculations to the GSAP Ticker
      gsap.ticker.add(handleTick);

      const handleMouseMove = (e: MouseEvent) => {
        // Normalize mouse coordinates to range [-1, 1] relative to viewport center
        targetX.current = (e.clientX / window.innerWidth) * 2 - 1;
        targetY.current = (e.clientY / window.innerHeight) * 2 - 1;
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        gsap.ticker.remove(handleTick);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex h-[100svh] min-h-[760px] max-h-[1080px] w-full flex-row items-center overflow-hidden bg-[#F7F8FA] select-none">
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
      <div className="relative z-10 mx-auto flex h-full min-h-[760px] w-full max-w-[1440px] flex-row items-center justify-between px-10 py-0">
        {/* Left Side: Typography - GSAP Translated */}
        <div
          ref={typoRef}
          className="relative z-10 flex w-[54%] flex-col items-start justify-center"
        >
          {/* Eyebrow and Large Hero Heading (z-10) - Framer Motion Entrance */}
          <motion.div
            className="relative z-10 w-full max-w-[720px]"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Editorial Eyebrow */}
            <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[#0A0A0A]/40">
              // MODULE-LEVEL DIAGNOSTICS & SYSTEM REVIVAL
            </div>

            <h1 className="text-[4rem] xl:text-[4.25rem] font-semibold leading-[1.05] tracking-[-0.045em] text-[#0A0A0A]">
              Powering the Next Life
              <br />
              <span className="font-light text-[#2323FF]">of EV Batteries.</span>
            </h1>
          </motion.div>

          {/* Subtitle - Framer Motion Entrance */}
          <motion.div
            className="relative z-30 mt-8 w-full pointer-events-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="max-w-lg text-lg font-normal leading-relaxed text-[#555555]/80">
              Walor revives EV batteries to deliver longer life, lower costs, and sustainable
              mobility.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Vehicle Foreground Layer (z-20) - GSAP Translated */}
        <div
          ref={vehicleRef}
          className="z-20 absolute inset-y-0 right-0 mt-0 flex w-[67%] max-w-[1056px] select-none items-center justify-end pointer-events-none"
        >
          {/* Vehicle Visuals - Framer Motion Entrance */}
          <motion.div
            className="relative w-full"
            initial={{ opacity: 0, scale: 1.05, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            {/* Core Vehicle Image */}
            <img
              src={carImage}
              alt="Walor EV Fleet Vehicle"
              className="relative z-10 block h-auto w-full object-contain ml-0 max-h-[80svh]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
