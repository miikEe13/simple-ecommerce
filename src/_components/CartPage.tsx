import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/_components/CartPage.css';

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItemFromCart, updateQuantity, getPrice } = useCart();

  const goToCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    navigate('/checkout');
  }

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>
        <div className="cart-empty">
          <div className="cart-empty-text">Your cart is empty</div>
          <Link to="/" className="cart-empty-button">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">Shopping Cart</h1>

      <div className="cart-layout">
        
        {/* --- Productos --- */}
        <div className="cart-products">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="cart-product-info">
                      <img src={item.image} alt={item.name} className="cart-product-image" />
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </div>
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <div className="quantity-controls">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td className="cart-actions">
                    <button onClick={() => removeItemFromCart(item.id)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Botones debajo */}
          <div className="cart-buttons">
            <Link to="/" className="btn">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* --- Resumen --- */}
        <div className="cart-summary">
          <h2>Summary</h2>
          
          <div className="cart-summary-row">
            <span>Subtotal</span>
            <span>${getPrice().toFixed(2)}</span>
          </div>

          <div className="cart-summary-row">
            <span>Shipping</span>
            <span>$0.00</span>
          </div>

          <div className="cart-summary-total">
            Total: ${getPrice().toFixed(2)}
          </div>

          <button className="btn-checkout" onClick={goToCheckout}>
            Proceed to Checkout
          </button>
        </div>

      </div>

    </div>
  );
};

export default CartPage;
