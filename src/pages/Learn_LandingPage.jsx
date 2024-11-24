import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { IoLogoJavascript } from "react-icons/io5";
export default function Learn_LandingPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full pb-10 space-y-10 overflow-hidden bg-white dark:bg-zinc-900"
    >
      <Hero />
    </motion.div>
  );
}

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-6 text-center mx-lgauto max-w-screen- md:p-8 lg:p-8">
      <h1 className="text-4xl md:text-[48px] dark:bg-gradient-to-br dark:from-white dark:to-zinc-400 dark:bg-clip-text dark:text-transparent text-zinc-700 leading-snug font-semibold ">
        Start Building With JavaScript
      </h1>

      <p className="text-xs md:text-[16px] mt-3 text-zinc-700 dark:text-zinc-400 leading-snug">
        Learn JavaScript step by step with our interactive lessons, <br />
        practical examples, and expert guidance.
      </p>

      <div className="mt-16 w-full h-[500px] md:h-[550px] flex flex-col items-center space-y-10 max-w-screen-md rounded-lg bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 relative">
        {/* BOOK  */}
        <div className="w-[160px] h-[190px] -mt-10 bg-zinc-100 dark:bg-white rounded relative before:absolute before:content-[''] before:left-0 before:h-full before:w-[10px] before:bg-zinc-600 before:rounded-tl before:rounded-bl shadow-none dark:shadow-2xl dark:shadow-zinc-800 border border-zinc-300 dark:border-none">
          <img
            src="https://cdn-icons-png.flaticon.com/128/11166/11166597.png"
            alt="award"
            className="absolute top-0 right-0 size-9"
          />

          <IoLogoJavascript
            className="absolute right-2 bottom-2 text-zinc-700"
            size={30}
          />
          <div className="flex flex-col gap-4 px-8 py-5 text-left">
            <h1 className="font-bold text-md text-zinc-900">
              Learn <br />
              JavaScript
            </h1>
            <p className="text-[10px] text-zinc-800 font-medium">
              Getting Started With JavaScript
            </p>
          </div>
        </div>

        <div className="relative flex flex-col gap-2">
          <div className="absolute w-[240px] h-[100px] bg-slate-400/60 rounded-full bottom-8 z-0 filter blur-[80px]" />

          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Learn JavaScript
          </h1>
          <div className="mt-5 w-[340px] mx-auto text-xs text-center text-zinc-500 dark:text-zinc-400">
            <p>
              The module in this Computer Assisted Instruction for JavaScript
              has been thoughtfully curated and endorsed by a certified web
              development instructor.
            </p>
          </div>

          <Link
            to="/learn-js"
            className="flex items-center self-center gap-4 px-4 py-2 mt-10 text-xs font-bold bg-transparent border dark:border-none text-zinc-700 md:text-sm md:py-3 md:px-6 dark:text-black border-zinc-400 dark:bg-white dark:hover:brightness-125 "
          >
            Learn Now
            <MoveRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};
