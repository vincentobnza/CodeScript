import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Undo2, LoaderCircle } from "lucide-react";
import { Pretest } from "@/data/Pretest";
import { RadioGroup, Radio, Button, Spinner } from "@nextui-org/react";

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

  const formatLesson = (les) => {
    const lessonParts = les.match(/[a-zA-Z]+|[0-9]+/g); // Split letters and numbers
    return lessonParts
      .map((part, index) =>
        index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : ` ${part}`
      )
      .join("");
  };

  const formattedLesson = formatLesson(lesson);

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const testData = Pretest[lesson];
    if (testData) {
      setTest(testData);
      setAnswers({});
      setIsSubmitted(false);
      setScore(null);
      setLoading(false);
    } else {
      console.error("Pretest not found for lesson:", lesson);
      setLoading(false);
    }
  }, [lesson]);

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = test.find((q) => q.id === parseInt(questionId));
      if (question && question.correctAnswer === answer) {
        correctCount++;
      }
    });
    return {
      score: correctCount,
      total: test.length,
      percentage: Math.round((correctCount / test.length) * 100),
    };
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length !== test.length) {
      alert("Please answer all questions before submitting!");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      const result = calculateScore();
      setScore(result);
      setIsSubmitted(true);
      setSubmitting(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Spinner color="warning" />
      </div>
    );
  }

  if (isSubmitted && score) {
    return (
      <div className="w-full max-w-screen-lg p-6 mx-auto bg-white border rounded-md shadow dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 border-zinc-200 dark:border-zinc-700">
        <div className="text-center">
          <h2 className="mb-8 text-2xl font-medium">Pre Test Results</h2>
          <div className="mb-10 text-4xl font-bold text-green-600">
            {score.percentage}%
          </div>
          <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-300">
            You got {score.score} out of {score.total} questions correct
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-screen-lg gap-3 mx-auto">
      {test.map((item) => (
        <div
          key={item.id}
          className="p-4 bg-white border rounded-md shadow dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 border-zinc-200 dark:border-zinc-700"
        >
          <h2 className="mb-6 text-lg font-medium">{item.question}</h2>
          <RadioGroup
            size="sm"
            color="warning"
            value={answers[item.id]}
            onValueChange={(value) => handleAnswerChange(item.id, value)}
            classNames={{
              base: "flex flex-col gap-2",
              wrapper: "flex flex-col gap-2",
            }}
          >
            {Object.entries(item.options).map(([key, option]) => (
              <Radio
                key={key}
                value={key}
                classNames={{
                  base: "flex items-center gap-2 text-zinc-600 dark:text-zinc-300 cursor-pointer",
                  label: "text-sm ml-1",
                }}
              >
                {option}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      ))}

      <Button
        color="success"
        size="md"
        radius="sm"
        className="flex items-center self-end gap-2 mt-4"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? (
          <>
            Submitting <LoaderCircle size={14} className="animate-spin" />
          </>
        ) : (
          "Submit Pre Test"
        )}
      </Button>
    </div>
  );
};
