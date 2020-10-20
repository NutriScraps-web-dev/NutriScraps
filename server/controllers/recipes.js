
const Recipe = require('../models/recipe');
const Comment = require('../models/comment');
const User = require('../models/user');
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();

exports.createRecipe = (req, res, next) => {
    const recipePublisher = mongoose.Types.ObjectId(req.userId);
    console.log('role', req.role)
    console.log('userID: ' , req.userId)
    console.log(recipePublisher)
    const recipeName = req.body.name;
    const recipeCuisine = req.body.cuisine;
    const recipePreparation = req.body.preparation;
    const recipeCookingProcess = req.body.cookingProcess;
    const recipeToServe = req.body.toServe;
    const recipeType = req.body.type;
    const recipeImage = req.body.image;
    let tem_recipe = null;
    const recipe = new Recipe({
        name: recipeName,
        cuisine: recipeCuisine,
        preparation: recipePreparation,
        cookingProcess: recipeCookingProcess,
        toServe: recipeToServe,
        type: recipeType,
        image: recipeImage,
        publisher: recipePublisher
    });
    console.log(recipe)
    return recipe
    .save()
    .then((result) => {
      tem_recipe = result;
      console.log(recipePublisher)
     return User.findById(recipePublisher);
    })
    .then((user) => {
      console.log('abcde')  
      console.log(user)
      user.posts.push(tem_recipe);
      return user.save();
    })
    .then((result) => {
      res.status(200).json(tem_recipe);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

/*
exports.createRecipe = (req, res, next) => {
    const recipePublisher = req.userId;
    const recipe = new Recipe(req.body); 
    recipe.publisher = {recipePublisher}; 
    recipe.save((err, recipe) => {
        if (err) { return next(err); }
        res.status(201).json(recipe);
    });
    
};
*/

exports.getAllRecipes = (req, res, next) => {
    const sortBy = req.query.sort || '';
    Recipe.find((err, recipes) => {
        if (err) { return next(err); }
        res.status(200).json({ 'recipes': recipes });
    }).sort(sortBy)
};

exports.getRecipeByTitle = (req, res, next) => {
    const title = req.query.title;
    var condition = title ? {title: { $regex: new RegExp(title), $options: "i"}} : {};

    Recipe.find(err, condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
          next(err);
      });
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
        recipe.image = req.body.image;
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
        recipe.image = (req.body.image || recipe.image);
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
    })
    .then ((recipe) => {
        return User.updateOne(
            { posts: req.params.id },
            { $pull: { posts: req.params.id } }
        );
    })
    .then((result) => {
        res.status(200).json({ message: `The recipe is deleted` });
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