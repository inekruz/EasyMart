const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

// ================= REGISTER =================

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const userExists = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "Пользователь уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (email, password, name) VALUES ($1,$2,$3) RETURNING *",
      [email, hashedPassword, name]
    );

    res.json(newUser.rows[0]);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ================= LOGIN =================

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const valid = await bcrypt.compare(password, user.rows[0].password);

    if (!valid) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign(
      { id: user.rows[0].id },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      token,
      user: user.rows[0]
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};