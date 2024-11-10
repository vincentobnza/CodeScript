import { Moon, Sun } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import supabase from "../config/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { Progress } from "@nextui-org/react";
import LeaveSitePrompt from "@/components/LeaveSitePrompt";
import QuizStartModal from "@/components/QuizStartModal";
import toast from "react-hot-toast";
import { NextRoute } from "../data/NextRoute";
import { MoveRight } from "lucide-react";
import confetti from "canvas-confetti";
import { useCallback } from "react";
import Trophy from "../assets/trophy.png";
import { Tooltip } from "@nextui-org/react";
import { Clock } from "lucide-react";

import { Quizzes } from "@/data/QuizData";
export default function Quiz() {
  const { theme, setTheme } = useTheme();
  const [points, setPoints] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [time, setTime] = useState(120);

  const isLowTime = time <= 10;

  const shakeAnimation = {
    shake: {
      x: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  useEffect(() => {
    let timerInterval;

    if (!isOpen && !quizCompleted && time > 0) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => {
          // If time reaches 0, clear interval and set quiz as completed
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            setQuizCompleted(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isOpen, quizCompleted, time]);

  useEffect(() => {
    if (isOpen) {
      setTime(120);
      setQuizCompleted(false);
    }
  }, [isOpen]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const triggerConfetti = useCallback(() => {
    var duration = 15 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  var count = 200;
  var defaults = {
    origin: { y: 0.7 },
  };

  return (
    <>
      <QuizStartModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <LeaveSitePrompt />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative w-full h-screen p-3 space-y-10 bg-white md:space-y-4 lg:space-y-4 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300"
      >
        <div className="flex justify-between w-full max-w-screen-lg p-2 mx-auto">
          <div className="relative flex flex-col gap-2 ml-2">
            <h1 className="text-lg font-extrabold text-transparent bg-gradient-to-br from-green-500 to-green-600 dark:to-green-800 bg-clip-text font-Orbitron">
              CodeScript
            </h1>
          </div>

          <div className="flex items-center gap-8">
            {quizCompleted && (
              <Tooltip
                offset={15}
                radius="none"
                showArrow={true}
                placement="bottom"
                content={
                  <div className="w-[220px] p-3 font-SpaceGrotesk">
                    <h1 className="mb-3 text-xs font-semibold">
                      Fantastic Score 🥳
                    </h1>
                    <div className="leading-snug text-tiny text-zinc-500 dark:text-zinc-400">
                      Celebrate your success with a burst of confetti!
                    </div>
                  </div>
                }
              >
                <button
                  onClick={triggerConfetti}
                  className="hidden px-4 py-1 text-xs font-semibold bg-transparent border rounded-full outline-none lg:flex md:flex text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700"
                >
                  Make a Celebration 🎉
                </button>
              </Tooltip>
            )}

            {/* TIMER */}

            {!quizCompleted && !isOpen && (
              <motion.div
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-800/20 border border-zinc-200 dark:border-zinc-800 shadow-xl"
                animate={isLowTime ? "shake" : ""}
                variants={shakeAnimation}
              >
                <Clock
                  className={`w-5 h-5 ${
                    isLowTime ? "text-red-500" : "text-green-500"
                  }`}
                />
                <div className="text-sm font-bold">
                  <span
                    className={`${
                      isLowTime
                        ? "text-red-500"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {isLowTime ? "Hurry!" : "Time:"}
                  </span>
                  <span
                    className={`ml-2 py-1 px-3 rounded-full ${
                      isLowTime
                        ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300"
                        : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-300"
                    }`}
                  >
                    {time}s
                  </span>
                </div>
              </motion.div>
            )}
            {quizCompleted && (
              <div className="flex items-center gap-2 text-xs font-bold">
                <h3>Points: </h3>
                <h1 className="px-2 py-[1px] text-white rounded-full bg-orange-700 border border-amber-400">
                  {points} pts
                </h1>
              </div>
            )}
            <div
              className="hidden md:flex transition duration-500 ease-in-out cursor-pointer"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
            </div>
          </div>
        </div>
        <QuizCard
          points={points}
          setPoints={setPoints}
          onComplete={triggerConfetti}
          quizCompleted={quizCompleted}
          setQuizCompleted={setQuizCompleted}
        />
      </motion.div>
    </>
  );
}

const QuizCard = ({ points, setPoints, quizCompleted, setQuizCompleted }) => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const { user } = useAuth();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { quizType } = useParams();
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState(null);
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    const loadQuizData = () => {
      const originalQuizData = Quizzes[quizType];
      if (originalQuizData) {
        const randomizedQuizData = [...originalQuizData].sort(
          () => Math.random() - 0.5
        );
        setQuizData(randomizedQuizData);
        setIsLoading(false);
      } else {
        setError("Quiz not found.");
        setIsLoading(false);
      }
    };

    loadQuizData();

    if (user) {
      fetchTotalProgress();
    }
  }, [quizType]);

  const fetchTotalProgress = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("progress")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      setTotalProgress(data.progress || 0);
    } catch (error) {
      console.error("Error fetching total progress:", error);
    }
  };

  useEffect(() => {
    document.title = `CodeScript - Quiz`;
  }, []);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = async () => {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = Array.isArray(currentQuestion.answer)
      ? currentQuestion.answer.includes(selectedAnswer)
      : currentQuestion.answer === selectedAnswer;
    setLastAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore(score + 1);
    }

    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.answer,
        isCorrect,
      },
    ]);

    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      const pointsAdded = score * 10;
      setPoints((prevPoints) => prevPoints + pointsAdded);

      if (user) {
        try {
          const { data: profileData, error: fetchError } = await supabase
            .from("profiles")
            .select("current_points")
            .eq("id", user.id)
            .single();

          if (fetchError) throw fetchError;

          const currentPoints = profileData?.current_points || 0;
          const newTotalPoints = currentPoints + pointsAdded;

          const quizProgressPercentage =
            (score / quizData.length) * quizData.length;
          const newTotalProgress = Math.min(
            totalProgress + quizProgressPercentage,
            100
          );

          // Update points in the profiles table
          const { error: updateError } = await supabase
            .from("profiles")
            .update({
              current_points: newTotalPoints,
              progress: newTotalProgress,
            })
            .eq("id", user.id);

          if (updateError) throw updateError;

          // Insert a new record in users_quizzes table
          const { error: insertError } = await supabase
            .from("users_quizzes")
            .insert({
              user_id: user.id,
              lesson: quizType,
              status: "Completed",
              score: `${score}/${quizData.length}`,
              name: user.user_metadata.full_name,
            });

          if (insertError) throw insertError;

          toast.success("Points updated successfully", {
            position: "top-center",
            style: {
              borderRadius: "5px",
              background: "#333",
              color: "#fff",
              fontSize: "12px",
              letterSpacing: "0.5px",
            },
          });
        } catch (error) {
          console.error("Error updating points:", error);
          toast.error("Failed to update points. Please try again later.");
        }
      }
    }
  };

  const getProgressColor = () => {
    if (lastAnswerCorrect === null) return "default";
    return lastAnswerCorrect ? "success" : "danger";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full max-w-screen-lg p-5 mx-auto">
        <p>Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center w-full max-w-screen-lg p-5 mx-auto">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!quizData || quizData.length === 0) {
    return (
      <div className="flex items-center justify-center w-full max-w-screen-lg p-5 mx-auto">
        <p>No quiz questions available.</p>
      </div>
    );
  }

  const currentProgress =
    ((currentQuestionIndex + 1) / quizData?.length) * 100 || 0;

  if (quizCompleted) {
    const quizDetails = [
      {
        title: "Total Questions",
        value: quizData.length,
        icon: "🚀",
      },
      {
        title: "Correct Answers",
        value: score,
        icon: "👌",
      },
      {
        title: "Wrong Answers",
        value: quizData.length - score,
        icon: "🤔",
      },
    ];

    const location = useLocation();
    function getNextRouteInfo(currentPath) {
      const currentRoute = NextRoute.find(
        (route) => route.route === currentPath
      );
      return currentRoute
        ? { nextRoute: currentRoute.nextRoute, title: currentRoute.title }
        : { nextRoute: "/", title: "Home" };
    }
    const { nextRoute, title } = getNextRouteInfo(location.pathname);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative flex flex-col items-center justify-center w-full max-w-screen-lg gap-4 p-5 mx-auto text-center "
      >
        <div className="absolute w-[240px] h-[100px] bg-green-600/60  bottom-24 z-0 filter blur-[80px]" />
        <motion.div
          initial={{ filter: "blur(10px)" }}
          whileInView={{ filter: "blur(0px)" }}
          transition={{ duration: 1 }}
        >
          <img src={Trophy} alt="trophy" className="w-28 md:w-[80px] mb-4" />
        </motion.div>

        <h1 className="mb-3 text-2xl font-medium md:text-4xl text-zinc-800 dark:bg-gradient-to-br dark:from-white dark:to-zinc-500 dark:bg-clip-text dark:text-transparent">
          Quiz Completed
        </h1>
        <h2 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 md:text-md">
          You've scored:{" "}
          <span className={score <= 4 ? "text-red-500" : "text-green-500"}>
            {score}
          </span>{" "}
          out of {quizData.length}
        </h2>

        <div className="grid w-full max-w-screen-xl grid-cols-3 gap-1 mt-5 md:gap-2 md:max-w-lg">
          {quizDetails.map((details, idx) => (
            <div
              key={idx}
              className="relative z-10 flex flex-col gap-2 p-4 overflow-hidden text-left border rounded md:p-6 bg-zinc-100 dark:bg-zinc-800/50 border-zinc-300 dark:border-[#393939]"
            >
              <h1 className="absolute text-3xl md:text-5xl opacity-40 -bottom-2 -right-2 grayscale">
                {details.icon}
              </h1>
              <h1 className="text-[9px] md:text-xs font-semibold text-zinc-700 dark:text-zinc-400">
                {details.title}
              </h1>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {details.value}
              </h1>
            </div>
          ))}
        </div>

        <div className="relative text-lg font-bold mt-14">
          <Link
            to={nextRoute}
            className="flex items-center gap-3 text-xs md:text-sm"
          >
            Next:{" "}
            <span className="flex items-center gap-3 text-green-500 ">
              {title} <MoveRight size={20} />
            </span>
          </Link>
        </div>

        <ViewAccuracyModal
          onOpen={onOpen}
          quizDetails={quizDetails}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          score={score}
          quizType={quizType}
          userAnswers={userAnswers}
          quizData={quizData}
        />
      </motion.div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="flex flex-col items-start justify-start w-full max-w-screen-md p-5 mx-auto space-y-6 text-left">
      <div className="flex flex-col w-full max-w-lg gap-2 mt-5">
        <h1 className="mb-2 text-sm font-semibold">
          Question {currentQuestionIndex + 1} out of {quizData.length}
        </h1>
        <Progress
          size="sm"
          aria-label="Quiz progress"
          value={currentProgress}
          className="mb-2 font-bold text-zinc-900 dark:text-zinc-400"
          color={getProgressColor()}
          formatOptions={{ style: "unit", unit: "percent" }}
        />
      </div>
      <h1 className="mb-8 text-2xl font-semibold">
        {currentQuestion.question}
      </h1>

      <div className="w-full space-y-2">
        {Object.entries(currentQuestion.options).map(([key, value], index) => {
          const optionLetters = ["A", "B", "C", "D"]; // Array for labeling options
          return (
            <motion.button
              key={key}
              onClick={() => handleAnswerSelection(key)}
              className={`w-full p-3 rounded-lg text-left font-semibold text-[13px] flex items-center relative ${
                selectedAnswer === key
                  ? "text-white"
                  : "bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence>
                {selectedAnswer === key && (
                  <motion.div
                    className="absolute inset-0 bg-green-500 rounded"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              <span
                className={`z-10 mr-4 size-6 grid place-items-center rounded-md ${
                  selectedAnswer === key
                    ? "bg-white text-green-500 border-2 border-green-200"
                    : "bg-white border border-zinc-200 dark:border-zinc-600 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-700 font-bold"
                }`}
              >
                {optionLetters[index]}
              </span>{" "}
              <span className="z-10">{value}</span>
            </motion.button>
          );
        })}
      </div>

      {selectedAnswer && (
        <Button
          onClick={handleNextQuestion}
          className="px-4 py-3 mt-8 text-sm font-bold text-black bg-white rounded "
        >
          {currentQuestionIndex === quizData.length - 1
            ? "Finish Quiz"
            : "Next Question"}
        </Button>
      )}
    </div>
  );
};

const ViewAccuracyModal = ({
  isOpen,
  onOpenChange,
  quizDetails,
  userAnswers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
      className="font-NotoSans"
      size="2xl"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <h1>Quiz Accurary Breakdown</h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Detailed Analysis of Your Quiz Performance
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="grid w-full gap-2 md:grid-cols-3">
                {quizDetails.map((details, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-2 p-4 text-left border rounded-lg bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-700"
                  >
                    <h1 className="text-xs font-semibold text-zinc-400">
                      {details.title}
                    </h1>
                    <h1 className="text-lg font-semibold text-zinc-900 dark:text-white">
                      {details.value}
                    </h1>
                  </div>
                ))}
              </div>

              <h3 className="mt-4 mb-2">Question by Question Breakdown</h3>
              {userAnswers.map((answer, index) => (
                <div
                  key={index}
                  className="relative p-4 mb-1 border rounded-lg bg-zinc-50 border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700"
                >
                  <div className="flex justify-between w-full mb-3">
                    <h4 className="font-semibold">Question {index + 1}:</h4>
                    <span
                      className={`absolute top-0 right-0
                        ${
                          answer.isCorrect
                            ? "text-green-500 px-4 py-3 rounded-tr-lg bg-red-50 dark:bg-zinc-700 dark:text-white text-sm"
                            : "text-red-500 px-4 py-3 rounded-tr-lg bg-red-50 dark:bg-zinc-700 dark:text-white text-sm"
                        }`}
                    >
                      {answer.isCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>
                  <p className="mb-2">{answer.question}</p>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm">
                      Your answer: {answer.userAnswer}
                    </span>
                  </div>
                </div>
              ))}
            </ModalBody>
            <ModalFooter>
              <Button
                size="md"
                radius="none"
                className="mr-2 text-sm text-white bg-green-600"
                onPress={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
