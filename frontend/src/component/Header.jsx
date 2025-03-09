import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import l3 from "./images/l3.png";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const navigate = useNavigate();

  // ✅ Check authentication when the component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/auth/check-auth/", { withCredentials: true })
      .then((response) => {
        setIsLoggedIn(response.data.isAuthenticated);
        localStorage.setItem("isLoggedIn", response.data.isAuthenticated);
      })
      .catch(() => {
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
      });
  }, []);

  // ✅ Logout Function
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/logout/",
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        console.log("Logged out successfully");
        setIsLoggedIn(false);
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="shadow sticky z-50 top-0">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* ✅ Logo */}
          <Link to="/" className="flex items-center">
            <img src={l3} className="h-auto w-auto max-w-full max-h-20 object-contain" alt="Logo" />
          </Link>

          {/* ✅ Authentication Buttons */}
          <div className="flex items-center lg:order-2">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-gray-800 font-bold hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-gray-800 font-bold hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
            )}
            {!isLoggedIn && (
              <Link
                to="/signup"
                className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Get started
              </Link>
            )}
          </div>

          {/* ✅ Navbar Links */}
          <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li><NavLink to="/" className="block font-bold py-2 pr-4 pl-3 hover:text-orange-700">Home</NavLink></li>
              <li><NavLink to="/about" className="block font-bold py-2 pr-4 pl-3 hover:text-orange-700">About</NavLink></li>
              <li><NavLink to="/app" className="block font-bold py-2 pr-4 pl-3 hover:text-orange-700">Contact</NavLink></li>
              <li><NavLink to="/category" className="block font-bold py-2 pr-4 pl-3 hover:text-orange-700">Explore</NavLink></li>
              <li><NavLink to="/contact" className="block font-bold py-2 pr-4 pl-3 hover:text-orange-700">Start Your Business</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
