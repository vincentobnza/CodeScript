import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import supabase from "../config/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { Captions, Pill, List, Braces } from "lucide-react";

export default function AddLesson() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // State for content sections
  const [contentSections, setContentSections] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.from("lessons").insert([
      {
        title,
        description,
        content: contentSections,
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
      setContentSections([]);
    }
  };

  const addContentSection = (type) => {
    setContentSections([
      ...contentSections,
      {
        id: Date.now(),
        type,
        content: "",
        isVisible: true,
      },
    ]);
  };

  const updateContentSection = (id, content) => {
    setContentSections(
      contentSections.map((section) =>
        section.id === id ? { ...section, content } : section
      )
    );
  };

  const removeContentSection = (id) => {
    setContentSections(contentSections.filter((section) => section.id !== id));
  };

  const ContentInput = ({ section }) => {
    switch (section.type) {
      case "title":
        return (
          <input
            type="text"
            placeholder="Enter section title"
            value={section.content}
            onChange={(e) => updateContentSection(section.id, e.target.value)}
            className="w-full p-3 px-4 border border-gray-300 rounded-md"
          />
        );
      case "description":
        return (
          <textarea
            placeholder="Enter section description"
            value={section.content}
            onChange={(e) => updateContentSection(section.id, e.target.value)}
            className="w-full h-32 p-3 px-4 border border-gray-300 rounded-md"
          />
        );
      case "list":
        return (
          <textarea
            placeholder="Enter items (one per line)"
            value={section.content}
            onChange={(e) => updateContentSection(section.id, e.target.value)}
            className="w-full h-32 p-3 px-4 border border-gray-300 rounded-md"
          />
        );
      case "code":
        return (
          <textarea
            placeholder="Enter sample code"
            value={section.content}
            onChange={(e) => updateContentSection(section.id, e.target.value)}
            className="w-full h-48 p-3 px-4 font-mono border border-gray-300 rounded-md"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 space-y-2">
      <Header />
      <div className="flex flex-col gap-4 p-5 m-5 bg-white border-2 border-dashed rounded-md border-zinc-200">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-3 px-4 border border-gray-300 rounded-md"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-40 p-3 px-4 border border-gray-300 rounded-md"
            />
          </div>

          {/* Content Sections */}
          <div className="space-y-4">
            {contentSections.map((section) => (
              <div key={section.id}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium capitalize">
                    {section.type}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeContentSection(section.id)}
                    className="py-1 px-2 border border-zinc-300 text-xs font-medium rounded text-zinc-600"
                  >
                    Remove
                  </button>
                </div>
                <ContentInput section={section} />
              </div>
            ))}
          </div>

          {/* Content Buttons */}
          <div className="w-full justify-start items-start flex gap-2">
            <button
              type="button"
              onClick={() => addContentSection("title")}
              className="shadow py-2 px-3 border border-zinc-300 text-sm font-semibold rounded text-zinc-600 flex items-center gap-2"
            >
              <Captions size={18} />
              Add Title
            </button>
            <button
              type="button"
              onClick={() => addContentSection("description")}
              className="shadow py-2 px-3 border border-zinc-300 text-sm font-semibold rounded text-zinc-600 flex items-center gap-2"
            >
              <Pill size={18} />
              Add Description
            </button>
            <button
              type="button"
              onClick={() => addContentSection("list")}
              className="shadow py-2 px-3 border border-zinc-300 text-sm font-semibold rounded text-zinc-600 flex items-center gap-2"
            >
              <List size={18} />
              Add List
            </button>
            <button
              type="button"
              onClick={() => addContentSection("code")}
              className="shadow py-2 px-3 border border-zinc-300 text-sm font-semibold rounded text-zinc-600 flex items-center gap-2"
            >
              <Braces size={18} />
              Add Sample Code
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-">
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
