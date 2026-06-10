import { useEffect, useState } from "react";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Solutions", href: "#solutions" },
  { label: "Technology", href: "#technology" },
  { label: "Impact", href: "#impact" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "About", href: "#about" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[oklch(0.18_0.04_250/0.85)] backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="walor-container flex h-16 md:h-20 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 text-white font-semibold tracking-tight">
          <span className="grid place-items-center size-8 rounded-md bg-[var(--walor-green)]/10 border border-[var(--walor-green)]/30">
            <Zap className="size-4 text-[var(--walor-green)]" strokeWidth={2.5} />
          </span>
          <span className="text-lg">Walor<span className="text-[var(--walor-green)]">.</span>Energy</span>
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button asChild className="hidden md:inline-flex bg-[var(--walor-green)] text-[var(--walor-blue)] hover:bg-[var(--walor-green-dim)] font-medium">
            <a href="#contact">Book Fleet Assessment</a>
          </Button>
          <button
            aria-label="Toggle menu"
            className="lg:hidden grid place-items-center size-10 rounded-md text-white hover:bg-white/5"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="lg:hidden bg-[var(--walor-blue)]/95 backdrop-blur-xl border-t border-white/5">
          <ul className="walor-container py-6 flex flex-col gap-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-white/80 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Button asChild className="w-full bg-[var(--walor-green)] text-[var(--walor-blue)] hover:bg-[var(--walor-green-dim)]">
                <a href="#contact" onClick={() => setOpen(false)}>Book Fleet Assessment</a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
