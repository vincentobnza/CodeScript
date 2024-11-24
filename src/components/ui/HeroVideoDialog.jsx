"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Play, BadgeInfo } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FiYoutube } from "react-icons/fi";

export default function HeroVideoDialog({ thumbnailSrc, videoSrc, link }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-6 space-y-6">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <FiYoutube size={12} />
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Youtube Video
          </p>
        </div>
        <h1 className="text-lg font-semibold">Additional Information</h1>
      </div>
      <div className="relative p-4 h-[250px] md:h-[440px] border border-zinc-200 dark:border-zinc-700 w-full overflow-hidden bg-zinc-900 grid place-items-center group">
        {/* Video Thumbnail */}
        <div className="w-full h-full">
          <img
            src={thumbnailSrc}
            alt="Video thumbnail"
            className="object-cover w-full h-full group-hover:blur-[5px]"
          />
        </div>

        {/* Centered Play Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative group-hover:scale-100 scale-[0.9]">
            <div className="absolute rounded-full -inset-4 bg-zinc-200/20 dark:bg-zinc-700/20 backdrop-blur-sm" />
            <div
              className={`flex items-center justify-center bg-white/40 dark:bg-zinc-500/40 shadow-md rounded-full size-20 transition-all ease-out duration-200 relative group-hover:scale-[1.2] scale-100`}
            >
              <Play
                className="transition-transform duration-200 ease-out scale-100 text-zinc-500 dark:text-white size-8 fill-white group-hover:scale-105"
                style={{
                  filter:
                    "drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))",
                }}
              />
            </div>
          </div>
        </motion.button>

        {/* Video Dialog */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0, rotate: "12.5deg" }}
                animate={{ scale: 1, rotate: "0deg" }}
                exit={{ scale: 0, rotate: "0deg" }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl aspect-video"
              >
                <iframe
                  className="w-full h-full rounded-lg"
                  src={videoSrc}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-end space-y-8">
        <Link to={link} className="self-end text-sm font-semibold">
          Video Reference here:{" "}
          <span className="ml-2 underline text-zinc-500 dark:text-zinc-500 dark:hover:brightness-125">
            {link}
          </span>
        </Link>
        <div className="flex items-start justify-start w-full gap-3 p-5 mt-5 border rounded border-zinc-300 dark:bg-gradient-to-br dark:from-amber-600/20 dark:to-bg-amber-800/50 dark:border-amber-500 ">
          <BadgeInfo size={20} className="text-amber-300" />
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-amber-200">
            Please note: This video is sourced from youtube.com and is the
            property of its original creator. We do not own or claim any rights
            to its content.
          </p>
        </div>
      </div>
    </div>
  );
}
