import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../utils/api";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token, user } = await loginUser(email, password);
      dispatch(login({ user, token })); // Dispatch login action
      navigate("/dashboard");
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md"
      >
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-3xl font-bold text-center text-gray-800 mb-6"
        >
          Welcome Back 👋
        </motion.h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <motion.input
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            type="submit"
            className="cursor-pointer bg-blue-600 text-white font-semibold p-3 rounded-lg w-full flex items-center justify-center hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? <Loader className="animate-spin" size={20} /> : "Login"}
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline cursor-pointer">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
