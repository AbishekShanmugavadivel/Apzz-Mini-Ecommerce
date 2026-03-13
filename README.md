<<<<<<< HEAD
# 🛍️ Apzzz - Premium Ecommerce Platform

A full-stack MERN ecommerce application with authentication, product management, and order processing.

## 🚀 Features

- **User Authentication**: Login, Register, JWT-based auth
- **Product Management**: Browse, search, product details with 12+ products
- **Shopping Cart**: Add to cart, quantity management with Indian Rupees (₹)
- **Order Processing**: Checkout and order history
- **Admin Dashboard**: CRUD operations for products
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live cart and stock management

## 🛠️ Tech Stack

### Frontend (React)
- React 18 with functional components and hooks
- React Router v6 for navigation
- Axios for API communication
- Toastify for notifications
- Bootstrap + Custom CSS for styling
- Font Awesome for icons

### Backend (Node.js + Express)
- Express.js REST API
- MongoDB with Mongoose ODM
- JWT authentication with bcryptjs
- CORS enabled for cross-origin requests
- Environment-based configuration

### Database (MongoDB)
- MongoDB Atlas for production
- Local MongoDB for development
- Proper indexing and relationships

## 📁 Project Structure

```
apzzz-ecommerce/
├── backend/                 # Node.js + Express API
│   ├── config/            # Database and environment config
│   ├── controllers/       # Route handlers
│   ├── middleware/        # Authentication middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── data/             # Sample data
│   └── package.json
├── frontend/               # React application
│   ├── public/           # Static assets
│   ├── src/              # React components
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
│   └── package.json
├── .gitignore
├── README.md
└── package.json           # Root package with scripts
```

## 🛠️ Local Development

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- Git

### Setup Steps

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd apzzz-ecommerce
   npm run install-all
   ```

2. **Environment Configuration**
   ```bash
   # Backend environment
   cp backend/config/config.env.example backend/config/config.env
   # Edit with your MongoDB connection string

   # Frontend environment
   cp frontend/.env.example frontend/.env.development
   # Edit with your API URL
   ```

3. **Seed Database**
   ```bash
   npm run seed
   ```

4. **Start Development Servers**
   ```bash
   npm start
   # This runs both frontend (port 3000) and backend (port 8000)
   ```

### Available Scripts

```bash
npm start              # Start both frontend and backend
npm run backend        # Start only backend server
npm run frontend       # Start only frontend server
npm run install-all    # Install all dependencies
npm run seed          # Seed database with sample data
```

## 🌐 Deployment

### Environment Variables

#### Backend (.env)
```bash
# Production
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/apzzz-ecommerce
JWT_SECRET=your_long_secure_jwt_secret
JWT_EXPIRE=7d
```

#### Frontend (.env.production)
```bash
REACT_APP_API_URL=https://your-backend.onrender.com
REACT_APP_NAME=Apzzz
```

### Deploy to Production

#### 1. MongoDB Atlas Setup
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create free cluster (M0 Sandbox)
3. Create database: `apzzz-ecommerce`
4. Create database user with read/write permissions
5. Get connection string with driver: Node.js
6. Add connection string to backend environment variables

#### 2. Backend Deployment (Render)
1. Push code to GitHub repository
2. Create new Web Service on [Render](https://render.com/)
3. Connect GitHub repository
4. Configure deployment:
   - **Build Command**: `npm install`
   - **Start Command**: `node app.js`
   - **Root Directory**: `backend`
5. Add environment variables in Render dashboard
6. Deploy and get backend URL

#### 3. Frontend Deployment (Vercel)
1. Import GitHub repository in [Vercel](https://vercel.com/)
2. Select `frontend` folder as root directory
3. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Node Version**: `18.x`
4. Add environment variable:
   - `REACT_APP_API_URL`: Your Render backend URL
5. Deploy and get frontend URL

#### 4. CORS Configuration
Update backend CORS origins to include your Vercel domain:
```javascript
app.use(cors({
    origin: ['https://your-app.vercel.app'],
    credentials: true
}));
```

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/profile` - Get user profile
- `POST /api/v1/auth/logout` - User logout

### Product Endpoints
- `GET /api/v1/products` - Get all products
- `GET /api/v1/products?keyword=search` - Search products
- `GET /api/v1/product/:id` - Get single product
- `POST /api/v1/admin/product` - Create product (admin)
- `PUT /api/v1/admin/product/:id` - Update product (admin)
- `DELETE /api/v1/admin/product/:id` - Delete product (admin)

### Cart Endpoints
- `GET /api/v1/cart` - Get user cart
- `POST /api/v1/cart/add` - Add item to cart
- `PUT /api/v1/cart/update` - Update cart item
- `DELETE /api/v1/cart/remove/:id` - Remove item from cart
- `DELETE /api/v1/cart/clear` - Clear cart

### Order Endpoints
- `POST /api/v1/order` - Create order
- `GET /api/v1/orders` - Get user orders

## 🔐 Default Credentials

### Admin User
- **Email**: admin@apzzz.com
- **Password**: admin123

## 🧪 Testing

### Health Check
- Backend: `GET /api/health`
- Frontend: Visit homepage

### Test Features
1. User registration and login
2. Product browsing and search
3. Add to cart functionality
4. Checkout process
5. Admin product management

## 📝️ Contributing

1. Fork the repository
2. Create feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation above
- Review the API endpoints

---

**Built with ❤️ for the Apzzz ecommerce platform**
=======
# apzz-ecommerce
My MERN ecommerce website
>>>>>>> 0b11da01b296ee86e92d88184a7e89ef3fc858e6
