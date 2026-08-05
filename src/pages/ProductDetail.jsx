import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Star, Heart, ChevronRight, Check, MessageCircle } from 'lucide-react';
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
    { id: 'safety', label: 'Safety Info' }
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
          </div>

          <p className="detail-short-desc">{product.description}</p>

          <div className="detail-divider"></div>

          {/* WhatsApp Contact Section */}
          <div className="whatsapp-contact-box">
            <a 
              href={`https://wa.me/918000781759?text=Hello,%20I'm%20interested%20in%20buying%20"${encodeURIComponent(product.name)}".`}
              target="_blank" 
              rel="noopener noreferrer"
              className="whatsapp-contact-btn"
            >
              <svg viewBox="0 0 24 24" className="whatsapp-icon" fill="currentColor">
                <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.21h.005c5.505 0 9.988-4.479 9.989-9.986 0-2.67-1.037-5.18-2.92-7.062A9.925 9.925 0 0012.012 2zM17.56 16.2c-.3-.15-1.774-.875-2.05-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075a9.426 9.426 0 01-2.414-1.49 10.428 10.428 0 01-1.67-2.08c-.175-.3-.02-.46.13-.61.137-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.49-.508-.675-.518-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.075-.275 1-.95 2.375-1.025 2.525-.075.15-.15.3-.025.525.42 1.3 1.34 2.38 2.59 2.9 1.25.52 2.35.42 3.225.29.3-.045.85-.35 1.025-.875.175-.525.175-.975.125-1.075-.05-.1-.2-.15-.5-.3z" />
              </svg>
              Contact Now
            </a>
            <p className="whatsapp-help-text">
              Have questions or want to purchase this item? Click the button above to chat directly with us on WhatsApp.
            </p>
          </div>

          <div className="detail-divider"></div>

          {/* Trust note */}
          <div className="shipping-trust-note">
            <span>🚀 Dispatch within 24 hours. Free Shipping.</span>
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
