
import dynamic from "next/dynamic";
import LoginCardSkelton from "@/components/skelton/LoginCard";
const Signup=dynamic(()=>import("@/components/auth/signup"),
{
     loading: () =>  <LoginCardSkelton/>,
})
const SignupPage=()=>{
    return (
       <Signup />
    
    )

}
export default SignupPage;