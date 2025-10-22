// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Menu,
//   X,
//   Home,
//   UserPlus,
//   Users,
//   Wallet,
//   LogOut,
// } from "lucide-react";
// import AddStudentForm from "../components/AddStudentForm";
// import ViewStudents from "../components/ViewStudents";
// import FeesManagement from "../components/FeesManagement";
// import HomePage from "../components/HomePage";
// import axios from "axios";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [activeView, setActiveView] = useState("home");
//   const [students, setStudents] = useState([]);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Fetch students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/students", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setStudents(res.data);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//       }
//     };
//     fetchStudents();
//   }, []);

//   const handleAddStudent = (student) => {
//     setStudents((prev) => [...prev, student]);
//   };

//   const toggleFeesStatus = (id) => {
//     setStudents((prev) =>
//       prev.map((student) =>
//         student.id === id ? { ...student, feesPaid: !student.feesPaid } : student
//       )
//     );
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/");
//   };

//   const menuItems = [
//     { id: "home", label: "Home", icon: <Home size={20} /> },
//     { id: "addStudent", label: "Add Student", icon: <UserPlus size={20} /> },
//     { id: "viewStudents", label: "View Students", icon: <Users size={20} /> },
//     { id: "fees", label: "Fees Management", icon: <Wallet size={20} /> },
//   ];

//   return (
//     <div className="flex h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white shadow-2xl p-5 flex flex-col justify-between transition-transform duration-300 z-40
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:relative`}
//       >
//         {/* Header */}
//         <div>
//           <div className="flex flex-col items-center mb-8">
//             <img
//               src="./public/Samarth-Ramdas.png"
//               alt="Logo"
//               className="w-20 h-20 rounded-full mb-3 border-2 border-white shadow-md"
//             />
//             <h1 className="text-lg font-bold tracking-wide text-center">
//               Shree Samartha Classes
//             </h1>
//             <p className="text-sm opacity-80">Admin Dashboard</p>
//           </div>

//           {/* Menu Buttons */}
//           <nav className="flex flex-col space-y-2">
//             {menuItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => setActiveView(item.id)}
//                 className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200
//                   ${
//                     activeView === item.id
//                       ? "bg-blue-600 shadow-md scale-105"
//                       : "hover:bg-blue-700 hover:scale-[1.02]"
//                   }`}
//               >
//                 {item.icon}
//                 <span className="font-medium">{item.label}</span>
//               </button>
//             ))}
//           </nav>
//         </div>

//         {/* Logout Button */}
//         <button
//           onClick={handleLogout}
//           className="flex items-center justify-center mt-6 space-x-2 bg-red-600 hover:bg-red-500 text-white p-3 rounded-xl font-semibold transition-all shadow-md"
//         >
//           <LogOut size={18} />
//           <span>Logout</span>
//         </button>
//       </div>

//       {/* Hamburger for mobile */}
//       <button
//         className="absolute top-4 left-4 md:hidden bg-blue-800 text-white p-2 rounded-lg shadow-lg z-50"
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//       >
//         {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
//       </button>

//       {/* Main Content */}
//       <main className="flex-1 p-6 overflow-y-auto">
//         <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 min-h-[85vh] border border-gray-100">
//           {activeView === "home" && <HomePage students={students} />}
//           {activeView === "addStudent" && (
//             <AddStudentForm onAddStudent={handleAddStudent} />
//           )}
//           {activeView === "viewStudents" && (
//             <ViewStudents students={students} />
//           )}
//           {activeView === "fees" && (
//             <FeesManagement
//               students={students}
//               toggleFeesStatus={toggleFeesStatus}
//             />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X, Home, UserPlus, Users, Wallet, LogOut } from "lucide-react";
import AddStudentForm from "../components/AddStudentForm";
import ViewStudents from "../components/ViewStudents";
import FeesManagement from "../components/FeesManagement";
import HomePage from "../components/HomePage";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("home");
  const [students, setStudents] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch all students on load
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/students", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(res.data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };

    fetchStudents();
  }, []);

  // Add Student
  const handleAddStudent = (student) => {
    setStudents((prev) => [...prev, student]);
  };

  // Toggle Fees
  const toggleFeesStatus = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, feesPaid: !student.feesPaid }
          : student
      )
    );
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-blue-800 text-white p-4 flex flex-col justify-between transform transition-transform duration-300 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:relative md:translate-x-0`}
      >
        <div>
          <div class="flex items-center justify-center">
            <img
              src="./public/Samarth-Ramdas.png"
              alt="Logo"
              className="w-20 h-25"
            />
          </div>
          <h2 className="text-xl font-bold">Shree Samartha Classes</h2>
          <h2 className="text-lg font-bold mb-6">Dashboard</h2>

 <nav className="flex flex-col space-y-2">
          <button
            onClick={() => setActiveView("home")}
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 
                  ${
                    activeView === "home"
                      ? "bg-blue-600 shadow-md scale-105"
                      : "hover:bg-blue-700 hover:scale-[1.02]"
                  }`}
          >
            <Home size={18} />
          <span className="font-medium">Home</span>
          </button>

          <button
            onClick={() => setActiveView("addStudent")}
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 
                  ${
                    activeView === "addStudent"
                      ? "bg-blue-600 shadow-md scale-105"
                      : "hover:bg-blue-700 hover:scale-[1.02]"
                  }`}
          >
            <UserPlus size={18} />
          <span className="font-medium">Add Students</span>
          </button>

          <button
            onClick={() => setActiveView("viewStudents")}
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 
                  ${
                    activeView === "viewStudents"
                      ? "bg-blue-600 shadow-md scale-105"
                      : "hover:bg-blue-700 hover:scale-[1.02]"
                  }`}
          >
            <Users size={18} />
          <span className="font-medium">View Students</span>
          </button>

          <button
            onClick={() => setActiveView("fees")}
            className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 
                  ${
                    activeView === "fees"
                      ? "bg-blue-600 shadow-md scale-105"
                      : "hover:bg-blue-700 hover:scale-[1.02]"
                  }`}
          >
          <Wallet size={18} />
          <span className="font-medium">Fee Management</span>
          </button>
          </nav>
        </div>
        

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center mt-6 space-x-2 bg-red-600 hover:bg-red-500 text-white p-3 rounded-xl font-semibold transition-all shadow-md"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>

        {/* <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 p-2 rounded hover:bg-red-500"
        >
          Logout
        </button> */}
      </div>

      {/* Hamburger (mobile) */}
      <button
        className="absolute top-4 left-4 md:hidden z-50 bg-blue-800 text-white p-2 rounded"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto md:ml-0">
        {activeView === "home" && <HomePage students={students} />}
        {activeView === "addStudent" && (
          <AddStudentForm onAddStudent={handleAddStudent} />
        )}
        {activeView === "viewStudents" && <ViewStudents students={students} />}
        {activeView === "fees" && (
          <FeesManagement
            students={students}
            toggleFeesStatus={toggleFeesStatus}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
