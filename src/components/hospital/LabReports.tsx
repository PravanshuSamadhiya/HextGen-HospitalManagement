import { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";

type Report = {
  id: number;
  patient: string;
  test: string;
  status: "Completed" | "Pending";
};

export const LabReports = () => {
  const [reports, setReports] = useState<Report[]>(() => {
    try {
      const stored = localStorage.getItem("labReports");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing LabReports from localStorage:", err);
      return [];
    }
  });

  const [form, setForm] = useState({
    patient: "",
    test: "",
    status: "Pending",
  });

  const [showForm, setShowForm] = useState(false); 

  useEffect(() => {
    localStorage.setItem("labReports", JSON.stringify(reports));
  }, [reports]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.patient || !form.test) {
      alert("Please fill in all fields.");
      return;
    }

    const newReport: Report = {
      id: Date.now(),
      patient: form.patient,
      test: form.test,
      status: form.status as "Completed" | "Pending",
    };

    setReports((prev) => [...prev, newReport]);
    setForm({ patient: "", test: "", status: "Pending" });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    setReports((prev) => prev.filter((r) => r.id !== id));
  };

  const handleEdit = (id: number) => {
    const reportToEdit = reports.find((r) => r.id === id);
    if (reportToEdit) {
      setForm({
        patient: reportToEdit.patient,
        test: reportToEdit.test,
        status: reportToEdit.status,
      });
      setReports((prev) => prev.filter((r) => r.id !== id));
      setShowForm(true);
    }
  };

  return (
  <div className="bg-[#1B2131] p-6 shadow-lg rounded-xl border border-[#2c3346] text-white">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-cyan-300">Lab Reports</h2>

      {!showForm && (
        <Button
          onClick={() => setShowForm(true)}
          className="text-white px-4 py-2 rounded transition"
        >
          Add Report
        </Button>
      )}
    </div>

    {showForm && (
      <form
        onSubmit={handleSubmit}
        className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <input
          type="text"
          name="patient"
          value={form.patient}
          onChange={handleChange}
          placeholder="Patient Name"
          className="p-2 border border-[#2c3346] bg-[#121826] text-white rounded placeholder-gray-400"
        />
        <input
          type="text"
          name="test"
          value={form.test}
          onChange={handleChange}
          placeholder="Test Name"
          className="p-2 border border-[#2c3346] bg-[#121826] text-white rounded placeholder-gray-400"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="p-2 border border-[#2c3346] bg-[#121826] text-white rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="md:col-span-3 flex gap-4">
          <button
            type="submit"
            className="w-full border text-white p-2 rounded  transition"
          >
            Save Report
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

    <table className="w-full text-sm border-t border-[#2c3346]">
      <thead className="bg-[#2A2F45] text-gray-300">
        <tr>
          <th className="p-2 text-left">Patient</th>
          <th className="p-2 text-left">Test</th>
          <th className="p-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {reports.length === 0 ? (
          <tr>
            <td colSpan={3} className="p-4 text-center text-gray-500">
              No lab reports available.
            </td>
          </tr>
        ) : (
          reports.map((r) => (
            <tr
              key={r.id}
              className="border-t border-[#2c3346] hover:bg-[#2a2f45] transition"
            >
              <td className="p-2 text-white">{r.patient}</td>
              <td className="p-2 text-white">{r.test}</td>
              <td className="p-2 text-white flex items-center gap-3">
                <span
                  className={`px-2 py-1 rounded text-xs text-white ${
                    r.status === "Completed"
                      ? "bg-green-600"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {r.status}
                </span>
                <button
                  onClick={() => handleEdit(r.id)}
                  className="text-blue-400 hover:text-blue-500 text-xs underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(r.id)}
                  className="text-red-400 hover:text-red-500 text-xs underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);
};
