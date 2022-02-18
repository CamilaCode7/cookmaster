const express = require('express');
const bodyParser = require('body-parser');
const userRoute = require('../route/userRoute');
const recipesRoute = require('../route/recipesRoute');

const app = express();
app.use(bodyParser.json());

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
app.use('/', userRoute);
app.use('/', recipesRoute);

module.exports = app;