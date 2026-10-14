
"use client"

import { useState } from "react"
import {
  LayoutGrid,
  List,
  RotateCcw,
  ChevronDown,
  BedDouble,
  AlertTriangle,
} from "lucide-react"

import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const wards = [
  { id: "all", name: "All Wards", occupied: 312, capacity: 355 },
  { id: "cardiology", name: "Cardiology Step-Down", occupied: 44, capacity: 50 },
  { id: "icu", name: "Intensive Care Unit (ICU)", occupied: 32, capacity: 34, critical: true },
  { id: "general", name: "General Medical Ward A", occupied: 74, capacity: 90 },
  { id: "pediatric", name: "Pediatric Ward", occupied: 26, capacity: 40 },
  { id: "surgical", name: "Surgical Post-Op", occupied: 40, capacity: 45 },
]

const InPatientWardFilter = () => {
  const [activeWard, setActiveWard] = useState("all")
  const [acuity, setAcuity] = useState("all")
  const [status, setStatus] = useState("all")
  const [isolation, setIsolation] = useState("all")
  const [grouping, setGrouping] = useState("pod")
  const [view, setView] = useState<"grid" | "list">("grid")

  const resetFilters = () => {
    setActiveWard("all")
    setAcuity("all")
    setStatus("all")
    setIsolation("all")
    setGrouping("pod")
    setView("grid")
  }

  const hasFilters =
    activeWard !== "all" ||
    acuity !== "all" ||
    status !== "all" ||
    isolation !== "all" ||
    grouping !== "pod" ||
    view !== "grid"

  const selectClass =
    "h-8 w-full rounded-sm border border-slate-300 bg-blue-50/80 px-2 text-xs shadow-none hover:bg-blue-50 focus:ring-1 focus:ring-blue-300"

  return (
    <section className="w-full space-y-3 border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

      {/* Ward navigation */}
      <Tabs value={activeWard} onValueChange={setActiveWard}>
        <TabsList
          variant="line"
          className="flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-none border-b border-slate-200 bg-transparent p-0 pb-1"
        >
          {wards.map((ward) => {
            const active = activeWard === ward.id

            return (
              <TabsTrigger
                key={ward.id}
                value={ward.id}
                className="h-8 shrink-0 gap-1.5 rounded-sm border border-transparent px-2.5 text-[11px] font-medium text-slate-600 data-[state=active]:border-blue-300 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 data-[state=active]:shadow-none sm:text-xs"
              >
                <span>{ward.name}</span>

                <span className="text-slate-500">
                  ({ward.occupied}/{ward.capacity})
                </span>

                {ward.critical && (
                  <AlertTriangle
                    className="size-3.5 shrink-0 text-amber-700"
                    aria-label="Critical care unit"
                  />
                )}

                {active && (
                  <span className="sr-only">Selected</span>
                )}
              </TabsTrigger>
            )
          })}
        </TabsList>
      </Tabs>

      {/* Filter matrix */}
      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-[11px]">
            Filter Matrix:
          </span>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <div className="flex items-center gap-2 sm:w-[220px]">
              <span className="shrink-0 text-xs text-slate-500 sm:hidden">
                Acuity:
              </span>
              <Select value={acuity} onValueChange={setAcuity}>
                <SelectTrigger className={selectClass}>
                  <SelectValue placeholder="Acuity: All Tiers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Acuity: All Tiers</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="high">High Acuity</SelectItem>
                  <SelectItem value="moderate">Moderate Acuity</SelectItem>
                  <SelectItem value="low">Low Acuity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 sm:w-[220px]">
              <span className="shrink-0 text-xs text-slate-500 sm:hidden">
                Status:
              </span>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className={selectClass}>
                  <SelectValue placeholder="Status: All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Status: All Statuses</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="w-full sm:w-[172px]">
            <Select value={isolation} onValueChange={setIsolation}>
              <SelectTrigger className={selectClass}>
                <SelectValue placeholder="Isolation: All Rooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Isolation: All Rooms</SelectItem>
                <SelectItem value="isolation">Isolation Rooms</SelectItem>
                <SelectItem value="standard">Standard Rooms</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <button
            type="button"
            onClick={resetFilters}
            disabled={!hasFilters}
            className="inline-flex h-8 items-center gap-1.5 rounded-sm px-2 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="size-3.5" />
            Reset
          </button>

          </div>
        </div>

       
      </div>

      {/* Grouping and view controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wide text-slate-500 sm:text-[11px]">
            Grouping:
          </span>

          <Select value={grouping} onValueChange={setGrouping}>
            <SelectTrigger className="h-8 w-[145px] rounded-sm border-transparent bg-transparent px-2 text-xs font-medium text-slate-600 shadow-none hover:bg-slate-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pod">By Pod & Room</SelectItem>
              <SelectItem value="ward">By Ward</SelectItem>
              <SelectItem value="acuity">By Acuity</SelectItem>
              <SelectItem value="status">By Bed Status</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center rounded-sm border border-slate-200">
          <button
            type="button"
            aria-label="Grid view"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
            className={`flex size-8 items-center justify-center transition-colors ${
              view === "grid"
                ? "bg-blue-100 text-blue-800"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <LayoutGrid className="size-4" />
          </button>

          <button
            type="button"
            aria-label="List view"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
            className={`flex size-8 items-center justify-center border-l border-slate-200 transition-colors ${
              view === "list"
                ? "bg-blue-100 text-blue-800"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default InPatientWardFilter
