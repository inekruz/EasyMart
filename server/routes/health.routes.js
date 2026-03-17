const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.get("/", async (req, res) => {
  try {

    const db = await pool.query("SELECT NOW()");

    res.json({
      status: "OK",
      server: "EasyMart API",
      database: "connected",
      time: db.rows[0].now
    });

  } catch (err) {

    res.status(500).json({
      status: "ERROR",
      database: "not connected",
      error: err.message
    });

  }
});

module.exports = router;