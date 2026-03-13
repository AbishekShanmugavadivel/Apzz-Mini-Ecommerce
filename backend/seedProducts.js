const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productModel = require('./models/productModel');
const products = require('./data/products');

dotenv.config({ path: './config/config.env' });

const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected for seeding...');

        // Clear existing products
        await productModel.deleteMany();
        console.log('Existing products cleared');

        // Insert new products
        const createdProducts = await productModel.insertMany(products);
        console.log(`${createdProducts.length} products inserted successfully`);

        process.exit();
    } catch (error) {
        console.error('Error seeding products:', error);
        process.exit(1);
    }
};

seedProducts();
