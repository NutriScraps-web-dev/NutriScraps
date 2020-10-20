
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
    image: {
        type: String,
        default: "https://media.istockphoto.com/vectors/black-linear-photo-camera-like-no-image-available-vector-id1055079680?k=6&m=1055079680&s=170667a&w=0&h=ZYi91hhX3U00QK-aVuBLlFGqNAsTrO_LtuhUqMJfxWY="
    },
    ingredients: [{ 
        name: String,
        quantity: Number,
        unit: String
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

function autoPopulateSubs(next) {
    this.populate('comments');
    next();
    }

recipeSchema
    .pre('findOne', autoPopulateSubs)
    .pre('find', autoPopulateSubs);

module.exports = mongoose.model('recipes', recipeSchema);
