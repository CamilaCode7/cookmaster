const { ObjectId } = require('mongodb');
const service = require('../services/recipesServices');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipes = await service.create(name, ingredients, preparation, userId);
  if (recipes.err) return res.status(recipes.err.code).json({ message: recipes.err.message });
  return res.status(201).json(recipes);
};

const getAll = async (_req, res) => {
  const recipes = await service.getAll();
  return res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  const recipes = await service.getById(id);
  if (!recipes) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(recipes);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user; // id do meu usuario
  const { name, ingredients, preparation } = req.body;
  const recipes = await service.update({ id, name, ingredients, preparation, userId });
  return res.status(200).json(recipes);
};

const deleta = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }
  await service.deleta(id);
  return res.status(204).end();
};

const addImg = async (req, res) => {
  const { id } = req.params;
  const image = `localhost:3000/src/uploads/${id}.jpeg`;
  console.log(image);
  const recipes = await service.addImg({ id, image });
  return res.status(200).json(recipes);
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleta,
  addImg,
};