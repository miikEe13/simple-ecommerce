import { Link } from "react-router-dom";
import { useCart } from "./CartContent";

export default function Navbar() {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-link navbar-link-active">
        Home
      </Link>
      <Link to="/cart" className="navbar-link">
        Cart
        {cartItemCount > 0 && (
          <span className="cart-badge">
            {cartItemCount}
          </span>
        )}
      </Link>
      <Link to="/checkout" className="navbar-link">
        Checkout
      </Link>
    </nav>
  );
}
