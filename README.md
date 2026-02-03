# 🌤️ Skyra

link do projeto: https://project-skyra-frontend-p1y1.vercel.app/
Skyra é uma aplicação web de previsão do tempo desenvolvida como **projeto final do curso da TripleTen**.  
O projeto integra **frontend em React** com **backend em Node.js/Express**, autenticação via **JWT**, persistência de dados com **MongoDB** e consumo de **API externa de clima**.

---

## 🎓 Contexto Acadêmico

Este projeto foi desenvolvido como **trabalho final da formação da TripleTen**, com o objetivo de demonstrar domínio prático em:

- Arquitetura frontend + backend
- Autenticação e autorização
- Consumo de APIs externas
- Persistência de dados
- Boas práticas de organização de código
- Experiência do usuário (UX)

---

## 🚀 Funcionalidades

### 🔐 Autenticação
- Cadastro de usuário (signup)
- Login com e-mail e senha
- Autenticação baseada em JWT
- Rotas protegidas no backend
- Sessão persistida via `localStorage`

### 🌎 Clima
- Consulta de clima atual por coordenadas
- Previsão para os próximos dias
- Seleção de dia específico da previsão
- Mapeamento e normalização dos dados da API externa

### ⭐ Cidades Salvas
- Salvar cidades favoritas
- Remover cidades salvas
- Persistência por usuário autenticado
- Integração com banco de dados MongoDB

### 👤 Perfil
- Exibição de dados básicos do usuário
- Avatar editável
- Estado global gerenciado via Context API

### 🧠 UX / UI
- Loader durante requisições
- Mensagens de erro claras no login e cadastro
- Feedback visual de ações do usuário
- Layout responsivo

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React
- React Router
- Context API
- JavaScript (ES6+)
- CSS modularizado
- Fetch API

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- dotenv

### Ferramentas
- Postman (testes de API)
- Git & GitHub
- MongoDB Atlas

---

## 🔑 Autenticação (JWT)

- O token JWT é gerado no login
- Armazenado no `localStorage`
- Enviado no header:


 "## Pull Request de avaliação" 