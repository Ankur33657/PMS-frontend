"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  ClipboardPenLine,
  Clock3,
  Filter,
  FlaskConical,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Truck,
  X,
} from "lucide-react";

type OrderStatus =
  | "Pending"
  | "Approved"
  | "In Progress"
  | "Delivered"
  | "Cancelled"
  | "Rejected";

type OrderType = "Medication" | "Lab Test" | "Imaging" | "Equipment" | "Medical Supply";

type ClinicalOrder = {
  id: string;
  item: string;
  type: OrderType;
  patient: string;
  patientId: string;
  department: string;
  requestedBy: string;
  quantity: number;
  priority: "Routine" | "Urgent" | "STAT";
  status: OrderStatus;
  vendor: string;
  orderDate: string;
  expectedDate: string;
  cost: number;
  notes: string;
};

const initialOrders: ClinicalOrder[] = [
  {
    id: "CO-1048",
    item: "Complete Blood Count (CBC)",
    type: "Lab Test",
    patient: "Eleanor Vance",
    patientId: "PT-10081",
    department: "Cardiology",
    requestedBy: "Dr. Sarah Vance",
    quantity: 1,
    priority: "Urgent",
    status: "In Progress",
    vendor: "Central Laboratory",
    orderDate: "2026-10-15",
    expectedDate: "2026-10-15",
    cost: 650,
    notes: "Priority sample collection requested.",
  },
  {
    id: "CO-1047",
    item: "Portable ECG Machine",
    type: "Equipment",
    patient: "Ward 3",
    patientId: "WARD-03",
    department: "Nursing",
    requestedBy: "Mira Patel",
    quantity: 2,
    priority: "Urgent",
    status: "Approved",
    vendor: "TechCare Solutions",
    orderDate: "2026-10-15",
    expectedDate: "2026-10-18",
    cost: 48000,
    notes: "For bedside cardiac monitoring.",
  },
  {
    id: "CO-1046",
    item: "Amoxicillin 500 mg",
    type: "Medication",
    patient: "Marcus Vance",
    patientId: "PT-10092",
    department: "General Medicine",
    requestedBy: "Dr. John Doe",
    quantity: 20,
    priority: "Routine",
    status: "Pending",
    vendor: "PharmaGen",
    orderDate: "2026-10-15",
    expectedDate: "2026-10-17",
    cost: 420,
    notes: "Requires authorized clinical review.",
  },
  {
    id: "CO-1045",
    item: "Chest X-ray",
    type: "Imaging",
    patient: "Warren Douglas",
    patientId: "PT-10077",
    department: "Emergency",
    requestedBy: "Dr. Anita Chen",
    quantity: 1,
    priority: "STAT",
    status: "In Progress",
    vendor: "Radiology Department",
    orderDate: "2026-10-15",
    expectedDate: "2026-10-15",
    cost: 1200,
    notes: "Urgent imaging request.",
  },
  {
    id: "CO-1044",
    item: "Sterile Examination Gloves",
    type: "Medical Supply",
    patient: "General Stock",
    patientId: "STOCK",
    department: "Central Supply",
    requestedBy: "Rahul Sharma",
    quantity: 50,
    priority: "Routine",
    status: "Delivered",
    vendor: "MediSupply Co.",
    orderDate: "2026-10-12",
    expectedDate: "2026-10-14",
    cost: 3750,
    notes: "Stock replenishment.",
  },
  {
    id: "CO-1043",
    item: "Infusion Pump",
    type: "Equipment",
    patient: "ICU",
    patientId: "WARD-ICU",
    department: "Intensive Care",
    requestedBy: "Mira Patel",
    quantity: 1,
    priority: "Urgent",
    status: "Pending",
    vendor: "TechCare Solutions",
    orderDate: "2026-10-14",
    expectedDate: "2026-10-19",
    cost: 62500,
    notes: "Replacement for faulty unit.",
  },
  {
    id: "CO-1042",
    item: "Lipid Profile",
    type: "Lab Test",
    patient: "Nora Montgomery",
    patientId: "PT-10051",
    department: "Outpatient",
    requestedBy: "Dr. John Doe",
    quantity: 1,
    priority: "Routine",
    status: "Cancelled",
    vendor: "Central Laboratory",
    orderDate: "2026-10-11",
    expectedDate: "2026-10-12",
    cost: 900,
    notes: "Duplicate request cancelled.",
  },
  {
    id: "CO-1041",
    item: "MRI Brain",
    type: "Imaging",
    patient: "Thomas Albright",
    patientId: "PT-10034",
    department: "Neurology",
    requestedBy: "Dr. Sarah Vance",
    quantity: 1,
    priority: "Routine",
    status: "Rejected",
    vendor: "Radiology Department",
    orderDate: "2026-10-10",
    expectedDate: "2026-10-12",
    cost: 6500,
    notes: "Returned for additional clinical information.",
  },
];

const orderTypes: OrderType[] = [
  "Medication",
  "Lab Test",
  "Imaging",
  "Equipment",
  "Medical Supply",
];

const departments = [
  "Cardiology",
  "General Medicine",
  "Emergency",
  "Nursing",
  "Intensive Care",
  "Neurology",
  "Outpatient",
  "Central Supply",
];

const vendors = [
  "Central Laboratory",
  "Radiology Department",
  "PharmaGen",
  "TechCare Solutions",
  "MediSupply Co.",
  "Other / Not assigned",
];

const statusStyles: Record<OrderStatus, string> = {
  Pending: "bg-amber-50 text-amber-700 ring-amber-200",
  Approved: "bg-blue-50 text-blue-700 ring-blue-200",
  "In Progress": "bg-violet-50 text-violet-700 ring-violet-200",
  Delivered: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Cancelled: "bg-slate-100 text-slate-600 ring-slate-200",
  Rejected: "bg-red-50 text-red-700 ring-red-200",
};

const priorityStyles = {
  Routine: "bg-slate-100 text-slate-600",
  Urgent: "bg-orange-50 text-orange-700",
  STAT: "bg-red-50 text-red-700",
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100";

const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex whitespace-nowrap items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: ClinicalOrder["priority"] }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-semibold ${priorityStyles[priority]}`}
    >
      {priority === "STAT" && <AlertTriangle className="mr-1 h-3 w-3" />}
      {priority}
    </span>
  );
}

export default function ClinicalOrdersPage() {
  const [orders, setOrders] = useState<ClinicalOrder[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [activeView, setActiveView] = useState<"all" | "needs-attention">("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<ClinicalOrder | null>(null);
  const [notice, setNotice] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const [form, setForm] = useState({
    item: "",
    type: "Lab Test" as OrderType,
    patient: "",
    patientId: "",
    department: "Cardiology",
    quantity: "1",
    priority: "Routine" as ClinicalOrder["priority"],
    vendor: "Other / Not assigned",
    expectedDate: today(),
    cost: "0",
    notes: "",
  });

  const counts = useMemo(() => {
    const count = (status: OrderStatus) =>
      orders.filter((order) => order.status === status).length;
    return {
      total: orders.length,
      pending: count("Pending"),
      inProgress: count("In Progress"),
      delivered: count("Delivered"),
      cancelled: count("Cancelled"),
      approved: count("Approved"),
      rejected: count("Rejected"),
    };
  }, [orders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();
    return orders.filter((order) => {
      const matchesSearch = [
        order.id,
        order.item,
        order.patient,
        order.patientId,
        order.requestedBy,
        order.vendor,
        order.department,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;
      const matchesType = typeFilter === "All" || order.type === typeFilter;
      const matchesPriority =
        priorityFilter === "All" || order.priority === priorityFilter;
      const needsAttention =
        activeView === "all" ||
        order.status === "Pending" ||
        order.status === "Rejected";

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority &&
        needsAttention
      );
    });
  }, [orders, search, statusFilter, typeFilter, priorityFilter, activeView]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleOrders = filteredOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setTypeFilter("All");
    setPriorityFilter("All");
    setActiveView("all");
    setPage(1);
  };

  const updateStatus = (id: string, status: OrderStatus) => {
    setOrders((current) =>
      current.map((order) => (order.id === id ? { ...order, status } : order))
    );
    setSelectedOrder((current) =>
      current?.id === id ? { ...current, status } : current
    );
    setNotice(`${id} marked as ${status.toLowerCase()}.`);
  };

  const createOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextNumber =
      Math.max(
        1048,
        ...orders.map((order) => Number(order.id.replace("CO-", "")) || 0)
      ) + 1;

    const newOrder: ClinicalOrder = {
      id: `CO-${nextNumber}`,
      item: form.item.trim(),
      type: form.type,
      patient: form.patient.trim(),
      patientId: form.patientId.trim() || "N/A",
      department: form.department,
      requestedBy: "Current User",
      quantity: Math.max(1, Number(form.quantity) || 1),
      priority: form.priority,
      status: "Pending",
      vendor: form.vendor,
      orderDate: today(),
      expectedDate: form.expectedDate,
      cost: Math.max(0, Number(form.cost) || 0),
      notes: form.notes.trim(),
    };

    setOrders((current) => [newOrder, ...current]);
    setShowCreateForm(false);
    setForm({
      item: "",
      type: "Lab Test",
      patient: "",
      patientId: "",
      department: "Cardiology",
      quantity: "1",
      priority: "Routine",
      vendor: "Other / Not assigned",
      expectedDate: today(),
      cost: "0",
      notes: "",
    });
    setStatusFilter("All");
    setTypeFilter("All");
    setPriorityFilter("All");
    setActiveView("all");
    setPage(1);
    setNotice(`Order CO-${nextNumber} created and submitted for review.`);
  };

  const exportOrders = () => {
    const headers = [
      "Order ID",
      "Item",
      "Type",
      "Patient / Destination",
      "Patient ID",
      "Department",
      "Requested By",
      "Quantity",
      "Priority",
      "Status",
      "Vendor",
      "Order Date",
      "Expected Date",
      "Cost (INR)",
      "Notes",
    ];

    const rows = filteredOrders.map((order) => [
      order.id,
      order.item,
      order.type,
      order.patient,
      order.patientId,
      order.department,
      order.requestedBy,
      order.quantity,
      order.priority,
      order.status,
      order.vendor,
      order.orderDate,
      order.expectedDate,
      order.cost,
      order.notes,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "clinical-orders.csv";
    anchor.click();
    URL.revokeObjectURL(url);
    setNotice("Clinical orders exported to CSV.");
  };

  return (
    <main className="min-h-screen bg-[oklch(97%_0.003_250)] px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Operations</span>
              <span>/</span>
              <span className="font-medium text-green-700">Clinical Orders</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Clinical Orders
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Create, track, and manage clinical supplies, tests, equipment, and medication orders.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportOrders}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={() => setShowCreateForm(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-700"
            >
              <Plus className="h-4 w-4" />
              Create Order
            </button>
          </div>
        </div>

        {notice && (
          <div
            role="status"
            className="flex items-center justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            <span className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {notice}
            </span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* KPI cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              label: "Total Orders",
              value: counts.total,
              detail: "All order requests",
              icon: ClipboardList,
              iconStyle: "bg-blue-50 text-blue-700",
            },
            {
              label: "Pending Review",
              value: counts.pending,
              detail: "Awaiting approval",
              icon: Clock3,
              iconStyle: "bg-amber-50 text-amber-700",
            },
            {
              label: "In Progress",
              value: counts.inProgress,
              detail: "Being fulfilled",
              icon: Activity,
              iconStyle: "bg-violet-50 text-violet-700",
            },
            {
              label: "Delivered",
              value: counts.delivered,
              detail: "Successfully received",
              icon: CheckCircle2,
              iconStyle: "bg-green-50 text-green-700",
            },
            {
              label: "Cancelled",
              value: counts.cancelled,
              detail: `${counts.rejected} rejected`,
              icon: X,
              iconStyle: "bg-slate-100 text-slate-600",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-2 text-3xl font-bold tracking-tight">
                      {stat.value}
                    </p>
                  </div>
                  <span className={`rounded-xl p-2.5 ${stat.iconStyle}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 text-xs text-slate-500">{stat.detail}</p>
              </div>
            );
          })}
        </section>

        {/* Additional operational summary */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4">
            <span className="rounded-lg bg-white p-2 text-amber-700">
              <AlertTriangle className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-amber-900">Needs attention</p>
              <p className="mt-1 text-sm text-amber-800">
                {orders.filter((order) => order.status === "Pending" || order.status === "Rejected").length} orders need review or follow-up.
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveView("needs-attention");
                  setStatusFilter("All");
                  setPage(1);
                }}
                className="mt-2 text-sm font-semibold text-amber-900 underline underline-offset-2"
              >
                Review orders
              </button>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-violet-200 bg-violet-50/70 p-4">
            <span className="rounded-lg bg-white p-2 text-violet-700">
              <Truck className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-violet-900">Awaiting fulfillment</p>
              <p className="mt-1 text-sm text-violet-800">
                {counts.approved + counts.inProgress} approved or in-progress orders.
              </p>
              <p className="mt-2 text-xs text-violet-700">
                Track delivery and completion status.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50/70 p-4">
            <span className="rounded-lg bg-white p-2 text-green-700">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-green-900">Order governance</p>
              <p className="mt-1 text-sm text-green-800">
                New requests start as Pending and should be reviewed by an authorized person.
              </p>
            </div>
          </div>
        </section>

        {/* Table */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 p-4 sm:p-5 xl:flex-row xl:items-center">
            <div>
              <h2 className="text-lg font-bold">Order Register</h2>
              <p className="mt-1 text-sm text-slate-500">
                Search and track every order from request through delivery.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <label className="relative min-w-[220px] flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search order, patient, vendor..."
                  className={`${inputClass} pl-9`}
                />
              </label>
              <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} w-auto min-w-[140px]`}
              >
                <option value="All">All statuses</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="In Progress">In Progress</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Rejected">Rejected</option>
              </select>
              <select
                aria-label="Filter by order type"
                value={typeFilter}
                onChange={(event) => {
                  setTypeFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} w-auto min-w-[145px]`}
              >
                <option value="All">All types</option>
                {orderTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                aria-label="Filter by priority"
                value={priorityFilter}
                onChange={(event) => {
                  setPriorityFilter(event.target.value);
                  setPage(1);
                }}
                className={`${inputClass} w-auto min-w-[125px]`}
              >
                <option value="All">All priorities</option>
                <option value="Routine">Routine</option>
                <option value="Urgent">Urgent</option>
                <option value="STAT">STAT</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-y bg-slate-50/80 px-4 py-3 sm:px-5">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveView("all");
                  setPage(1);
                }}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  activeView === "all"
                    ? "bg-green-100 text-green-800"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                All orders ({counts.total})
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveView("needs-attention");
                  setPage(1);
                }}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium ${
                  activeView === "needs-attention"
                    ? "bg-amber-100 text-amber-800"
                    : "text-slate-600 hover:bg-white"
                }`}
              >
                Needs attention
              </button>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-medium text-slate-600 hover:text-green-700"
            >
              Clear filters
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1150px] text-left text-sm">
              <thead className="border-b bg-white text-xs text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Order</th>
                  <th className="px-4 py-3 font-semibold">Item / Type</th>
                  <th className="px-4 py-3 font-semibold">Patient / Destination</th>
                  <th className="px-4 py-3 font-semibold">Requested by</th>
                  <th className="px-4 py-3 font-semibold">Priority</th>
                  <th className="px-4 py-3 font-semibold">Order date</th>
                  <th className="px-4 py-3 font-semibold">Expected</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleOrders.map((order) => (
                  <tr key={order.id} className="transition hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-5 py-4 align-top">
                      <button
                        type="button"
                        onClick={() => setSelectedOrder(order)}
                        className="font-semibold text-green-700 hover:underline"
                      >
                        {order.id}
                      </button>
                      <p className="mt-1 text-xs text-slate-400">
                        Qty: {order.quantity}
                      </p>
                    </td>
                    <td className="max-w-[220px] px-4 py-4 align-top">
                      <p className="font-semibold text-slate-800">{order.item}</p>
                      <p className="mt-1 text-xs text-slate-500">{order.type}</p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <p className="font-medium text-slate-700">{order.patient}</p>
                      <p className="mt-1 text-xs text-slate-500">{order.patientId}</p>
                      <p className="mt-1 text-xs text-slate-400">{order.department}</p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 align-top text-slate-600">
                      {order.requestedBy}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <PriorityBadge priority={order.priority} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 align-top text-slate-600">
                      {order.orderDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 align-top text-slate-600">
                      {order.expectedDate}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 align-top font-medium">
                      {formatCurrency(order.cost)}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-4 py-4 text-right align-top">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium hover:bg-slate-100"
                        >
                          View
                        </button>
                        <div className="relative">
                          <details className="group">
                            <summary className="list-none cursor-pointer rounded-md p-2 hover:bg-slate-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </summary>
                            <div className="absolute right-0 z-20 mt-1 w-44 rounded-lg border border-slate-200 bg-white p-1 text-left shadow-lg">
                              {order.status === "Pending" && (
                                <button
                                  type="button"
                                  onClick={() => updateStatus(order.id, "Approved")}
                                  className="w-full rounded-md px-3 py-2 text-xs text-green-700 hover:bg-green-50"
                                >
                                  Approve order
                                </button>
                              )}
                              {(order.status === "Approved" ||
                                order.status === "In Progress") && (
                                <>
                                  {order.status === "Approved" && (
                                    <button
                                      type="button"
                                      onClick={() => updateStatus(order.id, "In Progress")}
                                      className="w-full rounded-md px-3 py-2 text-xs hover:bg-slate-50"
                                    >
                                      Mark in progress
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => updateStatus(order.id, "Delivered")}
                                    className="w-full rounded-md px-3 py-2 text-xs text-green-700 hover:bg-green-50"
                                  >
                                    Mark delivered
                                  </button>
                                </>
                              )}
                              {!["Delivered", "Cancelled", "Rejected"].includes(order.status) && (
                                <button
                                  type="button"
                                  onClick={() => updateStatus(order.id, "Cancelled")}
                                  className="w-full rounded-md px-3 py-2 text-xs text-red-600 hover:bg-red-50"
                                >
                                  Cancel order
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => setSelectedOrder(order)}
                                className="w-full rounded-md px-3 py-2 text-xs hover:bg-slate-50"
                              >
                                View details
                              </button>
                            </div>
                          </details>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
                {visibleOrders.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-5 py-14 text-center">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <ClipboardList className="h-6 w-6" />
                      </div>
                      <p className="mt-3 font-semibold">No orders found</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try changing your search or filters.
                      </p>
                      <button
                        type="button"
                        onClick={resetFilters}
                        className="mt-3 text-sm font-semibold text-green-700"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-4 sm:px-5">
            <p className="text-sm text-slate-500">
              Showing{" "}
              {filteredOrders.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(currentPage * pageSize, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronDown className="h-4 w-4 rotate-90" />
              </button>
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
                className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>
        </section>

        <p className="text-xs leading-5 text-slate-500">
          Demo data only. Clinical orders, medication requests, and equipment procurement must be validated and authorized by the appropriate staff. Connect this interface to your backend for persistent records and server-enforced permissions.
        </p>
      </div>

      {/* Create order modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b px-5 py-4">
              <div>
                <h2 className="text-lg font-bold">Create Clinical Order</h2>
                <p className="mt-1 text-sm text-slate-500">
                  New orders are submitted with Pending status for review.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                aria-label="Close form"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={createOrder} className="space-y-4 p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                  Item / order name *
                  <input
                    required
                    autoFocus
                    value={form.item}
                    onChange={(event) => setForm({ ...form, item: event.target.value })}
                    placeholder="e.g. CBC, infusion pump, sterile gloves"
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Order type *
                  <select
                    value={form.type}
                    onChange={(event) =>
                      setForm({ ...form, type: event.target.value as OrderType })
                    }
                    className={inputClass}
                  >
                    {orderTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Priority *
                  <select
                    value={form.priority}
                    onChange={(event) =>
                      setForm({
                        ...form,
                        priority: event.target.value as ClinicalOrder["priority"],
                      })
                    }
                    className={inputClass}
                  >
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent</option>
                    <option value="STAT">STAT</option>
                  </select>
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Patient / destination *
                  <input
                    required
                    value={form.patient}
                    onChange={(event) => setForm({ ...form, patient: event.target.value })}
                    placeholder="Patient name or ward / stock"
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Patient / destination ID
                  <input
                    value={form.patientId}
                    onChange={(event) => setForm({ ...form, patientId: event.target.value })}
                    placeholder="e.g. PT-10081"
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Department *
                  <select
                    value={form.department}
                    onChange={(event) => setForm({ ...form, department: event.target.value })}
                    className={inputClass}
                  >
                    {departments.map((department) => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Vendor / service provider
                  <select
                    value={form.vendor}
                    onChange={(event) => setForm({ ...form, vendor: event.target.value })}
                    className={inputClass}
                  >
                    {vendors.map((vendor) => (
                      <option key={vendor} value={vendor}>{vendor}</option>
                    ))}
                  </select>
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Quantity *
                  <input
                    required
                    type="number"
                    min="1"
                    step="1"
                    value={form.quantity}
                    onChange={(event) => setForm({ ...form, quantity: event.target.value })}
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Estimated cost (INR)
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.cost}
                    onChange={(event) => setForm({ ...form, cost: event.target.value })}
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700">
                  Expected date *
                  <input
                    required
                    type="date"
                    min={today()}
                    value={form.expectedDate}
                    onChange={(event) => setForm({ ...form, expectedDate: event.target.value })}
                    className={inputClass}
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium text-slate-700 sm:col-span-2">
                  Clinical / procurement notes
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(event) => setForm({ ...form, notes: event.target.value })}
                    placeholder="Add reason, specifications, or other relevant details"
                    className={inputClass}
                  />
                </label>
              </div>

              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
                Submitting creates a pending request; it does not authorize treatment, medication dispensing, or equipment purchasing. Follow your facility's approval process.
              </div>

              <div className="flex justify-end gap-2 border-t pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-green-700"
                >
                  <Plus className="h-4 w-4" />
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Order details modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b p-5">
              <div>
                <p className="text-sm font-semibold text-green-700">{selectedOrder.id}</p>
                <h2 className="mt-1 text-xl font-bold">{selectedOrder.item}</h2>
                <p className="mt-1 text-sm text-slate-500">{selectedOrder.type}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={selectedOrder.status} />
                <PriorityBadge priority={selectedOrder.priority} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Patient / destination", selectedOrder.patient],
                  ["Patient / destination ID", selectedOrder.patientId],
                  ["Department", selectedOrder.department],
                  ["Requested by", selectedOrder.requestedBy],
                  ["Quantity", String(selectedOrder.quantity)],
                  ["Vendor / provider", selectedOrder.vendor],
                  ["Order date", selectedOrder.orderDate],
                  ["Expected date", selectedOrder.expectedDate],
                  ["Estimated cost", formatCurrency(selectedOrder.cost)],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 break-words text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Notes
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {selectedOrder.notes || "No additional notes provided."}
                </p>
              </div>

              <div className="flex flex-wrap justify-end gap-2 border-t pt-4">
                {selectedOrder.status === "Pending" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedOrder.id, "Approved")}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    <Check className="h-4 w-4" />
                    Approve
                  </button>
                )}
                {selectedOrder.status === "Approved" && (
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedOrder.id, "In Progress")}
                    className="rounded-lg bg-violet-600 px-3 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                  >
                    Start fulfillment
                  </button>
                )}
                {["Approved", "In Progress"].includes(selectedOrder.status) && (
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedOrder.id, "Delivered")}
                    className="rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                  >
                    Mark delivered
                  </button>
                )}
                {!["Delivered", "Cancelled", "Rejected"].includes(selectedOrder.status) && (
                  <button
                    type="button"
                    onClick={() => updateStatus(selectedOrder.id, "Cancelled")}
                    className="rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Cancel order
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}