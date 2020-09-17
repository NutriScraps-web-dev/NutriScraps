
const Recipe = require('../models/recipe');

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
        res.status(200).json({'recipes': recipes });
    }).sort(sortBy)
};

exports.getRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        res.status(200).json(recipe);
    });
};

exports.editRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        recipe.name = req.body.name;
        recipe.ingredients = req.body.ingredients;
        recipe.preparation = req.body.preparation;
        recipe.cookingProcess = req.body.cookingProcess;
        recipe.toServe = req.body.toServe;
        recipe.save();
        res.status(200).json(recipe);
    });
};

exports.updateRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        recipe.name = (req.body.name || recipe.name);
        recipe.ingredients = (req.body.ingredients || recipe.ingredients);
        recipe.preparation = (req.body.preparation || recipe.preparation);
        recipe.cookingProcess = (req.body.cookingProcess || recipe.cookingProcess);
        recipe.toServe = (req.body.toServe || recipe.toServe);
        recipe.save();
        res.status(200).json(recipe);
    });
};

exports.deleteRecipe = (req, res, next) => {
    const id = req.params.id;
    Recipe.findOneAndDelete({_id: id}, (err, recipe) => {
        if (err) { return next(err); }
        if (recipe === null) {
            return res.status(404).json({'message': 'Recipe not found!'});
        }
        res.status(200).json(recipe);
    });
};