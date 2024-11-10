import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  QuizButton,
  Output,
  CodeEditor,
} from "../../layout/UILayout";
import { Link } from "react-router-dom";

export default function Lesson5_Topic2() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>JavaScript Arrays</Topic>
          <Description>
            An array is a special variable, which can hold more than one value:
          </Description>

          <Code
            visibleButton={false}
            code={`const cars = ["Ferrari", "Volvo", "BMW"]`}
          />
          <Title>Why use Arrays?</Title>
          <Description>
            For example, if you have a list of automobile names, you could store
            the cars in single variables like this:
          </Description>

          <Code
            visibleButton={false}
            code={`let car1 = "Saab";
let car2 = "Volvo";
let car3 = "BMW";
`}
          />
          <Description>
            But what if you want to search for a specific car by looping across
            the fleet? And what if you had 300 cars instead of only 3?{" "}
          </Description>
          <Description>An array is the answer! </Description>
          <Description>
            A value can be accessed by using an index number, and an array can
            store several values under a single name.
          </Description>
        </section>

        <section id="section2">
          <Title>Creating an Array</Title>
          <Description>
            The simplest method for creating a JavaScript array is to use an
            array literal.
          </Description>

          <Description>Syntax:</Description>
          <Code code={`const cars = [car1, car2, ...];`} />
          <Description>
            Spaces and line breaks are not important. A declaration can span
            multiple lines:
          </Description>

          <Code
            code={`const cars = [
    "Ferrari",
    "Mustang",
    "BMW"
]`}
          />
          <Description>
            You can also construct an array, and then specify the elements:
          </Description>

          <Code
            code={`const cars = []

cars[0] = "Ferrari";
cars[1] = "Mustang";
cars[2] = "BMW";`}
          />
        </section>

        <section id="section3">
          <Title>Using the JavaScript keyword “new”</Title>
          <Description>
            An array is also created and values are assigned to it in the
            example that follows:
          </Description>
          <Code
            code={`const cars = new Array("Saab", "Volvo", "BMW");


console.log(cars)`}
          />

          <Output output={`Saab,Volvo,BMW`} />
          <CodeEditor />
        </section>

        <section id="section4">
          <Title>Getting to Know Array Elements</Title>

          <Description>
            An array element can be accessed by using its index number:
          </Description>

          <Code
            code={`const animals = ["dog", "cat", "bird", "chicken"];
let animal  = "penguin"`}
          />
          <CodeEditor />

          <Title>Altering an Element in an Array</Title>

          <Description>
            The initial element in autos is now worth less according to this
            statement:
          </Description>

          <Code code={`animals[0] = "penguin";`} />
          <Description>Example</Description>
          <Code
            code={`const animals = ["dog", "cat", "bird", "chicken"];
animals[0] = "penguin"


console.log(animals)`}
          />
        </section>

        <section id="section5">
          <Title>JavaScript Array Methods</Title>
          <Title>length()</Title>
          <Description>
            In JavaScript, `Array.length` is a property that returns the number
            of elements in an array. It can also be used to set the array
            length, which can add or remove elements.
          </Description>
          <Code
            code={`let person = ["Pedro", "Juan"];
console.log(person.length);`}
          />
          <CodeEditor />

          <Title>Adding and removing elements</Title>
          <Title>push()</Title>
          <Code
            code={`let fruits = ['Apple', 'banana'];
fruits.push("orange","grape");


console.log(fruits);
console.log(fruits.length)`}
          />
          <CodeEditor />

          <Description>
            The push() method adds elements to the end of an array and returns
            the new length of the array.
          </Description>

          <Title>pop()</Title>
          <Code
            code={`let numbers = [1, 2, 3, 4];
let lastElement = numbers.pop();

console.log(lastElement); // Output: 4
console.log(numbers); // Output: [1, 2, 3]
`}
          />
          <CodeEditor />

          <Description>
            The pop() method removes the last element from an array and returns
            that element.
          </Description>

          <Title>shift()</Title>
          <Code
            code={`let items = ['a', 'b', 'c'];
let firstElement = items.shift();

console.log(firstElement); // Output: 'a'
console.log(items); // Output: ['b', 'c']
`}
          />
          <CodeEditor />

          <Description>
            The shift() method removes the first element from an array and
            returns that element.
          </Description>

          <Title>unshift()</Title>
          <Code
            code={`let values = [2, 3, 4];
values.unshift(1);

console.log(values); // Output: [1, 2, 3, 4]
`}
          />
          <CodeEditor />

          <Description>
            The unshift() method adds one or more elements to the beginning of
            an array and returns the new length of the array.
          </Description>

          <Title>concat()</Title>
          <Code
            code={`let arr1 = [1, 2];
let arr2 = [3, 4];
let combined = arr1.concat(arr2);

console.log(combined); // Output: [1, 2, 3, 4]
`}
          />
          <CodeEditor />

          <Description>
            The concat() method combines two or more arrays into a new array.
          </Description>

          <Title>slice()</Title>
          <Code
            code={`let letters = ['a', 'b', 'c', 'd'];
let part = letters.slice(1, 3);

console.log(part); // Output: ['b', 'c']
console.log(letters); // Output: ['a', 'b', 'c', 'd']`}
          />
          <CodeEditor />

          <Description>
            The slice() method returns a shallow copy of a portion of an array
            without modifying the original array.
          </Description>

          <Title>splice()</Title>
          <Code
            code={`let arr = [1, 2, 3, 4];
arr.splice(1, 2, 'a', 'b');

console.log(arr); // Output: [1, 'a', 'b', 4]
`}
          />
          <CodeEditor />
          <Description>
            The splice() method changes an array by adding, removing, or
            replacing elements in place.
          </Description>

          <Title>forEach()</Title>
          <Code
            code={`let numbers = [1, 2, 3];
numbers.forEach(num => console.log(num * 2));

// Output: 2, 4, 6
`}
          />
          <CodeEditor />

          <Description>
            The forEach() method executes a provided function once for each
            array element.
          </Description>

          <Title>map()</Title>
          <Code
            code={`let numbers = [1, 2, 3];
let doubled = numbers.map(num => num * 2);

console.log(doubled); // Output: [2, 4, 6]
`}
          />
          <CodeEditor />
          <Description>
            The map() method creates a new array with the results of calling a
            function on every element in the array.
          </Description>

          <Title>filter()</Title>
          <Code
            code={`let numbers = [1, 2, 3, 4];
let greaterThanTwo = numbers.filter(num => num > 2);

console.log(greaterThanTwo); // Output: [3, 4]
`}
          />
          <CodeEditor />
          <Description>
            The filter() method creates a new array with elements that pass the
            test in a provided function.
          </Description>

          <Title>reduce()</Title>
          <Code
            code={`let numbers = [1, 2, 3, 4];
let sum = numbers.reduce((acc, num) => acc + num, 0);

console.log(sum); // Output: 10
`}
          />
          <CodeEditor />
          <Description>
            The reduce() method executes a reducer function on each element of
            the array, resulting in a single value.
          </Description>

          <Title>find()</Title>
          <Code
            code={`let numbers = [1, 2, 3, 4];
let found = numbers.find(num => num > 2);

console.log(found); // Output: 3
`}
          />
          <CodeEditor />
          <Description>
            The find() method returns the first element that satisfies the
            provided function.
          </Description>

          <Title>findIndex()</Title>
          <Code
            code={`let numbers = [1, 2, 3, 4];
let index = numbers.findIndex(num => num > 2);

console.log(index); // Output: 2
`}
          />
          <CodeEditor />
          <Description>
            The findIndex() method returns the index of the first element that
            satisfies the provided function.
          </Description>

          <Title>indexOf()</Title>
          <Code
            code={`let fruits = ['apple', 'banana', 'cherry'];
let index = fruits.indexOf('banana');

console.log(index); // Output: 1
`}
          />
          <CodeEditor />
          <Description>
            The indexOf() method returns the first index at which a given
            element can be found.
          </Description>

          <Title>includes()</Title>
          <Code
            code={`let fruits = ['apple', 'banana', 'cherry'];
let hasBanana = fruits.includes('banana');

console.log(hasBanana); // Output: true
`}
          />
          <CodeEditor />
          <Description>
            The includes() method checks if an array contains a specified
            element and returns a boolean.
          </Description>

          <Title>sort()</Title>
          <Code
            code={`let numbers = [3, 1, 4, 2];
numbers.sort();

console.log(numbers); // Output: [1, 2, 3, 4]
`}
          />
          <CodeEditor />
          <Description>
            The sort() method sorts the elements of an array in place and
            returns the sorted array.
          </Description>

          <Title>reverse()</Title>
          <Code
            code={`let numbers = [1, 2, 3];
numbers.reverse();

console.log(numbers); // Output: [3, 2, 1]
`}
          />
          <CodeEditor />
          <Description>
            The reverse() method reverses the order of the elements in an array
            in place.
          </Description>

          <Title>join()</Title>
          <Code
            code={`let words = ['hello', 'world'];
let sentence = words.join(' ');

console.log(sentence); // Output: 'hello world'
`}
          />
          <CodeEditor />
          <Description>
            The join() method joins all elements of an array into a string, with
            a specified separator.
          </Description>

          <Title>every()</Title>
          <Code
            code={`let numbers = [1, 2, 3, 4];
let allPositive = numbers.every(num => num > 0);

console.log(allPositive); // Output: true
`}
          />
          <CodeEditor />
          <Description>
            The every() method tests whether all elements in the array pass the
            test implemented by the provided function.
          </Description>

          <Title>some()</Title>
          <Code
            code={`let numbers = [1, 2, 3, 4];
let hasGreaterThanThree = numbers.some(num => num > 3);

console.log(hasGreaterThanThree); // Output: true
`}
          />
          <CodeEditor />

          <Description>
            The some() method tests whether at least one element in the array
            passes the test implemented by the provided function.
          </Description>

          <Title>flat()</Title>
          <Code
            code={`let arr = [1, [2, 3], [4, 5]];
let flatArr = arr.flat();

console.log(flatArr); // Output: [1, 2, 3, 4, 5]
`}
          />
          <CodeEditor />

          <Description>
            The flat() method flattens a nested array into a single-level array.
          </Description>

          <Title>flatMap()</Title>
          <Code
            code={`let numbers = [1, 2, 3];
let result = numbers.flatMap(num => [num, num * 2]);

console.log(result); // Output: [1, 2, 2, 4, 3, 6]
`}
          />
          <CodeEditor />

          <Description>
            The flatMap() method maps each element and flattens the result into
            a new array.
          </Description>

          <Title>fill()</Title>
          <Code
            code={`let numbers = [1, 2, 3, 4];
numbers.fill(0, 1, 3);

console.log(numbers); // Output: [1, 0, 0, 4]
`}
          />
          <CodeEditor />

          <Description>
            The fill() method fills all or part of the array with a static
            value.
          </Description>

          <Title>from()</Title>
          <Code
            code={`let str = 'hello';
let arr = Array.from(str);

console.log(arr); // Output: ['h', 'e', 'l', 'l', 'o']
`}
          />
          <CodeEditor />

          <Description>
            The from() method creates a new array from an array-like or iterable
            object.
          </Description>

          <Title>isArray()</Title>
          <Code
            code={`console.log(Array.isArray([1, 2, 3])); // Output: true
console.log(Array.isArray('hello')); // Output: false
`}
          />
          <CodeEditor />

          <Description>
            The isArray() method checks if a value is an array and returns a
            boolean.
          </Description>
        </section>

        <div className="flex items-center justify-end w-full gap-3">
          <QuizButton text="Lesson 5" link="/quiz/lesson5" />
          <NextButton link="/learn-js/dom" text="What is DOM?" />
        </div>
      </div>
    </div>
  );
}
