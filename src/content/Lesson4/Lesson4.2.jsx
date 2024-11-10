import {
  Topic,
  Description,
  Title,
  Code,
  List,
  NextButton,
  Output,
  Highlight,
  CodeEditor,
} from "../../layout/UILayout";

export default function Lesson4_Topic2() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1" className="w-full">
          <Topic>Parameters and Return Values</Topic>
          <Description>
            The variables that are provided in the function definition of a
            JavaScript function are known as parameters. These variables are
            used to hold values that will be passed to the function when it is
            called. Return values are the values that a function outputs and
            delivers back to the code that invoked the function, using the
            return statement.
          </Description>
          <Title>Function Parameters</Title>
          <List
            items={[
              "Parameters are declared within the parentheses of the function declaration.",
              "They stand in for the values that the function anticipates getting when it is called.",
            ]}
          />
          <Title>Passing Arguments</Title>
          <List
            items={[
              "Arguments are the actual values passed to the function parameters when the function is invoked.",
            ]}
          />
          <Title>Return Values</Title>
          <List
            items={[
              "A function can return a value using the return keyword. Once a return statement is executed, the function stops, and the specified value is returned to the calling location.",
            ]}
          />
          <Title>Default Parameters</Title>
          <List
            items={[
              "Default values can be assigned to parameters in case no argument is provided for that parameter.",
            ]}
          />
          <Title>Example Code</Title>
          <Code
            code={`// function that take two parameters and return their sum

function addNumbers(a, b){
  return a + b; //returning the sum of a + b
}


// Calling the function arguments 5 and 3
let sum =  addNumbers(5, 1);
console.log(sum);`}
          />
          <Output output={`6`} />
          <CodeEditor />

          <Title>Explanation</Title>
          <Description>
            In this example, <Highlight>a</Highlight> and{" "}
            <Highlight>b</Highlight> are the parameters of the{" "}
            <Highlight>addNumbers</Highlight> function, representing the values
            that the function will process. When the function is called with{" "}
            <Highlight>addNumbers(5, 3)</Highlight>, the numbers 5 and 3 are
            passed as arguments to the function. Inside the function, the values
            of <Highlight>a</Highlight> and <Highlight>b</Highlight>
            are added together, and the result is returned. In this case, the
            sum of 5 and 3 is 8. This returned value is stored in the variable
            <Highlight> sum</Highlight>, and it is printed to the console using{" "}
            <Highlight>console.log()</Highlight>.
          </Description>
        </section>

        <NextButton link="/learn-js/arrow-functions" text="Arrow Functions" />
      </div>
    </div>
  );
}
