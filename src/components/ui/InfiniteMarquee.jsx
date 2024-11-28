"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader } from "@nextui-org/react";
import {
  Container,
  Target,
  Braces,
  RefreshCcw,
  ToggleLeft,
  Code,
  Zap,
  CircleX,
} from "lucide-react";

const jsLessons = [
  {
    title: "Variables and Data Types",
    description: "Introduction to variables and data types in JavaScript.",
    icon: Container,
  },
  {
    title: "Functions",
    description: "Learn about functions and variable scope in JavaScript.",
    icon: Target,
  },
  {
    title: "Arrays and Objects",
    description:
      "Understanding how to work with arrays and objects in JavaScript.",
    icon: Braces,
  },
  {
    title: "Loops and Iteration",
    description: "Master different types of loops and iteration methods.",
    icon: RefreshCcw,
  },
  {
    title: "Conditional Statements",
    description: "Using conditional statements to control flow in JavaScript.",
    icon: ToggleLeft,
  },
  {
    title: "DOM Manipulation",
    description: "Learn how to interact with and manipulate the DOM.",
    icon: Code,
  },
  {
    title: "Event Handling",
    description: "Introduction to handling events in JavaScript.",
    icon: Zap,
  },
  {
    title: "Error Handling",
    description: "Learn how to handle errors and exceptions effectively.",
    icon: CircleX,
  },
];

export default function InfiniteMarquee() {
  return (
    <div className="w-full max-w-screen-lg mx-auto overflow-hidden bg-transparent">
      <div className="relative w-full bg-transparent">
        {/* Left gradient */}
        <div className="absolute top-0 left-0 z-10 w-32 h-full bg-gradient-to-r from-white dark:from-zinc-900 to-transparent"></div>
        {/* Right gradient */}
        <div className="absolute top-0 right-0 z-10 w-32 h-full bg-gradient-to-l from-white dark:from-zinc-900 to-transparent"></div>

        <motion.div
          className="flex items-center h-full py-4 bg-transparent"
          animate={{
            x: [0, -100 * jsLessons.length * 2],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 60,
              ease: "linear",
            },
          }}
        >
          {[...jsLessons, ...jsLessons].map((lesson, index) => (
            <motion.div key={index} className="w-full m-2">
              <Card className="p-3 bg-transparent border border-zinc-50 dark:border-zinc-800">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="grid bg-white border rounded-lg size-12 place-items-center dark:bg-zinc-800/50 backdrop-blur border-zinc-200 dark:border-zinc-700">
                      <lesson.icon
                        size={20}
                        className="text-green-500 animate-pulse"
                      />
                    </div>
                    <div className="w-[250px] p-2 flex flex-col text-left gap-2">
                      <div className="text-sm text-zinc-800 dark:text-zinc-300">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-zinc-600 dark:text-zinc-500">
                        {lesson.description}
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
