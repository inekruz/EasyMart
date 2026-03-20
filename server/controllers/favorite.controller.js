const pool = require("../config/db");

exports.getFavorites = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query(`
      SELECT p.*
      FROM favorites f
      JOIN products p ON f.product_id = p.id
      WHERE f.user_id = $1
    `, [userId]);

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.toggleFavorite = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const exist = await pool.query(
      "SELECT * FROM favorites WHERE user_id=$1 AND product_id=$2",
      [userId, productId]
    );

    if (exist.rows.length > 0) {
      await pool.query(
        "DELETE FROM favorites WHERE user_id=$1 AND product_id=$2",
        [userId, productId]
      );

      return res.json({ message: "Удалено из избранного", added: false });
    }

    await pool.query(
      "INSERT INTO favorites (user_id, product_id) VALUES ($1,$2)",
      [userId, productId]
    );

    res.json({ message: "Добавлено в избранное", added: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};