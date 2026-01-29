const Card = require("../models/card");
const mongoose = require("mongoose");

module.exports.getCards = (req, res, next) => {
  Card.find({ owner: req.user._id })
    .sort({ _id: -1 })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { city, uf, lat, lon } = req.body;

  Card.create({ city, uf, lat, lon, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cardId)) {
    return res.status(400).send({ message: "cardId inválido" });
  }

  return Card.findOneAndDelete({
  _id: cardId,
  owner: req.user._id,
})
.then((card) => {
  if (!card) {
    return res.status(404).send({ message: "Cartão não encontrado" });
  }
  res.send({ data: card });
})
.catch(next);
};
