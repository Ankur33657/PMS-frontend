
"use client"

import {
  Users,
  BedDouble,
  UserRoundPlus,
  TriangleAlert,
  ArrowUpRight,
  Activity,
} from "lucide-react"

const items = [
  {
    id: 0,
    name: "Total Registered Patients",
    icon: Users,
    count: "1,428",
    footer: "Active master records in EMPI database",
    stat: "+12 today",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    statColor: "text-emerald-600",
    accent: "bg-blue-500",
  },
  {
    id: 1,
    name: "Active Inpatients",
    icon: BedDouble,
    count: "312",
    footer: "82% occupied bed capacity",
    stat: "Across 5 wards",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    statColor: "text-slate-500",
    accent: "bg-emerald-500",
  },
  {
    id: 2,
    name: "New Registrations",
    icon: UserRoundPlus,
    count: "84",
    footer: "New patients registered in 7 days",
    stat: "+14% vs last week",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
    statColor: "text-emerald-600",
    accent: "bg-violet-500",
  },
  {
    id: 3,
    name: "Flagged / Missing Coverage",
    icon: TriangleAlert,
    count: "19",
    footer: "Insurance verification or clearance required",
    stat: "Action needed",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    statColor: "text-rose-600",
    accent: "bg-rose-500",
  },
]

const PatientStatsCard = () => {
  return (
    <section className="w-full space-y-4">
      {/* Section heading */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Patient Overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Key metrics across your healthcare facility
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-500 sm:flex">
          <Activity className="size-4 text-blue-600" />
          Registry statistics
        </div>
      </div>

      {/* Statistics grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
            >
              {/* Top accent */}
              <div
                className={`absolute inset-x-0 top-0 h-1 ${item.accent}`}
              />

              {/* Card heading */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium leading-5 text-slate-500">
                    {item.name}
                  </p>
                </div>

                <div
                  className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}
                >
                  <Icon className={`size-5 ${item.iconColor}`} />
                </div>
              </div>

              {/* Main metric */}
              <div className="mt-5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <h3 className="text-3xl font-bold tracking-tight tabular-nums text-slate-900">
                  {item.count}
                </h3>
              </div>

              {/* Supporting metric */}
              <div className="mt-3 flex min-h-6 items-center gap-1.5">
                {item.id === 0 || item.id === 2 ? (
                  <ArrowUpRight
                    className={`size-4 shrink-0 ${item.statColor}`}
                  />
                ) : null}

                {item.id === 1 ? (
                  <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
                ) : null}

                {item.id === 3 ? (
                  <TriangleAlert
                    className={`size-3.5 shrink-0 ${item.statColor}`}
                  />
                ) : null}

                <span className={`text-xs font-semibold ${item.statColor}`}>
                  {item.stat}
                </span>
              </div>

              {/* Divider and footer */}
              <div className="mt-4 border-t border-slate-100 pt-3">
                <p className="text-xs leading-5 text-slate-500">
                  {item.footer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PatientStatsCard
