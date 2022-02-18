const jwt = require('jsonwebtoken');
const { existEmail } = require('../models/userModel');

const secret = 'segredosupersecreto';

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  try {
    const decoded = jwt.verify(token, secret);
    const user = await existEmail(decoded.email);

    if (!user) {
      return res.status(401).json({ message: 'jwt malformed' });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

module.exports = {
  validateToken,
};