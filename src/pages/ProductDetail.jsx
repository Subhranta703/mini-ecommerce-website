// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  if (!product)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col md:flex-row items-center gap-10 py-10">
      <img
        src={product.image}
        alt={product.title}
        className="w-60 h-60 object-contain"
      />

      <div>
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-4">${product.price}</p>

        <div className="flex items-center gap-4">
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border rounded px-2 py-1"
          >
            {[1, 2, 3, 4, 5].map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>

          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
