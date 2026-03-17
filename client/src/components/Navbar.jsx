import { Link } from "react-router-dom";
import { getToken, logout } from "../services/auth";

function Navbar() {

  const isAuth = getToken();

  return (
    <header className="navbar">

      <div className="logo">
        <Link to="/" className="logo">EasyMart</Link>
        </div>

      <nav>


        {isAuth ? (
          <>
            <Link to="/catalog">Каталог</Link>
            <Link to="/cart">Корзина</Link>
            <Link to="/favorites">Избранное</Link>
            <Link to="/profile">Профиль</Link>

            <button onClick={logout} className="btn btn-exit">
              Выйти
            </button>
          </>
        ) : (
          <>
          <Link to="/">Главная</Link>
            <Link to="/login">Вход</Link>
            <Link to="/register">
              Регистрация
            </Link>
          </>
        )}

      </nav>

    </header>
  );
}

export default Navbar;