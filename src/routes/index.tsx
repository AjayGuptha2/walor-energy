import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Clock,
  TrendingDown,
  AlertTriangle,
  Repeat,
  Trash2,
  RefreshCw,
  TrendingUp,
  Calendar,
  ShieldCheck,
  Users,
  Leaf,
  Recycle,
  Globe,
  Award,
  Activity,
  Thermometer,
  Battery,
  Zap,
  CheckCircle2,
  Cpu,
  LineChart,
  ShieldAlert,
  FileCheck,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Navbar } from "@/components/walor/Navbar";
import { Counter } from "@/components/walor/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/walor/Reveal";
import { PageLoad } from "@/components/walor/PageLoad";
import { ScrollBattery } from "@/components/walor/ScrollBattery";
import { HeroScroll } from "@/components/walor/HeroScroll";
import { StatsOdometer } from "@/components/walor/StatsOdometer";
import { BeforeAfter } from "@/components/walor/BeforeAfter";
import { StickyExplainer } from "@/components/walor/StickyExplainer";

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
      { property: "og:description", content: "Restore batteries. Restore profits. Power sustainable mobility." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div id="top" className="relative min-h-screen text-foreground">
      <PageLoad />
      <ScrollBattery />
      <Navbar />
      <HeroScroll />
      <StickyExplainer />
      <StatsOdometer />
      <BeforeAfter />
      <Hero />
      <Problem />
      <Solution />
      <WhyWalor />
      <Technology />
      <BusinessImpact />
      <Sustainability />
      <Trust />
      <Vision />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

/* ============================ HERO ============================ */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40 pb-20 md:pb-28">
      <div className="absolute inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-[var(--walor-green)]/10 blur-[120px] animate-pulse-glow" />

      <div className="walor-container relative">
        <Reveal className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-mono uppercase tracking-wider text-foreground/70">
            <span className="size-1.5 rounded-full bg-[var(--walor-green)] animate-pulse" />
            India's First Full-Pack EV Battery Revival Platform
          </span>
        </Reveal>

        <Reveal delay={0.1} as="h1" className="mt-8 text-center text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-5xl mx-auto">
          Revive Batteries.{" "}
          <span className="text-gradient-green">Restore Profits.</span>
          <br className="hidden md:block" /> Power Sustainable Mobility.
        </Reveal>

        <Reveal delay={0.2} as="p" className="mt-6 text-center text-base md:text-lg text-foreground/65 max-w-2xl mx-auto leading-relaxed">
          India's most advanced Full-Pack EV Battery Revival platform — helping commercial fleets cut costs, extend battery life, and maximize fleet ROI.
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="bg-[var(--walor-green)] text-white hover:bg-[var(--walor-green-dim)] font-medium h-12 px-6">
            <a href="#contact">
              Book Fleet Assessment <ArrowRight className="ml-1 size-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 px-6 border-foreground/20 bg-transparent text-foreground hover:bg-foreground/5 hover:text-foreground">
            <a href="#solutions">Schedule Consultation</a>
          </Button>
        </Reveal>

        {/* Battery visual */}
        <Reveal delay={0.4} className="mt-16 max-w-3xl mx-auto">
          <BatteryVisual />
        </Reveal>

        {/* Metrics strip */}
        <Stagger className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-px rounded-2xl overflow-hidden glass">
          {[
            { v: "40–50%", k: "Cost Savings", d: "vs. full battery replacement" },
            { v: "2×", k: "Battery Life", d: "extended service life" },
            { v: "60%", k: "Battery Waste", d: "diverted from landfill" },
          ].map((m) => (
            <StaggerItem key={m.k} className="bg-foreground/[0.025] p-6 md:p-8">
              <div className="font-mono text-3xl md:text-4xl text-gradient-green font-bold">{m.v}</div>
              <div className="mt-2 text-sm font-medium text-foreground">{m.k}</div>
              <div className="text-xs text-foreground/55 mt-0.5">{m.d}</div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function BatteryVisual() {
  return (
    <div className="relative aspect-[16/7] rounded-2xl glass overflow-hidden p-6 md:p-10">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative h-full flex items-center justify-center gap-2 md:gap-3">
        {Array.from({ length: 12 }).map((_, i) => {
          const stage = i < 4 ? "low" : i < 8 ? "mid" : "high";
          const colors = {
            low: "from-red-500/40 to-red-500/10 border-red-500/30",
            mid: "from-amber-400/40 to-amber-400/10 border-amber-400/30",
            high: "from-[var(--walor-green)]/60 to-[var(--walor-green)]/10 border-[var(--walor-green)]/50",
          }[stage];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
              className={`relative h-full flex-1 max-w-[44px] rounded-md bg-gradient-to-t border ${colors}`}
            >
              <div className="absolute inset-x-2 top-2 h-1 rounded-full bg-foreground/20" />
            </motion.div>
          );
        })}
      </div>
      <div className="absolute bottom-4 left-6 right-6 flex justify-between text-[10px] md:text-xs font-mono uppercase tracking-wider text-foreground/50">
        <span>Degraded</span>
        <span>Diagnosing</span>
        <span className="text-[var(--walor-green)]">Revived</span>
      </div>
    </div>
  );
}

/* ============================ PROBLEM ============================ */
function Problem() {
  const problems = [
    { icon: Clock, stat: "30–40%", label: "Range Drop", desc: "Degraded packs force shorter routes and more frequent charging stops." },
    { icon: TrendingDown, stat: "₹2.5L+", label: "Annual Revenue Loss", desc: "Per vehicle, due to downtime, reduced utilization, and emergency service calls." },
    { icon: AlertTriangle, stat: "3×", label: "Higher Downtime Risk", desc: "Aged batteries fail unexpectedly, stranding vehicles and violating SLAs." },
    { icon: Repeat, stat: "₹6–8L", label: "Replacement Cost", desc: "Full battery replacement per vehicle — often unbudgeted and margin-destroying." },
    { icon: Trash2, stat: "18kg+", label: "Battery Waste", desc: "Per pack discarded — a compounding ESG liability for fleet operators." },
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

/* ============================ SOLUTION ============================ */
function Solution() {
  const steps = [
    { n: "01", t: "Diagnostic Assessment", d: "Deep-scan of full battery pack using proprietary diagnostic protocols. Identifies degraded, mismatched, and failing cells." },
    { n: "02", t: "Cell-Level Analysis", d: "Voltage profiling, impedance testing, and capacity mapping at individual cell level." },
    { n: "03", t: "Full-Pack Revival", d: "Removal of degraded cells. Grade-matched replacement cells installed with precision." },
    { n: "04", t: "Thermal Validation", d: "Full thermal cycle testing to validate heat dissipation, BMS response, and pack stability under load." },
    { n: "05", t: "System Testing", d: "End-to-end discharge/charge cycle testing against original manufacturer specifications." },
    { n: "06", t: "Certification", d: "Independent no-new-error certification issued. Full service record documented for audit trail." },
    { n: "07", t: "Fleet Redeployment", d: "Vehicle returned to service with revived pack and ongoing lifecycle monitoring support." },
  ];

  return (
    <section className="walor-section relative bg-foreground/[0.03] border-y border-foreground/5">
      <div className="walor-container">
        <SectionHeader
          eyebrow="The Walor Process"
          title="Full-Pack EV Battery Revival"
          lead="We don't patch cells and send you on your way. We perform complete, certified, end-to-end battery pack restoration."
        />

        <div className="mt-16 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--walor-green)]/40 to-transparent" />

          <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" stagger={0.06}>
            {steps.map((s, i) => (
              <StaggerItem key={s.n}>
                <div className="glass glass-hover h-full rounded-xl p-5 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--walor-green)]">STEP {s.n}</span>
                    <span className="size-6 rounded-full grid place-items-center bg-[var(--walor-green)]/10 border border-[var(--walor-green)]/30 text-[10px] font-mono text-[var(--walor-green)]">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-foreground">{s.t}</h3>
                  <p className="mt-2 text-sm text-foreground/55 leading-relaxed">{s.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ============================ WHY WALOR ============================ */
function WhyWalor() {
  const props = [
    { icon: RefreshCw, t: "Restore, Don't Replace", d: "Full-pack revival at 40–50% of replacement cost. Maximum asset value extraction from existing batteries." },
    { icon: TrendingUp, t: "Lower Cost Per Kilometer", d: "Revived packs perform at near-original capacity. Reduce per-km energy cost and eliminate emergency replacement events." },
    { icon: Calendar, t: "Extended Asset Lifespan", d: "Extend usable battery life by 2× or more. Align battery lifespan with vehicle lifecycle for predictable fleet economics." },
    { icon: ShieldCheck, t: "Guaranteed Quality", d: "Every revived pack ships with a no-new-error certification and documented test results. No guesswork, no shortcuts." },
    { icon: Users, t: "Fleet Lifecycle Partnership", d: "We don't do one-time jobs. Walor integrates into your fleet maintenance program as a long-term battery lifecycle partner." },
    { icon: Leaf, t: "Measurable ESG Impact", d: "Every revival avoids a battery disposal event. Quantified waste diversion data available for ESG reporting." },
  ];
  return (
    <section className="walor-section">
      <div className="walor-container">
        <SectionHeader eyebrow="Why Walor" title="Why Fleet Operators Choose Walor" />
        <Stagger className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {props.map((p) => (
            <StaggerItem key={p.t}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <div className="inline-flex size-11 items-center justify-center rounded-lg bg-[var(--walor-green)]/10 border border-[var(--walor-green)]/30">
                  <p.icon className="size-5 text-[var(--walor-green)]" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{p.t}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{p.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ TECHNOLOGY ============================ */
function Technology() {
  const caps = [
    { id: "diagnostics", icon: Activity, label: "Battery Diagnostics", detail: "Full-pack health assessment using multi-point probe arrays and BMS data integration." },
    { id: "capacity", icon: Battery, label: "Capacity Mapping", detail: "Cell-by-cell capacity profiling to identify degradation patterns before they cascade." },
    { id: "voltage", icon: LineChart, label: "Voltage Profiling", detail: "High-resolution voltage curves plotted across full charge/discharge cycles." },
    { id: "cell-matching", icon: Cpu, label: "Cell Matching", detail: "Replacement cells matched within ±0.5% capacity variance to prevent new degradation cycles." },
    { id: "thermal", icon: Thermometer, label: "Thermal Analysis", detail: "Infrared and contact thermal mapping to identify hotspots and validate BMS response." },
    { id: "safety", icon: ShieldAlert, label: "Safety Validation", detail: "Short-circuit, overcharge, and over-discharge stress testing per IS/IEC 62133." },
    { id: "certification", icon: FileCheck, label: "Performance Certification", detail: "Signed test report with pre/post metrics for every pack. Audit-ready documentation." },
  ];
  const [active, setActive] = useState(caps[0].id);
  const current = caps.find((c) => c.id === active)!;

  return (
    <section id="technology" className="walor-section bg-foreground/[0.03] border-y border-foreground/5">
      <div className="walor-container">
        <SectionHeader
          eyebrow="Technology"
          title="Engineering-Driven Battery Revival"
          lead="Precision diagnostics and validated cell-matching — engineered for commercial reliability, not consumer compromise."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Capability list */}
          <Reveal>
            <div className="glass rounded-2xl p-3 h-full">
              <ul className="flex flex-col gap-1">
                {caps.map((c) => {
                  const isActive = c.id === active;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => setActive(c.id)}
                        className={`w-full text-left rounded-xl p-4 flex items-center gap-4 transition-all ${
                          isActive
                            ? "bg-[var(--walor-green)]/10 border border-[var(--walor-green)]/30"
                            : "border border-transparent hover:bg-foreground/5"
                        }`}
                      >
                        <span
                          className={`grid place-items-center size-10 rounded-lg ${
                            isActive ? "bg-[var(--walor-green)]/20 text-[var(--walor-green)]" : "bg-foreground/5 text-foreground/60"
                          }`}
                        >
                          <c.icon className="size-4" />
                        </span>
                        <span className={`text-sm font-medium ${isActive ? "text-foreground" : "text-foreground/70"}`}>{c.label}</span>
                        {isActive && <ArrowRight className="ml-auto size-4 text-[var(--walor-green)]" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          {/* Visualization panel */}
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6 md:p-8 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--walor-green)]">
                  // {current.id}
                </span>
                <span className="font-mono text-xs text-foreground/40">walor.diagnostic.v4</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold">{current.label}</h3>
              <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{current.detail}</p>

              <div className="mt-6 flex-1 min-h-[260px] rounded-xl bg-foreground/[0.04] border border-foreground/5 relative overflow-hidden">
                <CapabilityViz id={active} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CapabilityViz({ id }: { id: string }) {
  if (id === "voltage" || id === "diagnostics") {
    // Waveform
    const points = Array.from({ length: 40 }, (_, i) => {
      const x = (i / 39) * 100;
      const y = 50 + Math.sin(i * 0.5) * 20 + Math.cos(i * 0.2) * 8;
      return `${x},${y}`;
    }).join(" ");
    return (
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full p-6">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.76 0.17 165)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.76 0.17 165)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 40, 60, 80].map((y) => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="white" strokeOpacity="0.05" strokeWidth="0.2" />
        ))}
        <motion.polyline
          fill="none"
          stroke="oklch(0.76 0.17 165)"
          strokeWidth="0.6"
          points={points}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        <polygon points={`0,100 ${points} 100,100`} fill="url(#g1)" />
      </svg>
    );
  }
  if (id === "thermal") {
    return (
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-5 gap-1 p-4">
        {Array.from({ length: 40 }).map((_, i) => {
          const heat = Math.random();
          const color = heat > 0.7 ? "oklch(0.7 0.2 30)" : heat > 0.4 ? "oklch(0.78 0.15 80)" : "oklch(0.76 0.17 165)";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: i * 0.02 }}
              className="rounded"
              style={{ background: color }}
            />
          );
        })}
      </div>
    );
  }
  if (id === "cell-matching" || id === "capacity") {
    return (
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 gap-1 p-4">
        {Array.from({ length: 60 }).map((_, i) => {
          const match = Math.random() > 0.15;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`rounded ${match ? "bg-[var(--walor-green)]/40 border border-[var(--walor-green)]/60" : "bg-amber-500/30 border border-amber-500/50"}`}
            />
          );
        })}
      </div>
    );
  }
  if (id === "safety") {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <div className="size-32 rounded-full border border-[var(--walor-green)]/30 animate-pulse-glow" />
          <div className="absolute inset-4 rounded-full border border-[var(--walor-green)]/50" />
          <div className="absolute inset-8 rounded-full bg-[var(--walor-green)]/20 grid place-items-center">
            <ShieldCheck className="size-8 text-[var(--walor-green)]" />
          </div>
        </div>
      </div>
    );
  }
  // certification
  return (
    <div className="absolute inset-0 p-6 font-mono text-xs text-foreground/60 space-y-2">
      {[
        ["CAPACITY", "98.4%", "PASS"],
        ["VOLTAGE", "Δ 0.03V", "PASS"],
        ["IMPEDANCE", "12.1mΩ", "PASS"],
        ["THERMAL", "≤ 42°C", "PASS"],
        ["BMS SYNC", "OK", "PASS"],
        ["CERT ID", "WLR-2025-A4F2", ""],
      ].map((row, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex justify-between border-b border-foreground/5 pb-1"
        >
          <span className="text-foreground/40">{row[0]}</span>
          <span className="text-foreground">{row[1]}</span>
          {row[2] && (
            <span className="text-[var(--walor-green)] flex items-center gap-1">
              <CheckCircle2 className="size-3" /> {row[2]}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ============================ BUSINESS IMPACT ============================ */
function BusinessImpact() {
  const metrics = [
    { v: 50, suffix: "%", label: "CAPEX Savings", desc: "vs. full battery replacement" },
    { v: 2, suffix: "×", label: "Battery Life Extension", desc: "beyond original degradation point" },
    { v: 60, suffix: "%", label: "Battery Waste Reduction", desc: "material diverted from disposal" },
    { v: 98, suffix: "%", label: "Fleet Uptime Target", desc: "post-revival operational availability" },
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

        {/* Comparison bars */}
        <Reveal delay={0.2} className="mt-12">
          <div className="glass rounded-2xl p-6 md:p-10">
            <h3 className="text-lg font-semibold mb-6">Status Quo vs Walor — Per Vehicle</h3>
            <div className="space-y-5">
              <CompareBar label="Replacement (Status Quo)" value={100} color="bg-red-500/50" amount="₹7,00,000" />
              <CompareBar label="Walor Revival" value={45} color="bg-[var(--walor-green)]" amount="₹3,15,000" />
            </div>
            <p className="mt-6 text-xs text-foreground/40 font-mono uppercase tracking-wider">
              Indicative — actual savings depend on pack chemistry, age & fleet profile
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CompareBar({ label, value, color, amount }: { label: string; value: number; color: string; amount: string }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-foreground/80">{label}</span>
        <span className="font-mono text-foreground">{amount}</span>
      </div>
      <div className="h-3 rounded-full bg-foreground/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}

/* ============================ SUSTAINABILITY ============================ */
function Sustainability() {
  const items = [
    { icon: Recycle, t: "Circular Economy", d: "Walor operates as the circular layer in India's EV battery supply chain — keeping packs in service longer before any recycling or disposal event." },
    { icon: Globe, t: "Green Fleet Operations", d: "Partner fleets can report quantified battery waste diversion per vehicle per year — a credible, auditable ESG metric." },
    { icon: Award, t: "ESG-Ready Reporting", d: "We provide fleet operators with battery lifecycle documentation structured for BRSR, GRI, and investor ESG disclosure frameworks." },
  ];

  const nodes = ["Manufacturing", "Deployment", "Degradation", "Walor Revival", "Extended Life", "Sustainable Reuse"];

  return (
    <section id="sustainability" className="walor-section bg-foreground/[0.03] border-y border-foreground/5">
      <div className="walor-container">
        <SectionHeader
          eyebrow="Sustainability"
          title="Every Battery Revived Is One Less Battery in Landfill"
        />

        <Reveal className="mt-16">
          <div className="glass rounded-2xl p-6 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {nodes.map((n, i) => {
                const highlight = n === "Walor Revival";
                return (
                  <motion.div
                    key={n}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className={`relative rounded-xl p-4 text-center border ${
                      highlight
                        ? "bg-[var(--walor-green)]/15 border-[var(--walor-green)]/50 shadow-[0_0_40px_oklch(0.76_0.17_165/0.3)]"
                        : "bg-foreground/5 border-foreground/10"
                    }`}
                  >
                    {highlight && (
                      <div className="absolute inset-0 rounded-xl border-2 border-[var(--walor-green)]/40 animate-pulse-glow" />
                    )}
                    <div className="font-mono text-[10px] text-foreground/40">{String(i + 1).padStart(2, "0")}</div>
                    <div className={`mt-1 text-sm font-medium ${highlight ? "text-[var(--walor-green)]" : "text-foreground/80"}`}>
                      {n}
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-foreground/40 uppercase tracking-wider">
              <Recycle className="size-3.5" /> Closed-loop battery lifecycle
            </div>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid md:grid-cols-3 gap-5">
          {items.map((i) => (
            <StaggerItem key={i.t}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <div className="inline-flex size-10 items-center justify-center rounded-lg bg-[var(--walor-green)]/10 border border-[var(--walor-green)]/30">
                  <i.icon className="size-4 text-[var(--walor-green)]" />
                </div>
                <h3 className="mt-4 text-base font-semibold">{i.t}</h3>
                <p className="mt-2 text-sm text-foreground/60 leading-relaxed">{i.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ TRUST ============================ */
function Trust() {
  const categories = [
    "Commercial EV Fleets",
    "Last-Mile Delivery",
    "EV Logistics",
    "Corporate Mobility",
    "Public Transport",
    "Fleet Finance",
  ];
  return (
    <section className="walor-section">
      <div className="walor-container">
        <SectionHeader eyebrow="Ecosystem" title="Building with India's EV Ecosystem" />
        <Reveal className="mt-8 max-w-3xl mx-auto text-center text-lg text-foreground/65 leading-relaxed">
          Walor Energy is actively working with commercial fleet operators, mobility providers, and EV ecosystem stakeholders to build India's most reliable battery revival infrastructure.
        </Reveal>

        <Reveal delay={0.2} className="mt-14 overflow-hidden rounded-2xl glass py-6 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          <div className="flex gap-12 animate-marquee w-max">
            {[...categories, ...categories].map((c, i) => (
              <div key={i} className="flex items-center gap-3 text-foreground/60 font-mono uppercase tracking-wider text-sm whitespace-nowrap">
                <Zap className="size-4 text-[var(--walor-green)]" />
                {c}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ VISION ============================ */
function Vision() {
  const phases = [
    { p: "Phase 1", t: "Fleet Revival Operations", d: "Establish certified revival centers. Build operational capacity for commercial EV fleets across Tier 1 cities.", s: "current" },
    { p: "Phase 2", t: "Revival Infrastructure Network", d: "Decentralized revival network across major fleet hubs — Hyderabad, Bengaluru, Pune, Delhi NCR, Mumbai.", s: "upcoming" },
    { p: "Phase 3", t: "Battery Lifecycle Platform", d: "Digital platform for fleet operators to track battery health, schedule revivals, and access lifecycle analytics.", s: "vision" },
  ];

  return (
    <section className="walor-section bg-foreground/[0.03] border-y border-foreground/5">
      <div className="walor-container">
        <SectionHeader
          eyebrow="Vision"
          title="Building India's Battery Circular Economy Infrastructure"
          lead="Walor is not a service provider. We are the infrastructure layer for battery lifecycle management at national scale."
        />

        <Stagger className="mt-16 grid md:grid-cols-3 gap-5">
          {phases.map((ph) => {
            const isCurrent = ph.s === "current";
            return (
              <StaggerItem key={ph.p}>
                <div className={`relative h-full rounded-2xl p-6 md:p-8 border ${
                  isCurrent
                    ? "bg-[var(--walor-green)]/8 border-[var(--walor-green)]/40"
                    : "glass"
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-[var(--walor-green)]">{ph.p}</span>
                    <span className={`font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isCurrent ? "bg-[var(--walor-green)] text-white" : "bg-foreground/5 text-foreground/40"
                    }`}>
                      {ph.s}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{ph.t}</h3>
                  <p className="mt-3 text-sm text-foreground/60 leading-relaxed">{ph.d}</p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ============================ ABOUT ============================ */
function About() {
  return (
    <section id="about" className="walor-section">
      <div className="walor-container grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--walor-green)]">About Walor</span>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
            Built for Operators Who <span className="text-gradient-green">Can't Afford Downtime.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="space-y-5 text-foreground/65 leading-relaxed">
          <p>
            Walor Energy was founded by professionals who understand fleet economics from the inside — people who have seen batteries fail in the field and know what that costs a fleet operator in real money, real time, and real operational pressure.
          </p>
          <p>
            We built Walor because the alternatives weren't good enough. Cell-level patches that don't address root cause. Full replacements that destroy margins. Disposal that creates liability.
          </p>
          <p className="text-foreground">
            We built the full-pack revival process because that's what operators actually need.
          </p>
          <div className="pt-4 flex items-center gap-6 text-sm font-mono uppercase tracking-wider text-foreground/40">
            <span>Hyderabad, IN</span>
            <span className="size-1 rounded-full bg-foreground/20" />
            <span>Founded 2024</span>
            <span className="size-1 rounded-full bg-foreground/20" />
            <span>Pre-Series A</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================ CONTACT ============================ */
function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    if (!name || !email) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
    toast.success("Assessment request received. Our team will reach out within 1 business day.");
    form.reset();
  };

  return (
    <section id="contact" className="walor-section">
      <div className="walor-container">
        <div className="glass rounded-3xl overflow-hidden">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Left side */}
            <div className="lg:col-span-2 p-8 md:p-12 bg-gradient-to-br from-[var(--walor-green)]/10 to-transparent border-r border-foreground/5">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--walor-green)]">Get Started</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold leading-tight">
                Ready to Eliminate <span className="text-gradient-green">Battery Downtime?</span>
              </h2>
              <p className="mt-4 text-foreground/65 leading-relaxed">
                Book a free fleet assessment. No commitment. We'll evaluate your current battery health profile and show you the potential ROI of a revival program.
              </p>

              <div className="mt-10 space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Mail className="size-4 text-[var(--walor-green)] mt-0.5" />
                  <div>
                    <div className="text-foreground/40 font-mono uppercase text-xs tracking-wider">Email</div>
                    <a href="mailto:support@walorenergy.com" className="text-foreground hover:text-[var(--walor-green)] transition-colors">
                      support@walorenergy.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="size-4 text-[var(--walor-green)] mt-0.5" />
                  <div>
                    <div className="text-foreground/40 font-mono uppercase text-xs tracking-wider">Location</div>
                    <div className="text-foreground">Hyderabad, Telangana, India</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 p-8 md:p-12">
              {submitted ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="size-16 rounded-full bg-[var(--walor-green)]/15 grid place-items-center">
                    <CheckCircle2 className="size-8 text-[var(--walor-green)]" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold">Request Received</h3>
                  <p className="mt-2 text-foreground/60 max-w-sm">
                    Thanks — our fleet team will reach out within one business day to schedule your assessment.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-8 border-foreground/20 bg-transparent hover:bg-foreground/5"
                    onClick={() => setSubmitted(false)}
                  >
                    Submit Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name *">
                      <Input name="name" required placeholder="Your name" className="bg-foreground/5 border-foreground/10" />
                    </Field>
                    <Field label="Company *">
                      <Input name="company" required placeholder="Fleet operator" className="bg-foreground/5 border-foreground/10" />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Business Email *">
                      <Input name="email" type="email" required placeholder="you@company.com" className="bg-foreground/5 border-foreground/10" />
                    </Field>
                    <Field label="Phone">
                      <Input name="phone" type="tel" placeholder="+91" className="bg-foreground/5 border-foreground/10" />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Fleet Size">
                      <Select name="fleet_size">
                        <SelectTrigger className="bg-foreground/5 border-foreground/10">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1–10</SelectItem>
                          <SelectItem value="11-50">11–50</SelectItem>
                          <SelectItem value="51-200">51–200</SelectItem>
                          <SelectItem value="200+">200+</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                    <Field label="Vehicle Type">
                      <Select name="vehicle_type">
                        <SelectTrigger className="bg-foreground/5 border-foreground/10">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2W">2-Wheeler</SelectItem>
                          <SelectItem value="3W">3-Wheeler</SelectItem>
                          <SelectItem value="4W">4-Wheeler</SelectItem>
                          <SelectItem value="Bus">Bus</SelectItem>
                        </SelectContent>
                      </Select>
                    </Field>
                  </div>
                  <Field label="Additional Context">
                    <Textarea name="message" rows={3} placeholder="Tell us about your fleet & current battery challenges…" className="bg-foreground/5 border-foreground/10 resize-none" />
                  </Field>
                  <Button
                    type="submit"
                    disabled={submitting}
                    size="lg"
                    className="w-full bg-[var(--walor-green)] text-white hover:bg-[var(--walor-green-dim)] font-medium"
                  >
                    {submitting ? "Sending…" : "Book Fleet Assessment"}
                    {!submitting && <ArrowRight className="ml-1 size-4" />}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-xs font-mono uppercase tracking-wider text-foreground/50">{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/* ============================ FOOTER ============================ */
function Footer() {
  return (
    <footer className="border-t border-foreground/5 bg-[var(--walor-blue)]">
      <div className="walor-container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <span className="grid place-items-center size-8 rounded-md bg-[var(--walor-green)]/10 border border-[var(--walor-green)]/30">
                <Zap className="size-4 text-[var(--walor-green)]" strokeWidth={2.5} />
              </span>
              Walor<span className="text-[var(--walor-green)]">.</span>Energy
            </div>
            <p className="mt-4 text-sm text-foreground/55 max-w-sm leading-relaxed">
              India's Full-Pack EV Battery Revival platform. Built for commercial fleet operators.
            </p>
            <p className="mt-4 text-xs text-foreground/40 font-mono">Hyderabad, Telangana, India</p>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-foreground/40">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#solutions" className="text-foreground/70 hover:text-foreground">Solutions</a></li>
              <li><a href="#technology" className="text-foreground/70 hover:text-foreground">Technology</a></li>
              <li><a href="#impact" className="text-foreground/70 hover:text-foreground">Impact</a></li>
              <li><a href="#sustainability" className="text-foreground/70 hover:text-foreground">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-foreground/40">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:support@walorenergy.com" className="text-foreground/70 hover:text-foreground">support@walorenergy.com</a></li>
              <li><a href="#contact" className="text-foreground/70 hover:text-foreground">Book Assessment</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-foreground/5 flex flex-col md:flex-row justify-between gap-4 text-xs text-foreground/40">
          <span>© 2025 Walor Energy Private Limited. All rights reserved.</span>
          <span className="flex gap-6">
            <a href="#" className="hover:text-foreground/70">Privacy Policy</a>
            <a href="#" className="hover:text-foreground/70">Terms of Service</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ============================ SHARED ============================ */
function SectionHeader({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--walor-green)]">// {eyebrow}</span>
      </Reveal>
      <Reveal delay={0.05} as="h2" className="mt-4 text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
        {title}
      </Reveal>
      {lead && (
        <Reveal delay={0.1} as="p" className="mt-5 text-base md:text-lg text-foreground/60 leading-relaxed">
          {lead}
        </Reveal>
      )}
    </div>
  );
}
