import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import '../assets/styles/_components/ProductGrid.css';

// Tu interface de cómo quieres trabajar internamente
interface ProductItem {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  image: string;
}

// Interface auxiliar para los datos crudos de la API
interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  thumbnail: string;
}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        
        const adaptedProducts: ProductItem[] = (data.products as ApiProduct[]).map((p) => ({
          id: (p.id),
          name: p.title,
          description: p.description,
          category: p.category,
          price: p.price,
          stock: p.stock,
          image: p.thumbnail,
        }));

        setProducts(adaptedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error loading products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-text">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id} className="product-card-container">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
