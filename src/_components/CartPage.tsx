import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContent';

const CartPage: React.FC = () => {
  const { items, removeItemFromCart, updateQuantity, getTotalPrice } = useCart();

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
      <h1 className="cart-title">Your Cart</h1>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.name} className="cart-item">
            <Link to={`/product/${item.id}`} className="cart-item-image-container">
              <img src={item.image} alt={item.name} className="cart-item-image" />
            </Link>
            
            <div className="cart-item-details">
              <Link to={`/product/${item.id}`} className="cart-item-name">
                {item.name}
              </Link>
              <div className="cart-item-price">${item.price.toFixed(2)} each</div>
              <div className="cart-item-subtotal">
                Subtotal: ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
            
            <div className="cart-item-actions">
              <div className="cart-quantity-container">
                <button 
                  className="cart-quantity-button"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="cart-quantity-display">{item.quantity}</span>
                <button 
                  className="cart-quantity-button"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  +
                </button>
              </div>
              
              <button 
                className="cart-remove-button"
                onClick={() => removeItemFromCart(item.id)}
                aria-label={`Remove ${item.name} from cart`}
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-summary-row">
          <span className="cart-summary-label">Items</span>
          <span className="cart-summary-value">{items.length}</span>
        </div>
        
        <div className="cart-summary-row">
          <span className="cart-summary-label">Total Quantity</span>
          <span className="cart-summary-value">
            {items.map((total, item) => total + item.quantity, 0)}
          </span>
        </div>
        
        <div className="cart-summary-row cart-summary-total">
          <span className="cart-summary-label">Total</span>
          <span className="cart-summary-value">${getTotalPrice().toFixed(2)}</span>
        </div>
        
        <Link to="/checkout" className="cart-checkout-button">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage; 