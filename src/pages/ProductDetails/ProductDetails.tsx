import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useCart } from '../../context/CartContext';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id) 
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } else {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found!</p>;

  return (
    <>
      <div className="product-page-container">
        <div className="tozih">
          <h2>{product.name}</h2>
          <p className="product-description long-text">
            {product.description || 'No description has been provided for this product.'}
          </p>
          <p className="product-description price">
            <strong>Price:</strong> {product.price.toLocaleString()} Toman
          </p>
          <div className="button-group">
            <button className="btni primary" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
        <div className="product-details">
          <img src={product.image_url || '/placeholder.png'} alt={product.name} className="product-image" />
        </div>
      </div>

      <div className="logo-container">
        <Link to="/" className="logo-link">
          <span className="logo-text">Hess Coffee</span>
        </Link>
      </div>

      <div className="outside-buttons">
        <Link to="/shop">
          <button className="btnn">Continue Shopping</button>
        </Link>
        <Link to="/cart">
          <button className="btnn secondary">Shopping Cart</button>
        </Link>
      </div>
    </>
  );
}

export default ProductDetails;
