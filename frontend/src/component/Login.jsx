import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import i3 from "./images/i3.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        if (!user || !user.role) {
          setError("User type is missing in response.");
          return;
        }

        // Store authentication details
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);

        alert("✅ Login Successful!");

        // Redirect based on role
        if (user.role === "vendor") {
          navigate("/vendor/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error || "Invalid email or password");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-no-repeat"
      style={{ backgroundImage: `url(${i3})` }}
    >
      <div className="p-10 rounded-lg shadow-lg w-96 bg-white">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
          onClick={handleLogin}
        >
          Sign In
        </button>

        <div className="flex justify-between items-center mt-4">
          <Link to="/forgotpassword" className="text-blue-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
