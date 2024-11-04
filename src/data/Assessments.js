export const assessments = [
  {
    id: 1,
    title: "Declare a variable.",
    description:
      "Declare a variable named 'age' with a value of 25 using 'let'.",
    expectedOutput: "25",
    initialCode: "// Your code here\n",
    answerToCheck: "let age = 25;",
    points: 100,
  },
  {
    id: 2,
    title: "Arithmetic Operator - Multiplication",
    description:
      "Declare two variables, 'x' with the value 7 and 'y' with the value 8, Use the multiplication operator to find their product and store it in a variable named 'product'. Assigned all of them in the let keyword. Use the console.log to print the value of 'product'.",
    expectedOutput: "56",
    initialCode: "// Your code here\n",
    answerToCheck: "let x = 7; let y = 8; let product = x * y;",
    points: 100,
  },
  {
    id: 3,
    title: "Conditional Statements Practice",
    description:
      "Create a conditional statement that checks if the variable 'score' is greater than 70. If true, set the variable 'result' to 'Passed'. If the 'score' is 50 or greater but not more than 70, set 'result' to 'Retake'. Otherwise, set 'result' to 'Failed'.",
    expectedOutput: "Passed", // Example expected output assuming score > 70
    initialCode: `// Your code here\nlet score = 85;\nlet result;`,
    answerToCheck: `if (score > 70) {
         result = 'Passed';
       } else if (score >= 50 && score <= 70) {
         result = 'Retake';
       } else {
         result = 'Failed';
       }`,
    points: 100,
  },

  {
    id: 3,
    title: "Loops Practice",
    description:
      "Write a loop that iterates through the numbers 1 to 10 and logs only the even numbers to the console. Use a 'for' loop, a 'while' loop, and a 'do...while' loop for this task, demonstrating each loop type.",
    expectedOutput: "2\n4\n6\n8\n10", // Expected output for each loop
    initialCode: `// Your code here\n\n// Using a for loop\nfor (let i = 1; i <= 10; i++) {\n  // Add code here\n}\n\n// Using a while loop\nlet j = 1;\nwhile (j <= 10) {\n  // Add code here\n  j++;\n}\n\n// Using a do...while loop\nlet k = 1;\ndo {\n  // Add code here\n  k++;\n} while (k <= 10);`,
    answerToCheck: `
      // Using a for loop
      for (let i = 1; i <= 10; i++) {
        if (i % 2 === 0) {
          console.log(i);
        }
      }

      // Using a while loop
      let j = 1;
      while (j <= 10) {
        if (j % 2 === 0) {
          console.log(j);
        }
        j++;
      }

      // Using a do...while loop
      let k = 1;
      do {
        if (k % 2 === 0) {
          console.log(k);
        }
        k++;
      } while (k <= 10);
    `,
    points: 100,
  },

  {
    id: 4,
    title: "For Loop Practice",
    description:
      "Write a 'for' loop that iterates through the numbers from 1 to 20. Log each number to the console, but if the number is divisible by 3, log 'Fizz' instead. If it is divisible by 5, log 'Buzz'. If it is divisible by both 3 and 5, log 'FizzBuzz'.",
    expectedOutput:
      "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz\n16\n17\nFizz\n19\nBuzz", // Expected output based on conditions
    initialCode: `// Write a for loop to iterate from 1 to 20\nfor (let i = 1; i <= 20; i++) {\n  // Add your code here\n}`,
    answerToCheck: `
      for (let i = 1; i <= 20; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
          console.log("FizzBuzz");
        } else if (i % 3 === 0) {
          console.log("Fizz");
        } else if (i % 5 === 0) {
          console.log("Buzz");
        } else {
          console.log(i);
        }
      }
    `,
    points: 100,
  },

  {
    id: 5,
    title: "",
    description: "",
    expectedOutput: "",
    initialCode: ``,
    answerToCheck: ``,
    points: 100,
  },
];
