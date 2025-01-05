import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { to: "/privacy-policy", label: "Privacy Policy" },
    { to: "/about-us", label: "Developers" },
  ];

  // MAKE THE DATE OF THE FOOTER DYNAMIC WHEN THE YEAR CHANGES
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative grid w-full gap-2 p-4 bg-white border-t place-items-center dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 f text-zinc-700 dark:text-zinc-200">
      <footer>
        <div className="items-center justify-between w-full max-w-screen-xl p-4 mx-auto text-center md:flex md:items-center">
          <span className="text-xs md:text-sm text-zinc-700 sm:text-center dark:text-zinc-400">
            © {currentYear}{" "}
            <Link to="/" className="hover:underline">
              CodeScript ™
            </Link>
            . All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 ml-8 text-xs text-center md:text-sm text-zinc-600 dark:text-gray-400 sm:mt-0">
            {links.map((link, index) => (
              <li key={index}>
                <Link to={link.to} className="hover:underline me-4 md:me-6">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
