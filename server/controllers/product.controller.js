const pool = require("../config/db");

exports.getAllProducts = async (req, res) => {
  try {

    const products = await pool.query(`
      SELECT p.*, c.name AS category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
    `);

    res.json(products.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};