const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, cartController.getCart);
router.post("/add", auth, cartController.addToCart);
router.put("/update", auth, cartController.updateItem);
router.delete("/remove/:id", auth, cartController.removeItem);

module.exports = router;