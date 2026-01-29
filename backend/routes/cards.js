const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const {
  getCards,
  createCard,
  deleteCard,

} = require("../controllers/cards");

// Apenas estas rotas conectadas aos controllers
router.get("/", auth, getCards);
router.post("/", auth, createCard);
router.delete("/:cardId", auth, deleteCard);


module.exports = router;