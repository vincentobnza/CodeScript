import React, { useState, useEffect, useCallback, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { CircularProgress } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import supabase from "../config/supabaseClient";
import { useUser } from "@/context/UserContext";
import { Pointer, PointerOff } from "lucide-react";

export default function PointsCoin() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  const toastShownRef = useRef(false);
  const { user } = useAuth();
  const { currentUser, setCurrentUser } = useUser();
  const [updatedPoints, setUpdatedPoints] = useState(0);

  useEffect(() => {
    const fetchInitialPoints = async () => {
      if (user) {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("current_points")
            .eq("id", user.id)
            .single();

          if (error) {
            throw error;
          }

          const initialPoints = data.current_points || 0;
          setUpdatedPoints(initialPoints);
          setCurrentUser((prevUser) => ({
            ...prevUser,
            current_points: initialPoints,
          }));
        } catch (error) {
          console.error("Error fetching initial points:", error.message);
        }
      }
    };

    fetchInitialPoints();
  }, [user, setCurrentUser]);

  const handleScroll = useCallback(() => {
    const currentTime = Date.now();
    const timeDiff = currentTime - lastScrollTime;

    setPoints((prevPoints) => {
      let newPoints;
      if (timeDiff > 500) {
        newPoints = Math.min(prevPoints + 10, 100);
      } else if (timeDiff > 100) {
        newPoints = Math.min(prevPoints + 2, 100);
      } else {
        newPoints = prevPoints;
      }

      if (newPoints >= 100) {
        setIsLoading(false);
      }

      return newPoints;
    });

    setLastScrollTime(currentTime);
  }, [lastScrollTime]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const updatePoints = useCallback(
    async (pointsToAdd) => {
      if (!user) {
        console.error("No user logged in");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("current_points")
          .eq("id", user?.id)
          .single();

        if (error) {
          throw error;
        }

        const currentPoints = data.current_points || 0;
        const newPoints = currentPoints + pointsToAdd;

        console.log("New total points:", newPoints);

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ current_points: newPoints })
          .eq("id", user?.id);

        if (updateError) {
          throw updateError;
        }

        console.log("Points updated successfully in DB");
      } catch (error) {
        console.error("Error updating points:", error.message);
      }
    },
    [user]
  );

  const updateProgress = useCallback(
    async (progressToAdd) => {
      if (!user) {
        console.error("No user logged in");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("progress")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        const currentProgress = data.progress || 0;
        const newProgress = currentProgress + progressToAdd;

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ progress: newProgress })
          .eq("id", user.id);

        if (updateError) {
          throw updateError;
        }

        console.log("Progress updated successfully in DB");
      } catch (error) {
        console.error("Error updating progress:", error.message);
      }
    },
    [user]
  );

  const handleClick = useCallback(() => {
    toast.success("You've earned 5 points!", {
      icon: "🥇",
      style: {
        fontSize: "13px",
        fontWeight: "bold",
      },
    });
    setPoints((prevPoints) => {
      if (prevPoints) {
        if (!toastShownRef.current) {
          toastShownRef.current = true;
          updatePoints(5);
          updateProgress(0.5).then(() => {
            toastShownRef.current = false; // Reset the ref after updating
          });
        }
        setIsLoading(true);
        return 0;
      }
      return prevPoints;
    });
  }, [updatePoints, updateProgress]);

  useEffect(() => {
    if (user) {
      const channel = supabase.channel("db-changes");

      const subscription = channel
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "profiles",
            filter: `id=eq.${user.id}`,
          },
          (payload) => {
            console.log("Change received!", payload);
            if (payload.new && payload.new.current_points !== undefined) {
              setUpdatedPoints(payload.new.current_points);
              setCurrentUser((prevUser) => ({
                ...prevUser,
                current_points: payload.new.current_points,
              }));
            }
          }
        )
        .subscribe();
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user, setCurrentUser]);

  return (
    <div className="fixed z-50 flex items-center gap-3 bottom-4 right-4">
      {points === 100 && (
        <p className="mb-10 text-xs font-semibold text-amber-700 dark:text-amber-300 animate-pulse">
          Click to gain points
        </p>
      )}
      <div className="flex flex-col items-center gap-1">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative cursor-pointer w-14 h-14 focus:outline-none"
          onClick={handleClick}
        >
          <div className="absolute inset-0 rounded-full focus:outline-none" />
          <div
            className={`absolute flex items-center justify-center rounded-full inset-1 focus:outline-none ${
              points === 100
                ? "bg-amber-600 dark:bg-amber-500/20 text-white animate-bounce border-2 border-amber-400"
                : "bg-white dark:bg-zinc-800 text-black dark:text-zinc-100 font-Ubuntu"
            }`}
          >
            <span
              className={`font-bold ${
                points === 100
                  ? "text-amber-500 dark:text-amber-100"
                  : "text-amber-500 dark:text-amber-100"
              } text-md`}
            >
              {points === 100 ? (
                <Pointer size={20} strokeWidth={2.5} />
              ) : (
                <PointerOff size={20} strokeWidth={2.5} />
              )}
            </span>
          </div>
          {isLoading && (
            <CircularProgress
              size="lg"
              value={points}
              color="warning"
              aria-label="Loading progress"
              showValueLabel={false}
              strokeWidth={2}
              classNames={{
                svg: "w-full h-full",
                indicator: "stroke-[#f59e0b] outline-none",
                track: "stroke-[#a1a1aa] opacity-30 outline-none",
              }}
            />
          )}
        </motion.div>

        <div className="mt-2 px-2 py-[1px] text-xs font-bold text-amber-700 dark:text-white rounded-full dark:bg-amber-500/20  border border-amber-500 dark:border-amber-400 text-center">
          <p>{updatedPoints} ✨</p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
