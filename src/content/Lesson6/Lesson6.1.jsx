import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
} from "../../layout/UILayout";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson6_Topic1() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>What is DOM?</Topic>

          <Title>Document Object Model (DOM)</Title>

          <Description>
            Through its ability to represent a document's structure in
            memory—for example, the HTML that represents a web page—the Document
            Object Model (DOM) allows web pages to be connected to scripts or
            computer languages. Even though representing HTML, SVG, or XML
            documents as objects is not a feature of the core JavaScript
            language, the term is typically used in reference to JavaScript.
          </Description>

          <Description>
            A logical tree-based document is represented by the DOM. The tree's
            branches all come to a node, and nodes are made up of items. The
            tree can be accessed programmatically via DOM techniques. You can
            alter the document's content, style, or structure with them.
          </Description>

          <Title>HTML DOM</Title>
          <Description>
            The Document interface, which is expanded by the HTML specification
            to include numerous HTML-specific capabilities, is used to describe
            a document that contains HTML. The HTMLElement and its subclasses,
            which each represent an element or a collection of closely related
            elements, are specifically improved versions of the Element
            interface.
          </Description>

          <Description>
            Access to numerous browser functions, including tabs and windows,
            CSS styles and stylesheets, browser history, etc., is possible
            through the HTML DOM API. The HTML DOM API documentation goes into
            further detail about these interfaces.
          </Description>

          <Title>SVG DOM</Title>

          <Description>
            Similarly, a document containing SVG is likewise defined using the
            Document interface, which is expanded by the SVG specification to
            incorporate numerous SVG-specific capabilities. SVGElement Its
            several subclasses, which each represent an element or a collection
            of closely related elements, are specifically improved versions of
            the Element interface. The SVG API documentation goes into
            additional detail about these interfaces.{" "}
          </Description>
        </section>

        <section id="section2">
          <Title>Examples</Title>
          <Title>Selecting Elements</Title>
          <Description>
            To choose elements from the DOM, you have a few different options.
          </Description>

          <Code
            code={`// Select element by ID
const elementById = document.getElementById('myElement');

// Select elements by class name
const elementsByClass = document.getElementsByClassName('myClass');

// Select elements using query selector (single element)
const queryElement = document.querySelector('.myClass');

// Select elements using query selector (multiple elements)
const queryElements = document.querySelectorAll('.myClass');
`}
          />
        </section>

        <section id="section3">
          <Title>Changing Content</Title>
          <Description>
            You can change the text content or inner HTML of an element.
          </Description>

          <Code
            code={`// Change the text content
const header = document.getElementById('header');
header.textContent = 'Hello, World!';

// Change the inner HTML
const content = document.getElementById('content');
content.innerHTML = '<p>This is a new paragraph!</p>';
`}
          />
        </section>

        <section id="section4">
          <Title>Creating and Appending Elements</Title>
          <Description>
            You can dynamically create and add new elements to the DOM.
          </Description>
          <Code
            code={`// Create a new paragraph element
const newParagraph = document.createElement('p');

// Set its text content
newParagraph.textContent = 'This is a dynamically created paragraph.';

// Append the new element to an existing container
const container = document.getElementById('container');
container.appendChild(newParagraph);
`}
          />

          <section id="section5">
            <Title>Removing Elements</Title>
            <Description>You can remove elements from the DOM.</Description>

            <Code
              code={`// Select the element you want to remove
const elementToRemove = document.getElementById('oldElement');

// Remove the element
elementToRemove.remove();
`}
            />
          </section>
          <section id="section6">
            <Title>Handling Events</Title>
            <Description>
              You can attach event listeners to DOM elements.
            </Description>

            <Code
              code={`// Select a button
const button = document.getElementById('button');

// Add a click event listener
button.addEventListener('click', function() {
  alert('Button clicked!');
});
`}
            />
          </section>

          <section id="section7">
            <Title>Changing CSS Styles</Title>
            <Description>
              You can modify the inline styles of elements.
            </Description>

            <Code
              code={`// Select an element
const box = document.getElementById('box');

// Change its CSS styles
box.style.backgroundColor = 'blue';
box.style.width = '200px';
box.style.height = '200px';
`}
            />

            <HeroVideoDialog
              videoSrc="https://www.youtube.com/embed/t3CWlfZUvL8?si=pX7umxbdWpVDBROw"
              thumbnailSrc="https://img.youtube.com/vi/t3CWlfZUvL8/maxresdefault.jpg"
              link="https://www.youtube.com/watch?v=t3CWlfZUvL8"
            />
          </section>
        </section>
        <NextButton link="/learn-js/dom-elements" text="Dom Elements" />
      </div>
    </div>
  );
}
