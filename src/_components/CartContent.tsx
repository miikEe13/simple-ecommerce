import React, { useEffects, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./_components/Navbar";
import ProductGrid from "./_components/ProductGrid";
import ProductDetails from "./_components/ProductDetails";
import CartPage from "./_components/CartPage";
import CheckoutPage from "./_components/CheckoutPage";
import { CartProvider } from "./_components/CartContent";
import "./App.css";

function HomePage(): number {
  const [countdown, setCountdown] = useState(59);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        const newCount = prevCount > 0 ? prevCount - 1 : 59;

        if (newCount === 0) {
          alert("The Offers Have Ended");
          return
        }

        return newCount;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  
  return (
    <>
      <div className="page-section">
        <h1 className="page-heading">Shop Our Products</h1>
        <p className="page-subheading">
          Discover our curated collection of high-quality products
        </p>
        <hr className="divider" />
      </div>
      <ProductGrid />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
