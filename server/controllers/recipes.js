
const Recipe = require('../models/recipe');
const axios = require('axios');
require('dotenv').config();

exports.createRecipe = (req, res, next) => {
    const recipe = new Recipe(req.body);
    recipe.save((err, recipe) => {
        if (err) { return next(err); }
        res.status(201).json(recipe);
    });
};

exports.getAllRecipes = (req, res, next) => {
    const sortBy = req.query.sort || '';
    Recipe.find((err, recipes) => {
        if (err) { return next(err); }
        res.status(200).json({ 'recipes': recipes });
    }).sort(sortBy)
};

exports.getRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({ 'message': 'Recipe not found!' });
        }
        res.status(200).json(recipe);
    });
};

exports.editRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({ 'message': 'Recipe not found!' });
        }
        recipe.name = req.body.name;
        recipe.cuisine = req.body.cuisine;
        recipe.ingredients = req.body.ingredients;
        recipe.preparation = req.body.preparation;
        recipe.cookingProcess = req.body.cookingProcess;
        recipe.toServe = req.body.toServe;
        recipe.type = req.body.type;
        recipe.ingredients = req.body.ingredients;
        recipe.save();
        res.status(200).json(recipe);
    });
};

exports.updateRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({ 'message': 'Recipe not found!' });
        }
        recipe.name = (req.body.name || recipe.name);
        recipe.cuisine = (req.body.cuisine || recipe.cuisine);
        recipe.preparation = (req.body.preparation || recipe.preparation);
        recipe.cookingProcess = (req.body.cookingProcess || recipe.cookingProcess);
        recipe.toServe = (req.body.toServe || recipe.toServe);
        recipe.type = (req.body.type || recipe.type);
        recipe.ingredients = (req.body.ingredients || recipe.ingredients);
        recipe.save();
        res.status(200).json(recipe);
    });
};

exports.deleteRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findOneAndDelete({ _id: id }, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({ 'message': 'Recipe not found!' });
        }
        res.status(200).json(recipe);
    });
};

module.exports.getRecipeByIngredients = (req, res, next) => {
    const ingredients = req.body.ingredients;
    API_KEY = process.env.API_KEY;
    const ingredientsString = ingredients.join(',' + '+');
    const spoonacularLink = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=${API_KEY}&number=6&ranking=1&ignorePantry=true&ingredients=${ingredientsString}`;
    axios
        .get(spoonacularLink)
        .then((result) => {
            res.json({ recipes: result.data });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

module.exports.getRecipeComplexQuery  = (req, res, next) => {
    const foodName = req.body.foodName;
    API_KEY = process.env.API_KEY;
    const spoonacularLink = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${foodName}`;
    axios
        .get(spoonacularLink)
        .then((result) => {
            res.json({ recipes: result.data });
        })
        .catch((err) => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};