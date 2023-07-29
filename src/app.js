const express = require('express');
const app = express();

const booksRouter = require('./routes/books');
const categoriesRouter = require('./routes/categories');

app.use(express.json());
app.use('/books', booksRouter);
app.use('/categories', categoriesRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});