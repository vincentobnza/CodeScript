import React, { useState } from "react";
import supabase from "../config/supabaseClient";
import toast from "react-hot-toast";
import { CornerDownLeft, Plus, Trash2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AddLesson() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    subtopics: [],
    additionalDescriptions: [],
    sampleCodes: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Add subtopic
  const addSubtopic = () => {
    setFormData((prev) => ({
      ...prev,
      subtopics: [...prev.subtopics, { title: "", content: "" }],
    }));
  };

  // Add additional description
  const addDescription = () => {
    setFormData((prev) => ({
      ...prev,
      additionalDescriptions: [...prev.additionalDescriptions, ""],
    }));
  };

  // Add sample code
  const addSampleCode = () => {
    setFormData((prev) => ({
      ...prev,
      sampleCodes: [...prev.sampleCodes, { language: "", code: "" }],
    }));
  };

  // Update nested items
  const updateSubtopic = (index, field, value) => {
    setFormData((prev) => {
      const newSubtopics = [...prev.subtopics];
      newSubtopics[index] = { ...newSubtopics[index], [field]: value };
      return { ...prev, subtopics: newSubtopics };
    });
  };

  const updateDescription = (index, value) => {
    setFormData((prev) => {
      const newDescriptions = [...prev.additionalDescriptions];
      newDescriptions[index] = value;
      return { ...prev, additionalDescriptions: newDescriptions };
    });
  };

  const updateSampleCode = (index, field, value) => {
    setFormData((prev) => {
      const newSampleCodes = [...prev.sampleCodes];
      newSampleCodes[index] = { ...newSampleCodes[index], [field]: value };
      return { ...prev, sampleCodes: newSampleCodes };
    });
  };

  // Remove items
  const removeItem = (type, index) => {
    setFormData((prev) => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.from("lessons").insert([formData]);

      if (error) throw error;

      toast.success("Lesson created successfully!");
      navigate("/admin/lessons");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full gap-2 space-y-2">
      <Header />
      <div className="flex flex-col gap-4 p-5">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="flex flex-col w-full gap-2 p-5 border border-zinc-500">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="p-3 px-4 transition duration-300 ease-in-out border-b border-zinc-500 focus:border-zinc-600 focus:border-b-2 focus:outline-none"
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col w-full gap-4 p-5 border border-zinc-500">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="h-40 p-3 px-4 border rounded-md border-zinc-100 outline-none"
              required
            />
          </div>

          {/* Subtopics */}
          {formData.subtopics.map((subtopic, index) => (
            <div
              key={index}
              className="flex flex-col w-full gap-4 p-5 border border-zinc-500"
            >
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">
                  Subtopic {index + 1}
                </label>
                <button
                  type="button"
                  onClick={() => removeItem("subtopics", index)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                type="text"
                value={subtopic.title}
                onChange={(e) => updateSubtopic(index, "title", e.target.value)}
                placeholder="Subtopic title"
                className="p-3 border-b border-zinc-500"
              />
            </div>
          ))}

          {/* Additional Descriptions */}
          {formData.additionalDescriptions.map((desc, index) => (
            <div
              key={index}
              className="flex flex-col w-full gap-4 p-5 border border-zinc-500"
            >
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">
                  Additional Description {index + 1}
                </label>
                <button
                  type="button"
                  onClick={() => removeItem("additionalDescriptions", index)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <textarea
                value={desc}
                onChange={(e) => updateDescription(index, e.target.value)}
                placeholder="Enter additional description"
                className="h-24 p-3 border rounded-md"
              />
            </div>
          ))}

          {/* Sample Codes */}
          {formData.sampleCodes.map((code, index) => (
            <div
              key={index}
              className="flex flex-col w-full gap-4 p-5 border border-zinc-500"
            >
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">
                  Sample Code {index + 1}
                </label>
                <button
                  type="button"
                  onClick={() => removeItem("sampleCodes", index)}
                  className="text-red-500"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                type="text"
                value={code.language}
                onChange={(e) =>
                  updateSampleCode(index, "language", e.target.value)
                }
                placeholder="Programming language"
                className="p-3 border-b border-zinc-500"
              />
              <textarea
                value={code.code}
                onChange={(e) =>
                  updateSampleCode(index, "code", e.target.value)
                }
                placeholder="Enter code"
                className="h-40 p-3 font-mono border rounded-md"
              />
            </div>
          ))}

          {/* Add Buttons */}
          <div className="flex justify-start w-full gap-4 text-sm font-medium">
            <button
              type="button"
              onClick={addSubtopic}
              className="flex items-center gap-2 px-4 py-2 shadow-sm border border-zinc-400 hover:bg-zinc-50"
            >
              <Plus size={14} />
              Add Subtopic
            </button>
            <button
              type="button"
              onClick={addDescription}
              className="flex items-center gap-2 px-4 py-2 shadow-sm border border-zinc-400 hover:bg-zinc-50"
            >
              <Plus size={14} />
              Add Description
            </button>
            <button
              type="button"
              onClick={addSampleCode}
              className="flex items-center gap-2 px-4 py-2 shadow-sm border border-zinc-400 hover:bg-zinc-50"
            >
              <Plus size={14} />
              Add Sample Code
            </button>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`py-2 px-4 rounded-md text-white bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed`}
            >
              {isLoading ? "Saving..." : "Save Lesson"}
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
      <Link to="/admin/assessments" className="flex items-center gap-2">
        <CornerDownLeft size={24} className="cursor-pointer mb-6" />
      </Link>

      <h1 className="text-2xl font-semibold text-gray-800">
        Create a New Lesson
      </h1>
      <p className="text-sm text-gray-600">
        Easily add a new lesson to the system to enhance learning content.
      </p>
    </div>
  </div>
);
