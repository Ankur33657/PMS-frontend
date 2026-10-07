"use client"
import Image from "next/image";
import { ShieldCogCorner } from 'lucide-react';
import SideBarTab from "@/components/admin/SideBarTab"
import { useState } from "react";
const AdminSideBar=()=>{
    const [selectedTab,setSelectedTab]=useState(0);
    return(
      <div className="h-screen w-76 bg-slate-200 px-3 py-4 border-r-2 border-gray-300 shadow-xs flex flex-col justify-between">
        <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 justify-start items-center">
                <Image src="/plus.webp" alt="Logo" width={50} height={50} className="rounded-full" />
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl text-green-400">CarePulse EHR</h1>
                    <h2 className="text-sm text-slate-500">St. Jude Medical Center</h2>
                </div>
            </div>
           <div className="border-2 border-slate-200 bg-blue-200 text-blue-500 p-2 flex flex-row gap-2 rounded-sm font-semibold">
           <ShieldCogCorner/>
           <h1>Role: DOCTOR</h1>
           
           </div>
           <div className="flex flex-col gap-2">
            {[0,1,2,3,4,5].map((tab)=>(
                <div key={tab} onClick={()=>setSelectedTab(tab)} className="cursor-pointer">
                      <SideBarTab CurrentTab={tab} isSelected={tab===selectedTab}/>
                </div>
            ))}

           </div>
        </div>
        <div className="border-t-2 border-slate-300 flex flex-col gap-2 py-4">

           {[6,7].map((tab)=>(
            <div key={tab} onClick={()=>setSelectedTab(tab)} className="cursor-pointer">
                  <SideBarTab CurrentTab={tab} isSelected={tab===selectedTab}/>
            </div>
        ))}

         <div className="flex flex-row gap-2 p-2">
            <Image src="/doctor.webp" alt="Logo" width={50} height={50} className="rounded-full" />
            <div className="flex flex-col gap-1">
                <h1 className="text-md text-green-800">Dr. John Doe</h1>
                <h2 className="text-sm text-slate-500">Doctor</h2>
                </div>
         </div>
        </div>
       
      </div>
    )
}
export default AdminSideBar;