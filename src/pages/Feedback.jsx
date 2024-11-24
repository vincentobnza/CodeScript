"use client";

import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { motion } from "framer-motion";
import Cat from "../assets/cat.gif";
import { Link } from "react-router-dom";
export default function FeedbackForm() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in to submit feedback.");
      return;
    }
    if (score === 0) {
      setError("Please select a score.");
      return;
    }
    try {
      const { error } = await supabase.from("user_feedback").insert({
        user_id: user.id,
        email: user.email,
        message,
        score,
        updatedAt: new Date().toISOString(),
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (error) {
      setError("Failed to submit feedback. Please try again.");
      console.error("Error submitting feedback:", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-white border font-Jost border-zinc-200">
      <motion.div
        className="w-full max-w-2xl p-8 bg-white rounded-lg "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {!isSubmitted ? (
          <>
            <motion.h1
              className="mb-2 text-3xl font-semibold text-center text-gray-800"
              variants={itemVariants}
            >
              We Value Your Feedback
            </motion.h1>
            <motion.p
              className="mb-12 text-sm text-center text-gray-600"
              variants={itemVariants}
            >
              Your input helps us improve and deliver the best experience
              possible.
            </motion.p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div variants={itemVariants}>
                <label className="block mb-6 text-sm text-center text-gray-700">
                  How would you rate your experience?
                </label>
                <div className="flex justify-center space-x-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <motion.button
                      key={value}
                      type="button"
                      onClick={() => setScore(value)}
                      className={`w-12 h-12 text-lg font-bold rounded-lg ${
                        score === value
                          ? "bg-green-500 text-white"
                          : "bg-zinc-50 text-zinc-600 border border-zinc-300"
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {value}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
              <motion.div variants={itemVariants}>
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Additional comments{" "}
                  <span className="ml-2 italic font-normal text-zinc-500">
                    {"(Optional)"}
                  </span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-4 text-xs text-gray-700 bg-white border border-gray-300 outline-none resize-none focus:outline-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us more about your experience..."
                ></textarea>
              </motion.div>
              {error && (
                <motion.p
                  className="text-sm text-red-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.p>
              )}
              <motion.button
                type="submit"
                className="w-full px-4 py-3 text-sm font-semibold text-white bg-green-500 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Send Feedback
              </motion.button>
            </form>
          </>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center space-y-16 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/128/5290/5290058.png"
              alt="check"
              className="w-20"
            />
            <div className="flex flex-col w-full max-w-lg gap-3 mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                Thank You for Your Feedback!
              </h2>
              <p className="text-sm text-gray-600">
                We appreciate your time and input. Your feedback helps us
                improve our services.
              </p>
            </div>
            <Link to="/" className="text-lg font-bold underline text-zinc-800">
              Go back home
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
