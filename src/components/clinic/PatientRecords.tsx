import { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";
type Patient = {
  name: string;
  age: number;
  contact: string;
  history: string;
};

const PatientRecords = () => {
  const [form, setForm] = useState<Patient>({ name: "", age: 0, contact: "", history: "" });
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [patients, setPatients] = useState<Patient[]>(() => {
     try {
      const stored = localStorage.getItem("paitents");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing paitents from localStorage:", err);
      return [];
    }
  });

  const handleSubmit = () => {
    if (!form.name || !form.contact) return;
    if (editIndex !== null) {
      const updated = [...patients];
      updated[editIndex] = form;
      setPatients(updated);
      setEditIndex(null);
    } else {
      setPatients([...patients, form]);
    }
    setForm({ name: "", age: 0, contact: "", history: "" });
    setShowModal(false);
  };

  const handleEdit = (index: number) => {
    setForm(patients[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    setPatients(patients.filter((_, i) => i !== index));
  };

   useEffect(() => {
      localStorage.setItem("paitents", JSON.stringify(patients));
    }, [patients]);

  return (
  <div className="bg-[#1B2131] p-6 shadow-lg rounded-xl border border-[#2c3346] text-white">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-cyan-300">Patient Records</h2>
      <Button
        className="text-white px-4 py-2 rounded transition-all"
        onClick={() => {
          setForm({ name: "", age: 0, contact: "", history: "" });
          setEditIndex(null);
          setShowModal(true);
        }}
      >
        + Add Patient
      </Button>
    </div>

    {patients.length === 0 ? (
      <p className="text-gray-400 text-sm text-center">No patients found.</p>
    ) : (
      <div className="divide-y divide-[#2c3346] text-sm">
        {patients.map((p, i) => (
          <div key={i} className="py-3 flex justify-between items-start">
            <div>
              <p className="font-medium text-white">
                {p.name} ({p.age} years)
              </p>
              <p className="text-gray-400 text-xs">Contact: {p.contact}</p>
              {p.history && (
                <p className="text-gray-400 text-xs mt-1">History: {p.history}</p>
              )}
            </div>
            <div className="flex gap-3 items-center">
              <button
                className="text-blue-400 text-xs underline hover:text-blue-500"
                onClick={() => handleEdit(i)}
              >
                Edit
              </button>
              <button
                className="text-red-400 text-xs underline hover:text-red-500"
                onClick={() => handleDelete(i)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )}

    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#121826] p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl border border-[#2A2F45]">
          <h3 className="text-xl font-semibold text-purple-400">
            {editIndex !== null ? "Edit Patient" : "Add Patient"}
          </h3>

          <input
            type="text"
            placeholder="Name"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            placeholder="Age"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
          />

          <input
            type="text"
            placeholder="Contact"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />

          <textarea
            placeholder="Medical History (optional)"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            rows={3}
            value={form.history}
            onChange={(e) => setForm({ ...form, history: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setShowModal(false);
                setEditIndex(null);
              }}
              className="text-gray-400 hover:text-white px-4 py-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border text-white px-4 py-1 rounded"
            >
              {editIndex !== null ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default PatientRecords;
