import { useEffect, useState } from "react";
import { getFavorites } from "../services/api";

function Favorites() {

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    const res = await getFavorites();
    setItems(res.data);
  };

  return (
    <div className="catalog">

      <h1>❤️ Избранное</h1>

      <div className="product-grid">

        {items.map(p => (
          <div className="product-card" key={p.id}>

            <img src={p.image_url} />

            <h3>{p.name}</h3>

            <p>{p.price} ₽</p>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Favorites;