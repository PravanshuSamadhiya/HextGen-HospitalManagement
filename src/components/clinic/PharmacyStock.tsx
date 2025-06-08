import { useEffect, useState } from "react";
import { Button } from "../ui/moving-border";

type StockItem = {
  drugName: string;
  quantity: number;
  expiryDate: string;
};

const PharmacyStock = () => {
  const [form, setForm] = useState<StockItem>({ drugName: "", quantity: 0, expiryDate: "" });
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [stock, setStock] = useState<StockItem[]>(() => {
    try {
      const stored = localStorage.getItem("stock");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing stock from localStorage:", err);
      return [];
    }
  });

  const handleSubmit = () => {
    if (!form.drugName || form.quantity <= 0 || !form.expiryDate) return;
    if (editIndex !== null) {
      const updated = [...stock];
      updated[editIndex] = form;
      setStock(updated);
      setEditIndex(null);
    } else {
      setStock([...stock, form]);
    }
    setForm({ drugName: "", quantity: 0, expiryDate: "" });
    setShowModal(false);
  };

  const handleEdit = (index: number) => {
    setForm(stock[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    setStock(stock.filter((_, i) => i !== index));
  };

  useEffect(() => {
    localStorage.setItem("stock", JSON.stringify(stock));
  }, [stock]);

  return (
  <div className="bg-[#1B2131] p-6 shadow-lg rounded-xl border border-[#2c3346] text-white">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-cyan-300">Pharmacy Stock</h2>
      <Button
        className="text-white px-4 py-2 rounded transition-all"
        onClick={() => {
          setForm({ drugName: "", quantity: 0, expiryDate: "" });
          setEditIndex(null);
          setShowModal(true);
        }}
      >
        + Add Drug
      </Button>
    </div>

    {stock.length === 0 ? (
      <p className="text-gray-400 text-sm text-center">No stock items available.</p>
    ) : (
      <div className="divide-y divide-[#2c3346] text-sm">
        {stock.map((item, i) => (
          <div key={i} className="py-3 flex justify-between items-start">
            <div>
              <p className="font-medium text-white">{item.drugName}</p>
              <p className="text-gray-400 text-xs">Quantity: {item.quantity}</p>
              <p className="text-gray-400 text-xs">Expires: {item.expiryDate}</p>
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
            {editIndex !== null ? "Edit Drug" : "Add Drug"}
          </h3>

          <input
            type="text"
            placeholder="Drug Name"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.drugName}
            onChange={(e) => setForm({ ...form, drugName: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
          />
          <input
            type="date"
            className="w-full bg-[#1B2131] border border-[#2c3346] p-2 rounded text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            value={form.expiryDate}
            onChange={(e) => setForm({ ...form, expiryDate: e.target.value })}
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

export default PharmacyStock;
