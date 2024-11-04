import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../config/supabaseClient";
import { motion } from "framer-motion";
import { User, Upload } from "lucide-react";
import { Avatar } from "@nextui-org/react";

export default function CreateProfile() {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
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
          borderRadius: "5px",
          background: "#333",
          color: "#fff",
          fontSize: "12px",
          letterSpacing: "0.5px",
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid w-full h-screen place-items-center bg-zinc-900"
    >
      <Toaster />
      <div className="flex flex-col items-center justify-center w-full max-w-screen-lg py-12 mx-auto bg-zinc-900 sm:px-6 lg:px-8 text-zinc-300">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Avatar
            src={avatar ? URL.createObjectURL(avatar) : undefined}
            icon={<User size={25} className="text-zinc-500" />}
            className="w-16 h-16 text-large"
          />
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="flex items-center px-3 py-2 space-x-2 text-xs font-bold transition-colors border rounded text-zinc-400 border-zinc-800">
              <Upload size={16} />
              <span>Upload Avatar</span>
            </div>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-semibold text-center text-transparent bg-gradient-to-br from-white to-zinc-700 bg-clip-text ">
            Setup Your Profile
          </h2>
          <p className="mt-5 text-sm text-zinc-500">
            Please set up your profile before starting
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
          <div className="px-4 py-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="grid w-full gap-2 mt-1 md:grid-cols-2">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    autoFocus={true}
                    value={formData.username}
                    onChange={handleInputChange}
                    className="block w-full h-12 px-3 py-2 placeholder-gray-400 transition duration-500 ease-in-out border-2 shadow-sm appearance-none bg-zinc-900 border-zinc-800 focus:outline-none hover:border-zinc-600 sm:text-sm placeholder:text-sm placeholder:text-zinc-500 placeholder:font-semibold"
                    placeholder="Enter your username"
                  />
                  <input
                    id="displayName"
                    name="displayName"
                    type="text"
                    required
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="block w-full h-12 px-3 py-2 placeholder-gray-400 transition duration-500 ease-in-out border-2 shadow-sm appearance-none bg-zinc-900 border-zinc-800 focus:outline-none hover:border-zinc-600 sm:text-sm placeholder:text-sm placeholder:text-zinc-500 placeholder:font-semibold"
                    placeholder="Enter your display name"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={
                    loading ||
                    !formData.username.trim() ||
                    !formData.displayName.trim()
                  }
                  className="flex items-center justify-center w-full h-12 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating..." : "Create Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
