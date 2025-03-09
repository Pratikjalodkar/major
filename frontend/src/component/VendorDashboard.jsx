import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VendorDashboard = () => {
  const [products, setProducts] = useState([]);
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
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/auth/products/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Products:", response.data);  
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
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

  // Handle product click to redirect to details page
  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
  };

  // console.log(`http://127.0.0.1:8000${product.image}`);
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Vendor Dashboard</h1>

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

      <button onClick={() => { fetchProducts(); setShowProducts(!showProducts); }} className="bg-green-500 text-white p-2 rounded">
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
                className="border p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => handleProductClick(product.id)}
              >
                <img
                  src={product.image.startsWith("http") ? product.image : `http://127.0.0.1:8000${product.image}`}
                  alt={product.title}
                  className="w-full h-32 object-cover mb-2"
                />


                <strong>{product.title}</strong>
                <p className="text-sm">{product.description.slice(0, 50)}...</p>
                <div className="flex justify-between mt-2">
                  <button onClick={(e) => { e.stopPropagation(); handleEditProduct(product); }} className="bg-yellow-500 text-white p-1 rounded">Edit</button>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteProduct(product.id); }} className="bg-red-500 text-white p-1 rounded">Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default VendorDashboard;
