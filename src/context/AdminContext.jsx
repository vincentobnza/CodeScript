import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import { toast } from "react-hot-toast";

// AdminContext
const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [adminID, setAdminID] = useState(null);
  const [admin, setAdmin] = useState(null);

  // Function to check if the entered Instructor ID is valid
  const checkAdminID = async (instructorID) => {
    try {
      const { data, error } = await supabase
        .from("admin_account")
        .select("*")
        .eq("instructor_id", instructorID)
        .single();

      if (error || !data) {
        toast.error("Invalid Instructor ID. Please try again.");
        return false;
      }

      setAdminID(data);
      return true;
    } catch (error) {
      console.error("Error validating Instructor ID:", error);
      return false;
    }
  };

  const fetchAdmin = async () => {
    try {
      const { data, error } = await supabase
        .from("admin_account")
        .select("*")
        .eq("instructor_id", adminID.instructor_id)
        .single();

      if (error || !data) {
        toast.error("Invalid Instructor ID. Please try again.");
        return;
      }

      setAdmin(data);
    } catch (error) {
      console.error("Error fetching admin account:", error);
    }
  };

  useEffect(() => {
    fetchAdmin();
  }, [admin]);

  const value = {
    adminID,
    checkAdminID,
    admin,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

// Custom hook for using admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
