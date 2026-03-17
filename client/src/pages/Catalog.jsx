import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import ProductCard from "../components/ProductCard";
import { useToast } from "../components/ToastProvider";
import { addToCart } from "../services/api";

function Catalog() {

  const [products, setProducts] = useState([]);
  const { addToast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (err) {
      addToast("Ошибка загрузки товаров", "error");
    }
  };

  const handleAddToCart = async (id) => {
  try {
    await addToCart(id);
    addToast("Добавлено в корзину", "success");
  } catch {
    addToast("Ошибка добавления", "error");
  }
};

  return (
    <div className="catalog">

      <h1 className="catalog-title">
        Каталог товаров
      </h1>

      <div className="product-grid">

        {products.map(p => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={handleAddToCart}
          />
        ))}

      </div>

    </div>
  );
}

export default Catalog;