import { Link } from "react-router-dom";
import Search from "./Search";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Header() {
    const { isAuthenticated, user, logout } = useAuth();
    const { getCartItemsCount } = useCart();
    const cartItemsCount = getCartItemsCount();

    return <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                <Link to="/"> 
                    <img width="160px" height="50px" src="/images/logo.png" alt="Apzzz Logo" />
                </Link>
                </div>
            </div>

            <div className="col-12 col-md-6 mt-2 mt-md-0">
              <Search/>
            </div>

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                {isAuthenticated ? (
                    <>
                        {user?.role === 'admin' && (
                            <Link to={"/admin"}>
                                <span id="admin" className="ml-3">Admin</span>
                            </Link>
                        )}
                        <span className="ml-3">Welcome, {user?.name}</span>
                        <Link to={"/cart"}>
                            <span id="cart" className="ml-3">Cart</span>
                            <span className="ml-1" id="cart_count">{cartItemsCount}</span>
                        </Link>
                        <button 
                            onClick={logout} 
                            className="btn btn-danger ml-3"
                            style={{padding: '8px 12px', fontSize: '14px'}}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to={"/login"}>
                            <span id="login" className="ml-3">Login</span>
                        </Link>
                        <Link to={"/register"}>
                            <span id="register" className="ml-3">Register</span>
                        </Link>
                        <Link to={"/cart"}>
                            <span id="cart" className="ml-3">Cart</span>
                            <span className="ml-1" id="cart_count">{cartItemsCount}</span>
                        </Link>
                    </>
                )}
            </div>
        </nav>
}