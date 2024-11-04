import React, { useState, useEffect, useRef } from "react";
import { Bell } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";
import supabase from "@/config/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminNavbar() {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    const channel = supabase
      .channel("new_feedback")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "user_feedback" },
        (payload) => {
          setNotifications((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const clearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const handleClickOutside = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target)
    ) {
      setShowNotifications(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-10 w-full bg-white border-b border-zinc-100">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-end h-[3.7rem] items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                className="relative p-2 text-gray-600 transition-colors duration-200 rounded-full hover:text-gray-800 hover:bg-gray-100"
                onClick={() => setShowNotifications(!showNotifications)}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    ref={notificationRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 w-64 mt-2 bg-white border rounded-md shadow-lg border-zinc-100"
                  >
                    <div className="py-2">
                      <h3 className="px-4 py-2 text-sm font-semibold text-gray-700">
                        Notifications
                      </h3>
                      {notifications.length === 0 ? (
                        <p className="px-4 py-2 text-sm text-gray-500">
                          No new notifications
                        </p>
                      ) : (
                        <>
                          {notifications.map((notification, index) => (
                            <div
                              key={index}
                              className="px-4 py-2 text-sm text-gray-700 truncate hover:bg-gray-100"
                            >
                              New feedback from {notification.email}
                            </div>
                          ))}
                          <button
                            onClick={clearNotifications}
                            className="w-full px-4 py-2 text-sm text-left text-blue-600 hover:bg-gray-100"
                          >
                            Clear all notifications
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-3">
              <div className="grid rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 place-items-center size-9">
                <h1 className="font-bold text-white text-md ">IM</h1>
              </div>
              <div className="flex flex-col">
                <h1 className="text-sm font-semibold">Instructor Mode</h1>
                <p className="text-xs text-zinc-400">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
