import {
  Description,
  Title,
  Code,
  List,
  NextButton,
  QuizButton,
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

export default function Lesson6_Topic3() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Title>What Are DOM Events and Why Are They Useful?</Title>
          <Description>
            JavaScript code can be executed by using DOM events, which are
            signals made available by the browser.{" "}
          </Description>

          <Description>
            The user interacts with the application we've constructed by
            clicking buttons and entering text into input fields, among other
            interactions that result in these DOM events.
          </Description>

          <Description>
            You can tell JavaScript as a web developer to wait for a particular
            event and then take action in response to it.
          </Description>

          <Description>As an illustration: </Description>
          <List
            items={[
              "Does a paragraph's text alter when a button is clicked?",
              "Use the Fetch API to make a POST request after a form has been submitted.",
            ]}
          />

          <Description>
            I'll walk you through the process of utilizing JavaScript to listen
            for and react to DOM events in this article.
          </Description>
          <Title>How to Listen to DOM Events</Title>
          <Description>
            You must use the addEventListener() function to connect an event
            listener to an element in order to start listening for events.{" "}
          </Description>

          <Description>
            Two parameters are accepted by the addEventListener() method:{" "}
          </Description>

          <Description>
            The kind of incident that should be heard A procedure to be executed
            upon event triggering
          </Description>
          <Code
            visibleButton={false}
            code={`Element.addEventListener(type, function);`}
          />

          <Description>
            Referring back to the example, let's say you wish to alter a
            paragraph's text in response to a button element being clicked.
            Here's how to go about it:
          </Description>

          <Code
            code={`<body>
                
  <p id="myParagraph">This is an example paragraph</p>
  <button id="changeText">Change Text</button>

  <script>
    const button = document.querySelector("#changeText");
    function newText(event){
      const p =document.querySelector("#myParagraph");
      p.innerText = "The text has been changed";
    }
    button.addEventListener("click", newText);
  </script>

</body>
`}
          />

          <Description>
            The script element must be used as demonstrated above in order to
            add JavaScript code to an HTML document.
          </Description>

          <Description>
            Using the document.querySelector() function, the button element is
            chosen, and the addEventListener() method is then invoked on the
            element. This indicates that an event listener is connected to the
            button.
          </Description>

          <Description>
            Initially, you designate the kind of event to be attended to—in this
            example, a click event. The function to be executed when that event
            occurs is then specified.
          </Description>

          <Description>
            The newText function in the aforementioned code will be used when
            the click event is triggered.
          </Description>

          <Description>
            An event object containing details about the triggered event will
            also be sent by the event listener. This is the reason the newText
            function above has an event parameter.
          </Description>

          <Description>
            To view the event's specifics, log it to the console:
          </Description>

          <Code
            code={`function newText(event){
  console.log(event);
}`}
          />

          <Description>
            You may listen to a lot of events through the internet. When
            creating a web application, you could require the following
            frequently occurring events:
          </Description>
          <Table
            aria-label="Example static collection table"
            className="border border-zinc-200 dark:border-zinc-700 rounded-2xl"
          >
            <TableHeader>
              <TableColumn>Event</TableColumn>
              <TableColumn>Event is Fired</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>click</TableCell>
                <TableCell>
                  There are various events you may listen to in the browser.
                  When creating a web application, you could require the
                  following frequently occurring events:
                </TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>mousemove</TableCell>
                <TableCell>When you move the mouse cursor</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>mouseover</TableCell>
                <TableCell>
                  When an element is being highlighted with the mouse.
                  Comparable to the CSS hover state
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>mouseout</TableCell>
                <TableCell>
                  When your mouse cursor moves outside the boundaries of an
                  element
                </TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell>dblclick</TableCell>
                <TableCell>When you click twice</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell>DOMContentLoaded</TableCell>
                <TableCell>When the DOM content is fully loaded</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell>keydown</TableCell>
                <TableCell>When you press a key on your keyboard</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell>keyup</TableCell>
                <TableCell>When you release a key on your keyboard</TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell>submit</TableCell>
                <TableCell>When a form is submitted</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
        <section id="section2">
          <Title>Keyboard Events</Title>
          <Description>
            You may monitor the keydown and keyup events on the keyboard, which
            occur when a key is pressed and released, respectively.
          </Description>
          <Description>
            Run the following code from the console to see an example:
          </Description>

          <Code
            visibleButton={false}
            code={`document.addEventListener('keydown', event => {
  console.log(\`A key is pressed: \${event.key}\`);
});

document.addEventListener('keyup', event => {
  console.log(\`A key is released: \${event.key}\`);
});
`}
          />

          <Description>
            Observe that when you press a key, the 'keydown' log appears
            immediately, whereas the 'keyup' log appears only when the key is
            released.
          </Description>

          <Description>
            Since the entire website should be able to listen to the keyboard
            events, they are typically tied to the document object rather than a
            particular element.
          </Description>
        </section>

        <section id="section3">
          <Title>Mouse Events</Title>
          <Description>
            Aside from keyboard events, the DOM also provides a way to track any
            mouse events.
          </Description>
          <Description>
            The most common mouse events that you can track are:
          </Description>

          <List
            items={[
              "mousedown – the mouse button was pressed",
              "mouseup – the mouse button was released",
              "click - a click event",
              "dblclick – a double click event",
              "mousemove – when the mouse is moved over the element",
              "contextMenu – when the context menu is opened, for example on a right mouse button click.",
            ]}
          />

          <Title>Example</Title>
          <Code
            visibleButton={false}
            code={`document.addEventListener('mousedown', event => {
  console.log(\`The mouse is pressed: \${event.key}\`);
});

document.addEventListener('mouseup', event => {
  console.log(\`The mouse is released: \${event.key}\`);
});
`}
          />
        </section>

        <section id="section4">
          <Title>How to Listen to Events using HTML Attributes</Title>
          <Description>
            You can listen to events in addition to utilizing the
            addEventListener() method by giving your HTML elements the
            on[eventname] property.
          </Description>

          <Description>
            Let us say, for instance, that you wish to hear a button click. The
            onclick attribute can be added to your button in the following ways:
          </Description>

          <Code
            visibleButton={false}
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <button onclick="handleClick()">Click me</button>

    <script>
      function handleClick(event){
        alert('The button is clicked')
      }
    </script>
  </body>
</html>
`}
          />

          <Description>
            We add the onclick property and pass the handleClick() code to the
            button element mentioned before. The handleClick() function will be
            used when we click the button. JavaScript allows you to add the
            onclick attribute in the following ways as well:
          </Description>

          <Code
            visibleButton={false}
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <button id="myBtn" onclick="handleClick()">Click me</button>

    <script>
      let btn = document.querySelector('#btn');
      btn.onclick = handleClick;

      function handleClick(event){
        alert("The button is click!")
      }
    </script>
  </body>
</html>
`}
          />

          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/XF1_MlZ5l6M?si=vYh0Pf3HXCZmKAT1"
            thumbnailSrc="https://img.youtube.com/vi/XF1_MlZ5l6M/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=XF1_MlZ5l6M"
          />

          <TopicRef reference="https://www.freecodecamp.org/news/dom-events-and-javascript-event-listeners/" />
        </section>

        <div className="flex items-center justify-end w-full gap-3">
          <QuizButton text="Lesson 6" link="/quiz/lesson6" />
          <NextButton link="/learn-js/event-types" text="Event Types" />
        </div>
      </div>
    </div>
  );
}
