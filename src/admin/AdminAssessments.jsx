import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Plus,
  Box,
  Trash2,
  AlertTriangle,
  Edit,
  BookOpenText,
} from "lucide-react";
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
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import MonacoEditor from "@monaco-editor/react";
import { Link } from "react-router-dom";

export default function AdminAssessments() {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAssessments, setFilteredAssessments] = useState([]);

  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("assessments")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setAssessments(data);
      } catch (error) {
        console.log("Error fetching assessments:", error);
        toast.error("Failed to fetch assessments. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAssessments();

    const subscription = supabase
      .channel("assessments")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "assessments" },
        fetchAssessments
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setFilteredAssessments(
      assessments.filter(
        (assessment) =>
          assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          assessment.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, assessments]);

  const handleDeleteAssessment = (deletedId) => {
    setAssessments(
      assessments.filter((assessment) => assessment.id !== deletedId)
    );
  };

  const handleUpdateAssessment = (updatedAssessment) => {
    setAssessments(
      assessments.map((assessment) =>
        assessment.id === updatedAssessment.id ? updatedAssessment : assessment
      )
    );
  };

  return (
    <div className="flex flex-col w-full gap-2 space-y-6">
      <Toaster />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <AssessmentList
        assessments={filteredAssessments}
        isLoading={isLoading}
        onDelete={handleDeleteAssessment}
        onUpdate={handleUpdateAssessment}
      />
    </div>
  );
}

const Header = ({ searchTerm, setSearchTerm }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="flex flex-col w-full gap-2 pb-5 border-b border-zinc-200">
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap">
          <h1 className="text-lg font-medium">WorkSpaces</h1>
          <p className="text-sm text-zinc-600">
            Work with assessments for CodeScript Users
          </p>
        </div>
        <div className="relative w-[350px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400 size-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-4 bg-white border border-gray-100 rounded-md shadow shadow-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent hover:border-zinc-300 placeholder:text-sm"
            placeholder="Search assessments..."
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/admin/create-assessment"
          className="flex items-center self-start gap-3 px-3 py-2 mt-5 text-sm font-semibold text-green-600 border rounded shadow outline-none border-zinc-200 shadow-zinc-200"
        >
          <Plus size={15} />
          Create Assessment
        </Link>
        <Link
          to="/admin/add-lesson"
          className="flex items-center self-start gap-3 px-3 py-2 mt-5 text-sm font-semibold border rounded shadow outline-none text-zinc-600 border-zinc-200 shadow-zinc-200"
        >
          <BookOpenText size={15} />
          Add Lesson
        </Link>
      </div>

      <CreateModal
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
      />
    </div>
  );
};

const AssessmentList = ({ assessments, isLoading, onDelete, onUpdate }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const viewDetails = (assessment) => {
    setSelectedAssessment(assessment);
    onOpen();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64">
        <Spinner size="lg" color="primary" />
        <p className="mt-4 text-sm text-zinc-500">Loading assessments...</p>
      </div>
    );
  }

  if (assessments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-64">
        <Box size={48} className="text-zinc-300" />
        <p className="mt-4 text-sm text-zinc-500">No assessments found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="mb-4 font-semibold text-md">All Assessments</h1>
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {assessments.map((assessment) => (
          <div
            key={assessment.id}
            onClick={() => viewDetails(assessment)}
            className="flex flex-col justify-between w-full p-4 transition-shadow border shadow cursor-pointer shadow-zinc-100 border-zinc-100 hover:shadow-md"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`p-1 rounded ${
                    assessment.type === "predefined"
                      ? "bg-orange-100"
                      : "bg-green-100"
                  }`}
                >
                  <Box
                    size={16}
                    className={
                      assessment.type === "predefined"
                        ? "text-orange-400"
                        : "text-green-400"
                    }
                  />
                </div>
                <span className="text-xs font-medium text-zinc-500">
                  {assessment.type === "predefined" ? "Predefined" : "Admin"}
                </span>
              </div>
              <h2 className="mb-2 text-sm font-semibold">{assessment.title}</h2>
              <p className="text-xs text-zinc-500 line-clamp-2">
                {assessment.description}
              </p>
            </div>
            <div className="mt-4 text-xs text-zinc-400">
              Points: {assessment.points}
            </div>
          </div>
        ))}
      </div>

      <ViewModal
        onOpen={onOpen}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        assessment={selectedAssessment}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </div>
  );
};

const ViewModal = ({
  isOpen,
  onOpen,
  onOpenChange,
  assessment,
  onDelete,
  onUpdate,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <>
      <Modal
        hideCloseButton
        radius="none"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="3xl"
        className="font-Balsamiq"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-sm font-semibold text-zinc-500">
                      Title
                    </h4>
                    <h1 className="text-lg">{assessment?.title}</h1>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      radius="none"
                      color="none"
                      className="text-xs font-semibold border border-zinc-200"
                      startContent={<Edit size={16} />}
                      onPress={() => setIsEditModalOpen(true)}
                    >
                      Edit Assessment
                    </Button>
                    <Button
                      radius="none"
                      color="none"
                      className="text-xs font-semibold border border-zinc-200"
                      startContent={<Trash2 size={16} />}
                      onPress={() => setIsDeleteModalOpen(true)}
                    >
                      Delete Assessment
                    </Button>
                  </div>
                </div>
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col w-full gap-4 p-5 border shadow shadow-zinc-100 border-zinc-200">
                  <p className="text-sm font-bold text-zinc-900">Description</p>
                  <h1 className="text-md">{assessment?.description}</h1>
                </div>
                <div className="flex flex-col w-full gap-3 p-5 border shadow shadow-zinc-100 border-zinc-200">
                  <p className="text-sm font-bold text-zinc-900">
                    Expected Output
                  </p>
                  <div className="mb-4 space-y-3">
                    <div className="w-full h-24 mt-3 overflow-y-scroll border rounded-lg border-zinc-800 dark:border-zinc-700">
                      <div className="flex items-center w-full h-8 p-3 border-b rounded-tl-lg rounded-tr-lg bg-zinc-800 border-zinc-700">
                        <div className="w-[50px] grid grid-cols-3">
                          <div className="bg-green-500 rounded-full size-2"></div>
                          <div className="bg-red-500 rounded-full size-2"></div>
                          <div className="bg-yellow-500 rounded-full size-2"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-start w-full p-5 text-green-400 bg-zinc-800">
                        <pre className="font-bold text-md ">
                          {assessment?.expectedOutput}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  radius="none"
                  variant="light"
                  className="font-bold"
                  onPress={onClose}
                >
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setIsDeleteModalOpen}
        assessment={assessment}
        onDelete={(deletedId) => {
          onDelete(deletedId);
          onOpenChange(false);
        }}
      />

      <EditModal
        isOpen={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        assessment={assessment}
        onUpdate={(updatedAssessment) => {
          onUpdate(updatedAssessment);
          onOpenChange(false);
        }}
      />
    </>
  );
};

const CreateModal = ({ isOpen, onOpen, onOpenChange }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [expectedOutput, setExpectedOutput] = useState("");
  const [code, setCode] = useState("// Enter the initial code here");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
            onOpenChange(false);
            setCode("// Enter the initial code here");
            setPoints(0);
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      className="font-Balsamiq"
      radius="none"
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex items-center justify-between w-full gap-1">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Create an Assessment</h2>
                <p className="text-sm text-muted-foreground">
                  Fill in the details to create a new assessment.
                </p>
              </div>

              <div className="flex gap-4">
                <h1 className="mt-4 text-sm">Set Points</h1>
                <input
                  type="number"
                  className="w-[100px] h-8 border-b-2 bg-zinc-50 border-zinc-400 outline-none px-2 placeholder:text-xs placeholder:italic font-normal"
                  placeholder="Optional"
                  onChange={(e) => setPoints(e.target.value)}
                />
              </div>
            </ModalHeader>
            <ModalBody>
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
                              before submission. When submitting, do not include
                              the full implementation of your program, only
                              outline your intended approach and structure.
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
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                color="none"
                radius="none"
                className="font-bold text-indigo-700 bg-indigo-100 border border-indigo-500"
              >
                {isLoading ? "Submitting..." : "Submit Assessment"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

const EditModal = ({ isOpen, onOpenChange, assessment, onUpdate }) => {
  const [title, setTitle] = useState(assessment?.title || "");
  const [description, setDescription] = useState(assessment?.description || "");
  const [points, setPoints] = useState(assessment?.points || 0);
  const [expectedOutput, setExpectedOutput] = useState(
    assessment?.expectedOutput || ""
  );
  const [code, setCode] = useState(assessment?.initialCode || "");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (assessment) {
      setTitle(assessment.title);
      setDescription(assessment.description);
      setPoints(assessment.points);
      setExpectedOutput(assessment.expectedOutput);
      setCode(assessment.initialCode);
    }
  }, [assessment]);

  const updateAssessment = async () => {
    const { data, error } = await supabase
      .from("assessments")
      .update({
        title: title,
        description: description,
        expectedOutput: expectedOutput,
        initialCode: code,
        points: points,
      })
      .eq("id", assessment.id)
      .select();

    if (error) throw error;
    return data[0];
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
      const updatedAssessment = await toast.promise(
        updateAssessment(),
        {
          loading: "Updating assessment...",
          success: "Assessment updated successfully!",
          error: "Failed to update assessment. Please try again.",
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

      onUpdate(updatedAssessment);
      onOpenChange(false);
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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      radius="none"
      className="font-Balsamiq"
      hideCloseButton
    >
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex items-center justify-between w-full gap-1">
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold">Edit Assessment</h2>
                <p className="text-sm text-muted-foreground">
                  Update the details of the assessment.
                </p>
              </div>

              <div className="flex gap-4">
                <h1 className="mt-4 text-sm">Set Points</h1>
                <input
                  type="number"
                  className="w-[100px] h-8 border-b-2 bg-zinc-50 border-zinc-400 outline-none px-2 placeholder:text-xs placeholder:italic font-normal"
                  placeholder="Optional"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                />
              </div>
            </ModalHeader>
            <ModalBody>
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
                              before submission. When submitting, do not include
                              the full implementation of your program, only
                              outline your intended approach and structure.
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
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                color="none"
                radius="none"
                className="font-bold text-indigo-700 bg-indigo-100 border border-indigo-500"
              >
                {isLoading ? "Updating..." : "Update Assessment"}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

const DeleteModal = ({ isOpen, onOpenChange, assessment, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from("assessments")
        .delete()
        .eq("id", assessment.id);

      if (error) throw error;

      toast.success("Assessment deleted successfully", {
        style: {
          fontSize: "12px",
          fontWeight: "bold",
        },
      });
      onDelete(assessment.id);
    } catch (error) {
      console.error("Error deleting assessment:", error);
      toast.error("Failed to delete assessment. Please try again.");
    } finally {
      setIsDeleting(false);
      onOpenChange(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="md"
      radius="none"
      className="font-Balsamiq"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-red-600">
                <AlertTriangle size={24} />
                <h2 className="text-lg font-semibold">Delete Assessment</h2>
              </div>
            </ModalHeader>
            <ModalBody>
              <p className="text-zinc-700">
                Are you sure you want to delete the assessment "
                {assessment?.title}"? This action cannot be undone.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                radius="sm"
                onPress={onClose}
                color="none"
                className="text-sm font-semibold"
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                radius="sm"
                color="none"
                className="text-sm font-semibold text-red-700 bg-red-100 border border-red-400"
                onPress={handleDelete}
                isLoading={isDeleting}
              >
                Delete
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
