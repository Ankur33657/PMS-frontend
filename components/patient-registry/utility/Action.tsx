"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast"
import PatientService from "@/services/patientRegistry";
import { useState } from "react";
import { CreatePatientProps } from "../types/createPatientProps";
import { Input } from "@base-ui/react";
import { Spinner } from "@/components/ui/spinner"
import {
    Printer,
    UserRoundPlus,
    ShieldCheck,
} from "lucide-react";
import {
    Field,
    FieldLabel,
} from "@/components/ui/field"
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



const Action = () => {
    const [newPatient, setNewPatient] = useState<CreatePatientProps>({
        name: "",
        email: "",
        address: "",
        dateOfBirth: ""
    })
    const[open,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);

     const Items = [
        {
            id: 0,
            title: "Name",
            name: "name",
            value: newPatient.name,
            type: "text",
        },
        {
            id: 1,
            title: "Email",
            name: "email",
            value: newPatient.email,
            type: "email",
        },
        {
            id: 2,
            title: "Address",
            name: "address",
            value: newPatient.address,
            type: "text",
        },
        {
            id: 3,
            title: "Date of Birth",
            name: "dateOfBirth",
            value: newPatient.dateOfBirth,
            type: "date",
        },
    ];

   
    const handleChange = (
        name: string,
        value: string
    ) => {
        setNewPatient((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleAddPatient = async () => {
        try {
            setLoading(true)
            const response = await PatientService?.addPatient(newPatient);
            setLoading(false);
            setOpen(false);

        } catch (error) {
            console.log(error);
            toast.add({
                type: "error",
                description: "Error while creating new Patient",
                priority: "high"
            })
        }
    }
    return (
        <div className="flex items-center gap-3">
            <Button
                variant="outline"
                className="h-10 gap-2 border-slate-300 bg-white px-4 text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                type="button"
            >
                <Printer name="printer" size={16} />
                Export / Print
            </Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button
                        className="h-10 gap-2 bg-emerald-600 px-4 font-medium text-white shadow-sm transition-colors hover:bg-emerald-700"
                        type="button"
                    >
                        <UserRoundPlus name="user-round-plus" size={17} />
                        Add Patient
                    </Button>
                </DialogTrigger>

                <DialogContent className="overflow-hidden border-0 p-0 shadow-2xl sm:max-w-[540px]">
                  
                    <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
                        <div className="flex items-start gap-3">
                            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                <UserRoundPlus name="user-round-plus" size={22} />
                            </div>

                            <div className="space-y-1">
                                <DialogTitle className="text-xl font-semibold tracking-tight text-slate-900">
                                    Register New Patient
                                </DialogTitle>

                                <p className="text-sm leading-5 text-slate-500">
                                    Enter the patient's details to create a new patient record.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5 px-6 py-6">
                        <div className="mb-1">
                            <h3 className="text-sm font-semibold text-slate-800">
                                Patient Information
                            </h3>
                            <p className="mt-1 text-xs text-slate-500">
                                Fields marked with * are required.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
                            {Items.map((item) => (
                                <Field
                                    key={item.id}
                                    className={
                                        item.name === "address" ? "sm:col-span-2" : ""
                                    }
                                >
                                    <FieldLabel
                                        htmlFor={item.name}
                                        className="mb-1.5 text-sm font-medium text-slate-700"
                                    >
                                        {item.title}
                                        <span className="ml-1 text-rose-500">*</span>
                                    </FieldLabel>

                                    <Input
                                        id={item.name}
                                        name={item.name}
                                        type={item.type}
                                        placeholder={`Enter ${item.title.toLowerCase()}`}
                                        value={item.value}
                                        onChange={(e) =>
                                            handleChange(item.name, e.target.value)
                                        }
                                        required
                                        className="h-10 rounded-lg border-slate-300 bg-white px-3 text-sm shadow-sm placeholder:text-slate-400 hover:border-slate-400 focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600/20"
                                    />
                                </Field>
                            ))}
                        </div>

                        <div className="flex items-start gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
                            <ShieldCheck
                                name="shield-check"
                                size={17}
                                className="mt-0.5 shrink-0 text-emerald-700"
                            />
                            <p className="text-xs leading-5 text-slate-600">
                                Patient information should be accurate and handled according
                                to your organization's privacy and security policies.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-10 border-slate-300 px-4"
                            onClick={()=>{setNewPatient({name:"",email:"",address:"",dateOfBirth:""}),setOpen(false)}}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="button"
                            className="h-10 gap-2 bg-emerald-600 px-5 text-white hover:bg-emerald-700"
                            onClick={handleAddPatient}
                        >
                
                            {loading?    <Spinner className="size-6" />: "Create Patient"}
                           
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>


    )
}
export default Action;






