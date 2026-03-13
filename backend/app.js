const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');
dotenv.config({path: path.join(__dirname, 'config', 'config.env')})

const products = require('./routes/product');
const orders = require('./routes/order');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const cart = require('./routes/cart');

connectDatabase();

// CORS Configuration for deployment
app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-vercel-domain.vercel.app', 'https://apzzz.vercel.app']
        : ['http://localhost:3000'],
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/v1/', products);
app.use('/api/v1/', orders);
app.use('/api/v1/', admin);
app.use('/api/v1/', auth);
app.use('/api/v1/', cart);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Apzzz Backend API is running',
        timestamp: new Date().toISOString()
    });
});

if (process.env.NODE_ENV == 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'))
    });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`🚀 Apzzz Server listening to Port ${PORT} in ${process.env.NODE_ENV || 'development'}`)
    console.log(`🌐 API Health Check: http://localhost:${PORT}/api/health`)
});