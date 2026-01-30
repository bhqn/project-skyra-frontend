const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// GET /users - retorna todos os usuários
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next); // erro para o midleware
};

// GET /users/:userId - retorna usuário específico
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      res.send({ data: user });
    })
    .catch(next);
};

// Get /users/me retorna informacoes do usuario atual
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      res.send({ data: user });
    })
    .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  if (!avatar) {
    return res.status(400).send({ message: "Avatar é obrigatório" });
  }

  User.findByIdAndUpdate(
    // ID do usuário
    req.user._id,
    // O que atualizar
    { avatar: req.body.avatar },
    // opções
    { new: true, runValidators: true },
  )
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }
      res.send({ data: user });
    })
    .catch(next);
};

// POST /users - cria novo usuário
module.exports.createUser = (req, res) => {
  const { email, password, username } = req.body;

  // Validações básicas
  if (!email || !password || !username) {
    return res.status(400).send({
      message: "Email, senha e nome de usuário são obrigatórios",
    });
  }

  if (username.length < 2 || username.length > 30) {
    return res.status(400).send({
      message: "Nome de usuário deve ter entre 2 e 30 caracteres",
    });
  }

  if (password.length < 6) {
    return res.status(400).send({
      message: "Senha deve ter pelo menos 6 caracteres",
    });
  }

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      return User.create({ email, password: hash, name: username });
    })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      console.log("CREATE USER ERROR:", err);
      //  Email duplicado
      if (err.code === 11000 && err.keyPattern?.email) {
        return res.status(409).send({
          message: "Esse email já existe",
        });
      }

      //  Qualquer outro erro
      return res.status(400).send({
        message: "Dados inválidos",
      });
    });
};

//parte de login

module.exports.login = (req, res) => {
  // Extrai email e senha enviados no corpo da requisição
  const { email, password } = req.body;

  //  1 Verifica se o email e a senha foram informados
  if (!email || !password) {
    return res.status(401).json({ message: "E-mail ou senha incorretos" });
  }

  // 2 Procura o usuário no banco de dados pelo email
  User.findOne({ email })
    .select("+password")
    .then((user) => {
      // 3 Se nenhum usuário for encontrado, retorna erro 401
      if (!user) {
        return Promise.reject({ status: 401 });
      }

      // 4 Compara a senha informada com o hash salvo no banco
      return bcrypt
        .compare(password, user.password)
        .then((isPasswordCorrect) => {
          // 5  Se a senha não corresponder, retorna erro 401
          if (!isPasswordCorrect) {
            return Promise.reject({ status: 401 });
          }

          // 6 Cria o JSON Web Token (JWT)
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });

          //  7 Retorna o token no corpo da resposta
          return res.status(200).json({ token });
        });
    })
    .catch((err) => {
      // 8 Trata erros de autenticação (email ou senha inválidos)
      if (err.status === 401) {
        return res.status(401).json({ message: "E-mail ou senha incorretos" });
      }

      // 9 Trata qualquer outro erro interno do servidor
      return res.status(500).json({
        message: "Erro interno do servidor",
        error: err.message || err,
      });
    });
};
