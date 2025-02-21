import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CardPage = () => {
  const [addedItems, setAddedItems] = useState({});

  const dresses = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: "Elegant Rental Dress",
    price: 49,
    image: "https://source.unsplash.com/300x400/?fashion,dress",
  }));

  const addToCart = (id, name) => {
    setAddedItems((prev) => ({ ...prev, [id]: true }));
    toast.success(`${name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-purple-700">
        Rental Dresses
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dresses.map((dress) => (
          <div
            key={dress.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={dress.image}
              alt={dress.name}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800">{dress.name}</h2>
              <p className="text-gray-600">${dress.price} / day</p>
              <button
                className={`mt-3 w-full py-2 rounded-md text-white transition-all ${
                  addedItems[dress.id]
                    ? "bg-green-500 cursor-default"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
                onClick={() => addToCart(dress.id, dress.name)}
              >
                {addedItems[dress.id] ? "Item Added" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPage;
