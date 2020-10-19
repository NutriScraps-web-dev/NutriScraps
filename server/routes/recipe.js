const express = require('express');
const recipeController = require('../controllers/recipes');

const router = express.Router();

router.post('/api/recipes', recipeController.createRecipe);
router.get('/api/recipes', recipeController.getAllRecipes);
router.get('/api/recipes/:id', recipeController.getRecipe);
router.patch('/api/recipes/:id', recipeController.updateRecipe);
router.put('/api/recipes/:id', recipeController.editRecipe);
router.delete('/api/recipes/:id', recipeController.deleteRecipe);
router.get('/api/external/recipes', recipeController.getRecipeByIngredients);
router.get('/api/external/recipes', recipeController.getRecipeComplexQuery);


module.exports = router;