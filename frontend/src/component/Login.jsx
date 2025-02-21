import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import i3 from "./images/i3.png";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState(""); // Email
  const [password, setPassword] = useState(""); // Password
  const [error, setError] = useState(""); // Error message
  const navigate = useNavigate(); // Navigation

  const handleLogin = async () => {
    // console.log("hii")
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/auth/login/", {
        email,
        password,
      });

      console.log("✅ API Response:", response.data);

      if (response.status === 200) {
        const user = response.data.user; // Extract user data
        if (!user || !user.role) {
          setError("User type is missing in response.");
          return;
        }

        // Store token and user type
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", user.role);

        alert("Login Successful!");

        // Redirect based on role
        if (user.role === "vendor") {
          navigate("/vendor-dashboard");
        } else {
          navigate("/customer-dashboard");
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
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${i3})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="p-24 rounded-lg shadow-md w-auto bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input
            className="border rounded w-full py-2 px-3"
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input
            className="border rounded w-full py-2 px-3"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogin}
          >
            Sign In
          </button>
          <Link to="/forgotpassword" className="text-blue-500">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
