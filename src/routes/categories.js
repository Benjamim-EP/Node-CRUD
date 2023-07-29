const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

router.get('/all', categoriesController.getAllCategories);
router.get('/:idcategories', categoriesController.getCategoryById);
router.post('/', categoriesController.createCategory);
router.put('/:idcategories', categoriesController.updateCategory);
router.delete('/:idcategories', categoriesController.deleteCategory);

module.exports = router;
