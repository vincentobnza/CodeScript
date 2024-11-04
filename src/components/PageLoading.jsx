import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Code, Terminal } from "lucide-react";

const LoadingScreen = ({ route = "/code-editor" }) => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const navigate = useNavigate();

  const phrases = [
    "Initializing code environment...",
    "Preparing JavaScript runtime...",
    "Loading assessment modules...",
    "Configuring editor settings...",
    "Optimizing performance...",
  ];

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      const currentText = phrases[phraseIndex];

      if (isDeleting) {
        setCurrentPhrase(currentText.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setCurrentPhrase(currentText.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        timer = setTimeout(type, 1500);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        timer = setTimeout(type, 500);
      } else {
        timer = setTimeout(type, isDeleting ? 50 : 100);
      }
    };

    type();

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(route);
    }, 20000);

    return () => clearTimeout(timer);
  }, [navigate, route]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white bg-gradient-to-br from-zinc-900 to-zinc-800 font-NotoSans"
    >
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
        }}
        className="mb-8"
      >
        <Code size={64} className="text-amber-400" />
      </motion.div>

      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="mb-8 text-2xl font-medium text-transparent md:text-4xl bg-gradient-to-br from-zinc-100 to-zinc-500 bg-clip-text"
      >
        JavaScript Assessment
      </motion.h1>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "50%" }}
        transition={{ duration: 10 }}
        className="w-3/5 h-1 mb-8 rounded-full bg-amber-500"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center mb-4 space-x-2"
      >
        <Terminal size={24} className="text-green-400" />
        <p className="font-mono text-sm font-semibold md:text-lg">
          {currentPhrase}
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="text-xs text-gray-400 md:text-sm"
      >
        Preparing your coding environment...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
