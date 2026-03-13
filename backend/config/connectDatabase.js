const mongoose = require('mongoose');

const connectDatabase = () => {
    const dbURI = process.env.MONGO_URI || process.env.DB_URL;
    
    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('✅ MongoDB connected successfully');
        console.log(`📍 Host: ${con.connection.host}`);
        console.log(`🗄️ Database: ${con.connection.name}`);
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error.message);
        console.error('💡 Please check your MONGO_URI or DB_URL environment variable');
        process.exit(1);
    });

    // Handle connection events
    mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed through app termination');
        process.exit(0);
    });
};

module.exports = connectDatabase;