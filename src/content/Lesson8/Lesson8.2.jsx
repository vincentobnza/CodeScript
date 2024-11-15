import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  Output,
  Highlight,
  CodeEditor,
  TopicRef,
} from "../../layout/UILayout";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson8_Topic2() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>Throwing Errors</Topic>
          <Description>
            You studied how to use the JavaScript try..catch statement to manage
            exceptions in the last topic. JavaScript provides a standard method
            for handling exceptions in the try and catch statements. On the
            other hand, user-defined exceptions can be passed using the throw
            statement.
          </Description>
          <Description>
            The throw statement in JavaScript manages user-defined exceptions.
            You can use the throw statement to manage an exception, for
            instance, if a given integer is divided by 0 and you need to treat
            Infinity as an exception.
          </Description>
          <Title>JavaScript throw statement</Title>
          <Description>The syntax of throw statement is:</Description>
          <Code code={`throw statement`} />
          <Description>
            Expression in this case indicates the exception's value. As an
            illustration,
          </Description>

          <Code
            code={`const num = 25;
throw num / 0`}
          />

          <Description>
            Note: The expression can be string, boolean, number, or object
            value.
          </Description>

          <Title>JavaScript throw with try...catch</Title>
          <Description>The syntax of try...catch...throw is:</Description>
          <Code
            code={`try {
  // body of try
  throw exception;
} catch (error) {
  // body of catch
}
`}
          />

          <Description>
            Observation: Upon execution, the throw statement moves to the catch
            block and out of the block, leaving the code below the throw
            statement unexecuted.
          </Description>

          <Title>Example 1: try...catch...throw Example</Title>
          <Code
            code={`const number = 40;
try {
  if (number > 50) {
    console.log('Success ');
  } else {
    // user-defined throw statement
    throw new Error('The number is low ');
    // if throw executes, the below code does not execute
    console.log("Hello");
  }
} catch (error) {
  console.log('An error caught ');
  console.log('Error message: ' + error);
}
`}
          />

          <Output
            output={`An error caught 
Error message: Error: The number is low `}
          />
          <CodeEditor />

          <Description>
            A condition is checked in the software mentioned above. An error is
            raised if the value is less than 51. And the error is thrown using
            the throw command.
          </Description>

          <Description>
            The expression "The number is low" is specified in the throw
            statement.
          </Description>

          <Description>
            <Highlight>Note:</Highlight> You can also use other built-in error
            constructors for standard errors: TypeError, SyntaxError,
            ReferenceError, EvalError, InternalError, and RangeError.
          </Description>
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/GvrapZbI_Jo?si=h72VTiQfmeX5ujvI"
            thumbnailSrc="https://img.youtube.com/vi/GvrapZbI_Jo/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=GvrapZbI_Jo"
          />

          <TopicRef reference="https://www.programiz.com/javascript/throw?fbclid=IwZXh0bgNhZW0CMTEAAR21U95zcfYFXuayS_TkuNxf5D1OuweZL-0qNYyjWjBcbWcFF5EOlA9b4Vw_aem_u2Wwo_0RALoxbuuM5-RY_w" />
        </section>
        <NextButton link="/learn-js/custom-errors" text="Custom Errors" />
      </div>
    </div>
  );
}
