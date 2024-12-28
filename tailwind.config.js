/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        border: "border 4s linear infinite",
        "pulse-slow": "pulse 4s linear infinite",
        rotate: "rotate 10s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
      },
      fontFamily: {
        Odibee: ["Odibee Sans", "sans-serif"],
        NotoSans: ["Noto Sans", "sans-serif"],
        Orbitron: ["Orbitron", "sans-serif"],
        DancingScript: ["Dancing Script", "cursive"],
        Ubuntu: ["Ubuntu", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        SpaceGrotesk: ["Space Grotesk", "sans-serif"],
        Lato: ["Lato", "sans-serif"],
        Jost: ["Jost", "sans-serif"],
        PlayFair: ["Playfair Display", "serif"],
        Roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [nextui()],
};
