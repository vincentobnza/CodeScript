import React, { useState } from "react";
import { Undo2, Delete, MousePointer2 } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmark";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function Bookmark() {
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [selectedBookmarks, setSelectedBookmarks] = useState([]);
  const { bookmarks, toggleBookmark } = useBookmarks();

  const handleToggleCheckbox = () => {
    setShowCheckbox(!showCheckbox);
    setSelectedBookmarks([]);
  };
  const handleCheckboxChange = (id) => {
    setSelectedBookmarks((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    selectedBookmarks.forEach((id) => {
      const bookmark = bookmarks.find((b) => b.id === id);
      if (bookmark)
        toggleBookmark(bookmark.topic, bookmark.subTopics, bookmark.link);
    });
    window.location.reload();
    setShowCheckbox(false);
    setSelectedBookmarks([]);
  };

  return (
    <div className="w-full min-h-screen space-y-6">
      <Header
        showCheckbox={showCheckbox}
        onToggleCheckbox={handleToggleCheckbox}
        onDeleteSelected={handleDeleteSelected}
        disableDelete={!selectedBookmarks.length}
      />
      <Content
        showCheckbox={showCheckbox}
        selectedBookmarks={selectedBookmarks}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}

const Header = ({
  showCheckbox,
  onToggleCheckbox,
  onDeleteSelected,
  disableDelete,
}) => {
  return (
    <div className="flex flex-col w-full max-w-screen-lg gap-2 p-5 mx-auto">
      <Link to="/learn-js" className="flex items-center gap-3 text-sm">
        <Undo2 size={14} />
        Return to Homepage
      </Link>
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="mt-8 text-3xl font-semibold">Bookmark Topics</h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Topics you've bookmarked
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleCheckbox}
            className="text-[13px] flex outline-none items-center gap-2 py-1 px-3 border border-zinc-200 dark:border-zinc-700 rounded text-zinc-600 dark:text-zinc-300 dark:hover:brightness-125"
          >
            <MousePointer2 size={15} />
            {showCheckbox ? "Cancel Selection" : "Select Item"}
          </button>
          {showCheckbox && (
            <button
              onClick={onDeleteSelected}
              disabled={disableDelete}
              className={`text-[13px] flex outline-none items-center gap-2 py-1 px-3 border border-zinc-200 dark:border-zinc-700 rounded ${
                disableDelete
                  ? "opacity-50 cursor-not-allowed"
                  : "border-red-500 dark:border-none bg-red-50 text-red-600 dark:bg-white dark:text-zinc-800 font-semibold"
              }`}
            >
              <Delete size={15} />
              Delete Selected
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const Content = ({ showCheckbox, selectedBookmarks, onCheckboxChange }) => {
  const { bookmarks, loading } = useBookmarks();

  if (loading) {
    return (
      <p className="mt-10 text-center text-zinc-500">Loading bookmarks...</p>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="w-full p-5 mx-auto max-w-screen-lg relative min-h-[30vh] grid place-items-center">
        <div className="absolute w-[240px] h-[100px] bg-slate-400/60 rounded-full bottom-8 z-0 filter blur-[120px]" />
        <img
          src="https://cdn-icons-png.flaticon.com/128/18066/18066918.png"
          alt="bookmark"
          className="z-10 w-14 grayscale"
        />
        <p className="text-sm font-semibold text-center text-zinc-500 dark:text-zinc-400">
          You haven't bookmarked any topics yet.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-lg p-5 mx-auto space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard
          key={bookmark.id}
          bookmark={bookmark}
          showCheckbox={showCheckbox}
          isChecked={selectedBookmarks.includes(bookmark.id)}
          onCheckboxChange={onCheckboxChange}
        />
      ))}
    </div>
  );
};

const BookmarkCard = ({
  bookmark,
  showCheckbox,
  isChecked,
  onCheckboxChange,
}) => {
  return (
    <div className="relative flex items-start justify-start gap-5 p-5 bg-white border rounded shadow border-zinc-200 dark:bg-zinc-800/20 dark:border-zinc-800">
      <AnimatePresence>
        {showCheckbox && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="mt-[5px]"
          >
            <input
              type="checkbox"
              checked={isChecked}
              onChange={() => onCheckboxChange(bookmark.id)}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-col">
        <Link to={`/learn-js/${bookmark.link}`}>
          <h2 className="mb-2 text-xl font-semibold">{bookmark.topic}</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Subtopics: {bookmark.subTopics || "No subtopics available"}
          </p>
        </Link>
        {bookmark.link && (
          <Link
            to={`/learn-js/${bookmark.link}`}
            className="inline-block mt-6 text-sm font-bold text-green-600 dark:text-green-500 hover:underline"
          >
            Learn More
          </Link>
        )}
      </div>
    </div>
  );
};
