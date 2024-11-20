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
      toast.error("Failed to fetch bookmarks");
    } finally {
      setLoading(false);
    }
  }, [effectiveUserId]);
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);
  useEffect(() => {
    if (!effectiveUserId) return;
    const channel = supabase
      .channel("bookmarks-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${effectiveUserId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => [...prev, payload.new]);
          } else if (payload.eventType === "DELETE") {
            setBookmarks((prev) =>
              prev.filter((bookmark) => bookmark.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [effectiveUserId]);
  const isBookmarked = useCallback(
    (topic) => bookmarks.some((bookmark) => bookmark.topic === topic),
    [bookmarks]
  );
  const toggleBookmark = useCallback(
    async (topic, subTopics, link) => {
      if (!effectiveUserId) {
        toast.error("Please login to bookmark topics");
        return;
      }
      const existingBookmark = bookmarks.find((b) => b.topic === topic);
      try {
        if (existingBookmark) {
          // Optimistic update
          setBookmarks((prev) =>
            prev.filter((b) => b.id !== existingBookmark.id)
          );
          const { error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("id", existingBookmark.id);
          if (error) {
            throw error;
          }
          toast.success("Bookmark removed");
        } else {
          const newBookmark = {
            user_id: effectiveUserId,
            date_added: new Date().toISOString(),
            topic,
            subTopics,
            link,
          };
          // Optimistic update
          setBookmarks((prev) => [...prev, { ...newBookmark, id: Date.now() }]);
          const { data, error } = await supabase
            .from("bookmarks")
            .insert([newBookmark])
            .select()
            .single();
          if (error) {
            throw error;
          }
          // Update with actual database record
          setBookmarks((prev) =>
            prev.map((b) => (b.topic === topic ? data : b))
          );
          toast.success("Bookmark added");
        }
      } catch (error) {
        console.error("Error toggling bookmark:", error);
        toast.error("Failed to update bookmark");
        // Revert optimistic update on error
        fetchBookmarks();
      }
    },
    [bookmarks, effectiveUserId, fetchBookmarks]
  );
  return {
    bookmarks,
    loading,
    fetchBookmarks,
    toggleBookmark,
    isBookmarked,
  };
};
