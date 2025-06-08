import { Hospital, User, FileText } from "lucide-react";

export const RoleDashboards = () => {
  const metrics = [
    { title: "Patients Today", count: 38, icon: <User className="text-purple-400" size={28} /> },
    { title: "Reports Processed", count: 22, icon: <FileText className="text-green-400" size={28} /> },
    { title: "Beds Occupied", count: 14, icon: <Hospital className="text-blue-400" size={28} /> },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {metrics.map((m, i) => (
        <div
          key={i}
          className="bg-[#1B2131] p-6 rounded-xl shadow-lg border border-[#2c3346] flex items-center gap-4 transition-transform hover:scale-[1.02]"
        >
          <div className="p-3 rounded-full bg-[#2A2F45]">{m.icon}</div>
          <div>
            <h4 className="text-sm text-gray-400">{m.title}</h4>
            <p className="text-2xl font-bold text-white">{m.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
