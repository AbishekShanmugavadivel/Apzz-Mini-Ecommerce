import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { productAPI } from '../services/api';

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        ratings: '',
        category: '',
        seller: '',
        stock: '',
        images: [{ image: '/images/products/1.jpg' }]
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await productAPI.getProducts();
            setProducts(response.data.products || []);
        } catch (error) {
            toast.error('Error fetching products');
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingProduct) {
                await productAPI.updateProduct(editingProduct._id, formData);
                toast.success('Product updated successfully!');
            } else {
                await productAPI.createProduct(formData);
                toast.success('Product added successfully!');
            }

            setFormData({
                name: '',
                price: '',
                description: '',
                ratings: '',
                category: '',
                seller: '',
                stock: '',
                images: [{ image: '/images/products/1.jpg' }]
            });
            setEditingProduct(null);
            setShowAddForm(false);
            fetchProducts();
        } catch (error) {
            toast.error('Error saving product');
        }

        setLoading(false);
    };

    const handleEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            description: product.description,
            ratings: product.ratings,
            category: product.category,
            seller: product.seller,
            stock: product.stock,
            images: product.images
        });
        setShowAddForm(true);
    };

    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await productAPI.deleteProduct(productId);
                toast.success('Product deleted successfully!');
                fetchProducts();
            } catch (error) {
                toast.error('Error deleting product');
            }
        }
    };

    const cancelForm = () => {
        setShowAddForm(false);
        setEditingProduct(null);
        setFormData({
            name: '',
            price: '',
            description: '',
            ratings: '',
            category: '',
            seller: '',
            stock: '',
            images: [{ image: '/images/products/1.jpg' }]
        });
    };

    return (
        <div className="container container-fluid">
            <div className="row">
                <div className="col-12">
                    <h2 className="mt-5 mb-4">Admin Dashboard</h2>
                    
                    <button 
                        className="btn btn-primary mb-4" 
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        {showAddForm ? 'Cancel' : 'Add New Product'}
                    </button>

                    {showAddForm && (
                        <div className="card mb-4">
                            <div className="card-body">
                                <h4 className="card-title">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="name_field">Name</label>
                                                <input
                                                    type="text"
                                                    id="name_field"
                                                    className="form-control"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label htmlFor="price_field">Price</label>
                                                <input
                                                    type="number"
                                                    id="price_field"
                                                    className="form-control"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    step="0.01"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description_field">Description</label>
                                        <textarea
                                            className="form-control"
                                            id="description_field"
                                            rows="3"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="category_field">Category</label>
                                                <select 
                                                    className="form-control" 
                                                    id="category_field" 
                                                    name="category" 
                                                    value={formData.category} 
                                                    onChange={handleChange} 
                                                    required
                                                >
                                                    <option value="">Select Category</option>
                                                    <option value="Mobile Phones">Mobile Phones</option>
                                                    <option value="Laptops">Laptops</option>
                                                    <option value="Accessories">Accessories</option>
                                                    <option value="Headphones">Headphones</option>
                                                    <option value="Sports">Sports</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="seller_field">Seller</label>
                                                <input
                                                    type="text"
                                                    id="seller_field"
                                                    className="form-control"
                                                    name="seller"
                                                    value={formData.seller}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label htmlFor="stock_field">Stock</label>
                                                <input
                                                    type="number"
                                                    id="stock_field"
                                                    className="form-control"
                                                    name="stock"
                                                    value={formData.stock}
                                                    onChange={handleChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ratings_field">Ratings</label>
                                        <input
                                            type="number"
                                            id="ratings_field"
                                            className="form-control"
                                            name="ratings"
                                            value={formData.ratings}
                                            onChange={handleChange}
                                            min="0"
                                            max="5"
                                            step="0.1"
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary mr-2"
                                        disabled={loading}
                                    >
                                        {loading ? 'Saving...' : (editingProduct ? 'Update' : 'Create')}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={cancelForm}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Products List</h4>
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Category</th>
                                                <th>Stock</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((product) => (
                                                <tr key={product._id}>
                                                    <td>{product._id.substring(0, 8)}...</td>
                                                    <td>{product.name}</td>
                                                    <td>₹{product.price}</td>
                                                    <td>{product.category}</td>
                                                    <td>{product.stock}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-sm btn-info mr-2"
                                                            onClick={() => handleEdit(product)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDelete(product._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {products.length === 0 && (
                                        <div className="text-center py-4">
                                            <p>No products found</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
