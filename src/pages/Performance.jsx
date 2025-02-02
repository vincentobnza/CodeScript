import React, { useEffect, useState } from "react";
import { ArrowBigLeftDash, Ellipsis } from "lucide-react";
import supabase from "@/config/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { CircularProgress } from "@nextui-org/react";

export default function Performance() {
  return (
    <div className="relative w-full max-w-screen-lg min-h-screen p-5 pb-10 mx-auto space-y-8">
      <Link
        to="/learn-js"
        className="absolute flex items-center gap-3 left-2 top-2 dark:hover:brightness-125"
      >
        <ArrowBigLeftDash size={18} />
        <p className="text-xs">Back</p>
      </Link>
      <Header />

      <Stats />
    </div>
  );
}

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-3">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl">My Progress</h1>
      </div>
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        View your current progress in CodeScript
      </p>
    </div>
  );
};

const Stats = () => {
  const [userDetails, setUserDetails] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        if (error) {
          console.log(error);
        } else {
          setUserDetails(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-5 mx-auto">
      <div className="relative flex flex-col items-center justify-center">
        <CircularProgress
          classNames={{
            svg: "w-60 h-60  drop-shadow-md",
            indicator: `${
              userDetails?.progress === 100
                ? "stroke-amber-400"
                : "stroke-green-600"
            }`,
            track: "stroke-zinc-50 dark:stroke-white/10 ",
            value: `text-lg md:text-3xl ${
              userDetails?.progress === 100
                ? "text-amber-600 dark:text-amber-400 font-bold"
                : "text-indigo-600 dark:text-white font-bold"
            }`,
          }}
          value={userDetails?.progress}
          strokeWidth={4}
          showValueLabel={true}
        />

        <div className="absolute w-[240px] h-[100px] bg-slate-400/60 rounded-full bottom-8 z-0 filter blur-[120px]" />
        <p className="mt-5 text-sm font-medium text-center">
          You have completed {userDetails?.progress}% of the course
        </p>

        <div className="w-full max-w-md p-5 mx-auto mt-8 text-green-700 bg-green-100 border border-green-200 dark:shadow-lg dark:text-green-400 dark:bg-green-700/10 dark:to-green-800 dark:border-green-700/30">
          <p className="text-sm font-medium">
            Gain progress by collecting coins poin, quizzes, and assessment in
            the course.
          </p>
        </div>
      </div>
    </div>
  );
};
