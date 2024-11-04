import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./private/ProtectedRoute";

// AUTH
import Login from "./auth/Login";
import Signup from "./auth/Signup";

// PAGES
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Learn from "./pages/Learn";
import Developers from "./pages/Developers";
import CodeEditor from "./pages/CodeEditor";
import CodeEditor_LandingPage from "./pages/CodeEditor_LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Learn_LandingPage from "./pages/Learn_LandingPage";
import Quiz from "./pages/Quiz";
import Settings from "./pages/Settings";
import Certificate from "./pages/Certificate";
import Feedback from "./pages/Feedback";

// LAYOUT
import RootLayout from "./layout/RootLayout";
import ChaptersLayout from "./layout/ChaptersLayout";
import AdminLayout from "./layout/AdminLayout";

// ADMIN PAGES
import Dashboard from "./admin/Dashboard";
import AdminLogin from "./admin/AdminLogin";
import UserProfiles from "./admin/UserProfiles";
import AdminLeaderboard from "./admin/AdminLeaderboard";
import AdminAssessments from "./admin/AdminAssessments";
import Feedbacks from "./admin/Feedbacks";
import { AdminProvider } from "./context/AdminContext";
import AdminQuizzes from "./admin/AdminQuizzes";

// LESSONS
import Lesson1_Topic1 from "./content/Lesson1/Lesson1.1";
import Lesson1_Topic2 from "./content/Lesson1/Lesson1.2";
import Lesson1_Topic3 from "./content/Lesson1/Lesson1.3";

import Lesson2_Topic1 from "./content/Lesson2/Lesson2.1";
import Lesson2_Topic2 from "./content/Lesson2/Lesson2.2";
import Lesson2_Topic3 from "./content/Lesson2/Lesson2.3";

import Lesson3_Topic1 from "./content/Lesson3/Lesson3.1";
import Lesson3_Topic2 from "./content/Lesson3/Lesson3.2";
import Lesson3_Topic3 from "./content/Lesson3/Lesson3.3";
import Lesson3_Topic4 from "./content/Lesson3/Lesson3.4";

import Lesson4_Topic1 from "./content/Lesson4/Lesson4.1";
import Lesson4_Topic2 from "./content/Lesson4/Lesson4.2";
import Lesson4_Topic3 from "./content/Lesson4/Lesson4.3";

import Lesson5_Topic1 from "./content/Lesson5/Lesson5.1";
import Lesson5_Topic2 from "./content/Lesson5/Lesson5.2";

import Lesson6_Topic1 from "./content/Lesson6/Lesson6.1";
import Lesson6_Topic2 from "./content/Lesson6/Lesson6.2";
import Lesson6_Topic3 from "./content/Lesson6/Lesson6.3";

import Lesson7_Topic1 from "./content/Lesson7/Lesson7.1";
import Lesson7_Topic2 from "./content/Lesson7/Lesson7.2";

import Lesson8_Topic1 from "./content/Lesson8/Lesson8.1";
import Lesson8_Topic2 from "./content/Lesson8/Lesson8.2";
import Lesson8_Topic3 from "./content/Lesson8/Lesson8.3";

// PROVIDER
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { UserProvider } from "./context/UserContext";

import LivePreview from "./pages/LivePreview";
import CreateProfile from "./pages/CreateProfile";

// LOADER
import LoadingPageWithNavigation from "./components/PageLoading";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "leaderboard",
        element: (
          // <ProtectedRoute>
          <Leaderboard />
          // </ProtectedRoute>
        ),
      },
      {
        path: "code-lab",
        element: <CodeEditor_LandingPage />,
      },

      {
        path: "/learn",
        element: <Learn_LandingPage />,
      },
      {
        path: "about-us",
        element: <Developers />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "certificate",
        element: (
          <ProtectedRoute>
            <Certificate />
          </ProtectedRoute>
        ),
      },
      {
        path: "learn-js",
        element: <Learn />,
      },

      {
        path: "learn-js",
        element: <ChaptersLayout />,
        children: [
          {
            path: "intro",
            element: <Lesson1_Topic1 />,
          },
          {
            path: "development-environment",
            element: <Lesson1_Topic2 />,
          },
          {
            path: "adding-javascript-to-page",
            element: <Lesson1_Topic3 />,
          },
          {
            path: "variables-data-types",
            element: <Lesson2_Topic1 />,
          },
          {
            path: "operators",
            element: <Lesson2_Topic2 />,
          },
          {
            path: "comments-code-structure",
            element: <Lesson2_Topic3 />,
          },
          {
            path: "conditionals",
            element: <Lesson3_Topic1 />,
          },
          {
            path: "switch-statements",
            element: <Lesson3_Topic2 />,
          },
          {
            path: "loops",
            element: <Lesson3_Topic3 />,
          },
          {
            path: "break-statements",
            element: <Lesson3_Topic4 />,
          },
          {
            path: "functions",
            element: <Lesson4_Topic1 />,
          },
          {
            path: "parameters-return-values",
            element: <Lesson4_Topic2 />,
          },
          {
            path: "arrow-functions",
            element: <Lesson4_Topic3 />,
          },
          {
            path: "objects-properties-methods",
            element: <Lesson5_Topic1 />,
          },
          {
            path: "array-array-methods",
            element: <Lesson5_Topic2 />,
          },
          {
            path: "dom",
            element: <Lesson6_Topic1 />,
          },
          {
            path: "dom-elements",
            element: <Lesson6_Topic2 />,
          },
          {
            path: "event-listeners-handling-events",
            element: <Lesson6_Topic3 />,
          },
          {
            path: "event-types",
            element: <Lesson7_Topic1 />,
          },
          {
            path: "event-bubbling-capturing",
            element: <Lesson7_Topic2 />,
          },
          {
            path: "try-catch-finally",
            element: <Lesson8_Topic1 />,
          },
          {
            path: "throwing-errors",
            element: <Lesson8_Topic2 />,
          },
          {
            path: "custom-errors",
            element: <Lesson8_Topic3 />,
          },
        ],
      },
    ],
  },
  {
    path: "code-editor",
    element: <CodeEditor />,
  },
  {
    path: "feedback",
    element: <Feedback />,
  },
  {
    path: "create-profile",
    element: <CreateProfile />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/admin",
    element: (
      <AdminProvider>
        <AdminLayout />
      </AdminProvider>
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "profiles",
        element: <UserProfiles />,
      },
      {
        path: "leaderboard",
        element: <AdminLeaderboard />,
      },
      {
        path: "assessments",
        element: <AdminAssessments />,
      },
      {
        path: "feedbacks",
        element: <Feedbacks />,
      },
      {
        path: "users-quizzes",
        element: <AdminQuizzes />,
      },
    ],
  },

  {
    path: "admin-login",
    element: (
      <AdminProvider>
        <AdminLogin />
      </AdminProvider>
    ),
  },

  // QUIZ
  {
    path: "/quiz/:quizType",
    element: (
      <ThemeProvider>
        <ProtectedRoute>
          <Quiz />
        </ProtectedRoute>
      </ThemeProvider>
    ),
  },

  {
    path: "/code-editor/live-preview",
    element: <LivePreview />,
  },

  {
    path: "/code-lab/loader=true",
    element: <LoadingPageWithNavigation />,
  },
]);

export default function App() {
  return (
    <div className="font-sans App text-zinc-900 dark:text-zinc-300">
      <AuthProvider>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </AuthProvider>
    </div>
  );
}
