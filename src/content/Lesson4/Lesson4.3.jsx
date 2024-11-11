import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  QuizButton,
  Output,
  Highlight,
  CodeEditor,
} from "../../layout/UILayout";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson4_Topic3() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1" className="w-full">
          <Topic>Arrow Functions</Topic>
          <Title>Basic Syntax</Title>
          <Description>
            {`Writing functions is made shorter with the arrow function syntax. Between the parameters and the function body, it makes use of the => operator. Arrow functions are particularly helpful for writing short, one-line functions since they do not require the function keyword.`}
          </Description>

          <Code
            code={`// Traditional Function Expression
const sum = function(a, b){
  return a + b;
}

// Arrow function equivalent
const sumArrow = (a, b) => a + b;

console.log(sum(2, 3));
console.log(sumArrow(2, 3));`}
          />

          <Output
            output={`5
5`}
          />
          <CodeEditor />

          <Description>
            In the example, <Highlight>sumArrow</Highlight> is a compact version
            of sum, doing the same operation but with less code.
          </Description>
        </section>

        <section id="section2">
          <Title>Parameters in Arrow Functions</Title>
          <Description>
            Regular functions and arrow functions handle parameters in a similar
            way. Parentheses are not necessary when there is only one parameter.
            Parentheses are necessary, though, if there are none or more than
            one parameter.
          </Description>

          <Code
            code={`// Single parameter without parenthesis
const double = x => x * 2;
console.log(double(5));

// Multiple parameters require parentheses
const add = (a, b) => a + b;
console.log(add(4, 6));

// No parameters, parentheses are required
const greet = ()=> "Hello World";
console.log(greet());`}
          />

          <Output
            output={`10
10
Hello World`}
          />
          <CodeEditor />

          <Description>
            The parentheses in the first function, double, can be removed
            because it only has one parameter. Parentheses are required since
            add and greet can have numerous parameters or none at all.
          </Description>
        </section>

        <section id="section3">
          <Title>Return Values</Title>
          <Description>
            Both implicit and explicit values can be returned by arrow
            functions. The value of an expression that makes up the function
            body is automatically returned (implicit return). The method needs
            an explicit return statement if it has a block body {}.
          </Description>

          <Code
            code={`// Implicit return - no need for the \\\`return\\\` keyword
const square = x => x * x;
console.log(square(4))

// Explicit return - necessary when using a block body
const multiply = (a, b) => {
  const result = a * b;
  return result; // Explicit return
}

console.log(multiply(3, 7))`}
          />

          <Output
            output={`16
21`}
          />
          <CodeEditor />

          <Description>
            The <Highlight>square</Highlight> function returns the value of{" "}
            <Highlight>x * x </Highlight>without using{" "}
            <Highlight>return</Highlight>, while <Highlight>multiply</Highlight>{" "}
            requires the <Highlight>return</Highlight> keyword since it has a
            block body.
          </Description>
        </section>

        <section id="section4">
          <Title>
            The <b className="text-green-600 dark:text-green-400">this</b>{" "}
            Context
          </Title>
          <Description>
            Arrow functions are not context-bound on their own. Rather, they
            extract this value from the context around them (lexical this). This
            behavior is very helpful in scenarios such as inside callbacks or
            event handlers where you need to keep the value of this from the
            external scope.
          </Description>

          <Code
            code={`// Object with a method using a regular function

const obj = {
  value: 10,
  regularFunc: function(){
    setTimeout(function(){
      console.log(this.value); //undefined, 'this' refers to the global object
    }, 100);
  }
}

obj.regularFunc();

// Object with a method using an arrow function

const objArrow = {
  value: 20,
  arrowFunc: function(){
    setTimeout(()=>{
      console.log(this.value);
    }, 100);
  }
}
objArrow.arrowFunc();`}
          />
          <CodeEditor />

          <Description>
            In the first case, this inside the regular function refers to the
            global object, so this.value is undefined. In the second case, the
            arrow function retains the this value from objArrow, printing 20.
          </Description>
        </section>

        <section id="section5">
          <Title>Arrow Functions in Callbacks</Title>
          <Description>
            Arrow functions, which have a short syntax and lexical binding that
            makes them easy to read, are frequently used in callbacks, such as
            in array methods (map, filter, and forEach).
          </Description>
          <Code
            code={`// Using a traditional function
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(function (num) {
  return num * 2;
})
console.log(doubled);

// Using and arrow function
const doubledArrow = numbers.map(num => num * 2);
console.log(doubledArrow);`}
          />

          <CodeEditor />

          <Description>
            Both functions return an array where each number is doubled, but the
            arrow function version is much shorter and easier to read.
          </Description>
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/22fyYvxz-do?si=llrj6oH4dK8B0MI4"
            thumbnailSrc="https://img.youtube.com/vi/22fyYvxz-do/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=22fyYvxz-do"
          />
        </section>
        <div className="flex items-center justify-end w-full gap-3">
          <QuizButton text="Lesson 4" link="/quiz/lesson4" />
          <NextButton
            link="/learn-js/objects-properties-methods"
            text="Object Properties and Methods"
          />
        </div>
      </div>
    </div>
  );
}
