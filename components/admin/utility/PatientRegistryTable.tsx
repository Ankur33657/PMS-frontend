
"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const patients = [
  { id: "PT-1001", name: "Rahul Sharma", email: "rahul@example.com", age: 32, gender: "Male", status: "Active" },
  { id: "PT-1002", name: "Priya Verma", email: "priya@example.com", age: 28, gender: "Female", status: "Pending" },
  { id: "PT-1003", name: "Amit Kumar", email: "amit@example.com", age: 45, gender: "Male", status: "Active" },
  { id: "PT-1004", name: "Sneha Patel", email: "sneha@example.com", age: 36, gender: "Female", status: "Inactive" },
  { id: "PT-1005", name: "Vikram Singh", email: "vikram@example.com", age: 51, gender: "Male", status: "Active" },
  { id: "PT-1006", name: "Neha Gupta", email: "neha@example.com", age: 24, gender: "Female", status: "Pending" },
  { id: "PT-1007", name: "Arjun Mehta", email: "arjun@example.com", age: 40, gender: "Male", status: "Active" },
  { id: "PT-1008", name: "Pooja Joshi", email: "pooja@example.com", age: 30, gender: "Female", status: "Active" },
  { id: "PT-1009", name: "Karan Das", email: "karan@example.com", age: 42, gender: "Male", status: "Inactive" },
]

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
  Pending: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
  Inactive: "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
}

const PatientRegistryTable = () => {
  return (
    <div className="flex flex-col gap-4" >
      {/* Table heading */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900">
            Patient Registry
          </h2>
          <p className="text-sm text-slate-500">
            Manage and view registered patients
          </p>
        </div>

        <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          {patients.length} patients
        </span>
      </div>

      {/* Scrollable table */}
      <Table
        containerClassName="max-h-[600px]"
        className="min-w-[756px]"
      >
        <TableHeader>
          <TableRow className="border-b border-slate-200 bg-slate-50 hover:bg-slate-50">
            <TableHead className="sticky top-0 z-20 h-12 bg-slate-50 px-5 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Patient
            </TableHead>
            <TableHead className="sticky top-0 z-20 h-12 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Patient ID
            </TableHead>
            <TableHead className="sticky top-0 z-20 h-12 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Age / Gender
            </TableHead>
            <TableHead className="sticky top-0 z-20 h-12 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
              Status
            </TableHead>
            <TableHead className="sticky top-0 z-20 h-12 bg-slate-50 px-5 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="border-b border-slate-100 transition-colors hover:bg-blue-50/50"
            >
              <TableCell className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    {patient.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {patient.name}
                    </p>
                    <p className="max-w-[180px] truncate text-xs text-slate-500">
                      {patient.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="font-mono text-xs text-slate-600">
                {patient.id}
              </TableCell>

              <TableCell className="text-sm text-slate-600">
                {patient.age} yrs
                <span className="mx-1.5 text-slate-300">/</span>
                {patient.gender}
              </TableCell>

              <TableCell>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[patient.status]}`}
                >
                  <span className="size-1.5 rounded-full bg-current" />
                  {patient.status}
                </span>
              </TableCell>

              <TableCell className="px-5 text-right">
                <button
                  type="button"
                  onClick={() => console.log("View patient:", patient.id)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  View details
                </button>
              </TableCell>
            </TableRow>
          ))}
            {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="border-b border-slate-100 transition-colors hover:bg-blue-50/50"
            >
              <TableCell className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                    {patient.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium text-slate-800">
                      {patient.name}
                    </p>
                    <p className="max-w-[180px] truncate text-xs text-slate-500">
                      {patient.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell className="font-mono text-xs text-slate-600">
                {patient.id}
              </TableCell>

              <TableCell className="text-sm text-slate-600">
                {patient.age} yrs
                <span className="mx-1.5 text-slate-300">/</span>
                {patient.gender}
              </TableCell>

              <TableCell>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[patient.status]}`}
                >
                  <span className="size-1.5 rounded-full bg-current" />
                  {patient.status}
                </span>
              </TableCell>

              <TableCell className="px-5 text-right">
                <button
                  type="button"
                  onClick={() => console.log("View patient:", patient.id)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  View details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default PatientRegistryTable
