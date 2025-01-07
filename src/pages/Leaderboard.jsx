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
  Tooltip,
} from "@nextui-org/react";
import { CircularProgress } from "@nextui-org/react";
import supabase from "../config/supabaseClient";
import {
  Search,
  EyeOff,
  ArrowUpDown,
  Eye,
  Ban,
  ArrowUpRight,
  Zap,
  Trophy,
  Axe,
  Pickaxe,
  Award,
  Bug,
  BugPlay,
  Braces,
} from "lucide-react";
import { Link } from "react-router-dom";
import ProfileHeader from "../assets/profile header.png";
import Crown from "../assets/crown.png";

export default function Leaderboard() {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchLeaderboardStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("leaderboard_config")
          .select("status")
          .eq("id", 1)
          .single();

        if (error) throw error;
        setStatus(data.status);
      } catch (error) {
        console.log("Error fetching leaderboard status:", error);
      }
    };

    fetchLeaderboardStatus();
  }, []);
  return (
    <>
      <div className="pb-10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300">
        <Header status={status} />
        <ListBox />

        {status === "visible" ? (
          <Ranking />
        ) : (
          <>
            <div className="relative flex flex-col items-center justify-center w-full max-w-screen-md p-5 mx-auto mt-10 h-80">
              <div className="absolute w-[240px] h-[100px] bg-slate-600/60 rounded-full bottom-12 z-0 filter blur-[80px]" />
              <Ban size={50} className="mb-10" />
              <div className="flex items-center gap-2">
                <h1>Leaderboard Ranking is currently hidden for view</h1>
                <Link
                  to="/leaderboard/learn-more"
                  className="flex items-center gap-2 ml-2 text-green-500"
                >
                  Learn more
                  <ArrowUpRight size={15} className="text-green-500" />
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
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

  const RankList = [
    {
      name: "Beginner",
      icon: Axe,
      description:
        "Entry-level rank for new learners starting their JavaScript journey.",
      range: [0, 20],
    },
    {
      name: "Apprentice Programmer",
      icon: Pickaxe,
      description:
        "For students who are familiar with basic syntax and concepts.",
      range: [21, 40],
    },
    {
      name: "Code Explorer",
      icon: Search,
      description:
        "For learners actively exploring and applying JavaScript in various challenges.",
      range: [41, 60],
    },
    {
      name: "Debugging Expert",
      icon: Bug,
      description:
        "For those skilled in solving complex coding errors and challenges.",
      range: [61, 80],
    },
    {
      name: "CodeScript Master",
      icon: Trophy,
      description:
        "For learners who have mastered JavaScript and are ready to take on advanced challenges.",
      range: [81, 100],
    },
  ];

  return (
    <div className="grid w-full max-w-screen-lg gap-4 p-3 mx-auto md:grid-cols-3">
      <div className="relative flex flex-col w-full bg-white border rounded-lg dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
        <div
          className={`relative w-full h-32 rounded-tl-lg rounded-tr-lg bg-gradient-to-r from-green-500 to-emerald-500`}
        >
          <img
            src={userDetails?.avatar_url}
            alt="avatar"
            className="absolute z-10 object-cover rounded-full -bottom-8 md:-bottom-10 left-4 md:left-10 size-20"
          />
        </div>

        <div className="flex flex-col w-full gap-1">
          <div className="flex items-center gap-2 px-1 py-3 ml-20 md:ml-32">
            <h1 className="font-bold text-md">
              <span className="px-2 md:px-3 py-[4px] text-zinc-600 dark:text-zinc-400">
                {userDetails?.username}
              </span>
            </h1>

            <Tooltip
              content="Active"
              radius="none"
              showArrow
              className="font-Balsamiq"
            >
              <div className="flex items-center gap-1 p-1 text-xs font-bold text-green-300 border border-green-700 rounded-full bg-green-600/10">
                <Zap size={12} strokeWidth={2.5} />
              </div>
            </Tooltip>
          </div>
        </div>

        <div className="grid w-full grid-cols-2 mt-6 border-t border-zinc-200 dark:border-zinc-700">
          <div className="relative flex flex-col gap-3 p-3 overflow-hidden text-center border-r md:p-5 border-zinc-200 dark:border-zinc-700">
            <h1 className="text-xl font-bold text-amber-400 md:text-3xl">
              {userDetails?.current_points}
            </h1>
            <p className="text-[10px] md:text-[12px] text-zinc-500 dark:text-zinc-400 font-semibold">
              Total Points
            </p>
          </div>
          <div className="flex flex-col gap-3 p-3 text-center border-r md:p-5 border-zinc-200 dark:border-zinc-700">
            <h1 className="text-xl font-bold text-green-400 md:text-3xl">
              {userDetails?.rank}
            </h1>
            <p className="text-[10px] md:text-[12px] text-zinc-500 dark:text-zinc-400 font-semibold">
              Current Rank
            </p>
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
                : "stroke-green-500"
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
      <div className="relative flex flex-col items-start justify-start w-full p-4 space-y-4 overflow-hidden bg-white border rounded-lg md:p-9 md:space-y-6 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700">
        <div className="flex flex-col gap-2">
          {RankList.filter(
            (rank) =>
              userDetails?.progress >= rank.range[0] &&
              userDetails?.progress <= rank.range[1]
          ).map((rank, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-start w-full gap-2"
              >
                <div className="flex justify-between w-full">
                  <div className="flex items-center justify-center w-10 h-10 mb-4 border rounded-lg bg-amber-500/20 border-amber-500">
                    <rank.icon size={20} className="text-amber-300" />
                  </div>

                  <h1 className="text-xs font-semibold">
                    Level {userDetails?.progress} %
                  </h1>
                </div>
                <div className="flex flex-col gap-4 mb-8">
                  <h1 className="text-xl font-semibold text-zinc-600 dark:text-zinc-200">
                    {rank.name}
                  </h1>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {rank.description}
                  </p>
                </div>

                <Progress
                  value={userDetails?.progress}
                  color="warning"
                  size="md"
                  radius="none"
                />
              </div>
            );
          })}
        </div>
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
              className="flex items-center self-end h-8 gap-2 px-3 text-xs font-medium bg-transparent border rounded outline-none dark:bg-zinc-700/20 border-zinc-200 dark:border-zinc-600 hover:brightness-110"
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
                  className="self-end w-10 h-10 px-3 bg-transparent border border-gray-200 shadow md:w-auto dark:border-zinc-700 hover:border-zinc-300 dark:hover:border-zinc-600 focus:outline-none dark:shadow-none"
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
                  {/* <TableColumn className="hidden text-center md:table-cell">
                    Status
                  </TableColumn> */}
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
                                  ? "bg-gradient-to-br from-indigo-600 to-pink-500 text-white"
                                  : "bg-white dark:bg-zinc-800"
                              } grid place-items-center border ${
                                index === 0
                                  ? "border-violet-400"
                                  : "dark:border-zinc-700 border-zinc-300"
                              }`}
                            >
                              {index === 0 && (
                                <img
                                  src={Crown}
                                  alt="crown"
                                  className="w-8 md:w-12 absolute -left-3 md:-left-5 -top-5 md:-top-7 -rotate-[30deg]"
                                />
                              )}
                              <h1
                                className={`text-xs font-extrabold text-zinc-400 dark:text-white`}
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
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs font-medium text-center md:text-sm">
                            <div className="flex items-center justify-center gap-2 px-4 py-1 mx-auto">
                              <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-200">
                                {rankedUser.current_points}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="items-center justify-center hidden gap-2 text-xs font-medium text-center md:flex text-zinc-500 dark:text-zinc-400">
                            <CircularProgress
                              size="lg"
                              value={rankedUser?.progress || 0}
                              showValueLabel={true}
                              classNames={{
                                value: "text-[10px] font-semibold",
                              }}
                              maxValue={100}
                              radius="none"
                              color="warning"
                            />
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
