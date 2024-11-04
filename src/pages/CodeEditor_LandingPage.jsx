import React from "react";
import { Link } from "react-router-dom";
import CodePlayGroundImg from "../assets/CodePlayGroundImg.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import PageLoading from "@/components/PageLoading";
import { Zap } from "lucide-react";

export default function CodeEditor_LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full pb-10 space-y-10 bg-white dark:bg-zinc-900"
    >
      <Hero />
      <Video />
    </motion.div>
  );
}

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-screen-md gap-4 p-4 mx-auto text-center md:p-8 lg:p-8">
      <div className="flex items-center self-start justify-center gap-2 px-3 py-[6px] mx-auto font-medium text-green-700 dark:text-green-300 border border-green-500 rounded-lg bg-transparent dark:bg-gradient-to-br dark:from-green-900/20 dark:bg-green-800/60 animate-pulse-slow">
        <Zap size={14} />
        <h1 className="text-xs">Test, Debug, and Improve</h1>
      </div>
      <h1 className="text-4xl md:text-[48px] dark:text-zinc-200 text-zinc-700 leading-snug font-semibold ">
        Welcome to Code Lab
      </h1>

      <h1 className="text-xs">Hands-on coding challenges await</h1>

      <p className="w-full max-w-lg mx-auto mt-2 text-zinc-700 dark:text-zinc-400">
        Experience a user-friendly and rapid JavaScript compiler. Begin
        assessments and earn points by completing it.
      </p>

      <div className="flex items-center gap-2 mt-10">
        <Link
          to="/code-lab/loader=true"
          className="grid w-[120px] py-2 text-xs text-green-700 dark:text-green-200 border border-green-500 place-items-center bg-transparent dark:bg-gradient-to-br dark:from-green-700/20 dark:to-green-800/60 hover:opacity-90"
        >
          Begin Now
        </Link>
        <Link
          to="/learn"
          className="grid w-[120px] py-2 text-xs border place-items-center bg-zinc-50 dark:bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-400 dark:border-zinc-600 hover:opacity-90"
        >
          Learn JavaScript
        </Link>
      </div>
    </div>
  );
};

const Video = () => {
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
