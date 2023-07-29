const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/all', booksController.getAllBooks);
router.get('/:idbooks', booksController.getBookById);
router.post('/', booksController.createBook);
router.put('/:idbooks', booksController.updateBook);
router.delete('/:idbooks', booksController.deleteBook);

module.exports = router;
