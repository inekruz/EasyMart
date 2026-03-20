const express = require("express");
const router = express.Router();

const favoriteController = require("../controllers/favorite.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", auth, favoriteController.getFavorites);
router.post("/toggle", auth, favoriteController.toggleFavorite);

module.exports = router;