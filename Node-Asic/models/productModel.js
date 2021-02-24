const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    brand: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, default: 100, required: true},
    countInStock: {type: Number, default: 5, required: true},  
    description: {type: String, required: true}
});

module.exports = mongoose.model('product', productSchema);