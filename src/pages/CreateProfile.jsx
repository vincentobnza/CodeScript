import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../config/supabaseClient";
import { User, CloudUpload, Dices } from "lucide-react";

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

    if (!avatar) {
      toast.error("Please upload an avatar!");
      setLoading(false);
      return;
    }

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
    <div className="flex justify-center items-center min-h-screen bg-white">
      <Toaster />
      <div className="flex flex-col md:flex-row w-full bg-white overflow-hidden min-h-screen">
        {/* Left Section */}
        <div className="w-full md:w-1/3 flex flex-col justify-center text-center items-center p-6 bg-slate-800">
          <div className="relative mb-10 md:mb-20">
            {avatar ? (
              <img
                src={URL.createObjectURL(avatar)}
                alt="Avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-3 border-slate-500"
              />
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/previews/011/490/381/original/happy-smiling-young-man-avatar-3d-portrait-of-a-man-cartoon-character-people-illustration-isolated-on-white-background-vector.jpg"
                alt="Avatar"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white grayscale"
              />
            )}
            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 bg-gradient-to-br from-green-500 to-indigo-500 p-2 md:p-4 rounded-full cursor-pointer"
            >
              <CloudUpload size={20} md:size={24} className="text-white" />
              <input
                autoComplete="off"
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                required
              />
            </label>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
            Setup Your Profile
          </h2>
          <p className="text-xs md:text-[16px] leading-relaxed text-zinc-400 mt-2">
            Let’s know a little bit about you <br /> This won’t take long.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-2/3 p-6 md:p-20">
          <form onSubmit={handleSubmit} className="space-y-6 relative">
            <i className="text-sm md:text-lg font-medium absolute top-0 right-0 text-zinc-700">
              ( Required All Fields )
            </i>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm md:text-lg font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  autoComplete="off"
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-zinc-200 border-b bg-white h-10 md:h-12 outline-none focus:outline-none focus:border-b-4 focus:border-zinc-700 text-zinc-700 text-sm md:text-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="displayName"
                  className="block text-sm md:text-lg font-medium text-gray-700"
                >
                  Display Name
                </label>
                <input
                  autoComplete="off"
                  id="displayName"
                  name="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-zinc-200 border-b bg-white h-10 md:h-12 outline-none focus:outline-none focus:border-b-4 focus:border-zinc-700 text-zinc-700 text-sm md:text-lg"
                />
              </div>
              <div>
                <label
                  htmlFor="yearLevel"
                  className="block text-sm md:text-lg font-medium text-gray-700"
                >
                  Year Level
                </label>
                <select
                  id="yearLevel"
                  name="yearLevel"
                  value={formData.yearLevel}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-zinc-200 border-b bg-white h-10 md:h-12 outline-none focus:outline-none focus:border-b-4 focus:border-zinc-700 text-zinc-700 text-sm md:text-lg"
                >
                  <option value=""></option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="section"
                  className="block text-sm md:text-lg font-medium text-gray-700"
                >
                  Section
                </label>
                <select
                  id="section"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border-zinc-200 border-b bg-white h-10 md:h-12 outline-none focus:outline-none focus:border-b-4 focus:border-zinc-700 text-zinc-700 text-sm md:text-lg"
                >
                  <option value=""></option>
                  <option value="A">Section A</option>
                  <option value="B">Section B</option>
                  <option value="C">Section C</option>
                  <option value="D">Section D</option>
                  <option value="E">Section E</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full md:w-auto px-6 text-sm md:text-lg font-semibold py-3 bg-zinc-300 text-zinc-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  loading ||
                  !formData.username.trim() ||
                  !formData.displayName.trim() ||
                  !formData.yearLevel ||
                  !formData.section
                }
                className="w-full md:w-auto px-6 text-sm md:text-lg font-semibold py-3 bg-zinc-700 text-white hover:bg-zinc-600 disabled:opacity-30"
              >
                {loading ? "Creating..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
