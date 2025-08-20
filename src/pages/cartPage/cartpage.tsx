import React, { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import './cartpage.css';
import { Link, useNavigate } from 'react-router-dom';
import { shopItems } from '../../data/shopitems';
import { Product } from '../../data/product';
import { supabase } from '../../supabaseClient';
import { User } from '@supabase/supabase-js';


type CartProduct = Product & {
  quantity: number;
  colorKey?: string;
  selectedImage?: string;
};


const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, addToCart } = useCart();
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  const handleProceedToCheckout = () => {
    if (user) {
      navigate('/payment', { state: { cartItems } });
    } else {
      navigate('/checkout');
    }
  };


  const recommendedItems = shopItems.filter(item => ![3, 12, 4, 5, 8, 16].includes(item.id));

  if (!cartItems?.length) {
    return (
      <>
        <div className="empty-cart">
          <p>Nothing in your cart yet — start shopping now!</p>
          <Link to="/shop">
            <button className="checkout-btn b1">Continue Shopping</button>
          </Link>
        </div>
        <div className="shopitems">
          <h2 className="shopitems-title">You Might Also Like . . .</h2>
          <div className="shopitems-scroll">
            {recommendedItems.map((item) => (
              <div key={item.id} className="shop-item">
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.title} />
                  <h3>{item.title}</h3>
                </Link>
                <span>{item.price.toLocaleString()} Toman</span>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  // const groupedItems = cartItems.reduce((acc, item) => {
  //   const key = `${item.id}-${item.colorKey || 'default'}`;
  //   if (acc[key]) {
  //     acc[key].quantity += 1;
  //   } else {
  //     acc[key] = { ...item, quantity: 1 };
  //   }
  //   return acc;
  // }, {} as Record<string, CartProduct>);

  //  const groupedArray = Object.values(groupedItems);
  const groupedArray = cartItems;

  return (
    <>
      <div className="cart-page">
        <h1 className="cart-title">Your Shopping Cart :</h1>
        <ul className="cart-list">
          {groupedArray.map((item) => {
            const key = `${item.id}-${item.colorKey || 'default'}`;
            return (
              <li className="cart-item" key={key}>
                <div className="cart-item-img">
                  <Link to={`/product/${item.id}`}>
                    <img src={item.selectedImage || item.image} alt={item.title} />
                  </Link>
                </div>
                <div className="cart-item-details">
                  <h2 className="item-title">
                    {item.title} {item.quantity > 1 ? ` x${item.quantity}` : ''}
                  </h2>
                  <p className="item-price">{(item.price * item.quantity).toLocaleString()} Toman</p>
                  {item.description && <p className="item-description">{item.description}</p>}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id, item.colorKey)}
                  >
                    Delete
                  </button>

                </div>
              </li>
            );
          })}
        </ul>

        <div className="cart-summary">
          <p>
            Total Amount:{' '}
            <span>
              {groupedArray.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()} Toman
            </span>
          </p>
        </div>

        <button className="checkout-btn next b1" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>

      <div className="shopitems">
        <h2 className="shopitems-title">You Might Also Like</h2>
        <div className="shopitems-scroll">
          {recommendedItems.map((item) => (
            <div key={item.id} className="shop-item">
              <Link to={`/product/${item.id}`}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
              </Link>
              <span>{item.price.toLocaleString()} Toman</span>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CartPage;
