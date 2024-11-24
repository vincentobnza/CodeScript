import React, { useState } from "react";
import { LockKeyhole } from "lucide-react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const [instructorID, setInstructorID] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("admin_account")
        .select("*")
        .eq("instructor_id", instructorID)
        .single();

      if (error || !data) {
        toast.error("Invalid Instructor ID. Please try again.");
        return;
      }

      toast.success("Login successful! Redirecting...");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Error logging in. Please try again later.");
      console.error("Error fetching instructor ID:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white font-Jost">
      <Toaster />
      <div className="w-1/2 p-10 bg-white ">
        <div className="flex flex-col items-center mb-10">
          <div className="p-5 rounded-full shadow-lg bg-gradient-to-br from-green-200 to-green-400">
            <LockKeyhole size={40} color="#fff" />
          </div>
          <h2 className="mt-5 mb-4 text-3xl font-bold text-zinc-800">
            Instructor Login
          </h2>
          <p className="text-sm text-zinc-500">
            Enter your instructor ID to access the dashboard.
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full max-w-sm gap-5 mx-auto mt-4"
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="instructorID"
              className="text-sm font-semibold text-zinc-600"
            >
              Instructor ID
              <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={instructorID}
              onChange={(e) => setInstructorID(e.target.value)}
              className="w-full h-12 px-3 py-2 border rounded shadow outline-none border-zinc-200 placeholder:text-sm shadow-zinc-200"
              placeholder="Enter Instructor ID"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-sm font-bold tracking-wide text-green-900 transition-colors bg-green-200 border border-green-400 rounded hover:bg-green-300"
          >
            Login Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
