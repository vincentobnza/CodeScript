import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Undo2, CheckCircle, XCircle, HelpCircle } from "lucide-react";
import { Pretest } from "@/data/Pretest";

export default function PretestPage() {
  return (
    <div className="min-h-screen dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="max-w-4xl px-4 pb-10 mx-auto">
        <Header />
        <Content />
      </div>
    </div>
  );
}

const Header = () => {
  const { lesson } = useParams();
  const les = lesson;
  const formattedLesson =
    les.charAt(0).toUpperCase() + les.slice(1).replace("1", " 1");

  return (
    <div className="mb-12">
      <Link
        to="/learn-js"
        className="inline-flex items-center gap-2 mb-6 text-sm transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        <Undo2 size={18} />
        Return to Lessons
      </Link>
      <h1 className="mb-2 text-2xl font-medium">
        Pretest on {formattedLesson}
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Test your knowledge before starting the lesson.
      </p>
    </div>
  );
};

const Content = () => {
  const { lesson } = useParams();
  const [test, setTest] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const testData = Pretest[lesson];

    if (testData) {
      setTest(testData);
      setAnswers({});
      setShowResults(false);
    } else {
      console.log("Pre test not found");
    }
  }, [lesson]);

  return <></>;
};
