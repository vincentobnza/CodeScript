import React, { useState, useEffect, useMemo } from "react";
import { Search, X, Trash2, Edit2, ChevronDown, BarChart2 } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
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
} from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import supabase from "../config/supabaseClient";
import { LoaderCircle } from "lucide-react";
import PixelProfile from "../assets/pixel_profile.png";
import { BarChart } from "@mui/x-charts/BarChart";

export default function UserProfiles() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedUsername, setEditedUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "username",
    direction: "ascending",
  });
  const [statusFilter, setStatusFilter] = useState("all");

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
        (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id.toString().includes(searchTerm)) &&
        (statusFilter === "all" || user.status === statusFilter)
    );

    const sorted = [...filtered].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    setFilteredUsers(sorted);
  }, [searchTerm, users, statusFilter, sortDescriptor]);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      toast.error("Failed to fetch users");
    } else {
      setUsers(data);
    }
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

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", selectedUser.id);

    if (error) {
      setLoading(false);
      toast.error("Failed to delete user");
    } else {
      setTimeout(() => {
        fetchUsers();
        setLoading(false);
        toast.success("User deleted successfully", {
          style: {
            borderRadius: "5px",
            background: "#fff",
            color: "#121212",
            fontSize: "12px",
          },
        });
        setIsOpen(false);
        setIsDeleteModalOpen(false);
      }, 1000);
    }
  };

  const handleEdit = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ username: editedUsername })
      .eq("id", selectedUser.id);

    if (error) {
      toast.error("Failed to update user");
    } else {
      toast.success("User updated successfully", {
        style: {
          borderRadius: "5px",
          background: "#fff",
          color: "#121212",
          fontSize: "12px",
        },
      });
      setIsOpen(false);
      setIsEditModalOpen(false);
      setSelectedUser({ ...selectedUser, username: editedUsername });
    }
  };

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredUsers.slice(start, end);
  }, [page, rowsPerPage, filteredUsers]);

  return (
    <div className="flex flex-col w-full gap-2 space-y-6">
      <Toaster />
      <Header
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <UserStats users={users} />
      <UsersTable
        users={paginatedUsers}
        handleRowClick={handleRowClick}
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
      <UserDrawer
        open={isOpen}
        setIsOpen={setIsOpen}
        user={selectedUser}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        setEditedUsername={setEditedUsername}
      />
      <DeleteConfirmationModal
        loading={loading}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onConfirm={handleEdit}
        username={editedUsername}
        setUsername={setEditedUsername}
      />
    </div>
  );
}

const Header = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex flex-col w-full gap-2">
      <h1 className="text-lg font-medium">Users</h1>
      <p className="text-sm text-zinc-600">View and manage CodeScript Users</p>
      <div className="flex items-center gap-2 mt-8">
        <div className="relative w-[350px]">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400 size-4" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 bg-white border border-gray-200 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-zinc-200 focus:border-transparent hover:border-zinc-300 placeholder:text-xs"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Dropdown>
          <DropdownTrigger>
            <button className="px-4 py-[0.5rem] flex items-center gap-2 text-xs shadow border rounded border-zinc-200 outline-none">
              Status: {statusFilter === "all" ? "All" : statusFilter}
              <ChevronDown />
            </button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Status filter"
            onAction={(key) => setStatusFilter(key)}
          >
            <DropdownItem key="all">All</DropdownItem>
            <DropdownItem key="online">Online</DropdownItem>
            <DropdownItem key="offline">Offline</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};

const UserStats = ({ users }) => {
  const totalUsers = users.length;
  const onlineUsers = users.filter((user) => user.status === "online").length;
  const averagePoints =
    users.reduce((sum, user) => sum + user.current_points, 0) / totalUsers;

  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex items-center justify-between p-5">
          <div>
            <h2 className="mb-4 text-lg font-semibold">User Statistics</h2>
            <div className="space-y-3 text-sm">
              <p>Total Users: {totalUsers}</p>
              <p>Online Users: {onlineUsers}</p>
              <p>Average Points: {averagePoints.toFixed(2)}</p>
            </div>
          </div>
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["Total", "Online", "Avg Points"] },
            ]}
            series={[{ data: [totalUsers, onlineUsers, averagePoints] }]}
            width={300}
            height={200}
            colors={["#3b82f6", "#22c55e", "#ef4444"]}
          />
        </div>
      </CardBody>
    </Card>
  );
};

const UsersTable = ({
  users,
  handleRowClick,
  loading,
  sortDescriptor,
  setSortDescriptor,
}) => {
  return (
    <div className="w-full">
      <Table
        aria-label="Users table"
        className="bg-white"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <TableHeader>
          <TableColumn key="id" allowsSorting>
            User ID
          </TableColumn>
          <TableColumn key="username" allowsSorting>
            Username
          </TableColumn>
          <TableColumn key="display_name" allowsSorting>
            Display Name
          </TableColumn>
          <TableColumn key="status" allowsSorting className="text-center">
            Status
          </TableColumn>
          <TableColumn
            key="current_points"
            allowsSorting
            className="text-center"
          >
            Current Points
          </TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              onClick={() => handleRowClick(user)}
              className="cursor-pointer"
            >
              <TableCell>
                <div className="flex items-center gap-6">
                  <Avatar
                    src={user.avatar_url || PixelProfile}
                    isBordered
                    size="md"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-md">{user.username}</p>
                    <h1 className="text-xs text-zinc-500">{user.id}</h1>
                  </div>
                </div>
              </TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.display_name}</TableCell>
              <TableCell className="text-center">
                <h1>
                  {user.status === "online" ? (
                    <span className="px-2 font-medium text-green-500 bg-green-100 border border-green-200 rounded-full">
                      Online
                    </span>
                  ) : (
                    <span className="px-2 font-medium border rounded-full text-zinc-500 bg-zinc-100 border-zinc-200">
                      Offline
                    </span>
                  )}
                </h1>
              </TableCell>
              <TableCell>
                <div className="text-center">{user.current_points}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const UserDrawer = ({
  open,
  setIsOpen,
  user,
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setEditedUsername,
}) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.2 }}
          className="fixed right-0 z-10 h-screen overflow-y-auto bg-white border-l top-9 w-80 border-zinc-100"
        >
          <div className="w-full space-y-4">
            <div className="grid w-full p-4 border-b h-22 border-zinc-200 place-items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-2">
                  <h1 className=" text-md text-zinc-700">User Details</h1>
                </div>
                <div className="grid border rounded-lg size-8 border-zinc-200 place-items-center">
                  <X
                    size={18}
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer text-zinc-500"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="id" className="text-xs font-bold text-zinc-400">
                  User ID
                </label>

                <h1 className="text-sm">{user.id}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="username"
                  className="text-xs font-bold text-zinc-400"
                >
                  Username
                </label>
                <h1 className="text-sm">{user.username}</h1>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="display_name"
                  className="text-xs font-bold text-zinc-400"
                >
                  Display Name
                </label>
                <h1 className="text-sm">{user.display_name}</h1>
              </div>

              <div className="flex justify-end w-full">
                <button
                  className="px-3 py-2 text-xs font-semibold border border-zinc-200"
                  onClick={() => {
                    setEditedUsername(user.username);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="w-full p-6 space-y-6 border-t border-zinc-200">
              <div className="flex flex-col gap-2">
                <h1 className="font-medium text-md text-amber-600">
                  Danger Zone
                </h1>
                <p className="text-xs text-zinc-500">
                  Be cautious with the following features, as they are
                  irreversible.
                </p>
              </div>
              <div className="flex flex-col w-full gap-4">
                <div className="flex flex-col gap-1">
                  <h1 className="text-sm">Delete User</h1>
                  <p className="text-xs text-zinc-500">
                    This user will no longer have access to the system
                  </p>
                </div>
                <button
                  className="flex items-center justify-center w-full gap-2 px-4 py-3 text-xs font-medium text-red-600 border border-red-300 bg-red-50"
                  onClick={() => setIsDeleteModalOpen(true)}
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, loading }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} radius="none">
      <ModalContent>
        <ModalHeader className="border-b border-zinc-200">
          <h1>Confirm Deletion</h1>
        </ModalHeader>
        <ModalBody>
          <p className="text-sm text-zinc-600">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
        </ModalBody>
        <ModalFooter className="border-t border-zinc-200">
          <div className="flex items-center gap-1">
            <button
              onClick={onClose}
              className="py-2 px-4 rounded  bg-zinc-200 text-[13px] font-medium"
            >
              No, Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex items-center gap-2 py-2 px-4 rounded  bg-red-500 text-[13px] font-medium text-white"
            >
              Delete User
              {loading && <LoaderCircle className="animate-spin" size={15} />}
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const EditUserModal = ({
  isOpen,
  onClose,
  onConfirm,
  username,
  setUsername,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} radius="none">
      <ModalContent>
        <ModalHeader>Edit User</ModalHeader>
        <ModalBody>
          <Input
            radius="none"
            variant="bordered"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="default" onClick={onClose} radius="sm">
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={onConfirm}
            radius="sm"
            className="bg-green-600"
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
