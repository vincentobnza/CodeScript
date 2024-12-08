import React from "react";
import { Link } from "react-router-dom";
import CodePlayGroundImg from "../assets/CodePlayGroundImg.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageLoading from "@/components/PageLoading";
import { Zap, ArrowRight, ChevronRight } from "lucide-react";

export default function CodeEditor_LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full pb-10 space-y-10 bg-white dark:bg-zinc-900"
    >
      <Hero />
      <Image />
    </motion.div>
  );
}

const Hero = () => {
  const [hovered, setHovered] = React.useState(null);
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-screen-md gap-4 p-4 mx-auto text-center md:p-8 lg:p-8">
      <div className="hidden md:flex lg:flex absolute w-96 h-96 bg-gradient-to-br from-pink-600/10 via-violet-500/60 to-purple-400/10 rounded-full  z-0 filter blur-[90px]" />
      <div className="z-10 flex items-center self-start justify-center gap-2 px-3 py-[6px] mx-auto font-medium text-green-700 dark:text-green-300 border border-green-300 dark:border-green-600 rounded-lg bg-green-100 dark:bg-green-800/20">
        <Zap size={14} />
        <h1 className="text-xs">Test, Debug, and Improve</h1>
      </div>
      <h1 className="z-10 text-4xl md:text-[48px] dark:text-zinc-200 text-zinc-700 leading-snug font-semibold ">
        Welcome to Code Lab
      </h1>

      <h1 className="text-md z-10 text-zinc-700 dark:text-white ">
        Hands-on coding challenges await
      </h1>

      <div className="flex items-center gap-2 mt-5">
        <Link
          to="/learn-js"
          className="z-10 flex items-center justify-center gap-4 w-[175px] py-3 mt-10 text-[14px] tracking-wide text-zinc-700 bg-transparent dark:text-white border border-zinc-500  dark:border-white/30 dark:bg-zinc-800/20 md:px-3  md:text-md dark:hover:opacity-80 duration-500 font-bold rounded-sm"
          onMouseEnter={() => setHovered("code-lab")}
          onMouseLeave={() => setHovered(null)}
        >
          Learn JavaScript
          <div className="transition-transform duration-500 ease-in-out transform">
            {hovered === "code-lab" ? (
              <ArrowRight size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        </Link>
        <Link
          to="/code-lab/loader=true"
          className="z-10 flex items-center justify-center gap-4 w-[175px] py-3 mt-10 text-[14px] tracking-wide border border-zinc-500 bg-white text-black md:px-3  md:text-md dark:hover:opacity-80 duration-500 font-bold rounded-sm"
          onMouseEnter={() => setHovered("learn")}
          onMouseLeave={() => setHovered(null)}
        >
          Challenge Now
          <div className="transition-transform duration-500 ease-in-out transform">
            {hovered === "learn" ? (
              <ArrowRight size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

const Image = () => {
  return (
    <div className="w-full max-w-screen-lg mx-auto md:h-[580px] bg-zinc-100 dark:bg-[#252525] border border-zinxc-200 dark:border-zinc-700 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between w-full h-10 p-4 border-b border-zinc-700">
        <div className="w-[80px] grid grid-cols-3 gap-1">
          <div className="bg-red-500 rounded-full size-4"></div>
          <div className="bg-yellow-500 rounded-full size-4"></div>
          <div className="bg-green-500 rounded-full size-4"></div>
        </div>
      </div>
      <div className="w-full">
        <img
          alt="background_image"
          src={CodePlayGroundImg}
          className="object-cover" // Added border for visibility
        />
      </div>
    </div>
  );
};
