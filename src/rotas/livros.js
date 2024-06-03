const express = require('express');
const router = express.Router();
const livrosControlador = require('../controladores/livrosControlador');

// Listagem dos livros
router.get('/', livrosControlador.listarLivros);

// Compra de um livro
router.post('/comprar/:titulo', livrosControlador.comprarLivro);

// Cadastro de novos livros
router.post('/', livrosControlador.adicionarLivro);

module.exports = router;
