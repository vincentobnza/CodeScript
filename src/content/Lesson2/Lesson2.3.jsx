import React from "react";
import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  QuizButton,
  CodeEditor,
} from "../../layout/UILayout";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson2_Topic3() {
  const reservedWords = [
    "break",
    "do",
    "instanceOf",
    "typeOf",
    "case",
    "else",
    "new",
    "var",
    "catch",
    "finally",
    "return",
    "void",
    "continue",
    "for",
    "switch",
    "while",
    "debugger",
    "default",
    "if",
    "throw",
    "delete",
    "in",
    "try",
    "class",
    "enum",
    "extends",
    "super",
    "const",
    "export",
    "import",
    "implements",
    "let",
    "private",
    "public",
    "yield",
    "function",
    "with",
    "as",
    "function",
    "this",
    "with",
    "interface",
    "package",
    "protected",
  ];
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <Topic>Comments and Code Structure</Topic>
        <section id="section1">
          <Title>Comment</Title>
          <Description>
            Annotations in JavaScript code that are fully disregarded by the
            compiler are called comments. It is essential for improving code
            readability and maintainability. They provide explanations,
            documentation, and context, making it easier for us to understand
            the purpose and functionality of the code.
          </Description>
          <Description>
            There are two types of comments in JavaScript:
          </Description>
          <ul className="text-zinc-400">
            <li className="list-decimal list-inside">
              {`Single-line Comments ( // ), used for short comments or explanations on a single line.`}
            </li>
            <Code
              code={`// this is a single-line comment
let str1 = "Hello" ;   // this is a single-line comment
`}
            />
            <li className="list-decimal list-inside">
              {`Multi-line Comments ( /* */ ),
Multi-line comments in JavaScript let you add comments that are longer than one line. They begin with /* and close with */.
`}
            </li>

            <Code
              code={`/* this is 
a multi-line comment */
	            
let str1 = "Hello" ;   /* this is a multi-line comment */
`}
            />
          </ul>
        </section>
        <section id="section2">
          <Title>Code Structure</Title>
          <Description>
            Syntax constructions and commands that carry out operations are
            called statements. Our code can contain any number of statements. A
            semicolon can be used to divide statements.
          </Description>
          <h1>Example</h1>
          <Code code={`let num = 10 ;  let str = "Hello" ;`} />
          <Description>or we can write the code on separate lines,</Description>
          <Code
            code={`let num = 10 ;  
let str = "Hello" ;
`}
          />

          <Description>
            In JavaScript,{" "}
            <b className="text-zinc-800 dark:text-zinc-200">whitespace</b> is
            defined as spaces, tabs, and newlines (keyboard Enter). JavaScript
            ignores excessive whitespace outside of strings as well as spaces
            between operators and other symbol.
          </Description>

          <Description>
            JavaScript is case sensitive. A variable named something is
            different from Something . The same goes for any identifier.
          </Description>
          <CodeEditor />
        </section>

        <section id="section3">
          <Title>Reserve words</Title>

          <Description>
            These following words are can’t use as identifiers because they are
            reserved by the language.
          </Description>

          <ul className="grid w-full grid-cols-3 gap-1 p-5 mt-5 md:grid-cols-6 md:p-0">
            {reservedWords.map((item, idx) => (
              <li
                key={idx}
                className="p-2 text-sm border border-zinc-200 dark:border-zinc-800"
              >
                {item}
              </li>
            ))}
          </ul>

          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/HzWf-EeE3uI?si=9ff4VRUMnoy9mVdW"
            thumbnailSrc="https://img.youtube.com/vi/HzWf-EeE3uI/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=HzWf-EeE3uI"
          />
        </section>
        <div className="flex items-center justify-end w-full gap-3">
          <QuizButton text="Lesson 2" link="/quiz/lesson2" />
          <NextButton link="/learn-js/conditionals" text="Conditionals" />
        </div>
      </div>
    </div>
  );
}
