
"use client"

import {
  Users,
  UserPlus,
  Download,
  Activity,
  ChevronRight,
} from "lucide-react"
import InPatientWardFilter from "./utility/InPatientWardFilter"
import RegistryFilter from "./utility/RegistryFilter"
import PatientRegistryTable from "./utility/PatientRegistryTable"
import InPatientWardStatCard from "./utility/InpatientWardStatCard"
import InPatientDetailsCard from "./utility/InPatientDetailsCard"
const InPatientWard = () => {
  return (
    <main className="min-h-screen w-full bg-slate-50/70 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-7">

        {/* Page header */}
        <section className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <div className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm sm:flex">
              <Users className="size-6" />
            </div>

            <div className="min-w-0 space-y-2">
              {/* Breadcrumb */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                <span>Dashboard</span>
                <ChevronRight className="size-3.5" />
                <span>Admin</span>
                <ChevronRight className="size-3.5" />
                <span className="text-blue-700">In-Patient-ward</span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
               Inpatient Wards & Bed Board

              </h1>

              <p className="max-w-3xl text-sm leading-6 text-slate-500 sm:text-base">
               Live census, bed allocation, acuity telemetry, and patient transfers across inpatient units.
              </p>
            </div>
          </div>

          {/* Page actions */}
          <div className="flex shrink-0 flex-wrap items-center gap-3 xl:justify-end">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-100"
            >
              <Download className="size-4" />
              Export / Print
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/patients/new"
              }}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              <UserPlus className="size-4" />
              Admit/Transfer Patient
            </button>
          </div>
        </section>

        {/* Registry status strip */}
        <section className="flex flex-col gap-3 rounded-xl border border-blue-100 bg-blue-50/60 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white text-blue-600 shadow-sm">
              <Activity className="size-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Patient registry overview
              </p>
              <p className="text-xs leading-5 text-slate-500">
                Review registrations, admissions, and records requiring attention.
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-medium text-blue-700">
            <span className="size-2 rounded-full bg-blue-500" />
            Registry workspace
          </span>
        </section>

        {/* Statistics */}
        <InPatientWardStatCard />

      

        {/* Search and filters */}
        <section className="min-w-0">
          <InPatientWardFilter />
        </section>

        {/* Patient records */}
        <section className="min-w-0 space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">
                Patient Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View and manage patient information in the registry.
              </p>
            </div>
          </div>

          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm sm:p-4">
            {/* <PatientRegistryTable /> */}
          <InPatientDetailsCard/>
          </div>
        </section>

      </div>
    </main>
  )
}

export default InPatientWard;
