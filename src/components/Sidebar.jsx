import React, { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { FaBook, FaCode, FaLightbulb } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Sidebar({ navItems, onNavigate }) {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed top-20 left-5  h-screen ${
        isOpen ? "w-64" : "w-16"
      } bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 transition-all duration-300 ease-in-out`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        {isOpen ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
      </button>

      <div className="mt-16 p-4">
        {isOpen && <h2 className="text-xl font-bold mb-4">Chapters</h2>}
        <nav>
          <ul>
            {navItems.map((item) => (
              <li key={item.id} className="mb-2"></li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
