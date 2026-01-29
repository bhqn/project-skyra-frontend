const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUser,
  createUser,
  getCurrentUser,
  updateAvatar,
} = require("../controllers/users");

// Apenas estas rotas conectadas aos controllers
router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.patch("/me/avatar", updateAvatar);
router.get("/:userId", getUser);
router.post("/", createUser);

module.exports = router;