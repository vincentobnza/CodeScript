import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollUp() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      onClick={scrollToTop}
      className={`fixed size-10 bg-zinc-200 dark:bg-zinc-800 border 
        border-zinc-300 dark:border-zinc-700 bottom-2 right-2 z-20 
        grid place-items-center cursor-pointer transition-opacity duration-300
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
    >
      <ChevronUp />
    </div>
  );
}
