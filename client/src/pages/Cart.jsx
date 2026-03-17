import { useEffect, useState } from "react";
import {
  getCart,
  updateCartItem,
  removeCartItem
} from "../services/api";
import { useToast } from "../components/ToastProvider";
import { checkout } from "../services/api";
import { useNavigate } from "react-router-dom";

function Cart() {

  const [items, setItems] = useState([]);
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const res = await getCart();
    setItems(res.data);
  };

  const increase = async (item) => {
    await updateCartItem(item.id, item.quantity + 1);
    fetchCart();
  };

  const decrease = async (item) => {
    if (item.quantity <= 1) return;

    await updateCartItem(item.id, item.quantity - 1);
    fetchCart();
  };

  const remove = async (id) => {
    await removeCartItem(id);
    addToast("Удалено из корзины", "success");
    fetchCart();
  };

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );


  const handleCheckout = async () => {
    try {
      const res = await checkout();

      addToast("Заказ успешно оформлен 🎉", "success");

      navigate(`/order-success/${res.data.orderId}`);

    } catch (err) {
      addToast(err.response?.data?.error || "Ошибка", "error");
    }
  };

  return (
    <div className="cart-page">

      <h1>Корзина</h1>

      {items.length === 0 && (
        <p className="empty">Корзина пуста</p>
      )}

      <div className="cart-list">

        {items.map(item => (
          <div className="cart-card" key={item.id}>

            <img src={item.image_url} />

            <div className="cart-info">

              <h3>{item.name}</h3>

              <p>{item.price} ₽</p>

              <div className="quantity">

                <button onClick={() => decrease(item)}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => increase(item)}>
                  +
                </button>

              </div>

            </div>

            <div className="cart-actions">

              <span className="item-total">
                {item.price * item.quantity} ₽
              </span>

              <button
                className="remove"
                onClick={() => remove(item.id)}
              >
                ✖
              </button>

            </div>

          </div>
        ))}

      </div>

      {items.length > 0 && (
        <div className="cart-summary">

          <h2>Итого: {total} ₽</h2>

          <button
            className="btn checkout"
            onClick={handleCheckout}
          >
            Оформить заказ
          </button>

        </div>
      )}

    </div>
  );
}

export default Cart;