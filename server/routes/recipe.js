const express = require('express');
const recipeController = require('../controllers/recipes');
const isAuth = require('../middleware/isAuthorized');

const router = express.Router();

router.post('/api/recipes', isAuth, recipeController.createRecipe);
router.get('/api/recipes', recipeController.getAllRecipes);
router.get('/api/recipes/:id', recipeController.getRecipe);
router.get('/api/recipes', recipeController.getRecipeByTitle);
router.patch('/api/recipes/:id', isAuth, recipeController.updateRecipe);
router.put('/api/recipes/:id', isAuth, recipeController.editRecipe);
router.delete('/api/recipes/:id', isAuth, recipeController.deleteRecipe);
router.get('/api/search', recipeController.getRandomRecipe)
router.get('/api/external/recipes', recipeController.getRecipeComplexQuery);
router.get('/api/external/recipes/info/:id', recipeController.getRecipeInfoById);
/**
 * deferred 
 */
//router.get('/api/search', recipeController.getRecipeByIngredients);

module.exports = router;