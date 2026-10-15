"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileClock,
  Filter,
  LockKeyhole,
  Search,
  ShieldCheck,
  UserRound,
  X,
  Eye,
  LogIn,
  LogOut,
  Pencil,
  Trash2,
  Plus,
  Settings,
  ClipboardCheck,
  Package,
  Stethoscope,
  Download,
  RefreshCw,
  Info,
} from "lucide-react";

type AuditCategory =
  | "Authentication"
  | "Patient Records"
  | "Clinical Orders"
  | "User Management"
  | "Vendor Management"
  | "Safety Checklist"
  | "System Settings";

type AuditResult = "Success" | "Denied" | "Failed" | "Warning";

type AuditLog = {
  id: string;
  timestamp: string;
  actor: string;
  actorEmail: string;
  role: string;
  action: string;
  category: AuditCategory;
  target: string;
  ipAddress: string;
  result: AuditResult;
  details: string;
};

const initialLogs: AuditLog[] = [
  {
    id: "AUD-10842",
    timestamp: "2026-10-15T10:42:18",
    actor: "Ankur Singh",
    actorEmail: "ankur@example.com",
    role: "ADMIN",
    action: "Role updated",
    category: "User Management",
    target: "USR-10024 · Mira Patel",
    ipAddress: "192.0.2.18",
    result: "Success",
    details: "Role changed from RECEPTIONIST to SUPERVISOR.",
  },
  {
    id: "AUD-10841",
    timestamp: "2026-10-15T10:37:04",
    actor: "Dr. Sarah Vance",
    actorEmail: "sarah@example.com",
    role: "DOCTOR",
    action: "Clinical order created",
    category: "Clinical Orders",
    target: "CO-1048 · CBC",
    ipAddress: "192.0.2.44",
    result: "Success",
    details: "Created a laboratory request for clinical review.",
  },
  {
    id: "AUD-10840",
    timestamp: "2026-10-15T10:31:52",
    actor: "Rahul Sharma",
    actorEmail: "rahul@example.com",
    role: "SUPERVISOR",
    action: "Patient record viewed",
    category: "Patient Records",
    target: "PT-10081",
    ipAddress: "192.0.2.63",
    result: "Success",
    details: "Viewed patient demographics and encounter summary.",
  },
  {
    id: "AUD-10839",
    timestamp: "2026-10-15T10:28:11",
    actor: "Unknown user",
    actorEmail: "unknown@example.com",
    role: "UNKNOWN",
    action: "Sign-in attempt",
    category: "Authentication",
    target: "Admin portal",
    ipAddress: "198.51.100.21",
    result: "Denied",
    details: "Sign-in denied because the supplied credentials were invalid.",
  },
  {
    id: "AUD-10838",
    timestamp: "2026-10-15T10:20:33",
    actor: "Ankur Singh",
    actorEmail: "ankur@example.com",
    role: "ADMIN",
    action: "Vendor updated",
    category: "Vendor Management",
    target: "VEN-00102 · TechCare Solutions",
    ipAddress: "192.0.2.18",
    result: "Success",
    details: "Updated vendor contact details and contract end date.",
  },
  {
    id: "AUD-10837",
    timestamp: "2026-10-15T10:15:09",
    actor: "Dr. John Doe",
    actorEmail: "john@example.com",
    role: "DOCTOR",
    action: "Clinical order approved",
    category: "Clinical Orders",
    target: "CO-1046 · Amoxicillin 500 mg",
    ipAddress: "192.0.2.47",
    result: "Warning",
    details: "Approval recorded in the demo dataset. Verify clinical authorization in the live system.",
  },
  {
    id: "AUD-10836",
    timestamp: "2026-10-15T10:06:42",
    actor: "Mira Patel",
    actorEmail: "mira@example.com",
    role: "NURSE",
    action: "Safety checklist completed",
    category: "Safety Checklist",
    target: "PT-10092 · Initial assessment",
    ipAddress: "192.0.2.52",
    result: "Success",
    details: "Completed the patient safety checklist for the encounter.",
  },
  {
    id: "AUD-10835",
    timestamp: "2026-10-15T09:58:17",
    actor: "Ankur Singh",
    actorEmail: "ankur@example.com",
    role: "ADMIN",
    action: "User deactivated",
    category: "User Management",
    target: "USR-10019 · Rahul Sharma",
    ipAddress: "192.0.2.18",
    result: "Success",
    details: "User account deactivated by an administrator.",
  },
  {
    id: "AUD-10834",
    timestamp: "2026-10-15T09:46:05",
    actor: "System",
    actorEmail: "system@carehub.local",
    role: "SYSTEM",
    action: "Session expired",
    category: "Authentication",
    target: "Session · SES-88201",
    ipAddress: "192.0.2.70",
    result: "Success",
    details: "Session expired after the configured inactivity period.",
  },
  {
    id: "AUD-10833",
    timestamp: "2026-10-15T09:40:22",
    actor: "Rahul Sharma",
    actorEmail: "rahul@example.com",
    role: "SUPERVISOR",
    action: "Equipment order cancelled",
    category: "Clinical Orders",
    target: "CO-1042 · Lipid Profile",
    ipAddress: "192.0.2.63",
    result: "Success",
    details: "Order cancellation recorded with a duplicate-request reason.",
  },
  {
    id: "AUD-10832",
    timestamp: "2026-10-15T09:33:50",
    actor: "Mira Patel",
    actorEmail: "mira@example.com",
    role: "NURSE",
    action: "Patient record access denied",
    category: "Patient Records",
    target: "PT-10034",
    ipAddress: "198.51.100.35",
    result: "Denied",
    details: "Access denied by the role-based authorization policy.",
  },
  {
    id: "AUD-10831",
    timestamp: "2026-10-15T09:20:14",
    actor: "Ankur Singh",
    actorEmail: "ankur@example.com",
    role: "ADMIN",
    action: "System setting changed",
    category: "System Settings",
    target: "Session timeout",
    ipAddress: "192.0.2.18",
    result: "Success",
    details: "Updated the configured inactivity timeout.",
  },
];

const categories: AuditCategory[] = [
  "Authentication",
  "Patient Records",
  "Clinical Orders",
  "User Management",
  "Vendor Management",
  "Safety Checklist",
  "System Settings",
];

const resultStyles: Record<AuditResult, string> = {
  Success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Denied: "bg-red-50 text-red-700 ring-red-200",
  Failed: "bg-rose-50 text-rose-700 ring-rose-200",
  Warning: "bg-amber-50 text-amber-800 ring-amber-200",
};

const categoryStyles: Record<AuditCategory, string> = {
  Authentication: "bg-blue-50 text-blue-700",
  "Patient Records": "bg-violet-50 text-violet-700",
  "Clinical Orders": "bg-emerald-50 text-emerald-700",
  "User Management": "bg-indigo-50 text-indigo-700",
  "Vendor Management": "bg-orange-50 text-orange-700",
  "Safety Checklist": "bg-teal-50 text-teal-700",
  "System Settings": "bg-slate-100 text-slate-700",
};

function formatTimestamp(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function ResultBadge({ result }: { result: AuditResult }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-xs font-semibold ring-1 ring-inset ${resultStyles[result]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {result}
    </span>
  );
}

export default function AuditLogsPage() {
  const [logs] = useState<AuditLog[]>(initialLogs);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [resultFilter, setResultFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 7;

  const filteredLogs = useMemo(() => {
    const query = search.trim().toLowerCase();
    const now = new Date();

    return logs.filter((log) => {
      const matchesSearch = [
        log.id,
        log.actor,
        log.actorEmail,
        log.role,
        log.action,
        log.category,
        log.target,
        log.ipAddress,
        log.details,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);

      const matchesCategory =
        categoryFilter === "All" || log.category === categoryFilter;
      const matchesResult =
        resultFilter === "All" || log.result === resultFilter;

      const logDate = new Date(log.timestamp);
      const ageHours = (now.getTime() - logDate.getTime()) / 3600000;
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "24h" && ageHours >= 0 && ageHours <= 24) ||
        (dateFilter === "7d" && ageHours >= 0 && ageHours <= 168) ||
        (dateFilter === "30d" && ageHours >= 0 && ageHours <= 720);

      return matchesSearch && matchesCategory && matchesResult && matchesDate;
    });
  }, [logs, search, categoryFilter, resultFilter, dateFilter]);

  const counts = useMemo(
    () => ({
      total: logs.length,
      success: logs.filter((log) => log.result === "Success").length,
      denied: logs.filter((log) => log.result === "Denied").length,
      warnings: logs.filter((log) => log.result === "Warning").length,
      failed: logs.filter((log) => log.result === "Failed").length,
    }),
    [logs]
  );

  const totalPages = Math.max(1, Math.ceil(filteredLogs.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleLogs = filteredLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setResultFilter("All");
    setDateFilter("all");
    setPage(1);
  };

  const exportCsv = () => {
    const headers = [
      "Log ID",
      "Timestamp",
      "Actor",
      "Actor Email",
      "Role",
      "Action",
      "Category",
      "Target",
      "IP Address",
      "Result",
      "Details",
    ];

    const rows = filteredLogs.map((log) => [
      log.id,
      log.timestamp,
      log.actor,
      log.actorEmail,
      log.role,
      log.action,
      log.category,
      log.target,
      log.ipAddress,
      log.result,
      log.details,
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
    anchor.download = "audit-logs.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
              <span>Administration</span>
              <span>/</span>
              <span className="font-medium text-emerald-700">Audit Logs</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Audit Logs
            </h1>
            <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
              Review traceable activity across authentication, patient records, clinical orders,
              user access, vendors, and system settings.
            </p>
          </div>
          <button
            type="button"
            onClick={exportCsv}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700"
          >
            <ArrowDownToLine className="h-4 w-4" />
            Export filtered logs
          </button>
        </header>

        {/* Notice */}
        <div className="flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
          <div>
            <p className="font-semibold text-blue-950">Audit integrity matters</p>
            <p className="mt-1 text-sm leading-6 text-blue-900">
              Audit records should be generated server-side, access-controlled, time-synchronized,
              retained according to policy, and protected from alteration or deletion by ordinary users.
              The entries on this screen are sample data for UI development only.
            </p>
          </div>
        </div>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              label: "Total Events",
              value: counts.total,
              detail: "Events in sample dataset",
              icon: Activity,
              style: "bg-blue-50 text-blue-700",
            },
            {
              label: "Successful",
              value: counts.success,
              detail: "Completed actions",
              icon: CheckCircle2,
              style: "bg-emerald-50 text-emerald-700",
            },
            {
              label: "Access Denied",
              value: counts.denied,
              detail: "Authorization / sign-in denials",
              icon: ShieldCheck,
              style: "bg-red-50 text-red-700",
            },
            {
              label: "Warnings",
              value: counts.warnings,
              detail: "Events requiring review",
              icon: AlertTriangle,
              style: "bg-amber-50 text-amber-800",
            },
            {
              label: "Failed",
              value: counts.failed,
              detail: "Failed system actions",
              icon: X,
              style: "bg-rose-50 text-rose-700",
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
                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  </div>
                  <span className={`rounded-xl p-2.5 ${stat.style}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-3 text-xs text-slate-500">{stat.detail}</p>
              </div>
            );
          })}
        </section>

        {/* Filters */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col justify-between gap-4 p-4 sm:p-5 xl:flex-row xl:items-center">
            <div>
              <h2 className="text-lg font-bold">Activity history</h2>
              <p className="mt-1 text-sm text-slate-500">
                Search events and narrow the audit trail by category, result, or time range.
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
                  placeholder="Search actor, action, target, IP..."
                  className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />
              </label>
              <select
                aria-label="Filter by category"
                value={categoryFilter}
                onChange={(event) => {
                  setCategoryFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm"
              >
                <option value="All">All categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                aria-label="Filter by result"
                value={resultFilter}
                onChange={(event) => {
                  setResultFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm"
              >
                <option value="All">All results</option>
                <option value="Success">Success</option>
                <option value="Denied">Denied</option>
                <option value="Warning">Warning</option>
                <option value="Failed">Failed</option>
              </select>
              <select
                aria-label="Filter by time range"
                value={dateFilter}
                onChange={(event) => {
                  setDateFilter(event.target.value);
                  setPage(1);
                }}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm"
              >
                <option value="all">All time</option>
                <option value="24h">Last 24 hours</option>
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-y bg-slate-50/80 px-4 py-3 sm:px-5">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filteredLogs.length}</span> matching events
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-slate-600 hover:text-emerald-700"
            >
              Clear filters
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1250px] text-left text-sm">
              <thead className="border-b bg-white text-xs text-slate-500">
                <tr>
                  <th className="px-5 py-3 font-semibold">Timestamp</th>
                  <th className="px-4 py-3 font-semibold">Actor</th>
                  <th className="px-4 py-3 font-semibold">Action</th>
                  <th className="px-4 py-3 font-semibold">Category</th>
                  <th className="px-4 py-3 font-semibold">Target</th>
                  <th className="px-4 py-3 font-semibold">IP address</th>
                  <th className="px-4 py-3 font-semibold">Result</th>
                  <th className="px-4 py-3 text-right font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {visibleLogs.map((log) => (
                  <tr key={log.id} className="transition hover:bg-slate-50/80">
                    <td className="whitespace-nowrap px-5 py-4 align-top">
                      <p className="font-medium text-slate-800">
                        {formatTimestamp(log.timestamp)}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">{log.id}</p>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <p className="whitespace-nowrap font-semibold">{log.actor}</p>
                      <p className="mt-1 text-xs text-slate-500">{log.role}</p>
                    </td>
                    <td className="max-w-[200px] px-4 py-4 align-top font-medium text-slate-700">
                      {log.action}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className={`inline-flex whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${categoryStyles[log.category]}`}>
                        {log.category}
                      </span>
                    </td>
                    <td className="max-w-[220px] px-4 py-4 align-top text-slate-600">
                      {log.target}
                    </td>
                    <td className="whitespace-nowrap px-4 py-4 align-top font-mono text-xs text-slate-500">
                      {log.ipAddress}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <ResultBadge result={log.result} />
                    </td>
                    <td className="px-4 py-4 text-right align-top">
                      <button
                        type="button"
                        onClick={() => setSelectedLog(log)}
                        className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold hover:bg-slate-100"
                      >
                        View details
                      </button>
                    </td>
                  </tr>
                ))}
                {visibleLogs.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-5 py-14 text-center">
                      <FileClock className="mx-auto h-8 w-8 text-slate-400" />
                      <p className="mt-3 font-semibold">No audit events found</p>
                      <p className="mt-1 text-sm text-slate-500">
                        Try another search term or adjust your filters.
                      </p>
                      <button
                        type="button"
                        onClick={clearFilters}
                        className="mt-3 text-sm font-semibold text-emerald-700"
                      >
                        Clear filters
                      </button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t px-4 py-4 sm:px-5">
            <p className="text-sm text-slate-500">
              Showing{" "}
              {filteredLogs.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
              {"–"}
              {Math.min(currentPage * pageSize, filteredLogs.length)} of {filteredLogs.length} events
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                aria-label="Previous page"
                className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"
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
                aria-label="Next page"
                className="rounded-lg border p-2 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </button>
            </div>
          </div>
        </section>

        <footer className="flex items-start gap-2 text-xs leading-5 text-slate-500">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          This page uses illustrative records and timestamps. In production, load logs from a protected backend,
          use server-generated timestamps and actor IDs, and enforce retention and access policies.
        </footer>
      </div>

      {/* Event details dialog */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  Audit event · {selectedLog.id}
                </p>
                <h2 className="mt-1 text-xl font-bold">{selectedLog.action}</h2>
                <p className="mt-1 text-sm text-slate-500">
                  {formatTimestamp(selectedLog.timestamp)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedLog(null)}
                aria-label="Close event details"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 p-5">
              <div className="flex flex-wrap gap-2">
                <ResultBadge result={selectedLog.result} />
                <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${categoryStyles[selectedLog.category]}`}>
                  {selectedLog.category}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["Actor", selectedLog.actor],
                  ["Actor email", selectedLog.actorEmail],
                  ["Role", selectedLog.role],
                  ["Target", selectedLog.target],
                  ["IP address", selectedLog.ipAddress],
                  ["Event ID", selectedLog.id],
                ].map(([label, value]) => (
                  <div key={label} className="min-w-0">
                    <p className="text-xs text-slate-500">{label}</p>
                    <p className="mt-1 break-words text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-lg bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Event details
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {selectedLog.details}
                </p>
              </div>

              <div className="flex justify-end border-t pt-4">
                <button
                  type="button"
                  onClick={() => setSelectedLog(null)}
                  className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
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
