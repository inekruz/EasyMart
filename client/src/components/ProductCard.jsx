import { toggleFavorite } from "../services/api";
import { useToast } from "../components/ToastProvider";
import { useState } from "react";

function ProductCard({ product, onAddToCart }) {

  const { addToast } = useToast();
  const [liked, setLiked] = useState(false);

  const handleFavorite = async () => {
    try {
      const res = await toggleFavorite(product.id);

      setLiked(res.data.added);

      addToast(res.data.message, "success");

    } catch {
      addToast("Ошибка", "error");
    }
  };

  return (
    <div className="product-card">

      <div className="favorite-btn" onClick={handleFavorite}>
        {liked ? "❤️" : "🤍"}
      </div>

      <img src={product.image_url} />

      <h3>{product.name}</h3>

      <p>{product.price} ₽</p>

      <button
        className="btn small"
        onClick={() => onAddToCart(product.id)}
      >
        В корзину
      </button>

    </div>
  );
}

export default ProductCard;