import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../services/api';

// Initial state
const initialState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true
};

// Auth context
const AuthContext = createContext();

// Action types
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_FAIL = 'AUTH_FAIL';
const LOAD_USER = 'LOAD_USER';

// Reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        case LOAD_USER:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                loading: false
            };
        case AUTH_FAIL:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false
            };
        default:
            return state;
    }
};

// Provider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load user from token
    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await authAPI.getProfile();
                    dispatch({
                        type: LOAD_USER,
                        payload: response.data.user
                    });
                } catch (error) {
                    dispatch({ type: AUTH_FAIL });
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            } else {
                dispatch({ type: AUTH_FAIL });
            }
        };

        loadUser();
    }, []);

    // Register user
    const register = async (userData) => {
        try {
            const response = await authAPI.register(userData);
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            dispatch({
                type: AUTH_SUCCESS,
                payload: { token, user }
            });

            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            dispatch({ type: AUTH_FAIL });
            return { success: false, message };
        }
    };

    // Login user
    const login = async (credentials) => {
        try {
            const response = await authAPI.login(credentials);
            const { token, user } = response.data;
            
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            dispatch({
                type: AUTH_SUCCESS,
                payload: { token, user }
            });

            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Login failed';
            dispatch({ type: AUTH_FAIL });
            return { success: false, message };
        }
    };

    // Logout user
    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        }
        
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: AUTH_LOGOUT });
    };

    const value = {
        ...state,
        register,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
