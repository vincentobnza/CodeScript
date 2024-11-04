import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import framer-motion
import { MdOutlineLeaderboard, MdKeyboardCommandKey } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoIosTrendingUp } from "react-icons/io";
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
import { Search, User, Lock, ArrowUpRight } from "lucide-react";
import NavbarQuickSearch from "./NavbarQuickSearch";
import { useDisclosure } from "@nextui-org/react";
import { Menu } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [mobile, setIsMobile] = useState(false);
  const location = useLocation();


  const toggleTheme = () => {
    document.documentElement.classList.add("disable-transitions");
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileMenu = () => {
    setIsMobile(!mobile);
  };

  useEffect(() => {
    setIsMobile(false);
  }, [location]);

  return (
    <div className="sticky top-0 z-50 grid w-full border-b bg-white/20 dark:bg-zinc-900/70 backdrop-blur-lg text-zinc-900 dark:text-zinc-300 place-items-center border-zinc-100 dark:border-zinc-800">
      <NavbarQuickSearch
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <div className="flex items-center justify-between w-full max-w-screen-xl p-4 mx-auto">
        {/* Mobile Menu Toggle Button */}
        <div
          className="grid duration-300 border rounded cursor-pointer md:hidden place-items-center bg-zinc-200 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 hover:opacity-80 size-8"
          onClick={toggleMobileMenu}
        >
          <Menu size={20} />
        </div>

        <MobileMenu mobile={mobile} setIsMobile={setIsMobile} />

        {/* Desktop Links */}
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
          <div
            onClick={onOpen}
            className="hidden md:flex relative w-[260px] cursor-pointer"
          >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="text-gray-400 size-4" />
            </div>
            <div className="flex items-center justify-start w-full py-2 pl-10 pr-4 bg-transparent border outline-none bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600">
              <p className="text-xs">Quick Search...</p>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-3 pointer-events-none">
              <h1 className="text-xs font-semibold">Ctrl F</h1>
              <MdKeyboardCommandKey
                size={17}
                className="text-zinc-400 dark:text-zinc-500"
              />
            </div>
          </div>

          {user ? (
            <Dropdown placement="bottom-end" className="font-sans text-xs">
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
                <DropdownItem key="signout" onClick={() => signOut()}>
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
                <div className="w-[250px] p-5 pb-8 font-NotoSans">
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

          <div
            className="grid transition duration-500 ease-in-out rounded-lg cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:brightness-125 size-9 place-items-center"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <RxMoon size={22} /> : <RxSun size={22} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const Navs = () => {
  return (
    <nav className="items-center hidden ml-24 space-x-8 md:flex">
      <NavLink to="learn" className="text-[12px] hover:brightness-125">
        Learn JS
      </NavLink>
      <NavLink
        to="leaderboard"
        className="relative gap-2 text-[12px] hover:brightness-125"
      >
        Leaderboards
        <MdOutlineLeaderboard
          size={12}
          className="absolute top-0 -right-5 animate-pulse"
        />
      </NavLink>
      <NavLink to="code-lab" className="text-[12px] hover:brightness-125">
        Code Lab
      </NavLink>
      <NavLink
        to="/about-us"
        className="relative text-[12px] hover:brightness-125 duration-300"
      >
        About Us
      </NavLink>
    </nav>
  );
};

const MobileMenu = ({ mobile, setIsMobile }) => {
  const menuRef = useRef(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const navLinks = [
    { to: "learn", label: "Learn JS" },
    { to: "leaderboard", label: "Leaderboards" },
    { to: "code-lab", label: "Code Lab" },
    { to: "about-us", label: "About Us" },
  ];

  const handleUser = () => {
    if (user) {
      signOut();
    } else {
      return navigate("/login");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobile(false);
      }
    };

    if (mobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobile, setIsMobile]);

  const variants = {
    open: { y: 0 },
    closed: { y: "-100%" },
  };

  return (
    <>
      <AnimatePresence>
        {mobile && (
          <div className="fixed top-0 left-0 z-10 flex w-full h-screen md:hidden bg-zinc-900/50 backdrop-blur-lg">
            <motion.div
              ref={menuRef}
              className="relative top-0 left-0 z-50 w-full h-[60%] p-8  bg-zinc-50 dark:bg-zinc-900 border-zinc-200 md:hidden border-b  dark:border-zinc-700"
              initial="closed"
              animate={mobile ? "open" : "closed"}
              exit="closed"
              variants={variants}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <Link
                to="/"
                className="text-lg font-black text-transparent bg-gradient-to-br from-green-500 to-green-600 dark:to-green-800 bg-clip-text font-Orbitron"
              >
                CodeScript
              </Link>
              <nav className="flex flex-col justify-start gap-2 mt-10 space-y-4 items-left">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="flex items-center gap-3 duration-300 text-md hover:text-green-500"
                  >
                    {link.label}

                    <ArrowUpRight size={15} />
                  </NavLink>
                ))}
              </nav>

              <div className="w-full mt-10">
                <button
                  onClick={handleUser}
                  className="w-full px-4 py-3 text-xs font-semibold border rounded border-zinc-200 dark:border-zinc-700"
                >
                  {user ? "Sign Out" : "Sign In"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
