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

export default function Lesson7_Topic2() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>Event Bubbling and Capturing</Topic>
          <Description>
            The techniques that control the order in which events spread
            throughout the DOM hierarchy are event bubbling and capturing. An
            event on an element can either capture down from the root element to
            the target element or bubble up the DOM tree its parent elements. An
            element’s handlers are triggered when an event occurs on it,
            followed by those on its parents and all further ancestors.
          </Description>

          <Title>Event Bubbling</Title>
          <Description>
            {" "}
            Event bubbling is a phase of event propagation whereby, by default,
            all events bubble up to their ancestors; that is, if an event occurs
            on a specific element, it will propagate or bubble up to the
            ancestor or the parent elements in the DOM hierarchy.
          </Description>
          <Description>
            Imagine you have three boxes stacked on top of each other: a big box
            (A), a medium box (B), and a small box (C), it’s like clicking on
            all three boxes at once. This is because the click event “bubbles
            up” from the smallest box to the bigger ones, triggering actions (or
            “callback functions”) attached to each box.{" "}
          </Description>
          <Description>
            When an event occurs on an element, it first triggers the event
            handler on that element. Then, the event bubbles up the DOM tree to
            its parent elements, triggering their event handlers in the process.
          </Description>

          <Title>Example</Title>
          <Code
            code={`<div id="outer">
  <div id="inner">
    <button id="button">Click me</button>
  </div>
</div>

<script>
  document.getElementById("button").addEventListener("click", function() {
      console.log("Button clicked");
  });

  document.getElementById("inner").addEventListener("click", function() {
      console.log("Inner div clicked");
  });

  document.getElementById("outer").addEventListener("click", function() {
      console.log("Outer div clicked");
  });
</script>
`}
          />

          <Description>
            In this case, pressing the button will cause the following things to
            happen in that order:
          </Description>
          <List
            items={[
              "click on the button",
              "click on the inner div",
              "click on the outer div",
            ]}
          />
          <Description>
            Several acts can trigger an event. Time interval, mouse movements,
            and clicks are a few examples. Every time an event happens,
            JavaScript creates an event object. This object offers information
            about the event and has methods and properties. You can set a
            function that will be performed whenever the event takes place.
          </Description>
        </section>
        <section id="section2">
          <Title>Event Capturing</Title>
          <Description>
            When an event occur on an element, it first triggers the event
            handler on the root element. Then the event captures down the DOM
            tree to its child elements, triggering their event handlers in the
            process. Event capturing sometimes can be useful but it is rarely
            used In real code.
          </Description>
          <Description>
            The standard DOM Events describes 3 phases of event propagation:
          </Description>
          <List
            items={[
              "Capturing phase – the event goes down to the element.",
              "Target phase – the event reached the target element.",
              "Bubbling phase – the event bubbles up from the element.",
            ]}
          />

          <Code
            code={`elem.addEventListener(..., {capture: true})

// or, just "true" is an alias to {capture: true}
elem.addEventListener(..., true)
`}
          />
          <Description>
            There are two possible values of the capture option:
          </Description>
          <List
            items={[
              "If it’s false (default), then the handler is set on the bubbling phase.",
              "If it’s true, then the handler is set on the capturing phase.",
            ]}
          />

          <Description>
            Note that while formally there are 3 phases, the 2nd phase (“target
            phase”: the event reached the element) is not handled separately:
            handlers on both capturing and bubbling phases trigger at that
            phase.
          </Description>
        </section>

        <div className="w-full flex items-center gap-3 justify-end">
          <QuizButton text="Lesson 7" link="/quiz/lesson7" />
          <NextButton
            link="/learn-js/try-catch-finally"
            text="try, catch, finally"
          />
        </div>
      </div>
    </div>
  );
}
