import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/walor-logo.png";
import iiitHyderabadLogo from "@/assets/IIIT_Hyderabad_Logo.png";
import iitHyderabadLogo from "@/assets/iithydlogo.png";
import iitDelhiLogo from "@/assets/iitdlogo.jpeg";
import mahindraLogo from "@/assets/mahindralogo.png";
import snistLogo from "@/assets/SNIST.jpg";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Lenis from "lenis";
import {
  ArrowRight,
  Clock,
  TrendingDown,
  AlertTriangle,
  Repeat,
  Trash2,
  Recycle,
  Zap,
  CheckCircle2,
  Mail,
  MapPin,
  Factory,
  BatteryCharging,
  Gauge,
  Wrench,
  RotateCw,
  Leaf,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Navbar } from "@/components/walor/Navbar";
import { Counter } from "@/components/walor/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/walor/Reveal";
import { PageLoad } from "@/components/walor/PageLoad";
import { HeroCells } from "@/components/walor/HeroCells";
// import { StatsOdometer } from "@/components/walor/StatsOdometer";
import { SustainabilityV2 } from "@/components/walor/SustainabilityV2";
import { BusinessImpactV2 } from "@/components/walor/BusinessImpactV2";
import { EcosystemNetwork } from "@/components/walor/EcosystemNetwork";
import { ContactCTA } from "@/components/walor/ContactCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Walor Energy — EV Battery Revival for Commercial Fleets" },
      {
        name: "description",
        content:
          "India's most advanced Full-Pack EV Battery Revival platform. Cut fleet costs by 40–50%, extend battery life 2×, divert 60% of battery waste.",
      },
      { property: "og:title", content: "Walor Energy — EV Battery Revival for Commercial Fleets" },
      {
        property: "og:description",
        content: "Restore batteries. Restore profits. Power sustainable mobility.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div id="top" className="relative min-h-screen text-foreground">
      <PageLoad />
      <Navbar />
      <HeroCells />

      {/* <StatsOdometer /> */}
      {/* <Problem /> */}
      <BusinessImpactV2 />
      <SustainabilityV2 />
      <EcosystemNetwork />
      <ContactCTA />
      <Footer />
    </div>
  );
}

/* Hero replaced by HeroCells animation above */

/* ============================ PROBLEM ============================ */
function Problem() {
  const problems = [
    {
      icon: Clock,
      stat: "30–40%",
      label: "Range Drop",
      desc: "Degraded packs force shorter routes and more frequent charging stops.",
    },
    {
      icon: TrendingDown,
      stat: "₹2.5L+",
      label: "Annual Revenue Loss",
      desc: "Per vehicle, due to downtime, reduced utilization, and emergency service calls.",
    },
    {
      icon: AlertTriangle,
      stat: "3×",
      label: "Higher Downtime Risk",
      desc: "Aged batteries fail unexpectedly, stranding vehicles and violating SLAs.",
    },
    {
      icon: Repeat,
      stat: "₹6–8L",
      label: "Replacement Cost",
      desc: "Full battery replacement per vehicle — often unbudgeted and margin-destroying.",
    },
    {
      icon: Trash2,
      stat: "18kg+",
      label: "Battery Waste",
      desc: "Per pack discarded — a compounding ESG liability for fleet operators.",
    },
  ];

  return (
    <section id="solutions" className="walor-section relative">
      <div className="walor-container">
        <SectionHeader
          eyebrow="The Problem"
          title="Battery Degradation Is a Revenue Problem"
          lead="For commercial fleet operators, a degraded battery pack isn't just a maintenance issue — it's an operational bottleneck that compounds across every vehicle in your fleet."
        />

        <Stagger className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map((p) => (
            <StaggerItem key={p.label} className="group">
              <div className="glass glass-hover h-full rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent" />
                <p.icon className="size-5 text-foreground/50" />
                <div className="mt-6 font-mono text-3xl font-bold text-foreground">{p.stat}</div>
                <div className="mt-1 text-sm font-medium text-foreground/90">{p.label}</div>
                <p className="mt-3 text-sm text-foreground/55 leading-relaxed">{p.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2} className="mt-16 text-center">
          <p className="text-foreground/60 text-sm">The status quo costs operators millions.</p>
          <p className="mt-1 text-lg font-medium text-foreground">There is a better path. ↓</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ BUSINESS IMPACT ============================ */
function BusinessImpact() {
  const metrics = [
    { v: 50, suffix: "%", label: "CAPEX Savings", desc: "vs. full battery replacement" },
    {
      v: 2,
      suffix: "×",
      label: "Battery Life Extension",
      desc: "beyond original degradation point",
    },
    {
      v: 60,
      suffix: "%",
      label: "Battery Waste Reduction",
      desc: "material diverted from disposal",
    },
    {
      v: 98,
      suffix: "%",
      label: "Fleet Uptime Target",
      desc: "post-revival operational availability",
    },
  ];

  return (
    <section id="impact" className="walor-section">
      <div className="walor-container">
        <SectionHeader eyebrow="Business Impact" title="Numbers That Move Your Bottom Line" />

        <Stagger className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <StaggerItem key={m.label}>
              <div className="glass rounded-2xl p-6 md:p-8 h-full">
                <div className="font-mono text-5xl md:text-6xl font-bold text-gradient-green">
                  <Counter value={m.v} suffix={m.suffix} />
                </div>
                <div className="mt-4 text-sm font-medium text-foreground">{m.label}</div>
                <div className="text-xs text-foreground/55 mt-1">{m.desc}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ SUSTAINABILITY ============================ */
function Sustainability() {
  const stages = [
    {
      title: "Manufacturing",
      kicker: "01 / Origin",
      copy: "Every pack begins with high-value cells and materials designed to move India forward.",
      detail: "Materials kept in motion",
      icon: Factory,
    },
    {
      title: "Deployment",
      kicker: "02 / In service",
      copy: "Packs deliver dependable power across the routes that keep commercial fleets moving.",
      detail: "Powering daily operations",
      icon: BatteryCharging,
    },
    {
      title: "Degradation",
      kicker: "03 / Diagnosed",
      copy: "Walor identifies recoverable capacity before a degraded pack becomes costly waste.",
      detail: "Data-led health assessment",
      icon: Gauge,
    },
    {
      title: "Walor Revival",
      kicker: "04 / Our intervention",
      copy: "Precision diagnostics and module-level restoration return the pack to productive service.",
      detail: "The Walor revival protocol",
      icon: Wrench,
    },
    {
      title: "Extended Life",
      kicker: "05 / Back in motion",
      copy: "A renewed pack keeps vehicles earning for longer—with lower lifecycle cost and less extraction.",
      detail: "More kilometres per pack",
      icon: RotateCw,
    },
    {
      title: "Sustainable Reuse",
      kicker: "06 / Circular value",
      copy: "When traction life ends, usable energy and materials stay valuable in the next application.",
      detail: "A closed-loop future",
      icon: Leaf,
    },
  ];
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveStage((current) => (current + 1) % stages.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [stages.length]);

  const active = stages[activeStage];

  return (
    <section
      id="sustainability"
      className="walor-section bg-foreground/[0.03] border-y border-foreground/5"
    >
      <div className="walor-container">
        <SectionHeader
          eyebrow="Sustainability"
          title="Every Battery Revived Is One Less Battery in Landfill"
        />

        <Reveal className="mt-14">
          <div className="lifecycle-shell overflow-hidden rounded-[2rem] border border-[var(--walor-blue)]/15 p-5 md:p-8 lg:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,.85fr)] lg:gap-8">
              <div
                className="lifecycle-orbit mx-auto w-full max-w-[620px]"
                aria-label="Walor closed-loop battery lifecycle"
              >
                <div className="lifecycle-track" />
                <div className="lifecycle-track lifecycle-track-inner" />
                <motion.div
                  className="lifecycle-energy-arm"
                  animate={{ rotate: activeStage * 60 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="lifecycle-energy-pulse" />
                </motion.div>
                <div className="lifecycle-core">
                  <div className="lifecycle-core-mark" aria-hidden="true">
                    <span>W</span>
                  </div>
                  <p className="mt-4 text-center font-mono text-[9px] font-semibold uppercase tracking-[0.24em] text-[var(--walor-blue)]/60">
                    Walor revival loop
                  </p>
                </div>
                {stages.map((stage, index) => {
                  const Icon = stage.icon;
                  const angle = index * 60 - 90;
                  const position = {
                    left: `${50 + Math.cos((angle * Math.PI) / 180) * 46}%`,
                    top: `${50 + Math.sin((angle * Math.PI) / 180) * 46}%`,
                  };
                  const selected = activeStage === index;
                  return (
                    <button
                      key={stage.title}
                      type="button"
                      style={position}
                      onMouseEnter={() => setActiveStage(index)}
                      onFocus={() => setActiveStage(index)}
                      onClick={() => setActiveStage(index)}
                      className={`lifecycle-node ${selected ? "is-active" : ""}`}
                      aria-label={`Show ${stage.title} stage`}
                    >
                      <span className="lifecycle-node-icon">
                        <Icon className="size-4" />
                      </span>
                      <span className="lifecycle-node-label">
                        <b>{String(index + 1).padStart(2, "0")}</b>
                        {stage.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="lifecycle-panel relative min-h-[255px] overflow-hidden rounded-2xl p-7 md:p-9">
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[var(--walor-blue)]/10 blur-3xl" />
                <div className="relative">
                  <div className="mb-10 flex items-center justify-between border-b border-[var(--walor-blue)]/12 pb-5">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--walor-blue)]">
                      Live lifecycle
                    </span>
                    <span className="font-mono text-xs text-foreground/35">
                      {String(activeStage + 1).padStart(2, "0")} / 06
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.title}
                      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -10, filter: "blur(3px)" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="mb-4 flex items-center gap-3">
                        <active.icon className="size-5 text-[var(--walor-blue)]" />
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/45">
                          {active.kicker}
                        </span>
                      </div>
                      <h3 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                        {active.title}
                      </h3>
                      <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-foreground/62">
                        {active.copy}
                      </p>
                      <div className="mt-7 flex items-center gap-2 text-sm font-medium text-[var(--walor-blue)]">
                        <span>{active.detail}</span>
                        <ChevronRight className="size-4" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full bg-white overflow-hidden"
    >
      {/* Background Depth Layers (Pure Gradients) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Transition Zone Mask (Top 120px fades from transparent to solid to ensure seamless merge with white CTA background) */}
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage: `linear-gradient(to bottom, transparent 0px, black 120px)`,
            maskImage: `linear-gradient(to bottom, transparent 0px, black 120px)`,
          }}
        >
          {/* Layer 1: Base Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] via-[#FAFCFF] via-40% to-[#EEF5FF]" />

          {/* Layer 2: Behind Walor Logo (Top Left) */}
          <div
            className="absolute -top-40 -left-40 w-[800px] h-[800px] blur-[130px] rounded-full mix-blend-multiply"
            style={{ backgroundColor: "rgba(52,90,255,0.08)" }}
          />

          {/* Layer 3: Behind Built By Column (Bottom Right) */}
          <div
            className="absolute -bottom-40 -right-20 w-[800px] h-[800px] blur-[140px] rounded-full mix-blend-multiply"
            style={{ backgroundColor: "rgba(52,90,255,0.05)" }}
          />

          {/* Layer 4: Very subtle center glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] blur-[160px] rounded-full mix-blend-multiply"
            style={{ backgroundColor: "rgba(52,90,255,0.03)" }}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-6 md:px-10 pt-[120px] pb-[80px]">
        {/* Top 4-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Column 1: Brand */}
          <div className="lg:w-1/4 lg:pr-12 flex flex-col items-start">
            <img
              src={logo}
              alt="Walor Energy"
              className="h-16 md:h-20 w-auto object-contain mb-8"
            />
            <div className="space-y-4 text-[14px] leading-relaxed text-[#555555]">
              <p>India's Full-Pack EV Battery Revival Platform.</p>
              <p>Built for Commercial Fleet Operators.</p>
              <div className="pt-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#0A0A0A]/40 mb-1">
                  Location
                </p>
                <p className="text-[#0A0A0A]">Hyderabad, Telangana, India</p>
              </div>
            </div>
          </div>

          {/* Vertical Divider 1 */}
          <div className="hidden lg:block w-[1px] bg-black/[0.04] shrink-0" />

          {/* Column 2: Platform */}
          <div className="lg:w-1/4 lg:px-6">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A]/40 mb-8">
              Platform
            </div>
            <ul className="space-y-5">
              {["Impact", "Sustainability", "Book Vehicle Assessment"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/ /g, "-")}`}
                    className="group inline-flex items-center text-[14px] text-[#555555] transition-colors hover:text-[#2323FF]"
                  >
                    <span className="relative overflow-hidden transition-transform duration-300 group-hover:translate-x-1 pb-0.5">
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2323FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Divider 2 */}
          <div className="hidden lg:block w-[1px] bg-black/[0.04] shrink-0" />

          {/* Column 3: Contact */}
          <div className="lg:w-1/4 lg:px-6">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0A0A0A]/40 mb-8">
              Contact
            </div>
            <ul className="space-y-6">
              <li>
                <a
                  href="mailto:support@walorenergy.com"
                  className="group inline-flex items-center gap-2 text-[14px] text-[#555555] transition-colors hover:text-[#2323FF]"
                >
                  <Mail className="size-4 text-[#0A0A0A]/30 group-hover:text-[#2323FF] transition-colors stroke-[1.5] shrink-0" />
                  <span className="relative overflow-hidden transition-transform duration-300 group-hover:translate-x-1 pb-0.5">
                    support@walorenergy.com
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2323FF] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-[14px] text-[#555555]">
                  <MapPin className="size-4 text-[#0A0A0A]/30 stroke-[1.5] shrink-0" />
                  <span>Hyderabad, Telangana</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Vertical Divider 3 */}
          <div className="hidden lg:block w-[1px] bg-black/[0.04] shrink-0" />

          {/* Column 4: Engineering Roots */}
          <div className="lg:w-1/4 lg:pl-10">
            <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0A0A0A]/40">
              Engineering Roots
            </div>
            <div className="mt-6 border-t border-[#2323FF]/15" />
            <div className="mt-5 space-y-4 text-[15px] leading-none text-[#0A0A0A]">
              {[
                { logo: iitHyderabadLogo, alt: "IIT Hyderabad logo", label: "IIT - Hyderabad" },
                { logo: iitDelhiLogo, alt: "IIT Delhi logo", label: "IIT - Delhi" },
                { logo: mahindraLogo, alt: "Mahindra logo", label: "Ex-Mahindra" },
                { logo: snistLogo, alt: "SNIST logo", label: "SNIST" },
              ].map(({ logo, alt, label }) => (
                <div key={label} className="flex items-center gap-4 font-semibold">
                  <div className="flex h-[29px] w-[77px] shrink-0 items-center">
                    <img
                      src={logo}
                      alt={alt}
                      className="h-[29px] w-full object-contain opacity-85"
                    />
                  </div>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-black/[0.05] flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#0A0A0A]/40">
          <p>© 2026 Walor Energy Private Limited.</p>
          <div className="flex items-center gap-8">
            <a href="#" className="hover:text-[#0A0A0A] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#0A0A0A] transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

/* ============================ SHARED ============================ */
function SectionHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--walor-green)]">
          // {eyebrow}
        </span>
      </Reveal>
      <Reveal
        delay={0.05}
        as="h2"
        className="mt-4 text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]"
      >
        {title}
      </Reveal>
      {lead && (
        <Reveal
          delay={0.1}
          as="p"
          className="mt-5 text-base md:text-lg text-foreground/60 leading-relaxed"
        >
          {lead}
        </Reveal>
      )}
    </div>
  );
}
