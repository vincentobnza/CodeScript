import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import supabase from "@/config/supabaseClient";

// UserContext
const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
    const channel = supabase
      .channel("user-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        (payload) => {
          console.log("Change received!", payload);

          if (payload.eventType === "INSERT") {
            setUsers((prevUsers) => [...prevUsers, payload.new]);
          } else if (payload.eventType === "UPDATE") {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user.id === payload.new.id ? payload.new : user
              )
            );
          } else if (payload.eventType === "DELETE") {
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCurrentUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching current user:", error);
      } else {
        setCurrentUser(data);
      }
    }
  };

  const updatePoints = async (userId, points) => {
    const { error } = await supabase
      .from("profiles")
      .update({ current_points: points })
      .eq("id", userId);

    if (error) {
      console.error("Error updating points:", error);
    } else {
      console.log("Points updated successfully!");
    }
  };

  const value = {
    users,
    currentUser,
    updatePoints,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
