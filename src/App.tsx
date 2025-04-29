import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./_components/Navbar";
import ProductGrid from "./_components/ProductGrid";
import ProductDetails from "./_components/ProductDetails";
import CartPage from "./_components/CartPage";
import CheckoutPage from "./_components/CheckoutPage";
import { CartProvider } from "./contexts/CartContext";
import "./App.css";
import "./assets/styles/_components/Loading.css";

function HomePage(): JSX.Element {
  const [countdown, setCountdown] = useState(59);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCountdown((prevCount) => {
  //       if (prevCount === 0) {
  //         alert("The Offers Have Ended");
  //         return 59; // Reset to 59 after alert
  //       }
  //       return prevCount - 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  return (
    <>
      <div className="page-section">
        <h1 className="page-heading">Shop Our Products</h1>
        <p className="page-subheading">
          Discover our curated collection of high-quality products
        </p>
        <p>Countdown: {countdown}</p> {/* Opcional: muestra el contador */}
        <hr className="divider" />
      </div>
      <ProductGrid />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
