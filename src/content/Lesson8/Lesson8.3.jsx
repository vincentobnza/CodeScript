import {
  Topic,
  Description,
  Title,
  Code,
  Example,
  Image,
  List,
  Text,
  Note,
  ListItem,
  NextButton,
  QuizButton,
  Output,
  Highlight,
} from "../../layout/UILayout";
import { Link } from "react-router-dom";

export default function Lesson8_Topic3() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>Custom Errors</Topic>
          <Description>
            Custom errors allow you to create more specific and informative
            error messages that can help you debug and troubleshoot your code
            more effectively. They provide a way to handle errors that are not
            covered by built-in JavaScript errors.
          </Description>

          <Description>
            To create a custom error in JavaScript, you can extend the built-in
            Error object.
          </Description>

          <Code
            code={`function CustomError(message){
  this.message = message;
  this.name ="Custom Error";
  this.stack = (new Error()).stack; // Optionally include the stack trace
}

MyCustomError.prototype = Object.create(Error.prototype);
MyCustomError.prototype.constructor = CustomError;`}
          />

          <Description>Using Custom Errors</Description>
          <Description>
            After creating a custom error, you may use the throw keyword to
            throw it:
          </Description>
          <Code
            code={`if (condition) {
  throw new CustomError('Custom error message');
}
`}
          />

          <Title>Handling Custom Errors:</Title>
          <Description>
            You can catch custom errors using a try...catch block:
          </Description>

          <Code
            code={`try {
  // Code that might throw a custom error
} catch (error) {
  if (error instanceof MyCustomError) {
    console.error('Caught a custom error: ', error.message);
  } else {
    console.error('Caught a different error: ', error.message);
  }
}
`}
          />

          <Title>Best Practices</Title>

          <List
            items={[
              `Make use of informative and concise error messages that explain the mistake and its source.
Make unique error classes for particular situations: 
`,
              `To make the code more readable and organized, make distinct custom error classes for each kind of problem.`,
              `Think about utilizing a library: Some libraries offer extra capabilities for managing and generating bespoke errors, like formatting for stack traces or custom error codes.`,
              `Error handling best practices: Put in place suitable error handling techniques to keep your program from crashing and to give the user helpful feedback.`,
            ]}
          />
        </section>
        <section id="section2">
          <Title>Typical Errors</Title>

          <List
            items={[
              `Refrain from overusing custom errors: Too many custom errors can clog your code. Apply them sparingly to particular mistake situations`,
              `Ignoring custom errors: To avoid unexpected behavior, be sure to identify and address custom problems.`,
              `Error object incorrectly extended: Make sure you extend the Error object appropriately in order to inherit its methods and properties.`,
            ]}
          />
          <Code
            code={`class InvalidInputError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidInputError';
  }
}

function validateInput(value) {
  if (!value) {
    throw new InvalidInputError('Input is required');
  }
}

try {
  validateInput('');
} catch (error) {
  console.log('Error: ', error.message);
}
`}
          />
          <Description>
            You can effectively use custom errors to improve the error handling
            and debugging capabilities of your JavaScript code by adhering to
            these principles.
          </Description>

          <QuizButton text="Lesson 8" link="/quiz/lesson8" />
        </section>
      </div>
    </div>
  );
}
