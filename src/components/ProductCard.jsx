import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h4>{product.title.slice(0, 25)}...</h4>
      <p>${product.price}</p>
      
      <Link to={`/product/${product.id}`}>View Details</Link>
    
    </div>
  );
}
