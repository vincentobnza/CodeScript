import React, { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCloseCircleSharp } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import Editor from "@monaco-editor/react";
import { Kbd } from "@nextui-org/react";
import { Copy, Check, MoveRight, CircleCheck } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export const Topic = ({ children }) => (
  <h1 className="text-2xl font-medium mt- md:mt-0 md:text-4xl text-zinc-800 dark:text-zinc-100">
    {children}
  </h1>
);

export const Title = ({ children }) => (
  <h1 className="mt-5 text-lg font-medium md:text-2xl text-zinc-700 dark:text-zinc-300">
    {children}
  </h1>
);

export const Description = ({ children }) => (
  <p className="text-sm md:text-base text-zinc-500 dark:text-[#7e7e7e]">
    {children}
  </p>
);

export const Example = ({ text }) => (
  <div className="flex items-center justify-start w-full p-3 border md:p-5 bg-zinc-100 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
    <h1 className="text-xs font-medium md:text-sm">{text}</h1>
  </div>
);

export const Code = ({
  code,
  language,
  error,
  setError,
  visibleButton = true,
}) => {
  const { theme } = useTheme();

  return (
    <div className="w-full my-4 space-y-1">
      <div
        className={`w-full relative rounded-md overflow-hidden ${
          theme === "dark"
            ? "bg-[#1e1e1e] border border-zinc-800"
            : "border border-zinc-200 bg-[#FAFAFA]"
        }`}
      >
        <div className="w-full overflow-x-auto">
          <SyntaxHighlighter
            language={language || "javascript"}
            style={theme === "dark" ? vscDarkPlus : oneLight}
            customStyle={{
              padding: "15px",
              backgroundColor: "transparent",
              fontSize: "12px",
              fontFamily: '"JetBrains Mono", monospace',
              margin: 0,
              minWidth: "100%",
              width: "fit-content",
            }}
            wrapLongLines={true}
          >
            {code}
          </SyntaxHighlighter>
        </div>

        <CopyIcon code={code} />

        {error && (
          <IoCloseCircleSharp
            size={25}
            className="absolute text-red-500 transition-colors cursor-pointer right-2 top-2 hover:text-red-600"
            onClick={() => setError(false)}
          />
        )}
      </div>
    </div>
  );
};

export const Output = ({ output }) => (
  <div className="mb-4 space-y-3">
    <h1 className="text-xs font-bold md:text-sm text-zinc-600 dark:text-zinc-500">
      Console Output
    </h1>
    <div className="w-full mt-3 border rounded-lg border-zinc-200 dark:border-zinc-800">
      <div className="w-full h-8 bg-zinc-100 dark:bg-[#1e1e1e] rounded-tr-lg rounded-tl-lg border-b border-zinc-300 dark:border-zinc-800 flex items-center p-3">
        <div className="w-[50px] grid grid-cols-3">
          <div className="bg-green-500 rounded-full size-2"></div>
          <div className="bg-red-500 rounded-full size-2"></div>
          <div className="bg-yellow-500 rounded-full size-2"></div>
        </div>
      </div>
      <div className="w-full p-3 md:p-5 bg-zinc-100 dark:bg-[#1e1e1e] flex items-center justify-start text-zinc-700 dark:text-zinc-400">
        <pre className="overflow-x-auto text-xs md:text-sm">{output}</pre>
      </div>
    </div>
  </div>
);

export const CopyIcon = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.custom(
        (t) => (
          <AnimatePresence>
            {t.visible && (
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                className="flex items-center justify-start gap-3 p-2 bg-white border-l-4 border-green-400 dark:bg-zinc-800"
              >
                <div className="grid rounded size-9 bg-zinc-50 dark:bg-zinc-700 place-items-center">
                  <CircleCheck className="text-green-400" />
                </div>
                <div className="flex flex-col justify-center gap-1 text-left">
                  <h1 className="text-sm font-bold">Text Copied</h1>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">
                    Code is successfully copied to clipboard
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ),
        {
          duration: 2000,
          position: "top-right",
        }
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-0 right-0 p-2 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 dark:bg-[#2c2c2c] outline-none border border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 px-4"
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
      )}
    </button>
  );
};

export const Image = ({ image, height }) => (
  <img src={image} alt="code" className={`w-full h-auto max-h-${height}px`} />
);

export const List = ({ title, items }) => (
  <div className="flex flex-col gap-2 text-zinc-700 dark:text-[#7e7e7e]">
    <h1 className="text-base md:text-lg">{title}</h1>
    <ul className="flex flex-col gap-3 px-4 py-2 md:px-8">
      {items.map((item, index) => (
        <li
          key={index}
          className="text-xs list-disc list-inside md:text-[15px] leading-normal"
          style={{
            textIndent: "-22px",
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const Text = ({ children }) => (
  <p className="text-base font-medium md:text-lg text-zinc-700 dark:text-zinc-300">
    {children}
  </p>
);

export const Note = ({ noteTitle, description }) => (
  <div className="relative flex flex-col w-full gap-3 p-3 mt-5 mb-3 border md:p-5 bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300">
    <div className="flex items-center gap-2">
      <h1 className="text-base font-semibold md:text-lg text-zinc-800 dark:text-zinc-200">
        ✍🏻 {noteTitle}
      </h1>
    </div>
    <p className="ml-6 text-xs md:text-sm">{description}</p>
  </div>
);

export const ListItem = ({ title, text }) => (
  <div className="flex flex-col w-full gap-2 text-sm font-medium md:text-md text-zinc-700 dark:text-zinc-300">
    <h1>{title}</h1>
    <p className="ml-5">{text}</p>
  </div>
);

export const Key = ({ children }) => (
  <Kbd className="mx-2 kbd kbd-xs md:kbd-sm">{children}</Kbd>
);

export const NextButton = ({ text, link }) => (
  <Link
    to={link}
    className="mt-8 md:mt-12 w-full md:w-[340px] h-[70px] md:h-[90px] border border-zinc-200 dark:border-zinc-700 self-end text-xs md:text-sm flex justify-end text-right p-3 md:p-4 gap-2 md:gap-4 text-zinc-900 dark:text-zinc-300 hover:border-zinc-600 duration-500"
  >
    <div className="flex flex-col gap-1">
      <p>Next</p>
      <div className="flex items-center gap-2">
        <h1 className="text-xs font-bold text-green-700 md:text-[15px] dark:text-green-500">
          {text}
        </h1>
      </div>
    </div>
  </Link>
);

export const Highlight = ({ children }) => (
  <span className="font-medium text-black rounded-full dark:text-white">
    {children}
  </span>
);

export const QuizButton = ({ text, link }) => (
  <Link
    to={link}
    className="mt-8 md:mt-12 w-full md:w-[260px] h-[70px] md:h-[90px] bg-green-500 dark:bg-green-800 border-none dark:border dark:border-green-600 self-end text-xs  md:text-sm flex justify-end text-right p-3 md:p-4 gap-2 md:gap-4 text-white hover:border-green-600 duration-500 relative overflow-hidden hover:opacity-80 outline-none"
  >
    <img
      src="https://cdn-icons-png.flaticon.com/128/5827/5827057.png"
      alt="quiz icon"
      className="absolute -left-4 -bottom-2 opacity-none dark:opacity-70 size-16 md:size-20"
    />
    <div className="flex flex-col gap-1">
      <p className="text-xs md:text-sm">Take a Quiz</p>
      <div className="flex items-center gap-2">
        <h1 className="text-xs font-bold text-yellow-200 md:text-[15px] ">
          {text}
        </h1>
      </div>
    </div>
  </Link>
);
