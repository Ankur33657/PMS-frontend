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


const SideBarTab = ({ CurrentTab, isSelected }: { CurrentTab: number, isSelected: boolean }) => {
  const tabs = [
    { id: 0, name: "Patient Registry", icon: ContactRound },
    { id: 1, name: "Inpatient Wards", icon: Bed },
    { id: 2, name: "Appointments", icon: CalendarDays },
    { id: 3, name: "Clinical Orders", icon: ClipboardPenLine },
    { id: 4, name: "Triage Queue", icon: Siren },
    { id: 5, name: "Administration", icon: ShieldUser },
    { id: 6, name: "Audit Logs", icon: Metronome },
    { id: 7, name: "Settings", icon: Settings }
  ];

  const Icon = tabs[CurrentTab].icon;

  return (
    <div className={`flex flex-row items-center gap-2 p-2 text-center ${isSelected ? "bg-blue-100 rounded-md border-l-6 border-green-500" :""} ` }>
      <Icon size={22} className={isSelected ? "text-green-500" : "text-slate-500"} />

      <h1
        className={`font-semibold ${isSelected ? "text-green-500" : "text-slate-500"
          }`}
      >
        {tabs[CurrentTab].name}
      </h1>
    </div>
  );
};

export default SideBarTab;