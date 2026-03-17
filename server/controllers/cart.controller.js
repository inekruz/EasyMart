const pool = require("../config/db");

exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await pool.query(`
      SELECT ci.id, p.name, p.price, p.image_url, ci.quantity
      FROM cart_items ci
      JOIN cart c ON ci.cart_id = c.id
      JOIN products p ON ci.product_id = p.id
      WHERE c.user_id = $1
    `, [userId]);

    res.json(cart.rows);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  try {
    const cartRes = await pool.query(
      "SELECT id FROM cart WHERE user_id=$1",
      [userId]
    );

    const cartId = cartRes.rows[0].id;

    const exist = await pool.query(
      "SELECT * FROM cart_items WHERE cart_id=$1 AND product_id=$2",
      [cartId, productId]
    );

    if (exist.rows.length > 0) {
      await pool.query(
        "UPDATE cart_items SET quantity = quantity + 1 WHERE cart_id=$1 AND product_id=$2",
        [cartId, productId]
      );
    } else {
      await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1,$2,1)",
        [cartId, productId]
      );
    }

    res.json({ message: "Добавлено в корзину" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateItem = async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity } = req.body;

  try {
    await pool.query(`
      UPDATE cart_items ci
      SET quantity = $1
      FROM cart c
      WHERE ci.cart_id = c.id
      AND c.user_id = $2
      AND ci.id = $3
    `, [quantity, userId, itemId]);

    res.json({ message: "Количество обновлено" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.removeItem = async (req, res) => {
  const userId = req.user.id;
  const itemId = req.params.id;

  try {
    await pool.query(`
      DELETE FROM cart_items ci
      USING cart c
      WHERE ci.cart_id = c.id
      AND c.user_id = $1
      AND ci.id = $2
    `, [userId, itemId]);

    res.json({ message: "Удалено из корзины" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};