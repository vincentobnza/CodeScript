import React from "react";
import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  QuizButton,
  CodeEditor,
} from "../../layout/UILayout";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import HeroVideoDialog from "@/components/ui/HeroVideoDialog";

export default function Lesson2_Topic2() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <Topic>Operators</Topic>
        <Description>
          JavaScript operators are special symbols that perform operation on one
          or more operands (values). They are essential for manipulating data,
          performing calculations, and making decisions within your code.
        </Description>
        <Description>Types of operators: </Description>
        <section id="section1">
          <Title>Arithmetic Operators</Title>
          <Description>Addition (+ ), add two operands (value)</Description>
          <Code code={`let result = 2 + 4 ;  // result will be 6`} />
          <Description>
            Subtraction ( - ), subtracts the second operand from the first
          </Description>
          <Code code={`let difference = 20 + 4 ;  // result will be 16`} />
          <Description>
            Multiplication ( * ), multiplies two operands.
          </Description>
          <Code code={`let product = 20 * 4 ;  // result will be 80`} />
          <Description>
            Division ( / ), divides the first operand by the second.
          </Description>
          <Code code={`let product = 20 / 4 ;  // result will be 5`} />
          <Description>
            Modulo ( % ), returns the reminder of the division.
          </Description>
          <Code code={`let remainder = 19 % 3 ;  // result will be 6`} />
          <Description>
            Increment ( ++ ), adds 1 to the operand, it’s either before or the
            after the operation.
          </Description>
          <Code
            code={`let  x = 4 ;  
let  y = ++x ;   // result will be x becomes 5, y is 5
`}
          />
          <Description>
            Decrement ( -- ), subtracts 1 from the operand, it’s either before
            of after the operation.
          </Description>
          <Code
            code={`let  x = 11 ;  
let  y = --x ;   // result will be x becomes 10, y is 10
`}
          />
        </section>

        <section id="section2">
          <Title>Comparison Operators:</Title>
          <Description>
            Equal to ( == ), checks if two operands are equal (loose quality).
          </Description>
          <Code
            code={`let  a = 5 ;  
let  b = "5" ;   
if(a == b){
console.log("Equal"); 
}  
// Output will be : Equal
`}
          />

          <CodeEditor />
          <Description>
            Not equal to ( != ), checks if two operands are not equal (loose
            inequality).
          </Description>
          <Code
            code={`let  a = 10 ;  
let  b = "10" ;   
if(a != b){
console.log("Not equal");
} 
// Output will be : Not equal
`}
          />
          <CodeEditor />

          <Description>
            Strictly equal to ( === ), check if two operands are equal in both
            value and type.
          </Description>
          <Code
            code={`let  a = 10 ;  
let  b = "10" ;   

if(a === b){
console.log("Strictly equal"); }  // Output will be : Nothing
`}
          />
          <CodeEditor />

          <Description>
            Strictly not equal to ( !== ), check if two operands are not equal
            in either value or type.
          </Description>
          <Code
            code={`let  a = 10 ;  
let  b = "10" ;   
// Output will be :  Strictly not equal
`}
          />
          <CodeEditor />

          <Description>
            {`Greater than ( > ), check if the first operand is greater than the
          second`}
          </Description>
          <Code
            code={`if (9 > 4) {
  console.log('Greater than');
} // Output will be :  Greater than
`}
          />
          <CodeEditor />

          <Description>
            {`Less than ( < ), checksif the first operand is less than the second.`}
          </Description>
          <Code
            code={`if( 4 < 9 ) {
console.log("Less than"); 
}  // Output will be:Less than
`}
          />
          <CodeEditor />

          <Description>
            {`Greater than or equal ( >= ), checks if the first operand is greater than or equal to the second.`}
          </Description>
          <Code
            code={`if( 10 >= 10 ) {
console.log("Greater than or equal to");
}  // Output will be :  Greater than or equal to
`}
          />
          <CodeEditor />

          <Description>
            {`Less than or equal to ( <= ), checks if the first operand is less than or equal to the second.`}
          </Description>
          <Code
            code={`if( 10 <= 10 ) {
console.log("Less than or equal to");
}  // Output will be :  Less than or equal to
`}
          />
          <CodeEditor />
        </section>

        <section id="section3">
          <Title>Logical Operators:</Title>
          <Description>
            Logical AND ( && ), return true if both operands are true.
          </Description>
          <Code
            code={`if( true && true ) {
console.log("Both true"); 
}  // Output will be :  Nothing
`}
          />
          <CodeEditor />
          <Description>
            {`Logical OR ( || ), returns true if at least one operand is true.`}
          </Description>
          <Code
            code={`if(true || false) {
console.log("at least one is true"); 
}  // Output will be :  at least one is true
`}
          />
          <CodeEditor />

          <Description>
            Logical NOT ( ! ), reverses the logical value of an operand.
          </Description>
          <Code
            code={`if(!false) {
console.log("Not false"); 
}  // Output will be :  Not false
`}
          />
          <CodeEditor />
        </section>
        <section id="section4">
          <Title>Assignment Operators</Title>
          <Table
            aria-label="Example static collection table"
            className="border border-zinc-200 dark:border-zinc-700 rounded-2xl"
          >
            <TableHeader>
              <TableColumn></TableColumn>
              <TableColumn>Symbol</TableColumn>
              <TableColumn>Description</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Assignment</TableCell>
                <TableCell>{"="}</TableCell>
                <TableCell>Assigns a value to a variable</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Addition Assignment</TableCell>
                <TableCell>{"+="}</TableCell>
                <TableCell>
                  Adds the right operand to the left operand and assign the
                  result to the left operand
                </TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Subtract Assignment</TableCell>
                <TableCell>{"-="}</TableCell>
                <TableCell>
                  Subtracts the right operand from the left operand and assigns
                  the result to the left operand.
                </TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>Multiplication Assignment</TableCell>
                <TableCell>{"*="}</TableCell>
                <TableCell>
                  Multiplies the right operand with the left operand and assigns
                  the result to the left operand.
                </TableCell>
              </TableRow>
              <TableRow key="5">
                <TableCell>Division Assignment</TableCell>
                <TableCell>{"/="}</TableCell>
                <TableCell>
                  Divides the left operand by the right operand and assigns the
                  result to the left.
                </TableCell>
              </TableRow>
              <TableRow key="6">
                <TableCell>Modulo Assignment</TableCell>
                <TableCell>{"%="}</TableCell>
                <TableCell>
                  Calculates the remainder of the division and assigns it to the
                  left operand.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
        <section id="section5">
          <Title>Conditional Operator ( ? : )</Title>
          <Description>
            it provides a concise way to write conditional expressions.
          </Description>
          <Code
            code={`let age = 25;
let message = age >= 18 ? "You are an adult" : "You are a minor";
console.log(message);   // Result will be: You are an adult
`}
          />
          <CodeEditor />

          <Title>Bit wise operators</Title>
          <Description>It’s operate on individual bits of numbers.</Description>
          <Title>String operators</Title>
          <Description>
            Concatenation ( + ), it joints two strings together.
          </Description>
          <Code
            code={`let str1 = "Hello" ;
let str2 = "World";
let result = str1 + str2;   // output will be: “Hello World”
`}
          />
          <CodeEditor />

          <Title>Typeof Operator</Title>
          <Code
            code={`let num = 10 ;
let str = “Hello” ;
let bool = true ;

console.log( typeof num);   // output will be:  number
console.log( typeof str);       // output will be:  string
console.log( typeof bool);   // output will be:   Boolean
`}
          />
          <CodeEditor />

          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/4UwdF2Ia8rY?si=qVG7Eq58hbH6XzyV"
            thumbnailSrc="https://img.youtube.com/vi/4UwdF2Ia8rY/maxresdefault.jpg"
            link="https://www.youtube.com/watch?v=4UwdF2Ia8rY"
          />
        </section>
        <div className="flex items-center justify-end w-full gap-3">
          <NextButton
            link="/learn-js/comments-code-structure"
            text="Comments & Code Structure"
          />
        </div>
      </div>
    </div>
  );
}
