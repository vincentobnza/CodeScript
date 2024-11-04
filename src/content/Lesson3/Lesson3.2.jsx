import {
  Topic,
  Description,
  Title,
  Code,
  NextButton,
  QuizButton,
  Highlight,
  Output,
} from "../../layout/UILayout";

export default function Lesson3_Topic2() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>Switch Statements</Topic>

          <Title>switch</Title>
          <Description>
            The switch statement evaluates an expression, matching the
            expression's value against a series of case clauses, and executes
            statements after the first case clause with a matching value, until
            a break statement is encountered. The default clause of a switch
            statement will be jumped to if no case matches the expression's
            value.
          </Description>

          <Title>Syntax</Title>

          <Code
            code={`switch (expression) {
  case expression1:
  statements
  case expression2:
  statements
  case expression3:
  statements
  default:
  statements
}`}
          />
        </section>

        <section id="section2">
          <Title>expression</Title>
          <Description>
            An expression whose result is matched against each case clause.
          </Description>

          <Title>caseExpressionN Optional</Title>
          <Description>
            A case clause used to match against expression. If the value of
            expression matches the value of any caseExpressionN, execution
            starts from the first statement after that case clause until either
            the end of the switch statement or the first encountered break.
          </Description>

          <Title>default Optional</Title>
          <Description>
            A default clause; if provided, this clause is executed if the value
            of expression doesn't match any of the case clauses. A switch
            statement can only have one default clause.
          </Description>

          <Title>Description</Title>
          <Description>
            A switch statement first evaluates its expression. It then looks for
            the first case clause whose expression evaluates to the same value
            as the result of the input expression (using the{" "}
            <Highlight>strict equally</Highlight>
            comparison) and transfers control to that clause, executing all
            statements following that clause.
          </Description>

          <Description>
            The clause expressions are only evaluated when necessary — if a
            match is already found, subsequent case clause expressions will not
            be evaluated, even when they will be visited by{" "}
            <Highlight>fall-through</Highlight>.
          </Description>

          <Code
            code={`switch (undefined) {
  case console.log(1):
  case console.log(2):
}

// only logs 1`}
          />

          <Description>
            transfers control to that clause, executing statements following
            that clause. If no default clause is found, the program continu3:45
            PMes execution at the statement following the end of switch. By
            convention, the default clause is the last clause, but it does not
            need to be so. A switch statement may only have one default clause;
            multiple default clauses will result in a SyntaxError.
          </Description>
        </section>

        <section id="section3">
          <Title>Breaking and fall-through</Title>
          <Description>
            You can use the break statement within a switch statement's body to
            break out early, often when all statements between two case clauses
            have been executed. Execution will continue at the first statement
            following switch.
          </Description>

          <Description>
            If break is omitted, execution will proceed to the next case clause,
            even to the default clause, regardless of whether the value of that
            clause's expression matches. This behavior is called "fall-through".
          </Description>

          <Code
            code={`// Define a variable representing the day of the week
let day = 3; // 1 = Monday, 2 = Tuesday, 3 = Wednesday, etc.

// Use a switch statement to determine the day based on the value of 'day'
switch (day) {
  case 1:
    console.log("Monday");
    break; // Exits the switch once a match is found
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Invalid day");
    // 'default' is executed if no cases match the value of 'day'
}

// Explanation:
// The switch statement checks the value of 'day'.
// If 'day' is 3, the case for Wednesday will be executed, and "Wednesday" will be printed.
// The 'break' statement ensures that only the matched case is executed.
`}
          />

          <Output output={`Wednesday`} />

          <Title>Explanation</Title>
          <ul className="mt-4 mb-8 space-y-1">
            <li className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
              The variable day holds a number (representing a day of the week).
            </li>

            <li className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
              The switch statement checks the value of day against the cases.
            </li>

            <li className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
              Each case represents a possible value. If day matches a case, the
              corresponding code runs.
            </li>
            <li className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
              The break statement prevents the code from continuing to the next
              case.
            </li>
            <li className="list-disc list-inside text-zinc-600 dark:text-zinc-400">
              If none of the cases match, the default case runs as a fallback.
            </li>
          </ul>
        </section>

        <NextButton link="/learn-js/loops" text="JavaScript Loops" />
      </div>
    </div>
  );
}
