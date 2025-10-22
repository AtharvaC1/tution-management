import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserPen, Trash, BookUser, Search, SortAsc } from "lucide-react";

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
        setFilteredStudents(res.data);
      } catch (error) {
        console.error("Error fetching students:", error);
        setMessage("❌ Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // 🔍 Handle Search
  useEffect(() => {
    let filtered = students.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const valA = a[sortBy]?.toString().toLowerCase();
        const valB = b[sortBy]?.toString().toLowerCase();
        return valA.localeCompare(valB);
      });
    }

    setFilteredStudents(filtered);
  }, [searchTerm, sortBy, students]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents((prev) => prev.filter((student) => student._id !== id));
      setMessage("✅ Student deleted successfully!");
    } catch (error) {
      console.error("Error deleting student:", error);
      setMessage("❌ Failed to delete student");
    }
  };

  const handleEdit = (id) => navigate(`/students/edit/${id}`);

  if (loading)
    return <p className="p-6 text-gray-600 text-center">Loading students...</p>;

  return (
    <div className="p-6 min-h-screen">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <BookUser className="text-blue-600" /> Student Records
          </h2>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 shadow-sm w-full sm:w-64">
              <Search className="text-gray-400 mr-2" size={18} />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm flex-1"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center border border-gray-300 bg-gray-50 rounded-lg px-3 py-2 shadow-sm">
              <SortAsc className="text-gray-400 mr-2" size={18} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-700"
              >
                <option value="">Sort by</option>
                <option value="batch">Batch</option>
                <option value="standard">Standard</option>
                <option value="schoolName">School</option>
              </select>
            </div>
          </div>
        </div>

        {/* Message */}
        {message && (
          <p
            className={`mb-4 text-sm font-semibold ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        {/* Table Section */}
        {filteredStudents.length === 0 ? (
          <p className="text-gray-600 text-center py-6">No students found.</p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full text-sm text-gray-800">
              <thead className="bg-gray-100 text-gray-700 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Batch</th>
                  <th className="px-4 py-3 text-left">Standard</th>
                  <th className="px-4 py-3 text-left">School</th>
                  <th className="px-4 py-3 text-left">Medium</th>
                  <th className="px-4 py-3 text-left">Total Fees</th>
                  <th className="px-4 py-3 text-left">Contact</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student._id}
                    className={`${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition-all`}
                  >
                    <td className="px-4 py-3 font-semibold text-blue-600 hover:underline">
                      <Link to={`/students/${student._id}`}>
                        {student.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3">{student.batch}</td>
                    <td className="px-4 py-3">{student.standard}</td>
                    <td className="px-4 py-3">{student.schoolName}</td>
                    <td className="px-4 py-3">{student.medium}</td>
                    <td className="px-4 py-3 font-medium text-green-700">
                      ₹{student.totalFees}
                    </td>
                    <td className="px-4 py-3">{student.contactNumber}</td>
                    <td className="px-4 py-3 text-center flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(student._id)}
                        className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 shadow-sm transition-all"
                        title="Edit Student"
                      >
                        <UserPen size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="flex items-center justify-center bg-red-500 text-white p-2 rounded-full hover:bg-red-600 shadow-sm transition-all"
                        title="Delete Student"
                      >
                        <Trash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewStudents;
