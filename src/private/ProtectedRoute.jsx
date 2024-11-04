import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";
import supabase from "../config/supabaseClient.js";
import Loading from "@/components/loading.jsx";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [hasUsername, setHasUsername] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkUsername = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", user.id)
          .single();

        if (data && data.username) {
          setHasUsername(true);
          localStorage.setItem("hasProfile", "true");
        } else {
          setHasUsername(false);
          localStorage.removeItem("hasProfile");
        }
      }
      setLoading(false);
    };

    checkUsername();
  }, [user, location.pathname]);

  if (loading) {
    return (
      <Loading
        title="Loading..."
        text="Please wait while we prepare your content."
      />
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasUsername) {
    return <Navigate to="/create-profile" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
