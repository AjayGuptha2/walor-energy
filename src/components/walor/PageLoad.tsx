import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const KEY = "walor_pageload_done";

export function PageLoad() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(KEY)) return;
    setShow(true);
    const t = setTimeout(() => {
      sessionStorage.setItem(KEY, "1");
      setShow(false);
    }, 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="pageload"
          className="fixed inset-0 z-[200] pointer-events-none"
          initial={{ backgroundColor: "#050505" }}
          animate={{ backgroundColor: ["#050505", "#050505", "#0A1628"] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, times: [0, 0.85, 1] }}
        >
          <motion.div
            className="absolute top-0 bottom-0 w-[40vw] -translate-x-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, #E0F7FF 45%, #ffffff 50%, #E0F7FF 55%, transparent)",
              filter: "blur(2px)",
              boxShadow: "0 0 120px 40px rgba(0,191,255,0.65)",
            }}
            initial={{ x: "-50vw", opacity: 0 }}
            animate={{ x: "120vw", opacity: [0, 1, 1, 0] }}
            transition={{ delay: 0.3, duration: 1.0, ease: [0.65, 0, 0.35, 1], times: [0, 0.1, 0.9, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
