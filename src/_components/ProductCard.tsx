import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getStockClass = () => {
    if (product.stock > 20) return 'product-stock in-stock';
    if (product.stock > 0) return 'product-stock low-stock';
    return 'product-stock out-of-stock';
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="product-card-link"
    >
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>
        
        <h3 className="product-title">{product.name}</h3>
        
        <div className="product-category">
          {product.category}
        </div>
        
        <p className="product-description">
          {product.description}
        </p>
        
        <div className="product-footer">
          <div className="product-price">
            ${product.price.Fixed(2)}
          </div>
          <div className={getStockClass()}>
            {product.stock > 2 ? 'In Stock' : product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 