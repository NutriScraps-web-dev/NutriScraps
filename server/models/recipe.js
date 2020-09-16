
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    preperation: { 
        type: [String]
    },
    cookingProcess: {
        type: [String], 
        required: true
    },
    toServe: {
        type: [String]
    },
    ingredients: [{ 
        type: Schema.Types.ObjectId,
        ref: 'ingredients', 
        required: true
    }],
});

module.exports = mongoose.model('recipes', recipeSchema);
