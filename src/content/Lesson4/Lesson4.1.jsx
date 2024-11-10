import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  Output,
  Highlight,
  CodeEditor,
} from "../../layout/UILayout";

export default function Lesson4_Topic1() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1" className="w-full">
          <Topic>Function Declaration and Expression </Topic>
          <Description>
            Using the <Highlight>function</Highlight> keyword and giving the
            function a name is how you declare a function. As an illustration:
          </Description>

          <Code
            code={`function generateInfo(color){
  return \`Apple is color \${color}\`;
}

const apple = generateInfo("red");
console.log(apple);`}
          />

          <Output output={`Apple is color red`} />

          <CodeEditor />

          <Description>
            This code illustrates the use of the straightforward method
            `generateInfo`, which accepts the sole parameter `color`. The value
            of `color` is dynamically inserted into a string inside the function
            using a template literal. The string "Apple is color red" is
            returned by the function when it is called with the input "red"
            After that, the returned value is saved in the constant `apple`, and
            the message is sent to the console via `console.log(apple)`. The
            console then shows: `Apple is color red`.
          </Description>
        </section>

        <section id="section2">
          <Title>Function Expression</Title>
          <Description>
            In this case, you construct a function expression and bind it to a
            callable variable. There are two approaches to this.
          </Description>
          <Title>Function Expressions with the function keyword</Title>
          <Description>
            Using the function keyword without a name, which creates an
            anonymous function, is one method to accomplish this. How to do it
            is as follows:
          </Description>
          <Code
            code={`const generateInfo = function(color) {
  return \`Apple is color \${color}\`;
}

const apple = generateInfo("red");
console.log(apple);`}
          />

          <Output output={`Apple is color red`} />
          <CodeEditor />

          <Description>
            As you can see, the function keyword is present but the function
            name is missing. This turns it into an expression that needs to be
            assigned to a variable, just like we did with generateInfo.
          </Description>
          <Description>
            The <Highlight>function</Highlight> keyword, when used without a
            name, generates a function expression that must be assigned to a
            variable in order to avoid an error. This is what I mean:
          </Description>
          <Code
            code={`function greet(name) {
  return \`Hi my name is \${name}\`;
}`}
          />

          <Output
            output={`Syntax error: Function statements require a function name`}
          />
          <CodeEditor />

          <Description>
            <Highlight> A SyntaxError</Highlight>: Function statements require a
            function name is displayed. JavaScript treats it as a statement if
            it isn't assigned to a variable, thus as the error indicates, you
            need to supply the function name.
          </Description>

          <Description>
            However, you assign the expression when you assign it to a variable,
            and the variable (variable()) will then call the function expression
            that has been given to it, executing its logic.
          </Description>
        </section>

        <NextButton
          link="/learn-js/parameters-return-values"
          text="Parameters & Return Values"
        />
      </div>
    </div>
  );
}
