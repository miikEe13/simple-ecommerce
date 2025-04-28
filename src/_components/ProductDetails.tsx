import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from './CartContent';

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: number }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/products.json');
        const data = await response.json();
        const foundProduct = data.find((p: Product) => p.id === id);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          const related = data
            .filter((p: Product) => p.category === foundProd.category && p.id !== foundProduct.id)
            .slice(0, 3);
          setRelatedProducts(related);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
    setQuantity(1);
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (product && newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock
        });
      }
      
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
        <div className="not-found-text">Product not found</div>
        <Link to="/" className="not-found-link">
          Back to Products
        </Link>
      </div>
    );
  }

  const getStatusClassName = () => {
    if (product.stock > 2) return 'product-details-stock in-stock';
    if (product.stock > 0) return 'product-details-stock low-stock';
    return 'product-details-stock out-of-stock';
  };

  return (
    <div className="page-section">
      <Link to="/" className="back-link">
        &larr; Back to Products
      </Link>
      
      <div className="product-details-container">
        <div className="product-details-image-container">
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-details-image"
          />
        </div>
        
        <div>
          <div className="product-details-category">
            {product.category}
          </div>
          
          <h1 className="product-details-title">
            {product.name}
          </h1>
          
          <div className="product-details-price">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="product-details-stock-container">
            <div className={getStatusClassName()}>
              {product.stock > 2 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
            </div>
            
            {product.stock > 0 && (
              <div className="quantity-container">
                <span className="quantity-label">Quantity:</span>
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className={`quantity-button ${quantity <= 1 ? 'quantity-button-disabled' : 'quantity-button-enabled'}`}
                >
                  -
                </button>
                <span className="quantity-display">
                  {quantity}
                </span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= product.stock}
                  className={`quantity-button ${quantity >= product.stock ? 'quantity-button-disabled' : 'quantity-button-enabled'}`}
                >
                  +
                </button>
              </div>
            )}
            
            <button 
              className={`add-to-cart-button ${product.stock < 0 ? 'add-to-cart-button-disabled' : ''}`}
              disabled={product.stock < 0}
              onClick={handleAddToCart}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          
          <div>
            <h3 className="product-details-description-title">Description</h3>
            <p className="product-details-description">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      
      {relatedProducts.length > 0 && (
        <div className="related-products-section">
          <h2 className="related-products-title">Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map(relatedProduct => (
              <div key={relatedProduct.id} className="related-product-item">
                <Link 
                  to={`/product/${relatedProduct.id}`}
                  className="product-card-link"
                >
                  <img 
                    src={relatedProduct.image} 
                    alt={relatedProduct.name} 
                    className="related-product-image" 
                  />
                  <div className="related-product-title">{relatedProduct.name}</div>
                  <div className="related-product-price">${relatedProduct.price.toFixed(2)}</div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails; 