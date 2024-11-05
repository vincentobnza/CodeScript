import React from "react";
import { MessageCircleQuestion } from "lucide-react";
import { Link } from "react-router-dom";
export default function FeedbackIcon() {
  return (
    <>
      <Link
        to="/feedback"
        className="fixed z-50 grid text-green-500 transition duration-500 ease-linear border rounded-lg border-zinc-200 dark:border-zinc-700 bottom-3 right-3 size-12 bg-zinc-100 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 place-items-center hover:brightness-125"
      >
        <MessageCircleQuestion size={23} />
      </Link>
    </>
  );
}
