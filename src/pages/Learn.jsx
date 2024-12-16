import React, { useEffect } from "react";
import { RiRoadMapLine } from "react-icons/ri";
import { GoArrowRight } from "react-icons/go";
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
import { Search } from "lucide-react";
import { MdKeyboardCommandKey } from "react-icons/md";
import { useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import ScrollUp from "@/components/ScrollUp";
import NavbarQuickSearch from "@/components/NavbarQuickSearch";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  SquareTerminal,
  EqualNot,
  RefreshCcw,
  Parentheses,
  Brackets,
  SquareMousePointer,
  Dices,
  Ban,
  BookCheck,
  ArrowUpRight,
  ChartNoAxesColumn,
  Bookmark,
  LoaderCircle,
  Medal,
} from "lucide-react";
import { Tooltip } from "@nextui-org/react";
import { BookOpen, Code, Users } from "lucide-react";

import { useBookmarks } from "@/hooks/useBookmark";

export default function Learn() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full pb-24 bg-white space-y-14 dark:bg-zinc-900 dark:text-zinc-400"
    >
      <ScrollUp />
      <LearnJs />

      <AddedLessons />
    </motion.div>
  );
}

const LearnJs = () => {
  return (
    <>
      <Header />
      <div className="space-y-8">
        <Content />
        <Lessons />
      </div>
    </>
  );
};
const Header = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // CTRL K TO OPEN MODAL

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        onOpen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onOpen]);

  return (
    <div className="relative flex items-start justify-between w-full max-w-screen-lg gap-4 p-3 mx-auto md:p-0">
      <div className="hidden md:flex absolute w-[240px] h-[100px] bg-slate-400/80 rounded-full bottom-8 z-0 filter blur-[100px]" />
      <NavbarQuickSearch
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <div className="flex flex-col gap-4">
        <h3 className="text-xs font-bold md:text-md">
          {"#JavaScript | #Learn"}
        </h3>
        <h1 className="text-2xl font-semibold md:text-4xl text-zinc-700 dark:text-zinc-50">
          Learn the Fundamentals of JavaScript
        </h1>
        <p>Master the core concepts of JavaScript for web development.</p>

        {/* SEARCH FOR LESSONS */}
        <div className="flex items-center gap-1 mt-8">
          <div
            className="relative w-full max-w-md cursor-pointer"
            onClick={onOpen}
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400 size-4" />
            </div>
            <div className="flex items-center justify-start w-full py-3 pl-10 pr-4 bg-transparent bg-white border outline-none dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600">
              <p className="text-sm">Quick Search for Lessons</p>
            </div>

            <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3 pointer-events-none">
              <h1 className="text-xs font-semibold">Ctrl K</h1>
              <MdKeyboardCommandKey
                size={17}
                className="text-zinc-400 dark:text-zinc-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="items-center hidden gap-2 font-bold md:flex">
        <Link to="/certificate" className="flex">
          <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm transition-all duration-300 ease-linear bg-white border dark:hover:brightness-125 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700">
            <Medal size={15} />
            My Certificate
          </button>
        </Link>
        <Link to="/performance" className="flex">
          <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm transition-all duration-300 ease-linear bg-white border dark:hover:brightness-125 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-700">
            <LoaderCircle size={15} />
            Progress
          </button>
        </Link>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className="relative flex flex-col w-full max-w-screen-lg gap-4 p-3 mx-auto overflow-hidden md:p-0">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col w-full gap-4 p-4 text-sm bg-white border md:p-7 dark:bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-900 border-zinc-200 dark:border-zinc-700">
          <div className="flex items-center gap-4">
            <h1 className="font-semibold text-md md:text-xl text-zinc-700 dark:text-zinc-50">
              JavaScript Curriculum Roadmap
            </h1>
            <RiRoadMapLine size={20} />
          </div>
          <p className="text-sm">
            The JavaScript curriculum is designed to offer a structured and
            comprehensive learning journey through the fundamentals of
            JavaScript, progressing from foundational concepts to advanced
            applications. Here’s an overview of the curriculum structure:
          </p>

          <h1 className="mt-4 font-semibold text-md text-zinc-700 dark:text-zinc-200">
            Core JavaScript Fundamentals
          </h1>

          <ul className="flex flex-col gap-2 text-sm">
            <li className="md:list-inside md:list-disc">
              Covers the essential building blocks of JavaScript, providing a
              solid foundation in syntax, variables, data types, operators, and
              control structures.
            </li>
            <li className="md:list-inside md:list-disc">
              Guides students through core programming principles, such as
              functions, scope, and error handling, essential for writing
              efficient and maintainable code.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const Lessons = () => {
  const { bookmarks } = useBookmarks();
  return (
    <div className="flex flex-col w-full max-w-screen-lg p-3 mx-auto space-y-10 md:p-0">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-zinc-600 dark:text-zinc-200 text-md">
              The JavaScript Language
            </h3>
          </div>
          <p className="text-sm">
            Here we learn JavaScript, starting from scratch and go on to
            advanced concepts like OOP.
          </p>
        </div>

        <Link
          to="/bookmarks"
          className="hidden text-[12px] font-semibold md:flex items-center gap-3 bg-white dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 dark:hover:brightness-125 dark:shadow-lg px-3 py-[6px] border border-zinc-200 dark:border-zinc-700 outline-none relative"
        >
          <Bookmark size={14} />
          Bookmarks
        </Link>
      </div>

      <div className="space-y-6">
        <Lesson1Data />
        <Lesson2Data />
        <Lesson3Data />
        <Lesson4Data />
        <Lesson5Data />
        <Lesson6Data />
        <Lesson7Data />
        <Lesson8Data />
      </div>
    </div>
  );
};

const Lesson1Data = () => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <SquareTerminal className="text-sm text-yellow-500 dark:text-yellow-300 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 1</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            Introduction to JavaScript
          </h1>
        </div>
      </div>
      {/* Lesson List */}
      <ul className="grid gap-2 p-1 md:grid-cols-4">
        {Lesson1.map((item, idx) => (
          <div
            key={idx} // Move `key` to the top-level element
            className="h-[8rem] relative flex flex-col gap-3 p-3 overflow-hidden transition duration-300 ease-in-out bg-white border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-300 group dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-gradient-to-br hover:dark:from-zinc-800 hover:dark:to-zinc-900"
          >
            {/* Decorative Icon */}
            <SquareTerminal
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-600 text-zinc-200 group-hover:text-zinc-300 dark:group-hover:text-yellow-300 group-hover:-rotate-12"
            />

            {/* Lesson Link */}
            <Link
              to={item.link}
              preventScrollReset={false}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between w-full">
                <h1 className="z-10 flex items-center font-semibold text-md md:text-sm text-zinc-700 dark:text-zinc-300 underline-offset-2 dark:group-hover:text-yellow-200">
                  {item.name}
                </h1>
                <GoArrowRight className="text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-200" />
              </div>
              <p className="text-sm md:text-xs text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                {item.subTopics} Subtopics
              </p>
            </Link>

            {/* Bookmark Icon */}
            <div className="absolute left-2 bottom-2">
              <Tooltip
                className="font-Jost"
                placement="top"
                radius="none"
                showArrow
                content={
                  isBookmarked(item.name) ? "Remove bookmark" : "Add bookmark"
                }
              >
                <button
                  onClick={() =>
                    toggleBookmark(item.name, item.subTopics, item.link)
                  }
                  className="cursor-pointer focus:outline-none"
                >
                  <Bookmark
                    strokeWidth={2.5}
                    className={
                      isBookmarked(item.name)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }
                    size={17}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          to="/learning-objectives/lesson1"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-green-400"
        >
          Lesson 1 Learning Objectives
          <ArrowUpRight size={15} />
        </Link>

        <Link
          to="/pre-test/lesson1"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-orange-400"
        >
          Take Pre Test
          <BookCheck size={15} />
        </Link>
      </div>
    </div>
  );
};

const Lesson2Data = () => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <EqualNot className="text-sm text-green-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 2</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            JavaScript Basics
          </h1>
        </div>
      </div>
      {/* Lesson List */}
      <ul className="grid gap-2 p-1 grid-cols md:grid-cols-4">
        {Lesson2.map((item, idx) => (
          <div
            key={idx} // Move `key` to the top-level element
            className="h-[8rem] relative flex flex-col gap-3 p-3 overflow-hidden transition duration-300 ease-in-out bg-white border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-300 group dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-gradient-to-br hover:dark:from-zinc-800 hover:dark:to-zinc-900"
          >
            {/* Decorative Icon */}
            <EqualNot
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-500 text-zinc-200 group-hover:text-zinc-300 dark:group-hover:text-green-500 group-hover:-rotate-12"
            />

            {/* Lesson Link */}
            <Link
              to={item.link}
              preventScrollReset={false}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between w-full">
                <h1 className="z-10 flex items-center font-semibold text-md md:text-sm text-zinc-700 dark:text-zinc-300 underline-offset-2 dark:group-hover:text-yellow-200">
                  {item.name}
                </h1>
                <GoArrowRight className="text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-200" />
              </div>
              <p className="text-md md:text-xs text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                {item.subTopics} Subtopics
              </p>
            </Link>

            {/* Bookmark Icon */}
            <div className="absolute left-2 bottom-2">
              <Tooltip
                className="font-Jost"
                placement="top"
                radius="none"
                showArrow
                content={
                  isBookmarked(item.name) ? "Remove bookmark" : "Add bookmark"
                }
              >
                <button
                  onClick={() =>
                    toggleBookmark(item.name, item.subTopics, item.link)
                  }
                  className="cursor-pointer focus:outline-none"
                >
                  <Bookmark
                    strokeWidth={2.5}
                    className={
                      isBookmarked(item.name)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }
                    size={17}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          to="/learning-objectives/lesson2"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-green-400"
        >
          Lesson 2 Learning Objectives
          <ArrowUpRight size={15} />
        </Link>

        <Link
          to="/pre-test/lesson2"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-orange-400"
        >
          Take Pre Test
          <BookCheck size={15} />
        </Link>
      </div>
    </div>
  );
};

const Lesson3Data = () => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <RefreshCcw className="text-sm text-red-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 3</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            Control Structure
          </h1>
        </div>
      </div>
      {/* Lesson List */}
      <ul className="grid gap-2 p-1 grid-cols md:grid-cols-4">
        {Lesson3.map((item, idx) => (
          <div
            key={idx} // Move `key` to the top-level element
            className="h-[8rem] relative flex flex-col gap-3 p-3 overflow-hidden transition duration-300 ease-in-out bg-white border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-300 group dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-gradient-to-br hover:dark:from-zinc-800 hover:dark:to-zinc-900"
          >
            {/* Decorative Icon */}
            <RefreshCcw
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-500 text-zinc-200 group-hover:text-zinc-300 dark:group-hover:text-red-500 group-hover:-rotate-12"
            />

            {/* Lesson Link */}
            <Link
              to={item.link}
              preventScrollReset={false}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between w-full">
                <h1 className="z-10 flex items-center font-semibold text-md md:text-sm text-zinc-700 dark:text-zinc-300 underline-offset-2 dark:group-hover:text-yellow-200">
                  {item.name}
                </h1>
                <GoArrowRight className="text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-200" />
              </div>
              <p className="text-md md:text-xs text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                {item.subTopics} Subtopics
              </p>
            </Link>

            {/* Bookmark Icon */}
            <div className="absolute left-2 bottom-2">
              <Tooltip
                className="font-Jost"
                placement="top"
                radius="none"
                showArrow
                content={
                  isBookmarked(item.name) ? "Remove bookmark" : "Add bookmark"
                }
              >
                <button
                  onClick={() =>
                    toggleBookmark(item.name, item.subTopics, item.link)
                  }
                  className="cursor-pointer focus:outline-none"
                >
                  <Bookmark
                    strokeWidth={2.5}
                    className={
                      isBookmarked(item.name)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }
                    size={17}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          to="/learning-objectives/lesson3"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-green-400"
        >
          Lesson 3 Learning Objectives
          <ArrowUpRight size={15} />
        </Link>

        <Link
          to="/pre-test/lesson3"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-orange-400"
        >
          Take Pre Test
          <BookCheck size={15} />
        </Link>
      </div>
    </div>
  );
};

const Lesson4Data = () => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Parentheses className="text-sm text-blue-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 4</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            Functions in JavaScript
          </h1>
        </div>
      </div>
      {/* Lesson List */}
      <ul className="grid gap-2 p-1 grid-cols md:grid-cols-4">
        {Lesson4.map((item, idx) => (
          <div
            key={idx} // Move `key` to the top-level element
            className="h-[8rem] relative flex flex-col gap-3 p-3 overflow-hidden transition duration-300 ease-in-out bg-white border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-300 group dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-gradient-to-br hover:dark:from-zinc-800 hover:dark:to-zinc-900"
          >
            {/* Decorative Icon */}
            <Parentheses
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-500 text-zinc-200 group-hover:text-zinc-300 dark:group-hover:text-blue-500 group-hover:-rotate-12"
            />

            {/* Lesson Link */}
            <Link
              to={item.link}
              preventScrollReset={false}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between w-full">
                <h1 className="z-10 flex items-center font-semibold text-md md:text-sm text-zinc-700 dark:text-zinc-300 underline-offset-2 dark:group-hover:text-yellow-200">
                  {item.name}
                </h1>
                <GoArrowRight className="text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-200" />
              </div>
              <p className="text-md md:text-xs text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                {item.subTopics} Subtopics
              </p>
            </Link>

            {/* Bookmark Icon */}
            <div className="absolute left-2 bottom-2">
              <Tooltip
                className="font-Jost"
                placement="top"
                radius="none"
                showArrow
                content={
                  isBookmarked(item.name) ? "Remove bookmark" : "Add bookmark"
                }
              >
                <button
                  onClick={() =>
                    toggleBookmark(item.name, item.subTopics, item.link)
                  }
                  className="cursor-pointer focus:outline-none"
                >
                  <Bookmark
                    strokeWidth={2.5}
                    className={
                      isBookmarked(item.name)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }
                    size={17}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          to="/learning-objectives/lesson4"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-green-400"
        >
          Lesson 4 Learning Objectives
          <ArrowUpRight size={15} />
        </Link>

        <Link
          to="/pre-test/lesson4"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-orange-400"
        >
          Take Pre Test
          <BookCheck size={15} />
        </Link>
      </div>
    </div>
  );
};
const Lesson5Data = () => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Brackets className="text-sm text-green-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 5</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            JavaScript Objects and Arrays
          </h1>
        </div>
      </div>
      {/* Lesson List */}
      <ul className="grid gap-2 p-1 grid-cols md:grid-cols-4">
        {Lesson5.map((item, idx) => (
          <div
            key={idx} // Move `key` to the top-level element
            className="h-[8rem] relative flex flex-col gap-3 p-3 overflow-hidden transition duration-300 ease-in-out bg-white border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-300 group dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-gradient-to-br hover:dark:from-zinc-800 hover:dark:to-zinc-900"
          >
            {/* Decorative Icon */}
            <Brackets
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-500 text-zinc-200 group-hover:text-zinc-300 dark:group-hover:text-green-500 group-hover:-rotate-12"
            />

            {/* Lesson Link */}
            <Link
              to={item.link}
              preventScrollReset={false}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between w-full">
                <h1 className="z-10 flex items-center font-semibold text-md md:text-sm text-zinc-700 dark:text-zinc-300 underline-offset-2 dark:group-hover:text-yellow-200">
                  {item.name}
                </h1>
                <GoArrowRight className="text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-200" />
              </div>
              <p className="text-md md:text-xs text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                {item.subTopics} Subtopics
              </p>
            </Link>

            {/* Bookmark Icon */}
            <div className="absolute left-2 bottom-2">
              <Tooltip
                className="font-Jost"
                placement="top"
                radius="none"
                showArrow
                content={
                  isBookmarked(item.name) ? "Remove bookmark" : "Add bookmark"
                }
              >
                <button
                  onClick={() =>
                    toggleBookmark(item.name, item.subTopics, item.link)
                  }
                  className="cursor-pointer focus:outline-none"
                >
                  <Bookmark
                    strokeWidth={2.5}
                    className={
                      isBookmarked(item.name)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }
                    size={17}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          to="/learning-objectives/lesson5"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-green-400"
        >
          Lesson 5 Learning Objectives
          <ArrowUpRight size={15} />
        </Link>

        <Link
          to="/pre-test/lesson5"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-orange-400"
        >
          Take Pre Test
          <BookCheck size={15} />
        </Link>
      </div>
    </div>
  );
};
const Lesson6Data = () => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <SquareMousePointer className="text-sm text-indigo-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 6</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            DOM Manipulation
          </h1>
        </div>
      </div>
      {/* Lesson List */}
      <ul className="grid gap-2 p-1 grid-cols md:grid-cols-4">
        {Lesson6.map((item, idx) => (
          <div
            key={idx} // Move `key` to the top-level element
            className="h-[8rem] relative flex flex-col gap-3 p-3 overflow-hidden transition duration-300 ease-in-out bg-white border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-300 group dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-gradient-to-br hover:dark:from-zinc-800 hover:dark:to-zinc-900"
          >
            {/* Decorative Icon */}
            <SquareMousePointer
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-500 text-zinc-200 group-hover:text-zinc-300 dark:group-hover:text-indigo-500 group-hover:-rotate-12"
            />

            {/* Lesson Link */}
            <Link
              to={item.link}
              preventScrollReset={false}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between w-full">
                <h1 className="z-10 flex items-center font-semibold text-md md:text-sm text-zinc-700 dark:text-zinc-300 underline-offset-2 dark:group-hover:text-yellow-200">
                  {item.name}
                </h1>
                <GoArrowRight className="text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-200" />
              </div>
              <p className="text-md md:text-xs text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                {item.subTopics} Subtopics
              </p>
            </Link>

            {/* Bookmark Icon */}
            <div className="absolute left-2 bottom-2">
              <Tooltip
                className="font-Jost"
                placement="top"
                radius="none"
                showArrow
                content={
                  isBookmarked(item.name) ? "Remove bookmark" : "Add bookmark"
                }
              >
                <button
                  onClick={() =>
                    toggleBookmark(item.name, item.subTopics, item.link)
                  }
                  className="cursor-pointer focus:outline-none"
                >
                  <Bookmark
                    strokeWidth={2.5}
                    className={
                      isBookmarked(item.name)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }
                    size={17}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          to="/learning-objectives/lesson6"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-green-400"
        >
          Lesson 6 Learning Objectives
          <ArrowUpRight size={15} />
        </Link>

        <Link
          to="/pre-test/lesson6"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-orange-400"
        >
          Take Pre Test
          <BookCheck size={15} />
        </Link>
      </div>
    </div>
  );
};

const Lesson7Data = () => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Dices className="text-sm text-zinc-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 7</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            JavaScript Events
          </h1>
        </div>
      </div>
      {/* Lesson List */}
      <ul className="grid gap-2 p-1 grid-cols md:grid-cols-4">
        {Lesson7.map((item, idx) => (
          <div
            key={idx} // Move `key` to the top-level element
            className="h-[8rem] relative flex flex-col gap-3 p-3 overflow-hidden transition duration-300 ease-in-out bg-white border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-300 group dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-gradient-to-br hover:dark:from-zinc-800 hover:dark:to-zinc-900"
          >
            {/* Decorative Icon */}
            <Dices
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-500 text-zinc-200 group-hover:text-zinc-300 dark:group-hover:text-indigo-500 group-hover:-rotate-12"
            />

            {/* Lesson Link */}
            <Link
              to={item.link}
              preventScrollReset={false}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between w-full">
                <h1 className="z-10 flex items-center font-semibold text-md md:text-sm text-zinc-700 dark:text-zinc-300 underline-offset-2 dark:group-hover:text-yellow-200">
                  {item.name}
                </h1>
                <GoArrowRight className="text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-200" />
              </div>
              <p className="text-md md:text-xs text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                {item.subTopics} Subtopics
              </p>
            </Link>

            {/* Bookmark Icon */}
            <div className="absolute left-2 bottom-2">
              <Tooltip
                className="font-Jost"
                placement="top"
                radius="none"
                showArrow
                content={
                  isBookmarked(item.name) ? "Remove bookmark" : "Add bookmark"
                }
              >
                <button
                  onClick={() =>
                    toggleBookmark(item.name, item.subTopics, item.link)
                  }
                  className="cursor-pointer focus:outline-none"
                >
                  <Bookmark
                    strokeWidth={2.5}
                    className={
                      isBookmarked(item.name)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }
                    size={17}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          to="/learning-objectives/lesson7"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-green-400"
        >
          Lesson 7 Learning Objectives
          <ArrowUpRight size={15} />
        </Link>

        <Link
          to="/pre-test/lesson7"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-orange-400"
        >
          Take Pre Test
          <BookCheck size={15} />
        </Link>
      </div>
    </div>
  );
};

const Lesson8Data = () => {
  const { toggleBookmark, isBookmarked } = useBookmarks();

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-6">
        <Ban className="text-sm text-red-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 8</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            Error Handling
          </h1>
        </div>
      </div>
      {/* Lesson List */}
      <ul className="grid gap-2 p-1 grid-cols md:grid-cols-4">
        {Lesson8.map((item, idx) => (
          <div
            key={idx} // Move `key` to the top-level element
            className="h-[8rem] relative flex flex-col gap-3 p-3 overflow-hidden transition duration-300 ease-in-out bg-white border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-300 group dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-gradient-to-br hover:dark:from-zinc-800 hover:dark:to-zinc-900"
          >
            {/* Decorative Icon */}
            <Ban
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-500 text-zinc-200 group-hover:text-zinc-300 dark:group-hover:text-red-500 group-hover:-rotate-12"
            />

            {/* Lesson Link */}
            <Link
              to={item.link}
              preventScrollReset={false}
              className="flex flex-col gap-3"
            >
              <div className="flex justify-between w-full">
                <h1 className="z-10 flex items-center font-semibold text-md md:text-sm text-zinc-700 dark:text-zinc-300 underline-offset-2 dark:group-hover:text-yellow-200">
                  {item.name}
                </h1>
                <GoArrowRight className="text-zinc-400 group-hover:text-zinc-300 dark:group-hover:text-zinc-200" />
              </div>
              <p className="text-md md:text-xs text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                {item.subTopics} Subtopics
              </p>
            </Link>

            {/* Bookmark Icon */}
            <div className="absolute left-2 bottom-2">
              <Tooltip
                className="font-Jost"
                placement="top"
                radius="none"
                showArrow
                content={
                  isBookmarked(item.name) ? "Remove bookmark" : "Add bookmark"
                }
              >
                <button
                  onClick={() =>
                    toggleBookmark(item.name, item.subTopics, item.link)
                  }
                  className="cursor-pointer focus:outline-none"
                >
                  <Bookmark
                    strokeWidth={2.5}
                    className={
                      isBookmarked(item.name)
                        ? "text-green-500"
                        : "text-zinc-400"
                    }
                    size={17}
                  />
                </button>
              </Tooltip>
            </div>
          </div>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Link
          to="/learning-objectives/lesson8"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-green-400"
        >
          Lesson 8 Learning Objectives
          <ArrowUpRight size={15} />
        </Link>

        <Link
          to="/pre-test/lesson8"
          className="flex items-center gap-3 pb-5 ml-2 text-xs text-zinc-500 dark:text-zinc-300 dark:hover:text-orange-400"
        >
          Take Pre Test
          <BookCheck size={15} />
        </Link>
      </div>
    </div>
  );
};

const AddedLessons = () => {
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
      title: "Advanced Topics",
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
          className="p-8 mb-8 glass-card rounded-2xl md:p-12"
        >
          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex-1 space-y-6">
              <span className="inline-flex items-center px-4 py-2 border rounded-full bg-amber-500/20 border-amber-500/30">
                <span className="w-2 h-2 mr-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span className="text-sm font-medium text-amber-200">
                  Learning Resources
                </span>
              </span>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl gradient-text">
                Instructor Added Materials
              </h1>

              <p className="text-lg leading-relaxed text-gray-300">
                Expand your knowledge with curated JavaScript resources and
                materials. Access handpicked tutorials, examples, and practice
                exercises designed to accelerate your learning journey.
              </p>

              <motion.button
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
                  className="p-6 transition-all duration-300 glass-card rounded-xl hover:bg-white/20 float-animation"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} p-2.5 mb-4`}
                  >
                    <item.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="font-semibold text-white">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
