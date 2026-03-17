const express = require("express");
const router = express.Router();

const orderController = require("../controllers/order.controller");
const auth = require("../middleware/auth.middleware");

router.post("/checkout", auth, orderController.checkout);

module.exports = router;