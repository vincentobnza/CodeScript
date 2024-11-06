import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainPicture from "../assets/MainPicture.png";
import { Zap, Blocks, FlaskConical, ArrowUpRight } from "lucide-react";
import InfiniteMarquee from "@/components/ui/InfiniteMarquee";
import FeedbackIcon from "@/components/ui/FeedbackIcon";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="relative w-full pb-10 space-y-3 overflow-hidden bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400 md:space-y-14"
    >
      <Hero />
      <Main />

      <FeedbackIcon />

      <Content />
    </motion.div>
  );
}

const Hero = () => {
  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-screen-lg gap-6 p-4 mx-auto text-center md:p-8 lg:p-8">
      <div className="flex flex-col items-center justify-center space-y-2">
        <>
          <div className="grid self-center px-6 py-[5px] mb-5 -mt-2 md:-mt-6 text-[9px] md:text-[11px] bg-transparent border rounded-full text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 place-items-center">
            <div className="flex items-center gap-2">
              <p>
                Boost Your Skills with{" "}
                <span className="font-black text-green-500">21+</span> In-Depth
                JavaScript Topics
              </p>
              <Zap size={13} className="text-green-500" />
            </div>
          </div>
        </>
        <h1 className="text-4xl md:text-[48px] dark:bg-gradient-to-br dark:from-white dark:to-zinc-600 dark:bg-clip-text dark:text-transparent text-zinc-600 leading-snug font-semibold z-10">
          Learn, Build, and Excel in{" "}
          <span className="text-green-600 dark:text-transparent dark:bg-gradient-to-br dark:from-green-400 dark:to-green-950 bg-clip-text">
            JavaScript
          </span>{" "}
          Programming
        </h1>
      </div>
      <p className="text-xs md:text-[15px] lg:text-md">
        Interactive lessons designed to sharpen your JavaScript Skills
      </p>
      <div className="relative flex items-center gap-2">
        <div className="absolute w-[240px] h-[100px] bg-green-600/40 rounded-full bottom-8 z-0 filter blur-[80px]" />
        <Link
          to="/learn"
          className="z-10 flex items-center justify-center gap-2 w-[120px] py-2 mt-10 text-xs tracking-wide text-green-700 bg-transparent dark:text-green-200 border border-green-400  dark:border-green-600 dark:bg-gradient-to-br dark:from-green-600/30 dark:to-green-600/40 md:px-4 md:py-[0.60rem] md:text-md dark:hover:brightness-125"
        >
          Learn JS
          <Blocks size={16} />
        </Link>
        <Link
          to="/code-lab"
          className="z-10 flex items-center justify-center gap-2 w-[120px] py-2 mt-10 text-xs tracking-wide text-zinc-700 bg-transparent dark:text-white border border-zinc-400  dark:border-zinc-600 dark:bg-gradient-to-br dark:from-zinc-700/30 dark:to-zinc-600/40 md:px-4 md:py-[0.60rem] md:text-md dark:hover:brightness-125 "
        >
          Code Lab
          <FlaskConical size={16} />
        </Link>
      </div>
      <p className="mt-2 text-xs">From Zero to Hero</p>
      <InfiniteMarquee />
    </div>
  );
};

const Main = () => {
  return (
    <div className="grid w-full max-w-screen-lg gap-6 p-5 mx-auto md:grid-cols-2 md:p-0">
      <div className="flex flex-col w-full mt-4 md:mt-16">
        <div className="flex items-center self-start justify-center gap-2 px-3 py-1 mb-4 font-medium text-green-600 bg-transparent border border-green-200 rounded-full dark:border-green-700 dark:text-green-300 dark:bg-green-800/20 animate-pulse">
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
            className="z-10 flex items-center self-start justify-center gap-2 px-8 py-3 mt-8 text-sm font-bold transition duration-500 ease-in-out bg-transparent border rounded-full shadow-none dark:shadow-2xl text-zinc-700 dark:text-zinc-300 dark:bg-zinc-900/20 border-zinc-300 dark:border-zinc-700 hover:bg-transparent hover:text-green-400 dark:hover:text-green-500 hover:border-green-300 dark:hover:border-green-600 "
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
  return (
    <div className="w-full max-w-screen-lg mx-auto p-8 h-[300px] rounded-lg bg-white dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-900 flex flex-col justify-center items-center text-center border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full max-w-xl">
        <h1 className="text-2xl font-semibold leading-snug md:text-4xl dark:bg-gradient-to-br dark:from-zinc-200 dark:to-zinc-400 dark:bg-clip-text dark:text-transparent text-zinc-700">
          Why Choose Our JavaScript Lessons?
        </h1>
        <p className="mt-8 text-zinc-500">
          Tackle various challenges and then explore how others approached the
          same problems.{" "}
        </p>
        {/* 
        <Link className="px-4 py-2 mt-8 font-bold text-black bg-white rounded">
          Explore
        </Link> */}
      </div>
    </div>
  );
};
