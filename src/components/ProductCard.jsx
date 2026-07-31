import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductIcon } from './ProductIcons';
import { Heart, Star, MessageCircle } from 'lucide-react';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlist, addToCart, navigateTo } = useContext(AppContext);

  const isSaved = wishlist.some((item) => item.id === product.id);

  // Render Star Ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Star key={i} size={14} className="star-icon filled" fill="var(--secondary)" stroke="var(--secondary)" />);
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(<Star key={i} size={14} className="star-icon half" fill="var(--secondary)" stroke="var(--secondary)" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />);
      } else {
        stars.push(<Star key={i} size={14} className="star-icon empty" stroke="var(--text-muted)" fill="transparent" />);
      }
    }
    return stars;
  };

  return (
    <div className="product-card hover-lift">
      {/* Top badges & Wishlist icon */}
      <div className="product-card-header">
        <span className={`badge ${product.isNew ? 'badge-fresh' : 'badge-sale'}`}>
          {product.isNew ? 'New' : product.discount}
        </span>
        <button 
          className={`wishlist-toggle ${isSaved ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label="Toggle Wishlist"
        >
          <Heart size={18} fill={isSaved ? "var(--error-sale)" : "transparent"} stroke={isSaved ? "var(--error-sale)" : "var(--text-muted)"} />
        </button>
      </div>

      {/* Product Image Area */}
      <div 
        className="product-card-image-wrapper" 
        style={{ backgroundColor: product.imageBg }}
        onClick={() => navigateTo('product-detail', product.id)}
      >
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="product-card-image" loading="lazy" />
        ) : (
          <ProductIcon type={product.iconType} className="product-card-image" />
        )}
        
        {/* Contact Now Button Panel */}
        <button 
          className="quick-add-btn btn btn-whatsapp"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`https://wa.me/918000781759?text=Hello,%20I'm%20interested%20in%20buying%20"${encodeURIComponent(product.name)}"%20(Price:%20₹${product.price}).`, '_blank');
          }}
        >
          <MessageCircle size={16} />
          Contact Now
        </button>
      </div>

      {/* Product Info details */}
      <div className="product-card-details" onClick={() => navigateTo('product-detail', product.id)}>
        <span className="product-category">{product.categoryDisplay}</span>
        <h3 className="product-name">{product.name}</h3>

        {/* Rating stars & Reviews count */}
        <div className="product-rating">
          <div className="stars-row">{renderStars(product.rating)}</div>
          <span className="reviews-count">({product.reviewsCount})</span>
        </div>

        {/* Price Tag container */}
        <div className="product-price-container">
          <span className="current-price">₹{product.price}</span>
          <span className="original-price">₹{product.originalPrice}</span>
          {product.inStock ? (
            <span className="stock-status-in-stock">In Stock</span>
          ) : (
            <span className="stock-status-out">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
};
