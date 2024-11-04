import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  UserCheck,
  ShieldCheck,
  Container,
  ChevronDown,
  RefreshCw,
  Search,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  Input,
  Pagination,
} from "@nextui-org/react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Calendar } from "@nextui-org/react";
import { today, getLocalTimeZone } from "@internationalized/date";
import supabase from "../config/supabaseClient";

const fetchTotalUsers = async () => {
  const { data, error } = await supabase.from("profiles").select("id");
  if (error) throw error;
  return data.length;
};

const fetchActiveUsers = async () => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
  const yearStart = new Date(now.getFullYear(), 0, 1);

  const { data, error } = await supabase
    .from("profiles")
    .select("last_seen")
    .not("last_seen", "is", null);

  if (error) throw error;

  return data.reduce(
    (acc, user) => {
      const lastSeen = new Date(user.last_seen);
      if (lastSeen >= monthStart) acc.thisMonth++;
      if (lastSeen >= weekStart) acc.thisWeek++;
      if (lastSeen >= yearStart) acc.thisYear++;
      return acc;
    },
    { total: data.length, thisMonth: 0, thisWeek: 0, thisYear: 0 }
  );
};

const fetchAssessments = async () => {
  const { data, error } = await supabase.from("assessments").select("*");
  if (error) throw error;
  return data;
};

const fetchUsers = async () => {
  const { data, error } = await supabase.from("profiles").select("*");
  if (error) throw error;
  return data;
};

export default function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState({
    total: 0,
    thisMonth: 0,
    thisWeek: 0,
    thisYear: 0,
  });
  const [assessments, setAssessments] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [totalUsersData, activeUsersData, assessmentsData, usersData] =
        await Promise.all([
          fetchTotalUsers(),
          fetchActiveUsers(),
          fetchAssessments(),
          fetchUsers(),
        ]);
      setTotalUsers(totalUsersData);
      setActiveUsers(activeUsersData);
      setAssessments(assessmentsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col w-full gap-4 p-4">
      <Header refreshData={fetchData} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <DataCard
          title="Total Users"
          value={totalUsers}
          icon={<UserCheck />}
          color="primary"
          isLoading={isLoading}
        />
        <DataCard
          title="Active Users (This Month)"
          value={activeUsers.thisMonth}
          icon={<ShieldCheck />}
          color="success"
          isLoading={isLoading}
        />
        <DataCard
          title="Total Assessments"
          value={assessments.length}
          icon={<Container />}
          color="warning"
          isLoading={isLoading}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>User Activity</CardHeader>
          <CardBody>
            <BarChart
              xAxis={[
                {
                  scaleType: "band",
                  data: ["This Week", "This Month", "This Year"],
                },
              ]}
              series={[
                {
                  data: [
                    activeUsers.thisWeek || 0,
                    activeUsers.thisMonth || 0,
                    activeUsers.thisYear || 0,
                  ],
                },
              ]}
              height={300}
              colors={["#3b82f6"]}
            />
          </CardBody>
        </Card>
        <Card className="grid place-items-center">
          <CardHeader>Calendar</CardHeader>
          <CardBody>
            <Calendar
              className="mx-auto"
              aria-label="Date (Read Only)"
              value={today(getLocalTimeZone())}
              isReadOnly
            />
          </CardBody>
        </Card>
      </div>
      <UsersTable users={users} isLoading={isLoading} />
    </div>
  );
}

const Header = ({ refreshData }) => (
  <div className="flex items-center justify-between w-full">
    <h1 className="text-lg font-semibold">Dashboard</h1>
    <button
      onClick={refreshData}
      className="py-[5px] px-2 flex items-center gap-3 rounded-lg shadow shadow-zinc-100 text-xs text-zinc-600 font-semibold border border-zinc-200 outline-none"
    >
      <div className="size-[9px] rounded-full animate-pulse bg-green-500"></div>
      Update to latest
    </button>
  </div>
);

const DataCard = ({ title, value, icon, color, isLoading }) => (
  <Card radius="sm">
    <CardBody>
      <div className="flex gap-6 p-3">
        {React.cloneElement(icon, { size: 24, className: `text-${color}` })}
        <div className="space-y-4">
          <p className="text-small text-default-500">{title}</p>
          {isLoading ? (
            <Skeleton className="w-16 h-8 rounded-lg" />
          ) : (
            <p className="text-2xl font-bold">{value}</p>
          )}
        </div>
      </div>
    </CardBody>
  </Card>
);

const UsersTable = ({ users, isLoading }) => {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(["name", "status", "actions"])
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "name",
    direction: "ascending",
  });

  const headerColumns = [
    { name: "NAME", uid: "username" },
    { name: "STATUS", uid: "status" },
  ];

  const statusOptions = [
    { name: "Active", uid: "active" },
    { name: "Paused", uid: "paused" },
    { name: "Vacation", uid: "vacation" },
  ];

  const filteredItems = useMemo(() => {
    let filteredUsers = [...users];

    if (filterValue) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.avatar_url }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[user.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <ChevronDown className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search />}
            value={filterValue}
            onClear={() => onSearchChange("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDown />} variant="flat">
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<ChevronDown />} variant="flat">
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {headerColumns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            Total {users.length} users
          </span>
          <label className="flex items-center text-small text-default-400">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
      </div>
    );
  }, [selectedKeys, filteredItems.length, page, pages]);

  return (
    <Table
      aria-label="Users table"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        items={sortedItems}
        loadingContent={<Skeleton className="w-4/5 h-3" />}
        loadingState={isLoading ? "loading" : "idle"}
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

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
