import { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";
type Patient = {
  id: number;
  name: string;
  ward: string;
  days: number;
  dailyRate: number;
};

export const InpatientManagement = () => {
  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const stored = localStorage.getItem("inpatients");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing inpatients from localStorage:", err);
      return [];
    }
  });

  const [form, setForm] = useState({
    name: "",
    ward: "",
    days: "",
    dailyRate: "",
  });

  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    localStorage.setItem("inpatients", JSON.stringify(patients));
  }, [patients]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, ward, days, dailyRate } = form;

    if (!name || !ward || !days || !dailyRate) {
      alert("Please fill in all fields");
      return;
    }

    const newPatient: Patient = {
      id: Date.now(),
      name,
      ward,
      days: parseInt(days),
      dailyRate: parseInt(dailyRate),
    };

    setPatients((prev) => [...prev, newPatient]);
    setForm({ name: "", ward: "", days: "", dailyRate: "" });
    setShowForm(false); 
  };

  const handleDelete = (id: number) => {
    setPatients((prev) => prev.filter((p) => p.id !== id));
  };

  return (
  <div className="bg-[#1B2131] p-6 shadow-lg rounded-xl border border-[#2c3346] text-white">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-cyan-300">Inpatient Management</h2>
      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="text-white px-4 py-2 rounded transition"
        >
          Add Patient
        </Button>
      )}
    </div>

    {showForm && (
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Patient Name"
          className="p-2 border border-[#2c3346] bg-[#121826] text-white rounded placeholder-gray-400"
        />
        <input
          type="text"
          name="ward"
          value={form.ward}
          onChange={handleChange}
          placeholder="Ward (e.g. ICU)"
          className="p-2 border border-[#2c3346] bg-[#121826] text-white rounded placeholder-gray-400"
        />
        <input
          type="number"
          name="days"
          value={form.days}
          onChange={handleChange}
          placeholder="Days"
          className="p-2 border border-[#2c3346] bg-[#121826] text-white rounded placeholder-gray-400"
        />
        <input
          type="number"
          name="dailyRate"
          value={form.dailyRate}
          onChange={handleChange}
          placeholder="Daily Rate (₹)"
          className="p-2 border border-[#2c3346] bg-[#121826] text-white rounded placeholder-gray-400"
        />
        <div className="md:col-span-4 flex gap-4">
          <button
            type="submit"
            className="w-full  text-white p-2 rounded border transition"
          >
            Save Patient
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    )}

    {patients.length === 0 ? (
      <p className="text-gray-500 text-center">No inpatients added yet.</p>
    ) : (
      patients.map((p) => (
        <div
          key={p.id}
          className="p-4 border border-[#2c3346] rounded-lg mb-4 bg-[#121826]"
        >
          <div className="flex justify-between items-center">
            <div>
              <p>
                🏥 <strong>{p.name}</strong> in{" "}
                <span className="text-purple-400">{p.ward}</span>
              </p>
              <p className="text-gray-300">
                🕒 {p.days} days × ₹{p.dailyRate}/day
              </p>
              <p className="mt-2 font-semibold text-green-400">
                💰 Total: ₹{p.days * p.dailyRate}
              </p>
            </div>
            <button
              onClick={() => handleDelete(p.id)}
              className="text-red-400 hover:text-red-500 text-sm underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);
};
