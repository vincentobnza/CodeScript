import React, { useState } from "react";

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

const GeneralTab = () => (
  <div className="p-3 mt-8">
    <h2 className="mb-2 text-xl font-semibold">General Settings</h2>
    <p>Configure general system settings here.</p>
  </div>
);

const QuizTab = () => {
  const [quizSettings, setQuizSettings] = useState({
    timerMinutes: 3,
    numberOfQuestions: 10,
    difficulty: "medium",
    randomizeQuestions: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuizSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="p-3 mt-8 bg-white rounded-lg shadow-sm">
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
            value={quizSettings.timerMinutes}
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
              checked={quizSettings.randomizeQuestions}
              onChange={handleInputChange}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
          </label>
        </div>
      </div>

      <div className="mt-12">
        <button className="px-3 py-2 text-white bg-green-600 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          Save Settings
        </button>
      </div>
    </div>
  );
};

const CertificateTab = () => (
  <div className="p-3 mt-8">
    <h2 className="mb-2 text-xl font-semibold">Certificate Settings</h2>
    <p>Manage email configurations and templates.</p>
  </div>
);

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
