const connection = require('./connections');
// const { ObjectId } = require('mongodb');

const existEmail = async (email) => {
  const db = await connection();
  const findEmail = await db.collection('users').findOne({ email });
  if (findEmail !== null) return findEmail;
};

const create = async (name, email, password) => {
  const db = await connection();
  const newUsers = await db.collection('users').insertOne(
    { name, email, password, role: 'user' },
  );
  return {
    user: {
      name,
      email,
      role: 'user',
      _id: newUsers.insertedId,
    },
  };
};

module.exports = {
  create,
  existEmail,
};