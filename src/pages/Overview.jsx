import React from "react";
import { motion } from "framer-motion";
import {
  PanelsTopLeft,
  Code,
  Users,
  Zap,
  BookOpen,
  BookCheck,
  Trophy,
} from "lucide-react";

export default function Overview() {
  return (
    <div className="w-full min-h-screen p-5 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 pb-10 ">
      <Header />
      <Features />
    </div>
  );
}

const Header = () => {
  return (
    <motion.div
      className="max-w-screen-md mx-auto space-y-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full space-y-1 border-b border-zinc-200 dark:border-zinc-800 pb-10">
        <div className="space-y-2">
          <motion.p
            className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Overview
          </motion.p>
          <motion.h1
            className="text-3xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            CodeScript: Master JavaScript Through Interactive Lessons
          </motion.h1>
        </div>
      </div>

      <motion.div
        className="mt-8 w-full p-6 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 dark:text-zinc-200 rounded-lg shadow-sm"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <div className="size-10 border border-zinc-200 dark:border-green-600 bg-white dark:bg-green-800/20 grid place-items-center rounded-full">
            <PanelsTopLeft
              size={20}
              className="text-green-600 dark:text-green-400"
            />
          </div>
          <h2 className="text-xl font-semibold">System Overview</h2>
        </div>
        <p className="text-sm leading-relaxed">
          Welcome to CodeScript, a cutting-edge Computer Assisted Instruction
          system designed to revolutionize JavaScript learning. Our platform
          combines state-of-the-art technology with proven pedagogical methods
          to create an engaging, organized, and interactive learning experience.
          Whether you're a beginner taking your first steps into programming or
          an experienced developer looking to refresh your skills, CodeScript
          provides the tools, support, and motivation you need to master
          JavaScript.
        </p>
      </motion.div>
    </motion.div>
  );
};

const Features = () => {
  const features = [
    {
      icon: BookCheck,
      title: "Structured Lessons and Modules",
      description:
        "Our lessons are well-designed and available in modules that are according to students’ learning curves. Each lesson introduces important programming concepts clear to the kids very progressively and breaks down tough topics into small pieces.",
      iconColor: "text-green-400",
    },
    {
      icon: Users,
      title: "Coding Assessments",
      description:
        "Coding tests are the core of the practical aspect of our platform. Rather than doing a typical quiz, these coding exercises let the students apply their theoretical knowledge in real coding",
      iconColor: "text-indigo-400",
    },
    {
      icon: Trophy,
      title: "Leaderboard ",
      description:
        "The platform's leaderboard feature will inspire the students to compete with each other. The leaderboard showcases the top scores and achievement of the learners which motivates them to do better. ",
      iconColor: "text-red-400",
    },
    {
      icon: BookOpen,
      title: "Certifications",
      description:
        "When students reach certain milestones that your CAI system has set out for them, they earn certifications. Our certificates are helpful for the students to demonstrate what they have learned in their studies..",
      iconColor: "text-amber-400",
    },
  ];

  return (
    <motion.div
      className="max-w-screen-md mx-auto mt-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-8">Key Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
            >
              <Icon
                size={100}
                className={`absolute -bottom-5 -right-5 ${feature.iconColor} opacity-20`}
              />
              <div className="flex flex-col gap-2 items-start space-y-3 mb-3">
                <div className={`${feature.iconColor}`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
