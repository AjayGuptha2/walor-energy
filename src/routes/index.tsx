import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/walor-logo.png.asset.json";
import { useState } from "react";
import { motion } from "motion/react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Navbar } from "@/components/walor/Navbar";
import { Counter } from "@/components/walor/Counter";
import { Reveal, Stagger, StaggerItem } from "@/components/walor/Reveal";
import { PageLoad } from "@/components/walor/PageLoad";

import { HeroCells } from "@/components/walor/HeroCells";
import { StatsOdometer } from "@/components/walor/StatsOdometer";



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
      <Navbar />
      <HeroCells />

      <StatsOdometer />
      <Problem />
      <BusinessImpact />
      <Sustainability />
      <Trust />
      <Contact />
      <Footer />
    </div>
  );
}

/* Hero replaced by HeroCells animation above */

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

      </div>
    </section>
  );
}


/* ============================ SUSTAINABILITY ============================ */
function Sustainability() {
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
                        ? "bg-[var(--walor-green)]/15 border-[var(--walor-green)]/50 shadow-[0_0_40px_oklch(0.42_0.31_268/0.35)]"
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


/* ============================ CONTACT ============================ */
function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    if (!name || !phone) {
      toast.error("Please fill in name and phone number.");
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
                  <Field label="Name *">
                    <Input name="name" required placeholder="Your name" className="bg-foreground/5 border-foreground/10" />
                  </Field>
                  <Field label="Phone No *">
                    <Input name="phone" type="tel" required placeholder="+91" className="bg-foreground/5 border-foreground/10" />
                  </Field>
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
                  <Field label="Vehicle (Enter the vehicle name)">
                    <Input name="vehicle" placeholder="e.g. Tata Ace EV, Mahindra Treo" className="bg-foreground/5 border-foreground/10" />
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
    <footer className="bg-[#2323FF] text-white">
      <div className="walor-container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-white">
              <img src={logoAsset.url} alt="Walor Energy" className="h-8 md:h-10 w-auto" />
            </div>
            <p className="mt-4 text-sm text-white/80 max-w-sm leading-relaxed">
              India's Full-Pack EV Battery Revival platform. Built for commercial fleet operators.
            </p>
            <p className="mt-4 text-xs text-white/60 font-mono">Hyderabad, Telangana, India</p>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/60">Explore</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#solutions" className="text-white/85 hover:text-white">Solutions</a></li>
              <li><a href="#impact" className="text-white/85 hover:text-white">Impact</a></li>
              <li><a href="#sustainability" className="text-white/85 hover:text-white">Sustainability</a></li>
            </ul>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-white/60">Contact</div>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="mailto:support@walorenergy.com" className="text-white/85 hover:text-white">support@walorenergy.com</a></li>
              <li><a href="#contact" className="text-white/85 hover:text-white">Book Assessment</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/70">
          <span>© 2025 Walor Energy Private Limited. All rights reserved.</span>
          <span className="flex gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
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
