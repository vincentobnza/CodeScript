import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="relative grid w-full gap-2 p-4 border-t place-items-center bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 f text-zinc-700 dark:text-zinc-200">
      <footer>
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center justify-between items-center text-center">
          <span class="text-xs md:text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link to="/" class="hover:underline">
              CodeScript™
            </Link>
            . All Rights Reserved.
          </span>
          <ul class="ml-8 flex flex-wrap items-center mt-3 text-xs md:text-sm  text-zinc-400 dark:text-gray-400 sm:mt-0 text-center">
            <li>
              <a href="/privacy-policy" class="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/about-us" class="hover:underline me-4 md:me-6">
                Developers
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
