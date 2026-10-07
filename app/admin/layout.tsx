import React from "react";
import AdminSideBar from "@/components/admin/AdminSideBar";
import AdminHeader from "@/components/admin/AdminHeader";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return(
    <div className="h-screen w-screen flex flex-row">
        <AdminSideBar/>
      <div className="flex flex-col gap-2 w-[calc(100%-76px)]">
         <AdminHeader/>
         {children}

      </div>
    </div>
  )
}
export default AdminLayout;