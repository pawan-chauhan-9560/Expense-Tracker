import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../utils/api";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await registerUser(email, password);
      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error: any) {
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-green-400 to-teal-500 p-4">
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
          Create an Account ✨
        </motion.h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleRegister} className="space-y-4">
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <motion.input
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            required
          />
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            type="submit"
            className="bg-green-600 text-white font-semibold p-3 rounded-lg w-full flex items-center cursor-pointer justify-center hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? (
              <Loader className="animate-spin" size={20} />
            ) : (
              "Register"
            )}
          </motion.button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <a href="/" className="text-green-500 hover:underline cursor-pointer">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
