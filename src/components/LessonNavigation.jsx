import React, { useState } from "react";
import {
  Lesson1,
  Lesson2,
  Lesson3,
  Lesson4,
  Lesson5,
  Lesson6,
  Lesson7,
  Lesson8,
} from "../data/Chapter1Data";
import { motion } from "framer-motion";

const lessons = [
  { id: 1, title: "Introduction to JavaScript", topics: Lesson1 },
  { id: 2, title: "JavaScript Basics", topics: Lesson2 },
  { id: 3, title: "Control Structure", topics: Lesson3 },
  { id: 4, title: "Functions in JavaScript", topics: Lesson4 },
  { id: 5, title: "JavaScript Objects and Arrays", topics: Lesson5 },
  { id: 6, title: "DOM Manipulation", topics: Lesson6 },
  { id: 7, title: "JavaScript Events", topics: Lesson7 },
  { id: 8, title: "Error Handling", topics: Lesson8 },
];

export default function LessonNavigation() {
  const [openSectionId, setOpenSectionId] = useState(null);

  const toggleSection = (id) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="hidden md:flex bg-white dark:bg-zinc-900 p-4 w-64 h-screen overflow-y-auto fixed right-0 top-0 border-l border-zinc-200 dark:border-zinc-800 z-10"
    >
      <div className="p-5 mt-[5.6rem] space-y-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            Map
          </p>
          <h1 className="text-lg font-semibold text-zinc-700 dark:text-zinc-200">
            Course Map
          </h1>
        </div>
        <div className="space-y-3 text-zinc-600 dark:text-zinc-400">
          {lessons.map((lesson) => (
            <div key={lesson.id}>
              <button
                className={`text-sm text-left flex items-center justify-between outline-none w-full hover:underline ${
                  openSectionId === lesson.id
                    ? "text-green-600 underline"
                    : "text-zinc-800 dark:text-zinc-400"
                }`}
                onClick={() => toggleSection(lesson.id)}
              >
                <span>{lesson.title}</span>
              </button>
              {lesson.topics.length > 0 && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openSectionId === lesson.id
                      ? "max-h-60 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <ul className="mt-2 ml-4 space-y-2">
                    {lesson.topics.map((topic) => (
                      <li
                        key={topic.id}
                        className="text-left text-sm hover:text-black dark:hover:text-zinc-300 hover:underline"
                      >
                        <a href={topic.link}>{topic.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
