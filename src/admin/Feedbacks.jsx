import React, { useState, useEffect, useRef } from "react";
import supabase from "@/config/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ChevronsUpDown,
  Loader2,
  Search,
  CircleX,
  Trash2,
} from "lucide-react";
import { Avatar, Spinner } from "@nextui-org/react";
import { toast, Toaster } from "react-hot-toast";
import { useTimeAgo } from "@/components/useTimeAgo";

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
    checkUser();

    // Set up real-time listener
    const subscription = supabase
      .channel("user_feedback")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "user_feedback" },
        fetchFeedbacks
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  };

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      let { data, error } = await supabase
        .from("user_feedback")
        .select("*")
        .order("updatedAt", { ascending: false });

      if (error) throw error;
      setFeedbacks(data);
    } catch (error) {
      setError("Failed to fetch feedbacks");
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFeedbacks = feedbacks.filter(
    (feedback) =>
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from("user_feedback")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Feedback deleted successfully", {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      });
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-screen-lg gap-2 p-6 mx-auto space-y-6">
      <Toaster />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <>
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-64">
            <Spinner size="lg" color="primary" />
            <p className="mt-4 text-sm text-zinc-500">
              Loading user feedbacks...
            </p>
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <>
            {feedbacks.length === 0 ? (
              <div className="flex flex-col items-center justify-center max-w-lg gap-8 p-8 mx-auto ">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2546/2546749.png"
                  alt="feedback icon"
                  className="w-12 grayscale"
                />
                <h1 className="text-sm text-zinc-500">No Feedbacks for now</h1>
              </div>
            ) : (
              <FeedbackList
                feedbacks={filteredFeedbacks}
                handleDelete={handleDelete}
              />
            )}
          </>
        )}
      </>
    </div>
  );
}

const Header = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-lg font-medium">User Feedback</h1>
      <p className="text-sm text-zinc-600">Explore All Feedback</p>
      <div className="relative w-full mt-5">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="text-gray-400 size-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-2 pl-10 pr-4 bg-white border border-gray-100 rounded-md shadow shadow-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent hover:border-zinc-300 placeholder:text-sm"
          placeholder="Search here..."
        />
        {searchTerm.length > 0 && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={() => setSearchTerm("")}
          >
            <CircleX className="text-gray-400 cursor-pointer size-4 hover:text-zinc-700" />
          </div>
        )}
      </div>
    </div>
  );
};

const FeedbackList = ({ feedbacks, handleDelete }) => {
  return (
    <div className="flex flex-col w-full gap-2">
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id}
          feedback={feedback}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const FeedbackItem = ({ feedback, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeAgo = useTimeAgo(feedback.updatedAt);

  return (
    <motion.div
      initial={false}
      className="overflow-hidden border border-zinc-200 group"
    >
      <motion.header
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start gap-5">
          <Avatar
            isBordered
            src="https://cdn-icons-png.flaticon.com/128/9184/9184648.png"
            className="transition duration-300 ease-in-out opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0"
            alt={feedback.email}
          />
          <div>
            <div className="flex items-center">
              <h3 className="mb-2 text-sm font-semibold">{feedback.email}</h3>
            </div>
            <div className="flex items-center gap-1">
              <h1 className="mr-3 text-xs text-zinc-600">Rating:</h1>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < feedback.score
                      ? "text-amber-400 fill-current"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <p className="mt-5 text-xs text-zinc-500">{timeAgo}</p>
          </div>
        </div>
        <ChevronsUpDown size={15} />
      </motion.header>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="flex justify-between w-full gap-6 p-8 border-t">
              <div className="flex flex-col gap-2">
                <p className="font-semibold text-md">{feedback.message}</p>
                <p className="mt-2 text-xs text-gray-500">
                  Submitted on: {new Date(feedback.updatedAt).toLocaleString()}
                </p>

                <button
                  onClick={() => handleDelete(feedback.id)}
                  className="flex items-center self-start gap-2 px-4 py-2 mt-8 text-xs font-semibold border rounded-md text-zinc-500 border-zinc-200"
                >
                  <Trash2 size={14} />
                  Delete this
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
