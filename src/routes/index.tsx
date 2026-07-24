import { createFileRoute } from "@tanstack/react-router";
import logo from "@/assets/walor-logo.jpeg";
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
    <footer className="bg-[#2323FF] text-white">
      <div className="walor-container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <img src={logo} alt="Walor Energy" className="h-8 md:h-10 w-auto" />
            </div>
            <p className="mt-4 text-sm text-white/80 max-w-sm leading-relaxed">
              India's Full-Pack EV Battery Revival platform. Built for commercial fleet operators.
            </p>
            <p className="mt-4 text-xs text-white/60 font-mono">Hyderabad, Telangana, India</p>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/60">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#solutions" className="text-white/85 hover:text-white">
                  Solutions
                </a>
              </li>
              <li>
                <a href="#impact" className="text-white/85 hover:text-white">
                  Impact
                </a>
              </li>
              <li>
                <a href="#sustainability" className="text-white/85 hover:text-white">
                  Sustainability
                </a>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/60">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="mailto:support@walorenergy.com" className="text-white/85 hover:text-white">
                  support@walorenergy.com
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/85 hover:text-white">
                  Book Assessment
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/70">
          <span>© 2025 Walor Energy Private Limited. All rights reserved.</span>
          <span className="flex gap-6">
            <a href="#" className="hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white">
              Terms of Service
            </a>
          </span>
        </div>
      </div>
    </footer>
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
