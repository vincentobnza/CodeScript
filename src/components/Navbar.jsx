import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdKeyboardCommandKey } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";
import { RxMoon, RxSun } from "react-icons/rx";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Tooltip,
} from "@nextui-org/react";
import {
  Search,
  User,
  Lock,
  ArrowUpRight,
  X,
  Menu,
  Laptop,
  RefreshCcw,
} from "lucide-react";
import NavbarQuickSearch from "./NavbarQuickSearch";
import { useDisclosure } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import supabase from "@/config/supabaseClient";

export default function Navbar() {
  const { theme, setTheme, isDarkMode } = useTheme();
  const { user, signOut } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [points, setPoints] = useState(0);
  const [refreshedPoints, setRefreshPoints] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleThemeChange = useCallback(
    (selectedTheme) => {
      document.documentElement.classList.add("disable-transitions");
      setTheme(selectedTheme);
      setTimeout(() => {
        document.documentElement.classList.remove("disable-transitions");
      }, 500);
    },
    [setTheme]
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const getCurrentThemeIcon = () => {
    if (theme === "system") {
      return isDarkMode ? <RxMoon size={22} /> : <RxSun size={22} />;
    }
    return theme === "dark" ? <RxMoon size={22} /> : <RxSun size={22} />;
  };

  // FETCH CURRENT POINTS IN SUPABASE

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user?.id)
          .single();

        if (error) throw error;
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();

    const channel = supabase
      .channel("realtime:profiles")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user?.id}`,
        },
        (payload) => {
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            current_points: payload.new.current_points,
          }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const handleRefresh = async () => {
    setRefreshPoints(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("current_points")
        .eq("id", user?.id)
        .single();

      if (error) throw error;
    } catch (error) {
      console.log("Error refreshing points", error);
    } finally {
      setTimeout(() => setRefreshPoints(false), 500);
    }
  };
  return (
    <div className="sticky top-0 z-50 grid w-full bg-white dark:border-b dark:bg-zinc-900/70 backdrop-blur-lg text-zinc-900 dark:text-zinc-300 place-items-center dark:border-zinc-800">
      <NavbarQuickSearch
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <div className="flex items-center justify-between w-full max-w-screen-xl p-4 mx-auto">
        <div
          className="grid w-10 h-8 duration-300 border rounded cursor-pointer md:hidden place-items-center bg-zinc-200 dark:bg-zinc-800/20 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 hover:opacity-80"
          onClick={toggleMobileMenu}
        >
          <Menu size={20} />
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        <div className="flex items-center">
          <div className="relative">
            <Link
              to="/"
              className="hidden text-lg font-black text-transparent md:flex bg-gradient-to-br from-green-500 to-green-600 dark:to-green-800 bg-clip-text font-Orbitron"
            >
              CodeScript
            </Link>
          </div>
          <Navs />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Tooltip
              radius="sm"
              showArrow
              placement="bottom"
              content={
                <div className="grid grid-cols-2 gap-4 p-5 pb-2 font-Jost">
                  <div className="flex flex-col items-center justify-center gap-3 mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <h1> Current Points</h1>
                    <h1 className="text-lg font-bold text-amber-500">
                      {userDetails?.current_points}
                    </h1>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-3 mb-3 text-xs text-zinc-500 dark:text-zinc-400">
                    <h1> Current Progress</h1>
                    <h1 className="text-lg font-bold text-indigo-500">
                      {userDetails?.progress} %
                    </h1>
                  </div>
                </div>
              }
            >
              <div className="flex items-center gap-2 px-4 py-1 border rounded-full border-zinc-100 dark:border-zinc-800">
                <div className="border border-green-600 rounded-full bg-gradient-to-br from-green-300 to-emerald-600 bg-gr size-3 dark:border-green-200"></div>

                <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-200">
                  {userDetails?.current_points}
                </p>
              </div>
            </Tooltip>
            <RefreshCcw
              onClick={handleRefresh}
              size={16}
              className={`cursor-pointer hover:text-green-400 transition-transform duration-500 ${
                refreshedPoints ? "rotate-180" : ""
              }`}
            />
          </div>

          <div
            onClick={onOpen}
            className="hidden md:flex relative w-[260px] cursor-pointer"
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-zinc-600 dark:text-zinc-400" size={14} />
            </div>
            <div className="flex items-center justify-start w-full py-2 pl-10 pr-4 bg-transparent border outline-none dark:bg-zinc-800/30 border-zinc-300 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Quick Search...
              </p>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3 pointer-events-none">
              <h1 className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Ctrl F
              </h1>
              <MdKeyboardCommandKey
                size={17}
                className="text-zinc-400 dark:text-zinc-800"
              />
            </div>
          </div>

          {user ? (
            <Dropdown placement="bottom-end" className="text-xs font-Jost">
              <DropdownTrigger>
                <div className="items-center gap-4">
                  <div className="grid overflow-hidden rounded-full cursor-pointer size-8 place-items-center">
                    <img
                      src={
                        user.user_metadata.avatar_url || "default_profile_url"
                      }
                      alt="default profile"
                      className="object-cover"
                    />
                  </div>
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="settings" href="/settings">
                  Settings
                </DropdownItem>
                <DropdownItem key="feedback" href="/feedback">
                  Feedback
                </DropdownItem>
                <DropdownItem
                  key="signout"
                  onClick={() => {
                    signOut();
                    setPoints(0);
                  }}
                >
                  Signout
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Tooltip
              offset={15}
              radius="none"
              showArrow={true}
              placement="bottom"
              content={
                <div className="w-[250px] p-5 pb-8 font-Jost">
                  <div className="grid mb-4 border rounded-lg size-8 place-items-center bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
                    <Lock size={15} />
                  </div>
                  <div className="mb-3 font-bold text-green-600 text-small dark:text-green-500">
                    Sign in your account
                  </div>
                  <div className="leading-snug text-tiny text-zinc-500 dark:text-zinc-400">
                    Sign in to access your CodeScript account.
                  </div>
                </div>
              }
            >
              <NavLink to="/login">
                <User size={24} className="text-zinc-600 dark:text-zinc-400" />
              </NavLink>
            </Tooltip>
          )}

          <Dropdown className="font-Jost">
            <DropdownTrigger>
              <div className="grid transition duration-500 ease-in-out rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:brightness-125 size-9 place-items-center">
                {getCurrentThemeIcon()}
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Theme selection"
              variant="flat"
              selectedKeys={[theme]}
              onSelectionChange={(keys) =>
                handleThemeChange(Array.from(keys)[0])
              }
              selectionMode="single"
            >
              <DropdownItem
                key="light"
                startContent={<RxSun size={18} className="mr-1" />}
              >
                Light
              </DropdownItem>
              <DropdownItem
                key="dark"
                startContent={<RxMoon size={18} className="mr-1" />}
              >
                Dark
              </DropdownItem>
              <DropdownItem
                key="system"
                startContent={<Laptop size={18} className="mr-1" />}
              >
                System
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

const Navs = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location]);

  const navLinks = [
    { to: "/learn", label: "Lessons" },
    { to: "/leaderboard", label: "Leaderboards" },
    { to: "/code-lab", label: "Code Lab" },
    { to: "/about-us", label: "About Us" },
    { to: "/overview", label: "Overview" },
  ];

  return (
    <nav className="items-center hidden ml-24 space-x-8 md:flex">
      {navLinks.map((link) => (
        <div className="relative">
          <NavLink
            key={link.to}
            to={link.to}
            className={`text-xs hover:brightness-125`}
          >
            {link.label}
          </NavLink>
        </div>
      ))}
    </nav>
  );
};

function MobileMenu({ isOpen, onClose }) {
  const menuRef = useRef(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { href: "/learn", label: "Lessons" },
    { href: "/code-lab", label: "Code Lab" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/about-us", label: "About Us" },
    { href: "/overview", label: "Overview" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleUser = () => {
    if (user) {
      signOut();
    } else {
      return navigate("/login");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white dark:bg-black/20 backdrop-blur-sm md:hidden"
        >
          <motion.div
            ref={menuRef}
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="w-full bg-white border-b dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
          >
            <div className="relative flex flex-col w-full h-full p-6">
              <div className="flex items-center justify-between">
                <Link
                  to="/"
                  className="text-xl font-semibold text-zinc-700 dark:text-zinc-200"
                >
                  CodeScript
                </Link>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="flex items-center justify-between py-3 text-base border-b text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-white group"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={18}
                      className="transition-opacity opacity-0 group-hover:opacity-100"
                    />
                  </Link>
                ))}
              </nav>

              <button
                onClick={handleUser}
                className="flex items-center justify-center w-full gap-2 px-4 py-3 mt-8 text-sm font-medium transition-colors border rounded-md text-zinc-700 dark:text-white border-zinc-200 dark:border-zinc-700 hover:bg-zinc-800"
              >
                {!user ? "Sign in" : "Sign out"}
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
