const fs = require('fs');
const path = require('path');
const caminhoArquivoLivros = path.join(__dirname, '../../dados/livros.json');

const lerArquivoLivros = () => {
  const dados = fs.readFileSync(caminhoArquivoLivros, 'utf-8');
  return JSON.parse(dados);
};

const escreverArquivoLivros = (dados) => {
  fs.writeFileSync(caminhoArquivoLivros, JSON.stringify(dados, null, 2), 'utf-8');
};

exports.listarLivros = (req, res) => {
  const livros = lerArquivoLivros();
  res.json(livros);
};

exports.comprarLivro = (req, res) => {
  const livros = lerArquivoLivros();
  const { titulo } = req.params;

  const indiceLivro = livros.findIndex(livro => livro.titulo === titulo);
  if (indiceLivro !== -1 && livros[indiceLivro].numExemplares > 0) {
    livros[indiceLivro].numExemplares -= 1;
    escreverArquivoLivros(livros);
    res.status(200).json({ mensagem: 'Compra realizada com sucesso!' });
  } else {
    res.status(404).json({ mensagem: 'Livro não encontrado ou sem exemplares disponíveis.' });
  }
};

exports.adicionarLivro = (req, res) => {
  const livros = lerArquivoLivros();
  const novoLivro = req.body;

  livros.push(novoLivro);
  escreverArquivoLivros(livros);

  res.status(201).json({ mensagem: 'Livro cadastrado com sucesso!' });
};
