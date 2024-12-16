import React, { useState, useRef, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneLight,
  okaidia,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { IoCloseCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import { Kbd } from "@nextui-org/react";
import { Copy, Check, CircleCheck } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { Card, CardBody, Button, Select, SelectItem } from "@nextui-org/react";
import { Loader2, Play, SquareX } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import { RxMoon, RxSun } from "react-icons/rx";

export const Topic = ({ children }) => (
  <h1 className="mb-5 text-2xl font-medium md:mt-0 md:text-4xl text-zinc-800 dark:text-zinc-100">
    {children}
  </h1>
);

export const Title = ({ children }) => (
  <h1 className="mt-5 text-lg font-medium md:text-2xl text-zinc-800 dark:text-zinc-300">
    {children}
  </h1>
);

export const Description = ({ children }) => (
  <p className="antialiased text-sm  text-zinc-800 dark:text-[#868686]">
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
        className={`w-full relative overflow-hidden ${
          theme === "dark"
            ? "bg-[#1e1e1e] border border-zinc-800"
            : "border border-zinc-200 bg-white"
        }`}
      >
        <div className="w-full overflow-x-auto">
          <SyntaxHighlighter
            language={language || "javascript"}
            style={theme === "dark" ? okaidia : oneLight}
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
    <div className="w-full mt-3 border border-zinc-200 dark:border-zinc-800">
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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <>
      <button
        onClick={handleCopy}
        className="absolute top-0 right-0 p-2 transition-colors duration-200 bg-gray-100 hover:bg-gray-200 dark:bg-[#2c2c2c] outline-none border border-zinc-200 dark:border-zinc-800 dark:hover:bg-zinc-800 px-4"
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <>
            <p className="text-[11px] font-medium">Code Copied!</p>
          </>
        ) : (
          <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        )}
      </button>
    </>
  );
};

export const Image = ({ image, height }) => (
  <img src={image} alt="code" className={`w-full h-auto max-h-${height}px`} />
);

export const List = ({ title, items }) => (
  <div className="flex flex-col gap-2 text-zinc-700 dark:text-zinc-400">
    <h1 className="text-base md:text-lg">{title}</h1>
    <ul className="flex flex-col gap-3 px-4 py-2 md:px-8">
      {items.map((item, index) => (
        <li
          key={index}
          className="text-xs leading-normal list-disc list-inside md:text-sm"
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
    className="mt-8 md:mt-12 w-full md:w-[340px] h-[70px] md:h-[90px] border border-zinc-200 dark:border-zinc-800 self-end text-xs md:text-sm flex justify-end text-right p-3 md:p-4 gap-2 md:gap-4 text-zinc-900 dark:text-zinc-300 hover:border-zinc-600 duration-500 dark:hover:brightness-125"
  >
    <div className="flex flex-col gap-3">
      <p className="font-bold text-zinc-500">Next</p>
      <div className="flex items-center gap-2">
        <h1 className="text-xs font-bold text-zinc-800 md:text-[15px] dark:text-zinc-100 animate-pulse">
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
    class="mt-8 md:mt-12 w-full md:w-[340px] h-[70px] md:h-[90px] items-center justify-center"
  >
    <div class="relative z-10 flex w-full h-full cursor-pointer items-center justify-end text-right overflow-hidden  border border-zinc-100 dark:border-zinc-700 p-[1.5px]">
      <div class="animate-rotate absolute inset-0 h-full w-full rounded-full bg-[conic-gradient(#f59e0b_20deg,transparent_120deg)]"></div>
      <div class="relative z-20  w-full h-full bg-white dark:bg-zinc-900 p-2 gap-2 ">
        <img
          src="https://cdn-icons-png.flaticon.com/128/5968/5968292.png"
          alt="ref"
          className="absolute z-10 left-4 bottom-3 opacity-20 size-10"
        />
        <div className="flex flex-col gap-2 p-2 text-right">
          <p className="text-xs font-bold text-zinc-500">Take a Quiz</p>
          <h1 className="text-xs font-bold text-zinc-800 md:text-[15px] dark:text-amber-400  text-right">
            {text}
          </h1>
        </div>
      </div>
    </div>
  </Link>
);

export const CodeEditor = ({
  initialCode = "// Write your JavaScript code here",
}) => {
  const editorInstanceRef = useRef(null); // Keeps track of the current editor instance
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [output, setOutput] = useState("");
  const [code, setCode] = useState(initialCode);

  const editorTheme = isDarkTheme ? "vs-dark" : "light";

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  const handleEditorDidMount = (editor) => {
    editorInstanceRef.current = editor;
    setIsEditorReady(true);
  };

  const runCode = () => {
    if (!editorInstanceRef.current) return;

    const codeToRun = editorInstanceRef.current.getValue();
    setOutput(""); // Clear the previous output

    try {
      // Temporarily override console.log to capture output
      const originalLog = console.log;
      console.log = (...args) => {
        setOutput((prev) => prev + args.join(" ") + "\n");
      };

      // Evaluate the code
      eval(codeToRun);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };
  return (
    <div className="mt-2 w-full mx-auto border bg-zinc-100 dark:bg-[#1e1e1e] border-zinc-200 dark:border-zinc-800 relative p-6">
      <div>
        <div className="flex flex-col items-start justify-between mb-4 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-medium text-zinc-800 dark:text-zinc-200">
              Try the Code here
            </h2>
            <h3 className="text-xs text-zinc-700 dark:text-zinc-400">
              CodeScript Editor
            </h3>
          </div>

          <div className="absolute flex items-center justify-between w-full gap-2 p-1 text-sm top-2 right-2 sm:w-auto sm:justify-end">
            <Button
              isIconOnly
              size="sm"
              radius="none"
              onClick={toggleTheme}
              className="border border-zinc-300 bg-zinc-50 dark:bg-zinc-800/20 dark:border-zinc-700"
              aria-label={
                isDarkTheme ? "Switch to light theme" : "Switch to dark theme"
              }
            >
              {isDarkTheme ? (
                <RxSun size={20} className="cursor-pointer" />
              ) : (
                <RxMoon size={20} className="cursor-pointer" />
              )}
            </Button>
            <Button
              radius="none"
              disabled={!isEditorReady}
              onClick={() => setOutput("")}
              size="sm"
              className="px-4 py-2 border text-zinc-700 dark:text-white bg-zinc-50 dark:bg-zinc-800/20 dark:hover:brightness-125 border-zinc-300 dark:border-zinc-700"
            >
              Clear Console
            </Button>
            <Button
              radius="none"
              disabled={!isEditorReady}
              onClick={runCode}
              size="sm"
              startContent={<Play className="w-4 h-4" />}
              className="px-4 py-2 text-white bg-green-700 border border-green-500 hover:bg-green-700"
            >
              Run Code
            </Button>
          </div>
        </div>
        <MonacoEditor
          className="w-full h-[200px]"
          language="javascript"
          theme={editorTheme}
          value={code}
          onChange={setCode}
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: "on",
            wrappingStrategy: "advanced",
          }}
        />
        {output && (
          <div
            className="p-4 mt-4 border border-zinc-200 dark:border-zinc-700"
            radius="none"
          >
            <div>
              <h3 className="mb-2 text-sm font-semibold">Output:</h3>
              <pre className="p-4 overflow-x-auto font-mono text-xs whitespace-pre-wrap bg-gray-100 sm:text-sm dark:bg-zinc-900 text-zinc-500 dark:text-zinc-500">
                {output}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const TopicRef = ({ reference }) => {
  const [hidden, setHidden] = useState(false);
  return (
    <div className="relative flex flex-col items-start justify-start w-full p-3 pb-6 space-y-2 overflow-hidden bg-white border border-zinc-300 dark:border-zinc-800 dark:bg-zinc-800/20">
      <img
        src="https://cdn-icons-png.flaticon.com/128/16784/16784406.png"
        alt="ref"
        className="absolute -right-4 -bottom-4 opacity-none opacity-30 size-16 md:size-20 grayscale"
      />
      <button className="text-xs italic text-zinc-600 dark:text-zinc-400">
        Topic Reference
      </button>

      <Link
        to={reference}
        className="italic font-semibold underline text-wrap text-md text-amber-700 dark:bg-gradient-to-br dark:from-amber-200 dark:to-amber-900 dark:bg-clip-text dark:text-transparent"
      >
        {reference}
      </Link>
    </div>
  );
};
