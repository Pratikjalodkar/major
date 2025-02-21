import React from 'react'

const Dash = () => {
  return (
    <>

<div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Vendor Dashboard</h1>
          <button className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium hover:bg-pink-600 transition-colors duration-300">
            Add New Product
          </button>
        </div>

        {/* Vendor Info */}
        <div className="flex items-center bg-gradient-to-r from-pink-100 via-white to-gray-50 p-6 rounded-lg shadow-md mb-6">
          <img
            src="https://via.placeholder.com/100"
            alt="Vendor Profile"
            className="w-24 h-24 rounded-full object-cover border border-gray-200"
          />
          <div className="ml-6">
            <h2 className="text-xl font-semibold text-gray-800">Elegant Boutique</h2>
            <p className="text-sm text-gray-600">
              Specializing in evening gowns and custom stitching. Delivering quality and elegance to our customers.
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-semibold">Contact:</span> vendor@example.com
            </p>
          </div>
        </div>

        {/* Dashboard Analytics */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-pink-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Sales</h3>
            <p className="text-2xl font-semibold">5230</p>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">Total Products</h3>
            <p className="text-2xl font-semibold">25</p>
          </div>
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">New Orders</h3>
            <p className="text-2xl font-semibold">18</p>
          </div>
        </div>

        {/* Product List */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Products</h2>
          <div className="grid grid-cols-2 gap-4">
            {/* Example Product Card */}
            <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/100"
                alt="Product"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-800">Red Evening Gown</h3>
                <p className="text-sm text-gray-600">150</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors duration-300">
                Edit
              </button>
            </div>

            {/* Add more product cards as needed */}
            <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-md">
              <img
                src="https://via.placeholder.com/100"
                alt="Product"
                className="w-16 h-16 rounded-md object-cover"
              />
              <div className="ml-4">
                <h3 className="text-lg font-bold text-gray-800">Blue Cocktail Dress</h3>
                <p className="text-sm text-gray-600">120</p>
              </div>
              <button className="ml-auto px-4 py-2 bg-pink-500 text-white rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors duration-300">
                Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Dash
