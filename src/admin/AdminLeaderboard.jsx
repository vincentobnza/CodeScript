import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Trophy,
  Users,
  Award,
  BarChart2,
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
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import supabase from "../config/supabaseClient";
import { BarChart } from "@mui/x-charts/BarChart";
import PixelProfile from "../assets/pixel_profile.png";

export default function AdminLeaderboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "current_points",
    direction: "descending",
  });
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    fetchUsers();
    const subscription = supabase
      .channel("profiles")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        handleRealTimeUpdates
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.id.toString().includes(searchTerm)
    );

    const sorted = [...filtered].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    setFilteredUsers(sorted);
  }, [searchTerm, users, sortDescriptor, timeFilter]);

  const fetchUsers = async () => {
    setLoading(true);
    let query = supabase.from("profiles").select("*");

    if (timeFilter !== "all") {
      const now = new Date();
      let startDate;
      switch (timeFilter) {
        case "day":
          startDate = new Date(now.setDate(now.getDate() - 1));
          break;
        case "week":
          startDate = new Date(now.setDate(now.getDate() - 7));
          break;
        case "month":
          startDate = new Date(now.setMonth(now.getMonth() - 1));
          break;
      }
      query = query.gte("last_seen", startDate.toISOString());
    }

    const { data, error } = await query;
    if (error) {
      toast.error("Failed to fetch users");
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  const handleRealTimeUpdates = (payload) => {
    if (payload.eventType === "INSERT") {
      setUsers((prevUsers) => [...prevUsers, payload.new]);
    } else if (payload.eventType === "UPDATE") {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === payload.new.id ? payload.new : user
        )
      );
    } else if (payload.eventType === "DELETE") {
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== payload.old.id)
      );
    }
  };

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredUsers.slice(start, end);
  }, [page, rowsPerPage, filteredUsers]);

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <Toaster />
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        timeFilter={timeFilter}
        setTimeFilter={setTimeFilter}
        fetchUsers={fetchUsers}
      />
      <LeaderboardStats users={users} />
      <UsersTable
        users={paginatedUsers}
        loading={loading}
        sortDescriptor={sortDescriptor}
        setSortDescriptor={setSortDescriptor}
      />
      <div className="flex items-center justify-between">
        <Pagination
          total={Math.ceil(filteredUsers.length / rowsPerPage)}
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
    </div>
  );
}

const Header = ({
  searchTerm,
  setSearchTerm,
  timeFilter,
  setTimeFilter,
  fetchUsers,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-lg font-semibold">User Leaderboard</h1>
      <p className="text-sm text-zinc-600">
        View and analyze top CodeScript users
      </p>
      <div className="flex items-center gap-4 mt-4">
        <div className="relative w-[350px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400 size-4" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 bg-white border border-gray-200 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent placeholder:text-xs hover:border-zinc-300"
            placeholder="Search by username or ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const LeaderboardStats = ({ users }) => {
  const totalUsers = users.length;
  const totalPoints = users.reduce((sum, user) => sum + user.current_points, 0);
  const averagePoints = totalPoints / totalUsers || 0;
  const topUser = users.reduce(
    (max, user) => (max.current_points > user.current_points ? max : user),
    users[0]
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Users" value={totalUsers} icon={<Users />} />
      <StatCard title="Total Points" value={totalPoints} icon={<Award />} />
      <StatCard
        title="Average Points"
        value={averagePoints.toFixed(2)}
        icon={<BarChart2 />}
      />
      <StatCard
        title="Top User"
        value={topUser?.username || "N/A"}
        icon={<Trophy />}
      />
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <Card radius="sm">
    <CardBody className="flex flex-row items-center justify-between p-5">
      <div>
        <p className="text-xs font-semibold text-default-500">{title}</p>
        <p className="mt-5 text-xl font-medium">{value}</p>
      </div>
      <div className="p-2 rounded-full bg-primary/10">
        {React.cloneElement(icon, { size: 24, className: "text-primary" })}
      </div>
    </CardBody>
  </Card>
);

const UsersTable = ({ users, loading, sortDescriptor, setSortDescriptor }) => {
  const columns = [
    { name: "RANK", uid: "rank" },
    { name: "USER", uid: "username" },
    { name: "POINTS", uid: "current_points" },
    { name: "PROGRESS", uid: "progress" },
  ];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "rank":
        return <div className="font-bold">{user.current_rank}</div>;
      case "username":
        return (
          <div className="flex items-center gap-3">
            <Avatar
              src={user.avatar_url || PixelProfile}
              size="sm"
              isBordered
            />
            <div className="flex flex-col">
              <p className="text-sm font-semibold">{user.username}</p>
              <p className="text-xs text-default-500">{user.display_name}</p>
            </div>
          </div>
        );
      case "current_points":
        return <div className="font-semibold">{cellValue}</div>;
      case "progress":
        const progress = user.progress || 0;
        return (
          <div className="flex items-center gap-2">
            <Progress value={progress} className="max-w-md" />
            <span className="text-sm">{progress.toFixed(0)}%</span>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table
      aria-label="Users leaderboard"
      className="bg-white"
      sortDescriptor={sortDescriptor}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.uid !== "progress"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={users}
        loadingContent={<div>Loading users...</div>}
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
