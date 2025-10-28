import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; // ✅ adjust this import path if needed

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories);

    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <p className="text-center text-lg text-gray-600">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500">Error fetching products.</p>
    );

  const filtered = products.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true)
  );

  return (
    <div>
      {/* Search + Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-3">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/3 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-1/4 focus:ring-2 focus:ring-indigo-500 outline-none"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>


      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {filtered.map((product) => (
          <div
            key={product.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition bg-white flex flex-col justify-between"
          >
        <Link to={`/product/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="h-48 w-full object-contain mb-3"
              />
              <h2 className="font-semibold text-gray-800 text-sm truncate">
                {product.title}
              </h2>
              <p className="text-indigo-600 font-bold mt-2">
                ${product.price}
              </p>
            </Link>

            {/* Add to Cart button */}
            <button
              onClick={() => dispatch(addToCart(product))}
              className="mt-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
