import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  LayoutDashboard,
  Shirt,
  Calendar,
  Settings,
  LogOut,
  Upload,
  DollarSign,
  Users,
  Package,
  Search,
  Filter,
  Edit,
  Trash2,
  Plus,
} from 'lucide-react';

const VendorDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [availableDresses, setAvailableDresses] = useState([]);
  const [activeProducts, setActiveProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    inventory: "",
    image: null,
    is_active: true,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProducts, setShowProducts] = useState(false);
  const [vendorProfile, setVendorProfile] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProducts();
    // Fetch vendor profile only when the settings tab is active
    if (activeTab === 'settings') {
      fetchVendorProfile();
    }
  }, [token, activeTab]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
      setAvailableDresses(response.data.filter(product => product.is_active && product.inventory > 0));
      setActiveProducts(response.data.filter(product => product.is_active));
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchVendorProfile = async () => {
    const token = localStorage.getItem("token"); // Ensure you retrieve the token

    if (!token) {
      console.error("No token found. Please log in.");
      return; // Exit if no token is found
    }

    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/profile/", {
        headers: { Authorization: `Token ${token}` }, // Use 'Token' for Django REST Framework
      });
      setVendorProfile(response.data); // Set the vendor profile data
    } catch (error) {
      // Improved error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Error fetching vendor profile:", error.response.data);
        alert(`Error: ${error.response.data.detail || "Unable to fetch profile."}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        alert("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
        alert("An error occurred while fetching the profile.");
      }
    }
  };  

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, is_active: e.target.checked });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataObj.append(key, key === "image" ? formData[key] : String(formData[key]));
      }
    });

    try {
      await axios.post("http://127.0.0.1:8000/api/auth/products/create/", formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product added successfully!");
      setFormData({ title: "", description: "", price: "", inventory: "", image: null, is_active: true });
      document.getElementById("imageInput").value = "";
      fetchProducts();
    } catch (error) {
      console.error("Error in API call:", error.response?.data || error);
      alert(JSON.stringify(error.response?.data) || "Something went wrong!");
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      inventory: product.inventory,
      is_active: product.is_active,
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataObj.append(key, key === "image" ? formData[key] : String(formData[key]));
      }
    });

    try {
      await axios.put(`http://127.0.0.1:8000/api/auth/products/update/${editingProduct.id}/`, formDataObj, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product updated successfully!");
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error.response?.data || error);
      alert("Error updating product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/auth/products/delete/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderDashboard = () => (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Dashboard</h2>
      <h3 className="text-md font-semibold text-gray-700 mb-2">Available Dresses</h3>
      <ul className="mb-4">
        {availableDresses.map(dress => (
          <li key={dress.id} className="py-2">{dress.title} - ${dress.price} (Inventory: {dress.inventory})</li>
        ))}
      </ul>
      <h3 className="text-md font-semibold text-gray-700 mb-2">Active Products</h3>
      <ul>
        {activeProducts.map(product => (
          <li key={product.id} className="py-2">{product.title} - {product.is_active ? "Active" : "Inactive"}</li>
        ))}
      </ul>
    </div>
  );

  const renderInventory = () => (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Inventory</h2>
      <button onClick={() => setShowProducts(!showProducts)} className="bg-green-500 text-white p-2 rounded">
        {showProducts ? "Hide Products" : "View Products"}
      </button>
      {showProducts && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded shadow cursor-pointer"
                onClick={() => navigate(`/products/${product.id}`)} // Redirect to product detail
              >
                <img
                  src={product.image.startsWith("http") ? product.image : `http://127.0.0.1:8000${product.image}`}
                  alt={product.title}
                  className="w-full h-32 object-cover mb-2"
                />
                <strong>{product.title}</strong>
                <p className="text-sm">{product.description.slice(0, 50)}...</p>
                
              </div>
            ))
          )}
        </div>
      )}
      <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="my-4 space-y-2">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required className="border p-2 w-full" />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} required className="border p-2 w-full"></textarea>
        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleInputChange} required className="border p-2 w-full" />
        <input type="number" name="inventory" placeholder="Inventory" value={formData.inventory} onChange={handleInputChange} required className="border p-2 w-full" />
        <input type="file" id="imageInput" name="image" onChange={handleFileChange} className="border p-2 w-full" />
        <label className="flex items-center space-x-2">
          <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleCheckboxChange} />
          <span>Active</span>
        </label>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">{editingProduct ? "Update Product" : "Add Product"}</button>
      </form>
    </div>
  );

  const renderBookings = () => (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Bookings</h2>
      <p>Notifications for customer purchases will be displayed here.</p>
      {/* Placeholder for notifications */}
    </div>
  );

  // const renderSettings = () => (
  //   <div className="bg-white rounded-lg shadow-sm p-6">
  //     <h2 className="text-xl font-semibold text-gray-800 mb-6">Profile Settings</h2>
  //     <form>
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
  //         <input
  //           type="text"
  //           value={vendorProfile.name || ""}
  //           onChange={(e) => setVendorProfile({ ...vendorProfile, name: e.target.value })}
  //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
  //         />
  //       </div>
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
  //         <input
  //           type="email"
  //           value={vendorProfile.email || ""}
  //           onChange={(e) => setVendorProfile({ ...vendorProfile, email: e.target.value })}
  //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
  //         />
  //       </div>
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
  //         <input
  //           type="tel"
  //           value={vendorProfile.phone || ""}
  //           onChange={(e) => setVendorProfile({ ...vendorProfile, phone: e.target.value })}
  //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
  //         />
  //       </div>
  //       <div>
  //         <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
  //         <textarea
  //           value={vendorProfile.address || ""}
  //           onChange={(e) => setVendorProfile({ ...vendorProfile, address: e.target.value })}
  //           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
  //           rows={3}
  //         />
  //       </div>
  //       <div className="pt-4">
  //         <button className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600">
  //           Save Changes
  //         </button>
  //       </div>
  //     </form>
  //   </div>
  // );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'inventory':
        return renderInventory();
      case 'bookings':
        return renderBookings();
      // case 'settings':
      //   return renderSettings();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h2>
          <p className="text-gray-500 text-sm">Manage your shop</p>
        </div>
        <nav className="mt-6">
          {[
            { name: 'Dashboard', icon: LayoutDashboard },
            { name: 'Inventory', icon: Shirt },
            { name: 'Bookings', icon: Calendar },
            // { name: 'Settings', icon: Settings },
          ].map((item) => (
            <button
              key={item.name.toLowerCase()}
              onClick={() => setActiveTab(item.name.toLowerCase())}
              className={`w-full flex items-center px-6 py-3 text-left ${activeTab === item.name.toLowerCase()
                ? 'bg-purple-50 border-r-4 border-purple-500 text-purple-500'
                : 'text-gray-500 hover:bg-gray-50'
                }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-left text-red-500 hover:bg-red-50 mt-auto"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;