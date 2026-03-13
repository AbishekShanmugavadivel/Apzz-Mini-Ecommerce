import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { productAPI, cartAPI } from "../services/api";

export default function ProductDetail({ cartItems, setCartItems }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getProduct(id);
        setProduct(response.data.product);
      } catch (error) {
        toast.error("Error fetching product details");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  async function addToCart() {
    if (product.stock === 0) {
      toast.error("Product is out of stock");
      return;
    }

    if (qty > product.stock) {
      toast.error(`Only ${product.stock} items available in stock`);
      return;
    }

    try {
      await cartAPI.addToCart(product._id, qty);

      const newItem = { product, qty };
      const existingItemIndex = cartItems.findIndex(
        (item) => item.product._id === product._id
      );

      let updatedCart;

      if (existingItemIndex > -1) {
        updatedCart = [...cartItems];
        const newQty = updatedCart[existingItemIndex].qty + qty;

        if (newQty > product.stock) {
          toast.error(`Cannot add more than ${product.stock} items to cart`);
          return;
        }

        updatedCart[existingItemIndex].qty = newQty;
      } else {
        updatedCart = [...cartItems, newItem];
      }

      setCartItems(updatedCart);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      const message = error.response?.data?.message || "Error adding to cart";
      toast.error(message);
    }
  }

  function increaseQty() {
    if (product.stock === qty) return;
    setQty((state) => state + 1);
  }

  function decreaseQty() {
    if (qty > 1) {
      setQty((state) => state - 1);
    }
  }

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h3>Product not found</h3>
      </div>
    );
  }

  return (
    <div className="container container-fluid">
      <div className="row f-flex justify-content-around">
        <div className="col-12 col-lg-5 img-fluid" id="product_image">
          <img
            src={product.images?.[0]?.image}
            alt={product.name}
            height="500"
            width="500"
          />
        </div>

        <div className="col-12 col-lg-5 mt-5">
          <h3>{product.name}</h3>
          <p id="product_id">Product #{product._id}</p>

          <hr />

          <div className="rating-outer">
            <div
              className="rating-inner"
              style={{ width: `${(product.ratings / 5) * 100}%` }}
            ></div>
          </div>

          <hr />

          <p id="product_price">₹{product.price}</p>

          <div className="stockCounter d-inline">
            <span className="btn btn-danger minus" onClick={decreaseQty}>
              -
            </span>

            <input
              type="number"
              className="form-control count d-inline"
              value={qty}
              readOnly
            />

            <span className="btn btn-primary plus" onClick={increaseQty}>
              +
            </span>
          </div>

          <button
            type="button"
            onClick={addToCart}
            disabled={product.stock === 0}
            id="cart_btn"
            className="btn btn-primary d-inline ml-4"
          >
            Add to Cart
          </button>

          <hr />

          <p>
            Status:
            <span
              id="stock_status"
              className={product.stock > 0 ? "text-success" : "text-danger"}
            >
              {product.stock > 0 ? " In Stock" : " Out of Stock"}
            </span>
          </p>

          <hr />

          <h4 className="mt-2">Description:</h4>
          <p>{product.description}</p>

          <hr />

          <p id="product_seller mb-3">
            Sold by: <strong>{product.seller}</strong>
          </p>

          <div className="rating w-50"></div>
        </div>
      </div>
    </div>
  );
}