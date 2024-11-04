import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithGithub } = useAuth();

  const handleGithubLogin = async () => {
    await signInWithGithub();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid w-full h-screen bg-zinc-900 place-items-center text-zinc-400"
    >
      <Toaster />
      <div className="flex flex-col items-center justify-center w-full max-w-md gap-4 p-10 text-center">
        <h1 className="text-4xl font-semibold tracking-wide text-transparent bg-gradient-to-br from-white to-zinc-400 bg-clip-text">
          Welcome Back!
        </h1>
        <p className="text-md">Sign in to your account</p>

        <div className="flex flex-col w-full max-w-xl gap-2 mt-5">
          <button
            onClick={handleGithubLogin}
            className="flex items-center justify-center w-full gap-2 mt-1 text-sm font-bold text-center text-black bg-white rounded-md h-11"
          >
            <FaGithub />
            Sign In with Github
          </button>
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center w-full gap-2 mt-1 text-sm font-bold text-center border-2 rounded-md h-11 border-zinc-700 text-zinc-300"
          >
            <FcGoogle />
            Sign In with Google
          </button>
        </div>

        <p className="self-center mt-10 text-sm font-semibold">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="ml-2 text-green-600 underline hover:text-green-300"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
