
const express = require('express');
const router = express.Router();

const Recipe = require('../models/recipe');

router.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe(req.body);
    recipe.save((err, recipe) => {
        if (err) { return next(err); }
        res.status(201).json(recipe);
    });
});

router.get('/api/recipes', (req, res, next) => {
    const sortBy = req.query.sort || '';
    Recipe.find((err, recipes) => {
        if (err) { return next(err); }
        res.json({'recipes': recipes });
    }).sort(sortBy)
});

router.get('/api/recipes/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        res.json(recipe);
    });
});

router.put('/api/recipes/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        recipe.name = req.body.name;
        recipe.ingredients = req.body.ingredients;
        recipe.preperation = req.body.preperation;
        recipe.cookingProcess = req.body.cookingProcess;
        recipe.toServe = req.body.toServe;
        recipe.save();
        res.json(recipe);
    });
});

router.patch('/api/recipes/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        recipe.name = (req.body.name || recipe.name);
        recipe.ingredients = (req.body.ingredients || recipe.ingredients);
        recipe.preperation = (req.body.preperation || recipe.preperation);
        recipe.cookingProcess = (req.body.cookingProcess || recipe.cookingProcess);
        recipe.toServe = (req.body.toServe || recipe.toServe);
        recipe.save();
        res.json(recipe);
    });
});

router.delete('/api/recipes/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findOneAndDelete({_id: id}, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        res.json(recipe);
    });
});

module.exports = router;