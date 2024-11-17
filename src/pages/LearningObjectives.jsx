import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Undo2, CheckCircle } from "lucide-react";
import { Lessons } from "@/data/LearningObjectives";

export default function LearningObjectives() {
  return (
    <div className="min-h-screen dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      <div className="relative max-w-4xl px-6 pb-10 mx-auto">
        <div className="absolute left-0 top-1/4 transform -translate-y-1/2 w-[240px] h-[240px] bg-indigo-600/20 rounded-full filter blur-[120px]" />

        <Header />
        <Content />
      </div>
    </div>
  );
}

const Header = () => {
  const { lesson } = useParams();

  const formatLesson = (les) => {
    const lessonParts = les.match(/[a-zA-Z]+|[0-9]+/g); // Split letters and numbers
    return lessonParts
      .map((part, index) =>
        index === 0 ? part.charAt(0).toUpperCase() + part.slice(1) : ` ${part}`
      )
      .join("");
  };

  const formattedLesson = formatLesson(lesson);
  return (
    <div className="mb-12">
      <Link
        to="/learn-js"
        className="inline-flex items-center gap-2 mb-6 text-sm transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        <Undo2 size={18} />
        Return to Homepage
      </Link>
      <h1 className="mb-2 text-2xl font-medium">
        Learning Objectives for {formattedLesson}
      </h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        By the end of this lesson, students will be able to:
      </p>
    </div>
  );
};

const Content = () => {
  const { lesson } = useParams();
  const [objData, setObjData] = useState([]);

  useEffect(() => {
    const loadObjectives = () => {
      const objectivesData = Lessons[lesson];
      if (objectivesData) {
        setObjData(objectivesData);
      } else {
        console.log("Objectives not found");
      }
    };

    loadObjectives();
  }, [lesson]);

  return (
    <div className="space-y-3 ">
      {objData.map((objective, idx) => (
        <div
          key={idx}
          className="flex items-start gap-6 p-5 bg-white border rounded-lg shadow-md dark:bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-900 border-zinc-200 dark:border-zinc-700"
        >
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center border rounded-lg size-8 bg-zinc-50 dark:bg-gradient-to-br dark:from-zinc-800 dark:to-zinc-700 border-zinc-200 dark:border-zinc-600">
              <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                {objective.id}
              </span>
            </div>
          </div>
          <div>
            <h3 className="mb-4 font-semibold text-md">{objective.title}</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {objective.description}
            </p>
          </div>
          <div className="flex-shrink-0 ml-auto">
            <CheckCircle
              size={24}
              className="text-green-500 dark:text-green-400"
            />
          </div>
        </div>
      ))}
    </div>
  );
};
