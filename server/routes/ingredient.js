
const express = require('express');
const ingredientController = require('../controllers/ingredients');

const router = express.Router();

router.post('/api/ingredients', ingredientController.createIngredient);
router.get('/api/ingredients', ingredientController.getAllIngredients);
router.get('/api/ingredients/:id', ingredientController.getIngredient);
router.patch('/api/ingredients/:id', ingredientController.updateIngredient);
router.put('/api/ingredients/:id', ingredientController.editIngredient);
router.delete('/api/ingredients/:id', ingredientController.deleteIngredient);

module.exports = router;
