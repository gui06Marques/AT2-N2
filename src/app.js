const express = require('express');
const bodyParser = require('body-parser');
const livrosRouter = require('./rotas/livros');

const app = express();

app.use(bodyParser.json());
app.use('/api/livros', livrosRouter);

module.exports = app;
