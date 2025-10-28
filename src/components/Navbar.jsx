import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          🛍️ NuaStore
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium transition"
          >
            Home
          </Link>

      <Link
            to="/cart"
            className="text-gray-700 hover:text-blue-600 font-medium flex items-center transition"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
