import {
  Topic,
  Description,
  Title,
  Code,
  List,
  NextButton,
  QuizButton,
  Output,
  CodeEditor,
  Highlight,
} from "../../layout/UILayout";
import { Link } from "react-router-dom";

export default function Lesson3_Topic4() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1" className="w-full">
          <Topic>JavaScript - Break Statements</Topic>
          <Description>
            In JavaScript, the break statement ends the loop or switch case.
            declaration. When the loop and the break statement are used
            together, the Control flow exits the loop and carries out the
            remaining different code.
          </Description>

          <Description>
            Another way to jump a labeled statement is with the break statement.
            when used inside that phrase with a label. It's a helpful resource
            for regulating the JavaScript code's execution flow.
          </Description>
          <Title>Syntax</Title>
          <Description>
            The syntax of break statement in JavaScript is as follows —
          </Description>

          <Code
            visibleButton={false}
            code={`break;
OR 
break[label];`}
          />

          <Description>
            The label is optional with a break statement.
          </Description>
          <Description>
            Note — In the next chapter, we Will learn to use the break statement
            with the label inside the loop.
          </Description>

          <img
            src="https://www.tutorialspoint.com/javascript/images/break_statement.jpg"
            alt="break statement"
            className="mt-4 border border-zinc-200 dark:border-zinc-800 w-[470px]"
          />

          <Description>
            <h1 className="text-xs italic underline text-zinc-600 dark:text-zinc-400 dark:hover:text-green-600">
              Reference:
              <Link to="https://www.tutorialspoint.com/javascript/javascript_break_statement.htm">
                https://www.tutorialspoint.com/javascript/javascript_break_statement.htm
              </Link>
            </h1>
          </Description>

          <Title>Example of `break` in a `for` Loop:</Title>
          <Description>
            {`
In this example, the loop stops when the value of \`i\` equals 5, even though the condition of the loop (\`i < 10\`) would normally continue to run until \`i\` reaches 9.
`}
          </Description>

          <Code
            code={`for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break;  // Exits the loop when i equals 5
  }
  console.log(i);
}
`}
          />

          <Output
            output={`0
1
2
3
4`}
          />

          <CodeEditor />

          <Description>
            Once the `break` statement is encountered at `i = 5`, the loop
            terminates, and no further iterations are executed.
          </Description>

          <Title>Example of `break` in a `while` Loop:</Title>
          <Code
            code={`let count = 0;
while (count < 10) {
  if (count === 7) {
    break;  // Terminates the loop when count equals 7
  }
  console.log(count);
  count++;
}
`}
          />

          <Output
            output={`0
1
2
3
4
5
6
`}
          />
          <CodeEditor />

          <Description>
            Here, the loop stops as soon as the `count` variable reaches 7.
          </Description>
        </section>

        <section id="section2">
          <Title>Continue Statement</Title>
          <Description>
            The `continue` statement is used to skip the current iteration of
            the loop and jump to the next iteration. Unlike `break`, `continue`
            doesn’t terminate the loop; instead, it allows the loop to skip
            certain conditions while continuing to iterate.
          </Description>
          <Title>Syntax</Title>
          <Highlight>continue</Highlight>
          <Description>
            The `continue` statement is often used in conjunction with an `if`
            statement to determine if a particular iteration should be skipped
          </Description>
          <Title>Example of `continue` in a `for` Loop:</Title>
          <Description>
            This loop prints the numbers 0 to 4, but skips printing the number
            3.
          </Description>
          <Code
            code={`for (let i = 0; i < 5; i++) {
  if (i === 3) {
    continue;  // Skips the iteration where i equals 3
  }
  console.log(i);
}
`}
          />
          <Output
            output={`0
1
2
4
`}
          />
          <CodeEditor />

          <Description>
            The number 3 is skipped because the `continue` statement causes the
            loop to bypass the rest of the code in that iteration and move on to
            the next iteration.
          </Description>
          <Title>Example of `continue` in a `while` Loop:</Title>

          <Code
            code={`let x = 0;
while (x < 5) {
  x++;
  if (x === 2 || x === 3) {
    continue;  // Skips the numbers 2 and 3
  }
  console.log(x);
}
`}
          />

          <Output
            output={`1
4
5
`}
          />
          <CodeEditor />

          <Description>
            The `continue` statement skips the iterations where `x` equals 2 or
            3, so those values are not printed.
          </Description>
        </section>

        <section id="section3">
          <Title>Continue with Nested Loops</Title>

          <Description>
            The `continue` statement can be used inside nested loops to control
            which iteration of the inner or outer loop should be skipped.
          </Description>

          <Title>Example:</Title>

          <Code
            code={`for (let x = 1; x <= 5; x++) {
  for (let y = 1; y <= 5; y++) {
    if (x === 2 || y === 3) {
      continue;  // Skips iteration when x equals 2 or y equals 3
    }
    console.log(\`x = \${x}, y = \${y}\`);
  }
}
`}
          />

          <Output
            output={`x = 1, y = 1
x = 1, y = 2
x = 1, y = 4
x = 1, y = 5
x = 3, y = 1
x = 3, y = 2
x = 3, y = 4
x = 3, y = 5
x = 4, y = 1
x = 4, y = 2
x = 4, y = 4
x = 4, y = 5
x = 5, y = 1
x = 5, y = 2
x = 5, y = 4
x = 5, y = 5
`}
          />
          <CodeEditor />

          <Description>
            In this example, the `continue` statement skips the iterations where
            `x` equals 2 and `y` equals 3. The outer loop (`x`) skips the
            iteration when `x === 2`, and the inner loop (`y`) skips when `y ===
            3`.
          </Description>

          <Title>Continue with Label Statement</Title>
          <Description>
            The `continue` statement can also be used with a label to control
            which loop should be continued in nested loops.
          </Description>
          <Title>Example</Title>

          <Code
            code={`outerLoop: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (i === j) {
      continue outerLoop;  // Continues the outer loop
    }
    console.log(\`i = \${i}, j = \${j}\`);
  }
}
`}
          />

          <Output
            output={`i = 0, j = 1
i = 0, j = 2
i = 1, j = 0
i = 2, j = 0
i = 2, j = 1
`}
          />
          <CodeEditor />

          <Description>
            In this case, when `i === j`, the `continue` statement tells the
            program to skip the current iteration of the outer loop
            (`outerLoop`) and move to the next iteration.
          </Description>

          <Title>Key Points:</Title>

          <List
            items={[
              `The \`break\` statement is used to exit a loop entirely.`,
              `The \`continue\` statement skips the rest of the current iteration and moves to the next iteration of the loop.`,
              `Both \`break\` and \`continue\` are useful for controlling the flow of loops in JavaScript.`,
            ]}
          />
        </section>
        <div className="flex items-center justify-end w-full gap-3">
          <QuizButton text="Lesson 3" link="/quiz/lesson3" />
          <NextButton
            link="/learn-js/functions"
            text="Function Declaration and Expression"
          />
        </div>
      </div>
    </div>
  );
}
