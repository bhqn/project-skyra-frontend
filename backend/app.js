const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");

const { createUser, login } = require("./controllers/users");
const auth = require("./middleware/auth");

const app = express();
console.log("### app.js LOADED - version: NO app.options * ###");




const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    // Vite local
    if (/^http:\/\/localhost:517\d$/.test(origin)) return callback(null, true);

    // qualquer preview do seu projeto na Vercel
    if (/^https:\/\/project-skyra-frontend-p1y1(-[a-z0-9-]+)?\.vercel\.app$/.test(origin)) {
      return callback(null, true);
    }

    // opcional: liberar também o domínio fixo
    if (origin === "https://project-skyra-frontend-p1y1.vercel.app") {
      return callback(null, true);
    }

    return callback(null, false);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};


app.options(/.*/, cors(corsOptions));
// CORS SEMPRE antes de qualquer rota
app.use(cors(corsOptions));


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
