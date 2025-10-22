import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  CircleCheckBig,
  IndianRupee,
  Loader2,
  Trash2,
  Search,
  ArrowUpDown,
} from "lucide-react";

const FeeManagement = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const res = await API.get("/fees");
        setFees(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFees();
  }, []);

  // ✅ Handle payment
  const handlePayment = async (feeId) => {
    const currentFee = fees.find((f) => f._id === feeId);
    const enteredAmount = Number(payment[feeId]);

    if (!enteredAmount || enteredAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (enteredAmount > currentFee.remainingAmount) {
      alert("Amount cannot exceed the remaining fee.");
      return;
    }

    try {
      const res = await API.put(`/fees/${feeId}/pay`, { amount: enteredAmount });
      setFees(fees.map((f) => (f._id === feeId ? res.data : f)));
      setPayment({ ...payment, [feeId]: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // ❌ Handle delete
  const handleDelete = async (feeId) => {
    if (!window.confirm("Are you sure you want to delete this fee record?")) return;
    try {
      await API.delete(`/fees/${feeId}`);
      setFees(fees.filter((f) => f._id !== feeId));
    } catch (err) {
      console.error("Error deleting fee record:", err);
      alert("Failed to delete fee record.");
    }
  };

  // 🔍 Filtered & Sorted Data
  const filteredFees = fees.filter((fee) =>
    fee.studentId?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFees = [...filteredFees].sort((a, b) => {
    if (!sortOrder) return 0; // No sorting
    const order = sortOrder === "asc" ? 1 : -1;
    return a.status.localeCompare(b.status) * order;
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <Loader2 className="animate-spin w-6 h-6 mr-2" />
        Loading Fee Records...
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <IndianRupee className="text-blue-600" />
          Fees Management
        </h2>

        {/* Search & Sort Controls */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center bg-white border border-gray-300 rounded-xl px-3 py-2 shadow-sm">
            <Search className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              placeholder="Search by name..."
              className="outline-none text-sm text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort Button */}
          <button
            onClick={() =>
              setSortOrder(sortOrder === "asc" ? "desc" : sortOrder === "desc" ? "" : "asc")
            }
            className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-lg flex items-center gap-1 text-sm transition-all shadow-sm"
            title="Sort by status"
          >
            <ArrowUpDown size={16} />
            {sortOrder === "asc"
              ? "Status ↑"
              : sortOrder === "desc"
              ? "Status ↓"
              : "Sort"}
          </button>
        </div>
      </div>

      {sortedFees.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedFees.map((fee) => (
            <div
              key={fee._id}
              className="bg-white shadow-lg rounded-2xl border border-gray-100 hover:shadow-xl transition-all p-5"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {fee.studentId?.name}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    fee.status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : fee.status === "Partial"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {fee.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-gray-500">Total Fees:</span>
                  <span className="font-medium">₹{fee.totalFees}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Paid:</span>
                  <span className="text-green-600 font-semibold">
                    ₹{fee.paidAmount}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span className="text-gray-500">Remaining:</span>
                  <span className="text-red-600 font-semibold">
                    ₹{fee.remainingAmount}
                  </span>
                </p>
              </div>

              {/* Payment Section */}
              {fee.status !== "Paid" && (
                <div className="mt-4 flex items-center gap-1.5">
                  <input
                    type="number"
                    placeholder="Enter Amount"
                    className="flex-1 border border-gray-300 rounded-xl px-2 py-2 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    value={payment[fee._id] || ""}
                    onChange={(e) =>
                      setPayment({ ...payment, [fee._id]: e.target.value })
                    }
                  />
                  <button
                    onClick={() => handlePayment(fee._id)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-2 rounded-xl flex items-center gap-1 transition-all"
                    title="Record Payment"
                  >
                    <CircleCheckBig size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(fee._id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-2 py-2 rounded-xl flex items-center gap-1 transition-all"
                    title="Delete Fee Record"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}

              {fee.status === "Paid" && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleDelete(fee._id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-3 py-2 rounded-xl flex items-center gap-1 transition-all"
                    title="Delete Fee Record"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white shadow-md rounded-xl text-gray-500">
          No matching fee records found.
        </div>
      )}
    </div>
  );
};

export default FeeManagement;
