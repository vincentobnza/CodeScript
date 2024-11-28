import { useState, useEffect, useCallback } from "react";
import supabase from "../config/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast"; // Assuming you're using react-toastify for notifications.

export const useBookmarks = (userId) => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const effectiveUserId = userId || user?.id;

  // Fetch bookmarks for the logged-in user
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

  // Real-time updates for bookmarks
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
          switch (payload.eventType) {
            case "INSERT":
              setBookmarks((prev) => [...prev, payload.new]);
              break;
            case "DELETE":
              setBookmarks((prev) =>
                prev.filter((bookmark) => bookmark.id !== payload.old.id)
              );
              break;
            case "UPDATE":
              setBookmarks((prev) =>
                prev.map((bookmark) =>
                  bookmark.id === payload.new.id ? payload.new : bookmark
                )
              );
              break;
            default:
              break;
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [effectiveUserId]);

  // Check if a topic is bookmarked
  const isBookmarked = useCallback(
    (topic) => bookmarks.some((bookmark) => bookmark.topic === topic),
    [bookmarks]
  );

  // Toggle a bookmark
  const toggleBookmark = useCallback(
    async (topic, subTopics, link) => {
      if (!effectiveUserId) {
        toast.error("Please login to bookmark topics");
        return;
      }

      const existingBookmark = bookmarks.find((b) => b.topic === topic);

      try {
        if (existingBookmark) {
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

          setBookmarks((prev) => [...prev, { ...newBookmark, id: Date.now() }]);

          const { data, error } = await supabase
            .from("bookmarks")
            .insert([newBookmark])
            .select()
            .single();

          if (error) {
            throw error;
          }

          setBookmarks((prev) =>
            prev.map((b) => (b.topic === topic ? data : b))
          );

          toast.success("Bookmark added");
        }
      } catch (error) {
        console.error("Error toggling bookmark:", error);
        toast.error("Failed to update bookmark");
        fetchBookmarks(); // Revert optimistic update on error
      }
    },
    [bookmarks, effectiveUserId, fetchBookmarks]
  );

  const deleteBookmarks = (idsToDelete) => {
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => !idsToDelete.includes(bookmark.id)
    );
    setBookmarks(updatedBookmarks);
    localStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
  };

  // Fetch bookmarks on component mount
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    fetchBookmarks,
    toggleBookmark,
    isBookmarked,
    deleteBookmarks,
    setLoading,
  };
};
