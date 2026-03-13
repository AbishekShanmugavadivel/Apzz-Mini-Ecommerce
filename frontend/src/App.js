import './App.css';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Router>
            <div>
              <ToastContainer theme='dark' position='top-center' />
              <Header />
              <Routes>
                  <Route path="/"  element={ <Home />}/>
                  <Route path="/search"  element={ <Home />}/>
                  <Route path="/product/:id"  element={ <ProductDetail />}/>
                  <Route path="/cart"  element={ 
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }/>
                  <Route path="/admin"  element={ 
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }/>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
              </Routes>
            </div>
          </Router>
          <Footer/>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
