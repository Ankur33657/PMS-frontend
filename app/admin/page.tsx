import PatientRegistrySkelton from "@/components/skelton/PatientRegistrySkelton";
import dynamic from "next/dynamic";
const PatientRegistry=dynamic(()=>import("@/components/patient-registry/patientRegistry"),{
    loading:()=> <PatientRegistrySkelton/>
})
const HomePage=()=>{
    return (
            <PatientRegistry/>
    )
}
export default HomePage;