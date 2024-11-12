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
      question: "Which data type is used to represent text in JavaScript?   ",
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
    {
      id: 11,
      question: "What is a key difference between for and while loops?",
      options: {
        a: "for loops must have a break",
        b: "while loops cannot run infinitely",
        c: "for loops are only for numerical conditions",
        d: "for loops have initialization, condition, and increment steps in one line",
      },
      answer: "d",
    },
    {
      id: 12,
      question:
        "In JavaScript, what is the output if the continue statement is used in a loop?",
      options: {
        a: "Exits the loop",
        b: "Skips the remaining code and starts the next iteration",
        c: "Pauses the loop",
        d: "Repeats the same iteration",
      },
      answer: "b",
    },
    {
      id: 13,
      question: "What happens if break is omitted in a switch case clause?",
      options: {
        a: "An error occurs",
        b: "Execution continues to the next case clause",
        c: "The loop exits",
        d: "The program restarts",
      },
      answer: "b",
    },
    {
      id: 14,
      question:
        "In a nested loop with continue, what happens if the condition is met in the inner loop?",
      options: {
        a: "Only the inner loop skips the iteration",
        b: "Both loops exit",
        c: "The outer loop skips an iteration",
        d: "Both loops continue normally",
      },
      answer: "a",
    },
    {
      id: 15,
      question: "What does the default clause do in a switch statement?",
      options: {
        a: "It runs if no case matches",
        b: "It terminates the switch",
        c: "It must be the first clause",
        d: "It stores values",
      },
      answer: "a",
    },
    {
      id: 16,
      question:
        "What is the output of do...while loop if the condition is initially false?",
      options: {
        a: "The loop runs once",
        b: "The loop does not run at all",
        c: "The loop runs twice",
        d: "An error occurs",
      },
      answer: "a",
    },
    {
      id: 17,
      question:
        "Which keyword is used to exit a function early, returning control to the caller?",
      options: {
        a: "break",
        b: "return",
        c: "exit",
        d: "continue",
      },
      answer: "b",
    },
    {
      id: 18,
      question: "What type of expression does a switch statement evaluate?",
      options: {
        a: "Boolean only",
        b: "A single numeric expression",
        c: "Any expression with a value",
        d: "Only strings",
      },
      answer: "c",
    },
    {
      id: 19,
      question:
        "Which loop guarantees at least one execution even if the condition is false?",
      options: {
        a: "for",
        b: "while",
        c: "do...while",
        d: "switch",
      },
      answer: "c",
    },
    {
      id: 20,
      question: "What is the primary use of the while loop in JavaScript?",
      options: {
        a: "To execute code a fixed number of times",
        b: "To execute code as long as a condition is true",
        c: "To execute code once and exit",
        d: "To handle multiple conditions",
      },
      answer: "b",
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
      answer: "c",
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
      question: "How can you remove the last element from an array?",
      options: {
        a: "array.shift()",
        b: "array.remove()",
        c: "array.pop()",
        d: "array.delete()",
      },
      answer: "c",
    },
    {
      id: 2,
      question: "How can you access an object's properties using dot notation?",
      options: {
        a: "object.property",
        b: "object[property]",
        c: "object->property",
        d: "object{property}",
      },
      answer: "a",
    },
    {
      id: 3,
      question: "How can you combine two or more arrays into one?",
      options: {
        a: "array.concat(otherArray)",
        b: "array.merge(otherArray)",
        c: "array.add(otherArray)",
        d: "array.join(otherArray)",
      },
      answer: "a",
    },
    {
      id: 4,
      question: "What does the `hasOwnProperty()` method do in an object?",
      options: {
        a: "Deletes a property",
        b: "Updates the value of a property",
        c: "Creates a new property",
        d: "Checks if a property exists",
      },
      answer: "d",
    },
    {
      id: 5,
      question: "How can you check if an array includes a certain element?",
      options: {
        a: "array.has(element)",
        b: "array.exists(element)",
        c: "array.includes(element)",
        d: "array.contains(element)",
      },
      answer: "c",
    },
    {
      id: 6,
      question: "How can you add an element to the end of an array?",
      options: {
        a: "array.unshift(element)",
        b: "array.append(element)",
        c: "array.push(element)",
        d: "array.add(element)",
      },
      answer: "c",
    },
    {
      id: 7,
      question: "What is an object in JavaScript?",
      options: {
        a: "A type of function",
        b: "A grouping of linked information and/or features",
        c: "A special variable",
        d: "A single value",
      },
      answer: "b",
    },
    {
      id: 8,
      question: "How can you filter elements in an array based on a condition?",
      options: {
        a: "array.map(condition)",
        b: "array.filter(condition)",
        c: "array.find(condition)",
        d: "array.select(condition)",
      },
      answer: "b",
    },
    {
      id: 9,
      question: "What does the `Object.keys()` method return?",
      options: {
        a: "The first key in the object",
        b: "A list of the object’s keys",
        c: "A list of the object’s values",
        d: "The number of keys",
      },
      answer: "b",
    },
    {
      id: 10,
      question:
        "How can you transform each element of an array using a function?",
      options: {
        a: "array.forEach(function)",
        b: "array.reduce(function)",
        c: "array.map(function)",
        d: "array.filter(function)",
      },
      answer: "c",
    },
    {
      id: 11,
      question:
        "How can you retrieve a specific property value from an object?",
      options: {
        a: "object.getProperty(propertyName)",
        b: "object.property",
        c: "object[propertyName]",
        d: "Both b and c",
      },
      answer: "d",
    },
    {
      id: 12,
      question: "What does the `length` property of an array return?",
      options: {
        a: "The number of elements in the array",
        b: "The last element of the array",
        c: "The type of the array",
        d: "The first element of the array",
      },
      answer: "a",
    },
    {
      id: 13,
      question: "How can you sort the elements of an array in ascending order?",
      options: {
        a: "array.order()",
        b: "array.sort()",
        c: "array.arrange()",
        d: "array.ascending()",
      },
      answer: "b",
    },
    {
      id: 14,
      question: "How can you remove the first element from an array?",
      options: {
        a: "array.pop()",
        b: "array.shift()",
        c: "array.removeFirst()",
        d: "array.deleteFirst()",
      },
      answer: "b",
    },
    {
      id: 15,
      question:
        "How can you add a new property to an object using dot notation?",
      options: {
        a: "object.property = value",
        b: "object[newProperty] = value",
        c: "object.set(newProperty, value)",
        d: "object.addProperty(newProperty)",
      },
      answer: "a",
    },
    {
      id: 16,
      question: "How can you remove a property from an object?",
      options: {
        a: "object.remove(property)",
        b: "delete object.property",
        c: "object.property = null",
        d: "object.clear(property)",
      },
      answer: "b",
    },
    {
      id: 17,
      question: "How can you find the index of an element in an array?",
      options: {
        a: "array.indexOf(element)",
        b: "array.search(element)",
        c: "array.findIndex(element)",
        d: "array.getIndex(element)",
      },
      answer: "a",
    },
    {
      id: 18,
      question: "How can you copy an object without modifying the original?",
      options: {
        a: "const newObject = Object.assign({}, originalObject)",
        b: "const newObject = Object.copy(originalObject)",
        c: "const newObject = Object.createClone(originalObject)",
        d: "const newObject = Object.clone(originalObject)",
      },
      answer: "a",
    },
    {
      id: 19,
      question:
        "How can you find the first element in an array that meets a condition?",
      options: {
        a: "array.find(condition)",
        b: "array.search(condition)",
        c: "array.filterFirst(condition)",
        d: "array.getFirst(condition)",
      },
      answer: "a",
    },
    {
      id: 20,
      question:
        "How can you reduce an array to a single value using a function?",
      options: {
        a: "array.reduce(function)",
        b: "array.accumulate(function)",
        c: "array.aggregate(function)",
        d: "array.transform(function)",
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
      question: "What is querySelector() used for?",
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
    {
      id: 11,
      question: "What is the result of calling document.createElement('div')?",
      options: {
        a: "Adds a div to the HTML",
        b: "Creates a div element in memory",
        c: "Deletes a div element",
        d: "Creates a div and appends it to the document",
      },
      answer: "b",
    },
    {
      id: 12,
      question: "To change the text inside an HTML element, use:",
      options: {
        a: "innerText",
        b: "textNode",
        c: "textContent",
        d: "innerHTML",
      },
      answer: "d",
    },
    {
      id: 13,
      question: "How do you change an element's CSS style directly?",
      options: {
        a: "element.classList.add()",
        b: "element.style.property = value",
        c: "element.setCSS()",
        d: "element.updateStyle()",
      },
      answer: "b",
    },
    {
      id: 14,
      question: "Which method is used to listen for mouse events?",
      options: {
        a: "addMouseEventListener()",
        b: "addEventListener()",
        c: "listenMouse()",
        d: "setEventListener()",
      },
      answer: "b",
    },
    {
      id: 15,
      question: "How can you stop event propagation?",
      options: {
        a: "stopPropagation()",
        b: "preventEvent()",
        c: "haltPropagation()",
        d: "disablePropagation()",
      },
      answer: "a",
    },
    {
      id: 16,
      question:
        "Which DOM method provides a list of all elements with a given class?",
      options: {
        a: "getElementsByName()",
        b: "getElementsByClassName()",
        c: "getClassList()",
        d: "querySelector()",
      },
      answer: "b",
    },
    {
      id: 17,
      question:
        "What is the function of `preventDefault()` in an event handler?",
      options: {
        a: "Stops event propagation",
        b: "Resets the event",
        c: "Prevents the default browser action",
        d: "Deletes the event handler",
      },
      answer: "c",
    },
    {
      id: 18,
      question: "To attach a function to execute on an element click, use:",
      options: {
        a: "element.onclick = functionName",
        b: "click.add()",
        c: "onclick.set()",
        d: "element.onClickListener()",
      },
      answer: "a",
    },
    {
      id: 19,
      question:
        "Which mouse event fires when the mouse is moved over an element?",
      options: {
        a: "click",
        b: "mouseover",
        c: "mouseout",
        d: "mousemove",
      },
      answer: "b",
    },
    {
      id: 20,
      question: "What does innerHTML modify?",
      options: {
        a: "CSS properties",
        b: "Element ID",
        c: "HTML content inside an element",
        d: "Event handler",
      },
      answer: "c",
    },
  ],

  lesson7: [
    {
      id: 1,
      question: "what is an event in javascript?",
      options: {
        a: "a function that returns a value",
        b: "a change in the state of an object",
        c: "a type of variable",
        d: "a method to manipulate the dom",
      },
      answer: "b", // correct answer: a change in the state of an object
    },
    {
      id: 2,
      question: "what is the purpose of event handling in javascript?",
      options: {
        a: "to create new html elements",
        b: "to store user data",
        c: "to respond to user interactions and execute code",
        d: "to enhance the styling of web pages",
      },
      answer: "c", // correct answer: to respond to user interactions and execute code
    },
    {
      id: 3,
      question: "which of the following is a mouse event?",
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
      question: "what does the `onmouseover` event do?",
      options: {
        a: "triggers when the mouse is clicked",
        b: "triggers when the mouse moves over an element",
        c: "triggers when the mouse is released",
        d: "triggers when the keyboard is pressed",
      },
      answer: "b", // correct answer: triggers when the mouse moves over an element
    },
    {
      id: 5,
      question: "which keyboard event occurs when a key is pressed down?",
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
      question: "what happens during the `keyup` event?",
      options: {
        a: "a key is pressed down",
        b: "a key is released",
        c: "a key is held down",
        d: "a key is typed",
      },
      answer: "b", // correct answer: a key is released
    },
    {
      id: 7,
      question: "what type of event occurs when a user submits a form?",
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
      question: "in event bubbling, where does the event begin?",
      options: {
        a: "at the root element",
        b: "at the target element",
        c: "at the child elements",
        d: "at the event handler",
      },
      answer: "b", // correct answer: at the target element
    },
    {
      id: 9,
      question: "which statement describes event capturing?",
      options: {
        a: "it is the same as event bubbling",
        b: "it starts at the target and moves up the dom",
        c: "it starts at the root and moves down to the target",
        d: "it does not propagate events",
      },
      answer: "c", // correct answer: it starts at the root and moves down to the target
    },
    {
      id: 10,
      question: "what is the default phase of event propagation?",
      options: {
        a: "capturing phase",
        b: "target phase",
        c: "bubbling phase",
        d: "stopping phase",
      },
      answer: "c", // correct answer: bubbling phase
    },
    {
      id: 11,
      question:
        "how can you specify that an event listener should use capturing?",
      options: {
        a: "elem.addEventListener(..., true)",
        b: "elem.addEventListener(..., false)",
        c: "elem.addEventListener(..., capture: false)",
        d: "elem.addEventListener(..., capture: true)",
      },
      answer: "a", // correct answer: elem.addEventListener(..., true)
    },
    {
      id: 12,
      question: "what does the `onload` event do?",
      options: {
        a: "it executes code when an element is clicked",
        b: "it executes code when the page is resized",
        c: "it executes code when the page is fully loaded",
        d: "it executes code when a key is pressed",
      },
      answer: "c", // correct answer: it executes code when the page is fully loaded
    },
    {
      id: 13,
      question:
        "which event is triggered when a user moves focus to an input element?",
      options: {
        a: "onblur",
        b: "onfocus",
        c: "onload",
        d: "onchange",
      },
      answer: "b", // correct answer: onfocus
    },
    {
      id: 14,
      question: "what type of event is the `change` event?",
      options: {
        a: "a mouse event",
        b: "a keyboard event",
        c: "a form event",
        d: "a window event",
      },
      answer: "c", // correct answer: a form event
    },
    {
      id: 15,
      question: "what is the main advantage of using events in javascript?",
      options: {
        a: "to improve the performance of web applications",
        b: "to allow user interaction and create dynamic pages",
        c: "to reduce the size of the html document",
        d: "to automate tasks without user input",
      },
      answer: "b", // correct answer: to allow user interaction and create dynamic pages
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
