import { useState } from "react";
import API from "../services/api";
import { saveToken } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { useToast } from "../components/ToastProvider";

function Login() {
  const { addToast } = useToast();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post("/auth/login", form);

    saveToken(res.data.token);

    addToast("Успешный вход!", "success");

    setTimeout(() => navigate("/catalog"), 800);

  } catch (err) {
    addToast(
      err.response?.data?.message || "Ошибка входа",
      "error"
    );
  }
};

  return (
    
    <div className="auth-container">
      <div className="auth-card">

        <h2>Вход</h2>

        <form onSubmit={handleSubmit}>

          <input placeholder="Email"
            onChange={e => setForm({...form, email: e.target.value})}
          />

          <input type="password" placeholder="Пароль"
            onChange={e => setForm({...form, password: e.target.value})}
          />

          <button className="btn">Войти</button>

        </form>

      </div>

    </div>
  );
}

export default Login;