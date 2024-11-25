import React, { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Progress,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import supabase from "../config/supabaseClient";
import { Search, EyeOff, ArrowUpDown, Eye } from "lucide-react";
import ProfileHeader from "../assets/profile header.png";

export default function Leaderboard() {
  return (
    <div className="pb-10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
      <Header />
      <ListBox />
      <Ranking />
    </div>
  );
}

const Header = () => {
  return (
    <div className="w-full max-w-screen-lg p-3 mx-auto mb-6 md:mb-10">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-semibold md:text-3xl">Leaderboard</h1>
        <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
          View points and ranking of CodeScript Users.
        </p>
      </div>
    </div>
  );
};

const ListBox = () => {
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [rank, setRank] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Fetch all users and order them by points
        const { data: leaderboard, error } = await supabase
          .from("profiles")
          .select("*")
          .order("current_points", { ascending: false });

        if (error) throw error;

        // Find the current user's details
        const currentUser = leaderboard.find((u) => u.id === user.id);

        if (currentUser) {
          // Calculate rank based on position in sorted leaderboard
          const rank = leaderboard.findIndex((u) => u.id === user.id) + 1;
          setUserDetails({ ...currentUser, rank });
          setRank(rank);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    const insertRank = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .insert({
            rank: rank,
          })
          .eq("id", user.id);

        if (error) throw error;
      } catch (error) {
        console.log(error);
      }
    };

    insertRank();
  }, [user]);

  return (
    <div className="grid w-full max-w-screen-md gap-4 p-3 mx-auto md:grid-cols-2">
      <div className="relative flex flex-col w-full bg-white border rounded-lg dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
        <div
          className={`relative w-full h-28 rounded-tl-lg rounded-tr-lg bg-cover bg-center`}
          style={{ backgroundImage: `url(${ProfileHeader})` }}
        >
          <Avatar
            src={userDetails?.avatar_url}
            alt="avatar"
            className="absolute object-cover -bottom-8 md:-bottom-10 left-4 md:left-10"
            size="lg"
            isBordered
            color="secondary"
          />
        </div>

        <div className="flex flex-col w-full gap-2">
          <div className="flex flex-col gap-2 px-1 py-3 ml-20 md:ml-28">
            <h1 className="text-xs font-semibold">
              Username:{" "}
              <span className="px-2 md:px-3 py-[4px] ml-1 text-purple-600 dark:text-purple-300 bg-transparent dark:bg-purple-600/20 rounded border border-purple-700">
                {userDetails?.username}
              </span>
            </h1>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 mt-12 border-t border-zinc-200 dark:border-zinc-700">
          <div className="flex flex-col gap-2 p-3 text-center border-r md:p-5 border-zinc-200 dark:border-zinc-700">
            <p className="text-[10px] md:text-[11px] text-zinc-500 dark:text-zinc-200 font-semibold">
              Current Points
            </p>

            <h1 className="text-2xl font-bold text-orange-400 md:text-3xl">
              {userDetails?.current_points}
            </h1>
          </div>
          <div className="flex flex-col gap-2 p-3 text-center md:p-5">
            <p className="text-[10px] md:text-[11px] font-semibold text-zinc-500 dark:text-zinc-200">
              Rank
            </p>

            <h1 className="text-2xl font-bold md:text-3xl text-violet-600">
              {userDetails?.rank}
            </h1>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center w-full p-4 space-y-4 bg-white border rounded-lg md:p-5 md:space-y-6 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
        <div className="flex flex-col gap-2">
          <h1 className="text-sm font-semibold md:text-md text-zinc-800 dark:text-zinc-50">
            Your Progress
          </h1>
        </div>

        <CircularProgress
          classNames={{
            svg: "w-32 h-32 md:w-40 md:h-40 drop-shadow-md",
            indicator: `${
              userDetails?.progress === 100
                ? "stroke-amber-400"
                : "stroke-violet-600"
            }`,
            track: "stroke-zinc-300 dark:stroke-white/10 ",
            value: `text-lg md:text-xl ${
              userDetails?.progress === 100
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "text-indigo-600 dark:text-white font-bold"
            }`,
          }}
          value={
            userDetails?.progress > 100 || userDetails?.progress < 0
              ? 100
              : userDetails?.progress
          }
          strokeWidth={4}
          showValueLabel={true}
        />

        <p className="px-4 text-xs leading-snug text-center md:px-6">{`Your current progress in JavaScript is ${
          userDetails?.progress > 100 || userDetails?.progress < 0
            ? 100
            : userDetails?.progress
        }%, Keep up the great work!!`}</p>
      </div>
    </div>
  );
};

const Ranking = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHidden, setIsHidden] = useState(() => {
    const stored = localStorage.getItem("leaderboardHidden");
    return stored ? JSON.parse(stored) : false;
  });
  const [sortAscending, setSortAscending] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: usersData, error } = await supabase
        .from("profiles")
        .select("*")
        .order("current_points", { ascending: false });

      if (error) {
        console.error("Error fetching users:", error);
        return;
      }

      const updatedUsersData = usersData.map((user, index) => ({
        ...user,
        rank: index + 1,
      }));

      setUsers(updatedUsersData);
    };

    fetchUsers();
    const subscription = supabase
      .channel("public:profiles")
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "profiles",
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("leaderboardHidden", JSON.stringify(isHidden));
  }, [isHidden]);

  const toggleVisibility = async () => {
    if (user) {
      const newVisibility = isHidden ? "visible" : "hidden";
      const { error } = await supabase
        .from("profiles")
        .update({ identity: newVisibility })
        .eq("id", user.id);

      if (error) {
        console.error("Error updating visibility:", error);
        return;
      }
      setIsHidden(!isHidden);
    }
  };

  const filteredUsers = users.filter(
    (u) => u.identity === "visible" || (u.id === user.id && !isHidden)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortAscending
      ? a.current_points - b.current_points
      : b.current_points - a.current_points
  );

  const toggleSort = () => {
    setSortAscending(!sortAscending);
  };

  return (
    <div className="w-full max-w-screen-xl p-3 mx-auto space-y-4 md:space-y-6">
      <div className="min-h-[70vh] p-4 md:p-6 bg-white dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700 space-y-6 md:space-y-8">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between w-full gap-4 md:flex-row md:gap-0">
            <div className="flex flex-col gap-1">
              <h1 className="font-semibold text-zinc-800 dark:text-zinc-100">
                Global Ranking 💎
              </h1>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Aim for the top and stand on the global leaderboard
              </p>
            </div>

            <button
              onClick={toggleVisibility}
              className="flex items-center h-8 gap-2 px-3 text-xs font-medium bg-transparent border rounded outline-none dark:bg-zinc-700/20 border-zinc-200 dark:border-zinc-600 hover:brightness-110"
            >
              {isHidden ? (
                <Eye size={15} className="text-amber-500" />
              ) : (
                <EyeOff size={15} className="text-green-500" />
              )}
              {isHidden ? "Show Leaderboard" : "Hide Leaderboard"}
            </button>
          </div>
          {!isHidden && (
            <>
              <div className="flex flex-col items-center gap-2 mt-5 md:flex-row">
                <div className="relative w-full md:w-[400px]">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="w-full h-10 pl-10 pr-4 bg-transparent border border-gray-200 shadow outline-none dark:border-zinc-700 focus:outline-none dark:focus:outline-none hover:border-zinc-300 placeholder:text-sm dark:hover:border-zinc-700"
                    placeholder="Search user"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <button
                  onClick={toggleSort}
                  className="w-full h-10 px-3 bg-transparent border border-gray-200 shadow md:w-auto dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 focus:outline-none dark:shadow-none"
                  title={
                    sortAscending
                      ? "Sort Highest to Lowest"
                      : "Sort Lowest to Highest"
                  }
                >
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <Table
                aria-label="Global ranking table"
                className="mt-5"
                removeWrapper
                radius="none"
              >
                <TableHeader>
                  <TableColumn>Rank</TableColumn>
                  <TableColumn>Username</TableColumn>
                  <TableColumn className="text-center">Points</TableColumn>
                  <TableColumn className="hidden text-center md:table-cell">
                    Progress
                  </TableColumn>
                  <TableColumn className="hidden text-center md:table-cell">
                    Status
                  </TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No user is found"}>
                  {sortedUsers.map(
                    (rankedUser, index) =>
                      rankedUser.identity === "visible" && (
                        <TableRow key={rankedUser.id}>
                          <TableCell>
                            <div
                              className={`w-6 h-6 md:w-8 md:h-8 rounded-lg relative ${
                                index === 0
                                  ? "bg-orange-100 dark:bg-amber-800/20  shadow-yellow-900/60 animate-pulse"
                                  : "bg-zinc-200 dark:bg-zinc-800"
                              } grid place-items-center border ${
                                index === 0
                                  ? "border-amber-400"
                                  : "dark:border-zinc-700 border-zinc-300"
                              }`}
                            >
                              {index === 0 && (
                                <img
                                  src="https://cdn-icons-png.flaticon.com/128/707/707163.png"
                                  alt="crown"
                                  className="w-8 md:w-12 absolute -left-3 md:-left-5 -top-5 md:-top-7 -rotate-[30deg]"
                                />
                              )}
                              <h1
                                className={`text-xs font-extrabold ${
                                  index === 0
                                    ? "text-yellow-400"
                                    : "text-zinc-500 dark:text-white"
                                }`}
                              >
                                {rankedUser.rank}
                              </h1>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2 md:gap-6">
                              <Avatar
                                src={rankedUser.avatar_url}
                                alt={`${rankedUser.username}'s profile`}
                                size="md"
                                className="hidden md:inline-block"
                              />
                              <div className="flex flex-col gap-1">
                                <h1 className="text-xs font-semibold md:text-sm text-zinc-700 dark:text-zinc-200">
                                  {rankedUser.username}
                                </h1>
                                <p className="text-[10px] md:text-xs font-semibold text-zinc-500">
                                  User ID: {rankedUser.id.slice(0, 8)}...
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs font-medium text-center md:text-sm">
                            <div className="flex items-center justify-center gap-2 px-4 py-1 mx-auto">
                              <div className="border border-green-600 rounded-full bg-gradient-to-br from-green-300 to-emerald-600 bg-gr size-3 dark:border-green-200"></div>

                              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-200">
                                {rankedUser.current_points}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="items-center justify-center hidden gap-2 text-xs font-medium text-center md:flex text-zinc-500 dark:text-zinc-400">
                            <Progress
                              aria-label="Downloading..."
                              size="sm"
                              value={rankedUser?.progress || 0}
                              showValueLabel={true}
                              className="w-[100px]"
                              maxValue={100}
                              radius="none"
                              color="success"
                            />
                          </TableCell>
                          <TableCell className="text-xs font-bold text-center md:text-sm">
                            <div className="flex items-center justify-center gap-2 px-4 py-1 mx-auto">
                              <p
                                className={`text-sm ${
                                  rankedUser.status === "online"
                                    ? "text-green-500"
                                    : "text-zinc-500"
                                }`}
                              >
                                {rankedUser.status === "online"
                                  ? "Connected"
                                  : "Disconnected"}
                              </p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </>
          )}
          {isHidden && (
            <div className="h-[300px] grid place-items-center">
              <p className="mt-4 text-sm text-center text-zinc-500 dark:text-zinc-400">
                Your profile is currently hidden from the leaderboard. Click
                "Show on leaderboard" to make it visible again.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
