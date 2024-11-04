import React, { useState, useCallback, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { toPng } from "html-to-image";
import { Button, Card, Progress } from "@nextui-org/react";
import { Download, Medal, ThumbsUp } from "lucide-react";
import CertificateOfCompletion from "../assets/CertificateOfCompletion.png";
import CertificateOfExcellence from "../assets/CertificateOfExcellence.png";
import supabase from "../config/supabaseClient";
import { Tooltip } from "@nextui-org/react";

export default function Certificate() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("completion");
  const [isDownloading, setIsDownloading] = useState(false);
  const certificateRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (!user || !user.id) {
        console.log("User or user.id is not available");
        return;
      }

      console.log("Fetching points for user ID:", user.id);
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }

        console.log("Fetched data:", data);
        setCurrentUser(data);
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    };

    fetchUserPoints();
  }, [user]);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isProgressComplete = useCallback(() => {
    if (activeTab === "completion") {
      return (currentUser?.progress || 0) === 100;
    } else {
      return (currentUser?.current_points || 0) >= 1000;
    }
  }, [activeTab, currentUser]);

  const onDownload = useCallback(() => {
    if (certificateRef.current === null || !isProgressComplete()) {
      return;
    }

    setIsDownloading(true);
    // Get the actual dimensions of the certificate container
    const element = certificateRef.current;
    const width = element.offsetWidth * 4; // Multiply by 4 for higher resolution
    const height = element.offsetHeight * 4; // Multiply by 4 for higher resolution

    setTimeout(() => {
      toPng(certificateRef.current, { cacheBust: true })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${user?.user_metadata.name.toUpperCase()}-CERTIFICATE.png`;
          link.href = dataUrl;
          link.click();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsDownloading(false);
        });
    }, 100);
  }, [certificateRef, activeTab, isProgressComplete]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 pb-10">
      <h1 className="mb-8 text-4xl font-medium text-gray-800 dark:text-zinc-200">
        Your Certificates
      </h1>
      <div className="flex mb-6 space-x-2">
        <Tooltip
          offset={15}
          radius="none"
          showArrow={true}
          placement="bottom"
          content={
            <div className="w-[400px] p-5 pb-8 font-NotoSans">
              <div className="grid mb-3 border rounded-lg size-8 place-items-center bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 ">
                <Medal size={18} className="text-green-400" />
              </div>
              <div className="mb-3 font-bold text-small">
                Certificate of Completion
              </div>
              <div className="leading-snug text-tiny text-zinc-500 dark:text-zinc-400">
                Successfully complete all courses and achieve 100% mastery of
                the required skills to be eligible for this certificate.
              </div>
            </div>
          }
        >
          <Button
            radius="none"
            auto
            color={activeTab === "completion" ? "success" : "default"}
            onClick={() => setActiveTab("completion")}
            className="font-semibold"
          >
            Certificate of Completion
          </Button>
        </Tooltip>

        <Tooltip
          offset={15}
          radius="none"
          showArrow={true}
          placement="bottom"
          content={
            <div className="w-[400px] p-5 pb-8 font-NotoSans">
              <div className="grid mb-3 border rounded-lg size-8 place-items-center bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 ">
                <ThumbsUp size={18} className="text-amber-400" />
              </div>
              <div className="mb-3 font-bold text-small">
                Certificate of Excellence
              </div>
              <div className="leading-snug text-tiny text-zinc-500 dark:text-zinc-400">
                Accumulate points by completing quizzes, earning coin points to
                unlock this award.
              </div>
            </div>
          }
        >
          <Button
            radius="none"
            auto
            color={activeTab === "excellence" ? "warning" : "default"}
            onClick={() => setActiveTab("excellence")}
            className="font-semibold"
          >
            Certificate of Excellence
          </Button>
        </Tooltip>
      </div>
      <Card className="w-full max-w-3xl overflow-hidden" radius="none">
        <div className="relative">
          <motion.div
            ref={certificateRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full aspect-[1.414/1]"
          >
            <img
              src={
                activeTab === "completion"
                  ? CertificateOfCompletion
                  : CertificateOfExcellence
              }
              alt={`Certificate of ${
                activeTab === "completion" ? "Completion" : "Excellence"
              }`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-[500px]">
                <p className="mb-5 font-medium text-gray-900 font-Inter text-md">
                  {user.user_metadata.name.toUpperCase()}
                </p>
              </div>
              <div className="absolute left-0 w-full top-[380px]">
                <p className="text-xs font-semibold text-gray-600">
                  Awarded on {formattedDate}
                </p>
              </div>
            </div>
          </motion.div>
          <div
            className={
              isProgressComplete()
                ? "hidden"
                : "absolute inset-0 flex items-center justify-center bg-black bg-zinc-900/50 backdrop-blur"
            }
          >
            <div className="w-3/4 p-10 bg-white shadow-lg">
              <h3 className="mb-4 text-xl font-semibold text-center text-gray-800">
                {activeTab === "completion"
                  ? "Course Progress"
                  : "Excellence Points"}
              </h3>
              <Progress
                value={
                  activeTab === "completion"
                    ? currentUser?.progress
                    : Math.min((currentUser?.current_points || 0) / 10, 100)
                }
                color={activeTab === "completion" ? "success" : "warning"}
                className="mb-4"
              />
              <p className="text-sm font-bold text-center text-zinc-900">
                {activeTab === "completion"
                  ? `${currentUser?.progress}% completed`
                  : `${currentUser?.current_points || 0} / 1000 points`}
              </p>
            </div>
          </div>
        </div>
      </Card>
      <Button
        auto
        onClick={onDownload}
        disabled={isDownloading || !isProgressComplete()}
        className={`flex items-center gap-3 mt-8 font-bold text-black bg-white rounded ${
          isProgressComplete() ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        {isDownloading
          ? "Generating file..."
          : isProgressComplete()
          ? "Download Certificate"
          : "Complete progress to download"}
        <Download size={16} />
      </Button>
    </div>
  );
}
