import { useParams, Link } from "react-router-dom";

function OrderSuccess() {

  const { id } = useParams();

  return (
    <div className="success-page">

      <h1>🎉 Заказ оформлен!</h1>

      <p>Номер заказа: #{id}</p>

      <Link to="/catalog" className="btn">
        Вернуться в каталог
      </Link>

    </div>
  );
}

export default OrderSuccess;