import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { cartAPI, orderAPI } from '../services/api';

export default function Cart({ cartItems, setCartItems }) {
    const [complete, setComplete] = useState(false);
    const [loading, setLoading] = useState(false);

    async function increaseQty(item) {
        if (item.qty >= item.product.stock) {
            toast.error('Cannot add more items than available stock');
            return;
        }

        try {
            await cartAPI.updateCartItem(item.product._id, item.qty + 1);

            const updatedItems = cartItems.map((i) => {
                if (i.product._id === item.product._id) {
                    return { ...i, qty: i.qty + 1 };
                }
                return i;
            });

            setCartItems(updatedItems);
        } catch (error) {
            const message = error.response?.data?.message || 'Error updating cart';
            toast.error(message);
        }
    }

    async function decreaseQty(item) {
        if (item.qty > 1) {
            try {
                await cartAPI.updateCartItem(item.product._id, item.qty - 1);

                const updatedItems = cartItems.map((i) => {
                    if (i.product._id === item.product._id) {
                        return { ...i, qty: i.qty - 1 };
                    }
                    return i;
                });

                setCartItems(updatedItems);
            } catch (error) {
                const message = error.response?.data?.message || 'Error updating cart';
                toast.error(message);
            }
        }
    }

    async function removeItem(item) {
        try {
            await cartAPI.removeFromCart(item.product._id);

            const updatedItems = cartItems.filter(
                (i) => i.product._id !== item.product._id
            );

            setCartItems(updatedItems);
            toast.success('Item removed from cart');
        } catch (error) {
            const message = error.response?.data?.message || 'Error removing item';
            toast.error(message);
        }
    }

    async function placeOrderHandler() {
        setLoading(true);
        try {
            await orderAPI.createOrder(cartItems);
            await cartAPI.clearCart();

            setCartItems([]);
            setComplete(true);
            toast.success("Order placed successfully!");
        } catch (error) {
            const message = error.response?.data?.message || 'Error placing order';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    }

    return cartItems.length > 0 ? (
        <Fragment>
            <div className="container container-fluid">
                <h2 className="mt-5">
                    Your Cart: <b>{cartItems.length} items</b>
                </h2>

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8">
                        {cartItems.map((item) => (
                            <Fragment key={item.product._id}>
                                <hr />

                                <div className="cart-item">
                                    <div className="row">
                                        <div className="col-4 col-lg-3">
                                            <img
                                                src={item.product.images[0].image}
                                                alt={item.product.name}
                                                height="90"
                                                width="115"
                                            />
                                        </div>

                                        <div className="col-5 col-lg-3">
                                            <Link to={"/product/" + item.product._id}>
                                                {item.product.name}
                                            </Link>
                                        </div>

                                        <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                            <p id="card_item_price">₹{item.product.price}</p>
                                        </div>

                                        <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                            <div className="stockCounter d-inline">
                                                <span
                                                    className="btn btn-danger minus"
                                                    onClick={() => decreaseQty(item)}
                                                >
                                                    -
                                                </span>

                                                <input
                                                    type="number"
                                                    className="form-control count d-inline"
                                                    value={item.qty}
                                                    readOnly
                                                />

                                                <span
                                                    className="btn btn-primary plus"
                                                    onClick={() => increaseQty(item)}
                                                >
                                                    +
                                                </span>
                                            </div>
                                        </div>

                                        <div className="col-4 col-lg-1 mt-4 mt-lg-0">
                                            <i
                                                id="delete_cart_item"
                                                onClick={() => removeItem(item)}
                                                className="fa fa-trash btn btn-danger"
                                            ></i>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />

                            <p>
                                Subtotal:
                                <span className="order-summary-values">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} (Units)
                                </span>
                            </p>

                            <p>
                                Est. total:
                                <span className="order-summary-values">
                                    ₹
                                    {Number(
                                        cartItems.reduce(
                                            (acc, item) => acc + item.product.price * item.qty,
                                            0
                                        )
                                    ).toFixed(2)}
                                </span>
                            </p>

                            <hr />

                            <button
                                id="checkout_btn"
                                onClick={placeOrderHandler}
                                className="btn btn-primary btn-block"
                                disabled={loading}
                            >
                                {loading ? "Placing..." : "Place Order"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    ) : !complete ? (
        <h2 className="mt-5">Your Cart is Empty!</h2>
    ) : (
        <Fragment>
            <h2 className="mt-5">Order Complete!</h2>
            <p>Your order has been placed successfully.</p>
            <Link to="/" className="btn btn-primary">
                Continue Shopping
            </Link>
        </Fragment>
    );
}