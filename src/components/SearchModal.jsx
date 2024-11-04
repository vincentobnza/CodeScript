import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { Search, ArrowUpRight, Clock, X } from "lucide-react";
import { QuickSearchData } from "./QuickSearch";
import { Link } from "react-router-dom";
import { Kbd } from "@nextui-org/react";
export default function SearchModal({ isOpen, onOpen, onOpenChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const storedSearches = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedSearches);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = QuickSearchData.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const addToRecentSearches = (result) => {
    const updatedSearches = [
      result,
      ...recentSearches.filter((s) => s.name !== result.name),
    ].slice(0, MAX_RECENT_SEARCHES);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const removeRecentSearch = (name) => {
    const updatedSearches = recentSearches.filter((s) => s.name !== name);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleResultClick = (result) => {
    addToRecentSearches(result);
    onOpen(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();

        onOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <>
      <Modal
        isOpen={isOpen}
        className="font-Inter"
        radius="none"
        onOpenChange={onOpenChange}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <div className="w-full max-w-lg dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 border dark:border-zinc-700 bg-zinc-50 flex justify-center flex-col relative">
                <Kbd className="absolute top-2 right-2 text-xs font-bold text-zinc-500 border border-zinc-200 dark:border-zinc-600 dark:text-zinc-400">
                  ESC
                </Kbd>
                <div className="w-full h-14 border-b border-zinc-200 dark:border-zinc-700 grid place-items-center px-2">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search className="size-4 text-gray-400" />
                    </div>
                    <input
                      autoFocus={true}
                      type="text"
                      className="w-full pl-10 pr-4 py-2 bg-transparent rounded-md outline-none"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                </div>

                <div
                  className="max-h-64 overflow-y-auto py-2 px-4"
                  style={{
                    scrollbarWidth: "thin",
                  }}
                >
                  {searchResults.length > 0 ? (
                    <ul
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="divide-y divide-zinc-200 dark:divide-zinc-700"
                    >
                      {searchResults.map((result, index) => (
                        <li
                          key={index}
                          className="p-4 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <Link
                            to={result.link}
                            className="w-full flex justify-between items-center"
                            onClick={() => handleResultClick(result)}
                          >
                            <div className="flex flex-col gap-2">
                              <h3 className="text-xs font-medium text-zinc-500 dark:text-zinc-500">
                                {result.name}
                              </h3>
                              <h1 className="text-sm text-zinc-800 dark:text-zinc-100">
                                {result.description}
                              </h1>
                            </div>
                            <ArrowUpRight size={16} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : searchTerm ? (
                    <div className="grid place-items-center p-8">
                      <div className="flex flex-col gap-2 text-center">
                        <h1 className="text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                          No results for{" "}
                          <span className="text-zinc-800 dark:text-orange-500">
                            "{searchTerm}"
                          </span>
                        </h1>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Try something else
                        </p>
                      </div>
                    </div>
                  ) : recentSearches.length > 0 ? (
                    <div className="p-4">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <h1 className="text-md font-semibold text-zinc-800 dark:text-zinc-300">
                          Recent Searches
                        </h1>
                      </div>
                      <ul className="space-y-2 divide-zinc-200 dark:divide-zinc-700">
                        {recentSearches.map((search, index) => (
                          <li
                            key={index}
                            className="mt-5 flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 hover:opacity-90 rounded"
                          >
                            <button
                              className="flex flex-col items-start text-sm text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100"
                              onClick={() => setSearchTerm(search.name)}
                            >
                              <span className="font-medium mb-2">
                                {search.name}
                              </span>
                              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {search.description}
                              </span>
                            </button>
                            <button
                              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                              onClick={() => removeRecentSearch(search.name)}
                            >
                              <X className="size-4" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="grid place-items-center p-8">
                      <p>No Recent Searches</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
