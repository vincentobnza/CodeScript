import { useState, useEffect, useCallback } from "react";
import supabase from "../config/supabaseClient";
import { useAuth } from "@/context/AuthContext";

export const useBookmarks = (userId) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const effectiveUserId = userId || user?.id;

  const fetchBookmarks = useCallback(async () => {
    if (!effectiveUserId) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", effectiveUserId);

      if (error) throw error;

      setBookmarks(data || []);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    } finally {
      setLoading(false);
    }
  }, [effectiveUserId]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  useEffect(() => {
    if (!effectiveUserId) return;

    const subscription = supabase
      .channel("bookmarks")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookmarks" },
        (payload) => {
          setBookmarks((prev) => [...prev, payload.new]);
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookmarks" },
        (payload) => {
          setBookmarks((prev) =>
            prev.filter((bookmark) => bookmark.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [effectiveUserId]);

  const isBookmarked = (topic) =>
    bookmarks.some((bookmark) => bookmark.topic === topic);

  const toggleBookmark = useCallback(
    async (topic, subTopics, link) => {
      if (!effectiveUserId) {
        console.log("User is not authenticated");
        return;
      }

      const existingBookmark = bookmarks.find((b) => b.topic === topic);

      try {
        if (existingBookmark) {
          // Remove bookmark
          const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", existingBookmark.id);

          if (error) throw error;

          setBookmarks(bookmarks.filter((b) => b.id !== existingBookmark.id));
        } else {
          // Add bookmark
          const { data, error } = await supabase
            .from("bookmarks")
            .insert([
              {
                user_id: effectiveUserId,
                date_added: new Date(),
                topic,
                subTopics,
                link,
              },
            ])
            .select()
            .single();

          if (error) throw error;

          setBookmarks((prev) => [...prev, data]);
        }
      } catch (error) {
        console.error("Error toggling bookmark:", error);
      }
    },
    [bookmarks, effectiveUserId]
  );

  return {
    bookmarks,
    loading,
    fetchBookmarks,
    toggleBookmark,
    isBookmarked, // Add this here
  };
};
