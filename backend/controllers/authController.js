const User = require('../models/userModel');
const Cart = require('../models/cartModel');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'defaultsecret', {
        expiresIn: process.env.JWT_EXPIRE || '7d'
    });

    res.status(statusCode).json({
        success: true,
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
};

// Register User
exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        // Create empty cart for user
        await Cart.create({
            user: user._id,
            cartItems: []
        });

        sendToken(user, 201, res);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Login User
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            });
        }

        // Find user with password
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        sendToken(user, 200, res);
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Get current user profile
exports.getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Logout User
exports.logout = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};
