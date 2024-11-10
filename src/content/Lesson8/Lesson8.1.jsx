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

export default function Lesson8_Topic1() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>try, catch, finally</Topic>
          <Title>JavaScript try...catch...finally Statement</Title>
          <Description>
            Exceptions are a specific kind of error that are handled by the try,
            catch, and finally blocks. Prior to studying them, you should be
            aware of the different kinds of programming errors.
          </Description>
          <Title>Programming errors can be of two types:</Title>
          <Description>
            <Highlight>Syntax errors</Highlight>, which occur when a program
            writes code. For instance, if you write console.log('your result');,
            the program will throw a syntax error because the word console is
            spelled incorrectly.
          </Description>

          <Description>
            <Highlight>Runtime errors</Highlight>, on the other hand, occur when
            a program executes and include things like calling an invalid
            function or variable.
          </Description>

          <Title>JavaScript Try Catch Statement</Title>
          <Code
            code={`try {
// body of try
}
catch (error) {
// body of catch
}`}
          />

          <Description>
            The try block contains the main code. If an error happens during the
            try block's execution, it moves to the catch block. In accordance
            with the catch statements, the catch block handles mistakes.
          </Description>
          <Description>
            The try block's code is run and the catch block is bypassed if there
            isn't an error.
          </Description>

          <Title>Example 1: Display Undeclared Variable</Title>
          <Code
            code={`const fname = 'John', lastname = 'Doe';

try{
  console.log(fname + lastname)

  console.log(a) // forgot to define variable a
}
catch(error){
  console.log('An error caught')
  console.log('Error message: ' + error);
}`}
          />

          <Output
            output={`JohnDoe
An error caught
Error message: ReferenceError: a is not defined`}
          />
          <CodeEditor />

          <Description>
            There is no definition for a variable in the program above. The
            software generates an error when you attempt to print the variable.
            The catch block catches that error.
          </Description>

          <section id="section2">
            <Title>JavaScript try...catch...finally Statement</Title>
            <Description>
              To manage exceptions, you may also utilize the
              try...catch...finally statement. The finally block executes both
              when the code runs successfully or if an error occurs.
            </Description>

            <Description>
              Try...catch...finally blocks have the following syntax:
            </Description>

            <Code
              code={`try {
  // try statements
} catch (error) {
  // catch statements
} finally {
  // codes that gets executed anyway
}
`}
            />

            <Title>try, catch, finally example</Title>
            <Code
              code={`const fname = 'John',
  lastname = 'Doe';

try {
  console.log(fname + lastname);

  console.log(a); // forgot to define variable a
} catch (error) {
  console.log('An error caught');
  console.log('Error message: ' + error);
}
finally{
  console.log('Finally statement will execute everytime')
}
`}
            />

            <Output
              output={`JohnDoe
An error caught
Error message: ReferenceError: a is not defined
Finally statement will execute everytime`}
            />
            <CodeEditor />

            <Description>
              An error happens in the program mentioned above, and the catch
              block handles it. Whether an error happens or the program runs
              well, the finally block will always run.
            </Description>

            <Description>
              <Highlight>Note:</Highlight>After the try statement, you must use
              the catch or finally statement. If not, Uncaught SyntaxError:
              Missing catch or finally after try will be thrown by the
              application.
            </Description>
          </section>

          <section id="section3">
            <Title>JavaScript try...catch in setTimeout</Title>
            <Description>
              The exception will not be caught by the try...catch if it occurs
              in "timed" code, such as setTimeout(). As an illustration,
            </Description>

            <Code
              code={`try{
  setTimeout(() =>{
    // error in the code
  }, 3000)
}catch(error){
  console.log("Wont work")
}`}
            />
            <CodeEditor />

            <Description>
              Because the function is called later and the engine has already
              exited the try..catch construct, the aforementioned try..catch
              will not function.
            </Description>

            <Description>
              To catch an exception inside a timed function, the try..catch
              block needs to be inside that function. As an illustration,
            </Description>

            <Code
              code={`setTimeout(() => {
  try {
    // error in the code
  } catch (error) {
    console.log('error is caught');
  }
}, 3000);
`}
            />
            <CodeEditor />
          </section>
        </section>
        <NextButton link="/learn-js/throwing-errors" text="Throwing Errors" />
      </div>
    </div>
  );
}
