import { Outlet } from "react-router-dom";
import DynamicSidebar from "@/components/DynamicSidebar";
import LessonNavigation from "@/components/LessonNavigation";
import PointsCoin from "@/components/PointsCoin";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Undo2, Medal, Loader } from "lucide-react";
import { Progress } from "@nextui-org/react";
export default function ChaptersLayout() {
  return (
    <div className="flex mb-10">
      <PointsCoin />
      <DynamicSidebar />
      <div className="max-w-5xl px-4 mx-auto md:px-14 lg:px-16">
        <div className="w-full flex justify-between px-1 md:px-12 pb-6">
          <div className="flex">
            <Link
              to="/learn-js"
              className="flex items-center gap-2 px-4 py-2 text-xs rounded text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:hover:brightness-125"
            >
              <Undo2 size={13} />
              Return to Homepage
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-[6px] text-xs">
            <Link
              to="/certificate"
              className="flex items-center gap-2 px-3 py-2 border rounded border-zinc-200 dark:border-zinc-700 dark:hover:brightness-125"
            >
              My Certificate
              <Medal size={16} />
            </Link>
            <Link
              to="/performance"
              className="flex items-center gap-2 px-3 py-2 border rounded border-zinc-200 dark:border-zinc-700 dark:hover:brightness-125"
            >
              My Progress
              <Loader size={16} />
            </Link>
          </div>
        </div>

        <motion.main
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl px-4 mx-auto mt-8 md:px-14 lg:px-16"
        >
          <Outlet />
        </motion.main>
      </div>
      <LessonNavigation />
    </div>
  );
}
