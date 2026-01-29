const express = require("express");
const app = express();
app.use(express.json());

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const auth = require('./middleware/auth')

// Rotas públicas
app.post("/signup", createUser);
app.post("/signin", login);

// rota raiz
app.get("/", (req, res) => {
  res.json({ message: "API Skyra rodando" });
});

// Rotas protegidas
app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

module.exports = app;
