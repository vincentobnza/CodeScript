export const Pretest = {
  lesson1: [
    {
      id: 1,
      question: "What was the original purpose of JavaScript?",
      options: {
        a: "To improve web page loading speed",
        b: "To add dynamic content to web pages",
        c: "To build mobile applications",
        d: "To create a scripting alternative to Java",
      },
      answer: "b",
    },
    {
      id: 2,
      question: "What was JavaScript's original name?",
      options: {
        a: "JScript",
        b: "WebScript",
        c: "LiveScript",
        d: "ScriptMaster",
      },
      answer: "c",
    },
    {
      id: 3,
      question: "Why was JavaScript renamed from its original name?",
      options: {
        a: "Because JavaScript is a part of Java",
        b: "Java was very popular at the time",
        c: "To avoid conflicts with other programming languages",
        d: "It was originally intended for backend development",
      },
      answer: "b",
    },
    {
      id: 4,
      question: "What specification defines JavaScript as a separate language?",
      options: {
        a: "W3C",
        b: "ECMA",
        c: "ISO",
        d: "RFC",
      },
      answer: "b",
    },
    {
      id: 5,
      question: "Which of the following is NOT a key feature of JavaScript?",
      options: {
        a: "Fully integrates with HTML and CSS",
        b: "Difficult tasks are simplified",
        c: "Compatible with all popular browsers",
        d: "Requires a server to execute",
      },
      answer: "d",
    },
    {
      id: 6,
      question:
        "Which of the following is a free, cross-platform IDE for JavaScript development?",
      options: {
        a: "Notepad++",
        b: "Visual Studio Code",
        c: "WebStorm",
        d: "Dreamweaver",
      },
      answer: "b",
    },
    {
      id: 7,
      question:
        "How can JavaScript code be added to an HTML page? (Select all that apply)",
      options: {
        a: "Using the <script> tag",
        b: "Using inline event handlers like onclick",
        c: "Linking an external .js file",
        d: "Using the <link> tag",
      },
      answer: ["a", "b", "c"],
    },
    {
      id: 8,
      question:
        "Which of the following is a good practice when adding JavaScript code to a webpage?",
      options: {
        a: "Writing all JavaScript inline",
        b: "Separating JavaScript into an external .js file",
        c: "Embedding all code between <style> tags",
        d: "Placing JavaScript at the beginning of the HTML document",
      },
      answer: "b",
    },
    {
      id: 9,
      question:
        "What happens when you use the onclick attribute in a button element?",
      options: {
        a: "The button automatically submits a form",
        b: "The associated JavaScript code is executed when the button is clicked",
        c: "The button changes color on click",
        d: "The page is reloaded",
      },
      answer: "b",
    },
    {
      id: 10,
      question:
        "What is the best way to maintain JavaScript code when using it across multiple pages?",
      options: {
        a: "Write the code inline on every page",
        b: "Use the onload event in each page",
        c: "Store the JavaScript in an external file and link it using the <script> tag",
        d: "Use the style attribute to embed JavaScript",
      },
      answer: "c",
    },
  ],
  lesson2: [
    {
      id: 1,
      question: "What is a variable in JavaScript?",
      options: {
        a: "A container for storing data",
        b: "A mathematical equation",
        c: "A programming language",
        d: "A keyword",
      },
      answer: "a",
    },
    {
      id: 2,
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: {
        a: "var",
        b: "let",
        c: "const",
        d: "All of the above",
      },
      answer: "d",
    },
    {
      id: 3,
      question: "Which data type is used to represent text in JavaScript?",
      options: {
        a: "Number",
        b: "Boolean",
        c: "String",
        d: "Object",
      },
      answer: "c",
    },
    {
      id: 4,
      question: 'What is the value of the following expression: 5 + "3"?',
      options: {
        a: "8",
        b: '"53"',
        c: '"8"',
        d: "an error",
      },
      answer: "b",
    },
    {
      id: 5,
      question:
        "Which operator is used to check if two values are equal in JavaScript?",
      options: {
        a: "==",
        b: "===",
        c: "=",
        d: "!=",
      },
      answer: "a",
    },
    {
      id: 6,
      question: "What is the purpose of comments in JavaScript code?",
      options: {
        a: "To make the code run faster",
        b: "To add decorative elements",
        c: "To explain the code's logic",
        d: "To define variables",
      },
      answer: "c",
    },
    {
      id: 7,
      question: "Which of the following is a reserved word in JavaScript?",
      options: {
        a: "myVariable",
        b: "function",
        c: "helloWorld",
        d: "123",
      },
      answer: "b",
    },
    {
      id: 8,
      question: "What is the result of the following expression: 10 % 3?",
      options: {
        a: "3",
        b: "1",
        c: "0",
        d: "10",
      },
      answer: "b",
    },
    {
      id: 9,
      question: "Which data type is used to represent true or false values?",
      options: {
        a: "Number",
        b: "Boolean",
        c: "String",
        d: "Object",
      },
      answer: "b",
    },
    {
      id: 10,
      question: "What is the difference between the let and const keywords?",
      options: {
        a: "let variables can be reassigned, while const variables cannot.",
        b: "const variables can be reassigned, while let variables cannot.",
        c: "Both let and const variables can be reassigned.",
        d: "Neither let nor const variables can be reassigned.",
      },
      answer: "a",
    },
  ],
  lesson3: [
    {
      id: 1,
      question:
        "Which statement is used in JavaScript to specify execution for a block of code if a condition is true?",
      options: {
        a: "else",
        b: "if",
        c: "switch",
        d: "for",
      },
      answer: "b",
    },
    {
      id: 2,
      question:
        "In JavaScript, which keyword is used to define a block that runs if the if condition is false?",
      options: {
        a: "while",
        b: "else",
        c: "break",
        d: "continue",
      },
      answer: "b",
    },
    {
      id: 3,
      question: "When does the else if statement run in JavaScript?",
      options: {
        a: "When the initial if condition is true",
        b: "Only if the else condition fails",
        c: "If the if condition is false and its own condition is true",
        d: "It runs by default",
      },
      answer: "c",
    },
    {
      id: 4,
      question: "What is the purpose of a switch statement?",
      options: {
        a: "To loop through conditions",
        b: "To match an expression to several case clauses",
        c: "To assign variables",
        d: "To define a function",
      },
      answer: "b",
    },
    {
      id: 5,
      question:
        "What happens if there is no matching case in a switch statement and no default clause?",
      options: {
        a: "The code throws an error",
        b: "The program halts",
        c: "Execution continues after the switch statement",
        d: "The first case executes",
      },
      answer: "c",
    },
    {
      id: 6,
      question:
        "Which loop is designed to run a specific number of times in JavaScript?",
      options: {
        a: "while",
        b: "do...while",
        c: "for",
        d: "switch",
      },
      answer: "c",
    },
    {
      id: 7,
      question:
        "What does the break statement do in a loop or switch statement?",
      options: {
        a: "It skips the current iteration",
        b: "It stops all iterations",
        c: "It pauses execution temporarily",
        d: "It changes the value of the variable",
      },
      answer: "b",
    },
    {
      id: 8,
      question: "What type of loop is while in JavaScript?",
      options: {
        a: "Exit-controlled loop",
        b: "Counter loop",
        c: "Entry-controlled loop",
        d: "Infinite loop",
      },
      answer: "c",
    },
    {
      id: 9,
      question: "In a do...while loop, when is the condition checked?",
      options: {
        a: "Before each iteration",
        b: "After the first iteration",
        c: "After all iterations",
        d: "It’s not checked",
      },
      answer: "b",
    },
    {
      id: 10,
      question: "In a for loop, what is the purpose of the initialExpression?",
      options: {
        a: "To break out of the loop",
        b: "To increment a variable each loop",
        c: "To set the counter variable before the loop starts",
        d: "To evaluate the loop condition",
      },
      answer: "c",
    },
  ],
  lesson4: [
    {
      id: 1,
      question: "What keyword is used to declare a function in JavaScript?",
      options: {
        a: "func",
        b: "function",
        c: "declare",
        d: "define",
      },
      answer: "b",
    },
    {
      id: 2,
      question: "How do you define a function that takes no parameters?",
      options: {
        a: "function myFunction() {}",
        b: "function myFunction[] {}",
        c: "function myFunction() => {}",
        d: "function myFunction() : {}",
      },
      answer: "a",
    },
    {
      id: 3,
      question:
        "Which of the following is NOT a benefit of using arrow functions?",
      options: {
        a: "Shorter syntax",
        b: "Lexical binding of this",
        c: "They can be used as constructors",
        d: "They are easier to read",
      },
      answer: "c",
    },
    {
      id: 4,
      question:
        "What is the output of the following code? const square = x => x * x; console.log(square(4));",
      options: {
        a: "4",
        b: "8",
        c: "16",
        d: "undefined",
      },
      answer: "c",
    },
    {
      id: 5,
      question: "In which scenario would you prefer using an arrow function?",
      options: {
        a: "When you need to bind this to the function",
        b: "When you need a named function",
        c: "When you want to create a constructor",
        d: "When you need to define a method in an object",
      },
      answer: "a",
    },
    {
      id: 6,
      question:
        "What is the result of calling addNumbers(5) if addNumbers is defined as function addNumbers(a, b = 10) { return a + b; }?",
      options: {
        a: "5",
        b: "10",
        c: "15",
        d: "NaN",
      },
      answer: "c",
    },
    {
      id: 7,
      question:
        "What will happen if you try to call a function before it is declared?",
      options: {
        a: "It will work fine",
        b: "It will throw a ReferenceError",
        c: "It will return undefined",
        d: "It will execute but return an error",
      },
      answer: "b",
    },
    {
      id: 8,
      question:
        "Which of the following statements about arrow functions is true?",
      options: {
        a: "They cannot be used as methods",
        b: "They do not have their own this",
        c: "They must always have parentheses around parameters",
        d: "They cannot return values",
      },
      answer: "b",
    },
    {
      id: 9,
      question: "What does 'lexical this' refer to in arrow functions?",
      options: {
        a: "The global object",
        b: "The value of this from the surrounding context",
        c: "The function's own this value",
        d: "A new variable created in the function",
      },
      answer: "b",
    },
    {
      id: 10,
      question: "What is a function expression?",
      options: {
        a: "A function defined without a name",
        b: "A function assigned to a variable",
        c: "A function that returns a value",
        d: "A function that takes parameters",
      },
      answer: "b",
    },
  ],

  lesson5: [
    {
      id: 1,
      question: "How do you add a new element to the beginning of an array?",
      options: {
        a: "array.push(element)",
        b: "array.unshift(element)",
        c: "array.insertFirst(element)",
        d: "array.addFirst(element)",
      },
      answer: "b",
    },
    {
      id: 2,
      question: "What method can you use to convert an array to a string?",
      options: {
        a: "array.toString()",
        b: "array.stringify()",
        c: "array.join()",
        d: "array.convert()",
      },
      answer: "c",
    },
    {
      id: 3,
      question: "What does the `delete` operator do in JavaScript?",
      options: {
        a: "Deletes an array element",
        b: "Deletes a property from an object",
        c: "Removes a function",
        d: "Clears the console",
      },
      answer: "b",
    },
    {
      id: 4,
      question: "Which method is used to combine two or more arrays into one?",
      options: {
        a: "array.merge()",
        b: "array.concat()",
        c: "array.add()",
        d: "array.combine()",
      },
      answer: "b",
    },
    {
      id: 5,
      question: "How can you create a shallow copy of an array?",
      options: {
        a: "array.copy()",
        b: "array.slice()",
        c: "array.clone()",
        d: "array.duplicate()",
      },
      answer: "b",
    },
    {
      id: 6,
      question: "How can you check if an object has a specific property?",
      options: {
        a: "object.hasOwnProperty(property)",
        b: "object.contains(property)",
        c: "object.checkProperty(property)",
        d: "object.propertyExists(property)",
      },
      answer: "a",
    },
    {
      id: 7,
      question: "Which method returns an array of all the values of an object?",
      options: {
        a: "Object.getValues()",
        b: "Object.values()",
        c: "Object.keys()",
        d: "Object.list()",
      },
      answer: "b",
    },
    {
      id: 8,
      question: "How can you check if a variable is an array?",
      options: {
        a: "Array.isArray(variable)",
        b: "variable.isArray()",
        c: "isArray(variable)",
        d: "Array.check(variable)",
      },
      answer: "a",
    },
    {
      id: 9,
      question: "How do you remove the last element of an array?",
      options: {
        a: "array.shift()",
        b: "array.pop()",
        c: "array.delete()",
        d: "array.remove()",
      },
      answer: "b",
    },
    {
      id: 10,
      question: "How can you combine multiple strings into one?",
      options: {
        a: "string.concat(otherString)",
        b: "string.append(otherString)",
        c: "string.join(otherString)",
        d: "string.merge(otherString)",
      },
      answer: "a",
    },
  ],

  lesson6: [
    {
      id: 1,
      question: "What does DOM stand for?",
      options: {
        a: "Document Object Model",
        b: "Data Object Model",
        c: "Direct Object Model",
        d: "Document Observation Method",
      },
      answer: "a",
    },
    {
      id: 2,
      question: "What type of structure does the DOM represent?",
      options: {
        a: "Array",
        b: "Tree",
        c: "Stack",
        d: "Queue",
      },
      answer: "b",
    },
    {
      id: 3,
      question: "How can you access an element by its ID in the DOM?",
      options: {
        a: "document.getElementByTagName()",
        b: "document.getElementById()",
        c: "document.getClassById()",
        d: "document.querySelector()",
      },
      answer: "b",
    },
    {
      id: 4,
      question: "Which method can be used to select elements by class name?",
      options: {
        a: "getElementByClass",
        b: "querySelectorAll",
        c: "getElementsByClassName",
        d: "getElementsByName",
      },
      answer: "c",
    },
    {
      id: 5,
      question:
        "Which DOM method allows you to dynamically create a new element?",
      options: {
        a: "document.createElement()",
        b: "document.appendChild()",
        c: "document.write()",
        d: "document.createNewElement()",
      },
      answer: "a",
    },
    {
      id: 6,
      question: "What does `addEventListener()` do?",
      options: {
        a: "Executes a function on page load",
        b: "Adds an event to the browser history",
        c: "Attaches an event handler to a DOM element",
        d: "Adds an event to the document",
      },
      answer: "c",
    },
    {
      id: 7,
      question: "Which DOM method removes an element?",
      options: {
        a: "removeNode",
        b: "deleteElement",
        c: "removeChild",
        d: "clearChild",
      },
      answer: "c",
    },
    {
      id: 8,
      question: "Which event occurs when a user clicks on an element?",
      options: {
        a: "mouseover",
        b: "click",
        c: "mouseenter",
        d: "load",
      },
      answer: "b",
    },
    {
      id: 9,
      question: "What is `querySelector()` used for?",
      options: {
        a: "Selecting all elements",
        b: "Selecting the first element that matches a specified CSS selector",
        c: "Selecting an element by ID only",
        d: "Deleting a specified element",
      },
      answer: "b",
    },
    {
      id: 10,
      question: "Which event occurs when the DOM is fully loaded?",
      options: {
        a: "DOMContentLoaded",
        b: "load",
        c: "ready",
        d: "init",
      },
      answer: "a",
    },
  ],

  lesson7: [
    {
      id: 1,
      question: "What is an event in JavaScript?",
      options: {
        a: "A function that returns a value",
        b: "A change in the state of an object",
        c: "A type of variable",
        d: "A method to manipulate the DOM",
      },
      answer: "b", // correct answer: a change in the state of an object
    },
    {
      id: 2,
      question: "What is the purpose of event handling in JavaScript?",
      options: {
        a: "To create new HTML elements",
        b: "To store user data",
        c: "To respond to user interactions and execute code",
        d: "To enhance the styling of web pages",
      },
      answer: "c", // correct answer: to respond to user interactions and execute code
    },
    {
      id: 3,
      question: "Which of the following is a mouse event?",
      options: {
        a: "keypress",
        b: "change",
        c: "onclick",
        d: "submit",
      },
      answer: "c", // correct answer: onclick
    },
    {
      id: 4,
      question: "What does the `onmouseover` event do?",
      options: {
        a: "Triggers when the mouse is clicked",
        b: "Triggers when the mouse moves over an element",
        c: "Triggers when the mouse is released",
        d: "Triggers when the keyboard is pressed",
      },
      answer: "b", // correct answer: triggers when the mouse moves over an element
    },
    {
      id: 5,
      question: "Which keyboard event occurs when a key is pressed down?",
      options: {
        a: "keypress",
        b: "keyup",
        c: "keydown",
        d: "keyhit",
      },
      answer: "c", // correct answer: keydown
    },
    {
      id: 6,
      question: "What happens during the `keyup` event?",
      options: {
        a: "A key is pressed down",
        b: "A key is released",
        c: "A key is held down",
        d: "A key is typed",
      },
      answer: "b", // correct answer: a key is released
    },
    {
      id: 7,
      question: "What type of event occurs when a user submits a form?",
      options: {
        a: "change",
        b: "input",
        c: "submit",
        d: "focus",
      },
      answer: "c", // correct answer: submit
    },
    {
      id: 8,
      question: "In event bubbling, where does the event begin?",
      options: {
        a: "At the root element",
        b: "At the target element",
        c: "At the child elements",
        d: "At the event handler",
      },
      answer: "b", // correct answer: at the target element
    },
    {
      id: 9,
      question: "Which statement describes event capturing?",
      options: {
        a: "It is the same as event bubbling",
        b: "It starts at the target and moves up the DOM",
        c: "It starts at the root and moves down to the target",
        d: "It does not propagate events",
      },
      answer: "c", // correct answer: it starts at the root and moves down to the target
    },
    {
      id: 10,
      question: "What is the default phase of event propagation?",
      options: {
        a: "Capturing phase",
        b: "Target phase",
        c: "Bubbling phase",
        d: "Stopping phase",
      },
      answer: "c", // correct answer: bubbling phase
    },
  ],

  lesson8: [
    {
      id: 1,
      question: "Which JavaScript block is used for error handling?",
      options: {
        a: "try...except...finally",
        b: "try...catch...finally",
        c: "catch...finally",
        d: "catch...error...finally",
      },
      answer: "b",
    },
    {
      id: 2,
      question: "When does the catch block execute?",
      options: {
        a: "Always",
        b: "Only if there’s an error in try",
        c: "If there’s no error",
        d: "Only with a finally block",
      },
      answer: "b",
    },
    {
      id: 3,
      question: "What is a common runtime error in JavaScript?",
      options: {
        a: "Syntax error",
        b: "Reference error",
        c: "Typing error",
        d: "Formatting error",
      },
      answer: "b",
    },
    {
      id: 4,
      question: "What type of error occurs due to a typo in code?",
      options: {
        a: "Logic error",
        b: "Runtime error",
        c: "Syntax error",
        d: "Compilation error",
      },
      answer: "c",
    },
    {
      id: 5,
      question: "What does finally block do?",
      options: {
        a: "Executes only if there’s an error",
        b: "Executes only if there’s no error",
        c: "Always executes after try and catch",
        d: "Prevents errors",
      },
      answer: "c",
    },
    {
      id: 6,
      question: "What will happen if catch is missing in try...finally?",
      options: {
        a: "Syntax error",
        b: "Code runs normally",
        c: "finally executes without error handling",
        d: "Program crashes",
      },
      answer: "c",
    },
    {
      id: 7,
      question: "What does throw do?",
      options: {
        a: "Exits program",
        b: "Logs error",
        c: "Throws custom error",
        d: "Skips errors",
      },
      answer: "c",
    },
    {
      id: 8,
      question: "What can throw handle in JavaScript?",
      options: {
        a: "Only numbers",
        b: "Only strings",
        c: "Any expression",
        d: "Only built-in errors",
      },
      answer: "c",
    },
    {
      id: 9,
      question: "What does try...catch in setTimeout require to work?",
      options: {
        a: "catch outside setTimeout",
        b: "A nested try...catch inside setTimeout",
        c: "Error handling in finally",
        d: "Adding a clearTimeout",
      },
      answer: "b",
    },
    {
      id: 10,
      question: "What keyword can you use to manually throw an error?",
      options: {
        a: "raise",
        b: "throw",
        c: "exception",
        d: "abort",
      },
      answer: "b",
    },
    {
      id: 11,
      question:
        "Which error type indicates that a variable is used before it is defined?",
      options: {
        a: "TypeError",
        b: "ReferenceError",
        c: "RangeError",
        d: "SyntaxError",
      },
      answer: "b",
    },
    {
      id: 12,
      question: "When should you use custom errors?",
      options: {
        a: "For any error",
        b: "To handle specific, non-standard errors",
        c: "Only for syntax errors",
        d: "For runtime errors only",
      },
      answer: "b",
    },
    {
      id: 13,
      question: "Which error is best for an illegal arithmetic operation?",
      options: {
        a: "SyntaxError",
        b: "TypeError",
        c: "RangeError",
        d: "EvalError",
      },
      answer: "c",
    },
    {
      id: 14,
      question: "What does the catch block capture?",
      options: {
        a: "finally errors",
        b: "Syntax errors",
        c: "Only thrown errors",
        d: "Errors within try block",
      },
      answer: "d",
    },
    {
      id: 15,
      question: "What happens if try statement lacks catch and finally?",
      options: {
        a: "Program ignores errors",
        b: "Throws syntax error",
        c: "Skips error handling",
        d: "Program runs with warnings",
      },
      answer: "b",
    },
    {
      id: 16,
      question: "Which statement customizes error messages?",
      options: {
        a: "try",
        b: "catch",
        c: "throw",
        d: "finally",
      },
      answer: "c",
    },
    {
      id: 17,
      question: "What does typeof return for undefined variables?",
      options: {
        a: "null",
        b: "undefined",
        c: "error",
        d: "NaN",
      },
      answer: "b",
    },
    {
      id: 18,
      question: "Which error should you use for invalid input types?",
      options: {
        a: "TypeError",
        b: "SyntaxError",
        c: "RangeError",
        d: "ReferenceError",
      },
      answer: "a",
    },
    {
      id: 19,
      question: "What is a benefit of custom error classes?",
      options: {
        a: "Adds complexity",
        b: "Creates standard errors",
        c: "Provides specific error handling",
        d: "Decreases error visibility",
      },
      answer: "c",
    },
    {
      id: 20,
      question: "In which block should cleanup code be placed?",
      options: {
        a: "try",
        b: "catch",
        c: "finally",
        d: "throw",
      },
      answer: "c",
    },
  ],
};
