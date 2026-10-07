
import dynamic from "next/dynamic";
import LoginCardSkelton from "@/components/skelton/LoginCard";
const Login=dynamic(()=>import("@/components/auth/login"),
{
     loading: () =>  <LoginCardSkelton/>,
})

const LoginPage=()=>{
    return (
       <Login/>
    )
}
export default LoginPage;