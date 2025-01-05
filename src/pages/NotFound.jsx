import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 font-Jost bg-zinc-900">
      <div className="w-full max-w-2xl p-8 text-center">
        <h1 className="text-[120px] font-bold mb-8 bg-gradient-to-br from-green-400 to-green-950 bg-clip-text text-transparent">
          404
        </h1>
        <p className="mb-4 text-2xl font-semibold text-gray-300">
          Page Not Found
        </p>
        <p className="mb-8 text-sm text-gray-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-block px-6 py-2 mt-8 text-sm text-white underline transition duration-300 rounded-full underline-offset-4"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}
