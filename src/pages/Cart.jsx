import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/cartSlice";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0)
    return <h2 className="text-center mt-10 text-xl">Your cart is empty 🛒</h2>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b py-4"
        >
          <div className="flex items-center gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-contain"
            />
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-gray-500">${item.price}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={item.quantity}
              onChange={(e) =>
                dispatch(
                  updateQuantity({
                    id: item.id,
                    quantity: Number(e.target.value),
                  })
                )
              }
              className="border rounded px-2 py-1"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-600 hover:underline"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="text-right mt-6">
        <h3 className="text-lg font-semibold">Total: ${total.toFixed(2)}</h3>
        <button
          onClick={() => dispatch(clearCart())}
          className="mt-3 bg-green-600 text-white px-4 py-2 rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
