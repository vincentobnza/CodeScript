import React, { useState, useEffect } from "react";
import { EyeOff, Eye, Lock } from "lucide-react";
import supabase from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import AdminPhoto from "../assets/admin.png";

const AdminLogin = () => {
  const [instructorID, setInstructorID] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValidInstructorID, setIsValidInstructorID] = useState(false); // Track the validity of the instructor ID
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  // Validate instructor ID as it changes
  useEffect(() => {
    const validateInstructorID = async () => {
      if (instructorID.length >= 3) {
        // Only start validating after 3 characters
        const { data, error } = await supabase
          .from("admin_account")
          .select("*")
          .eq("instructor_id", instructorID.toUpperCase())
          .single();

        if (error || !data) {
          setIsValidInstructorID(false); // Invalid ID
        } else {
          setIsValidInstructorID(true); // Valid ID
        }
      } else {
        setIsValidInstructorID(false); // Invalid ID
      }
    };

    validateInstructorID();
  }, [instructorID]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isValidInstructorID) {
      toast.error("Invalid Instructor ID. Please try again.", {
        style: {
          fontWeight: "500",
        },
      });
      return;
    }

    try {
      toast.success("Login successful! Redirecting...");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error("Error logging in. Please try again later.");
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="flex h-screen bg-white font-Roboto">
      <div className="flex flex-col items-center w-1/2 text-white p-[3.4rem] bg-zinc-800 group">
        <h1 className="mt-10 text-4xl font-bold">Instructor Access Only</h1>
        <p className="mt-6 text-center text-zinc-400">
          This section is only for instructors and admin personnel. Please
          ensure you have the appropriate credentials to access the system.
        </p>
        <img
          src={AdminPhoto}
          alt="admin"
          className={`w-[350px] h-[350px] antialiased ${
            isValidInstructorID
              ? "filter grayscale-0 animate-pulse"
              : "filter grayscale opacity-30"
          }`}
        />
      </div>

      <Toaster />

      <div className="flex flex-col items-start justify-start w-1/2 p-16 text-left">
        <div className="w-full">
          <div className="flex flex-col mt-5 mb-10">
            <h2 className="mt-2 mb-4 text-4xl font-bold text-zinc-800">
              Access Dashboard
            </h2>
            <p className="text-lg font-medium text-zinc-700">
              Enter your instructor code to access the dashboard.
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="flex flex-col w-full gap-5 mx-auto mt-4"
          >
            <div className="flex flex-col gap-4">
              <label
                htmlFor="instructorID"
                className="text-lg font-semibold text-zinc-600"
              >
                Instructor Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={instructorID.toUpperCase()}
                  onChange={(e) => setInstructorID(e.target.value)}
                  className={`w-full h-16 px-4 text-lg font-bold ${
                    isValidInstructorID ? "text-green-600" : "text-zinc-600"
                  } uppercase border rounded shadow outline-none border-zinc-300 placeholder:text-lg placeholder:font-medium shadow-zinc-200`}
                  placeholder="Enter Instructor Code"
                  required
                  style={{ fontSize: "18px" }} // Make the text bigger
                />
              </div>
            </div>
            <button
              type="submit"
              className="flex items-center justify-center w-full h-16 gap-4 text-lg font-bold tracking-wide text-white transition-colors bg-zinc-800"
            >
              Admin Access
              <Lock size={20} strokeWidth={2.5} />
            </button>
          </form>

          {/* WARNING NOTE */}
          <div className="flex items-center justify-start p-6 mt-5 bg-yellow-200 border-l-4 border-yellow-600 rounded-lg shadow-lg">
            <div className="flex space-x-4">
              {/* Warning Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M5.5 20.25h13a1.25 1.25 0 001.25-1.25V4a1.25 1.25 0 00-1.25-1.25h-13A1.25 1.25 0 004.25 4v14a1.25 1.25 0 001.25 1.25z"
                />
              </svg>
              {/* Warning Text */}
              <div>
                <h3 className="text-xl font-semibold text-yellow-800">
                  Warning: Please Review the Information
                </h3>
                <p className="mt-2 text-sm font-medium text-yellow-700">
                  Make sure you double-check the input before proceeding.
                  Inaccurate information may result in system errors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
