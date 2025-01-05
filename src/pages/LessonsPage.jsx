import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";

const LessonsPage = () => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch lessons from Supabase
  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase.from("lessons").select("*");

      if (error) {
        setError(error.message);
        console.error("Error fetching lessons:", error.message);
      } else {
        setLessons(data);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-full gap-2 space-y-2">
      <Header />
      <div className="w-full max-w-screen-lg mx-auto flex flex-col gap-4 m-5 p-5 bg-white dark:bg-zinc-900 rounded-md">
        {loading ? (
          <p className="text-center text-gray-500">Loading lessons...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : lessons.length > 0 ? (
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="rounded-md bg-zinc-50 dark:bg-zinc-800 p-6"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {lesson.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {lesson.description}
                </p>
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{ __html: lesson.content }}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No lessons found.</p>
        )}
      </div>
    </div>
  );
};

const Header = () => (
  <div className="w-full max-w-screen-lg mx-auto flex justify-between items-center p-5">
    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
      New Lessons Added
    </h1>
  </div>
);

export default LessonsPage;
