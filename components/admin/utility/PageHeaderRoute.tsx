
import { ChevronRight,Users } from "lucide-react";
const PageHeaderRoute = ({ currentRoute,Heading,subHeading }: { currentRoute: String,Heading:String,subHeading:String }) => {
    return (
     
        <div className="flex flex-row gap-2 items-center">
            <div className="bg-blue-700 text-gray-200 p-2 rounded-full">
                 <Users className="size-6" />
            </div>
            <div className="flex flex-col gap-0.5">
            <div className="flex flex-row items-center">
                <h4>Dashboard</h4>
                <ChevronRight className="size-3.5" />
                <h4>Admin</h4>
                <ChevronRight className="size-3.5" />
                <h4 className="text-blue-700">{currentRoute}</h4>
            </div>
            <h1 className="text-xl font-bold">
               {Heading}
            </h1>
            <p className="text-xs text-slate-500">
                {subHeading}
            </p>

            </div>
        </div>
    )
}
export default PageHeaderRoute;