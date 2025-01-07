import React, { useState, useEffect, useCallback, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { CircularProgress } from "@nextui-org/react";
import { useAuth } from "@/context/AuthContext";
import supabase from "../config/supabaseClient";
import { useUser } from "@/context/UserContext";
import CoinLogo from "../assets/coins_point.png";
import { Tooltip } from "@nextui-org/react";

export default function PointsCoin() {
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [lastScrollTime, setLastScrollTime] = useState(Date.now());
  const toastShownRef = useRef(false);
  const { user } = useAuth();
  const { currentUser, setCurrentUser } = useUser();
  const [updatedPoints, setUpdatedPoints] = useState(0);

  const [displayedPoints, setDisplayedPoints] = useState(0);

  useEffect(() => {
    if (updatedPoints > 0) {
      let start = displayedPoints;
      const end = updatedPoints;
      const increment = Math.ceil((end - start) / 5);
      const duration = 1000;

      const animate = () => {
        if (start < end) {
          start += increment;
          if (start > end) start = end;
          setDisplayedPoints(start);
          setTimeout(animate, duration / 10);
        }
      };

      animate();
    }
  }, [updatedPoints]);

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
        newPoints = Math.min(prevPoints + 5, 100);
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
          .eq("id", user?.id);

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

  useEffect(() => {
    if (points === 100 && !toastShownRef.current) {
      toastShownRef.current = true;

      toast.success("You've earned 5 points!", {
        style: {
          backgroundColor: "#15803d",
          color: "#fff",
          fontSize: "12px",
          fontWeight: "500",
        },
      });

      // Update points and progress
      updatePoints(5);
      updateProgress(0.5).then(() => {
        toastShownRef.current = false; // Reset the ref after updating
      });

      // Reset points to 0 and mark loading
      setPoints(0);
      setIsLoading(true);
    }
  }, [points, updatePoints, updateProgress]);

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
    <>
      {user && (
        <div className="fixed z-50 flex items-center gap-3 bottom-4 right-4">
          <div className="flex flex-col items-center gap-1">
            <Tooltip
              content="Keep scrolling to gain points and progress ✨"
              placement="top"
              className="font-Balsamiq"
              radius="none"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative w-14 h-14 focus:outline-none"
              >
                <div className="absolute inset-0 rounded-full focus:outline-none" />
                <div className="absolute flex items-center justify-center rounded-full inset-1 focus:outline-none">
                  <span>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/17301/17301413.png"
                      alt="points"
                      className={`${points === 100 ? "size-11" : "size-7"} ${
                        points === 100 ? "animate-bounce" : ""
                      }`}
                    />
                  </span>
                </div>
                {points < 100 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <CircularProgress
                      size="lg"
                      value={points}
                      color="warning"
                      aria-label="Loading progress"
                      showValueLabel={false}
                      strokeWidth={2}
                      classNames={{
                        svg: "w-full h-full",
                        indicator: "stroke-yellow-500 outline-none",
                        track: "stroke-[#a1a1aa] opacity-30 outline-none",
                      }}
                    />
                  </div>
                )}
              </motion.div>
            </Tooltip>

            <div className="mt-2 px-2 py-[3px] text-xs font-bold  text-white rounded-full bg-orange-600 text-center tracking-wider flex items-center gap-1">
              <img
                src="https://cdn-icons-png.flaticon.com/128/17301/17301413.png"
                alt="points"
                className="size-[0.6rem]"
              />
              <p className="antialiased">{displayedPoints}</p>
            </div>
          </div>
          <Toaster />
        </div>
      )}
    </>
  );
}
