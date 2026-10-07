import { Input } from "@/components/ui/input";
import { Search } from 'lucide-react';
import { Zap ,BellPlus,BellRing,TriangleAlert,CircleQuestionMark} from 'lucide-react';
const AdminHeader = () => {
    return (
        <div className="flex h-14 items-center justify-between border-b-2 border-gray-300 bg-slate-200 p-4 shadow-xs">

            <div className="flex flex-row items-center gap-4">


                <div className="relative border-2 border-slate-300 rounded-xl cursor-pointer">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <Input
                        type="text"
                        placeholder="Search..."
                        className="pl-10"
                    />
                </div>


                <div className="bg-blue-200 py-1 px-3 rounded-md text-blue-500 font-semibold cursor-pointer">
                    BED 4B-ICU
                </div>
                <div className="flex flex-row items-center gap-2 py-1 px-3 border-2 border-slate-300 rounded-md cursor-pointer">
                    <Zap size={18} className="text-yellow-900" />
                    <h1 className="font-semibold">Stat Order</h1>
                </div>

                <div className="flex flex-row items-center gap-2 py-1 px-3  rounded-md cursor-pointer bg-red-200 text-red-800">
                    <BellPlus size={18} className="text-yellow-900" />
                    <h1 className="font-semibold">Emergency Admit </h1>
                </div>
            </div>


             <div className="flex flex-row gap-4 ">
                <BellRing size={20} />
                <TriangleAlert size={20} />
                <CircleQuestionMark size={20} />
             </div>
          
        </div>
    );
};

export default AdminHeader;