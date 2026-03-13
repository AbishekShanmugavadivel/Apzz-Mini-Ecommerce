import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { cartAPI } from '../services/api';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Load cart from backend on component mount
    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setCartItems([]);
            return;
        }

        try {
            setLoading(true);
            const response = await cartAPI.getCart();
            setCartItems(response.data.cartItems || []);
        } catch (error) {
            console.error('Error loading cart:', error);
            setCartItems([]);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        try {
            setLoading(true);
            await cartAPI.addToCart(productId, quantity);
            await loadCart(); // Reload cart from backend
            toast.success("Product added to cart successfully!");
        } catch (error) {
            const message = error.response?.data?.message || 'Error adding to cart';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateCartItem = async (productId, quantity) => {
        try {
            setLoading(true);
            await cartAPI.updateCartItem(productId, quantity);
            await loadCart(); // Reload cart from backend
        } catch (error) {
            const message = error.response?.data?.message || 'Error updating cart';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (productId) => {
        try {
            setLoading(true);
            await cartAPI.removeFromCart(productId);
            await loadCart(); // Reload cart from backend
            toast.success('Item removed from cart');
        } catch (error) {
            const message = error.response?.data?.message || 'Error removing item';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        try {
            setLoading(true);
            await cartAPI.clearCart();
            setCartItems([]);
        } catch (error) {
            const message = error.response?.data?.message || 'Error clearing cart';
            toast.error(message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.product.price * item.qty), 0);
    };

    const getCartItemsCount = () => {
        return cartItems.reduce((total, item) => total + item.qty, 0);
    };

    const value = {
        cartItems,
        loading,
        addToCart,
        updateCartItem,
        removeFromCart,
        clearCart,
        getCartTotal,
        getCartItemsCount,
        loadCart
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
