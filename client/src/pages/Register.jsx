import { useState } from "react";
import API from "../services/api";
import { saveToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider";

function Register() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);

      addToast("Регистрация прошла успешно!", "success");

      setTimeout(() => navigate("/login"), 1000);

    } catch (err) {
      addToast(
        err.response?.data?.message || "Ошибка регистрации",
        "error"
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <h2>Регистрация</h2>

        <form onSubmit={handleSubmit}>

          <input placeholder="Имя"
            onChange={e => setForm({...form, name: e.target.value})}
          />

          <input placeholder="Email"
            onChange={e => setForm({...form, email: e.target.value})}
          />

          <input type="password" placeholder="Пароль"
            onChange={e => setForm({...form, password: e.target.value})}
          />

          <button className="btn">Создать аккаунт</button>

        </form>

      </div>

    </div>
  );
}

export default Register;