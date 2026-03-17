const pool = require("../config/db");

exports.checkout = async (req, res) => {
  const userId = req.user.id;

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const cartRes = await client.query(
      "SELECT id FROM cart WHERE user_id=$1",
      [userId]
    );

    const cartId = cartRes.rows[0].id;

    const itemsRes = await client.query(`
      SELECT ci.product_id, ci.quantity, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = $1
    `, [cartId]);

    const items = itemsRes.rows;

    if (items.length === 0) {
      return res.status(400).json({ error: "Корзина пуста" });
    }

    const total = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    const orderRes = await client.query(`
      INSERT INTO orders (user_id, total_price, status)
      VALUES ($1, $2, 'pending')
      RETURNING id
    `, [userId, total]);

    const orderId = orderRes.rows[0].id;

    for (const item of items) {
      await client.query(`
        INSERT INTO order_items (order_id, product_id, quantity, price)
        VALUES ($1,$2,$3,$4)
      `, [orderId, item.product_id, item.quantity, item.price]);
    }

    await client.query(
      "DELETE FROM cart_items WHERE cart_id=$1",
      [cartId]
    );

    await client.query("COMMIT");

    res.json({
      message: "Заказ оформлен",
      orderId
    });

  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};