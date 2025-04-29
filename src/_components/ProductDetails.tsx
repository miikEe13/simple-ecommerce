import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import '../assets/styles/_components/ProductDetails.css'; // Asegúrate de que la ruta sea correcta

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error loading product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        stock: product.stock,
        image: product.thumbnail,
        quantity: quantity,
      });
      setQuantity(1);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading product details...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="not-found-container">
        <h2>Product not found</h2>
        <Link to="/" className="not-found-link">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="page-section">
      <Link to="/" className="back-link">&larr; Back to Products</Link>

      <div className="product-details-container">
        <div className="product-details-image-container">
          <img src={product.thumbnail} alt={product.title} className="product-details-image" />
        </div>

        <div className="product-details-info">
          <h1 className="product-details-title">{product.title}</h1>
          <p className="product-details-brand">Brand: {product.brand}</p>
          <p className="product-details-sku">SKU: {product.sku}</p>
          <p className="product-details-category">Category: {product.category}</p>
          <p className="product-details-price">
            ${product.price.toFixed(2)} {product.discountPercentage > 0 && <span className="discount">-{product.discountPercentage}% OFF</span>}
          </p>
          <p className="product-details-stock">Stock: {product.stock} ({product.availabilityStatus})</p>
          <p className="product-details-rating">Rating: ⭐ {product.rating}</p>

          <div className="quantity-container">
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} disabled={quantity >= product.stock}>+</button>
          </div>

          <button className="add-to-cart-button" onClick={handleAddToCart} disabled={product.stock <= 0}>
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <div className="product-meta-info">
            <h3>Description</h3>
            <p>{product.description}</p>

            <h4>Warranty</h4>
            <p>{product.warrantyInformation}</p>

            <h4>Shipping Info</h4>
            <p>{product.shippingInformation}</p>

            <h4>Return Policy</h4>
            <p>{product.returnPolicy}</p>

            <h4>Dimensions</h4>
            <p>W: {product.dimensions.width}cm | H: {product.dimensions.height}cm | D: {product.dimensions.depth}cm</p>

            <h4>Weight</h4>
            <p>{product.weight}kg</p>

            <h4>Tags</h4>
            <div className="tags">
              {product.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            <h4>Reviews</h4>
            {product.reviews.length > 0 ? (
              product.reviews.map((review, index) => (
                <div key={index} className="review">
                  <strong>{review.reviewerName}</strong> ({new Date(review.date).toLocaleDateString()}): ⭐ {review.rating}
                  <p>{review.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}

            <h4>Product QR Code</h4>
            <img src={product.meta.qrCode} alt="QR Code" className="product-qr-code" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
