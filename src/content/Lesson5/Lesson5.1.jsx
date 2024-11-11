import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  Output,
  Highlight,
  CodeEditor,
} from "../../layout/UILayout";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson5_Topic1() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>What are Objects in JavaScript?</Topic>
          <Description>
            An object is a grouping of linked information and/or features.
            Typically, these are made up of multiple variables and functions
            (called properties and methods when they are contained within
            objects). Let us examine an example to comprehend their appearance.
          </Description>
          <Description>
            As with many things in JavaScript, defining and initializing a
            variable is frequently the first step in constructing an object. Try
            adding the line that follows beneath the existing JavaScript code in
            your file, saving it, and then refreshing it:
          </Description>

          <Code code={`const car = {}`} visibleButton={false} />
          <Description>
            In JavaScript, as in many other things, initializing and declaring a
            variable is often the first step towards constructing an object. Try
            adding the following line to your file underneath the JavaScript
            code that is currently there, saving it, and then refreshing it:
          </Description>

          <Code
            code={`const car = {
  name: ['Mustang', 'Ferrari'],
  color: "red",
  start: function () {
    console.log(\`\${this.name[0]} and \${this.name[1]} color is \${this.color}\`)
  }
}`}
          />

          <CodeEditor />

          <Description>
            Try typing some of the following into the JavaScript console on your
            browser's devtools after saving and refreshing:
          </Description>
          <Code
            code={`const car = {
  name: ['Mustang', 'Ferrari'],
  color: "red",
  start: function () {
    console.log(\`\${this.name[0]} and \${this.name[1]} color is \${this.color}\`)
  }
}

car.start()`}
          />

          <Output output={`Mustang and Ferrari color is red`} />
          <CodeEditor />
        </section>
        <section id="section2">
          <Title>Dot Notation</Title>
          <Description>
            Above, you accessed the object's properties and methods using dot
            notation. The object car (car) acts as the namespace — it must be
            entered first to access anything inside the object. Next you write a
            dot, then the item you want to access — this can be the name of a
            simple property, an item of an array property, or a call to one of
            the object's methods, for example:
          </Description>

          <Code
            code={`car.name;
car.start()`}
          />
        </section>
        <section id="section3">
          <Title>Objects as Object Properties</Title>
          <Description>
            An object property can itself be an object. For example, try
            changing the car member from
          </Description>
          <Code
            code={`const car = {
  name: ["Volvo", "Tesla"];
}`}
          />
          <Description>To</Description>
          <Code
            code={`const car = {
  name: {
    first: "Volvo",
    last: "Tesla"
  }
}`}
          />

          <Description>
            Try these in the JS console: To access these items, simply chain the
            additional step onto the end with another dot.
          </Description>
          <Code
            visibleButton={false}
            code={`car.name.first;
car.name.last;`}
          />
        </section>

        <section id="section4">
          <Title>Bracket Notation</Title>
          <Description>
            Another method for accessing object properties is to use bracket
            notation. Rather than employing the following dot notation:
          </Description>
          <Code
            visibleButton={false}
            code={`car.color
car.name.first`}
          />

          <Description>You can use square brackets</Description>
          <Code
            visibleButton={false}
            code={`car["red"]
car["Volvo"]["Tesla"]`}
          />
        </section>

        <section id="section5">
          <Title>this keyword</Title>
          <Description>
            The this keyword in JavaScript denotes an object. Depending on how
            it is used, the following items are referenced by this keyword:
          </Description>

          <div className="relative mt-5 w-full bg-zinc-50 dark:bg-[#202020] py-5 px-8 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <span className="before:content-[''] before:left-0 before:top-0 before:h-full before:w-[5px] before:bg-green-600 before:absolute"></span>
            <ul className="space-y-2">
              <li>This is the object in an object method.</li>
              <li>This alone alludes to the universal object.</li>
              <li>This alludes to the global object in a function. </li>
              <li>This is undefined in a function in strict mode. </li>
              <li>
                This is the element that received the event in the case of an
                event.{" "}
              </li>
              <li>
                This can be referenced by methods such as call(), apply(), and
                bind() to any object.
              </li>
            </ul>
          </div>

          <Code
            code={`const person = {
  name: "Vincent",
  age: 21,
  greet: function() {
    console.log("Hello, my name is " + this.name + " and I am " + this.age + " years old.");
  }
};

person.greet();  // Output: "Hello, my name is Vincent and I am 25 years old."
`}
          />

          <Output output={`Hello, my name is Vincent and I am 21 years old.`} />
          <CodeEditor />
        </section>

        <section id="section6">
          <Title>Object Constructors in JavaScript</Title>
          <Description>
            An object can be created using either the object constructor or an
            object literal. Object literals have been the objects used as
            examples in this text thus far. In order to build a single object,
            object literals are a good choice.
          </Description>
          <Description>
            Constructors are just functions with uppercase names. A constructor
            name's capitalization has no bearing on the object itself. It serves
            just as a method of identification.
          </Description>

          <Description>
            By invoking a constructor with the new keyword, you can utilize it
            to create a new object. An object instance will be created by the
            new keyword, which will then be bound to the newly created object.
          </Description>

          <Description>An example of an object constructor is:</Description>
          <Code
            code={`function Profile(name, age, nationality){
  this.name = name;
  this.age = age;
  this.nationality = nationality;
  this.bio = function(){
    console.log(\`My name is \${this.name}. I'm \${this.age} years old. I'm from \${this.nationality}\`)
  }
};

const getName = new Profile("John", 20, 'England');
console.log(getName.bio());`}
          />

          <Output
            output={`My name is John. I'm 20 years old. I'm from England`}
          />
          <CodeEditor />

          <Description>
            This code defines a constructor <Highlight>function</Highlight>{" "}
            Profile, which creates objects with properties{" "}
            <Highlight>name</Highlight>, <Highlight>age</Highlight>, and
            <Highlight> nationality</Highlight>. It also includes a bio method
            that logs a message introducing the person. When a new instance is
            created using{" "}
            <Highlight>new Profile("John", 20, 'England')</Highlight>, the{" "}
            <Highlight>bio </Highlight>
            method outputs "My name is John. I'm 20 years old. I'm from England"
            to the console. This demonstrates how constructor functions are used
            to create multiple objects with shared properties and methods in
            JavaScript.
          </Description>
        </section>

        <section id="section7">
          <Title>Objects Copies in JavaScript</Title>
          <Description>
            When an existing object is assigned to another variable, it creates
            a reference in memory rather than a copy of the original, in
            contrast to simple data types like strings and numbers.
          </Description>
          <Description>
            This indicates that the same memory location is being referenced by
            the original object and any subsequent objects made by setting the
            original object as a value.
          </Description>
          <Code
            code={`let x = 10;
let y = x;
x = 20;
console.log(x);
console.log(y);



let object4 = {
  name: "Victor",
  age: 30,
};

let object5 = object4;
console.log(object5);
object4.name = "John";
console.log(object5)
console.log(object4 === object5);`}
          />

          <Output
            output={`20
10
[object Object]
[object Object]
true`}
          />
          <CodeEditor />
        </section>

        <section id="section8">
          <Title>spread operator</Title>
          <Description>
            The spread operator is represented by three dots ... ..The spread
            operator can be used to copy values from any iterable, including
            objects.
          </Description>

          <Description>
            An object that can be iterated over or looped over with the aid of a
            for loop is called an iterable. Iterables can be arrays, strings,
            sets, objects, and more.
          </Description>

          <Description>
            You must prefix the spread operator with the object you wish to copy
            from in order to utilize it. For example:
          </Description>

          <Code
            code={`let x = 10;
let y = x;
x = 20;
console.log(x);
console.log(y);



let object4 = {
  name: "Victor",
  age: 30,
};

let object5 = object4;
console.log(object5);
object4.name = "John";
console.log(object5)
console.log(object4 === object5);

let object6 = {...object5};
object5.name="Pedro";
console.log(object5)
console.log(object6)
console.log(object5 === object6)`}
          />

          <Output
            output={`20
10
[object Object]
[object Object]
true
[object Object]
[object Object]
false`}
          />
          <CodeEditor />

          <Description>
            As you can see, a change in object6 did not result in a change in
            object5, in contrast to the preceding code sample where a change in
            object4 generated a change in object5.
          </Description>
        </section>

        <section id="section9">
          <Title>Conclusion</Title>
          <Description>
            In JavaScript, objects are probably the most important data type.
            Programming concepts like Object-Oriented Programming (OOP) work on
            the principle of leveraging the flexibility of objects to store
            complex values and their distinct capability of interacting with
            properties and methods within the object. Objects allow developers
            to model real-world entities by encapsulating data (properties) and
            behavior (methods) into a single unit. Through features like
            constructors and prototypes, JavaScript enables the creation of
            reusable object blueprints, fostering code organization,
            scalability, and reusability. This approach simplifies handling
            complex systems by grouping related data and actions into cohesive
            objects.
          </Description>

          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/4uVwGw317QM?si=OIkczFHdz8iWKQ-X"
            thumbnailSrc="https://img.youtube.com/vi/4uVwGw317QM/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=4uVwGw317QM"
          />
        </section>

        <NextButton
          link="/learn-js/array-array-methods"
          text="Array and Array Methods"
        />
      </div>
    </div>
  );
}
