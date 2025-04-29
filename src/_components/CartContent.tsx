import React from 'react';
import { useCart } from '../contexts/CartContext'; // aquí usas el contexto real

const CartContent: React.FC = () => {
  const { items, removeItemFromCart, updateQuantity, getPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-content-empty">
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="cart-content">
      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} className="cart-item-image" />

          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>${item.price.toFixed(2)}</p>
            <div className="cart-item-quantity">
              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= item.stock}>
                +
              </button>
            </div>
            <button className="cart-item-remove" onClick={() => removeItemFromCart(item.id)}>
              Remove
            </button>
          </div>
        </div>
      ))}

      <div className="cart-total">
        <strong>Total: </strong> ${getPrice().toFixed(2)}
      </div>
    </div>
  );
};

export default CartContent;
