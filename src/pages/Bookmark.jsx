import React from "react";
import { Undo2, Trash } from "lucide-react";
import { useBookmarks } from "../hooks/useBookmark";
import { Link } from "react-router-dom";

export default function Bookmark() {
  return (
    <div className="w-full min-h-screen space-y-6">
      <Header />
      <Content />
    </div>
  );
}

const Header = () => {
  return (
    <div className="flex flex-col w-full max-w-screen-lg gap-2 p-5 mx-auto">
      <Link to="/learn-js" className="flex items-center gap-3 text-xs">
        <Undo2 size={14} />
        Return to Homepage
      </Link>
      <h1 className="mt-8 text-3xl font-semibold">Bookmark Topics</h1>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Topics you've bookmarked
      </p>
    </div>
  );
};

const Content = () => {
  const { bookmarks, loading } = useBookmarks();

  if (loading) {
    return <p className="text-center text-zinc-500">Loading bookmarks...</p>;
  }

  if (bookmarks.length === 0) {
    return (
      <p className="text-center text-zinc-500">
        You haven't bookmarked any topics yet.
      </p>
    );
  }

  return (
    <div className="w-full max-w-screen-lg p-5 mx-auto space-y-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark.id} bookmark={bookmark} />
      ))}
    </div>
  );
};

const BookmarkCard = ({ bookmark }) => {
  const { toggleBookmark } = useBookmarks();
  const handleRemoveBookmark = () => {
    toggleBookmark(bookmark.topic, bookmark.subTopics, bookmark.link);
  };
  return (
    <div className="relative p-5 bg-white border rounded shadow border-zinc-200 dark:bg-zinc-800/20 dark:border-zinc-800">
      <button
        onClick={handleRemoveBookmark}
        className="absolute px-3 py-1 text-xs font-semibold bg-white border rounded border-zinc-200 dark:border-zinc-700 text-zinc-500 top-3 right-3 dark:hover:brightness-125 dark:bg-zinc-700/30"
      >
        Remove
      </button>

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
  );
};
