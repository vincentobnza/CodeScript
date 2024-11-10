import React from "react";
import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  QuizButton,
  List,
} from "../../layout/UILayout";

import HeroVideoDialog from "@/components/ui/HeroVideoDialog";
export default function Lesson1_Topic3() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <Topic>Adding JavaScript to Page</Topic>

        <Description>
          A web page can have JavaScript added in three different ways:
        </Description>

        <List
          items={[
            `JavaScript code is embedded in between a pair of <script> and </script> tags.`,
            `Use the src attribute of the <script> tag to load an external JavaScript file with the.js extension inside the page.`,
            `By putting JavaScript code within an HTML tag by utilizing the onclick, onmouseover, onkeypress, onload, and other special tag properties.`,
          ]}
        />

        <Description>
          The following sections will describe each of these procedures in
          detail:
        </Description>

        <section id="section1">
          <Title>Embedding the JavaScript Code</Title>
          <Description>
            {`By sandwiching the JavaScript code between the <script> and </script> tags, you can embed it straight into your webpages. The <script> tag instructs the browser to treat the statements it contains as executable script rather than HTML. As an illustration, consider this:`}
          </Description>
          <Code
            visibleButton={false}
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Embedded JavaScript</title>
  </head>
  <body>
    <script>
      let greetings = "Hello Developers !";
      document.write(greetings); //Prints Hello Developers
    </script>
  </body>
</html>
`}
            language={"html"}
          />

          <Description>
            In the example above, the JavaScript code will only print a text
            message to the webpage. You will learn what each of these JavaScript
            statements signifies in following chapters.
          </Description>
          <div className="relative flex flex-col w-full gap-3 p-5 mt-5 mb-3 border bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700">
            <h3 className=" text-zinc-700 dark:text-zinc-200">
              {`Note: The type attribute for <script> tag (i.e. <script type="text/javascript">) is no longer required since HTML5. JavaScript is the default scripting language for HTML5.`}
            </h3>
          </div>
        </section>
        <section id="section2">
          <Title>Calling an External JavaScript File</Title>
          <Description>
            {`Alternatively, you can save your JavaScript code in a different file with the.js extension and use the src property of the <script> tag in your document to call that file:`}
          </Description>

          <Code
            visibleButton={false}
            code={`<script src="src/script.js"></script>`}
          />
          <Description>
            If you wish to utilize the same scripts for several papers, this is
            helpful. It makes your website much easier to maintain and saves you
            from having to do the same activity repeatedly.
          </Description>

          <Description>
            Now let's create a "script.js" JavaScript file and add the following
            code to it:
          </Description>

          <Code
            visibleButton={false}
            code={`// function to display greetings

function Greetings(){
    alert("Hello Developers");
}

//Call function onClick of the button
document.getElementById("btn").onclick = greetings;`}
          />

          <Description>
            {`Now, you can use the <script> tag inside a web page to call this external JavaScript file, as shown here:`}
          </Description>

          <Code
            visibleButton={false}
            code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Including JavaScript File</title>
</head>
<body>
  <script src="script.js"></script>
</body>
</html>
`}
            language={"html"}
          />
        </section>

        <section id="section3">
          <Title>Placing the JavaScript Code Inline</Title>
          <Description>
            It is also possible to inject JavaScript code inline within an HTML
            element by using specific tag properties like onclick, onmouseover,
            onkeypress, onload, etc.
          </Description>

          <Description>
            But you should refrain from putting a lot of JavaScript code inline
            since it will clog up your HTML and make it harder to manage your
            JavaScript code. As an illustration, consider this:
          </Description>

          <Code
            visibleButton={false}
            code={`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
  <title>Inlining JavaScript</title>
</head>
<body>
  <button onclick="alert('Hello Developer')">Click ME</button>
</body>
</html>`}
          />

          <Description>
            When you click on the button element in the example above, an alert
            message will appear.
          </Description>

          <div className="relative flex flex-col w-full gap-3 p-5 mt-5 mb-3 border bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700">
            <h3 className=" text-zinc-700 dark:text-zinc-200">
              {`Note: You should always maintain a clear separation between your website's presentation (CSS), behavior (JavaScript), and content (i.e., HTML).`}
            </h3>
          </div>

          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/AD5hxsFJc4o?si=sWNaKq8tF2efwixI"
            thumbnailSrc="https://img.youtube.com/vi/AD5hxsFJc4o/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=AD5hxsFJc4o&t=15s"
          />
        </section>

        <div className="flex items-center justify-end w-full gap-3">
          <QuizButton text="Lesson 1" link="/quiz/lesson1" />
          <NextButton
            link="/learn-js/variables-data-types"
            text="Variables and Data Types "
          />
        </div>
      </div>
    </div>
  );
}
