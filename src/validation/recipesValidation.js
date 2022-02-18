const Joi = require('joi');

const schema = (name, ingredients, preparation) => {
  const entries = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  });
  const { error } = entries.validate({ name, ingredients, preparation });
  if (error) return false;
  return true;
};

module.exports = {
  schema,
};