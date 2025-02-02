import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";
import { Toaster } from "react-hot-toast";

export default function AdminLayout() {
  useEffect(() => {
    document.title = "CodeScript - Instructor";
  });
  return (
    <div className="flex flex-col w-full bg-white font-Balsamiq text-zinc-700">
      <Toaster />
      <AdminNavbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 ml-64 overflow-x-hidden overflow-y-auto bg-white mt-[3.8rem] text-zinc-800 py-5 px-12">
          <div className="pb-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
