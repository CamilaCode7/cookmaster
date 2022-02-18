const express = require('express');
const controller = require('../controller/userController');

const router = express.Router();

router
  .post('/users', controller.create);

router
  .post('/login', controller.login);
  
module.exports = router;
