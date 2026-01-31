const Card = require("../models/card");

module.exports.getCards = (req, res, next) => {
  Card.find({ owner: req.user._id })
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { uf, nome, lat, lon, temp, description, iconCode } = req.body;

  Card.create({
    owner: req.user._id,
    uf,
    nome,
    lat,
    lon,
    temp,
    description,
    iconCode,
  })
    .then((card) => res.status(201).send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findOneAndDelete({ _id: req.params.cardId, owner: req.user._id })
    .then((card) => {
      if (!card) return res.status(404).send({ message: "Card não encontrado" });
      return res.send({ data: card });
    })
    .catch(next);
};
