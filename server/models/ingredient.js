
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    ingredientID: {
        type: Schema.Types.ObjectId, 
        ref: 'recipes'
    },
    name: { 
        type: String, 
        required: true
    },
    quantity: {
        type: Number, 
        required: true
    }
});

module.exports = mongoose.model('ingredients', ingredientSchema);