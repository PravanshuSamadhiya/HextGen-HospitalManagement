import { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";

type FollowUp = {
  patient: string;
  date: string;
  notes: string;
};

const FollowUpModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<FollowUp>({ patient: "", date: "", notes: "" });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    try {
      const stored = localStorage.getItem("followUps");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing FollowUps from localStorage:", err);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("followUps", JSON.stringify(followUps));
  }, [followUps]);

  const handleSubmit = () => {
    if (!form.patient || !form.date) return;
    if (editIndex !== null) {
      const updated = [...followUps];
      updated[editIndex] = form;
      setFollowUps(updated);
      setEditIndex(null);
    } else {
      setFollowUps([...followUps, form]);
    }
    setForm({ patient: "", date: "", notes: "" });
    setShowModal(false);
  };

  const handleEdit = (index: number) => {
    setForm(followUps[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    const updated = followUps.filter((_, i) => i !== index);
    setFollowUps(updated);
  };

  return (
  <div className="bg-[#1B2131] p-6 rounded-xl shadow-lg border border-[#2c3346] text-white">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold text-cyan-300">Follow-Up Reminders</h2>
      <Button
        className="text-white px-4 py-2 rounded transition-all"
        onClick={() => {
          setShowModal(true);
          setEditIndex(null);
          setForm({ patient: "", date: "", notes: "" });
        }}
      >
        + Set Follow-Up
      </Button>
    </div>

    {followUps.length === 0 ? (
      <p className="text-gray-400 text-sm text-center">No follow-up reminders yet.</p>
    ) : (
      <ul className="space-y-3 text-sm">
        {followUps.map((f, i) => (
          <li
            key={i}
            className="bg-[#121826] p-4 rounded border border-[#2c3346] flex justify-between items-start shadow-md"
          >
            <div>
              <p className="font-medium text-white">{f.patient}</p>
              <p className="text-green-300">Follow-up on {f.date}</p>
              {f.notes && <p className="text-xs text-green-200 mt-1">Notes: {f.notes}</p>}
            </div>
            <div className="space-x-4">
              <button
                className="text-blue-400 hover:text-blue-500 text-xs underline"
                onClick={() => handleEdit(i)}
              >
                Edit
              </button>
              <button
                className="text-red-400 hover:text-red-500 text-xs underline"
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
        <div className="bg-[#121826] p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl border border-[#2A2F45]">
          <h3 className="text-xl font-semibold text-purple-400">
            {editIndex !== null ? "Edit Reminder" : "New Follow-Up Reminder"}
          </h3>

          <input
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Patient Name"
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
          />

          <input
            type="date"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <textarea
            rows={3}
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Optional notes"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-white px-4 py-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border text-white px-5 py-1 rounded"
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

export default FollowUpModal;
