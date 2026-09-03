import { useEffect, useState } from "react";
import { HeroCellsDesktop } from "./HeroCellsDesktop";
import { HeroCellsMobile } from "./HeroCellsMobile";

export function HeroCells() {
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
    };

    // Check on initial load
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isDesktop ? <HeroCellsDesktop /> : <HeroCellsMobile />;
}
