import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserRoundPen } from "lucide-react";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    totalFees: "",
    contactNumber: "",
    email: "",
    batch: "",
    joinDate: "",
    parentContact: "",
    remarks: "",
    standard: "",
    schoolName: "",
    medium: "English",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch student data
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/students/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const studentData = res.data;
        const formattedJoinDate = studentData.joinDate
          ? new Date(studentData.joinDate).toISOString().split("T")[0]
          : "";

        setFormData({ ...studentData, joinDate: formattedJoinDate });
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("❌ Failed to load student data.");
      }
    };

    fetchStudent();
  }, [id]);

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.put(`http://localhost:5000/api/students/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Student updated successfully!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (error) {
      console.error("Error updating student:", error.response?.data || error);
      setError("❌ Failed to update student. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 via-white to-blue-100 py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <UserRoundPen className="text-blue-600" /> Edit Student Details
        </h2>

        {/* Status Messages */}
        {message && (
          <div className="mb-4 text-green-600 bg-green-100 border border-green-300 px-4 py-2 rounded-lg text-center">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded-lg text-center">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Full Name */}
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          {/* Total Fees */}
          <InputField
            label="Total Fees"
            type="number"
            name="totalFees"
            value={formData.totalFees}
            onChange={handleChange}
            required
          />

          {/* Contact Number */}
          <InputField
            label="Contact Number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />

          {/* Parent Contact */}
          <InputField
            label="Parent Contact"
            name="parentContact"
            value={formData.parentContact}
            onChange={handleChange}
          />

          {/* Email */}
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Batch */}
          <InputField
            label="Batch"
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            required
          />

          {/* Standard */}
          <InputField
            label="Standard"
            name="standard"
            value={formData.standard}
            onChange={handleChange}
          />

          {/* School Name */}
          <InputField
            label="School Name"
            name="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
          />

          {/* Medium */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Medium
            </label>
            <select
              name="medium"
              value={formData.medium || "English"}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            >
              <option value="English">English</option>
              <option value="Semi-English">Semi-English</option>
              <option value="Marathi">Marathi</option>
            </select>
          </div>

          {/* Join Date */}
          <InputField
            label="Join Date"
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
          />

          {/* Remarks */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-1">
              Remarks
            </label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter remarks..."
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex gap-4 justify-center mt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-lg shadow transition-all duration-300"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-8 rounded-lg shadow transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Reusable Input Field
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>
);

export default EditStudent;

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";

// const EditStudent = () => {
//   const { id } = useParams(); // studentId from URL
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     totalFees: "",
//     contactNumber: "",
//     email: "",
//     batch: "",
//     joinDate: "",
//     parentContact: "",
//     remarks: "",
//     standard: "",
//     schoolName: "",
//     medium: "English",
//   });

//   const [message, setMessage] = useState("");

//   // Fetch student data
//   useEffect(() => {
//     const fetchStudent = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(`http://localhost:5000/api/students/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const studentData = res.data;

//         // Convert joinDate to yyyy-mm-dd format for input[type="date"]
//         const formattedJoinDate = studentData.joinDate
//           ? new Date(studentData.joinDate).toISOString().split("T")[0]
//           : "";

//         setFormData({
//           ...studentData,
//           joinDate: formattedJoinDate,
//         });
//       } catch (err) {
//         console.error("Error fetching student:", err);
//         setMessage("❌ Failed to load student data.");
//       }
//     };

//     fetchStudent();
//   }, [id]);

//   // handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // handle update
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");

//       await axios.put(`http://localhost:5000/api/students/${id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setMessage("✅ Student updated successfully!");
//       setTimeout(() => navigate("/dashboard"), 1500); // redirect after update
//     } catch (error) {
//       console.error("Error updating student:", error.response?.data || error);
//       setMessage("❌ Failed to update student. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Edit Student</h2>

//       {message && <p className="mb-3 text-green-600">{message}</p>}

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         {/* Full Name */}
//         <div>
//           <label className="block mb-1 font-medium">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Total Fees */}
//         <div>
//           <label className="block mb-1 font-medium">Total Fees</label>
//           <input
//             type="number"
//             name="totalFees"
//             value={formData.totalFees || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Contact Number */}
//         <div>
//           <label className="block mb-1 font-medium">Contact Number</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Parent Contact */}
//         <div>
//           <label className="block mb-1 font-medium">Parent Contact</label>
//           <input
//             type="text"
//             name="parentContact"
//             value={formData.parentContact || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Batch */}
//         <div>
//           <label className="block mb-1 font-medium">Batch</label>
//           <input
//             type="text"
//             name="batch"
//             value={formData.batch || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         {/* Standard */}
//         <div>
//           <label className="block mb-1 font-medium">Standard</label>
//           <input
//             type="text"
//             name="standard"
//             value={formData.standard || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* School Name */}
//         <div>
//           <label className="block mb-1 font-medium">School Name</label>
//           <input
//             type="text"
//             name="schoolName"
//             value={formData.schoolName || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Medium */}
//         <div>
//           <label className="block mb-1 font-medium">Medium</label>
//           <select
//             name="medium"
//             value={formData.medium || "English"}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             required
//           >
//             <option value="English">English</option>
//             <option value="Semi-English">Semi-English</option>
//             <option value="Marathi">Marathi</option>
//           </select>
//         </div>

//         {/* Join Date */}
//         <div>
//           <label className="block mb-1 font-medium">Join Date</label>
//           <input
//             type="date"
//             name="joinDate"
//             value={formData.joinDate || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Remarks */}
//         <div className="md:col-span-2">
//           <label className="block mb-1 font-medium">Remarks</label>
//           <textarea
//             name="remarks"
//             value={formData.remarks || ""}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             rows="3"
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <div className="md:col-span-2 flex gap-4">
//           <button
//             type="submit"
//             className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
//           >
//             Update Student
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate(-1)} // go back
//             className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditStudent;
