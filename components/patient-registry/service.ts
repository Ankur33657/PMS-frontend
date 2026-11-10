import { useQuery } from "@tanstack/react-query";
import {QueryKey,StaleTime} from "@/common/constant"
import PatientService from "@/services/patientRegistry";
import { PatientRegistryStatsProps } from "@/components/patient-registry/types/PatientRegistry";
export const usePatientRegistryStatsQuery=()=>{
    return useQuery({
        queryKey:[QueryKey?.PATIENT_REGISTRY],
        queryFn:async()=>{
            const res:PatientRegistryStatsProps=await PatientService?.getResgisterdPatientStat();
            return res;
        },
        staleTime:StaleTime?.STALETIME

    })
}


export const useAllPatientVisitQuery=()=>{
    return useQuery({
        queryKey:[QueryKey?.PATIENT_ALL_VISIT],
        queryFn:async()=>{
            const res=await PatientService?.getAllPatientVisit();
            return res;
        },
        staleTime:StaleTime?.STALETIME
    })
}
