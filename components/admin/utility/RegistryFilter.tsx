
"use client"

import { useState } from "react"
import { RotateCcw, SlidersHorizontal } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const patientCategories = [
  { id: 0, name: "All Patients", count: 1428 },
  { id: 1, name: "Current Inpatients", count: 312 },
  { id: 2, name: "Recent Outpatient Encounters", count: 145 },
  { id: 3, name: "Chronic Disease Cohorts", count: 428 },
  { id: 4, name: "Pending Verification", count: 19 },
]

const filterOptions = [
  {
    label: "Department",
    placeholder: "All departments",
    options: [
      { label: "Cardiology", value: "cardiology" },
      { label: "Neurology", value: "neurology" },
      { label: "Orthopedics", value: "orthopedics" },
      { label: "General Medicine", value: "general-medicine" },
    ],
  },
  {
    label: "Patient Status",
    placeholder: "All statuses",
    options: [
      { label: "Active", value: "active" },
      { label: "Pending", value: "pending" },
      { label: "Inactive", value: "inactive" },
    ],
  },
  {
    label: "Gender",
    placeholder: "All genders",
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" },
    ],
  },
  {
    label: "Age Group",
    placeholder: "All ages",
    options: [
      { label: "0–17 years", value: "0-17" },
      { label: "18–39 years", value: "18-39" },
      { label: "40–59 years", value: "40-59" },
      { label: "60+ years", value: "60-plus" },
    ],
  },
  {
    label: "Visit Type",
    placeholder: "All visit types",
    options: [
      { label: "Inpatient", value: "inpatient" },
      { label: "Outpatient", value: "outpatient" },
      { label: "Emergency", value: "emergency" },
    ],
  },
]

const RegistryFilter = () => {
  const [activeTab, setActiveTab] = useState("All Patients")
  const [filters, setFilters] = useState<Record<string, string>>({})

  const updateFilter = (label: string, value: string) => {
    setFilters((previous) => ({
      ...previous,
      [label]: value,
    }))
  }

  const resetFilters = () => {
    setActiveTab("All Patients")
    setFilters({})
  }

  const hasActiveFilters = Object.values(filters).some(Boolean)

  return (
    <section className="w-full space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">

      {/* Heading */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Patient Registry
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Browse, organize, and filter patient records
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <SlidersHorizontal className="size-4" />
          <span>Registry filters</span>
        </div>
      </div>

      {/* Patient category tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList
          variant="line"
          className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-none border-b border-slate-200 bg-transparent p-0"
        >
          {patientCategories.map((item) => {
            const isActive = activeTab === item.name

            return (
              <TabsTrigger
                key={item.id}
                value={item.name}
                className="shrink-0 gap-2 rounded-t-lg border-b-2 border-transparent px-3 py-3 text-sm text-slate-500 transition-colors hover:text-blue-700 data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50/60 data-[state=active]:text-blue-700 data-[state=active]:shadow-none"
              >
                <span>{item.name}</span>

                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                    isActive
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {item.count.toLocaleString("en-IN")}
                </span>
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {/* Filter controls */}
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">
              Filter records
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Refine patients by their details and visit information.
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            disabled={activeTab === "All Patients" && !hasActiveFilters}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="size-4" />
            Reset filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filterOptions.map((filter) => (
            <div key={filter.label} className="min-w-0 space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                {filter.label}
              </label>

              <Select
                value={filters[filter.label] || ""}
                onValueChange={(value) =>
                  updateFilter(filter.label, value)
                }
              >
                <SelectTrigger className="h-10 w-full rounded-lg border-slate-200 bg-white text-sm shadow-none transition-colors hover:border-blue-300 focus:ring-2 focus:ring-blue-100">
                  <SelectValue placeholder={filter.placeholder} />
                </SelectTrigger>

                <SelectContent>
                  {filter.options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </div>

      {/* Active filter summary */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
          <span className="text-xs font-medium text-slate-500">
            Active filters:
          </span>

          {Object.entries(filters)
            .filter(([, value]) => value)
            .map(([label, value]) => {
              const option = filterOptions
                .find((filter) => filter.label === label)
                ?.options.find((item) => item.value === value)

              return (
                <span
                  key={label}
                  className="rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700"
                >
                  {label}: {option?.label ?? value}
                </span>
              )
            })}
        </div>
      )}
    </section>
  )
}

export default RegistryFilter
