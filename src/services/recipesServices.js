const { schema } = require('../validation/recipesValidation');
const model = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!schema(name, ingredients, preparation)) {
    return { err: { code: 400, message: 'Invalid entries. Try again.' } };
  }
  return model.create(name, ingredients, preparation, userId);
};

const getAll = async () => model.getAll();

const getById = async (id) => {
  const res = await model.getById(id);
  return res;
};

const update = async ({ id, name, ingredients, preparation, userId }) => {
  const res = await model.update({ id, name, ingredients, preparation, userId });
  return res;
};

const deleta = async (id) => {
  const res = await model.deleta(id);
  return res;
};

const addImg = async ({ id, image }) => {
  const res = await model.addImg({ id, image });
  return res;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleta,
  addImg,
};