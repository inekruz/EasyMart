function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">

      <img
        src={product.image_url}
        alt={product.name}
        className="product-image"
      />

      <h3>{product.name}</h3>

      <p className="product-desc">
        {product.description}
      </p>

      <div className="product-bottom">

        <span className="price">
          {product.price} ₽
        </span>

        <button
          className="btn small"
          onClick={() => onAddToCart(product.id)}
        >
          В корзину
        </button>

      </div>

    </div>
  );
}

export default ProductCard;