import { useState, useEffect } from "react";
import { Button } from "../ui/moving-border";

type Appointment = {
  patient: string;
  doctor: string;
  time: string;
};

export const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const stored = localStorage.getItem("appointments");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing appointments from localStorage:", err);
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Appointment>({
    patient: "",
    doctor: "",
    time: "",
  });

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  const handleSubmit = () => {
    if (!form.patient || !form.doctor || !form.time) return;

    if (editingIndex !== null) {
      const updated = [...appointments];
      updated[editingIndex] = form;
      setAppointments(updated);
      setEditingIndex(null);
    } else {
      setAppointments([...appointments, form]);
    }

    setForm({ patient: "", doctor: "", time: "" });
    setShowModal(false);
  };

  const handleEdit = (index: number) => {
    setForm(appointments[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    const updated = appointments.filter((_, i) => i !== index);
    setAppointments(updated);
  };

  return (
    <div className="bg-[#1B2131] p-6 shadow-lg rounded-xl border border-[#2c3346] text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-cyan-300">Appointment Scheduler</h2>
        <Button
          className=" text-white px-4 py-2 rounded transition-all"
            onClick={() => {
            setForm({ patient: "", doctor: "", time: "" });
            setEditingIndex(null);
            setShowModal(true);
          }}
        >
          + Book Appointment
        </Button>
      </div>

      {appointments.length === 0 ? (
        <p className="text-gray-400 text-sm text-center">No appointments booked yet.</p>
      ) : (
        <div className="divide-y divide-[#2c3346] text-sm">
          {appointments.map((a, i) => (
            <div key={i} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium text-white">{a.patient}</p>
                <p className="text-gray-400 text-xs">with {a.doctor}</p>
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-gray-300">{a.time}</p>
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
              {editingIndex !== null ? "Edit Appointment" : "Book New Appointment"}
            </h3>

            <input
              className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Patient Name"
              value={form.patient}
              onChange={(e) => setForm({ ...form, patient: e.target.value })}
            />

            <input
              className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              placeholder="Doctor Name"
              value={form.doctor}
              onChange={(e) => setForm({ ...form, doctor: e.target.value })}
            />

            <input
              className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
              type="datetime-local"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingIndex(null);
                }}
                className="text-gray-400 hover:text-white px-4 py-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="text-white px-4 py-1 rounded border"
              >
                {editingIndex !== null ? "Update" : "Book"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};
