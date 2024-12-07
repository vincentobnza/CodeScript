import { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import { toast, Toaster } from "react-hot-toast";
import { Columns2, ArrowUpRight, ImageDown } from "lucide-react";
import { Tooltip } from "@nextui-org/react";
import { Link } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import CertificateOfCompletion from "../assets/CertificateOfCompletion.png";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-800">Customization</h1>
        <p className="text-sm text-gray-600">
          Customize the system settings to fit your preferences.
        </p>
      </div>
    </div>
  );
};

const GeneralTab = () => {
  const [isChecked, setIsChecked] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchLeaderboardStatus = async () => {
      try {
        const { data, error } = await supabase
          .from("leaderboard_config")
          .select("status")
          .eq("id", 1)
          .single();

        if (error) throw error;

        setIsChecked(data?.status === "visible");
      } catch (err) {
        toast.error("Error fetching leaderboard status");
      }
    };

    fetchLeaderboardStatus();
  }, []);

  const handleCheckboxChange = () => {
    if (isChecked) {
      onOpen(); // Open modal for confirmation when turning off
    } else {
      // Enable leaderboard directly
      const updateStatus = async () => {
        try {
          const { error } = await supabase
            .from("leaderboard_config")
            .update({ status: "visible" })
            .eq("id", 1);

          if (error) throw error;

          toast.success("Leaderboard enabled successfully", {
            style: {
              fontSize: "13px",
              fontWeight: "500",
            },
          });
          setIsChecked(true);
        } catch (err) {
          toast.error("Error enabling leaderboard");
        }
      };

      updateStatus();
    }
  };

  return (
    <div className="p-3 mt-8 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-gray-800">
          General Settings
        </h2>
        <p className="mb-8 text-sm text-gray-600">
          Configure your general settings here.
        </p>
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="leaderboardVisibility"
              className="font-medium text-zinc-800 text-md"
            >
              Change Theme
            </label>
            <p className="text-sm text-zinc-500">
              Select a theme for the dashboard and other pages.
            </p>
          </div>
          <select
            id="theme"
            name="theme"
            className="h-10 px-3 text-sm border border-gray-300 rounded-md appearance-none cursor-pointer w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light Theme</option>
            <option value="dark">Dark Theme</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="leaderboardVisibility"
              className="font-medium text-zinc-800 text-md"
            >
              Leaderboard Visibility
            </label>
            <p className="text-sm text-zinc-500">
              Turn off this feature to hide the leaderboard from users.
            </p>
          </div>
          <div className="flex flex-col items-end gap-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                id="leaderboardVisibility"
                name="leaderboardVisibility"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
            </label>

            <div className="flex items-center gap-2">
              <div
                className={`size-2 ${
                  isChecked ? "bg-green-400" : "bg-gray-400"
                } rounded-full animate-pulse-slow`}
              ></div>
              <p className="text-xs text-zinc-400">
                {isChecked ? "Visible for users" : "Hidden from users"}
              </p>
            </div>
          </div>

          <LeaderboardToggleModal
            isOpen={isOpen}
            onClose={onClose}
            setIsChecked={setIsChecked}
          />
        </div>
      </div>
    </div>
  );
};

const QuizTab = () => {
  const [quizSettings, setQuizSettings] = useState({
    timerMinutes: 3,
    randomizeQuestions: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchQuizSettings() {
      try {
        const { data, error } = await supabase
          .from("quiz_config")
          .select("*")
          .eq("id", 1)
          .single();

        if (error) throw error;

        setQuizSettings({
          timerMinutes: data?.time || 3, // Default to 3 if data is missing
          randomizeQuestions: data?.randomize || true, // Default to true if data is missing
        });
      } catch (error) {
        console.error("Error fetching quiz settings:", error);
      }
    }

    fetchQuizSettings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("quiz_config")
        .update({
          time: quizSettings.timerMinutes, // Save timer in minutes
          randomize: quizSettings.randomizeQuestions, // Save randomize as true/false
        })
        .eq("id", 1);

      if (error) throw error;

      toast.success("Settings saved successfully", {
        style: {
          fontSize: "13px",
          fontWeight: "500",
        },
      });
    } catch (error) {
      console.error("Error saving quiz settings:", error);
      toast.error("Error saving your quiz configuration", {
        style: {
          fontSize: "13px",
          fontWeight: "500",
        },
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-3 mt-8 bg-white rounded-lg shadow-sm">
      <Toaster /> {/* Toast component here, should be inside the main layout */}
      <div className="flex items-start justify-between w-full">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-800">Quiz Settings</h2>
          <p className="mb-8 text-sm text-gray-600">
            Configure your quiz parameters to customize the experience.
          </p>
        </div>

        <button
          onClick={() => {
            setQuizSettings({
              timerMinutes: 3,
              randomizeQuestions: true,
            });
          }}
          className="px-3 py-2 text-xs font-semibold border rounded text-zinc-700 border-zinc-300 hover:opacity-70"
        >
          Reset to default
        </button>
      </div>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="timerMinutes"
              className="font-medium text-zinc-800 text-md"
            >
              Quiz Timer (Minutes)
            </label>
            <p className="text-sm text-zinc-500">
              Specify the duration for the quiz in minutes. The timer will
              adjust accordingly.
            </p>
          </div>

          <input
            type="number"
            id="timerMinutes"
            name="timerMinutes"
            value={quizSettings.timerMinutes} // Corrected to use quizSettings directly
            onChange={handleInputChange}
            className="w-24 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="60"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="randomizeQuestions"
              className="font-medium text-zinc-800 text-md"
            >
              Randomize Questions
            </label>
            <p className="text-sm text-zinc-500">
              Enable this option to randomize the order of questions in the
              quiz.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="randomizeQuestions"
              name="randomizeQuestions"
              checked={quizSettings.randomizeQuestions} // Corrected to use quizSettings directly
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>
      <div className="mt-12">
        <button
          onClick={handleSaveSettings}
          className="px-3 py-2 text-sm font-semibold text-white bg-green-600 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </button>
      </div>
    </div>
  );
};

const CertificateTab = () => {
  const [instructorName, setInstructorName] = useState("");
  const [description, setDescription] = useState("");
  const [signatureImg, setSignatureImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from("signature")
      .upload(`signature-${Date.now()}.png`, file, {
        contentType: "image/png",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload error:", error.message);
      return;
    }

    // Retrieve public URL of the uploaded image
    const { publicURL, error: urlError } = supabase.storage;
    const { publicURL, error: urlError } = supabase.storage
      .from("signature")
      .getPublicUrl(data.Key);
    if (urlError) {
      console.error("Error fetching public URL:", urlError.message);
      return;
    }

    setSignatureImg(publicURL);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase.from("certificate").insert([
      {
        instructor_name: instructorName,
        description,
        signature_img_url: signatureImg,
      },
    ]);

    if (error) {
      console.error("Error saving certificate:", error.message);
    } else {
      console.log("Certificate saved:", data);
      alert("Certificate details saved successfully!");
    }
  };

  return (
    <>
      <div className="flex items-start justify-between w-full p-3 mt-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Certificate Settings
          </h2>
          <p className="mb-8 text-sm text-gray-600">
            Configure your certificate details to customize the experience.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold border rounded text-zinc-700 border-zinc-300 hover:border-zinc-400 hover:text-zinc-800"
          >
            View Default Certificate
          </button>
          <a
            href="/admin/certificate-live-preview"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-xs font-semibold border rounded text-zinc-700 border-zinc-300 hover:border-zinc-400 hover:text-zinc-800"
          >
            Live Preview
          </a>
        </div>
      </div>

      <form className="flex w-full gap-2" onSubmit={handleSubmit}>
        <div className="flex flex-col w-full gap-2 p-3">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">Instructor Name</label>
            <input
              type="text"
              placeholder="Enter instructor name"
              className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              value={instructorName}
              onChange={(e) => setInstructorName(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-zinc-500">
              Description (Certificate Description)
            </label>
            <textarea
              placeholder="Enter certificate description"
              required
              className="h-40 p-5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-300"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-4 bg-white">
            <label className="text-sm font-medium text-zinc-700">
              Upload Signature Image
            </label>
            <div className="flex items-center gap-4 mt-2">
              <input
                type="file"
                accept="image/*"
                className="sr-only"
                id="signatureImage"
                onChange={handleImageUpload}
              />
              <label
                htmlFor="signatureImage"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-300 rounded-md shadow-sm outline-none cursor-pointer hover:opacity-70"
              >
                Upload Image
              </label>
              <p className="text-xs text-zinc-500">Max file size: 2MB</p>
            </div>

            <div className="flex items-center justify-center w-full h-48 overflow-hidden border border-dashed rounded-lg border-zinc-300 bg-zinc-50">
              {signatureImg ? (
                <img
                  src={signatureImg}
                  alt="Signature Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <p className="text-xs text-zinc-500">No image uploaded yet</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2 p-3">
          <div className="flex justify-end w-full gap-2 pb-5 border-b border-zinc-200">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-bold text-white rounded bg-zinc-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const Note = () => {
  const note = [
    "Ensure the instructor's name, certificate description, and signature image fields are correctly formatted.",
    "If you want to view the live preview of the certificate, click the 'Live Preview' button.",
    "Saved changes will be immediately applied and visible to students who earn the certificate.",
  ];

  return (
    <div className="flex flex-col items-start gap-2 p-5 mt-2 border rounded-lg bg-amber-50 border-amber-300">
      <h2 className="mb-4 text-lg font-semibold text-amber-700">
        Important Note
      </h2>
      <ul className="pl-5 list-disc text-amber-700">
        {note.map((item, index) => (
          <li className="mb-3 text-sm" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Tabs = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 border-b border-zinc-200">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ease-in-out outline-none focus:ring-offset-2 ${
              activeTab === index
                ? "text-green-600 border-b-2 border-green-400"
                : "text-gray-600 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].component}</div>
    </div>
  );
};

const LeaderboardToggleModal = ({ isOpen, onClose, setIsChecked }) => {
  const updateLeaderboardStatus = async (status) => {
    try {
      const { error } = await supabase
        .from("leaderboard_config")
        .update({ status })
        .eq("id", 1); // Assuming id is 1 for the single leaderboard configuration record.

      if (error) throw error;

      toast.success(
        status === "hidden"
          ? "Leaderboard turned off successfully"
          : "Leaderboard enabled successfully",
        {
          style: {
            fontSize: "13px",
            fontWeight: "500",
          },
        }
      );
    } catch (err) {
      toast.error("Error updating leaderboard status", {
        style: { fontSize: "13px", fontWeight: "500" },
      });
    }
  };
  return (
    <>
      <Modal
        size="xs"
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
        radius="none"
        className="font-Jost"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h1 className="font-medium">Disable Leaderboard</h1>
                <p className="text-xs font-normal">
                  The leaderboard will not be visible to users.
                </p>
              </ModalHeader>
              <ModalBody></ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={() => {
                    onClose();
                    setIsChecked(true); // Cancel action, checkbox remains checked
                  }}
                >
                  Close
                </Button>
                <Button
                  color="success"
                  radius="sm"
                  onPress={() => {
                    updateLeaderboardStatus("hidden");
                    setIsChecked(false); // Turn off action, checkbox is unchecked
                    onClose();
                  }}
                >
                  Turn off
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default function AdminCustomization() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      name: "General",
      component: <GeneralTab />,
    },

    {
      name: "Quiz",
      component: <QuizTab />,
    },
    {
      name: "Certificate",
      component: <CertificateTab />,
    },
  ];

  return (
    <div className="w-full p-5 space-y-9">
      <Header />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
    </div>
  );
}

const DefaultCertificate = ({ isOpen, setIsOpen }) => {
  // create a date now like this December 25, 2021
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="grid fixed inset-0 bg-zinc-900/70 place-items-center z-[100]"
        >
          <motion.div
            initial={{ opacity: 0, blur: "60px" }}
            whileInView={{ opacity: 1, blur: "0" }}
            className="relative flex flex-col items-center justify-center"
          >
            <img
              src={CertificateOfCompletion}
              alt="certificate of completion"
              className="w-[700px]"
            />
            <h1 className="absolute inset-0 flex items-center justify-center italic -top-4">
              Name of the student
            </h1>
            <h1 className="absolute inset-0 flex items-center justify-center text-xs top-48">
              {date}
            </h1>
          </motion.div>
        </div>
      )}
    </>
  );
};
