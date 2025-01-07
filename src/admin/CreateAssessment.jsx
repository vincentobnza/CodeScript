import React, { useState, useEffect, useCallback } from "react";
import { Search, Plus, Box, Trash2, AlertTriangle, Edit } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import supabase from "@/config/supabaseClient";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Skeleton,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import MonacoEditor from "@monaco-editor/react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CreateAssessment() {
  return (
    <div className="flex flex-col w-full gap-2 space-y-6">
      <Header />
      <Create />
    </div>
  );
}

const Header = () => {
  return (
    <div className="flex flex-col w-full gap-2 pb-5 border-b border-zinc-200">
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap">
          <Link to="/admin/assessments" className="mb-8 text-sm underline">
            Back
          </Link>
          <h1 className="text-lg font-medium">Create an Assessment</h1>
          <p className="text-sm text-zinc-600">
            Create an assessment for CodeScript Users
          </p>
        </div>
      </div>
    </div>
  );
};

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState("");
  const [code, setCode] = useState("// Enter the initial code here");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [answerToCheck, setAnswerToCheck] = useState(``);
  const navigate = useNavigate();

  const insertAssessment = async () => {
    const { data, error } = await supabase
      .from("assessments")
      .insert([
        {
          title: title,
          description: description,
          expectedOutput: expectedOutput,
          type: "admin",
          initialCode: code,
          points: points,
          answerToCheck: answerToCheck,
        },
      ])
      .select();

    if (error) throw error;
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !expectedOutput) {
      toast.error("Please fill up all fields", {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      });
      return;
    }

    setIsLoading(true);

    try {
      await toast.promise(
        insertAssessment(),
        {
          loading: "Creating assessment...",
          success: () => {
            setTitle("");
            setDescription("");
            setExpectedOutput("");
            setCode("// Enter the initial code here");
            setPoints(0);
            setAnswerToCheck(``);
            navigate("/admin/assessments");
            return "Assessment created successfully!";
          },
          error: (err) => {
            console.error("Error inserting assessment:", err);
            return "Failed to create assessment. Please try again.";
          },
        },
        {
          style: {
            minWidth: "250px",
            fontSize: "12px",
            fontWeight: "bold",
          },
          success: {
            duration: 5000,
            icon: "🎉",
          },
        }
      );
    } catch (error) {
      console.error("Error in submission:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const runCode = useCallback(() => {
    let outputBuffer = "";
    const mockConsole = {
      log: (...args) => {
        outputBuffer += args.join(" ") + "\n";
      },
      error: (...args) => {
        outputBuffer += "Error: " + args.join(" ") + "\n";
      },
    };

    try {
      const sandbox = { console: mockConsole };
      const runnable = new Function(
        ...Object.keys(sandbox),
        `${code}\n//# sourceURL=user-code.js`
      );
      runnable.call(null, ...Object.values(sandbox));
      setOutput(outputBuffer.trim());
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  }, [code]);

  const setOutputAsExpected = useCallback(() => {
    setExpectedOutput(output);
  }, [output]);

  return (
    <div className="w-full space-y-6">
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex justify-start w-full gap-4">
          <h1 className="mt-4 text-sm">Set Points</h1>
          <input
            type="number"
            className="w-[100px] h-8 border-b-2 bg-zinc-50 border-zinc-400 outline-none px-2 placeholder:text-xs placeholder:italic font-normal"
            placeholder="Optional"
            onChange={(e) => setPoints(e.target.value)}
          />
        </div>
        <div className="w-full space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <Input
                label="Title"
                radius="none"
                color="none"
                variant="bordered"
                placeholder="Enter assessment title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                isRequired
              />
              <Textarea
                label="Description"
                radius="none"
                color="none"
                variant="bordered"
                placeholder="Enter assessment description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                isRequired
              />
              <Textarea
                label="Expected Output"
                radius="none"
                color="none"
                variant="bordered"
                placeholder="Enter expected output"
                value={expectedOutput}
                onChange={(e) => setExpectedOutput(e.target.value)}
                required
                isRequired
              />
            </div>
            <div className="flex flex-col w-full">
              <MonacoEditor
                className="w-full h-[230px] border-2 border-zinc-200"
                defaultLanguage="javascript"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: "on",
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  wordWrap: "on",
                }}
              />
              <div className="flex items-center self-end gap-3 mt-2">
                <Button
                  color="none"
                  radius="none"
                  className="flex self-end font-bold text-orange-700 border bg-amber-100 border-amber-500"
                  onClick={() => setOutput("")}
                >
                  Clear Console
                </Button>

                <Tooltip
                  offset={15}
                  radius="none"
                  showArrow={true}
                  placement="left"
                  content={
                    <div className="w-[400px] p-5 pb-8 font-Balsamiq">
                      <div className="mb-3 font-bold text-small">
                        Test Code Note ⚠️
                      </div>
                      <div className="font-medium leading-normal text-tiny text-zinc-700 dark:text-zinc-400">
                        The Test Code is meant for testing your code logic
                        before submission. When submitting, do not include the
                        full implementation of your program, only outline your
                        intended approach and structure.
                      </div>
                    </div>
                  }
                >
                  <Button
                    color="none"
                    radius="none"
                    className="flex self-end font-bold text-green-700 bg-green-100 border border-green-500"
                    onClick={runCode}
                  >
                    Test Code
                  </Button>
                </Tooltip>
              </div>
            </div>
          </div>

          <div className="w-full h-24 p-4 overflow-y-auto border rounded bg-muted bg-zinc-800">
            <h3 className="mb-2 text-sm font-semibold text-zinc-200">
              Output:
            </h3>
            <pre className="text-sm font-bold text-green-500 whitespace-pre-wrap">
              {output}
            </pre>
          </div>
          <Button
            color="none"
            radius="none"
            className="flex self-end font-bold text-orange-700 border bg-amber-100 border-amber-500"
            onClick={setOutputAsExpected}
          >
            Set as Expected Output
          </Button>

          <Textarea
            label="Answer to Check"
            radius="none"
            color="none"
            variant="bordered"
            placeholder="Paste here your answer to check, please make sure you double check it before entering here."
            value={answerToCheck}
            onChange={(e) => setAnswerToCheck(e.target.value)}
            required
            isRequired
          />
        </div>
        <div className="flex justify-end gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            color="none"
            radius="none"
            className="font-bold text-indigo-700 bg-indigo-100 border border-indigo-500"
          >
            {isLoading ? "Submitting..." : "Submit Assessment"}
          </Button>
        </div>
      </form>
    </div>
  );
};
