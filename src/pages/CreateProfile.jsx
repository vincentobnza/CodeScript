import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../config/supabaseClient";
import { User, CloudUpload } from "lucide-react";

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    yearLevel: "",
    section: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const [checked, setChecked] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const createProfilePromise = new Promise(async (resolve, reject) => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("No user logged in");

        let avatarUrl = null;
        if (avatar) {
          const fileExt = avatar.name.split(".").pop();
          const fileName = `${Math.random()}.${fileExt}`;
          const filePath = `${user.id}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from("avatars")
            .upload(filePath, avatar);

          if (uploadError) throw uploadError;

          const {
            data: { publicUrl },
          } = supabase.storage.from("avatars").getPublicUrl(filePath);

          avatarUrl = publicUrl;
        }

        const { error } = await supabase.from("profiles").upsert({
          id: user.id,
          username: formData.username,
          display_name: formData.displayName,
          year_level: formData.yearLevel,
          section: formData.section,
          avatar_url: avatarUrl,
          updatedAt: new Date().toISOString(),
          current_points: 0,
          last_seen: new Date().toISOString(),
          status: "offline",
        });

        if (error) throw error;

        localStorage.setItem("hasProfile", "true");
        resolve("Profile created successfully!");

        setTimeout(() => {
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        }, 3000);
      } catch (error) {
        reject(error.message);
        console.error("Error creating profile:", error);
      } finally {
        setLoading(false);
      }
    });

    toast.promise(
      createProfilePromise,
      {
        loading: "Creating profile...",
        success: (message) => message,
        error: (err) => `Error: ${err}`,
      },
      {
        style: {
          fontSize: "14px",
          fontWeight: "500",
        },
      }
    );
  };

  return (
    <div className="flex justify-center min-h-screen p-3 bg-white">
      <Toaster />
      <div className="w-full max-w-2xl p-8 bg-white">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative mb-2 overflow-hidden bg-white border rounded-full border-zinc-200 size-20">
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar"
                className="object-cover object-center w-full h-full"
              />
            ) : (
              <User
                className="w-full h-full p-4 text-gray-400"
                strokeWidth={1}
              />
            )}
          </div>
          <label
            htmlFor="avatar-upload"
            className="flex items-center px-3 py-2 text-xs font-medium text-green-600 transition-colors bg-green-100 border border-green-300 rounded-lg cursor-pointer"
          >
            <CloudUpload size={16} className="mr-2" />
            <span>Upload Avatar</span>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Setup Your Profile
          </h2>
          <p className="mt-4 text-xs text-gray-500">
            Please set up your profile before starting
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-xs text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="displayName"
                className="block mb-2 text-xs text-gray-700"
              >
                Display Name
              </label>
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                value={formData.displayName}
                onChange={handleInputChange}
                className="block w-full px-3 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div>
              <label
                htmlFor="yearLevel"
                className="block mb-2 text-xs text-gray-700"
              >
                Year Level
              </label>
              <select
                id="yearLevel"
                name="yearLevel"
                value={formData.yearLevel}
                onChange={handleInputChange}
                required
                className="block w-full h-12 px-3 mt-1 text-xs text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Year Level</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="section"
                className="block mb-2 text-xs text-gray-700"
              >
                Section
              </label>
              <select
                id="section"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                required
                className="block w-full h-12 px-3 mt-1 text-xs text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Section</option>
                <option value="A">Section A</option>
                <option value="B">Section B</option>
                <option value="C">Section C</option>
                <option value="D">Section D</option>
                <option value="E">Section E</option>
              </select>
            </div>
          </div>
          <div className="flex items-center w-full gap-6">
            <input
              type="checkbox"
              checked={checked}
              id="terms"
              className="w-5 h-5 p-2 bg-white border border-gray-300 rounded-md checked:bg-green-500 checked:border-green-600"
              onChange={(e) => setChecked(e.target.checked)}
            />
            <label htmlFor="terms" className="text-xs text-zinc-600">
              I agree to share my profile information for platform use, as
              outlined in the privacy policy.
            </label>
          </div>
          <div>
            <button
              type="submit"
              disabled={
                loading ||
                !formData.username.trim() ||
                !formData.displayName.trim() ||
                !formData.yearLevel ||
                !formData.section ||
                !checked
              }
              className="flex items-center justify-center w-full h-12 px-4 text-sm font-medium text-white transition-colors bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
