import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Redirect if already logged in
    useEffect(() => {
        if (!authLoading && isAuthenticated) {
            const redirect = location.search ? location.search.split('=')[1] : '/';
            navigate(redirect);
        }
    }, [isAuthenticated, authLoading, navigate, location]);

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await login({ email, password });

        if (result.success) {
            toast.success('Login successful!');
            const redirect = location.search ? location.search.split('=')[1] : '/';
            navigate(redirect);
        } else {
            toast.error(result.message || 'Login failed');
        }

        setLoading(false);
    };

    if (authLoading) {
        return <div className="container text-center mt-5">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>;
    }

    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={onSubmit}>
                        <h1 className="mb-3">Login</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <Link to="/forgot-password" className="float-right mb-4">
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            id="login_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border spinner-border-sm" role="status">
                                    <span className="sr-only">Loading...</span>
                                </span>
                            ) : (
                                'LOGIN'
                            )}
                        </button>

                        <Link to="/register" className="float-right mt-3">
                            New User?
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}
