import { Outlet } from "react-router-dom";
import DynamicSidebar from "@/components/DynamicSidebar";
import LessonNavigation from "@/components/LessonNavigation";
import PointsCoin from "@/components/PointsCoin";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Undo2 } from "lucide-react";
export default function ChaptersLayout() {
  return (
    <div className="flex mb-10">
      <PointsCoin />
      <DynamicSidebar />
      <div className="flex-1 ml-0 space-y-8 md:mx-64">
        <div className="flex justify-between px-4 md:px-12">
          <div className="flex">
            <Link
              to="/learn-js"
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:hover:brightness-125"
            >
              <Undo2 size={13} />
              Return to Homepage
            </Link>
          </div>
          <div className="flex items-center gap-[6px] text-xs font-semibold">
            <Link
              to="/certificate"
              className="px-4 py-2 border rounded border-zinc-200 dark:border-zinc-800 dark:hover:brightness-125"
            >
              My Certificate 🏅
            </Link>
            <Link
              to="/leaderboard"
              className="px-4 py-2 border rounded border-zinc-200 dark:border-zinc-800 dark:hover:brightness-125"
            >
              My Progress ⏳
            </Link>
          </div>
        </div>
        <motion.main
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl px-4 mx-auto md:px-14 lg:px-16"
        >
          <Outlet />
        </motion.main>
      </div>
      <LessonNavigation />
    </div>
  );
}
