import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import toast from "react-hot-toast";

export default function AddLesson() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subTopic, setSubTopic] = useState("");
  const [sampleCode, setSampleCode] = useState("");
  const [showSubTopic, setShowSubTopic] = useState(false);
  const [showSampleCode, setShowSampleCode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title.trim() ||
      !description.trim() ||
      (showSubTopic && !subTopic.trim()) ||
      (showSampleCode && !sampleCode.trim())
    ) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.from("lessons").insert([
      {
        title,
        description,
        sub_topic: showSubTopic ? subTopic : null,
        sample_code: showSampleCode ? sampleCode : null,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error("Error inserting data:", error.message);
      toast.error("Failed to add lesson. Please try again.");
    } else {
      toast.success("Lesson successfully added!");
      setTitle("");
      setDescription("");
      setSubTopic("");
      setSampleCode("");
      setShowSubTopic(false);
      setShowSampleCode(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 space-y-2">
      <Header />
      <div className="flex flex-col gap-4 p-5">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col w-full gap-2 p-5 border border-zinc-100">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 px-4 transition duration-300 ease-in-out border-b border-zinc-100 focus:border-zinc-600 focus:border-b-2 focus:outline-none"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col w-full gap-4 p-5 border border-zinc-100">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-40 p-3 px-4 border rounded-md border-zinc-100"
            />
          </div>

          {/* Dynamic Fields */}
          {showSubTopic && (
            <div className="flex flex-col w-full gap-2 p-5 border border-zinc-100">
              <label htmlFor="subTopic" className="text-sm font-medium">
                Subtopic
              </label>
              <input
                type="text"
                id="subTopic"
                placeholder="Enter subtopic"
                value={subTopic}
                onChange={(e) => setSubTopic(e.target.value)}
                className="p-3 px-4 border rounded-md border-zinc-100"
              />
            </div>
          )}

          {showSampleCode && (
            <div className="flex flex-col w-full gap-2 p-5 border border-zinc-100">
              <label htmlFor="sampleCode" className="text-sm font-medium">
                Sample Code
              </label>
              <textarea
                id="sampleCode"
                placeholder="Enter sample code"
                value={sampleCode}
                onChange={(e) => setSampleCode(e.target.value)}
                className="h-40 p-3 px-4 border rounded-md border-zinc-100"
              />
            </div>
          )}

          {/* Add Buttons */}
          <div className="flex justify-start w-full gap-4 p-5">
            <button
              type="button"
              onClick={() => setShowSubTopic(!showSubTopic)}
              className="px-4 py-1 border border-zinc-400"
            >
              Add Subtopic
            </button>
            <button
              type="button"
              onClick={() => setShowSampleCode(!showSampleCode)}
              className="px-4 py-1 border border-zinc-400"
            >
              Add Sample Code
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className={`py-2 px-4 rounded-md text-white ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Lesson"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Header = () => (
  <div className="flex items-center justify-between p-5">
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold text-gray-800">
        Create a New Lesson
      </h1>
      <p className="text-sm text-gray-600">
        Easily add a new lesson to the system to enhance learning content.
      </p>
    </div>
  </div>
);
