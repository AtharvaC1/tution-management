import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { CircleUserRound, Lock } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/", { username, password });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gradient-to-br from-orange-50 via-gray-100 to-blue-50">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-96 transform transition-all duration-300 hover:shadow-2xl">
        {/* Title + Logo */}
        <div className="text-center mb-4">
          <p className="text-lg font-semibold text-orange-500 tracking-wide mb-2">
            || श्री राम समर्थ ||
          </p>
          <img
            src="/Samarth-Ramdas.png"
            alt="Logo"
            className="w-24 h-28 mx-auto drop-shadow-sm"
          />
          <h1 className="text-2xl font-bold text-orange-600 mt-2">
            Shree Samartha Classes
          </h1>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 mt-4">
          {/* Username Field */}
          <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200">
            <CircleUserRound className="text-orange-500 mr-2" size={20} />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center border border-gray-300 rounded-2xl px-4 py-3 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition-all duration-200">
            <Lock className="text-orange-500 mr-2" size={20} />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:opacity-90 text-white font-semibold py-2.5 rounded-2xl shadow-md transition duration-200 transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Footer note */}
        <p className="text-xs text-gray-400 text-center mt-5">
          © {new Date().getFullYear()} Shree Samartha Classes
        </p>
      </div>
    </div>
  );
}
