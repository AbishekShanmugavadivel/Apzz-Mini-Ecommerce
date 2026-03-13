const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    ratings: Number,
    images : [
        {
            image: String
        }
    ],
    category: String,
    seller: String,
    stock: Number,
    numOfReviews: Number,
    createdAt: {type: Date, default: Date.now}
});

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;