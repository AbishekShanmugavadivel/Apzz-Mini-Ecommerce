const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Get user cart
exports.getCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id }).populate('cartItems.product');
        
        if (!cart) {
            // Create new cart if doesn't exist
            const newCart = await Cart.create({
                user: req.user.id,
                cartItems: []
            });
            return res.status(200).json({
                success: true,
                cart: newCart
            });
        }

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Add item to cart
exports.addToCart = async (req, res, next) => {
    try {
        const { productId, quantity = 1 } = req.body;

        // Check if product exists and has stock
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        // Find or create user cart
        let cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            cart = await Cart.create({
                user: req.user.id,
                cartItems: []
            });
        }

        // Check if product already in cart
        const existingItemIndex = cart.cartItems.findIndex(
            item => item.product.toString() === productId
        );

        if (existingItemIndex > -1) {
            // Update quantity if product exists
            const newQuantity = cart.cartItems[existingItemIndex].quantity + quantity;
            if (newQuantity > product.stock) {
                return res.status(400).json({
                    success: false,
                    message: 'Insufficient stock'
                });
            }
            cart.cartItems[existingItemIndex].quantity = newQuantity;
        } else {
            // Add new item
            cart.cartItems.push({
                product: productId,
                quantity,
                price: product.price
            });
        }

        await cart.save();
        await cart.populate('cartItems.product');

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Update cart item quantity
exports.updateCartItem = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;

        if (quantity < 1) {
            return res.status(400).json({
                success: false,
                message: 'Quantity must be at least 1'
            });
        }

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        const itemIndex = cart.cartItems.findIndex(
            item => item.product.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Item not found in cart'
            });
        }

        // Check stock
        const product = await Product.findById(productId);
        if (product.stock < quantity) {
            return res.status(400).json({
                success: false,
                message: 'Insufficient stock'
            });
        }

        cart.cartItems[itemIndex].quantity = quantity;
        await cart.save();
        await cart.populate('cartItems.product');

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res, next) => {
    try {
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.cartItems = cart.cartItems.filter(
            item => item.product.toString() !== productId
        );

        await cart.save();
        await cart.populate('cartItems.product');

        res.status(200).json({
            success: true,
            cart
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Clear cart
exports.clearCart = async (req, res, next) => {
    try {
        const cart = await Cart.findOne({ user: req.user.id });
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart not found'
            });
        }

        cart.cartItems = [];
        await cart.save();

        res.status(200).json({
            success: true,
            message: 'Cart cleared successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
