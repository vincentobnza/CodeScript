import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  Output,
  CodeEditor,
  Highlight,
  TopicRef,
} from "../../layout/UILayout";
import { Link } from "react-router-dom";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson3_Topic3() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1" className="w-full">
          <Topic>Loops: for, while, do...while</Topic>
          <Title>What are loops?</Title>
          <Description>
            Loops are computer programs that execute a set of instructions or a
            block of code a certain number of times without having to write it
            again until a certain condition is met. In other words, loops let
            your code execute one or more statements as many times as desired.
          </Description>

          <Title>For Loops in JavaScript</Title>
          <Description>
            The for loop is an iterative statement which you use to check for
            certain conditions and then repeatedly execute a block of code as
            long as those conditions are met.
          </Description>
          <img
            src="https://i0.wp.com/codeexercise.com/wp-content/uploads/2018/12/JavaScript-For-Loop.jpg?resize=425%2C288"
            alt="for loop"
            className="mt-4 border border-zinc-200 dark:border-zinc-800 w-[470px]"
          />

          <Description>
            <h1 className="text-xs italic underline text-zinc-600 dark:text-zinc-400 dark:hover:text-green-600">
              Reference:
              <Link to="https://codeexercise.com/about-for-loops-with-example-in-javascript/">
                https://codeexercise.com/about-for-loops-with-example-in-javascript/
              </Link>
            </h1>
          </Description>
        </section>

        <section id="section2">
          <Title>Syntax</Title>
          <Code
            code={`for(initialExpression; condition; updateExpression){
  // for loop body: statement
}`}
          />
          <Description>
            The code block above is the standard syntax used by for loop. Let's
            look at each parameter to see what it means and what it does:
          </Description>
          <Description>
            <Highlight>initialExpression</Highlight>: This is used to set the
            value of a counter variable, and it is only evaluated once, before
            the loop starts. Depending on the scope, these counter variables are
            usually declared with the var or let keywords.
          </Description>
          <Description>
            <Highlight>condition</Highlight>: This is a constant-evaluation
            expression that determines whether the loop should be executed. In
            simple terms, if this condition returns true, the for loop's block
            of code is executed. If it returns false, the for loop is
            terminated.
          </Description>
          <Description>
            <Highlight>updateExpression</Highlight>: This is commonly used to
            update or increment the initialExpression counter variable. In other
            words, when the condition is true, it updates the value of the
            initialExpression.
          </Description>
          <Description>Examples</Description>
          <Title>How to Display Text Multiple Times</Title>
          <Description>
            Let’s start by displaying some text several times until our
            condition is met.
          </Description>
          <Code
            code={`for(let i = 0; i < 3; i++){
  let name = "Monkey D. Luffy";
  console.log("I'm " + name + " and I'm gonna be King of the Pirates!")
}`}
          />
          <Output
            output={`I'm Monkey D. Luffy and I'm gonna be King of the Pirates!
I'm Monkey D. Luffy and I'm gonna be King of the Pirates!
I'm Monkey D. Luffy and I'm gonna be King of the Pirates!`}
          />

          <CodeEditor />
          <Title>How to Display a Sequence of Numbers with a For Loop</Title>
          <Description>
            This time around, let’s display a sequence of numbers by displaying
            the iteration value.
          </Description>
          <Code
            code={`for(let i = 1; i <= 5; i++){
  console.log(i) // printing the value of i
}`}
          />
          <Output
            output={`1
2
3
4
5`}
          />
          <CodeEditor />

          <Title>How to Display a Sequence of Even Numbers</Title>
          <Description>
            Let’s now display a sequence of even numbers only by displaying the
            iteration value:
          </Description>

          <Code
            code={`// print even number from 0 to 10

for(let i = 0; i <= 10; i+=2){
  console.log(i)
}
`}
          />
          <Output
            output={`0
2
4
6
8
10`}
          />
          <CodeEditor />

          <Title>How to Break a For Loop Operation</Title>
          <Description>
            So far, we have seen how to create a for loop, but it’s also
            important to mention that we can break out of a loop using break.
            The break statement is used to terminate the loop immediately when
            it is encountered.
          </Description>

          <Code
            code={`for(let i = 0; i <= 10; i+=2){
  if(i == 8){
    break;
  }
  console.log(i)
}`}
          />

          <Output
            output={`0
2
4
6`}
          />

          <CodeEditor />
        </section>

        <section id="section3">
          <Title>while loop</Title>
          <Description>
            The most basic loop in JavaScript is the while loop which would be
            discussed in this chapter. The while loop is an entry-controlled
            loop.
          </Description>
          <Description>
            The purpose of a while loop is to execute a statement or code block
            repeatedly as long as an expression is true. Once the expression
            becomes false, the loop terminates.
          </Description>

          <Title>Flow Chart</Title>
          <Description>
            The flow chart of while loop looks as follows −
          </Description>

          <div className="mt-4 w-[470px] bg-white h-[380px] grayscale border border-zinc-200 dark:border-zinc-800">
            <img
              src="https://www.programiz.com/sites/tutorial2program/files/javascript-while-loop_0.png"
              alt="while loop"
              className="object cover"
            />
          </div>
          <Description>
            <h1 className="text-xs italic underline text-zinc-600 dark:text-zinc-400 dark:hover:text-green-600">
              Reference:
              <Link to="https://www.programiz.com/javascript/while-loop">
                https://www.programiz.com/javascript/while-loop
              </Link>
            </h1>
          </Description>
          <Title>Syntax</Title>
          <Description>
            The syntax of while loop in JavaScript is as follows −
          </Description>
          <Code
            code={`while(expression){
  // Statements to be executed if expression is true
}`}
          />

          <Title>Example</Title>
          <Description>
            In the example below, we defined the 'count' variable and
            initialized it with 0. After that, we make iterations using the
            while loop until the value of the count is less than 10.
          </Description>
        </section>

        <section id="section4">
          <Title>do while loop</Title>

          <Description>
            The do...while loop is similar to the while loop except that the
            condition check happens at the endof the loop. This means that the
            loop will always be executed at least once, even
          </Description>

          <Title>Syntax</Title>
          <Description>
            The syntax for do-while loop in JavaScript is
          </Description>

          <Code
            code={`do {
  // Statement to be executed
}while(expression)`}
          />

          <Title>Example</Title>

          <Description>
            In the example below, we used the do...while loop and printed the
            results in the output until the valueof the count variable is less
            than 5. In the output, we can observe that it always executes for
            once, evenif the condition is false.
          </Description>

          <Code
            code={`let count = 1;

do {
  // Statement to be executed
  console.log("Current count: " + count);
  count++;
}while(count <= 5);

console.log("Count is stopped")`}
          />

          <Output
            output={`Current count: 1
Current count: 2
Current count: 3
Current count: 4
Current count: 5
Count is stopped`}
          />
          <CodeEditor />
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/OPdhb7n_oL4?si=lkqdwtQekFBJ8G7s"
            thumbnailSrc="https://img.youtube.com/vi/OPdhb7n_oL4/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=OPdhb7n_oL4"
          />

          <TopicRef reference="https://www.tutorialspoint.com/javascript/javascript_continue_statement.htm" />
        </section>
        <NextButton
          link="/learn-js/break-statements"
          text="JavaScript Break Statements"
        />
      </div>
    </div>
  );
}
