import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductIcon } from './ProductIcons';
import { Heart, MessageCircle } from 'lucide-react';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { toggleWishlist, wishlist, navigateTo } = useContext(AppContext);

  const isSaved = wishlist.some((item) => item.id === product.id);

  return (
    <div className="product-card hover-lift">
      {/* Top badges & Wishlist icon */}
      <div className="product-card-header">
        {product.isNew && (
          <span className="badge badge-fresh">New</span>
        )}
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
            window.open(`https://wa.me/918000781759?text=Hello,%20I'm%20interested%20in%20buying%20"${encodeURIComponent(product.name)}".`, '_blank');
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

        {/* Stock Status Container */}
        <div className="product-stock-container">
          {!product.inStock && (
            <span className="stock-status-out">Sold Out</span>
          )}
        </div>
      </div>
    </div>
  );
};
