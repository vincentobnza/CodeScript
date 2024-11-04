import React, { useState } from "react";
import { LockKeyhole } from "lucide-react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; // Import toast

export default function AdminLogin() {
  const [instructorID, setInstructorID] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("admin_account")
        .select("*")
        .eq("instructor_id", instructorID);

      if (error || !data || data.length === 0) {
        toast.error("Invalid Instructor ID. Please try again"); // Error toast
        return;
      }

      setInstructorID(data);
      toast.success("Login successful! Redirecting..."); // Success toast
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Error logging in. Please try again later"); // Error toast for any other issues
      console.error("Error fetching instructor ID", error);
    }
  };

  return (
    <div className="grid w-full h-screen font-sans text-center bg-white place-items-center text-zinc-700">
      <div className="w-full max-w-xl p-5 mx-auto">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="grid mb-5 text-green-400 border rounded-lg shadow-2xl bg-gradient-to-br from-white to-zinc-100 size-12 place-items-center border-zinc-200 shadow-zinc-100">
            <LockKeyhole />
          </div>
          <h1 className="mb-2 text-3xl font-semibold">
            Login to your Instructor Account
          </h1>
          <p className="text-sm text-zinc-500">
            Please log in to your admin account below
          </p>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-start justify-start w-full max-w-sm gap-2 mx-auto mt-5 text-zinc-500"
          >
            <label htmlFor="instructorID" className="text-sm font-semibold">
              Instructor ID
              <span className="ml-2 text-red-400">*</span>
            </label>
            <input
              type="text"
              value={instructorID}
              onChange={(e) => setInstructorID(e.target.value)}
              className="w-full h-12 px-3 border rounded shadow outline-none border-zinc-200 placeholder:text-sm shadow-zinc-200"
              placeholder="Enter Instructor ID"
              required
            />

            <button
              type="submit"
              className="w-full py-3 mt-6 text-sm font-bold tracking-wide text-green-900 transition-colors bg-green-200 border border-green-400 rounded hover:bg-green-300"
            >
              Login Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
