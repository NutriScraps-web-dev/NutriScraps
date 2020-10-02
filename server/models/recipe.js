
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    name: { 
        type: String, 
        required: true
    },
    cuisine: {
        type: String,
        default: "Unspecified"
    },
    preparation: { 
        type: [String],
        default: ["Not Required"]
    },
    cookingProcess: {
        type: [String], 
        required: true
    },
    toServe: {
        type: [String],
        default: ["Not Included"]
    },
    type: {
        type: String,
        enum: ["Vegetarian", "Vegan", "Non-Vegetarian", "Unspecified"],
        default: "Unspecified",
        required: true
    },
    ingredients: [{ 
        type: Schema.Types.ObjectId,
        ref: 'ingredients', 
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('recipes', recipeSchema);
