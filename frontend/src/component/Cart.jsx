import React from "react";
import { toast } from "react-hot-toast";

// Set default value for cartItems if it's undefined
const Cart = ({ cartItems = [], removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleRemove = (index, name) => {
    removeFromCart(index);
    toast.error(`${name} removed from cart`);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg w-80">
      <h2 className="text-xl font-semibold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">${item.price} / day</p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 text-sm"
                onClick={() => handleRemove(index, item.name)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="mt-4">
          <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            className="mt-2 w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
            onClick={() => toast.success("Proceeding to checkout")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
