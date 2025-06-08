import { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";
type Drug = {
  name: string;
  stock: number;
  expiry: string;
};

export const PharmacyManagement = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [form, setForm] = useState<Drug>({ name: "", stock: 0, expiry: "" });
  const [drugs, setDrugs] = useState<Drug[]>(() => {
    try {
    const stored = localStorage.getItem("drugs");
    return stored ? JSON.parse(stored) : [];
  } catch (err) {
    console.error("Error parsing drugs from localStorage:", err);
    return [];
  }
  });

  const filtered = drugs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  const openAddModal = () => {
    setForm({ name: "", stock: 0, expiry: "" });
    setIsEditing(false);
    setShowModal(true);
  };

   useEffect(() => {
      localStorage.setItem("drugs", JSON.stringify(drugs));
    }, [drugs]);

  const openEditModal = (index: number) => {
    setForm(drugs[index]);
    setCurrentIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!form.name || !form.expiry || form.stock < 0) return;

    if (isEditing && currentIndex !== null) {
      const updated = [...drugs];
      updated[currentIndex] = form;
      setDrugs(updated);
    } else {
      setDrugs([...drugs, form]);
    }

    setShowModal(false);
  };

  const handleDelete = (index: number) => {
    const updated = drugs.filter((_, i) => i !== index);
    setDrugs(updated);
  };

  return (
  <div className="bg-[#1B2131] p-6 shadow-lg rounded-xl border border-[#2c3346] text-white">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-cyan-300">Pharmacy & Stock</h2>
      <Button
        className=" text-white px-3 py-1 rounded transition-all"
        onClick={openAddModal}
      >
        + Add Drug
      </Button>
    </div>

    <input
      type="text"
      className="border border-[#2c3346] bg-[#121826] text-white placeholder-gray-400 px-3 py-2 rounded w-full mb-4 focus:outline-none focus:ring-1 focus:ring-purple-500"
      placeholder="Search drug..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    <table className="w-full text-sm">
      <thead className="bg-[#2A2F45] text-gray-300">
        <tr>
          <th className="p-2 text-left">Drug Name</th>
          <th className="p-2 text-left">Stock</th>
          <th className="p-2 text-left">Expiry</th>
          <th className="p-2 text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        {filtered.length === 0 ? (
          <tr>
            <td colSpan={4} className="p-4 text-center text-gray-500">
              No drugs available.
            </td>
          </tr>
        ) : (
          filtered.map((drug, idx) => (
            <tr key={idx} className="border-t border-[#2c3346] hover:bg-[#2a2f45] transition-all">
              <td className="p-2 text-white">{drug.name}</td>
              <td className="p-2 text-white">{drug.stock}</td>
              <td className="p-2 text-white">{drug.expiry}</td>
              <td className="p-2 text-center">
                <div className="flex gap-3 items-center justify-center">
                  <button
                    className="text-blue-400 text-xs underline hover:text-blue-500"
                    onClick={() => openEditModal(idx)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-400 text-xs underline hover:text-red-500"
                    onClick={() => handleDelete(idx)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>

    {showModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[#121826] p-6 rounded-lg w-full max-w-md space-y-4 shadow-xl border border-[#2A2F45] text-white">
          <h3 className="text-xl font-semibold text-purple-400">
            {isEditing ? "Edit Drug" : "Add Drug"}
          </h3>

          <input
            className="w-full border border-[#2c3346] bg-[#1B2131] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Drug Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            type="number"
            className="w-full border border-[#2c3346] bg-[#1B2131] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          />

          <input
            type="date"
            className="w-full border border-[#2c3346] bg-[#1B2131] p-2 rounded text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.expiry}
            onChange={(e) => setForm({ ...form, expiry: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-white px-4 py-1"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="border text-white px-4 py-1 rounded"
            >
              {isEditing ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};
