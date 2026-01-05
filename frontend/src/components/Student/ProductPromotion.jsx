import { useState, useEffect } from 'react';
import './ProductPromotion.css';

const ProductPromotion = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.example.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setProducts([
          {
            id: 1,
            name: "Jaadui Pitara – Class 2 educational Learning Kit for Kids",
            image: 'https://mittstore.com/assets/images/webp_images/product_1758792190_6083.webp',
            storeUrl: 'https://mittstore.com/collections/jaadui-pitara/jaadui-pitara-class-2-educational-learning-kit-for-kids'
          },
          {
            id: 2,
            name: "Guitar Essentials - A Beginner's Course",
            image: 'https://mittstore.com/assets/images/webp_images/product_1757679134_5404.webp',
            storeUrl: 'https://mittstore.com/collections/digital-learning/guitar-essentials-a-beginners-course'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <div className="promotion-list">
        <div className="promotion-loading">
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
          <span className="loading-dot"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="promotion-list">
      <div className="promotion-header">Featured Products</div>
      {products.map((product) => (
        <div
          key={product.id}
          className="promotion-card"
          onClick={() => handleProductClick(product.storeUrl)}
          tabIndex={0}
          role="button"
          aria-label={product.name}
        >
          <img src={product.image} alt={product.name} className="promotion-image" />
          <div className="promotion-info">
            <div className="promotion-title">{product.name}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPromotion;
