const jwt = require('jsonwebtoken');
const services = require('../services/userServices');

const secret = 'segredosupersecreto';

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const users = await services.create(name, email, password);
  if (users.erro) {
    return res.status(users.erro.code).json({ message: users.erro.message });
  }
  return res.status(201).json(users);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const users = await services.login(email, password);
  if (users.erro) return res.status(users.erro.code).json({ message: users.erro.message });
  const { _id, role } = users;

  const jwtConfig = {
    expiresIn: '10m',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ _id, role, email }, secret, jwtConfig);

  return res.status(200).json({ token });
};

module.exports = {
  create,
  login,
};