import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "@nextui-org/react";
import Robot from "../assets/robot.png";
import { Clock, Check, LightbulbIcon } from "lucide-react";

function ListItem({ icon, text }) {
  return (
    <li className="w-full flex items-center space-x-3 group p-2 border border-zinc-700 bg-zinc-700/20 ">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg   flex items-center justify-center group-hover:bg-gray-200 dark:group-hover:bg-zinc-700 transition-colors duration-200">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
          {text}
        </p>
      </div>
    </li>
  );
}

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
        <div className="fixed inset-0 z-50 grid p-8 overflow-y-scroll  cursor-pointer bg-slate-900/20 backdrop-blur-lg place-items-center font-SpaceGrotesk">
          {openModal && (
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className=" p-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full max-w-xl md:max-w-2xl shadow-xl cursor-default relative overflow-hidden"
            >
              <div className="absolute w-[55px] top-2 right-1 grid grid-cols-3">
                <div className="border rounded-full size-3 bg-zinc-100 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-500"></div>
                <div className="border rounded-full size-3 bg-zinc-100 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-500"></div>
                <div className="border rounded-full size-3 bg-zinc-100 dark:bg-zinc-600 border-zinc-200 dark:border-zinc-500"></div>
              </div>
              <img
                src={Robot}
                alt="robot"
                className="w-[200px] absolute -bottom-12 -right-2  grayscale"
              />

              <div className="flex flex-col">
                <h1 className="mb-5 text-lg font-bold text-zinc-900 dark:text-zinc-100 md:text-2xl">
                  Important Quiz Guidelines
                </h1>

                <div className="w-full text-xs font-semibold text-zinc-700 dark:text-zinc-400">
                  <p>
                    Please be mindful of the following rules to ensure a fair
                    experience for all participants:
                  </p>
                  <ul className="mt-5 space-y-2">
                    <ListItem
                      icon={<Clock className="w-5 h-5 text-blue-500" />}
                      text="Each question has a strict time limit of 2 minutes. Make the most of your time!"
                    />
                    <ListItem
                      icon={<Check className="w-5 h-5 text-green-500" />}
                      text="Once you select an answer, it is final. Double-check before confirming your choice."
                    />
                    <ListItem
                      icon={
                        <LightbulbIcon className="w-5 h-5 text-yellow-500" />
                      }
                      text="Take your time, but remember, careful consideration leads to success. Good luck!"
                    />
                  </ul>
                </div>

                <div className="mt-5">
                  <Checkbox
                    color="success"
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    classNames={{
                      label:
                        "text-xs font-semibold text-zinc-500 dark:text-zinc-400",
                    }}
                  >
                    I understand and agree with the quiz guidelines
                  </Checkbox>
                </div>

                <button
                  disabled={!isSelected}
                  onClick={() => setOpenModal(false)}
                  className="self-start px-6 py-3 mt-5 text-xs font-bold text-black rounded bg-zinc-200 disabled:bg-zinc-500 disabled:cursor-not-allowed"
                >
                  Start Quiz
                </button>
              </div>
            </motion.div>
          )}

          {/* Show timer only when modal is closed and countdown is active */}
          {!openModal && showTimer && (
            <div className="relative flex flex-col items-center justify-center w-full max-w-xl mx-auto space-y-4 font-SpaceGrotesk">
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
