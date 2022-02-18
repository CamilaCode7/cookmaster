const model = require('../models/userModel');
const { schema, schemaLogin } = require('../validation/userValidation');

const existEmail = async (email) => {
  const response = await model.existEmail(email);
  return response;
};

const create = async (name, email, password) => {
  const emailExist = await existEmail(email);
  if (emailExist) {
    return { erro: { code: 409, message: 'Email already registered' } };
  }
  if (!schema(name, email, password)) {
    return { erro: { code: 400, message: 'Invalid entries. Try again.' } };
  }
  return model.create(name, email, password);
};

const login = async (email, password) => {
  if (!schemaLogin(email, password)) {
    return { erro: { code: 401, message: 'All fields must be filled' } };
  }
  const result = await existEmail(email);
  if (!result || result.password !== password) {
    return { erro: { code: 401, message: 'Incorrect username or password' } };
  }
  return result;
};

module.exports = {
  create,
  login,
};