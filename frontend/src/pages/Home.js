import { Fragment, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSearchParams } from "react-router-dom";
import { productAPI } from "../services/api";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        const keyword = searchParams.get("keyword");

        if (keyword) {
          params.keyword = keyword;
        }

        const response = await productAPI.getProducts(params);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <h1 id="products_heading">Latest Products</h1>

      <section id="products" className="container mt-5">
        <div className="row">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products.length === 0 && (
          <div className="alert alert-info text-center">
            No products found
          </div>
        )}
      </section>
    </Fragment>
  );
}