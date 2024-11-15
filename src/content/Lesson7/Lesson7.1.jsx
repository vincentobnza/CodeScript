import {
  Topic,
  Description,
  Title,
  Code,
  List,
  NextButton,
  Highlight,
  TopicRef,
} from "../../layout/UILayout";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson7_Topic1() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>Event Types</Topic>

          <Description>
            The change in the state of an object is known as an{" "}
            <Highlight>Event</Highlight>. In html, there are various events
            which represents that some activity is performed by the user or by
            the browser. When javascript code is included in HTML, js react over
            these events and allow the execution. This process of reacting over
            the events is called <Highlight>Event Handling</Highlight>. Thus, js
            handles the HTML events via <Highlight>Event Handlers</Highlight>.
          </Description>

          <Description>
            JavaScript Events are the action that happens due to the interaction
            of the user through the browser with the help of any input field,
            button, or any other interactive element present in the browser.
          </Description>

          <Description>
            Events help us to create more dynamic and interactive web pages.
            Also, these events can be used by the eventListeners provided by the
            JavaScript.
          </Description>

          <Title>Mouse Events</Title>
          <Description>
            These are the events that are triggered when there is any
            interaction due to the mouse.
          </Description>

          <Title>onclick Event</Title>
          <Description>
            It is mainly used for buttons, when the button is clicked this event
            can be used. we can directly use this event in HTML. Also, we can
            use this event by the use of JavaScript by using the
            addEventListener.
          </Description>

          <Description>
            <Highlight>Example</Highlight>: This example shows the use of
            onclick event to show the text on the screen.
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
    <h1>OnClick event in HTML</h1>
    <button id="myBtn" onclick="handleClick()">Click me</button>
    <p id="sampleText"></p>

    <script>

      function handleClick(event){
        document.getElementById("#sampleText").innerHTML = "Text is Changed"
      }
    </script>
  </body>
</html>
`}
          />

          <Title>onclick event</Title>
          <Description>mouseover Event and mouseout Event:</Description>
          <Description>
            <Highlight>onmouseover</Highlight> event triggers when there is any
            hovering occurring on the specific element that is under
            observation. and onmouseout event occurs when the user takes out the
            hovered mouse from the observable area or element.
          </Description>

          <Description>
            <Highlight>Example: </Highlight>This example shows the use of the
            onmouseover and onmouseout event in JavaScript.
          </Description>

          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <h1 id="text1"></h1>

    <script>

      document.getEleemntById('#text1').addEvebtListener("mouseover", over)
      document.getEleemntById('#text1').addEvebtListener("mouseout", out)

            function over(event){
              document.getElementById("#text1").style.SfontSize = "40px";
            }
             function out(event){
              document.getElementById("#text1").style.SfontSize = "20px";
            }
    </script>
  </body>
</html>
`}
          />

          <Title>ondblckick Event</Title>
          <Description>
            The ondblclick triggers when user Double clicked on the element.s
          </Description>
          <Title>Example:</Title>
          <Description>
            In the give example , There is button Double click me when we
            Double-clicked on that the alert message will be shown.
          </Description>

          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="src/style.css" />
  </head>
  <body>
    <button ondblclick="alert('Double Click Event is Activated')">
      Click me!
    </button>
  </body>
</html>
`}
          />
        </section>

        <section id="section2">
          <Title>Keyboard Events</Title>
          <Description>
            The events that occurs because of the keys present in the keyboard
            are considered as keyboard events. these events include keypress,
            keydown and keyup actions. They all may look like the same but their
            behaviour is little bit different from each other.
          </Description>

          <Title>keypress event</Title>
          <Description>
            This event occurs when a user press any of the key present in his
            keyboard that generates a character value. So, when the user will
            press the key it will detect as keypress event.
          </Description>

          <Title>Example:</Title>

          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Keypress Event</title>
  </head>
  <body>
    <input type="text" id="keypressInput" placeholder="Type something..." />
    <script>
      document.getElementById("keypressInput").addEventListener("keypress", function(event) {
          console.log("Keypress event triggered: " + event.key);
      });
    </script>
  </body>
</html>
`}
          />

          <Title>keydown event</Title>
          <Description>
            This event occurs when a user presses the key on keyboard it
            immideatly triggers the event and it does not require any kind of
            character production.
          </Description>

          <Title>Example:</Title>
          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Keydown Event</title>
  </head>
  <body>
    <input type="text" id="keydownInput" placeholder="Press any key..." />
    <script>
      document.getElementById("keydownInput").addEventListener("keydown", function(event) {
          console.log("Keydown event triggered: " + event.key);
      });
    </script>
  </body>
</html>
`}
          />
          <Title>keyup event</Title>
          <Description>
            This event occurs just after the keydown. means when a user releases
            the pressed key then this events triggered.
          </Description>

          <Title>Example:</Title>

          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Keyup Event</title>
  </head>
  <body>
    <input type="text" id="keyupInput" placeholder="Release the key..." />
    <script>
      document.getElementById("keyupInput").addEventListener("keyup", function(event) {
          console.log("Keyup event triggered: " + event.key);
      });
    </script>
  </body>
</html>
`}
          />
        </section>

        <section id="section3">
          <Title>Form Events</Title>
          <Description>
            Form events are triggered when users interact with form elements
            like text inputs, checkboxes, radio buttons, etc. JavaScript allows
            us to handle these events, ensuring real-time validation,
            interactivity, and better user experience.
          </Description>

          <Title>onsubmit Event</Title>
          <Description>
            he onsubmit event occurs when a form is submitted. It can be used to
            validate the form before it is sent to the server. If the form
            validation fails, the submission can be prevented.
          </Description>
          <Title>Example</Title>
          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Form Submit Event</title>
  </head>
  <body>
    <form id="myForm" onsubmit="return validateForm()">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" />
      <input type="submit" value="Submit" />
    </form>

    <script>
      function validateForm() {
        const name = document.getElementById("name").value;
        if (name === "") {
          alert("Name must be filled out");
          return false; // Prevent form submission
        }
        return true; // Allow form submission
      }
    </script>
  </body>
</html>
`}
          />
          <Title>onchange Event</Title>
          <Description>
            The onchange event occurs when the value of an input element, like a
            text box or select dropdown, is changed, and the user leaves the
            field. It's helpful for capturing user input changes without waiting
            for form submission.
          </Description>
          <Title>Example</Title>
          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OnChange Event</title>
  </head>
  <body>
    <label for="email">Email:</label>
    <input type="email" id="email" placeholder="Enter your email" onchange="handleChange()" />

    <script>
      function handleChange() {
        console.log("Email changed to:", document.getElementById("email").value);
      }
    </script>
  </body>
</html>
`}
          />
          <Title>onfocus and onblur Events</Title>
          <List
            items={[
              "The onfocus event is triggered when an input field gains focus.",
              "The onblur event occurs when the input field loses focus.",
            ]}
          />
          <Title>Example</Title>
          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Focus and Blur Events</title>
  </head>
  <body>
    <input type="text" id="focusInput" onfocus="focusFunction()" onblur="blurFunction()" placeholder="Focus on me!" />
    
    <script>
      function focusFunction() {
        console.log("Input gained focus");
      }

      function blurFunction() {
        console.log("Input lost focus");
      }
    </script>
  </body>
</html>
`}
          />
        </section>

        <section id="section4">
          <Title>Window Events</Title>

          <Description>
            Window events occur on the browser's window object. These events are
            triggered due to user actions like resizing, scrolling, loading, or
            closing the window.
          </Description>

          <Title>onload Event</Title>
          <Description>
            The onload event occurs when a web page has been completely loaded,
            including all its resources (images, CSS, etc.). This event is often
            used to trigger functions after a page has loaded.
          </Description>
          <Title>Example</Title>
          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OnLoad Event</title>
  </head>
  <body onload="pageLoaded()">
    <h1>Welcome to My Page!</h1>

    <script>
      function pageLoaded() {
        alert("The page has fully loaded!");
      }
    </script>
  </body>
</html>
`}
          />

          <Title>onresize Event</Title>
          <Description>
            The onresize event is triggered whenever the browser window is
            resized. It can be useful for responsive web design to adjust
            layouts dynamically
          </Description>
          <Title>Example</Title>
          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OnResize Event</title>
  </head>
  <body onresize="handleResize()">
    <h1>Resize the browser window to trigger the event.</h1>

    <script>
      function handleResize() {
        console.log("Window resized. Current width: " + window.innerWidth);
      }
    </script>
  </body>
</html>
`}
          />
          <Title>onscroll Event</Title>
          <Description>
            The onscroll event occurs when an element or the entire document is
            being scrolled.
          </Description>
          <Title>Example</Title>
          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OnScroll Event</title>
  </head>
  <body onscroll="scrollFunction()">
    <div style="height: 2000px; padding-top: 100px;">
      <h1>Scroll down to trigger the event!</h1>
    </div>

    <script>
      function scrollFunction() {
        console.log("You are scrolling!");
      }
    </script>
  </body>
</html>
`}
          />
          <Title>onbeforeunload Event</Title>
          <Description>
            The onbeforeunload event occurs when the user attempts to leave the
            page. It allows you to show a warning or message to confirm if the
            user really wants to leave.
          </Description>
          <Title>Example</Title>
          <Code
            code={`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>OnBeforeUnload Event</title>
  </head>
  <body>
    <script>
      window.onbeforeunload = function () {
        return "Are you sure you want to leave?";
      };
    </script>
  </body>
</html>
`}
          />

          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/xogpUfUL5kY?si=HGSYZ3zJ2P1nQAMJ"
            thumbnailSrc="https://img.youtube.com/vi/xogpUfUL5kY/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=xogpUfUL5kY"
          />

          <TopicRef reference=" https://www.geeksforgeeks.org/what-are-javascript events/?ref=oin_asr7#keyboard-events" />
        </section>
        <NextButton
          link="/learn-js/event-bubbling-capturing"
          text="Event Bubbling And Capturing"
        />
      </div>
    </div>
  );
}
