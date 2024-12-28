import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const LoadingScreen = ({ route = "/code-editor" }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate(route);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [navigate, route]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center font-Roboto text-white bg-gradient-to-br from-zinc-900 to-zinc-800"
    >
      <div className="flex flex-col justify-center items-center gap-10">
        <Loader size={30} className="animate-spin" />
        <h1 className="text-md text-zinc-400 animate-pulse-slow">
          Initializing Assessment Modules
        </h1>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
