import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", price: "", inventory: "", is_active: true });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/auth/products/${id}/`);
                setProduct(response.data);
                setFormData(response.data);
            } catch (error) {
                setError("Error fetching product details");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleEditChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();

        Object.keys(formData).forEach((key) => {
            if (key === "image") {
                if (formData[key] instanceof File) {
                    formDataObj.append(key, formData[key]);
                }
            } else {
                formDataObj.append(key, String(formData[key]));
            }
        });

        try {
            const response = await axios.put(
                `http://127.0.0.1:8000/api/auth/products/update/${id}/`,
                formDataObj,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setProduct((prevProduct) => ({ ...prevProduct, ...formData }));

            console.log("API Response:", response);
            alert("Product updated successfully!");
            setShowEditModal(false); // Close modal after update
            

        } catch (error) {
            console.error("Error updating product:", error.response?.data || error);
            alert(`Error updating product: ${JSON.stringify(error.response?.data)}`);
        }
    };




    const handleDeleteProduct = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/auth/products/delete/${id}/`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("Product deleted successfully!");
            navigate("/vendor/dashboard");
        } catch (error) {
            alert("Error deleting product");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-6 max-w-4xl bg-white shadow-lg rounded-lg">
            <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                    <img src={`http://127.0.0.1:8000${product.image}`} alt={product.title} className="w-full h-64 object-cover rounded-lg" />
                </div>
                <div className="md:w-1/2 p-4">
                    <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                    <p className="text-gray-600 mb-2">{product.description}</p>
                    <p className="text-lg font-semibold">Price: ${product.price}</p>
                    <p>Inventory: {product.inventory}</p>
                    <p>Status: {product.is_active ? "Active" : "Inactive"}</p>
                    <div className="mt-4 flex space-x-4">
                        <button onClick={() => setShowEditModal(true)} className="bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
                        <button onClick={() => setShowDeleteModal(true)} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                    </div>
                </div>
            </div>

            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-bold mb-4">Edit Product</h2>
                        <input type="text" name="title" value={formData.title} onChange={handleEditChange} className="border p-2 w-full mb-2" placeholder="Title" />
                        <textarea name="description" value={formData.description} onChange={handleEditChange} className="border p-2 w-full mb-2" placeholder="Description"></textarea>
                        <input type="number" name="price" value={formData.price} onChange={handleEditChange} className="border p-2 w-full mb-2" placeholder="Price" />
                        <input type="number" name="inventory" value={formData.inventory} onChange={handleEditChange} className="border p-2 w-full mb-2" placeholder="Inventory" />
                        <input type="file" id="imageInput" name="image" onChange={handleEditChange} className="border p-2 w-full" />

                        <div className="flex space-x-4 mt-4">
                            <button onClick={handleUpdateProduct} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
                            <button onClick={() => setShowEditModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
                        <p className="text-gray-600 mb-4">Do you really want to delete this product? This action cannot be undone.</p>
                        <div className="flex space-x-4">
                            <button onClick={handleDeleteProduct} className="bg-red-500 text-white px-4 py-2 rounded">Yes, Delete</button>
                            <button onClick={() => setShowDeleteModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
