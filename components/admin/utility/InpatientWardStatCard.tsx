
"use client"

import {
  BedDouble,
  AlertTriangle,
  LogOut,
  BrushCleaning,
  TrendingUp,
  Activity,
} from "lucide-react"

const items = [
  {
    id: 0,
    name: "TOTAL INPATIENT CENSUS",
    icon: BedDouble,
    count: "312",
    suffix: "/ 355",
    description: "licensed beds",
    progress: 88,
    progressLabel: "88% Total Occupancy",
    footer: "+6 admits today",
    color: "blue",
    accent: "border-l-blue-500",
    iconStyle: "bg-blue-100 text-blue-700",
    barStyle: "bg-blue-900",
    progressStyle: "bg-blue-100",
    valueStyle: "text-sky-950",
  },
  {
    id: 1,
    name: "ICU & CRITICAL CARE",
    icon: Activity,
    count: "32",
    suffix: "/ 34",
    description: "beds active",
    progress: 94,
    progressLabel: "94% Critical Capacity",
    footer: "2 vent beds open",
    color: "amber",
    accent: "border-l-amber-800",
    iconStyle: "bg-orange-100 text-orange-800",
    barStyle: "bg-amber-800",
    progressStyle: "bg-slate-100",
    valueStyle: "text-amber-900",
  },
  {
    id: 2,
    name: "DISCHARGES IN PROGRESS",
    icon: LogOut,
    count: "18",
    suffix: "",
    description: "planned today",
    progress: 61,
    progressLabel: "11 Discharged",
    footer: "7 pending pharmacy",
    color: "teal",
    accent: "border-l-teal-600",
    iconStyle: "bg-teal-100 text-teal-700",
    barStyle: "bg-teal-700",
    progressStyle: "bg-blue-100",
    valueStyle: "text-sky-950",
  },
  {
    id: 3,
    name: "BED TURNOVER / SANITATION",
    icon: BrushCleaning,
    count: "9",
    suffix: "",
    description: "in rapid turnaround",
    progress: 44,
    progressLabel: "Avg clean time: 24m",
    footer: "3 priority STAT",
    color: "cyan",
    accent: "border-l-sky-500",
    iconStyle: "bg-blue-100 text-sky-800",
    barStyle: "bg-teal-400",
    progressStyle: "bg-blue-100",
    valueStyle: "text-sky-950",
  },
]

const InPatientWardStatCard = () => {
  return (
    <section className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-slate-800">
            Clinical Operations Overview
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Inpatient census, critical care, discharges and bed turnover
          </p>
        </div>

        <span className="hidden items-center gap-1.5 text-xs font-medium text-slate-500 sm:flex">
          <span className="size-2 rounded-full bg-emerald-500" />
          Hospital metrics
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <article
              key={item.id}
              className={`flex min-w-0 flex-col border border-slate-200 border-l-4 ${item.accent} bg-white p-4 shadow-sm transition-shadow duration-200 hover:shadow-md`}
            >
              {/* Card heading */}
              <div className="flex min-h-[58px] items-start justify-between gap-2">
                <h3 className="max-w-[190px] text-xs font-bold leading-[1.45] tracking-wide text-slate-600">
                  {item.id === 1 && (
                    <AlertTriangle className="mr-1 inline size-3.5 text-amber-700" />
                  )}
                  {item.name}
                </h3>

                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-sm ${item.iconStyle}`}
                >
                  <Icon className="size-5" strokeWidth={2} />
                </div>
              </div>

              {/* Main value */}
              <div className="mt-3 flex min-h-[65px] items-start gap-2">
                <span
                  className={`text-[2.5rem] font-semibold leading-none tracking-tight tabular-nums ${item.valueStyle}`}
                >
                  {item.count}
                </span>

                {item.suffix && (
                  <div className="pt-1">
                    <span className="text-lg font-medium text-slate-400">
                      {item.suffix}
                    </span>
                    <p className="mt-1 max-w-[90px] text-xs leading-4 text-slate-600">
                      {item.description}
                    </p>
                  </div>
                )}

                {!item.suffix && (
                  <p className="max-w-[110px] pt-2 text-sm leading-5 text-slate-600">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div
                  className={`h-2.5 overflow-hidden rounded-full ${item.progressStyle}`}
                  role="progressbar"
                  aria-label={item.name}
                  aria-valuenow={item.progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className={`h-full rounded-full ${item.barStyle}`}
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer metrics */}
              <div className="mt-3 flex flex-1 flex-wrap items-start justify-between gap-x-3 gap-y-2 border-t border-slate-200 pt-3">
                <p className="flex min-w-0 max-w-[60%] items-start gap-1 text-xs font-semibold leading-4 text-teal-800">
                  {item.id === 0 && (
                    <TrendingUp className="mt-0.5 size-3.5 shrink-0" />
                  )}
                  <span>{item.progressLabel}</span>
                </p>

                <p
                  className={`min-w-0 flex-1 text-right text-xs font-medium leading-4 ${
                    item.id === 1 || item.id === 3
                      ? "text-amber-900"
                      : "text-slate-700"
                  }`}
                >
                  {item.footer}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default InPatientWardStatCard
