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
    if (!origin) return callback(null, true); // Postman/curl

    // localhost Vite
    if (/^http:\/\/localhost:517\d$/.test(origin)) return callback(null, true);

    // project-skyra-frontend-p1y1.vercel.app
    // project-skyra-frontend-p1y1-xxxx.vercel.app
    if (/^https:\/\/project-skyra-frontend-p1y1(-[a-z0-9-]+)?\.vercel\.app$/.test(origin)) {
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
