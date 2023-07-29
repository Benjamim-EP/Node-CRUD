const db = require('../models/db');

exports.getAllBooks = (req, res) => {
  const { page = 0, linesPerPage = 12, direction = 'ASC', orderBy = 'title' } = req.query;
  const offset = page * linesPerPage;

  const query = `
    SELECT *
    FROM books
    ORDER BY ${orderBy} ${direction}
    LIMIT ${linesPerPage}
    OFFSET ${offset}
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar os livros' });
    }

    return res.json(results);
  });
};

exports.getBookById = (req, res) => {
  const bookId = req.params.idbooks;

  const query = `
    SELECT *
    FROM books
    where idbooks = ${bookId}
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar o livro' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Livro não encontrado' });
    }

    return res.json(results[0]);
  });
};

exports.createBook = (req, res) => {
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Dados incompletos para inserção do livro' });
  }

  const query = `
    INSERT INTO books (title, author, year)
    VALUES (?, ?, ?)
  `;

  db.query(query, [title, author, year], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao inserir o livro' });
    }

    const newBookId = result.insertId;
    return res.status(201).json({ id: newBookId, title, author, year });
  });
};

exports.updateBook = (req, res) => {
  const bookId = req.params.idbooks;
  const { title, author, year } = req.body;

  if (!title || !author || !year) {
    return res.status(400).json({ error: 'Dados incompletos para atualização do livro' });
  }

  const query = `
    UPDATE books
    SET title = ?, author = ?, year = ?
    where idbooksbooks = ?
  `;

  db.query(query, [title, author, year, bookId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar o livro' });
    }

    return res.json({ id: bookId, title, author, year });
  });
};

exports.deleteBook = (req, res) => {
  const bookId = req.params.idbooks;

  const query = `
    DELETE FROM books
    where idbooks = ?
  `;

  db.query(query, [bookId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao excluir o livro' });
    }

    return res.sendStatus(204);
  });
};
