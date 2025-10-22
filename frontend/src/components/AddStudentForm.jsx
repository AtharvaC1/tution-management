import React, { useState } from "react";
import axios from "axios";
import { UserRoundPlus } from "lucide-react";

const AddStudent = () => {
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

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");

      await axios.post("http://localhost:5000/api/students", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ Student added successfully!");
      setFormData({
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
    } catch (err) {
      console.error("Error adding student:", err.response?.data || err);
      setError("❌ Failed to add student. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
          <UserRoundPlus className="text-blue-600" /> Add New Student
        </h2>

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
          {/* Name */}
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
              value={formData.medium}
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
              placeholder="Enter any remarks..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded-lg shadow transition-all duration-300"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Reusable Input Field Component
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
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
    />
  </div>
);

export default AddStudent;

// import React, { useState } from "react";
// import axios from "axios";

// const AddStudent = () => {
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
//     medium: "English", // default value from enum
//   });

//   const [message, setMessage] = useState("");

//   // handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem("token");

//       await axios.post("http://localhost:5000/api/students", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setMessage("✅ Student added successfully!");
//       setFormData({
//         name: "",
//         totalFees: "",
//         contactNumber: "",
//         email: "",
//         batch: "",
//         joinDate: "",
//         parentContact: "",
//         remarks: "",
//         standard: "",
//         schoolName: "",
//         medium: "English",
//       });
//     } catch (error) {
//       console.error("Error adding student:", error.response?.data || error);
//       setMessage("❌ Failed to add student. Please try again.");
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold mb-4">Add New Student</h2>

//       {message && <p className="mb-3 text-green-600">{message}</p>}

//       <form
//         onSubmit={handleSubmit}
//         className="grid grid-cols-1 md:grid-cols-2 gap-4"
//       >
//         {/* Name */}
//         <div>
//           <label className="block mb-1 font-medium">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
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
//             value={formData.totalFees}
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
//             value={formData.contactNumber}
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
//             value={formData.parentContact}
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
//             value={formData.email}
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
//             value={formData.batch}
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
//             value={formData.standard}
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
//             value={formData.schoolName}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Medium */}
//         <div>
//           <label className="block mb-1 font-medium">Medium</label>
//           <select
//             name="medium"
//             value={formData.medium}
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
//             value={formData.joinDate}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//           />
//         </div>

//         {/* Remarks */}
//         <div className="md:col-span-2">
//           <label className="block mb-1 font-medium">Remarks</label>
//           <textarea
//             name="remarks"
//             value={formData.remarks}
//             onChange={handleChange}
//             className="w-full p-2 border rounded"
//             rows="3"
//           ></textarea>
//         </div>

//         {/* Submit Button */}
//         <div className="md:col-span-2">
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//           >
//             Add Student
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddStudent;
