const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const { createUser, login } = require("./controllers/users");
const auth = require("./middleware/auth");

const app = express();

// CORS
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman/curl
    if (/^http:\/\/localhost:517\d$/.test(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));// ✅ garante preflight
app.use(express.json());

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
