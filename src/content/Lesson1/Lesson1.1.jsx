import {
  Topic,
  Description,
  Title,
  List,
  NextButton,
} from "../../layout/UILayout";

export default function Lesson1_Topic1() {
  return (
    <div className="w-full max-w-screen-lg mx-auto bg-white dark:bg-zinc-900">
      <div className="flex flex-col gap-2">
        <section id="section1">
          <Topic>What is JavaScript</Topic>
          <Description>
            In this language, the programs are referred to as scripts. They can
            be written directly in the HTML of a web page and launched instantly
            upon page load. Scripts are given as plain text and run in that
            format. They can operate without any additional setup or
            compilation. JavaScript and Java are two quite distinct languages in
            this regard.
          </Description>

          <Title>Why is it called JavaScript?</Title>
          <Description>
            JavaScript was first developed under the moniker "LiveScript."
            However, given the popularity of Java at the time, it was thought
            that marketing a new language as its "younger brother" would be
            beneficial.
          </Description>

          <Description>
            However, as it developed, JavaScript separated from Java to become a
            completely separate language with its own specification, known as
            ECMAScript.
          </Description>

          <Title>What distinguishes JavaScript from others?</Title>
          <Description>
            JavaScript has at least three excellent features:
          </Description>

          <List
            items={[
              "Integrated HTML and CSS completely.",
              "Easy tasks are completed easily.",
              "Compatible with all popular browsers and turned on by default.",
            ]}
          />

          <Description>
            The only browser technology that combines all three of these
            features is JavaScript. Because of this, JavaScript is distinct. It
            is the most used tool for developing browser interfaces because of
            this. Nevertheless, JavaScript can be utilized to develop mobile
            apps, servers, and other software.
          </Description>
        </section>

        <section id="section2">
          <div className="relative flex flex-col w-full gap-3 p-5 mt-5 mb-3 border bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-zinc-700">
            <h3 className="text-zinc-700 dark:text-zinc-200">{`Summary`}</h3>

            <List
              items={[
                `Although JavaScript was once designed exclusively for usage in browsers, it is today utilized in a wide range of other contexts.`,
                `As the most extensively used browser language today, JavaScript holds a special place because it is completely integrated with HTML and CSS.`,
                `Numerous languages can be "transpiled" to JavaScript to offer certain functionalities. After you've mastered JavaScript, you should at least quickly glance at them.`,
              ]}
            />
          </div>
        </section>

        <NextButton
          link="/learn-js/development-environment"
          text="Development Environment"
        />
      </div>
    </div>
  );
}
