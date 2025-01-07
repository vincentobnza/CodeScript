import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Checkbox } from "@nextui-org/react";
import Robot from "../assets/robot.png";
import { Clock, CircleCheckBig, SmilePlus } from "lucide-react";

function ListItem({ icon, text, title }) {
  return (
    <li className="flex items-start w-full p-5 space-x-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 ">
      <div className="flex items-center justify-center flex-shrink-0 transition-colors duration-200 rounded-lg w-9 h-9 group-hover:bg-gray-200 dark:group-hover:bg-zinc-700">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-zinc-700 dark:text-zinc-100">
          {title}
        </h1>
        <p className="text-sm font-medium leading-relaxed transition-colors duration-200 text-zinc-600 dark:text-zinc-400 group-hover:text-gray-900 dark:group-hover:text-white">
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
      }, 1000);
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
      setCountdown(5);
    }
  }, [openModal]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className="fixed inset-0 z-50 grid p-8 overflow-y-scroll bg-white cursor-pointer font-Balsamiq dark:bg-zinc-900 backdrop-blur-lg place-items-center">
          {openModal && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-screen-md p-6 mx-auto overflow-hidden "
            >
              <div className="flex flex-col">
                <h1 className="mb-5 text-4xl font-bold text-center text-zinc-700 dark:text-zinc-100">
                  Important Quiz Guidelines
                </h1>

                <div className="w-full text-sm text-zinc-600 dark:text-zinc-400">
                  <p className="font-semibold text-center text-md">
                    Please be mindful of the following rules to ensure a fair
                    experience for all participants:
                  </p>
                  <ul className="mt-10 space-y-3">
                    <ListItem
                      title="Time Management"
                      icon={<Clock className="w-5 h-5 text-violet-500" />}
                      text="Each question has a strict time limit of 2 minutes. Make the most of your time!"
                    />
                    <ListItem
                      title="Final Answers"
                      icon={
                        <CircleCheckBig className="w-5 h-5 text-green-500" />
                      }
                      text="Once you select an answer, it is final. Double-check before confirming your choice."
                    />
                    <ListItem
                      title="Success Strategy"
                      icon={<SmilePlus className="w-5 h-5 text-amber-500" />}
                      text="Take your time, but remember, careful consideration leads to success. Good luck!"
                    />
                  </ul>
                </div>

                <div className="mt-5">
                  <Checkbox
                    color="warning"
                    isSelected={isSelected}
                    onValueChange={setIsSelected}
                    classNames={{
                      label:
                        "text-sm text-zinc-500 dark:text-zinc-400 font-semibold",
                    }}
                  >
                    I understand and agree with the quiz guidelines
                  </Checkbox>
                </div>

                <motion.button
                  onClick={() => setOpenModal(false)}
                  disabled={!isSelected}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center self-start px-8 py-3 mt-5 font-semibold text-white transition-all duration-300 rounded shadow-lg bg-gradient-to-r from-amber-500 to-orange-600 shadow-amber-500/30 hover:shadow-amber-500/40 group disabled:cursor-not-allowed disabled:opacity-20"
                >
                  Start Quiz
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Show timer only when modal is closed and countdown is active */}
          {!openModal && showTimer && (
            <div className="relative flex flex-col items-center justify-center w-full max-w-xl mx-auto space-y-4 font-Balsamiq">
              <h1 className="text-5xl font-bold text-zinc-700 dark:text-zinc-300">
                Please Be Ready
              </h1>
              <p className="text-lg font-semibold text-zinc-400">
                The quiz starts in
              </p>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuizStartModal;
