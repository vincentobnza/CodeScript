import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "@nextui-org/react";
import Robot from "../assets/robot.png";

const QuizStartModal = ({ isOpen, setIsOpen }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    let timer;
    if (!openModal && isOpen && showTimer) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsOpen(false);
            return 5; // Reset for next time
          }
          return prev - 1;
        });
      }, 2000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [openModal, isOpen, showTimer, setIsOpen]);

  useEffect(() => {
    if (!openModal) {
      setShowTimer(true);
    } else {
      setShowTimer(false);
      setCountdown(5); // Reset countdown when modal opens
    }
  }, [openModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 grid p-8 overflow-y-scroll font-sans cursor-pointer bg-slate-900/20 backdrop-blur-lg place-items-center">
          {openModal && (
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="h-[280px] p-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full max-w-xl md:max-w-lg shadow-xl cursor-default relative overflow-hidden"
            >
              <div className="absolute w-[55px] top-2 right-1 grid grid-cols-3">
                <div className="border rounded-full size-3 bg-zinc-100 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-500"></div>
                <div className="border rounded-full size-3 bg-zinc-100 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-500"></div>
                <div className="border rounded-full size-3 bg-zinc-100 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-500"></div>
              </div>
              <img
                src={Robot}
                alt="robot"
                className="w-[200px] absolute -bottom-12 -right-2 grayscale opacity-50"
              />

              <div className="flex flex-col">
                <h1 className="mb-5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 md:text-xl">
                  Important Quiz Rules
                </h1>

                <div className="w-[80%] text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
                  <p>
                    Please note: Once you select your answer, you cannot go back
                    and change it. Think carefully before making your choice.
                    Good luck!
                  </p>
                </div>
                <div className="mt-5">
                  <Checkbox
                    color="success"
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    classNames={{
                      label:
                        "text-xs md:text-sm text-zinc-500 dark:text-zinc-400",
                    }}
                  >
                    I understand and agree with the quiz rules
                  </Checkbox>
                </div>

                <button
                  disabled={!isSelected}
                  onClick={() => setOpenModal(false)}
                  className="self-start px-3 py-2 mt-5 text-xs font-bold text-black rounded bg-zinc-200 disabled:bg-zinc-500 disabled:cursor-not-allowed"
                >
                  Start Quiz
                </button>
              </div>
            </motion.div>
          )}

          {/* Show timer only when modal is closed and countdown is active */}
          {!openModal && showTimer && (
            <div className="relative flex flex-col items-center justify-center w-full max-w-xl mx-auto space-y-4 font-NotoSans">
              <h1 className="text-4xl font-bold">Please Be Ready</h1>
              <p className="text-sm text-zinc-400">The quiz starts in</p>
              <motion.h1
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="font-bold bg-gradient-to-br from-yellow-400 to-amber-600 bg-clip-text text-transparent text-[6rem] md:text-[9rem]"
              >
                {countdown}
              </motion.h1>
            </div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuizStartModal;
