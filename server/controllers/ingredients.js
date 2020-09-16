
const express = require('express');
const router = express.Router();

const Ingredient = require('../models/ingredient');

router.post('/api/ingredients', (req, res, next) => {
    const ingredient = new Ingredient(req.body);
    ingredient.save((err, ingredient) => {
        if (err) { return next(err); }
        res.status(201).json(ingredient);
    });
});

router.get('/api/ingredients',(req, res, next) => {
    Ingredient.find((err, ingredients) => {
        if (err) { return next(err); }
        res.json({'ingredients': ingredients});
    })
});

router.get('/api/ingredients/:id',(req, res, next) => {
    const id = req.params.id;
    Ingredient.findById(id, (err, ingredient) => {
        if (err) { return next(err); }
        if (ingredient === null) {
            return res.status(404).json({'message': 'Ingredient not found!'});
        }
        res.json(ingredient);
    });
});

router.put('/api/ingredients/:id', (req, res, next) => {
    const id = req.params.id;
    Ingredient.findById(id, (err, ingredient) => {
        if (err) { return next(err); }
        if (ingredient === null) {
            return res.status(404).json({'message': 'Ingredient not found!'});
        }
        ingredient.name = req.body.name;
        ingredient.weight = req.body.weight;
        ingredient.save();
        res.json(ingredient);
    });
});

router.patch('/api/ingredients/:id', (req, res, next) => {
    const id = req.params.id;
    Ingredient.findById(id, (err, ingredient) => {
        if (err) { return next(err); }
        if (ingredient === null) {
            return res.status(404).json({'message': 'Ingredient not found!'});
        }
        ingredient.name = (req.body.name || ingredient.name);
        ingredient.weight = (req.body.weight || ingredient.weight);
        ingredient.save();
        res.json(ingredient);
    });
});

router.delete('/api/ingredients/:id', (req, res, next) => {
    const id = req.params.id;
    Ingredient.findOneAndDelete({_id: id}, (err, ingredient) => {
        if (err) { return next(err); }
        if (ingredient === null) {
            return res.status(404).json({'message': 'Ingredient not found!'});
        }
        res.json(ingredient);
    });
});

module.exports = router;