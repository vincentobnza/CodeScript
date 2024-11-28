import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPen, PencilLine } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import supabase from "../config/supabaseClient";
import { useUser } from "../context/UserContext";
import { Avatar } from "@nextui-org/react";
import { toast, Toaster } from "react-hot-toast";

export default function Settings() {
  return (
    <div className="flex flex-col w-full max-w-screen-lg p-3 pb-10 mx-auto space-y-6 bg-white md:p-0 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-300">
      <Header />
      <Main />
    </div>
  );
}

const Header = () => (
  <div className="flex items-start justify-between w-full max-w-screen-lg gap-4 p-5 mx-auto">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-semibold">Settings</h1>
      <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
        Manage your account settings
      </p>
    </div>
  </div>
);

const Main = () => (
  <div className="w-full min-h-[70vh] flex flex-col lg:flex-row gap-2">
    <Sidebar />
    <Content />
  </div>
);

const Sidebar = () => (
  <div className="w-full p-5 border-b lg:inset-y-0 lg:border-b-0 lg:border-r lg:w-80 border-zinc-200 dark:border-zinc-800">
    <h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-500">
      Information Details
    </h3>

    <ul className="mt-5">
      <Link
        to="/settings"
        className="flex items-center gap-6 px-3 py-2 text-sm font-semibold rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-800 bg-zinc-100 dark:bg-zinc-800"
      >
        <UserPen size={15} />
        Profile Settings
      </Link>
    </ul>
  </div>
);

const Content = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    display_name: "",
    avatar_url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [filePreview, setFilePreview] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setUserDetails(data);
        setFormData({
          username: data.username || "",
          display_name: data.display_name || "",
          avatar_url: data.avatar_url || "",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error fetching user details" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to Supabase Storage
    try {
      setIsLoading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (error) throw error;

      const avatarUrl = `${
        supabase.storage.from("avatars").getPublicUrl(fileName).data.publicUrl
      }`;
      setFormData((prev) => ({
        ...prev,
        avatar_url: avatarUrl,
      }));
    } catch (error) {
      toast.error("Error uploading: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from("profiles")
        .update({
          username: formData.username,
          display_name: formData.display_name,
          avatar_url: formData.avatar_url,
          updatedAt: new Date(),
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile updated successfully", {
        style: {
          fontSize: "12px",
          fontWeight: "500",
        },
      });
      await fetchCurrentUser(); 
    } catch (error) {
      toast.error("Error updating profile: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 gap-4 p-5 lg:flex-row">
      <Toaster />
      <div className="flex flex-col items-center gap-4 mb-5 lg:basis-1/4">
        <Avatar
          src={filePreview || userDetails?.avatar_url}
          size="lg"
          isBordered
        />
        <label className="flex items-center gap-2 mt-5 text-xs font-semibold cursor-pointer text-green-600 dark:text-green-400">
          Change
          <PencilLine size={14} />
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </label>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 lg:basis-1/2"
      >
        <h1 className="text-3xl font-semibold">Profile Settings</h1>
        <p className="text-sm font-semibold dark:text-zinc-500 text-zinc-500">
          Edit and save your profile information.
        </p>

        <div className="w-full max-w-lg mt-5">
          <div className="flex flex-col w-full gap-12">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="username"
                className="text-xs font-semibold text-zinc-400"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                className="w-full h-10 px-3 bg-transparent border-b rounded-md outline-none border-zinc-200 dark:border-zinc-800"
                value={formData.username}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="display_name"
                className="text-xs font-semibold text-zinc-400"
              >
                Display Name
              </label>
              <input
                type="text"
                name="display_name"
                className="w-full h-10 px-3 bg-transparent border-b rounded-md outline-none border-zinc-200 dark:border-zinc-800"
                value={formData.display_name}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="self-end px-3 py-2 mt-4 text-sm font-semibold transition-colors border border-zinc-300 dark:border-zinc-800 text-zinc-600 dark:text-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {isLoading ? "Saving..." : "Save Settings"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
