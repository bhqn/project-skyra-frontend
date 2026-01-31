const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

    // seu “card de cidade”
    uf: { type: String, required: true },
    nome: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },

    temp: Number,
    description: String,
    iconCode: String,
  },
  { timestamps: true }
);

// evita duplicar a mesma UF para o mesmo usuário
cardSchema.index({ owner: 1, uf: 1 }, { unique: true });

module.exports = mongoose.model("card", cardSchema);
