import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LibraryBig,
  School,
  NotebookPen,
  Phone,
  Mail,
  IndianRupee,
  CalendarCheck,
  UserCog,
  Ellipsis,
  MessageCircleQuestion,
  User,
  PhoneOutgoing,
  BookOpenCheck,
  BookA, 
} from "lucide-react";

const StudentProfile = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5000/api/students/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudent(res.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading student profile...
      </div>
    );

  if (!student)
    return (
      <div className="p-6 text-center text-red-600 text-lg font-medium">
        Student not found ❌
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-gradient-to-br from-blue-50 to-white shadow-xl rounded-3xl">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
            <User className="w-10 h-10 text-blue-600" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
        <p className="text-gray-500 text-sm mt-1">{student.standard || "N/A"} • {student.medium}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {/* Academic Details */}
        <div className="bg-white shadow-sm hover:shadow-md rounded-2xl p-5 transition">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-700">
            <LibraryBig size={20} /> Academic Info
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <School className="w-4 h-4 mr-2 text-green-600" /> 
              <span className="font-medium">School:</span>&nbsp;{student.schoolName || "N/A"}
            </li>
            <li className="flex items-center">
              <NotebookPen className="w-4 h-4 mr-2 text-purple-600" /> 
              <span className="font-medium">Batch:</span>&nbsp;{student.batch}
            </li>
            <li className="flex items-center">
              <BookA className="w-4 h-4 mr-2 text-blue-500" /> 
              <span className="font-medium">Medium:</span>&nbsp;{student.medium}
            </li>
            <li className="flex items-center">
              <BookOpenCheck className="w-4 h-4 mr-2 text-emerald-600" /> 
              <span className="font-medium">Standard:</span>&nbsp;{student.standard || "N/A"}
            </li>
            <li className="flex items-center">
              <CalendarCheck className="w-4 h-4 mr-2 text-orange-500" /> 
              <span className="font-medium">Join Date:</span>&nbsp;{new Date(student.joinDate).toLocaleDateString()}
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="bg-white shadow-sm hover:shadow-md rounded-2xl p-5 transition">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-indigo-700">
            <PhoneOutgoing size={20} /> Contact Info
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-indigo-600" /> 
              <span className="font-medium">Student Contact:</span>&nbsp;{student.contactNumber}
            </li>
            <li className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-pink-600" /> 
              <span className="font-medium">Email:</span>&nbsp;{student.email || "N/A"}
            </li>
            <li className="flex items-center">
              <UserCog className="w-4 h-4 mr-2 text-gray-700" /> 
              <span className="font-medium">Parent Contact:</span>&nbsp;{student.parentContact || "N/A"}
            </li>
          </ul>
        </div>

        {/* Fee Details */}
        <div className="bg-white shadow-sm hover:shadow-md rounded-2xl p-5 transition">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-700">
            <IndianRupee size={20} /> Fee Information
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <IndianRupee className="w-4 h-4 mr-2 text-yellow-600" /> 
              <span className="font-medium">Total Fees:</span>&nbsp;₹{student.totalFees}
            </li>
            
          </ul>
        </div>

        

        {/* Extra Info */}
        <div className="bg-white shadow-sm hover:shadow-md rounded-2xl p-5 transition">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-rose-700">
            <Ellipsis size={20} /> Other Info
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <MessageCircleQuestion className="w-4 h-4 mr-2 text-teal-600" /> 
              <span className="font-medium">Remarks:</span>&nbsp;{student.remarks || "None"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
