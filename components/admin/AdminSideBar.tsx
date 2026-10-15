
"use client"

import Image from "next/image"
import { ShieldCheck, ChevronRight, Activity } from "lucide-react"
import { useState } from "react"
import SideBarTab from "@/components/admin/SideBarTab"

const AdminSideBar = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <aside className="flex h-screen w-72 shrink-0 flex-col border-r border-slate-200 bg-white">

      {/* Brand */}
      <div className="border-b border-slate-100 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
            <Image
              src="/plus.webp"
              alt="CarePulse logo"
              width={40}
              height={40}
              className="rounded-lg object-cover"
            />
          </div>

          <div className="min-w-0">
            <h1 className="text-lg font-bold tracking-tight text-slate-900">
              CarePulse <span className="text-emerald-600">EHR</span>
            </h1>
            <p className="truncate text-xs text-slate-500">
              St. Jude Medical Center
            </p>
          </div>
        </div>
      </div>

      {/* Role */}
      <div className="px-4 pt-5">
        <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
            <ShieldCheck className="size-5" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Signed in as
            </p>
            <p className="mt-0.5 text-sm font-bold text-slate-800">
              Doctor
            </p>
          </div>

          <span className="size-2 rounded-full bg-emerald-500" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Workspace
        </p>

        <div className="flex flex-col gap-1.5">
          {[0, 1, 2, 3, 4, 5].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              aria-current={selectedTab === tab ? "page" : undefined}
              className={`group w-full rounded-xl text-left transition-all duration-200 ${
                selectedTab === tab
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <SideBarTab
                CurrentTab={tab}
                isSelected={tab === selectedTab}
              />
            </button>
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-slate-100 p-3">
        <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
          Preferences
        </p>

        <div className="flex flex-col gap-1">
          {[6, 7].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setSelectedTab(tab)}
              aria-current={selectedTab === tab ? "page" : undefined}
              className={`w-full rounded-xl text-left transition-colors ${
                selectedTab === tab
                  ? "bg-emerald-50 text-emerald-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <SideBarTab
                CurrentTab={tab}
                isSelected={tab === selectedTab}
              />
            </button>
          ))}
        </div>

        {/* Doctor profile */}
        <div className="mt-4 border-t border-slate-100 pt-4">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-slate-50"
          >
            <Image
              src="/doctor.webp"
              alt="Dr. John Doe"
              width={42}
              height={42}
              className="size-[42px] shrink-0 rounded-full border border-slate-200 object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-800">
                Dr. John Doe
              </p>
              <p className="mt-0.5 text-xs text-slate-500">
                Medical Practitioner
              </p>
            </div>

            <ChevronRight className="size-4 shrink-0 text-slate-400" />
          </button>

          <div className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
            <Activity className="size-3.5 text-emerald-600" />
            <span className="text-[11px] font-medium text-slate-500">
              CarePulse EHR · Secure workspace
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default AdminSideBar
