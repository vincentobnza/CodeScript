import React from "react";
import {
  Topic,
  Description,
  Title,
  Code,
  List,
  NextButton,
  Output,
  CodeEditor,
  TopicRef,
} from "../../layout/UILayout";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson2_Topic1() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>Variables and Data Types</Topic>
          <Description>
            Variables and Data Types are the fundamentals elements of JavaScript
            programming.
          </Description>

          <Title>Variables</Title>
          <Description>
            A variables is a container for a value, such a number we may use in
            a sum, or a string that we might use as a part of a phrase. So, in
            other words variables are used to store values.
          </Description>

          <Description>In Example: </Description>
          <Code code={`let y = 20;`} />
          <CodeEditor height={100} />
          <Description>
            In this example, we defined the variable with the keyword “let".
            Variables can be declared in ways using the keyword “let", “var",
            and “const".
          </Description>

          <Table
            aria-label="Example static collection table"
            className="border border-zinc-200 dark:border-zinc-700 rounded-2xl"
          >
            <TableHeader>
              <TableColumn>Variables</TableColumn>
              <TableColumn>When to use</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>let</TableCell>
                <TableCell>If you can’t use the variable const</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>var</TableCell>
                <TableCell>If you are using an old browser</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>const</TableCell>
                <TableCell>If the value or type should not be change</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Description>
            Every JavaScript variables has to have a unique name. We refer to
            these unique names as a identifiers. Identifiers can be longer, more
            detailed names or be shorter one.
          </Description>

          <Description>
            The following are the guidelines for creating variables names:
          </Description>

          <List
            items={[
              `Names must begin with a letter.`,
              `Can contain letters, digits, underscores “ _ “ , and dollar signs “ $ ".`,
              `Names are case sensitive.`,
              `Reserved words like JavaScript keywords cannot be used as names.`,
            ]}
          />
        </section>

        <section id="section2">
          <Title>Data Types</Title>
          <Description>
            In JavaScript there are data types. What kind of information can be
            kept in a variable is determined by its data type. JavaScript data
            types are divided into primitive and non-primitive types. A
            primitive data type is either a data type that is build into a
            computer language, or one that may be classified as a basic
            foundation for developing more complicated data types, they can hold
            a single simple value ( String, Number, BigInt, Boolean, undefined,
            null, and Symbol). A non-primitive data type can hold multiple
            values (Objects) and are sometimes referred to as reference or
            derived data types.
          </Description>

          <Description>
            There are eight basic data types in JavaScript.
          </Description>

          <ul className="flex flex-col gap-4 mt-5">
            <li className="list-decimal list-inside text-zinc-700 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-green-500">String</b> – It
              is a textual data surrounded by single or double quotes.
              <div className="p-4">
                <Description>Example:</Description>

                <Code
                  code={`let firstName = "aezil";
let lastName = "sison";

console.log("Value of firstName = " + firstName);
console.log("Value of lastName = " + lastName);
`}
                />
                <Output
                  output={`Value of firstName = aezil
Value of lastName = sison
`}
                />

                <CodeEditor />
              </div>
            </li>
            <li className="list-decimal list-inside text-zinc-700 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-green-500">Number</b> - An
              integer or a floating-point number.
              <div className="p-4">
                <Description>Example:</Description>

                <Code
                  code={`let x = 21 ;
let y = 2024 ;

console.log("Value of x = " + x);
console.log("Value of y = " + y);

`}
                />
                <Output
                  output={`Value of x = 21
Value of y = 2024

`}
                />

                <CodeEditor />
              </div>
            </li>
            <li className="list-decimal list-inside text-zinc-700 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-green-500">BigInt</b> - The
              built-in object known as BigInt type, which may represent whole
              values greater than 253 – 1.
              <div className="p-4">
                <Description>Example:</Description>

                <Code
                  code={`let bigNum = 202444444444444444444;

console.log("Value of bigNum= " + bigNum);


`}
                />
                <Output
                  output={`Value of bigNum= 202444444444444444444

`}
                />

                <CodeEditor />
              </div>
            </li>
            <li className="list-decimal list-inside text-zinc-700 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-green-500">Boolean</b> -
              Represent any two values: True or False.
              <div className="p-4">
                <Description>Example:</Description>

                <Code
                  code={`let isNicole = true;
let isAezil = false;

if (isNicole) {
     console.log("It’s a nice day!");
} else {
     console.log("It’s not a nice day!"); 
}

`}
                />
                <Output
                  output={`It's a nice day

`}
                />

                <CodeEditor />

                <Description>
                  In this example, it checks if the variable isNicole is true.
                  If it is, it prints “It’s a nice day" and if it’s not, it
                  prints “It’s not a nice day!"
                </Description>
              </div>
            </li>
            <li className="list-decimal list-inside text-zinc-700 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-green-500">Undefined</b> - a
              data type with an uninitialized variable.
              <div className="p-4">
                <Description>Example:</Description>

                <Code
                  code={`let x;
console.log(x); // Output: undefined

if (x === undefined) {
  console.log("x is empty");
} else {
  console.log("x has a value");
}


`}
                />
                <Output output={`x is empty`} />

                <CodeEditor />

                <Description>
                  In this example, it checks if the variable x is empty (meaning
                  it has no value). If it is, it prints “x is empty". If it has
                  a value, it prints “x has a value".
                </Description>
              </div>
            </li>
            <li className="list-decimal list-inside text-zinc-700 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-green-500">null</b>– It
              denotes a null value.
              <div className="p-4">
                <Description>Example:</Description>

                <Code
                  code={`let salary = null;

console.log(salary)


`}
                />

                <CodeEditor />

                <Description>
                  The variable x is assigned the value of null. This means x
                  intentionally has no value.
                </Description>
              </div>
            </li>
            <li className="list-decimal list-inside text-zinc-700 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-green-500">Symbol</b>– are
              unique identifiers that can be used as object property keys or
              values. They are guaranteed to be unique, even if they have the
              same description.
            </li>
            <li className="list-decimal list-inside text-zinc-700 dark:text-zinc-400">
              <b className="text-zinc-800 dark:text-green-500">Object</b>– are
              collections of key-value pairs. Each key is a property name, and
              its corresponding value can be any data type, including other
              objects. Also, Objects is created using curly bracket {}.
              <div className="p-4">
                <Description>Example:</Description>

                <Code
                  code={`const person = {
  firstName: "John",
  lastName: "Doe",
  age: "21",
  address: "Philippines"
};`}
                />

                <CodeEditor />
              </div>
            </li>
          </ul>

          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/XWo3YUblZxk?si=xZVn5Pa-5UQRDkze"
            thumbnailSrc="https://img.youtube.com/vi/XWo3YUblZxk/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=XWo3YUblZxk"
          />

          <TopicRef reference="https://www.javascripthelp.org/learn/basics/variables-data-types/" />
        </section>
        <div className="flex items-center justify-end w-full gap-3">
          <NextButton link="/learn-js/operators" text="Operators" />
        </div>
      </div>
    </div>
  );
}
