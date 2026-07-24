import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle2, FileText, Search, Wrench, Zap, Shield, Mail, MapPin } from "lucide-react";
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

gsap.registerPlugin(ScrollTrigger);

const WORKFLOW_STEPS = [
  { id: 1, title: "Book Assessment", icon: FileText },
  { id: 2, title: "Battery Diagnostics", icon: Search },
  { id: 3, title: "Revival Planning", icon: Wrench },
  { id: 4, title: "Vehicle Deployment", icon: Zap },
];

export function ContactCTA() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // Container fades upward
      tl.fromTo(
        ".premium-container",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        0
      );

      // Heading and text appears
      tl.fromTo(
        ".header-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1 },
        0.4
      );

      // Workflow line draws
      tl.fromTo(
        ".workflow-line",
        { scaleY: 0 },
        { scaleY: 1, duration: 1, ease: "power2.inOut", transformOrigin: "top" },
        0.6
      );

      // Workflow steps appear sequentially
      tl.fromTo(
        ".workflow-step",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out" },
        0.8
      );

      // Assessment card fades in
      tl.fromTo(
        ".assessment-card",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        1.0
      );

      // Form fields fade in
      tl.fromTo(
        ".form-field-anim",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        1.2
      );

      // CTA button appears
      tl.fromTo(
        ".cta-btn-anim",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        1.5
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="py-24 relative bg-white" ref={containerRef}>
      <div className="walor-container max-w-[1400px] mx-auto px-6">

        {/* The Premium Industrial Workspace Container */}
        <div className="premium-container relative w-full rounded-[32px] overflow-hidden bg-gradient-to-br from-[#FAFAFB] to-[#F2F3F7] border border-black/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.03)] opacity-0">

          {/* Faint Engineering Grid Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(#0A0A0A 1px, transparent 1px), linear-gradient(90deg, #0A0A0A 1px, transparent 1px)`,
                backgroundSize: `32px 32px`
              }}
            />
          </div>

          {/* Soft Radial Blue Glow (Left side only) */}
          <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-[#2323FF]/[0.025] blur-[120px] rounded-full pointer-events-none" />

          {/* Split Layout */}
          <div className="grid lg:grid-cols-12 relative z-10 min-h-[760px]">

            {/* -------------------------------------------------- */}
            {/* LEFT PANEL (Workflow) - 45% (approx 5 cols) */}
            {/* -------------------------------------------------- */}
            <div className="lg:col-span-5 p-12 md:p-16 lg:p-20 flex flex-col relative border-b lg:border-b-0 border-black/5">

              <div className="header-content opacity-0">
                <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2323FF] mb-6">
                  // Revival Workflow
                </div>
                <h2 className="text-3xl md:text-5xl font-semibold leading-[1.15] text-[#0A0A0A] tracking-tight mb-5">
                  Ready to Eliminate <br />
                  <span className="text-[#2323FF]">Battery Downtime?</span>
                </h2>
                <p className="text-[16px] leading-relaxed text-[#555555] max-w-[400px]">
                  Share your fleet details and our engineers will guide you through every step of the battery revival process.
                </p>
              </div>

              {/* Workflow Vertical Timeline */}
              <div className="mt-16 mb-16 relative flex-1">
                {/* Timeline Connector Line */}
                <div className="absolute left-[11px] top-4 bottom-8 w-[1px] bg-black/10 workflow-line origin-top" />

                <div className="space-y-10 relative">
                  {WORKFLOW_STEPS.map((step) => (
                    <div key={step.id} className="workflow-step flex items-start gap-6 relative opacity-0">
                      {/* Outlined Engineering Node with Icon */}
                      <div className="relative z-10 w-6 h-6 shrink-0 mt-0.5 rounded bg-[#F7F8FA] border border-black/15 shadow-[0_0_0_4px_#FAFAFB] flex items-center justify-center">
                        <step.icon className="size-3 text-[#0A0A0A]/60 stroke-[1.5]" />
                      </div>

                      {/* Step Content */}
                      <div className="mt-0 pt-0.5">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-[#2323FF]/80 font-semibold mb-1">
                          Phase 0{step.id}
                        </div>
                        <div className="text-[16px] font-medium text-[#0A0A0A] tracking-tight">
                          {step.title}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Details at bottom */}
              <div className="mt-auto pt-8 border-t border-black/5 flex flex-col sm:flex-row gap-6 text-[13px] text-[#555555] header-content opacity-0">
                <div className="flex items-center gap-2">
                  <Mail className="size-4 text-[#2323FF]/80 stroke-[1.5]" />
                  <span>support@walorenergy.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-[#2323FF]/80 stroke-[1.5]" />
                  <span>Hyderabad, Telangana, India</span>
                </div>
              </div>

            </div>

            {/* -------------------------------------------------- */}
            {/* PREMIUM VERTICAL DIVIDER */}
            {/* -------------------------------------------------- */}
            <div className="hidden lg:block absolute left-[41.666%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-black/10 to-transparent">
              {/* Engineering Notch */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-8 rounded-full bg-black/10 shadow-[0_0_0_4px_#F6F7F9]" />
            </div>

            {/* -------------------------------------------------- */}
            {/* RIGHT PANEL (Form) - 55% (approx 7 cols) */}
            {/* -------------------------------------------------- */}
            <div className="lg:col-span-7 p-6 sm:p-12 md:p-16 lg:p-20 flex flex-col justify-center items-center">

              {/* Elevated Assessment Console Card */}
              <div className="assessment-card opacity-0 w-full max-w-[560px] bg-white rounded-[28px] border border-black/5 shadow-[0_12px_40px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,0.8)] p-8 md:p-12 relative overflow-hidden">

                {submitted ? (
                  <div className="min-h-[400px] flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
                    <div className="size-16 rounded-2xl bg-[#2323FF]/5 border border-[#2323FF]/10 grid place-items-center mb-6">
                      <CheckCircle2 className="size-8 text-[#2323FF]" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-semibold text-[#0A0A0A] tracking-tight">Request Received</h3>
                    <p className="mt-3 text-[#555555] max-w-sm leading-relaxed text-[15px]">
                      Thanks — our fleet engineering team will reach out within one business day to initiate your assessment.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-8 rounded-xl border-black/10 bg-white hover:bg-black/5 transition-all shadow-sm h-12 px-8 font-medium text-[15px]"
                      onClick={() => setSubmitted(false)}
                    >
                      Submit Another
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <h3 className="text-[26px] font-semibold text-[#0A0A0A] tracking-tight mb-2">
                        Vehicle Assessment
                      </h3>
                      <p className="text-[15px] text-[#555555] leading-relaxed pr-4">
                        Tell us about your vehicle and we'll prepare a personalized battery revival assessment.
                      </p>
                    </div>

                    <hr className="mb-8 border-black/5" />

                    <form onSubmit={onSubmit} className="space-y-6">
                      <div className="form-field-anim opacity-0">
                        <Field label="Full Name" required>
                          <Input
                            name="name"
                            required
                            placeholder="Enter your name"
                            className="h-[56px] rounded-[14px] bg-white border-black/10 shadow-sm focus-visible:border-[#2323FF]/50 focus-visible:ring-4 focus-visible:ring-[#2323FF]/10 transition-all duration-300 text-[16px] px-4"
                          />
                        </Field>
                      </div>

                      <div className="form-field-anim opacity-0">
                        <Field label="Phone Number" required>
                          <Input
                            name="phone"
                            type="tel"
                            required
                            pattern="[\+]?[0-9\s\-]+"
                            title="Please enter a valid phone number"
                            onInput={(e) => {
                              e.currentTarget.value = e.currentTarget.value.replace(/[^\+0-9\s\-]/g, '');
                            }}
                            placeholder="+91"
                            className="h-[56px] rounded-[14px] bg-white border-black/10 shadow-sm focus-visible:border-[#2323FF]/50 focus-visible:ring-4 focus-visible:ring-[#2323FF]/10 transition-all duration-300 text-[16px] px-4"
                          />
                        </Field>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 form-field-anim opacity-0">
                        <Field label="No of Vehicles">
                          <Select name="fleet_size">
                            <SelectTrigger
                              className="h-[56px] rounded-[14px] bg-white border-black/10 shadow-sm focus:border-[#2323FF]/50 focus:ring-4 focus:ring-[#2323FF]/10 transition-all duration-300 text-[16px] px-4"
                            >
                              <SelectValue placeholder="Select range" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl border-black/10 shadow-lg">
                              <SelectItem value="1">1 Vehicle</SelectItem>
                              <SelectItem value="2-10">2–10 Vehicles</SelectItem>
                              <SelectItem value="11-50">11–50 Vehicles</SelectItem>
                              <SelectItem value="51-200">51–200 Vehicles</SelectItem>
                              <SelectItem value="200+">200+ Vehicles</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>

                        <Field label="Vehicle Model">
                          <Input
                            name="vehicle"
                            placeholder="e.g. Tata Ace EV"
                            className="h-[56px] rounded-[14px] bg-white border-black/10 shadow-sm focus-visible:border-[#2323FF]/50 focus-visible:ring-4 focus-visible:ring-[#2323FF]/10 transition-all duration-300 text-[16px] px-4"
                          />
                        </Field>
                      </div>

                      <div className="cta-btn-anim opacity-0 pt-6">
                        <Button
                          type="submit"
                          disabled={submitting}
                          className="group w-full h-[60px] rounded-2xl bg-gradient-to-r from-[#2323FF] to-[#1A1ACC] text-white font-medium text-[16px] transition-all duration-300 shadow-[0_8px_20px_rgba(35,35,255,0.2)] hover:shadow-[0_12px_28px_rgba(35,35,255,0.3)] hover:from-[#2a2aff] hover:to-[#2323FF] border border-transparent"
                        >
                          {submitting ? "Initiating Request…" : "Book Vehicle Assessment"}
                          {!submitting && <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-2" />}
                        </Button>

                        <div className="mt-5 flex items-start gap-3 justify-center">
                          <Shield className="size-4 text-green-600 shrink-0 mt-0.5 stroke-[1.5]" />
                          <p className="text-[13px] text-[#555555] leading-relaxed max-w-[280px]">
                            Your information is secure and confidential. We typically respond within one business day.
                          </p>
                        </div>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-[13px] font-medium text-[#555555] ml-1 mb-2 block">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {children}
    </div>
  );
}
