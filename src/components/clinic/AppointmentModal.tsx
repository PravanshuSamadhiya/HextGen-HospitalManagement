import { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";

type Appointment = {
    patient: string;
    date: string;
    time: string;
    reason: string;
};

const AppointmentModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState<Appointment>({
        patient: "",
        date: "",
        time: "",
        reason: "",
    });
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [searchTerm] = useState("");
    const [appointments, setAppointments] = useState<Appointment[]>(() => {
        try {
      const stored = localStorage.getItem("appointments");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing appointments from localStorage:", err);
      return [];
    }
    });

    const handleSubmit = () => {
        if (!form.patient || !form.date || !form.time) return;

        if (editIndex !== null) {
            const updated = [...appointments];
            updated[editIndex] = form;
            setAppointments(updated);
            setEditIndex(null);
        } else {
            setAppointments([...appointments, form]);
        }
        setForm({ patient: "", date: "", time: "", reason: "" });
        setShowModal(false);
    };

    const handleEdit = (index: number) => {
        setForm(appointments[index]);
        setEditIndex(index);
        setShowModal(true);
    };

    const handleDelete = (index: number) => {
        setAppointments(appointments.filter((_, i) => i !== index));
    };

    const filteredAppointments = appointments.filter((app) =>
        app.patient.toLowerCase().includes(searchTerm.toLowerCase())
    );

     useEffect(() => {
        localStorage.setItem("appointments", JSON.stringify(appointments));
      }, [appointments]);

    return (
  <div className="bg-[#121826] p-6 rounded-xl shadow-lg border border-[#1F2937]">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-xl font-semibold text-cyan-300">
        {editIndex !== null ? "Edit Appointment" : "Book Appointment"}
      </h3>
      <Button
        className="transition text-white px-4 py-2 rounded"
        onClick={() => {
          setShowModal(true);
          setEditIndex(null);
          setForm({ patient: "", date: "", time: "", reason: "" });
        }}
      >
        + Book Appointment
      </Button>
    </div>

    {filteredAppointments.length === 0 ? (
      <p className="text-gray-400 text-sm text-center">No appointments scheduled.</p>
    ) : (
      <ul className="space-y-3">
        {filteredAppointments.map((app, i) => (
          <li key={i} className="bg-[#1E293B] p-4 rounded shadow-sm flex justify-between items-start">
            <div>
              <p className="font-medium text-white">{app.patient}</p>
              <p className="text-sm text-blue-300">
                {app.date} at {app.time}
              </p>
              {app.reason && (
                <p className="text-xs text-gray-400 mt-1">Reason: {app.reason}</p>
              )}
            </div>
            <div className="space-x-3">
              <button
                className="text-blue-400 hover:text-blue-600 transition text-sm"
                onClick={() => handleEdit(i)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:text-red-600 transition text-sm"
                onClick={() => handleDelete(i)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    )}

    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#121826] p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl text-white border border-[#2A2F45]">
          <h3 className="text-lg font-semibold">
            {editIndex !== null ? "Edit Appointment" : "Book Appointment"}
          </h3>

          <input
            type="text"
            placeholder="Patient name"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
          />

          <input
            type="date"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <input
            type="time"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />

          <textarea
            rows={3}
            placeholder="Reason for visit (optional)"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
          ></textarea>

          <div className="flex justify-end gap-3 pt-2">
            <button
              className="text-blue-300 px-4 py-1 hover:underline"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              className="border transition text-white px-5 py-1 rounded"
              onClick={handleSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default AppointmentModal;
