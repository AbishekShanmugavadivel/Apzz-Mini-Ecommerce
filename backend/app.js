const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

// Load env variables
dotenv.config();

// Connect to MongoDB
connectDatabase();

// Import Routes
const products = require('./routes/product');
const orders = require('./routes/order');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const cart = require('./routes/cart');

// CORS Configuration
app.use(cors({
    origin: [
        "http://localhost:3000",
        "https://apzzz.vercel.app"
    ],
    credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1/', products);
app.use('/api/v1/', orders);
app.use('/api/v1/', admin);
app.use('/api/v1/', auth);
app.use('/api/v1/', cart);

// Health Check API
app.get('/api/health', (req, res) => {
    res.json({
        status: "OK",
        message: "Apzzz Backend API Running",
        time: new Date()
    });
});

// Root route
app.get('/', (req, res) => {
    res.send("🚀 Apzzz Backend is Running");
});

// Start Server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});