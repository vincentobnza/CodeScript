import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Robot from "../assets/robot.png";
import { X } from "lucide-react";
import { Checkbox } from "@nextui-org/react";

export default function QuizStartModal({ isOpen, setIsOpen }) {
  const [isSelected, setIsSelected] = React.useState(false);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 grid p-8 overflow-y-scroll cursor-pointer bg-slate-900/20 backdrop-blur-lg place-items-center font-Inter">
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="h-[280px] p-6 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 w-full max-w-xl md:max-w-lg shadow-xl cursor-default relative overflow-hidden "
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
                  and change it. Think carefully before making your choice. Good
                  luck!
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
                onClick={() => setIsOpen(false)}
                className="self-start px-3 py-2 mt-5 text-xs font-bold text-black rounded bg-zinc-200 disabled:bg-zinc-500 disabled:cursor-not-allowed"
              >
                Okay, Let's Go!
              </button>
            </div>

            <div className="flex flex-col w-full gap-2 p-6"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
