import { Merge, Download, UserPlus } from "lucide-react";

const Items = [
  { id: 0, name: "Merge Duplicate Records", icon: Merge },
  { id: 1, name: "Batch Export (CSV/FHIR)", icon: Download },
  { id: 2, name: "Register New Patient", icon: UserPlus },
];

const PatientRegistryTabs = () => {
  return (
    <div className="flex flex-wrap gap-3">
      {Items.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="flex items-center gap-2 rounded-sm border-2 border-gray-300 px-4 py-2 cursor-pointer hover:bg-blue-200 hover:border-blue-400 shadow-sm"
          >
            <Icon size={20} />
            <h4>{item.name}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default PatientRegistryTabs;