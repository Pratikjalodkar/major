import React, { useState } from 'react'

const Business = () => {
    const [vendors, setVendors] = useState([
        { id: 1, name: "Elegant Boutique", description: "Trendy evening gowns and custom stitching", image: "https://via.placeholder.com/100" },
        { id: 2, name: "Chic Sew Studio", description: "Premium sewing services and alterations", image: "https://via.placeholder.com/100" },
        { id: 3, name: "Style Hub", description: "Fashion-forward dresses and accessories", image: "https://via.placeholder.com/100" },
        { id: 4, name: "Urban Tailors", description: "Modern tailoring services for all occasions", image: "https://via.placeholder.com/100" },
      ]);
    
      const [search, setSearch] = useState("");
    
      // Filter vendors based on search input
      const filteredVendors = vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(search.toLowerCase())
      );
  return (
    <>
     <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Page Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Explore Trendy Doors Vendors</h1>
        <p className="text-gray-600 text-center mb-6">
          Discover talented boutique owners, sewing professionals, and more. Enroll yourself today to grow your business!
        </p>

        {/* Search Bar */}
        <div className="flex items-center justify-center mb-6">
          <input
            type="text"
            placeholder="Search vendor names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-lg p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* Vendor List */}
        <div className="space-y-4">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {/* Left Section: Profile */}
              <div className="flex items-center space-x-4 w-4/5">
                <img
                  src={vendor.image}
                  alt={`${vendor.name} profile`}
                  className="w-16 h-16 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">{vendor.name}</h2>
                  <p className="text-sm text-gray-600">{vendor.description}</p>
                </div>
              </div>

              {/* Right Section: Call to Action */}
              <div className="w-1/5 text-right">
                <button className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors duration-300">
                  Explore
                </button>
              </div>
            </div>
          ))}

          {/* No Vendors Found */}
          {filteredVendors.length === 0 && (
            <p className="text-gray-600 text-center">No vendors found. Try a different search.</p>
          )}
        </div>
      </div>
    </div>
    </>
  )
}

export default Business

