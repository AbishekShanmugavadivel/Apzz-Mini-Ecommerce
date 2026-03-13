const productModel = require('../models/productModel');

// Create Product - /api/v1/admin/product
exports.createProduct = async (req, res, next) => {
    try {
        const product = await productModel.create(req.body);
        res.json({
            success: true,
            product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update Product - /api/v1/admin/product/:id
exports.updateProduct = async (req, res, next) => {
    try {
        const product = await productModel.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            product
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete Product - /api/v1/admin/product/:id
exports.deleteProduct = async (req, res, next) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
