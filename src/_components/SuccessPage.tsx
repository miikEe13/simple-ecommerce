import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../assets/styles/_components/SuccessPage.css';

const SuccessPage: React.FC = () => {
  const { shippingInfo, paymentInfo, items, getPrice, clearCart } = useCart();

  return (
    <div className="success-page">
      <h1 className="success-title">🎉 Purchase Complete!</h1>
      <p className="success-subtitle">Thank you for your order. We appreciate your business!</p>

      <div className="success-layout">

        {/* Left side: Shipping and Payment Info */}
        <div className="success-info">
          <h2>Shipping Information</h2>
          <div className="success-info-box">
            <p><strong>Email:</strong> {shippingInfo?.email || 'Not provided'}</p>
            <p><strong>Address:</strong> {shippingInfo?.address || 'Not provided'}</p>
          </div>

          <h2>Payment Method</h2>
          <div className="success-info-box">
            <p>{paymentInfo?.method || 'Not specified'}</p>
          </div>
        </div>

        {/* Right side: Products and Summary */}
        <div className="success-summary">
          <h2>Order Summary</h2>

          <div className="success-items">
            {items.map(item => (
              <div key={item.id} className="success-item">
                <div className="success-item-name">{item.name}</div>
                <div className="success-item-qty">Qty: {item.quantity}</div>
                <div className="success-item-price">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="success-total">
            <div>
              <span className="success-total-label">Subtotal:</span>
              <span>${getPrice().toFixed(2)}</span>
            </div>
            <div>
              <span className="success-total-label">Shipping:</span>
              <span>$0.00</span>
            </div>
            <div className="success-total-final">
              <span className="success-total-label">Total:</span>
              <span>${getPrice().toFixed(2)}</span>
            </div>
          </div>

          <Link to="/" className="btn btn-home" onClick={clearCart}>
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SuccessPage;
