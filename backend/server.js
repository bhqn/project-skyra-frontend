require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

const { PORT = 3000 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/SkyraDB", {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("MongoDB conectado");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no MongoDB:", error);
    process.exit(1);
  });

