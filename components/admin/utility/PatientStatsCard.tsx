
import { UserGroup, Bed, UserRoundPlus, TriangleAlert } from 'lucide-react';
const Items = [
    {
        id: 0, name: "Total Registered Patients", icon: (
            <div className="rounded-full bg-blue-100 p-2">
                <UserGroup size={22} className="text-blue-600" />
            </div>
        ), count: 1428, footer: "Active master records in EMPI database",
        Statscount: "| +12 today"
    },
    {
        id: 1, name: "Active Inpatients", icon: (
            <div className="rounded-full bg-green-100 p-2">
                <Bed size={22} className="text-green-600" />
            </div>
        ), count: 312, footer: "82% Occupied Bed",
        Statscount: "Across 5 Wards"
    }
    , {
        id: 2, name: "New Registrations (7 Days)", icon: (
            <div className="rounded-full bg-blue-100 p-2">
                <UserRoundPlus size={22} className="text-blue-600" />
            </div>
        ), count: 84, footer: "Walk-in admissions & specialist referrals",
        Statscount: "| +14% vs prev week"
    }, {
        id: 3, name: "Flagged / Missing Coverage", icon: (
            <div className="rounded-full bg-red-100 p-2">
                <TriangleAlert size={22} className="text-red-600" />
            </div>
        ), count: 19, footer: "Insurance verification or self-pay clearance required",
        Statscount: "Action Needed"
    }
]
const PatientStatsCard = () => {
    return (
        <div className="grid grid-cols-4 gap-4">
            {Items.map((item) => {

                return (
                    <div
                        key={item.id}
                        className="rounded-md border-2 border-gray-300 p-4 flex flex-col gap-4 shadow-sm"
                    >
                        <div className="flex items-center justify-between gap-2">
                            <h2 className='text-slate-600'>{item.name}</h2>
                            {item.icon}
                        </div>
                        <div className='flex flex-row gap-2 items-center'>
                            <h2 className='text-3xl font-bold text-slate-700'>{item.count}</h2>
                            <h3 className='text-xs font-bold'>{item.Statscount}</h3>
                        </div>
                        <h4 >{item.footer}</h4>
                    </div>
                );
            })}
        </div>
    )
}
export default PatientStatsCard;