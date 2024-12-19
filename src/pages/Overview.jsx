import React from "react";
import { BookOpen, Code, Trophy, Users, Zap } from "lucide-react";

const Overview = () => {
  return (
    <div className="min-h-screen bg-neutral-dark">
      {/* Hero Section */}
      <section className="px-6 py-10 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold text-zinc-800 dark:text-white md:text-5xl lg:text-6xl animate-fade-up">
            Master JavaScript Through Interactive Learning
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-zinc-700 dark:text-gray-400 animate-fade-in">
            A cutting-edge learning platform that combines modern technology
            with proven teaching methods to help you become a JavaScript expert.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-4 bg-neutral-dark/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center text-zinc-700 dark:text-white">
            Key Features
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 transition-transform duration-300 rounded-lg shadow-lg ${feature.color} hover:transform hover:scale-105`}
              >
                <div className="flex items-center justify-center w-12 h-12 mb-4 text-white rounded-full bg-transparent/10">
                  {feature.icon}
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="text-white">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="px-6 py-16">
        <div className="w-full max-w-screen-md mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center underline text-zinc-700 dark:text-white underline-offset-8">
            How It Works
          </h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-start p-8 bg-white border rounded-lg shadow-sm border-zinc-200 dark:bg-zinc-800 dark:border-zinc-700 bg-neutral-dark/80"
              >
                <div className="flex items-center justify-center w-8 h-8 mr-6 font-bold text-white bg-green-500 rounded-lg">
                  {index + 1}
                </div>
                <div>
                  <p className="mb-2 text-lg font-bold text-zinc-700 dark:text-white">
                    {step.title}
                  </p>
                  <p className="mt-1 text-gray-600 text-md dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Structured Learning Path",
    description:
      "Follow a carefully designed curriculum that takes you from basics to advanced concepts.",
    color: "bg-gradient-to-r from-indigo-500 to-blue-500",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Interactive Coding",
    description:
      "Practice with real-time code editors and instant feedback on your solutions.",
    color: "bg-gradient-to-r from-orange-500 to-amber-500",
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Achievement System",
    description:
      "Earn badges and certificates as you progress through the course material.",
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Community Learning",
    description:
      "Connect with fellow learners and share your knowledge and experiences.",
    color: "bg-gradient-to-r from-red-500 to-rose-500",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Quick Exercises",
    description:
      "Reinforce your learning with bite-sized coding challenges and quizzes.",
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

const steps = [
  {
    title: "Create Your Account",
    description: "Sign up and set up your learning profile in minutes.",
  },
  {
    title: "Choose Your Path",
    description: "Select on navigation bar the path you want to start.",
  },
  {
    title: "Complete Lessons",
    description: "Work through interactive lessons and coding exercises.",
  },

  {
    title: "Track Progress",
    description: "Monitor your advancement and earn achievements.",
  },
  {
    title: "Earn Rewards",
    description: "Get certificates as you achieve milestones.",
  },
  {
    title: "Practice & Review",
    description:
      "Strengthen your skills with additional exercises and reviews.",
  },
];

export default Overview;
