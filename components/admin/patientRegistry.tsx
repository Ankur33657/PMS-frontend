import PatientStatsCard from "./utility/PatientStatsCard";
import PatientRegistryTabs from "./utility/patientRegistryTabs";
import RegistryFilter from "./RegistryFilter";
const PatientRegistry=()=>{
    return (
        <div className="p-4 flex flex-col gap-6">
           <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col gap-2 w-170">
                <h1>Master Patient Index & Clinical Registry</h1>
                <h5 className="flex flex-wrap text-sm">Search, manage demographics, active clinical episodes, insurance eligibility, and historical records across all departments.</h5>
            </div>
             <PatientRegistryTabs/>
           </div>
          <PatientStatsCard/>
          <RegistryFilter/>
        </div>
    )
}
export default PatientRegistry;