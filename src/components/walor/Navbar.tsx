import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import logo from "@/assets/walor-logo.png";

const NAV_LINKS = [
  { label: "Impact", href: "#impact" },
  { label: "Sustainability", href: "#sustainability" },
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
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-out")}>
      <nav
        className={cn(
          "walor-container flex h-16 items-center justify-between transition-all duration-500 ease-out md:h-20",
          scrolled &&
            "mt-3 rounded-2xl border border-white/70 bg-[rgba(255,255,255,0.75)] shadow-[0_12px_40px_rgba(52,90,255,0.08)] backdrop-blur-[18px] md:mt-4",
        )}
      >
        <a
          href="#top"
          className="flex items-center gap-2 text-foreground font-semibold tracking-tight"
        >
          <img
            src={logo}
            alt="Walor Energy"
            className="h-[24px] w-auto scale-125 transform-gpu md:h-[32px]"
          />
        </a>

        <ul className="hidden lg:flex items-center gap-10">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative inline-block text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/45 transition-all duration-300 after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-[#2323FF] after:transition-transform after:duration-300 hover:translate-x-[2px] hover:text-[#2323FF] hover:after:scale-x-100"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Button
            asChild
            size="sm"
            className="group hidden border-0 bg-gradient-to-r from-[#2323FF] via-[#3535FF] to-[#1717D4] bg-[length:200%_100%] px-4 text-[10px] font-semibold uppercase tracking-wider text-white shadow-[0_10px_22px_-10px_rgba(35,35,255,0.9)] transition-all duration-300 hover:from-[#3535FF] hover:via-[#2323FF] hover:to-[#1515C6] hover:bg-[position:100%_0] hover:shadow-[0_14px_28px_-9px_rgba(35,35,255,0.95)] lg:inline-flex"
          >
            <a href="#contact" className="flex items-center gap-2">
              Book Vehicle Assessment
              <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
          <button
            aria-label="Toggle menu"
            className="lg:hidden grid place-items-center size-10 rounded-md text-foreground hover:bg-foreground/5"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mx-4 mt-2 rounded-2xl border border-white/70 bg-[rgba(255,255,255,0.75)] shadow-[0_12px_40px_rgba(52,90,255,0.08)] backdrop-blur-[18px] lg:hidden">
          <ul className="walor-container flex flex-col gap-4 py-6">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-foreground/80 transition-colors hover:text-[#2323FF]"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Button
                asChild
                className="group w-full border-0 bg-gradient-to-r from-[#2323FF] via-[#3535FF] to-[#1717D4] bg-[length:200%_100%] text-white shadow-[0_10px_22px_-10px_rgba(35,35,255,0.9)] transition-all duration-300 hover:from-[#3535FF] hover:via-[#2323FF] hover:to-[#1515C6] hover:bg-[position:100%_0] hover:shadow-[0_14px_28px_-9px_rgba(35,35,255,0.95)]"
              >
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2"
                >
                  Book Vehicle Assessment{" "}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
