import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";

function Checkout() {
  const cart = useSelector((state) => state.cart.items);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();

  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.address) return alert("All fields required!");
    dispatch(clearCart());
    setSubmitted(true);
  };

  if (submitted)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
          🎉 Order Placed Successfully!
        </h2>
        <p className="text-gray-600">Thank you for shopping with us!</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          <ul className="space-y-2 border rounded-lg p-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between">
                <span>{item.title} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="text-right text-xl font-semibold mt-4">
            Total: <span className="text-indigo-600">${total.toFixed(2)}</span>
          </p>
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Shipping Details</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <textarea
            placeholder="Address"
            className="w-full border rounded px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          ></textarea>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
