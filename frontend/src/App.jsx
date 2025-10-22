import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import StudentProfile from "./pages/StudentProfile.jsx";
import EditStudent from "./pages/EditStudent.jsx";
// import Students from "./pages/Students";
// import Fees from "./pages/Fees";

const App = () => {
  // const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/:id"
          element={
            <ProtectedRoute>
              <StudentProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students/edit/:id"
          element={
            <ProtectedRoute>
              <EditStudent />
            </ProtectedRoute>
          }
        />
        {/*<Route path="/students" element={token ? <Students /> : <Navigate to="/login" />} />
        <Route path="/fees" element={token ? <Fees /> : <Navigate to="/login" />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
