export const routes = [
  {
    path: "/learn-js/intro",
    lesson: "Lesson 1.1",
    title: "JavaScript Introduction",
    sections: [
      { id: "section1", title: "JavaScript" },
      { id: "section2", title: "Summary" },
    ],
  },
  {
    path: "/learn-js/development-environment",
    lesson: "Lesson 1.2",
    title: "Environment",
    sections: [
      { id: "section1", title: "Browser" },
      { id: "section2", title: "IDE's" },
    ],
  },
  {
    path: "/learn-js/adding-javascript-to-page",
    lesson: "Lesson 1.3",
    title: "Embed JavaScript",
    sections: [
      { id: "section1", title: "Embedding the JavaScript Code" },
      { id: "section2", title: "Calling an External JavaScript File" },
      { id: "section3", title: "Placing the JavaScript Code Inline" },
    ],
  },
  {
    path: "/learn-js/variables-data-types",
    lesson: "Lesson 2.1",
    title: "Variables and Data Types",
    sections: [
      { id: "section1", title: "Variables" },
      { id: "section2", title: "Data Types" },
    ],
  },
  {
    path: "/learn-js/operators",
    lesson: "Lesson 2.2",
    title: "Operators",
    sections: [
      { id: "section1", title: "Arithmetic Operators" },
      { id: "section2", title: "Comparison Operators" },
      { id: "section3", title: "Logical Operators" },
      { id: "section4", title: "Assignment Operators" },
      { id: "section5", title: "Conditional Operators" },
    ],
  },

  {
    path: "/learn-js/comments-code-structure",
    lesson: "Lesson 2.3",
    title: "Comments and Code Structure",
    sections: [
      { id: "section1", title: "Comment" },
      { id: "section2", title: "Code Structure" },
      { id: "section3", title: "Reserved Words" },
    ],
  },

  {
    path: "/learn-js/conditionals",
    lesson: "Lesson 3.1",
    title: "Conditionals: if, else, else if",
    sections: [
      { id: "section1", title: "if statement" },
      { id: "section2", title: "else statement" },
      { id: "section3", title: "else if statement" },
    ],
  },
  {
    path: "/learn-js/switch-statements",
    lesson: "Lesson 3.2",
    title: "Switch Statements",
    sections: [
      { id: "section1", title: "syntax" },
      { id: "section2", title: "expression" },
      { id: "section3", title: "Breaking and fall-through" },
    ],
  },
  {
    path: "/learn-js/loops",
    lesson: "Lesson 3.3",
    title: "JavaScript Loops",
    sections: [
      { id: "section1", title: "What are loops?" },
      { id: "section2", title: "for loop" },
      { id: "section3", title: "while loop" },
      { id: "section4", title: "do while loop" },
    ],
  },
  {
    path: "/learn-js/break-statements",
    lesson: "Lesson 3.4",
    title: "JavaScript Break Statements",
    sections: [
      { id: "section1", title: "break statement" },
      { id: "section2", title: "continue statement" },
      { id: "section3", title: "continue with Nested Loops" },
    ],
  },
  {
    path: "/learn-js/functions",
    lesson: "Lesson 4.1",
    title: "Function Declaration and Expression",
    sections: [
      { id: "section1", title: "Function Declaration" },
      { id: "section2", title: "Function Expression" },
    ],
  },
  {
    path: "/learn-js/parameters-return-values",
    lesson: "Lesson 4.2",
    title: "Parameters and Return Values",
    sections: [{ id: "section1", title: "Parameters and Return Values" }],
  },
  {
    path: "/learn-js/arrow-functions",
    lesson: "Lesson 4.3",
    title: "Arrow Functions",
    sections: [
      { id: "section1", title: "Basic Syntax" },
      { id: "section2", title: "Parameters in Arrow Functions" },
      { id: "section3", title: "Return Values" },
      { id: "section4", title: "The this context" },
      { id: "section5", title: "Arrow Functions and Callbacks" },
    ],
  },
  {
    path: "/learn-js/objects-properties-methods",
    lesson: "Lesson 5.1",
    title: "Object Properties and Methods",
    sections: [
      { id: "section1", title: "What are objects in JavaScript" },
      { id: "section2", title: "Dot Notation" },
      { id: "section3", title: "Objects as Object Properties" },
      { id: "section4", title: "Bracket Notation" },
      { id: "section5", title: "this keyword" },
      { id: "section6", title: "Object Constructors in JavaScript" },
      { id: "section7", title: "Object Copies in JavaScript" },
      { id: "section8", title: "Spread Operator" },
      { id: "section9", title: "Conclusion" },
    ],
  },
  {
    path: "/learn-js/array-array-methods",
    lesson: "Lesson 5.2",
    title: "Array and Array Methods",
    sections: [
      { id: "section1", title: "JavaScript Arrays" },
      { id: "section2", title: "Creating an Array" },
      { id: "section3", title: "The new keyword" },
      { id: "section4", title: "Getting to know Array Elements" },
      { id: "section5", title: "JavaScript Array Methods" },
    ],
  },
  {
    path: "/learn-js/dom",
    lesson: "Lesson 6.2",
    title: "What is DOM?",
    sections: [
      { id: "section1", title: "What is DOM?" },
      { id: "section2", title: "Selecting Elements" },
      { id: "section3", title: "Changing Content" },
      { id: "section4", title: "Creating and Appending Elements" },
      { id: "section5", title: "Removing Elements" },
      { id: "section6", title: "Handling Events" },
      { id: "section7", title: "Changing CSS Styles" },
    ],
  },
  {
    path: "/learn-js/dom-elements",
    lesson: "Lesson 6.2",
    title: "DOM Elements",
    sections: [{ id: "section1", title: "Finding HTML Elements" }],
  },
  {
    path: "/learn-js/event-listeners-handling-events",
    lesson: "Lesson 6.3",
    title: "Event Listeners and Handling Events",
    sections: [
      { id: "section1", title: "What Are DOM Events and Why Are They Useful?" },
      {
        id: "section2",
        title: "Keyboard Events",
      },
      {
        id: "section3",
        title: "Mouse Events",
      },
      {
        id: "section4",
        title: "How to Listen to Events using HTML Attributes",
      },
    ],
  },
  {
    path: "/learn-js/event-types",
    lesson: "Lesson 7.1",
    title: "Event Listeners and Handling Events",
    sections: [
      {
        id: "section1",
        title: "Mouse Events",
      },
      {
        id: "section2",
        title: "Keyboard Events",
      },
      {
        id: "section3",
        title: "Form Events",
      },
      {
        id: "section4",
        title: "Window Events",
      },
    ],
  },
  {
    path: "/learn-js/event-bubbling-capturing",
    lesson: "Lesson 7.2",
    title: "Event Bubbling and Capturing",
    sections: [
      {
        id: "section1",
        title: "Event Bubbling",
      },
      {
        id: "section2",
        title: "Event Capturing",
      },
    ],
  },
  {
    path: "/learn-js/try-catch-finally",
    lesson: "Lesson 8.1",
    title: "try, catch, finally",
    sections: [
      {
        id: "section1",
        title: "JavaScript Try Catch Statement",
      },
      {
        id: "section2",
        title: "JavaScript try, catch, finally",
      },
      {
        id: "section3",
        title: "JavaScript try...catch in setTimeout",
      },
    ],
  },
  {
    path: "/learn-js/throwing-errors",
    lesson: "Lesson 8.2",
    title: "try, catch, finally",
    sections: [
      {
        id: "section1",
        title: "JavaScript throw statement",
      },
      {
        id: "section2",
        title: "JavaScript throw with try...catch",
      },
    ],
  },
  {
    path: "/learn-js/custom-errors",
    lesson: "Lesson 8.2",
    title: "Custom Errors",
    sections: [
      {
        id: "section1",
        title: "Handling Custom Errors",
      },
      {
        id: "section2",
        title: "Typical Errors",
      },
    ],
  },
];
