import {
  Topic,
  Description,
  Title,
  Code,
  List,
  NextButton,
  TopicRef,
} from "../../layout/UILayout";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson6_Topic2() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>DOM Elements</Topic>
          <Title>Finding HTML Elements</Title>
          <Description>
            JavaScript is frequently used to manipulate HTML elements. You must
            first locate the elements in order to perform this. To do this,
            there are multiple options:
          </Description>
          <List
            items={[
              "Finding HTML elements by id",
              "Finding HTML elements by tag name",
              "Finding HTML elements by class name",
              "Finding HTML elements by css selectors",
              "Finding HTML elements by HTML object collections",
            ]}
          />
          <Title>Finding HTML Element by Id</Title>
          <Description>
            Using the element id is the simplest method for locating an HTML
            element in the DOM.
          </Description>
          <Description>
            The element with id="btn " is located in this example:
          </Description>
          <Code code={`const element = document.getElementById("btn");`} />
          <Title>Finding HTML Elements by Tag Name</Title>
          <Description>{`   This example finds all <p> elements:`}</Description>
          <Code
            code={`const element = document.getElementsByTagName("p");
`}
          />
          <Title>Finding HTML Elements by Class Name</Title>
          <Description>
            Use getElementsByClassName() to locate all HTML elements that share
            the same class name.
          </Description>
          <Description>
            This example returns a list of all elements with class="ball".
          </Description>
          <Code code={`const x = document.getElementsByClassName("ball");`} />
          <Title>Finding HTML Elements by CSS Selectors</Title>

          <Description>
            Use the querySelectorAll() method to retrieve all HTML elements (id,
            class names, types, attributes, values of attributes, etc.) that
            match a given CSS selector. This example gives a list of all
            components with class="points ".
          </Description>

          <Code code={`const x = document.querySelectorAll("p.intro");`} />

          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/WjxQRfZfZnw?si=rNgABfICz0RoyWhn"
            thumbnailSrc="https://img.youtube.com/vi/WjxQRfZfZnw/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=WjxQRfZfZnw"
          />
          <TopicRef reference="https://www.w3schools.com/js/js_htmldom_elements.asp" />
        </section>
        <NextButton
          link="/learn-js/event-listeners-handling-events"
          text="Event Listeners and Handling Events"
        />
      </div>
    </div>
  );
}
