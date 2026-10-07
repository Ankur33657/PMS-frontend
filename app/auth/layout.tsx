import React from "react";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" h-screen p-4 justify-center items-center flex">
      {children}
    </div>
  );
}
export default AuthLayout;