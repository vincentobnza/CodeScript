import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, MoveRight } from "lucide-react";

const AssessmentModal = ({ isOpen, setIsOpen, description, title, result }) => {
  if (!isOpen) return null;

  const resultIcon = result[0]?.passed
    ? "https://cdn-icons-png.flaticon.com/128/10464/10464795.png"
    : "https://cdn-icons-png.flaticon.com/128/7248/7248886.png";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-white rounded shadow-2xl overflow-hidden"
          >
            <div
              className={`relative px-6 pt-10 pb-8 
                ${
                  result[0]?.passed
                    ? "bg-gradient-to-br from-green-600 to-emerald-700"
                    : "bg-gradient-to-br from-red-500 to-red-700"
                }`}
            >
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`size-8 grid place-items-center ${
                    result[0]?.passed
                      ? "bg-emerald-500/80 border border-green-400"
                      : "bg-red-500/80 border border-red-400"
                  } hover:brightness-110 text-white rounded-lg transition-colors`}
                >
                  <svg
                    className="size-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <img
                src={resultIcon}
                alt={result[0]?.passed ? "Success" : "Try Again"}
                className="w-16 h-16 mx-auto mb-6"
              />
              <h3 className="text-3xl font-bold text-center text-white mb-4">
                {title}
              </h3>
              <p className="text-center text-white">{description}</p>
            </div>
            <div className="px-6 py-8 space-y-5">
              {!result.passed && (
                <div>
                  <h1 className="text-sm mb-2 text-zinc-800">Test Results</h1>
                  <div className="w-full p-5 flex flex-col gap-2 border-[2px] border-dashed border-zinc-300 bg-zinc-50">
                    <h1 className="text-sm text-zinc-600">
                      {result[0].message}
                    </h1>
                  </div>
                </div>
              )}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className={`flex-1 flex items-center justify-center gap-4 px-4 py-3  font-bold rounded-lg 
                    ${
                      result[0]?.passed
                        ? "bg-green-100 text-green-600 hover:bg-green-200 border border-green-300"
                        : "bg-red-100 text-red-600 hover:bg-red-200 border border-red-300"
                    }
                    
                transition-colors`}
                >
                  {result[0]?.passed ? "Continue" : "Try Again"}

                  {result[0]?.passed ? (
                    <MoveRight size={18} />
                  ) : (
                    <RotateCcw size={18} />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssessmentModal;
