import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Star, Heart, ShoppingCart, CreditCard, ChevronRight, Check } from 'lucide-react';
import './ProductDetail.css';

// Wait, the file with ProductIcon is ProductIcons.jsx. We must make sure the import matches exactly.
// Let's import { ProductIcon } from '../components/ProductIcons';
import { ProductIcon as SelectedProductIcon } from '../components/ProductIcons';

export const ProductDetail = () => {
  const { 
    selectedProductId, 
    products, 
    addToCart, 
    toggleWishlist, 
    wishlist, 
    navigateTo 
  } = useContext(AppContext);

  // Retrieve the selected product object
  const product = useMemo(() => {
    return products.find(p => p.id === selectedProductId) || products[0];
  }, [selectedProductId, products]);

  // Interactive swatch choices
  const [activeColor, setActiveColor] = useState(product.colors[0]?.name || 'Default');
  const [activeSize, setActiveSize] = useState(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  // Verify wishlist saved state
  const isSaved = wishlist.some(item => item.id === product.id);

  // Tab definitions
  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'sizeguide', label: 'Size Guide' },
    { id: 'safety', label: 'Safety Info' },
    { id: 'reviews', label: 'Reviews' }
  ];

  // Custom reviews list for demo
  const mockReviews = [
    { id: 1, author: 'Priya S.', rating: 5, date: '12 July 2026', comment: 'Extremely soft material! The double zipper is an absolute lifesaver for night diaper changes. My baby sleeps like a charm.' },
    { id: 2, author: 'Vaibhav J.', rating: 4, date: '28 June 2026', comment: 'Very high quality organic fabric. Deducted one star just because shipping took 4 days, but the product itself is flawless.' },
    { id: 3, author: 'Meera K.', rating: 5, date: '05 June 2026', comment: 'Super cute design. The GOTS organic certification gave me complete peace of mind. Will buy again in other colors!' }
  ];

  const handleQuantityIncrement = () => setQuantity(prev => prev + 1);
  const handleQuantityDecrement = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addToCart(product, quantity, activeColor, activeSize);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, activeColor, activeSize);
    navigateTo('cart'); // Or navigate straight to checkout
  };

  // Find related products from the same category (excluding current product)
  const relatedProducts = useMemo(() => {
    return products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  }, [products, product]);

  // Find active color hex code to color the background of the image container dynamically
  const activeColorHex = useMemo(() => {
    const found = product.colors.find(c => c.name === activeColor);
    return found ? found.value : product.imageBg;
  }, [activeColor, product]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={i <= Math.floor(rating) ? 'star-icon filled' : 'star-icon empty'}
          fill={i <= Math.floor(rating) ? 'var(--secondary)' : 'transparent'} 
          stroke={i <= Math.floor(rating) ? 'var(--secondary)' : 'var(--text-muted)'} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="product-detail-page container">
      {/* 1. Breadcrumb bar */}
      <div className="breadcrumb-nav">
        <a href="#home" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
        <ChevronRight size={14} />
        <a href="#category" onClick={(e) => { e.preventDefault(); navigateTo('category', null, product.category); }}>{product.categoryDisplay}</a>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>

      {/* 2. Main Details Block */}
      <div className="product-detail-grid">
        {/* Left Column: Image Gallery */}
        <div className="detail-gallery-container">
          <div className="main-image-display" style={{ backgroundColor: activeColorHex + '15', border: `2px dashed ${activeColorHex}` }}>
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="gallery-main-image" />
            ) : (
              <SelectedProductIcon type={product.iconType} className="gallery-main-svg" color={activeColorHex} />
            )}
          </div>

          <div className="gallery-thumbnails">
            {product.colors.map((colorItem) => (
              <button 
                key={colorItem.name} 
                className={`thumbnail-btn ${activeColor === colorItem.name ? 'active' : ''}`}
                style={{ backgroundColor: colorItem.value + '22', borderColor: colorItem.value }}
                onClick={() => setActiveColor(colorItem.name)}
                title={colorItem.name}
              >
                {product.imageUrl ? (
                  <img src={product.imageUrl} alt={colorItem.name} className="gallery-thumb-image" style={{ borderBottom: `4px solid ${colorItem.value}` }} />
                ) : (
                  <SelectedProductIcon type={product.iconType} className="gallery-thumb-svg" color={colorItem.value} />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Spec and Selection */}
        <div className="detail-specs-container">
          <div className="detail-header">
            <span className="detail-category-badge">{product.categoryDisplay}</span>
            <h1 className="detail-title">{product.name}</h1>

            <div className="detail-ratings-row">
              <div className="stars-row">{renderStars(product.rating)}</div>
              <span className="rating-score"><strong>{product.rating}</strong> / 5</span>
              <span className="reviews-count">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="detail-price-box">
            <span className="current-price">₹{product.price}</span>
            <span className="original-price">₹{product.originalPrice}</span>
            <span className="discount-badge">{product.discount}</span>
          </div>

          <p className="detail-short-desc">{product.description}</p>

          <div className="detail-divider"></div>

          {/* Color swatch selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="selection-group">
              <div className="group-label-row">
                <span>Color: <strong>{activeColor}</strong></span>
              </div>
              <div className="color-swatches-list">
                {product.colors.map((col) => (
                  <button 
                    key={col.name}
                    className={`color-swatch-btn ${activeColor === col.name ? 'active' : ''}`}
                    style={{ backgroundColor: col.value }}
                    onClick={() => setActiveColor(col.name)}
                    title={col.name}
                  >
                    {activeColor === col.name && <Check size={14} className="checkmark" style={{ color: col.value === '#FFFFFF' ? '#000000' : '#FFFFFF' }} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size/Age selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="selection-group">
              <div className="group-label-row">
                <span>Select Size / Age: <strong>{activeSize}</strong></span>
              </div>
              <div className="size-swatches-list">
                {product.sizes.map((sz) => (
                  <button 
                    key={sz}
                    className={`size-swatch-btn ${activeSize === sz ? 'active' : ''}`}
                    onClick={() => setActiveSize(sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector and Cart buttons */}
          <div className="action-selection-row">
            <div className="quantity-stepper">
              <button onClick={handleQuantityDecrement}>-</button>
              <input type="number" value={quantity} readOnly aria-label="Quantity" />
              <button onClick={handleQuantityIncrement}>+</button>
            </div>

            <button 
              className={`wishlist-icon-btn ${isSaved ? 'saved' : ''}`}
              onClick={() => toggleWishlist(product)}
              aria-label="Toggle Wishlist"
            >
              <Heart size={20} fill={isSaved ? "var(--error-sale)" : "transparent"} stroke={isSaved ? "var(--error-sale)" : "var(--text-muted)"} />
            </button>
          </div>

          <div className="purchase-buttons-row">
            <button 
              className="btn btn-primary add-to-cart-cta" 
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart size={20} />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button 
              className="btn btn-secondary buy-now-cta"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              <CreditCard size={20} />
              Buy It Now
            </button>
          </div>

          <div className="detail-divider"></div>

          {/* Trust note */}
          <div className="shipping-trust-note">
            <span>🚀 Dispatch within 24 hours. Free Shipping on orders over ₹999.</span>
          </div>
        </div>
      </div>

      {/* 3. TABS INFORMATION ACCORDION */}
      <section className="product-tabs-section">
        <div className="tabs-header-bar">
          {tabs.map((tab) => (
            <button 
              key={tab.id}
              className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-body-content">
          {activeTab === 'description' && (
            <div className="tab-pane fade-in">
              <h3>Product Overview</h3>
              <p>{product.description}</p>
              <h4 style={{ marginTop: '16px', marginBottom: '8px' }}>Key Highlights</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>Hand-finished double-seam sewing to prevent threads from scratching baby's skin.</li>
                <li>Premium organic fibers offer natural heat regulation and superior softness.</li>
                <li>Made with environment-friendly water-soluble dyes.</li>
              </ul>
            </div>
          )}

          {activeTab === 'sizeguide' && (
            <div className="tab-pane fade-in">
              <h3>Size & Fit Guide</h3>
              <p>Please refer to standard recommendations based on child height/weight dimensions below:</p>
              <div className="size-guide-table-wrapper" style={{ marginTop: '16px' }}>
                <table className="size-guide-table">
                  <thead>
                    <tr>
                      <th>Size Label</th>
                      <th>Height Recommended</th>
                      <th>Weight Recommended</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0-3 Months</td>
                      <td>50 - 62 cm</td>
                      <td>3.0 - 5.5 kg</td>
                    </tr>
                    <tr>
                      <td>3-6 Months</td>
                      <td>62 - 68 cm</td>
                      <td>5.5 - 7.5 kg</td>
                    </tr>
                    <tr>
                      <td>6-12 Months</td>
                      <td>68 - 80 cm</td>
                      <td>7.5 - 10.0 kg</td>
                    </tr>
                    <tr>
                      <td>1-2 Years</td>
                      <td>80 - 92 cm</td>
                      <td>10.0 - 13.0 kg</td>
                    </tr>
                    <tr>
                      <td>One Size / Free Size</td>
                      <td>Standard Adjustable</td>
                      <td>Up to 20 kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p style={{ marginTop: '12px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                *Note: If your baby is in-between weights, we always recommend ordering one size up.
              </p>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="tab-pane fade-in">
              <h3>Material Certifications & Safety</h3>
              <p>{product.safetyInfo}</p>
              <div className="safety-grid-badges" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
                <div className="safety-badge-card" style={{ padding: '12px', backgroundColor: 'var(--bg-warm)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>🌱</span>
                  <strong>100% Organic</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>GOTS Certified fibers</p>
                </div>
                <div className="safety-badge-card" style={{ padding: '12px', backgroundColor: 'var(--bg-warm)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>🛡️</span>
                  <strong>Non-Toxic</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>BPA & Lead Free paints</p>
                </div>
                <div className="safety-badge-card" style={{ padding: '12px', backgroundColor: 'var(--bg-warm)', borderRadius: 'var(--radius-sm)', textAlign: 'center' }}>
                  <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '4px' }}>🧴</span>
                  <strong>Hypoallergenic</strong>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Tested on sensitive skin</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-pane fade-in">
              <h3>Customer Reviews ({mockReviews.length})</h3>
              <div className="reviews-list-container">
                {mockReviews.map((rev) => (
                  <div key={rev.id} className="review-card">
                    <div className="review-card-header">
                      <strong>{rev.author}</strong>
                      <span className="review-date">{rev.date}</span>
                    </div>
                    <div className="review-rating-stars" style={{ margin: '4px 0' }}>
                      {renderStars(rev.rating)}
                    </div>
                    <p className="review-comment-text">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. RELATED PRODUCTS PANEL */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <h2 className="section-title">You May Also Like</h2>
          <p className="section-subtitle" style={{ marginBottom: '24px' }}>Curated additions that pair perfectly with this selection</p>
          
          <div className="related-products-grid">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
