
function Home() {

  return (
    <div>

      <section className="hero">

        <h1>Добро пожаловать в EasyMart</h1>

        <p>
          Современный интернет-магазин для удобных и быстрых покупок.
          Найдите тысячи товаров по лучшим ценам.
        </p>
      </section>

      <section className="features">

        <div className="card">
          <h3>Быстрый поиск</h3>
          <p>Мгновенно находите нужные товары.</p>
        </div>

        <div className="card">
          <h3>Безопасные покупки</h3>
          <p>Все заказы защищены современной системой безопасности.</p>
        </div>

        <div className="card">
          <h3>Удобная доставка</h3>
          <p>Оформляйте заказы всего за несколько кликов.</p>
        </div>

      </section>

    </div>
  );
}

export default Home;