const Joi = require('joi');

const schema = (name, email, password) => {
  const entries = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  const { error } = entries.validate({ name, email, password });
  if (error) return false;
  return true;
};

const schemaLogin = (email, password) => {
  const entries = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = entries.validate({ email, password });
  if (error) return false;
  return true;
};

module.exports = {
  schema,
  schemaLogin,
};