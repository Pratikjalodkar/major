import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import First from './component/first.jsx';
import Business from './component/Business.jsx';
import Dash from './component/Dash.jsx';
import Header from './component/Header.jsx';
import Layout from './component/Layout.jsx';
import About from './component/About.jsx';
import Contact from './component/Contact.jsx';
import CategoriesPage from './component/CategoriesPage.jsx';
import CardPage from './component/Cardpage.jsx';
import { Toaster } from "react-hot-toast";
import Login from './component/Login.jsx';
import SignUpPage from './component/Signup.jsx';
import ForgotPassword from './component/ForgotPassword.jsx';
import PrivateRoute from './component/PrivateRoute.jsx';
import Dashboard from './component/Dashboard.jsx';
import VendorDashboard from './component/VendorDashboard.jsX';
import VendorRoute from './component/VendorRoute.jsx';

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role"); // Fetch stored role
    if (token) {
      setIsAuthenticated(true);
      setUserRole(role);
    }
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="" element={<First />} />
        <Route path="app" element={<App />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="category" element={<CategoriesPage />} />
        <Route path="cardpage" element={<CardPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="forgotpassword" element={<ForgotPassword />} />
        <Route path="dashboard" element={<Dashboard />} />

        {/* Protected Routes (Requires Authentication) */}
        <Route path="dashboard" element={<PrivateRoute><Dash /></PrivateRoute>} />
        <Route path="business" element={<PrivateRoute><Business /></PrivateRoute>} />

        {/* Vendor Dashboard - Protected Route */}
        <Route element={<VendorRoute isAuthenticated={isAuthenticated} userRole={userRole} />}>
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        </Route>

        {/* Redirect unknown routes to home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    )
  );

  return (
    <StrictMode>
      <RouterProvider router={router} />
      <Toaster />
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<AppWrapper />);
