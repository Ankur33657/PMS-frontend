import PageHeaderRoute from "../admin/utility/PageHeaderRoute"
import PatientStatsCard from "./utility/PatientStatsCard"
import RegistryFilter from "./utility/RegistryFilter"
import PatientRegistryTable from "./utility/PatientRegistryTable"
import Action from "./utility/Action"

const PatientRegistry = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
       <div className="flex flex-row justify-between items-center">
         <PageHeaderRoute currentRoute={"Master Registry"} Heading={" Master Patient Index"}
              subHeading={" Manage patient demographics, clinical episodes, insuranceeligibility, and historical records across departments."} />
             <Action/>
       </div>
      
        <PatientStatsCard />

        <section className="min-w-0">
          <RegistryFilter />
        </section>

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
            <PatientRegistryTable />
          </div>
        </section>

    </div>
  )
}

export default PatientRegistry
