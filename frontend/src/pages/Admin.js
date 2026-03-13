import { useState } from 'react';
import { toast } from 'react-toastify';

export default function Admin() {

    const [product, setProduct] = useState({
        name: '',
        price: '',
        description: '',
        ratings: '',
        category: '',
        seller: '',
        stock: '',
        images: [{ image: '/images/products/1.jpg' }]
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(process.env.REACT_APP_API_URL + '/admin/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {

                if (data.success) {

                    toast.success('Product added successfully!');

                    setProduct({
                        name: '',
                        price: '',
                        description: '',
                        ratings: '',
                        category: '',
                        seller: '',
                        stock: '',
                        images: [{ image: '/images/products/1.jpg' }]
                    });

                } else {
                    toast.error('Error adding product');
                }

            })
            .catch(() => {
                toast.error('Error adding product');
            });
    };

    return (
        <div className="container container-fluid">

            <div className="row">

                <div className="col-12 col-md-8 offset-md-2">

                    <h2 className="mt-5">Add New Product</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="price_field">Price</label>
                            <input
                                type="number"
                                id="price_field"
                                className="form-control"
                                name="price"
                                value={product.price}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="description_field">Description</label>
                            <textarea
                                className="form-control"
                                id="description_field"
                                rows="8"
                                name="description"
                                value={product.description}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>


                        <div className="form-group">
                            <label htmlFor="category_field">Category</label>
                            <select
                                className="form-control"
                                id="category_field"
                                name="category"
                                value={product.category}
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


                        <div className="form-group">
                            <label htmlFor="seller_field">Seller</label>
                            <input
                                type="text"
                                id="seller_field"
                                className="form-control"
                                name="seller"
                                value={product.seller}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="stock_field">Stock</label>
                            <input
                                type="number"
                                id="stock_field"
                                className="form-control"
                                name="stock"
                                value={product.stock}
                                onChange={handleChange}
                                required
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="ratings_field">Ratings</label>
                            <input
                                type="number"
                                id="ratings_field"
                                className="form-control"
                                name="ratings"
                                value={product.ratings}
                                onChange={handleChange}
                                min="0"
                                max="5"
                                step="0.1"
                                required
                            />
                        </div>


                        <button
                            type="submit"
                            id="login_button"
                            className="btn btn-primary py-3"
                        >
                            CREATE
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}