import { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";

type LabReport = {
  patient: string;
  test: string;
  date: string;
};

const LabReportModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<LabReport>({ patient: "", test: "", date: "" });
  const [reports, setReports] = useState<LabReport[]>(() => {
    try {
      const stored = localStorage.getItem("reports");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing reports from localStorage:", err);
      return [];
    }
  });

  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);

  const handleSubmit = () => {
    if (!form.patient || !form.test || !form.date) return;

    if (editIndex !== null) {
      const updated = [...reports];
      updated[editIndex] = form;
      setReports(updated);
    } else {
      setReports([...reports, form]);
    }

    setForm({ patient: "", test: "", date: "" });
    setShowModal(false);
    setEditIndex(null);
  };

  const handleEdit = (index: number) => {
    setForm(reports[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    const updated = reports.filter((_, i) => i !== index);
    setReports(updated);
  };

  const handleCancel = () => {
    setShowModal(false);
    setForm({ patient: "", test: "", date: "" });
    setEditIndex(null);
  };

  return (
  <div className="bg-[#1B2131] p-6 rounded-xl shadow-lg border border-[#2c3346] text-white mt-8">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-cyan-300">Lab Reports</h2>
      <Button
        className="text-white px-4 py-2 rounded transition-all"
        onClick={() => {
          setForm({ patient: "", test: "", date: "" });
          setEditIndex(null);
          setShowModal(true);
        }}
      >
        + Upload Lab Report
      </Button>
    </div>

    {reports.length === 0 ? (
      <p className="text-gray-400 text-sm text-center">No lab reports uploaded yet.</p>
    ) : (
      <ul className="space-y-2 text-sm">
        {reports.map((r, i) => (
          <li
            key={i}
            className="bg-[#121826] p-4 rounded border border-[#2c3346] flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-white">{r.patient}</p>
              <p className="text-gray-400 text-xs">{r.test} – {r.date}</p>
            </div>
            <div className="flex gap-3 text-xs">
              <button
                onClick={() => handleEdit(i)}
                className="text-blue-400 hover:text-blue-500 underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(i)}
                className="text-red-400 hover:text-red-500 underline"
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
            {editIndex !== null ? "Edit Lab Report" : "Upload Lab Report"}
          </h3>

          <input
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Patient Name"
            value={form.patient}
            onChange={(e) => setForm({ ...form, patient: e.target.value })}
          />

          <input
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Test Name (e.g. CBC, X-Ray)"
            value={form.test}
            onChange={(e) => setForm({ ...form, test: e.target.value })}
          />

          <input
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={handleCancel}
              className="text-gray-400 hover:text-white px-4 py-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border text-white px-4 py-1 rounded"
            >
              {editIndex !== null ? "Update Report" : "Save Report"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default LabReportModal;
