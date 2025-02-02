import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Trophy,
  LogOut,
  Layers3,
  MessageSquareDot,
  NotebookText,
  Palette,
} from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";

export default function AdminSidebar() {
  const [sidebarHeight, setSidebarHeight] = useState("100vh");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions here (e.g., clear session, cookies, etc.)
    navigate("/admin-login/9b74c9897bac770ffc029102a200c5de");
  };

  useEffect(() => {
    const updateHeight = () => {
      setSidebarHeight(`${window.innerHeight}px`);
    };
    window.addEventListener("resize", updateHeight);
    updateHeight();
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const navLinks = [
    {
      to: "dashboard",
      icon: <LayoutDashboard size={16} />,
      label: "Dashboard",
    },
    { to: "profiles", icon: <Users size={16} />, label: "User Profiles" },
    { to: "leaderboard", icon: <Trophy size={16} />, label: "Leaderboard" },
    {
      to: "students-quizzes",
      icon: <NotebookText size={16} />,
      label: "Quizzes",
    },
  ];

  const accountLinks = [
    { to: "assessments", icon: <Layers3 size={16} />, label: "Workspace" },
    {
      to: "/admin/feedbacks",
      icon: <MessageSquareDot size={16} />,
      label: "Feedbacks",
    },
    {
      to: "customization",
      icon: <Palette size={16} />,
      label: "Customization",
    },
  ];

  return (
    <aside
      className="fixed top-0 left-0 z-30 flex flex-col w-64 border-r bg-zinc-900 border-zinc-700 text-zinc-300"
      style={{ height: sidebarHeight }}
    >
      <div className="flex-shrink-0 p-5 text-center">
        <Link
          to="/admin"
          className="text-sm font-black text-center text-transparent bg-gradient-to-br from-zinc-500 to-zinc-500 dark:to-zinc-900 bg-clip-text font-Orbitron"
        >
          CodeScript Admin
        </Link>
      </div>

      <div className="flex-grow overflow-y-auto">
        <nav className="w-full p-5">
          <h1 className="text-xs text-zinc-400">Navigation</h1>
          <ul className="flex flex-col items-start p-1 mt-3 space-y-1">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  `relative flex items-center w-full gap-4 p-2 text-[13px] transition-colors duration-300 rounded ${
                    isActive
                      ? "border-l-2 border-green-500 bg-green-700 text-white"
                      : "text-zinc-300"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </ul>
        </nav>

        <nav className="w-full p-5 mt-1">
          <h1 className="text-xs text-zinc-400">System</h1>
          <ul className="flex flex-col items-start p-1 mt-3 space-y-1">
            {accountLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center w-full gap-4 p-2 text-[13px] transition-colors duration-300 rounded ${
                    isActive
                      ? "border-l-2 border-green-500 bg-green-700 text-white"
                      : "text-zinc-300"
                  }`
                }
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
          </ul>
        </nav>
      </div>

      <nav className="flex-shrink-0 w-full p-5 mt-auto">
        <h1 className="text-xs font-semibold text-zinc-400">System</h1>
        <div className="flex flex-col items-start p-1 mt-3 space-y-1">
          <button
            onClick={onOpen}
            className="flex items-center self-start gap-4 p-2 text-[13px] text-zinc-300"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="font-Balsamiq"
        radius="none"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Confirm Logout
              </ModalHeader>
              <ModalBody>
                <p>
                  Are you sure you want to logout? This action will end your
                  current session.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  className="font-semibold text-white bg-green-600"
                  radius="sm"
                  onPress={() => {
                    onClose();
                    handleLogout();
                  }}
                >
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </aside>
  );
}
