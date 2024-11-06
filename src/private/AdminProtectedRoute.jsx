import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import supabase from "../config/supabaseClient.js";
import Loading from "@/components/loading.jsx";

const AdminProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const checkAdmin = async () => {
      try {
        const { data, error } = await supabase
          .from("admin_account")
          .select("instructor_id")
          .single();

        if (error) throw error;
        setAdmin(data);
      } catch (error) {
        console.error("Error checking admin status:", error);
      } finally {
        setLoading(false);
      }
    };
    checkAdmin();
  }, [location.pathname]);

  if (loading) {
    return <Loading title="Fetching accounts" text="Please wait..." />;
  }

  if (!admin) {
    return <Navigate to="/admin-login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AdminProtectedRoute;
