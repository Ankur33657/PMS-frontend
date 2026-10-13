import React from "react";
import AdminSideBar from "@/components/admin/AdminSideBar";
import AdminHeader from "@/components/admin/AdminHeader";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return(
    <div className="h-screen w-screen flex flex-row">
        <AdminSideBar/>
      <div className="flex flex-col w-[calc(100%-76px)]">
         <AdminHeader/>
         <div className="bg-blue-50 h-[calc(100%-14px)] overflow-y-auto ">

         {children}
         </div>

      </div>
    </div>
  )
}
export default AdminLayout;