const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { createUser, login } = require("./controllers/users");
const auth = require("./middleware/auth");

const app = express();

/**
 * Origens permitidas
 */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "https://project-skyra-frontend-p1y1.vercel.app",
];

const corsOptions = {
  origin: (origin, callback) => {
    // permite Postman, curl, server-to-server
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// CORS SEMPRE antes de qualquer rota
app.use(cors(corsOptions));

// Preflight (OPTIONS)
app.options("*", cors(corsOptions));

app.use(express.json());

// ===== Rotas públicas =====
app.post("/signup", createUser);
app.post("/signin", login);

// rota raiz
app.get("/", (req, res) => {
  res.json({ message: "API Skyra rodando" });
});

// ===== Rotas protegidas =====
app.use("/users", auth, usersRouter);
app.use("/cards", auth, cardsRouter);

module.exports = app;
