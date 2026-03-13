const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config({ path: './config/config.env' });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('MongoDB connected for admin seeding...');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: 'admin@ecommerce.com' });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit();
        }

        // Create admin user
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@ecommerce.com',
            password: 'admin123',
            role: 'admin'
        });

        console.log('Admin user created successfully:');
        console.log('Email: admin@ecommerce.com');
        console.log('Password: admin123');

        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
