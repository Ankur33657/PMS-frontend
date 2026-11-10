import apiInstance from "@/app/axiosInstance";
import {CreatePatientProps} from "@/components/patient-registry/types/createPatientProps"

const ROUTE="/patients"
const ErrorHandling=(error:any)=>{
    const errorMessage = error.response?.data?.message || error.message;
        console.log(errorMessage);
        throw errorMessage;
}

const getAllPatients = async() => {
    try {
       const response=await apiInstance.get(`${ROUTE}`);
       return response?.data;
    } catch (error: any) {
       ErrorHandling(error);
    }
}

const getResgisterdPatientStat=async()=>{
    try{
        const response=await apiInstance.get(`${ROUTE}/stats`);
        return response?.data;

    }catch(error){
       ErrorHandling(error);
    }
}

const addPatient=async(patient:CreatePatientProps)=>{
    try{
        const res=await apiInstance.post(`${ROUTE}`,patient);
        return res?.data;
    }catch(error){
        ErrorHandling(error);
    }

}
const getAllPatientVisit=async() =>{
    try{
      const res=await apiInstance.get(`${ROUTE}/summary`);
      return res?.data;
    }catch(error){
        ErrorHandling(error);
    }
}

const PatientService={
    getAllPatients,
    getResgisterdPatientStat,
    addPatient,
    getAllPatientVisit
}

export default PatientService;