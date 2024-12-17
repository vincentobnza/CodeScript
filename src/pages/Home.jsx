import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainPicture from "../assets/MainPicture.png";
import {
  Zap,
  ArrowUpRight,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Code,
  Users,
} from "lucide-react";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import FeedbackIcon from "@/components/ui/FeedbackIcon";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative w-full space-y-3 overflow-hidden bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 md:space-y-14"
    >
      <Hero />
      <Main />

      <FeedbackIcon />

      <Content />
    </motion.div>
  );
}

const Hero = () => {
  const [hovered, setHovered] = React.useState(null); // Track hover state
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-screen-lg gap-6 p-4 mx-auto text-center md:p-8 lg:p-8">
      <div className="flex flex-col items-center justify-center space-y-2">
        <>
          <div className="grid self-center px-3 shadow-2xl  py-[5px] mb-5 -mt-2 md:-mt-6 text-xs bg-transparent border rounded-full text-zinc-800 dark:text-zinc-300 border-zinc-300 dark:border-zinc-800 place-items-center">
            <div className="flex items-center gap-2 font-semibold">
              <p>
                Boost Your Skills with{" "}
                <span className="text-green-500 ">21+</span> In-Depth JavaScript
                Topics
              </p>
              <Zap size={13} className="text-green-600 dark:text-green-500" />
            </div>
          </div>
        </>
        <h1 className="text-4xl md:text-[52px] dark:bg-gradient-to-br dark:from-white dark:to-zinc-600 dark:bg-clip-text dark:text-transparent text-zinc-800 leading-snug  z-10 font-semibold">
          Learn, Build, and Excel in{" "}
          <span className="text-green-600 dark:text-transparent dark:bg-gradient-to-br dark:from-green-400 dark:to-green-900 bg-clip-text">
            JavaScript
          </span>{" "}
          Programming
        </h1>
      </div>
      <p className="text-xs text-zinc-800 dark:text-zinc-300 md:text-[15px] lg:text-md">
        Interactive lessons designed to sharpen your JavaScript Skills
      </p>
      <div className="relative flex items-center gap-2">
        <div className="hidden dark:flex absolute w-[240px] h-[100px] bg-green-600/40 rounded-full bottom-8 z-0 filter blur-[80px]" />
        <Link
          to="/learn"
          className="z-10 flex items-center justify-center gap-4 w-[170px] py-3 mt-10 text-[14px] tracking-wide dark:border bg-green-700 text-white dark:text-green-200 border border-green-700 dark:border-green-800 dark:bg-green-800/20 md:px-3  md:text-md dark:hover:brightness-125 font-medium rounded-sm"
          onMouseEnter={() => setHovered("learn")}
          onMouseLeave={() => setHovered(null)}
        >
          Learn JavaScript
          <div className="transition-transform duration-500 ease-in-out transform">
            {hovered === "learn" ? (
              <ArrowRight size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        </Link>
        <Link
          to="/code-lab"
          className="z-10 flex items-center justify-center gap-4 w-[170px] py-3 mt-10 text-[14px] tracking-wide text-zinc-700 bg-transparent dark:text-white border border-zinc-500  dark:border-zinc-700 dark:bg-zinc-800/20 md:px-3  md:text-md dark:hover:brightness-125 font-medium rounded-sm"
          onMouseEnter={() => setHovered("code-lab")}
          onMouseLeave={() => setHovered(null)}
        >
          Try Code Lab
          <div className="transition-transform duration-500 ease-in-out transform">
            {hovered === "code-lab" ? (
              <ArrowRight size={16} />
            ) : (
              <ChevronRight size={16} />
            )}
          </div>
        </Link>
      </div>
      <p className="mt-2 text-sm">From Zero to Hero</p>
      <InfiniteMarquee />
    </div>
  );
};

const Main = () => {
  return (
    <div className="grid w-full max-w-screen-lg gap-6 p-5 mx-auto md:grid-cols-2 md:p-0">
      <div className="flex flex-col w-full mt-4 md:mt-16">
        <div className="flex items-center self-start justify-center gap-2 px-3 py-1 mb-4 font-medium text-green-600 bg-transparent border border-green-500 rounded-full dark:border-green-700 dark:text-green-300 dark:bg-green-800/20 ">
          <Zap size={14} />
          <h1 className="text-xs">Test Your Skills</h1>
        </div>
        <h1 className="text-[2rem] font-semibold md:text-[2.8rem] md:leading-tight dark:bg-gradient-to-br dark:from-white dark:to-zinc-600 dark:bg-clip-text dark:text-transparent text-zinc-700">
          Enhance your Coding Skills
        </h1>
        <p className="mt-5 text-zinc-500">
          Test your skills with small coding exercises, specially crafted by
          developers to help you improve your JavaScript coding abilities.
        </p>
        <div className="relative flex self-start">
          <div className="hidden md:flex lg:flex absolute w-40 h-20 bg-green-600/40 rounded-full -bottom-12 z-0 filter blur-[80px]" />
          <Link
            to="/code-lab/loader=true"
            className="z-10 flex items-center self-start justify-center gap-2 px-8 py-3 mt-8 text-sm font-bold transition duration-500 ease-in-out bg-transparent border rounded-full shadow-none dark:shadow-2xl text-zinc-700 dark:text-zinc-300 dark:bg-zinc-900/20 border-zinc-500 dark:border-zinc-700 hover:bg-transparent hover:text-green-400 dark:hover:text-green-500 hover:border-green-300 dark:hover:border-green-600 "
          >
            Get Started
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="w-full p-8 mt-16 bg-gradient-to-br from-zinc-800 to-zinc-900">
        <img
          src={MainPicture}
          alt="main picture"
          className="w-full border border-zinc-800 opacity-60"
        />
      </div>
    </div>
  );
};

const Content = () => {
  const list = [
    {
      icon: BookOpen,
      title: "Curated Lessons",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: Code,
      title: "Practice Examples",
      color: "from-purple-500 to-pink-400",
    },
    {
      icon: Users,
      title: "Structured Learning",
      color: "from-green-500 to-emerald-400",
    },
    {
      icon: BookOpen,
      title: "Expert Guidance",
      color: "from-orange-500 to-amber-400",
    },
  ];
  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <div className="w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 mb-8 bg-zinc-50 dark:glass-card rounded-2xl md:p-12"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center px-4 py-2 bg-transparent border rounded-full dark:bg-amber-500/20 border-zinc-600 dark:border-amber-500/30">
                <span className="w-2 h-2 mr-2 bg-transparent rounded-full dark:bg-amber-400 animate-pulse"></span>
                <span className="text-sm font-medium text-zinc-500 dark:text-amber-200">
                  Learning Resources
                </span>
              </span>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl text-zinc-800 dark:gradient-text">
                Master JavaScript Programming
              </h1>

              <p className="text-lg leading-relaxed text-zinc-500 dark:text-gray-300">
                Master JavaScript through our comprehensive curriculum. Tackle
                real-world challenges and learn from diverse problem-solving
                approaches.
              </p>

              <motion.button
                onClick={() => (window.location.href = "/learn")}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl shadow-amber-500/30 hover:shadow-amber-500/40"
              >
                Explore Resources
              </motion.button>
            </div>

            <div className="grid flex-1 grid-cols-2 gap-4">
              {list.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 * index }}
                  className="p-6 transition-all duration-300 bg-white dark:glass-card rounded-xl hover:bg-white/20 float-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} p-2.5 mb-4`}
                  >
                    <item.icon className="w-full h-full text-zinc-700 dark:text-white" />
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {item.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
