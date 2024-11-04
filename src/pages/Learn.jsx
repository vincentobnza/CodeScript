import React, { useEffect } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { RiRoadMapLine } from "react-icons/ri";
import { FaDiamond } from "react-icons/fa6";
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
import SearchModal from "@/components/SearchModal";
import { useDisclosure } from "@nextui-org/react";
import { motion } from "framer-motion";
import { RiJavascriptLine } from "react-icons/ri";
import ScrollUp from "@/components/ScrollUp";
import NavbarQuickSearch from "@/components/NavbarQuickSearch";
import { ShieldCheck, Loader } from "lucide-react";
export default function Learn() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full pb-24 space-y-16 bg-white dark:bg-zinc-900 dark:text-zinc-400"
    >
      <ScrollUp />
      <LearnJs />
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
        setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex items-start justify-between w-full max-w-screen-lg gap-4 p-3 mx-auto md:p-0">
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
            <div className="flex items-center justify-start w-full py-3 pl-10 pr-4 bg-transparent bg-white border outline-none dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinxc-300 dark:hover:border-zinc-600">
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

      <div className="items-center hidden gap-2 md:flex">
        <Link to="/certificate" className="flex">
          <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-green-600 transition-all duration-300 ease-linear bg-transparent border border-green-500 outline-none dark:text-green-200 dark:bg-gradient-to-br dark:from-green-600/20 dark:to-green-800/80 dark:hover:brightness-150">
            <ShieldCheck
              size={15}
              className="text-green-600 dark:text-green-300"
            />
            My Certificate
          </button>
        </Link>
        <Link to="/leaderboard" className="flex">
          <button className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-indigo-600 transition-all duration-300 ease-linear bg-transparent border border-indigo-500 outline-none dark:text-indigo-200 dark:bg-gradient-to-br dark:from-indigo-600/20 dark:to-indigo-800/80 dark:hover:brightness-150">
            <Loader
              size={15}
              className="text-indigo-600 dark:text-indigo-300"
            />
            My Progress
          </button>
        </Link>
      </div>
    </div>
  );
};

const Content = () => {
  return (
    <div className="flex flex-col w-full max-w-screen-lg gap-4 p-3 mx-auto md:p-0">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-md md:text-xl text-zinc-700 dark:text-zinc-50">
            Roadmaps
          </h1>
          <RiRoadMapLine size={20} />
        </div>

        <div className="w-full p-5 space-y-4 text-sm bg-white border dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
          <h1 className="text-lg font-medium dark:text-zinc-100">
            The JavaScript curriculum is structured in this:
          </h1>

          <ul className="flex flex-col gap-2 mt-8">
            <li className="list-decimal list-inside">
              <span className="text-black underline dark:text-yellow-600">
                JavaScript
              </span>
              : Covers the fundamentals of JavaScript as a programming language.
            </li>
          </ul>

          <p className="text-zinc-700 dark:text-zinc-300">
            This structure provides a comprehensive approach to learning
            JavaScript, starting with its core concepts and progressing to its
            practical application in web development. The supplementary modules
            allow for further specialization in areas of interest.
          </p>
        </div>
      </div>
    </div>
  );
};

const Lessons = () => {
  return (
    <div className="flex flex-col w-full max-w-screen-lg p-3 mx-auto space-y-10 md:p-0">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-yellow-600 text-md">
            The JavaScript Language
          </h3>
        </div>
        <p className="text-sm">
          Here we learn JavaScript, starting from scratch and go on to advanced
          concepts like OOP.
        </p>
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
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <FaDiamond className="text-sm text-yellow-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 1</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            Introduction to JavaScript
          </h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {Lesson1.map((item, idx) => (
          <Link
            preventScrollReset={false}
            to={item.link}
            key={idx}
            className="relative flex flex-col h-16 gap-3 p-3 overflow-hidden transition duration-300 ease-in-out border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-200 group bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-500"
          >
            <RiJavascriptLine
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-700 text-zinc-200 group:hover:text-zinc-300 dark:group-hover:text-zinc-500"
            />
            <div className="flex justify-between w-full">
              <h1 className="z-10 flex items-center text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-300 duration underline-offset-2 dark:group:hover:text-yellow-200">
                {item.name}
              </h1>
              <GoArrowRight className=" text-zinc-400 group:hover:text-zinc-300 dark:group-hover:text-zinc-200" />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Lesson2Data = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <FaDiamond className="text-sm text-green-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 2</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            JavaScript Basics
          </h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {Lesson2.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="relative flex flex-col h-16 gap-3 p-3 overflow-hidden transition duration-300 ease-in-out border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-200 group bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-500"
          >
            <RiJavascriptLine
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-700 text-zinc-200 group:hover:text-zinc-300 dark:group-hover:text-zinc-500"
            />

            <div className="flex justify-between w-full">
              <h1 className="z-10 flex items-center text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-300 duration underline-offset-2 dark:group:hover:text-yellow-200">
                {item.name}
              </h1>
              <GoArrowRight className=" text-zinc-400 group:hover:text-zinc-300 dark:group-hover:text-zinc-200" />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Lesson3Data = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <FaDiamond className="text-sm text-indigo-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 3</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            Control Structure
          </h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {Lesson3.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="relative flex flex-col h-16 gap-3 p-3 overflow-hidden transition duration-300 ease-in-out border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-200 group bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-500"
          >
            <RiJavascriptLine
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-700 text-zinc-200 group:hover:text-zinc-300 dark:group-hover:text-zinc-500"
            />

            <div className="flex justify-between w-full">
              <h1 className="z-10 flex items-center text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-300 duration underline-offset-2 dark:group:hover:text-yellow-200">
                {item.name}
              </h1>
              <GoArrowRight className=" text-zinc-400 group:hover:text-zinc-300 dark:group-hover:text-zinc-200" />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Lesson4Data = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <FaDiamond className="text-sm text-orange-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 4</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            Functions in JavaScript
          </h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {Lesson4.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="relative flex flex-col h-16 gap-3 p-3 overflow-hidden transition duration-300 ease-in-out border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-200 group bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-500"
          >
            <RiJavascriptLine
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-700 text-zinc-200 group:hover:text-zinc-300 dark:group-hover:text-zinc-500"
            />

            <div className="flex justify-between w-full">
              <h1 className="z-10 flex items-center text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-300 duration underline-offset-2 dark:group:hover:text-yellow-200">
                {item.name}
              </h1>
              <GoArrowRight className=" text-zinc-400 group:hover:text-zinc-300 dark:group-hover:text-zinc-200" />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Lesson5Data = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <FaDiamond className="text-sm text-sky-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 5</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            JavaScript Objects and Arrays
          </h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {Lesson5.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="relative flex flex-col h-16 gap-3 p-3 overflow-hidden transition duration-300 ease-in-out border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-200 group bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-500"
          >
            <RiJavascriptLine
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-700 text-zinc-200 group:hover:text-zinc-300 dark:group-hover:text-zinc-500"
            />

            <div className="flex justify-between w-full">
              <h1 className="z-10 flex items-center text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-300 duration underline-offset-2 dark:group:hover:text-yellow-200">
                {item.name}
              </h1>
              <GoArrowRight className=" text-zinc-400 group:hover:text-zinc-300 dark:group-hover:text-zinc-200" />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};
const Lesson6Data = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <FaDiamond className="text-sm text-purple-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 6</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            DOM Manipulation
          </h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {Lesson6.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="relative flex flex-col h-16 gap-3 p-3 overflow-hidden transition duration-300 ease-in-out border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-200 group bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-500"
          >
            <RiJavascriptLine
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-700 text-zinc-200 group:hover:text-zinc-300 dark:group-hover:text-zinc-500"
            />

            <div className="flex justify-between w-full">
              <h1 className="z-10 flex items-center text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-300 duration underline-offset-2 dark:group:hover:text-yellow-200">
                {item.name}
              </h1>
              <GoArrowRight className=" text-zinc-400 group:hover:text-zinc-300 dark:group-hover:text-zinc-200" />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Lesson7Data = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <FaDiamond className="text-sm text-zinc-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 7</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            JavaScript Events
          </h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {Lesson7.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="relative flex flex-col h-16 gap-3 p-3 overflow-hidden transition duration-300 ease-in-out border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-200 group bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-500"
          >
            <RiJavascriptLine
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-700 text-zinc-200 group:hover:text-zinc-300 dark:group-hover:text-zinc-500"
            />

            <div className="flex justify-between w-full">
              <h1 className="z-10 flex items-center text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-300 duration underline-offset-2 dark:group:hover:text-yellow-200">
                {item.name}
              </h1>
              <GoArrowRight className=" text-zinc-400 group:hover:text-zinc-300 dark:group-hover:text-zinc-200" />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

const Lesson8Data = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <FaDiamond className="text-sm text-cyan-600 animate-pulse" />
        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold">Lesson 8</p>
          <h1 className="font-semibold text-zinc-700 dark:text-zinc-200">
            Error Handling
          </h1>
        </div>
      </div>

      <ul className="grid grid-cols-2 gap-2 p-2 md:grid-cols-4">
        {Lesson8.map((item, idx) => (
          <Link
            to={item.link}
            key={idx}
            className="relative flex flex-col h-16 gap-3 p-3 overflow-hidden transition duration-300 ease-in-out border text-zinc-700 dark:text-zinc-200 dark:border-zinc-700 border-zinc-200 group bg-zinc-50 dark:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-500"
          >
            <RiJavascriptLine
              size={50}
              className="absolute duration-300 ease-in-out -bottom-3 -right-3 dark:text-zinc-700 text-zinc-200 group:hover:text-zinc-300 dark:group-hover:text-zinc-500"
            />

            <div className="flex justify-between w-full">
              <h1 className="z-10 flex items-center text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-300 duration underline-offset-2 dark:group:hover:text-yellow-200">
                {item.name}
              </h1>
              <GoArrowRight className=" text-zinc-400 group:hover:text-zinc-300 dark:group-hover:text-zinc-200" />
            </div>
          </Link>
        ))}
      </ul>
    </div>
  );
};
