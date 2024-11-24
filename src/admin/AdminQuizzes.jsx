import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  BookOpen,
  Users,
  Award,
  BarChart2,
  Eye,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Card,
  CardBody,
  Progress,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { toast, Toaster } from "react-hot-toast";
import { BarChart } from "@mui/x-charts/BarChart";
import supabase from "../config/supabaseClient";
import PixelProfile from "../assets/pixel_profile.png";

export default function AdminQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "score",
    direction: "descending",
  });
  const [lessonFilter, setLessonFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  useEffect(() => {
    fetchQuizzes();
    const subscription = supabase
      .channel("users_quizzes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "users_quizzes" },
        handleRealTimeUpdates
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const filtered = quizzes.filter(
      (quiz) =>
        (quiz.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.lesson.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.id.toString().includes(searchTerm)) &&
        (lessonFilter === "all" || quiz.lesson === lessonFilter) &&
        (statusFilter === "all" || quiz.status === statusFilter)
    );

    const sorted = [...filtered].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    setFilteredQuizzes(sorted);
  }, [searchTerm, quizzes, lessonFilter, statusFilter, sortDescriptor]);

  const fetchQuizzes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("users_quizzes").select("*");
    if (error) {
      toast.error("Failed to fetch quizzes");
    } else {
      setQuizzes(data);
    }
    setLoading(false);
  };

  const handleRealTimeUpdates = (payload) => {
    if (payload.eventType === "INSERT") {
      setQuizzes((prevQuizzes) => [...prevQuizzes, payload.new]);
    } else if (payload.eventType === "UPDATE") {
      setQuizzes((prevQuizzes) =>
        prevQuizzes.map((quiz) =>
          quiz.id === payload.new.id ? payload.new : quiz
        )
      );
    } else if (payload.eventType === "DELETE") {
      setQuizzes((prevQuizzes) =>
        prevQuizzes.filter((quiz) => quiz.id !== payload.old.id)
      );
    }
  };

  const paginatedQuizzes = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredQuizzes.slice(start, end);
  }, [page, rowsPerPage, filteredQuizzes]);

  const uniqueLessons = useMemo(() => {
    return ["all", ...new Set(quizzes.map((quiz) => quiz.lesson))];
  }, [quizzes]);

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <Toaster />
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        lessonFilter={lessonFilter}
        setLessonFilter={setLessonFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        uniqueLessons={uniqueLessons}
      />
      <QuizStats quizzes={quizzes} />
      <QuizzesTable
        quizzes={paginatedQuizzes}
        loading={loading}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
        onViewDetails={(quiz) => {
          setSelectedQuiz(quiz);
          setIsDetailModalOpen(true);
        }}
      />
      <div className="flex items-center justify-between">
        <Pagination
          total={Math.ceil(filteredQuizzes.length / rowsPerPage)}
          page={page}
          onChange={setPage}
        />
        <select
          className="px-2 py-1 bg-transparent border rounded"
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
        >
          <option value={5}>5 rows</option>
          <option value={10}>10 rows</option>
          <option value={15}>15 rows</option>
        </select>
      </div>
      <QuizDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        quiz={selectedQuiz}
      />
    </div>
  );
}

const Header = ({
  searchTerm,
  setSearchTerm,
  lessonFilter,
  setLessonFilter,
  statusFilter,
  setStatusFilter,
  uniqueLessons,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-lg font-semibold">Track and View User's Quizzes</h1>
      <p className="text-sm text-zinc-600">
        Monitor and analyze quiz performance across all lessons
      </p>
      <div className="flex items-center gap-2 mt-4">
        <div className="relative w-[350px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400 size-4" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 bg-white border border-gray-200 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent hover:border-zinc-300 placeholder:text-xs"
            placeholder="Search by name, lesson, or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <button className="py-[0.75rem] px-4 rounded-md shadow text-xs  border border-zinc-200 flex items-center gap-2">
              Lesson: {lessonFilter === "all" ? "All Lessons" : lessonFilter}
              <ChevronDown size={15} />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Lesson filter"
            onAction={(key) => setLessonFilter(key)}
          >
            {uniqueLessons.map((lesson) => (
              <DropdownItem key={lesson}>
                {lesson === "all" ? "All Lessons" : lesson}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

const QuizStats = ({ quizzes }) => {
  const totalQuizzes = quizzes.length;

  const averageScore = quizzes.score / totalQuizzes;
  const topLesson =
    Object.entries(
      quizzes.reduce((acc, quiz) => {
        acc[quiz.lesson] = (acc[quiz.lesson] || 0) + 1;
        return acc;
      }, {})
    ).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
      <StatCard
        title="Total Quizzes"
        value={totalQuizzes}
        icon={<BookOpen />}
      />

      <StatCard title="Top Lesson" value={topLesson} icon={<Users />} />
      <StatCard
        title="Top User"
        value={quizzes[0]?.name || "N/A"}
        icon={<BookOpen />}
      />
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <Card radius="sm">
    <CardBody className="flex flex-row items-center justify-between p-5">
      <div>
        <p className="text-xs font-semibold text-default-500">{title}</p>
        <p className="mt-5 font-semibold uppercase text-md">{value}</p>
      </div>
      <div className="p-2 rounded-full bg-primary/10">
        {React.cloneElement(icon, { size: 24, className: "text-primary" })}
      </div>
    </CardBody>
  </Card>
);

const QuizzesTable = ({
  quizzes,
  loading,
  sortDescriptor,
  setSortDescriptor,
  onViewDetails,
}) => {
  const columns = [
    { name: "USER", uid: "name" },
    { name: "LESSON", uid: "lesson" },
    { name: "STATUS", uid: "status" },
    { name: "SCORE", uid: "score" },
    { name: "ACTIONS", uid: "actions" },
  ];

  const renderCell = (quiz, columnKey) => {
    const cellValue = quiz[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex items-center gap-3">
            <Avatar
              src="https://cdn-icons-png.flaticon.com/128/4997/4997543.png"
              size="sm"
              isBordered
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{quiz.name}</p>
              <p className="text-xs text-default-500">ID: {quiz.id}</p>
            </div>
          </div>
        );
      case "lesson":
        return <div className="font-semibold uppercase">{cellValue}</div>;
      case "status":
        return (
          <div
            className={`py-1 px-2 rounded-full text-xs font-semibold text-center ${
              cellValue === "completed"
                ? "bg-green-100 text-green-800"
                : cellValue === "in_progress"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {cellValue}
          </div>
        );
      case "score":
        return (
          <div className="flex items-center gap-2 mx-auto text-center">
            <span className="text-sm font-semibold">{cellValue}</span>
          </div>
        );
      case "actions":
        return (
          <Button size="sm" onClick={() => onViewDetails(quiz)} radius="none">
            <Eye size={16} />
            View Details
          </Button>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="Quizzes table"
      className="bg-white"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.uid !== "actions"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={quizzes}
        loadingContent={<div>Loading quizzes...</div>}
        loadingState={loading ? "loading" : "idle"}
      >
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

const QuizDetailModal = ({ isOpen, onClose, quiz }) => {
  if (!quiz) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Quiz Details</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold">User Information</h3>
              <p>
                <strong>Name:</strong> {quiz.name}
              </p>
              <p>
                <strong>ID:</strong> {quiz.id}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Quiz Information</h3>
              <p>
                <strong>Lesson:</strong> {quiz.lesson}
              </p>
              <p>
                <strong>Status:</strong>
                <span
                  className={`ml-2 py-1 px-2 rounded-full text-xs font-semibold ${
                    quiz.status === "completed"
                      ? "bg-green-100 text-green-800"
                      : quiz.status === "in_progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {quiz.status}
                </span>
              </p>
              <p>
                <strong>Score:</strong> {quiz.score}%
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold">Additional Notes</h3>
            <p>{quiz.notes || "No additional notes available."}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
