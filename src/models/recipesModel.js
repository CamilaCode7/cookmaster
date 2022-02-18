const { ObjectId } = require('mongodb');
const connection = require('./connections');

const addImg = async ({ id, image }) => {
  const db = await connection();
  // db.collection.findOneAndUpdate( filter, update, options )
  // https://docs.mongodb.com/upcoming/reference/method/db.collection.findOneAndUpdate/
  const recipes = await db.collection('recipes').findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: { image } },
      { returnOriginal: false },
    );
    return recipes.value;
};

const create = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const newRecipes = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: {
    name,
    ingredients,
    preparation,
    userId,
    _id: newRecipes.insertedId,
    },
  };
};

const getAll = async () => {
  const db = await connection();
  const recipe = await db.collection('recipes').find().toArray();
  return recipe;
};

const getById = async (id) => {
  const db = await connection();
  const recipes = db.collection('recipes').findOne(ObjectId(id));
  return recipes;
};

const update = async ({ id, name, ingredients, preparation, userId }) => {
  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } },
  );
  return {
    _id: id,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const deleta = async (id) => {
  const db = await connection();
  const recipes = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipes;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleta,
  addImg,
};