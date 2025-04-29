import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../assets/styles/_components/CheckoutPage.css';

const CheckoutPage: React.FC = () => {
  const { items, getPrice, setShippingInfo, setPaymentInfo } = useCart();
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    if (!email || !address) {
      alert('Please enter shipping information before proceeding.');
      return;
    }

    // Save to context
    setShippingInfo({ email, address });
    setPaymentInfo({ method: 'Dummy Payment (Card)' });

    setIsProcessing(true);

    setTimeout(() => {
      setIsPurchaseComplete(true);
      setTimeout(() => {
        navigate('/success');
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
        <h1 className="checkout-title">Processing your order...</h1>
        <p>Please wait, redirecting...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">

        {/* Left side: Shipping + Payment */}
        <div className="checkout-shipping-payment">
          <div className="checkout-shipping">
            <h2>Shipping Information</h2>

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Shipping Address</label>
            <input
              type="text"
              placeholder="Enter your shipping address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <h2>Shipping Method</h2>
            <div className="shipping-method">
              <input type="radio" checked readOnly />
              <label>Free Shipping (Dummy)</label>
            </div>
          </div>

          <div className="checkout-payment">
            <h2 className="checkout-payment-title">Payment</h2>
            <div className="checkout-disclaimer">
              <p>This is a demo store. No real payment will be processed.</p>
            </div>
          </div>
        </div>

        {/* Right side: Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {items.map(item => (
              <div key={item.id} className="checkout-item">
                <img src={item.image} alt={item.name} className="checkout-item-image" />
                <div className="checkout-item-details">
                  <div>{item.name}</div>
                  <div>Qty: {item.quantity}</div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-total">
            <span>Subtotal:</span> <span>${getPrice().toFixed(2)}</span>
          </div>

          <button
            className={`checkout-payment-button ${isProcessing ? 'processing' : ''}`}
            onClick={handlePayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Continue to Payment'}
          </button>

          {/* Extra info: Shipping and Payment Summary */}
          <div className="checkout-summary-section">
            <h2>Shipping Summary</h2>
            <div className="checkout-summary-box">
              <strong>Send to:</strong>
              <p>{email ? email : 'Email not provided'}</p>
              <p>{address ? address : 'Address not provided'}</p>
            </div>

            <h2>Shipping Method</h2>
            <div className="checkout-summary-box">
              <strong>Method:</strong>
              <p>Free Shipping</p>
            </div>

            <h2>Payment Method</h2>
            <div className="checkout-summary-box">
              <strong>Payment:</strong>
              <p>Dummy Payment (Card)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
