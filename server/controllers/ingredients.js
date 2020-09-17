
const Ingredient = require('../models/ingredient');

exports.createIngredient = (req, res, next) => {
    const ingredient = new Ingredient(req.body);
    ingredient.save((err, ingredient) => {
        if (err) { return next(err); }
        res.status(201).json(ingredient);
    });
};

exports.getAllIngredients = (req, res, next) => {
    Ingredient.find((err, ingredients) => {
        if (err) { return next(err); }
        res.status(200).json({'ingredients': ingredients});
    })
};

exports.getIngredient = (req, res, next) => {
    const id = req.params.id;
    Ingredient.findById(id, (err, ingredient) => {
        if (err) { return next(err); }
        if (ingredient === null) {
            return res.status(404).json({'message': 'Ingredient not found!'});
        }
        res.status(200).json(ingredient);
    });
};

exports.editIngredient = (req, res, next) => {
    const id = req.params.id;
    Ingredient.findById(id, (err, ingredient) => {
        if (err) { return next(err); }
        if (ingredient === null) {
            return res.status(404).json({'message': 'Ingredient not found!'});
        }
        ingredient.name = req.body.name;
        ingredient.weight = req.body.weight;
        ingredient.save();
        res.status(200).json(ingredient);
    });
};

exports.updateIngredient = (req, res, next) => {
    const id = req.params.id;
    Ingredient.findById(id, (err, ingredient) => {
        if (err) { return next(err); }
        if (ingredient === null) {
            return res.status(404).json({'message': 'Ingredient not found!'});
        }
        ingredient.name = (req.body.name || ingredient.name);
        ingredient.weight = (req.body.weight || ingredient.weight);
        ingredient.save();
        res.status(200).json(ingredient);
    });
};

exports.deleteIngredient = (req, res, next) => {
    const id = req.params.id;
    Ingredient.findOneAndDelete({_id: id}, (err, ingredient) => {
        if (err) { return next(err); }
        if (ingredient === null) {
            return res.status(404).json({'message': 'Ingredient not found!'});
        }
        res.status(200).json(ingredient);
    });
};