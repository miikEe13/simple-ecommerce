import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContent';

const CheckoutPage: React.FC = () => {
  const { items, getPrice, clearCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsPurchaseComplete(true);
      
      clearCart();
      // Redirect to home after a delay
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 2000);
  };

  if (items.length === 0 && !isPurchaseComplete) {
    return (
      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-empty">
          <div className="checkout-empty-text">Your cart is empty</div>
          <Link to="/" className="checkout-empty-button">
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  if (isPurchaseComplete) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="checkout-success-icon">✓</div>
          <h1 className="checkout-success-title">Purchase Complete!</h1>
          <p className="checkout-success-message">
            Thank you for your order. A confirmation has been sent to your email.
          </p>
          <p className="checkout-success-redirect">
            You will be redirected to the home page shortly...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>
      
      <div className="checkout-container">
        <div className="checkout-summary">
          <h2 className="checkout-summary-title">Order Summary</h2>
          
          <div className="checkout-items">
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <div className="checkout-item-quantity">{item.quantity} ×</div>
                <div className="checkout-item-name">{item.name}</div>
                <div className="checkout-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="checkout-total">
            <span className="checkout-total-label">Total</span>
            <span className="checkout-total-value">${getPrice().toFixed(2)}</span>
          </div>
        </div>
        
        <div className="checkout-payment">
          <h2 className="checkout-payment-title">Payment</h2>
          
          <div className="checkout-disclaimer">
            <p>This is a demo store. No real payment will be processed.</p>
          </div>
          
          <button 
            className={`checkout-payment-button ${isProcessing ? 'checkout-payment-button-processing' : ''}`}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 