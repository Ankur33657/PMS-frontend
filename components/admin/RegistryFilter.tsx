"use client"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const Items = [
    { id: 0, name: "All Patients", count: "1428" },
    { id: 1, name: "Current Inpatients", count: "312" },
    { id: 2, name: "Recent Outpatient Encounters", count: "145" },
    { id: 3, name: "Chronic Disease Cohorts", count: "428" },
    { id: 4, name: "Pending Verification", count: "19" }
]
const items = [
    { label: "Light", value: "light" },
    { label: "Dark", value: "dark" },
    { label: "System", value: "system" },
]


const RegistryFilter = () => {
    return (
        <div className="border-2 border-gray-300 p-4 rounded-md flex flex-col gap-3 shadow-sm">
            <Tabs defaultValue="overview">
                <TabsList variant="line" className={"flex gap-4"}>
                    {Items.map((item) => {
                        return (
                            <TabsTrigger key={item.id} value={item.name}>
                                {item.name} <div className="bg-blue-100 px-2 py-1 rounded-md text-blue-500">{item.count}</div>
                            </TabsTrigger>
                        )
                    })}


                </TabsList>
            </Tabs>
            <div className="border-b-2 border-slate-300"></div>
            <div className="flex flex-row gap-4 items-center justify-between">
             <div className="flex flex-row gap-4">
                  {[1, 2, 3, 4, 5].map((item) => {
                    return (
                        <div className="flex flex-col gap-2">
                            <h2 className="text-sm font-semibold uppercase">Department</h2>

                            <Select items={items}>
                                <SelectTrigger className="w-[180px] border-2 border-gray-400 rounded-sm">
                                    <SelectValue placeholder="Theme" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {items.map((item) => (
                                            <SelectItem key={item.value} value={item.value}>
                                                {item.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )
                })}
             </div>
                   
                <RotateCcw className="cursor-pointer"/>
            </div>
        </div>
    )
}
export default RegistryFilter;