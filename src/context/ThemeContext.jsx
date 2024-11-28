import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  // Function to get system theme preference
  const getSystemTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Function to determine if dark mode should be active
  const shouldUseDarkMode = () => {
    if (theme === "system") {
      return getSystemTheme() === "dark";
    }
    return theme === "dark";
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const isDark = shouldUseDarkMode();
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = () => {
        const isDark = shouldUseDarkMode();
        document.documentElement.classList.toggle("dark", isDark);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDarkMode: shouldUseDarkMode(),
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
