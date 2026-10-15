
"use client"

import { Input } from "@/components/ui/input"
import {
  Search,
  Zap,
  BellPlus,
  BellRing,
  TriangleAlert,
  CircleHelp,
  ChevronDown,
} from "lucide-react"

const AdminHeader = () => {
  return (
    <header className="sticky top-0 z-40 flex min-h-16 w-full items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-4 py-3 shadow-sm backdrop-blur-md sm:px-6">

      {/* Search and clinical context */}
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3 xl:flex-nowrap">

        {/* Search */}
        <div className="relative w-full min-w-0 sm:max-w-sm xl:w-72 xl:shrink-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />

          <Input
            type="search"
            placeholder="Search patients, records..."
            aria-label="Search patients and records"
            className="h-10 rounded-xl border-slate-200 bg-slate-50 pl-9 pr-14 text-sm placeholder:text-slate-400 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-blue-100"
          />

          <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 sm:inline-block">
            Search
          </kbd>
        </div>

        {/* Current care context */}
        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition-colors hover:bg-blue-100"
        >
          <span className="size-2 rounded-full bg-blue-500" />
          BED 4B · ICU
          <ChevronDown className="size-3.5 text-blue-500" />
        </button>

        {/* Clinical actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3 text-sm font-semibold text-amber-800 transition-colors hover:bg-amber-100"
          >
            <Zap className="size-4" />
            <span>Stat Order</span>
          </button>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-rose-600 px-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2"
          >
            <BellPlus className="size-4" />
            <span>Emergency Admit</span>
          </button>
        </div>
      </div>

      {/* Utility actions */}
      <div className="flex shrink-0 items-center gap-1 border-l border-slate-200 pl-3 sm:gap-2 sm:pl-4">

        <button
          type="button"
          aria-label="Notifications"
          className="relative flex size-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <BellRing className="size-5" />
          <span className="absolute right-2 top-2 size-2 rounded-full border-2 border-white bg-blue-600" />
        </button>

        <button
          type="button"
          aria-label="Clinical alerts"
          className="relative flex size-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-rose-50 hover:text-rose-600"
        >
          <TriangleAlert className="size-5" />
        </button>

        <button
          type="button"
          aria-label="Help and support"
          className="flex size-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
        >
          <CircleHelp className="size-5" />
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
