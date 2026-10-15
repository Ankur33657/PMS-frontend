import {
  ContactRound,
  Bed,
  CalendarDays,
  ClipboardPenLine,
  Siren,
  ShieldUser,
  Metronome,
  Settings
} from "lucide-react";
import {useRouter }from "next/navigation";


const SideBarTab = ({ CurrentTab, isSelected }: { CurrentTab: number, isSelected: boolean }) => {
  const router = useRouter();
  const tabs = [
    { id: 0, name: "Patient Registry", icon: ContactRound ,route:"/admin"},
    { id: 1, name: "Inpatient Wards", icon: Bed ,route:"/admin/inpatientwards"},
    { id: 2, name: "Appointments", icon: CalendarDays ,route:"/admin/appointments"},
    { id: 3, name: "Clinical Orders", icon: ClipboardPenLine ,route:"/admin/clinical-orders"},
    { id: 4, name: "Rules", icon: Siren ,route:"/admin/rules"},
    { id: 5, name: "Administration", icon: ShieldUser ,route:"/admin/administration"},
    { id: 6, name: "Audit Logs", icon: Metronome ,route:"/admin/audit-logs"},
    { id: 7, name: "System Settings", icon: Settings ,route:"/admin/settings"}
  ];

  const Icon = tabs[CurrentTab].icon;

  return (
    <div className={`flex flex-row items-center gap-2 p-2 text-center ${isSelected ? "bg-blue-100 rounded-md border-l-6 border-green-500" :""} ` } 
    onClick={()=>router.push(tabs[CurrentTab].route)}>
      <Icon size={22} className={isSelected ? "text-green-500" : "text-slate-500"} />

      <h5
        className={`font-semibold ${isSelected ? "text-green-500" : "text-slate-500"
          }`}
      >
        {tabs[CurrentTab].name}
      </h5>
    </div>
  );
};

export default SideBarTab;