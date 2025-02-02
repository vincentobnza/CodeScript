import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Undo2, LoaderCircle } from "lucide-react";
import { Pretest } from "@/data/Pretest";
import { RadioGroup, Radio, Button, Spinner } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

import supabase from "../config/supabaseClient";

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
        <Undo2 size={14} />
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
  const { user } = useAuth();
  const [done, setDone] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    const fetchPretest = async () => {
      setLoading(true);
      try {
        const { data: existingTest, error: existingError } = await supabase
          .from("pre-test")
          .select("status, score, percentage")
          .eq("lesson", lesson)
          .eq("user_id", user?.id)
          .single();

        if (existingError && existingError.code !== "PGRST116") {
          throw existingError;
        }

        if (existingTest) {
          setDone(true);
          setScore(existingTest);
          setLoading(false);
          return;
        }

        // Fetch pretest questions
        const { data, error } = await supabase
          .from("pre-test-questions")
          .select("*")
          .eq("lesson", lesson);

        if (error) throw error;

        if (data) {
          setTest(data);
          setAnswers({});
          setIsSubmitted(false);
          setScore(null);
        }
      } catch (error) {
        console.error("Error fetching pretest:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPretest();
    }
  }, [lesson, user]);

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
      if (question && question.answer === answer) {
        correctCount++;
      }
    });
    return {
      score: correctCount,
      total: test.length,
      percentage: Math.round((correctCount / test.length) * 100),
    };
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== test.length) {
      setIsModalOpen(true);
      return;
    }
    setSubmitting(true);
    try {
      const result = calculateScore();
      setScore(result);
      setIsSubmitted(true);

      // Save result to Supabase
      const { data, error } = await supabase.from("pre-test").insert({
        user_id: user?.id,
        lesson: lesson,
        score: result.score,
        status: "done",
        percentage: result.percentage,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error submitting pretest:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <Spinner color="success" />
      </div>
    );
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        duration={{ opacity: 0.3, transition: 0.5 }}
        className="relative flex flex-col items-center justify-center w-full max-w-xl gap-4 p-5 mx-auto text-center"
      >
        <div className="absolute w-[240px] h-[100px] bg-slate-400/60 rounded-full bottom-8 z-0 filter blur-[80px]" />

        <img
          src="https://cdn-icons-png.flaticon.com/128/12510/12510927.png"
          alt="check"
          className="w-16 mb-6"
        />
        <h1 className="z-10 mb-2 text-3xl font-medium md:text-5xl">
          Pre-test Completed
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-300">
          You have completed the pre-test for this lesson.
        </p>

        <p className="mt-10 font-semibold">
          Your score: {score.score} out of {test.length}
        </p>
      </motion.div>
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

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

// POPUP MODAL WHEN USER CLICK THE SUBMIT BUT THE QUESTION IS NOT FULLY ANSWERED

const Modal = ({ isOpen, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 1 : 0 }}
        exit={{ scale: 0 }}
        className="relative w-full max-w-sm p-6 mx-4 my-10 bg-white border rounded-lg shadow-lg dark:bg-zinc-900 dark:border-zinc-700 flex flex-col justify-center items-center text-center"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-zinc-600 dark:text-zinc-400"
        >
          <Undo2 size={16} />
        </button>
        <h2 className="mb-4 text-amber-500 text-2xl font-medium">Warning</h2>
        <p className="mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          Please answer all questions before submitting.
        </p>

        <button
          onClick={onClose}
          className="mt-10 py-1 px-4 flex text-sm text-yellow-300 rounded bg-yellow-500/20 border border-yellow-700"
        >
          Go back
        </button>
      </motion.div>
    </motion.div>
  );
};
