
"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Store,
  ShieldCheck,
  Search,
  Plus,
  Pencil,
  Trash2,
  MoreVertical,
  Settings,
  LayoutDashboard,
  CalendarDays,
  UserRound,
  BedDouble,
  Stethoscope,
  FileText,
  Bell,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Activity,
  Package,
  ClipboardCheck,
  Check,
  XCircle,
  Clock,
} from "lucide-react";

type Role =
  | "ADMIN"
  | "DOCTOR"
  | "NURSE"
  | "SUPERVISOR"
  | "RECEPTIONIST";

type User = {
  id: number;
  name: string;
  email: string;
  role: Role;
  department: string;
  active: boolean;
  lastLogin: string;
};

type Vendor = {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  category: string;
  active: boolean;
  contractEnd: string;
};

type ApprovalStatus = "PENDING" | "APPROVED" | "REJECTED";
type ApprovalType = "Clinical Order" | "Equipment";
type Approval = {
  id: number;
  type: ApprovalType;
  title: string;
  requestedBy: string;
  department: string;
  priority: "Routine" | "Urgent";
  submittedAt: string;
  estimatedCost?: number;
  quantity?: number;
  justification: string;
  status: ApprovalStatus;
  reviewedBy?: string;
  reviewedAt?: string;
  reviewNote?: string;
};

type Tab = "users" | "vendors" | "approvals" | "settings";
type Dialog = "user" | "vendor" | "edit-user" | "edit-vendor" | null;

const roleOptions: Role[] = [
  "ADMIN",
  "DOCTOR",
  "NURSE",
  "SUPERVISOR",
  "RECEPTIONIST",
];

const departments = [
  "Administration",
  "Cardiology",
  "Nursing",
  "Operations",
  "Front Desk",
  "Pharmacy",
  "Laboratory",
];

const categories = [
  "Medical Supplies",
  "Medical Equipment",
  "Pharmaceuticals",
  "Cleaning Services",
  "Laboratory Services",
  "Other",
];

const initialUsers: User[] = [
  {
    id: 1,
    name: "Ankur Singh",
    email: "ankur@example.com",
    role: "ADMIN",
    department: "Administration",
    active: true,
    lastLogin: "Oct 15, 2026, 10:24 AM",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    role: "DOCTOR",
    department: "Cardiology",
    active: true,
    lastLogin: "Oct 14, 2026, 04:12 PM",
  },
  {
    id: 3,
    name: "Sarah Patel",
    email: "sarah@example.com",
    role: "NURSE",
    department: "Nursing",
    active: true,
    lastLogin: "Oct 14, 2026, 11:05 AM",
  },
  {
    id: 4,
    name: "Rahul Sharma",
    email: "rahul@example.com",
    role: "SUPERVISOR",
    department: "Operations",
    active: false,
    lastLogin: "Oct 10, 2026, 03:20 PM",
  },
  {
    id: 5,
    name: "Mira Khan",
    email: "mira@example.com",
    role: "RECEPTIONIST",
    department: "Front Desk",
    active: true,
    lastLogin: "Oct 15, 2026, 09:40 AM",
  },
];

const initialVendors: Vendor[] = [
  {
    id: 101,
    name: "MediSupply Co.",
    contact: "Ramesh Gupta",
    email: "ramesh@medisupply.com",
    phone: "+91 98765 43210",
    category: "Medical Supplies",
    active: true,
    contractEnd: "2026-12-31",
  },
  {
    id: 102,
    name: "TechCare Solutions",
    contact: "Priya Mehta",
    email: "priya@techcare.com",
    phone: "+91 98765 43211",
    category: "Medical Equipment",
    active: true,
    contractEnd: "2027-03-15",
  },
  {
    id: 103,
    name: "PharmaGen",
    contact: "Vikram Singh",
    email: "vikram@pharmagen.com",
    phone: "+91 98765 43212",
    category: "Pharmaceuticals",
    active: true,
    contractEnd: "2027-01-20",
  },
  {
    id: 104,
    name: "CleanPro Services",
    contact: "Neha Sharma",
    email: "neha@cleanpro.com",
    phone: "+91 98765 43213",
    category: "Cleaning Services",
    active: false,
    contractEnd: "2026-10-10",
  },
  {
    id: 105,
    name: "BioLab Diagnostics",
    contact: "Amit Kumar",
    email: "amit@biolab.com",
    phone: "+91 98765 43214",
    category: "Laboratory Services",
    active: true,
    contractEnd: "2027-02-28",
  },
];

const initialApprovals: Approval[] = [
  {
    id: 5001,
    type: "Clinical Order",
    title: "CBC and renal function tests",
    requestedBy: "Dr. John Doe",
    department: "Cardiology",
    priority: "Urgent",
    submittedAt: "Oct 15, 2026, 09:10 AM",
    justification: "Pre-procedure assessment",
    status: "PENDING",
  },
  {
    id: 5002,
    type: "Equipment",
    title: "Patient monitors",
    requestedBy: "Sarah Patel",
    department: "Nursing",
    priority: "Routine",
    submittedAt: "Oct 15, 2026, 08:45 AM",
    estimatedCost: 85000,
    quantity: 2,
    justification: "Replace aging monitors in ward B",
    status: "PENDING",
  },
  {
    id: 5003,
    type: "Clinical Order",
    title: "Chest X-ray",
    requestedBy: "Dr. John Doe",
    department: "Cardiology",
    priority: "Routine",
    submittedAt: "Oct 14, 2026, 03:20 PM",
    justification: "Diagnostic investigation",
    status: "APPROVED",
    reviewedBy: "Clinical Reviewer",
    reviewedAt: "Oct 14, 2026, 04:00 PM",
  },
  {
    id: 5004,
    type: "Equipment",
    title: "Infusion pumps",
    requestedBy: "Rahul Sharma",
    department: "Operations",
    priority: "Urgent",
    submittedAt: "Oct 14, 2026, 01:30 PM",
    estimatedCost: 42000,
    quantity: 3,
    justification: "Additional capacity for treatment area",
    status: "PENDING",
  },
];

const roleStyles: Record<Role, string> = {
  ADMIN: "bg-violet-100 text-violet-700",
  DOCTOR: "bg-blue-100 text-blue-700",
  NURSE: "bg-emerald-100 text-emerald-700",
  SUPERVISOR: "bg-amber-100 text-amber-800",
  RECEPTIONIST: "bg-slate-100 text-slate-700",
};

function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ${
        active
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-700"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          active ? "bg-emerald-500" : "bg-red-500"
        }`}
      />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-1.5 text-sm font-medium text-slate-700">
      {label}
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

export default function AdministrationPage() {
  const [tab, setTab] = useState<Tab>("users");
  const [users, setUsers] = useState(initialUsers);
  const [vendors, setVendors] = useState(initialVendors);
  const [approvals, setApprovals] = useState(initialApprovals);
  const [approvalFilter, setApprovalFilter] = useState<"ALL" | ApprovalStatus>("ALL");
  const [rejectingApproval, setRejectingApproval] = useState<Approval | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [dialog, setDialog] = useState<Dialog>(null);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [editingVendorId, setEditingVendorId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "user" | "vendor";
    id: number;
    name: string;
  } | null>(null);

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "DOCTOR" as Role,
    department: "Cardiology",
  });

  const [vendorForm, setVendorForm] = useState({
    name: "",
    contact: "",
    email: "",
    phone: "",
    category: "Medical Supplies",
    contractEnd: "",
  });

  const [notice, setNotice] = useState("");

  const activeUsers = users.filter((user) => user.active).length;
  const activeVendors = vendors.filter((vendor) => vendor.active).length;
  const pendingApprovals = approvals.filter((item) => item.status === "PENDING").length;

  const reviewApproval = (id: number, status: "APPROVED" | "REJECTED", note = "") => {
    const reviewedAt = new Date().toLocaleString();
    setApprovals((current) => current.map((item) => item.id === id
      ? { ...item, status, reviewedBy: "Current Administrator", reviewedAt, reviewNote: note }
      : item));
    setNotice(`Request #${id} ${status.toLowerCase()}.`);
    setRejectingApproval(null);
    setRejectionReason("");
  };

  const filteredUsers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        `${user.name} ${user.email} ${user.department}`
          .toLowerCase()
          .includes(query);

      return (
        matchesSearch &&
        (roleFilter === "ALL" || user.role === roleFilter) &&
        (statusFilter === "ALL" ||
          (statusFilter === "ACTIVE" ? user.active : !user.active))
      );
    });
  }, [users, search, roleFilter, statusFilter]);

  const filteredVendors = useMemo(() => {
    const query = search.toLowerCase().trim();

    return vendors.filter((vendor) => {
      const matchesSearch =
        `${vendor.name} ${vendor.contact} ${vendor.email} ${vendor.phone}`
          .toLowerCase()
          .includes(query);

      return (
        matchesSearch &&
        (categoryFilter === "ALL" ||
          vendor.category === categoryFilter) &&
        (statusFilter === "ALL" ||
          (statusFilter === "ACTIVE" ? vendor.active : !vendor.active))
      );
    });
  }, [vendors, search, categoryFilter, statusFilter]);

  const resetFilters = () => {
    setSearch("");
    setRoleFilter("ALL");
    setCategoryFilter("ALL");
    setStatusFilter("ALL");
  };

  const openNewUser = () => {
    setEditingUserId(null);
    setUserForm({
      name: "",
      email: "",
      role: "DOCTOR",
      department: "Cardiology",
    });
    setDialog("user");
  };

  const openEditUser = (user: User) => {
    setEditingUserId(user.id);
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
    });
    setDialog("edit-user");
  };

  const openNewVendor = () => {
    setEditingVendorId(null);
    setVendorForm({
      name: "",
      contact: "",
      email: "",
      phone: "",
      category: "Medical Supplies",
      contractEnd: "",
    });
    setDialog("vendor");
  };

  const openEditVendor = (vendor: Vendor) => {
    setEditingVendorId(vendor.id);
    setVendorForm({
      name: vendor.name,
      contact: vendor.contact,
      email: vendor.email,
      phone: vendor.phone,
      category: vendor.category,
      contractEnd: vendor.contractEnd,
    });
    setDialog("edit-vendor");
  };

  const saveUser = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingUserId !== null) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUserId
            ? { ...user, ...userForm }
            : user
        )
      );
      setNotice("User updated successfully.");
    } else {
      setUsers((current) => [
        ...current,
        {
          id: Math.max(0, ...current.map((user) => user.id)) + 1,
          ...userForm,
          active: true,
          lastLogin: "Never",
        },
      ]);
      setNotice("User added successfully.");
    }

    setDialog(null);
  };

  const saveVendor = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editingVendorId !== null) {
      setVendors((current) =>
        current.map((vendor) =>
          vendor.id === editingVendorId
            ? { ...vendor, ...vendorForm }
            : vendor
        )
      );
      setNotice("Vendor updated successfully.");
    } else {
      setVendors((current) => [
        ...current,
        {
          id: Math.max(100, ...current.map((vendor) => vendor.id)) + 1,
          ...vendorForm,
          active: true,
        },
      ]);
      setNotice("Vendor added successfully.");
    }

    setDialog(null);
  };

  const toggleUserStatus = (id: number) => {
    setUsers((current) =>
      current.map((user) =>
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
    setNotice("User status updated.");
  };

  const toggleVendorStatus = (id: number) => {
    setVendors((current) =>
      current.map((vendor) =>
        vendor.id === id
          ? { ...vendor, active: !vendor.active }
          : vendor
      )
    );
    setNotice("Vendor status updated.");
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    if (deleteTarget.type === "user") {
      setUsers((current) =>
        current.filter((user) => user.id !== deleteTarget.id)
      );
    } else {
      setVendors((current) =>
        current.filter((vendor) => vendor.id !== deleteTarget.id)
      );
    }

    setNotice(`${deleteTarget.name} deleted.`);
    setDeleteTarget(null);
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { label: "Appointments", icon: CalendarDays, href: "/appointments" },
    { label: "Patients", icon: Users, href: "/patients" },
    { label: "Bed Management", icon: BedDouble, href: "/beds" },
    { label: "Doctors", icon: Stethoscope, href: "/doctors" },
    { label: "Reports", icon: FileText, href: "/reports" },
  ];

  const showDialog = dialog !== null;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      {/* <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-[72px] items-center gap-3 border-b px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Activity className="h-6 w-6" />
          </div>
          <div>
            <p className="font-bold">CareHub</p>
            <p className="text-xs text-slate-500">Patient Management</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 transition hover:bg-slate-100"
            >
              <Icon className="h-[18px] w-[18px]" />
              {label}
            </a>
          ))}

          <button
            onClick={() => setTab("users")}
            className="flex w-full items-center gap-3 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700"
          >
            <Settings className="h-[18px] w-[18px]" />
            Administration
          </button>

          <a
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-100"
          >
            <Settings className="h-[18px] w-[18px]" />
            Settings
          </a>
        </nav>

        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold">
              AS
            </div>
            <div>
              <p className="text-sm font-semibold">Ankur Singh</p>
              <p className="text-xs text-slate-500">Administrator</p>
            </div>
          </div>
        </div>
      </aside> */}

      {/* Main content */}
      <main className="min-w-0 flex-1">

        <div className="space-y-6 p-4 sm:p-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Administration
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage users, vendors, permissions and system access.
            </p>
          </div>

          {notice && (
            <div
              role="status"
              className="flex items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
            >
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {notice}
              </span>
              <button
                onClick={() => setNotice("")}
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Statistics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Users",
                value: users.length,
                sub: `${activeUsers} active accounts`,
                icon: Users,
                color: "bg-blue-50 text-blue-600",
              },
              {
                label: "Active Users",
                value: activeUsers,
                sub: `${users.length - activeUsers} inactive accounts`,
                icon: ShieldCheck,
                color: "bg-emerald-50 text-emerald-600",
              },
              {
                label: "Total Vendors",
                value: vendors.length,
                sub: `${categories.length - 1} vendor categories`,
                icon: Store,
                color: "bg-violet-50 text-violet-600",
              },
              {
                label: "Active Vendors",
                value: activeVendors,
                sub: `${vendors.length - activeVendors} inactive vendors`,
                icon: Package,
                color: "bg-amber-50 text-amber-600",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-slate-500">
                        {item.label}
                      </p>
                      <p className="mt-2 text-3xl font-bold">
                        {item.value}
                      </p>
                    </div>
                    <div className={`rounded-xl p-3 ${item.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    {item.sub}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Tabs */}
          <div className="flex gap-6 overflow-x-auto border-b border-slate-200">
            {[
              { id: "users" as const, label: "Users", icon: Users },
              { id: "vendors" as const, label: "Vendors", icon: Store },
              { id: "approvals" as const, label: "Approvals", icon: ClipboardCheck },
              {
                id: "settings" as const,
                label: "System Settings",
                icon: Settings,
              },
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setTab(id);
                  resetFilters();
                }}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-2 pb-3 text-sm font-medium transition ${
                  tab === id
                    ? "border-emerald-600 text-emerald-700"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          {/* Users */}
          {tab === "users" && (
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-4 p-5 xl:flex-row xl:items-center">
                <div>
                  <h2 className="text-lg font-bold">Users</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage system users, roles and access.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={roleFilter}
                    onChange={(event) => setRoleFilter(event.target.value)}
                    className={`${inputClass} w-auto min-w-32`}
                    aria-label="Filter by role"
                  >
                    <option value="ALL">All Roles</option>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className={`${inputClass} w-auto min-w-32`}
                    aria-label="Filter by status"
                  >
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>

                  <button
                    onClick={openNewUser}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add User
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead className="border-y bg-slate-50 text-xs text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-medium">User</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Role</th>
                      <th className="px-4 py-3 font-medium">Department</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Last Login</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold">
                              {user.name
                                .split(" ")
                                .map((part) => part[0])
                                .slice(0, 2)
                                .join("")
                                .toUpperCase()}
                            </div>
                            <span className="whitespace-nowrap font-medium">
                              {user.name}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-500">
                          {user.email}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`rounded-md px-2 py-1 text-[11px] font-semibold ${roleStyles[user.role]}`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600">
                          {user.department}
                        </td>
                        <td className="px-4 py-3">
                          <StatusBadge active={user.active} />
                        </td>
                        <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => openEditUser(user)}
                              className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs hover:bg-slate-100"
                            >
                              <Pencil className="h-3 w-3" />
                              Edit
                            </button>
                            <details className="relative">
                              <summary className="list-none cursor-pointer rounded-md p-2 hover:bg-slate-100">
                                <MoreVertical className="h-4 w-4" />
                              </summary>
                              <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border bg-white p-1 shadow-lg">
                                <button
                                  onClick={() => toggleUserStatus(user.id)}
                                  className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50"
                                >
                                  {user.active
                                    ? "Deactivate user"
                                    : "Activate user"}
                                </button>
                                <button
                                  onClick={() =>
                                    setDeleteTarget({
                                      type: "user",
                                      id: user.id,
                                      name: user.name,
                                    })
                                  }
                                  className="w-full rounded-md px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
                                >
                                  Delete user
                                </button>
                              </div>
                            </details>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {filteredUsers.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-5 py-12 text-center text-sm text-slate-500"
                        >
                          No users match your search or filters.
                          <button
                            onClick={resetFilters}
                            className="ml-2 font-medium text-emerald-700"
                          >
                            Clear filters
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-xs text-slate-500">
                <span>
                  Showing {filteredUsers.length} of {users.length} users
                </span>
                <span>Role and account management</span>
              </div>
            </section>
          )}

          {/* Vendors */}
          {tab === "vendors" && (
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-4 p-5 xl:flex-row xl:items-center">
                <div>
                  <h2 className="text-lg font-bold">Vendors</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Manage suppliers, contact details and contracts.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={categoryFilter}
                    onChange={(event) =>
                      setCategoryFilter(event.target.value)
                    }
                    className={`${inputClass} w-auto min-w-36`}
                    aria-label="Filter by vendor category"
                  >
                    <option value="ALL">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <select
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    className={`${inputClass} w-auto min-w-32`}
                    aria-label="Filter vendors by status"
                  >
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>

                  <button
                    onClick={openNewVendor}
                    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Vendor
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left text-sm">
                  <thead className="border-y bg-slate-50 text-xs text-slate-500">
                    <tr>
                      <th className="px-5 py-3 font-medium">Vendor</th>
                      <th className="px-4 py-3 font-medium">Contact</th>
                      <th className="px-4 py-3 font-medium">Email</th>
                      <th className="px-4 py-3 font-medium">Phone</th>
                      <th className="px-4 py-3 font-medium">Category</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Contract End</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredVendors.map((vendor) => {
                      const expired =
                        new Date(`${vendor.contractEnd}T23:59:59`) <
                        new Date();

                      return (
                        <tr
                          key={vendor.id}
                          className="hover:bg-slate-50/70"
                        >
                          <td className="whitespace-nowrap px-5 py-3 font-medium">
                            {vendor.name}
                          </td>
                          <td className="px-4 py-3 text-slate-600">
                            {vendor.contact}
                          </td>
                          <td className="px-4 py-3 text-slate-500">
                            {vendor.email}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                            {vendor.phone}
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] text-blue-700">
                              {vendor.category}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge active={vendor.active} />
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-xs">
                            <span
                              className={
                                expired
                                  ? "font-medium text-red-600"
                                  : "text-slate-600"
                              }
                            >
                              {vendor.contractEnd}
                              {expired ? " · Expired" : ""}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => openEditVendor(vendor)}
                                className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs hover:bg-slate-100"
                              >
                                <Pencil className="h-3 w-3" />
                                Edit
                              </button>
                              <details className="relative">
                                <summary className="list-none cursor-pointer rounded-md p-2 hover:bg-slate-100">
                                  <MoreVertical className="h-4 w-4" />
                                </summary>
                                <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border bg-white p-1 shadow-lg">
                                  <button
                                    onClick={() =>
                                      toggleVendorStatus(vendor.id)
                                    }
                                    className="w-full rounded-md px-3 py-2 text-left text-xs hover:bg-slate-50"
                                  >
                                    {vendor.active
                                      ? "Deactivate vendor"
                                      : "Activate vendor"}
                                  </button>
                                  <button
                                    onClick={() =>
                                      setDeleteTarget({
                                        type: "vendor",
                                        id: vendor.id,
                                        name: vendor.name,
                                      })
                                    }
                                    className="w-full rounded-md px-3 py-2 text-left text-xs text-red-600 hover:bg-red-50"
                                  >
                                    Delete vendor
                                  </button>
                                </div>
                              </details>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {filteredVendors.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-12 text-center text-sm text-slate-500"
                        >
                          No vendors match your search or filters.
                          <button
                            onClick={resetFilters}
                            className="ml-2 font-medium text-emerald-700"
                          >
                            Clear filters
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 p-4 text-xs text-slate-500">
                <span>
                  Showing {filteredVendors.length} of {vendors.length} vendors
                </span>
                <span>Vendor and contract management</span>
              </div>
            </section>
          )}

          {/* Clinical orders and equipment approvals */}
          {tab === "approvals" && (
            <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold">Clinical Orders & Equipment</h2>
                    <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800">{pendingApprovals} pending</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">Review requests, record decisions, and track approval history.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <select value={approvalFilter} onChange={(event) => setApprovalFilter(event.target.value as "ALL" | ApprovalStatus)} className={`${inputClass} w-auto min-w-36`} aria-label="Filter approval status">
                    <option value="ALL">All requests</option>
                    <option value="PENDING">Pending</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-3 px-5 pb-5 sm:grid-cols-3">
                {([
                  { label: "Pending review", value: approvals.filter((item) => item.status === "PENDING").length, icon: Clock, color: "text-amber-700 bg-amber-50" },
                  { label: "Approved", value: approvals.filter((item) => item.status === "APPROVED").length, icon: CheckCircle2, color: "text-emerald-700 bg-emerald-50" },
                  { label: "Rejected", value: approvals.filter((item) => item.status === "REJECTED").length, icon: XCircle, color: "text-red-700 bg-red-50" },
                ]).map((stat) => {
                  const Icon = stat.icon;
                  return <div key={stat.label} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3"><span className={`rounded-lg p-2 ${stat.color}`}><Icon className="h-4 w-4" /></span><div><p className="text-xs text-slate-500">{stat.label}</p><p className="text-xl font-bold">{stat.value}</p></div></div>;
                })}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[1050px] text-left text-sm">
                  <thead className="border-y bg-slate-50 text-xs text-slate-500"><tr>
                    <th className="px-5 py-3 font-medium">Request</th><th className="px-4 py-3 font-medium">Requested by</th><th className="px-4 py-3 font-medium">Department</th><th className="px-4 py-3 font-medium">Priority</th><th className="px-4 py-3 font-medium">Submitted</th><th className="px-4 py-3 font-medium">Status</th><th className="px-4 py-3 font-medium">Review / Actions</th>
                  </tr></thead>
                  <tbody className="divide-y divide-slate-100">
                    {approvals.filter((item) => approvalFilter === "ALL" || item.status === approvalFilter).map((item) => (
                      <tr key={item.id} className="align-top hover:bg-slate-50/70">
                        <td className="px-5 py-4"><div className="flex items-start gap-3"><span className={`rounded-lg p-2 ${item.type === "Clinical Order" ? "bg-blue-50 text-blue-700" : "bg-violet-50 text-violet-700"}`}>{item.type === "Clinical Order" ? <Stethoscope className="h-4 w-4" /> : <Package className="h-4 w-4" />}</span><div><p className="font-semibold">{item.title}</p><p className="mt-1 text-xs text-slate-500">#{item.id} · {item.type}</p><p className="mt-1 max-w-xs text-xs text-slate-500">{item.justification}</p>{item.quantity && <p className="mt-1 text-xs text-slate-600">Quantity: {item.quantity}</p>}{item.estimatedCost !== undefined && <p className="mt-1 text-xs text-slate-600">Estimated cost: ₹{item.estimatedCost.toLocaleString("en-IN")}</p>}</div></div></td>
                        <td className="px-4 py-4">{item.requestedBy}</td><td className="px-4 py-4 text-slate-600">{item.department}</td>
                        <td className="px-4 py-4"><span className={`rounded-md px-2 py-1 text-xs font-medium ${item.priority === "Urgent" ? "bg-red-50 text-red-700" : "bg-slate-100 text-slate-600"}`}>{item.priority}</span></td>
                        <td className="whitespace-nowrap px-4 py-4 text-xs text-slate-500">{item.submittedAt}</td>
                        <td className="px-4 py-4"><span className={`rounded-md px-2 py-1 text-xs font-medium ${item.status === "PENDING" ? "bg-amber-50 text-amber-700" : item.status === "APPROVED" ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-700"}`}>{item.status}</span>{item.reviewedBy && <p className="mt-2 text-xs text-slate-500">By {item.reviewedBy}</p>}{item.reviewNote && <p className="mt-1 max-w-48 text-xs text-red-600">Reason: {item.reviewNote}</p>}</td>
                        <td className="px-4 py-4">{item.status === "PENDING" ? <div className="flex flex-wrap gap-2"><button onClick={() => reviewApproval(item.id, "APPROVED")} className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"><Check className="h-3.5 w-3.5" /> Approve</button><button onClick={() => { setRejectingApproval(item); setRejectionReason(""); }} className="inline-flex items-center gap-1 rounded-md border border-red-200 px-2.5 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50"><XCircle className="h-3.5 w-3.5" /> Reject</button></div> : <span className="text-xs text-slate-500">{item.reviewedAt || "Reviewed"}</span>}</td>
                      </tr>
                    ))}
                    {approvals.filter((item) => approvalFilter === "ALL" || item.status === approvalFilter).length === 0 && <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-500">No requests in this status.</td></tr>}
                  </tbody>
                </table>
              </div>
              <p className="border-t p-4 text-xs leading-5 text-slate-500">Clinical orders must be reviewed by an appropriately authorized clinician. Equipment approvals should follow your organization's procurement and budget policy. Decisions shown here are demo-only until connected to a secured backend.</p>
            </section>
          )}

          {rejectingApproval && (
            <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/40 p-4">
              <form onSubmit={(event) => { event.preventDefault(); reviewApproval(rejectingApproval.id, "REJECTED", rejectionReason.trim()); }} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                <h2 className="text-lg font-bold">Reject request #{rejectingApproval.id}</h2>
                <p className="mt-1 text-sm text-slate-500">{rejectingApproval.title}</p>
                <label className="mt-4 grid gap-1.5 text-sm font-medium text-slate-700">Reason for rejection<textarea required minLength={3} value={rejectionReason} onChange={(event) => setRejectionReason(event.target.value)} placeholder="Explain what needs to change..." className={inputClass} rows={3} /></label>
                <div className="mt-5 flex justify-end gap-2"><button type="button" onClick={() => setRejectingApproval(null)} className="rounded-lg border px-4 py-2.5 text-sm">Cancel</button><button type="submit" className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700">Confirm rejection</button></div>
              </form>
            </div>
          )}

          {/* System settings */}
          {tab === "settings" && (
            <section className="space-y-4 rounded-xl border bg-white p-5 shadow-sm">
              <div>
                <h2 className="text-lg font-bold">System Settings</h2>
                <p className="mt-1 text-sm text-slate-500">
                  Configure administrative defaults and security policies.
                </p>
              </div>

              <div className="divide-y">
                <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">User registration</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Allow administrators to create user accounts.
                    </p>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    Admin managed
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">Role-based access control</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Limit actions according to each user's assigned role.
                    </p>
                  </div>
                  <span className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    Recommended
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">Vendor contract reviews</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Review contracts before renewal or expiration.
                    </p>
                  </div>
                  <span className="rounded-md bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                    {vendors.filter((vendor) => {
                      const end = new Date(`${vendor.contractEnd}T00:00:00`);
                      const days = (end.getTime() - Date.now()) / 86400000;
                      return days >= 0 && days <= 30;
                    }).length}{" "}
                    due within 30 days
                  </span>
                </div>
              </div>

              <p className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                These settings are informational examples. Connect them to
                your backend before treating them as enforced security
                policies.
              </p>
            </section>
          )}
        </div>
      </main>

      {/* Add/Edit dialogs */}
      {showDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDialog(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b p-5">
              <div>
                <h2 className="text-lg font-bold">
                  {dialog === "user"
                    ? "Add New User"
                    : dialog === "edit-user"
                    ? "Edit User"
                    : dialog === "vendor"
                    ? "Add New Vendor"
                    : "Edit Vendor"}
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {dialog === "user" || dialog === "edit-user"
                    ? "Enter account details and assign a role."
                    : "Enter vendor contact and contract information."}
                </p>
              </div>
              <button
                onClick={() => setDialog(null)}
                aria-label="Close dialog"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {(dialog === "user" || dialog === "edit-user") && (
              <form onSubmit={saveUser} className="space-y-4 p-5">
                <Field label="Full name">
                  <input
                    required
                    value={userForm.name}
                    onChange={(event) =>
                      setUserForm({
                        ...userForm,
                        name: event.target.value,
                      })
                    }
                    placeholder="Enter full name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Email address">
                  <input
                    required
                    type="email"
                    value={userForm.email}
                    onChange={(event) =>
                      setUserForm({
                        ...userForm,
                        email: event.target.value,
                      })
                    }
                    placeholder="user@example.com"
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Role">
                    <select
                      value={userForm.role}
                      onChange={(event) =>
                        setUserForm({
                          ...userForm,
                          role: event.target.value as Role,
                        })
                      }
                      className={inputClass}
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Department">
                    <select
                      value={userForm.department}
                      onChange={(event) =>
                        setUserForm({
                          ...userForm,
                          department: event.target.value,
                        })
                      }
                      className={inputClass}
                    >
                      {departments.map((department) => (
                        <option key={department} value={department}>
                          {department}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="flex justify-end gap-2 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setDialog(null)}
                    className="rounded-lg border px-4 py-2.5 text-sm hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    {dialog === "edit-user" ? "Save Changes" : "Add User"}
                  </button>
                </div>
              </form>
            )}

            {(dialog === "vendor" || dialog === "edit-vendor") && (
              <form onSubmit={saveVendor} className="space-y-4 p-5">
                <Field label="Vendor name">
                  <input
                    required
                    value={vendorForm.name}
                    onChange={(event) =>
                      setVendorForm({
                        ...vendorForm,
                        name: event.target.value,
                      })
                    }
                    placeholder="Company name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Contact person">
                  <input
                    required
                    value={vendorForm.contact}
                    onChange={(event) =>
                      setVendorForm({
                        ...vendorForm,
                        contact: event.target.value,
                      })
                    }
                    placeholder="Contact person's name"
                    className={inputClass}
                  />
                </Field>

                <Field label="Email address">
                  <input
                    required
                    type="email"
                    value={vendorForm.email}
                    onChange={(event) =>
                      setVendorForm({
                        ...vendorForm,
                        email: event.target.value,
                      })
                    }
                    placeholder="vendor@example.com"
                    className={inputClass}
                  />
                </Field>

                <Field label="Phone number">
                  <input
                    required
                    type="tel"
                    value={vendorForm.phone}
                    onChange={(event) =>
                      setVendorForm({
                        ...vendorForm,
                        phone: event.target.value,
                      })
                    }
                    placeholder="+91 ..."
                    className={inputClass}
                  />
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Category">
                    <select
                      value={vendorForm.category}
                      onChange={(event) =>
                        setVendorForm({
                          ...vendorForm,
                          category: event.target.value,
                        })
                      }
                      className={inputClass}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Contract end date">
                    <input
                      required
                      type="date"
                      value={vendorForm.contractEnd}
                      onChange={(event) =>
                        setVendorForm({
                          ...vendorForm,
                          contractEnd: event.target.value,
                        })
                      }
                      className={inputClass}
                    />
                  </Field>
                </div>

                <div className="flex justify-end gap-2 border-t pt-4">
                  <button
                    type="button"
                    onClick={() => setDialog(null)}
                    className="rounded-lg border px-4 py-2.5 text-sm hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    {dialog === "edit-vendor"
                      ? "Save Changes"
                      : "Add Vendor"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/40 p-4">
          <div
            role="alertdialog"
            aria-modal="true"
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 className="h-5 w-5" />
            </div>
            <h2 className="text-lg font-bold">
              Delete {deleteTarget.type}?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <strong className="text-slate-800">
                {deleteTarget.name}
              </strong>
              ? This action removes it from this page's current data.
            </p>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="rounded-lg border px-4 py-2.5 text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
