import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/AdminSidebar";
import AdminNavbar from "@/components/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="flex flex-col w-full font-sans bg-white text-zinc-700">
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
