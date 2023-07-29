const db = require('../models/db');

exports.getAllCategories = (req, res) => {
  const { page = 0, linesPerPage = 12, direction = 'ASC', orderBy = 'name' } = req.query;
  const offset = page * linesPerPage;

  const query = `
    SELECT *
    FROM categories
    ORDER BY ${orderBy} ${direction}
    LIMIT ${linesPerPage}
    OFFSET ${offset}
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar as categorias' });
    }

    return res.json(results);
  });
};

exports.getCategoryById = (req, res) => {
  const categoryId = req.params.idcategories;

  const query = `
    SELECT *
    FROM categories
    where idcategories = ${categoryId}
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao buscar a categoria' });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    return res.json(results[0]);
  });
};

exports.createCategory = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Dados incompletos para inserção da categoria' });
  }

  const query = `
    INSERT INTO categories (name)
    VALUES (?)
  `;

  db.query(query, [name], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao inserir a categoria' });
    }

    const newCategoryId = result.insertId;
    return res.status(201).json({ id: newCategoryId, name });
  });
};

exports.updateCategory = (req, res) => {
  const categoryId = req.params.idcategories;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Dados incompletos para atualização da categoria' });
  }

  const query = `
    UPDATE categories
    SET name = ?
    where idcategoriescategories = ?
  `;

  db.query(query, [name, categoryId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar a categoria' });
    }

    return res.json({ id: categoryId, name });
  });
};

exports.deleteCategory = (req, res) => {
  const categoryId = req.params.idcategories;

  const query = `
    DELETE FROM categories
    where idcategories = ?
  `;

  db.query(query, [categoryId], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao excluir a categoria' });
    }

    return res.sendStatus(204);
  });
};
