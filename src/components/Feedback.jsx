import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { toast, Toaster } from "react-hot-toast";

export default function Feedback() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleButtonClick = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.trim()) {
      alert("Please enter your feedback.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("user_feedback").insert([
        {
          message: feedback,
          email: user?.email, // Insert email if provided, otherwise null
        },
      ]);

      if (error) {
        console.error("Error submitting feedback:", error);
        toast.error("Error, failed to submit feedback", {
          style: {
            fontSize: "13px",
            fontWeight: 500,
          },
        });
      } else {
        toast.success("Thank you for your feedback!", {
          style: {
            fontSize: "13px",
            fontWeight: 500,
          },
        });
        setFeedback("");
        setEmail("");
        setIsFormVisible(false); // Reset form visibility after submission
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full px-1 pb-6 mt-16 md:px-12">
      <div
        className={`flex flex-col gap-4 border rounded-lg border-zinc-700 transition-all duration-300 ${
          isFormVisible ? "w-[400px]" : "w-[250px]"
        }`}
      >
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h1 className="text-sm font-semibold">Was this helpful?</h1>
            <div className="flex items-center gap-1 font-semibold">
              <button
                className="flex items-center gap-2 px-3 py-1 text-sm outline-none text-zinc-500 dark:text-zinc-400"
                onClick={handleButtonClick}
              >
                No
              </button>
              <button
                className="flex items-center gap-2 px-3 py-1 text-sm text-white rounded outline-none bg-zinc-700 dark:bg-white dark:text-black"
                onClick={handleButtonClick}
              >
                Yes
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Feedback Form */}
        {isFormVisible && (
          <form
            className="flex flex-col w-full gap-3 border-t border-zinc-200 dark:border-zinc-700"
            onSubmit={handleSubmit}
          >
            <div className="p-2">
              <textarea
                className="w-full p-2 mt-2 text-sm bg-transparent border rounded resize-none text-zinc-600 border-zinc-200 dark:border-zinc-700 dark:text-zinc-200 focus:outline-none"
                placeholder="Your feedback..."
                rows="4"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end w-full p-4 border-t bg-zinc-200 dark:bg-[#212121] border-zinc-300 dark:border-zinc-700">
              <button
                type="submit"
                className={`self-end px-4 py-2 text-sm  text-white rounded font-bold ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-zinc-700 dark:bg-white dark:text-black"
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Send"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
