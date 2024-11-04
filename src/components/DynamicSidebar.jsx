import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Library, Map } from "lucide-react";
import { routes } from "@/data/NavigationRoutes";
import { motion } from "framer-motion";

const DynamicSidebar = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const currentRoute = routes.find((route) => route.path === location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let currentActiveSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (
          window.scrollY >= sectionTop - 50 &&
          window.scrollY < sectionTop + sectionHeight - 50
        ) {
          currentActiveSection = section.id;
        }
      });

      setActiveSection(currentActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveSection("");
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView();
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="hidden md:flex bg-white dark:bg-zinc-900 p-4 w-64 h-screen overflow-y-auto fixed left-0 top-0 border-r border-zinc-2 dark:border-zinc-800 z-10"
    >
      <div className="p-5 mt-[5.6rem] space-y-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            Navigation
          </p>
          <h1 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">
            On this topic
          </h1>
        </div>
        <div className="space-y-2 text-zinc-600 dark:text-zinc-400">
          {currentRoute && (
            <div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-zinc-700 dark:text-green-500">
                  {currentRoute.lesson}
                </p>
                <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  {currentRoute.title}
                </h2>
              </div>
              <ul className="mt-8 mb-5 ">
                {currentRoute.sections.map((section) => (
                  <li key={section.id} className="mb-3">
                    <a
                      href={`#${section.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(section.id);
                      }}
                      className={`cursor-pointer text-sm ${
                        activeSection === section.id
                          ? "text-green-500 underline"
                          : "text-zinc-500 dark:text-zinc-400"
                      }`}
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default DynamicSidebar;
