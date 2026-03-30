const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./config/connectDatabase');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDatabase();

// Import Routes
const products = require('./routes/product');
const orders = require('./routes/order');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const cart = require('./routes/cart');

// ================= CORS CONFIG =================
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://apzz-mini-ecommerce-abishekshanmugavadivels-projects.vercel.app"
    ],
    credentials: true
  })
);

// Allow preflight requests
app.options('*', cors());

// ================= BODY PARSER =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= API ROUTES =================
app.use('/api/v1/auth', auth);
app.use('/api/v1/', products);
app.use('/api/v1/', orders);
app.use('/api/v1/', admin);
app.use('/api/v1/', cart);

// ================= HEALTH CHECK =================
app.get('/api/health', (req, res) => {
  res.json({
    status: "OK",
    message: "Apzzz Backend API Running",
    time: new Date()
  });
});

// ================= ROOT ROUTE =================
app.get('/', (req, res) => {
  res.send("🚀 Apzzz Backend is Running");
});

// ================= START SERVER =================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});