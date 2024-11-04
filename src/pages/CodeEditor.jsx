import React, { useState, useCallback, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import {
  Play,
  Trash2,
  ArrowDownToLine,
  Flame,
  Container,
  Check,
  RefreshCw,
  SquareChevronRight,
  ScanSearch,
  Code,
  Lightbulb,
} from "lucide-react";
import supabase from "../config/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function CodeScript() {
  const editorRef = useRef(null);
  const [code, setCode] = useState("// Click an assessment to begin");
  const [output, setOutput] = useState("");
  const [currentAssessment, setCurrentAssessment] = useState(null);
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [error, setError] = useState("");
  const [assessments, setAssessments] = useState([]);
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [editorLanguage, setEditorLanguage] = useState("javascript");
  const [editorTheme, setEditorTheme] = useState("vs-dark");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState([]);
  const [isDescriptionView, setIsDescriptionView] = useState(false);

  useEffect(() => {
    fetchAssessments();
    fetchCompletedAssessments();
  }, [user]);

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from("assessments")
        .select("*")
        .order("id", { ascending: true });

      if (error) throw error;
      setAssessments(data);
    } catch (error) {
      console.error("Error fetching assessments", error);
      toast.error("Failed to fetch assessments");
    }
  };

  const fetchCompletedAssessments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("user_assessments")
        .select("assessment")
        .eq("user_id", user.id)
        .eq("status", "Completed");

      if (error) throw error;

      const completedIds = data.map((item) =>
        parseInt(item.assessment.split(" ")[1])
      );
      setCompletedAssessments(completedIds);
    } catch (error) {
      console.error("Error fetching completed assessments:", error);
      toast.error("Failed to fetch completed assessments");
    }
  };

  const insertCompletedAssessment = async (assessmentId) => {
    try {
      const { error } = await supabase.from("user_assessments").insert({
        assessment: `Assessment ${assessmentId}`,
        status: "Completed",
        user_id: user.id,
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error recording assessment completion:", error);
      toast.error("Failed to record assessment completion");
    }
  };

  const updateUserProgress = useCallback(
    async (progressToAdd, pointsToAdd) => {
      if (!user) {
        console.error("No user logged in");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("progress, current_points")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        const newProgress = (data.progress || 0) + progressToAdd;
        const newPoints = (data.current_points || 0) + pointsToAdd;

        const { error: updateError } = await supabase
          .from("profiles")
          .update({ progress: newProgress, current_points: newPoints })
          .eq("id", user.id);

        if (updateError) throw updateError;

        toast.success(
          `Progress and points updated: +${progressToAdd}%, +${pointsToAdd} points`,
          {
            style: {
              fontSize: "12px",
            },
          }
        );
      } catch (error) {
        console.error("Error updating progress and points:", error.message);
        toast.error("Failed to update progress and points");
      }
    },
    [user]
  );

  const checkAnswerToCheck = (userCode, answerToCheck) => {
    const cleanCode = (code) => code.replace(/\s+/g, "").toLowerCase();
    return cleanCode(userCode).includes(cleanCode(answerToCheck));
  };

  const runCode = useCallback(async () => {
    if (!currentAssessment) {
      toast.error("Please select an assessment first");
      return;
    }
    setIsRunning(true);
    setOutput("");
    setTestResults([]);

    try {
      // Capture console.log output
      let capturedOutput = "";
      const originalConsoleLog = console.log;
      console.log = (...args) => {
        capturedOutput += args.join(" ") + "\n";
        originalConsoleLog.apply(console, args);
      };

      // Execute the user's code
      try {
        eval(code);
      } catch (codeError) {
        capturedOutput += `Error: ${codeError.message}\n`;
      }

      // Restore original console.log
      console.log = originalConsoleLog;

      // Set the captured output
      setOutput(capturedOutput);

      const answerCheckPassed = checkAnswerToCheck(
        code,
        currentAssessment.answerToCheck
      );

      const results = [
        {
          name: "Answer Check",
          passed: answerCheckPassed,
          message: answerCheckPassed
            ? "Passed: Congratulations! Your code passed the answer check."
            : "Failed: Your code is missing some required elements.",
        },
      ];

      setTestResults(results);

      const allPassed = results.every((result) => result.passed);
      if (allPassed && !completedAssessments.includes(currentAssessment.id)) {
        setCompletedAssessments((prev) => [...prev, currentAssessment.id]);
        insertCompletedAssessment(currentAssessment.id);
        updateUserProgress(5, currentAssessment.points);
        setModalContent({
          title: "Assessment Passed!",
          message: `Congratulations! You've completed this assessment and earned ${currentAssessment.points} points!`,
        });
        setIsModalOpen(true);
      } else if (!allPassed) {
        setModalContent({
          title: "Assessment Not Passed",
          message:
            "Your code didn't pass all the checks. Please review the test results and try again.",
        });
        setIsModalOpen(true);
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
      setError(error);
    } finally {
      setIsRunning(false);
    }
  }, [code, currentAssessment, completedAssessments, updateUserProgress]);

  const clearOutput = useCallback(() => {
    setOutput("");
    setTestResults([]);
  }, []);

  const handleSaveFile = useCallback(async () => {
    try {
      const fileHandle = await window.showSaveFilePicker({
        suggestedName: `assessment_${currentAssessment?.id || "untitled"}.js`,
        types: [
          {
            description: "JavaScript Files",
            accept: {
              "text/javascript": [".js"],
            },
          },
        ],
      });
      const writableStream = await fileHandle.createWritable();
      await writableStream.write(code);
      await writableStream.close();
      toast.success("File saved successfully");
    } catch (err) {
      console.error("File saving failed:", err);
      toast.error("Failed to save file");
    }
  }, [currentAssessment, code]);

  const handleFormatCode = useCallback(() => {
    if (editorRef.current) {
      editorRef.current.getAction("editor.action.formatDocument").run();
      toast.success("Code formatted", {
        icon: "🎉",
        style: {
          fontSize: "12px",
        },
      });
    }
  }, []);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleAssessmentChange = (assessmentId) => {
    const newAssessment = assessments.find((a) => a.id === assessmentId);
    setCurrentAssessment(newAssessment);
    setCode(`// ${newAssessment.description}\n\n${newAssessment.initialCode}`);
    clearOutput();
  };

  const toggleDescriptionView = () => {
    setIsDescriptionView(!isDescriptionView);
  };

  return (
    <div className="flex w-full h-screen font-NotoSans bg-zinc-900">
      <Toaster />
      <AssessmentSidePanel
        assessments={assessments}
        currentAssessment={currentAssessment}
        completedAssessments={completedAssessments}
        onAssessmentChange={handleAssessmentChange}
      />
      <div className="flex flex-col flex-1 ml-64">
        <Header
          onSaveFile={handleSaveFile}
          editorLanguage={editorLanguage}
          setEditorLanguage={setEditorLanguage}
          editorTheme={editorTheme}
          setEditorTheme={setEditorTheme}
        />
        <div className="flex flex-1">
          <div className="flex flex-col flex-1">
            <ToolBar
              onRun={runCode}
              onFormat={handleFormatCode}
              isRunning={isRunning}
              assessments={assessments}
              isDescriptionView={isDescriptionView}
              toggleDescriptionView={toggleDescriptionView}
            />
            <div className="flex-1 overflow-hidden">
              {isDescriptionView ? (
                <DescriptionView assessment={currentAssessment} />
              ) : (
                <MonacoEditor
                  className="w-full h-full"
                  language={editorLanguage}
                  theme={editorTheme}
                  value={code}
                  onChange={setCode}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    wordWrap: "on",
                    wrappingStrategy: "advanced",
                  }}
                />
              )}
            </div>
          </div>
          <OutputPanel
            output={output}
            onClear={clearOutput}
            error={error}
            testResults={testResults}
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        radius="none"
        className="font-NotoSans"
      >
        <ModalContent>
          <ModalHeader>{modalContent.title}</ModalHeader>
          <ModalBody>
            <div className="w-full h-20 p-3 mt-4 text-sm border rounded text-zinc-700 dark:text-zinc-300 bg-gradient-to-br from-red-zinc/20 to-zinc-800/60 border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800">
              <p>{modalContent.message}</p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setIsModalOpen(false)} radius="sm">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Header = ({
  onSaveFile,
  editorLanguage,
  setEditorLanguage,
  editorTheme,
  setEditorTheme,
}) => (
  <header className="flex items-center justify-between w-full p-4 border-b bg-[#1E1E1E] border-zinc-800">
    <div className="flex flex-col gap-1">
      <h1 className="text-lg font-black text-transparent bg-gradient-to-br from-green-500 to-green-600 dark:to-green-800 bg-clip-text font-Orbitron">
        CodeScript
      </h1>
      <p className="text-xs text-zinc-400">JavaScript Assessment Platform</p>
    </div>
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        radius="none"
        onClick={onSaveFile}
        className="text-white bg-zinc-700"
        endContent={<ArrowDownToLine size={16} />}
      >
        Save File
      </Button>
    </div>
  </header>
);

const ToolBar = ({
  onRun,
  onFormat,
  isRunning,
  assessments,
  isDescriptionView,
  toggleDescriptionView,
}) => (
  <div className="flex items-center justify-between p-2 border-b bg-[#1E1E1E] border-zinc-800">
    <div className="flex gap-1">
      <Tooltip content="Format Code" radius="none" showArrow>
        <Button
          isIconOnly
          radius="sm"
          size="sm"
          onClick={onFormat}
          className="ml-2 text-white bg-zinc-700"
        >
          <Flame size={16} />
        </Button>
      </Tooltip>
    </div>
    <div className="flex items-center gap-2 ">
      <Button
        radius="none"
        size="sm"
        onClick={toggleDescriptionView}
        className={`text-xs font-semibold text-white border ${
          isDescriptionView
            ? "bg-amber-800/40 border-amber-400 text-amber-200"
            : "border-zinc-500 bg-zinc-800"
        }`}
      >
        {isDescriptionView ? (
          <Code size={16} className="mr-2" />
        ) : (
          <ScanSearch size={16} className="mr-2" />
        )}
        {isDescriptionView ? "Code View" : "Description View"}
      </Button>
      <Button
        radius="none"
        size="sm"
        onClick={onRun}
        isLoading={isRunning}
        className="text-xs font-semibold text-white bg-green-800 border border-green-400"
      >
        {isRunning ? (
          <RefreshCw size={16} className="mr-2 animate-spin" />
        ) : (
          <Play size={16} className="mr-2" />
        )}
        {isRunning ? "Submitting..." : "Submit Code"}
      </Button>
    </div>
  </div>
);

const OutputPanel = ({ output, onClear, error, testResults }) => (
  <div className="flex flex-col w-1/3 border-l bg-[#1E1E1E] border-zinc-800">
    <div className="flex items-center justify-between p-2 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="text-green-400">
          <SquareChevronRight size={15} />
        </div>
        <h2 className="text-sm font-semibold text-zinc-300">Terminal Output</h2>
      </div>
      <Button
        onClick={onClear}
        isIconOnly
        size="sm"
        className="bg-transparent text-zinc-400"
      >
        <Trash2 size={16} />
      </Button>
    </div>
    <div className="flex-1 p-4 overflow-auto font-mono text-sm">
      <div className="w-full pb-5 border-b border-zinc-800">
        <div
          className={`whitespace-pre-wrap ${
            error ? "text-red-500" : "text-zinc-400"
          } font-semibold`}
        >
          {output}
        </div>
      </div>
      {testResults.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-sm font-semibold text-zinc-300">
            Assessment Test Results 🧐
          </h3>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`mt-5 mb-2 p-3 rounded border  ${
                result.passed
                  ? "bg-gradient-to-br from-green-800/20 to-green-800/50 border-green-700"
                  : "bg-gradient-to-br from-red-800/10 to-red-800/40 border-red-700"
              }`}
            >
              <p className="mb-2 text-xs font-semibold text-zinc-300">
                {result.name}
              </p>
              <p
                className={`text-xs font-medium ${
                  result.passed ? "text-green-500" : "text-red-500"
                }`}
              >
                {result.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const AssessmentSidePanel = ({
  currentAssessment,
  completedAssessments,
  onAssessmentChange,
  assessments,
}) => {
  const totalPoints = assessments.reduce(
    (sum, assessment) => sum + assessment.points,
    0
  );
  const earnedPoints = assessments
    .filter((assessment) => completedAssessments.includes(assessment.id))
    .reduce((sum, assessment) => sum + assessment.points, 0);

  return (
    <div className="flex flex-col w-64 fixed inset-y-0 left-0 top-0 border-r bg-[#1E1E1E] border-zinc-800">
      <div className="p-5">
        <div className="flex flex-col gap-1 font-semibold">
          <h3 className="text-xs text-zinc-400">JavaScript Assessments</h3>
          <h3 className="text-lg font-semibold text-zinc-100">
            Assessments for You
          </h3>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-5 space-y-2">
          {assessments.map((assessment) => (
            <AssessmentCard
              key={assessment.id}
              assessment={assessment}
              isActive={currentAssessment?.id === assessment.id}
              isCompleted={completedAssessments.includes(assessment.id)}
              onClick={() => onAssessmentChange(assessment.id)}
            />
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-zinc-800">
        <p className="mb-2 text-sm text-zinc-400">Progress</p>
        <Progress
          value={(earnedPoints / totalPoints) * 100}
          className="h-2"
          color="success"
        />
        <div className="flex justify-between mt-2">
          <p className="text-xs text-zinc-400">
            {earnedPoints}/{totalPoints} Points
          </p>
          <p className="text-xs text-zinc-400">
            {completedAssessments.length}/{assessments.length} Completed
          </p>
        </div>
      </div>
    </div>
  );
};

const AssessmentCard = ({ assessment, isActive, isCompleted, onClick }) => (
  <div
    onClick={onClick}
    className={`h-20 cursor-pointer p-4 transition-colors relative overflow-hidden rounded-md
      ${
        isActive
          ? "border bg-gradient-to-br from-green-800/20 to-green-800/80 border-green-700"
          : "border bg-gradient-to-br from-zinc-800/10 to-zinc-800/80 border-zinc-700"
      } 
    `}
  >
    <Container
      size={40}
      className={`${
        isActive ? "text-green-400 animate-pulse" : "text-zinc-700"
      } absolute -bottom-2 -right-0`}
    />
    <h4
      className={`text-[13px] font-medium ${
        isActive ? "text-white" : "text-zinc-400"
      }`}
    >
      {assessment.title}
    </h4>
    {isCompleted && (
      <div className="absolute text-green-500 top-2 right-2">
        <Check size={16} />
      </div>
    )}
  </div>
);

const ParticleEffect = ({ isVisible }) => {
  const containerRef = useRef(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
      }));
      setParticles(newParticles);
    }
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <AnimatePresence>
        {isVisible &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 rounded-full bg-zinc-400"
              initial={{ x: particle.x, y: particle.y, opacity: 1 }}
              animate={{
                x: particle.x + (Math.random() - 0.5) * 100,
                y: particle.y + (Math.random() - 0.5) * 100,
                opacity: 0,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
      </AnimatePresence>
    </div>
  );
};

const DescriptionView = ({ assessment }) => {
  const [openHint, setOpenHint] = useState(false);

  if (!assessment) {
    return (
      <div className="flex items-center justify-center h-full text-zinc-400">
        Select an assessment to view its description.
      </div>
    );
  }

  return (
    <div className="relative p-6 h-full bg-[#1E1E1E] text-zinc-300">
      <div className="flex justify-between w-full mb-4">
        <div className="flex flex-col gap-2 mb-4">
          <h2 className="text-2xl font-bold">{assessment.title}</h2>
          <p className="text-xs font-bold">
            Points to earned:{" "}
            <span className="text-[11px] py-[2px] bg-amber-800/20 text-amber-300 rounded-full border border-amber-600 px-3 ml-2">
              {assessment.points} pts
            </span>
          </p>
        </div>

        <Tooltip
          content="Click to open hint"
          placement="left"
          radius="none"
          showArrow
        >
          <button
            className="grid border rounded-md cursor-pointer size-8 place-items-center bg-zinc-800 border-zinc-700 hover:brightness-125"
            onClick={() => setOpenHint(true)}
            aria-label="Open hint"
          >
            <Lightbulb size={16} />
          </button>
        </Tooltip>
      </div>
      <div className="w-full ">
        <p className="mb-4 text-sm">{assessment.description}</p>
      </div>

      <div className="w-full">
        <h2 className="mb-4 font-semibold">Expected Output</h2>

        <div className="w-full p-3 overflow-y-auto border rounded text-zinc-300 h-28 bg-zinc-800 border-zinc-600">
          <pre className="text-sm whitespace-pre-wrap font-NotoSans">
            {assessment.expectedOutput}
          </pre>
        </div>
      </div>

      <AnimatePresence>
        {openHint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mt-5"
          >
            <div className="flex flex-col w-full gap-2 mt-8 overflow-hidden overflow-y-auto text-sm">
              <h2>Code Hint 💡</h2>

              <div className="w-full p-3 mt-2 text-xs border rounded text-amber-100 border-amber-600 bg-gradient-to-br from-amber-700/10 to-yellow-800/40">
                <p className="whitespace-pre-wrap font-NotoSans">
                  {assessment.hint}
                </p>
              </div>
            </div>
            <ParticleEffect isVisible={openHint} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
