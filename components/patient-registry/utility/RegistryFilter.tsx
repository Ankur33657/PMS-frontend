"use client"
import { useState } from "react"
import { SlidersHorizontal } from "lucide-react"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SearchBar from "@/common/utility-component/SearchBar"

const patientCategories = [
  { id: 0, name: "All Patients", count: 1428 },
  { id: 1, name: "Current Inpatients", count: 312 },
  { id: 2, name: "Recent Outpatient Encounters", count: 145 },
  { id: 3, name: "Special Care", count: 428 },
  { id: 4, name: "Pending Verification", count: 19 },
]


const RegistryFilter = () => {
  const [activeTab, setActiveTab] = useState("All Patients")

  return (
    <section className="w-full space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-">
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
      <Tabs value={activeTab} onValueChange={setActiveTab} >
        <TabsList
          variant="line"
          className="h-auto w-full justify-start gap-2  rounded-none border-b border-slate-200 bg-transparent p-0"
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
          <SearchBar/>
        </div>
        
      </div>
    </section>
  )
}

export default RegistryFilter
