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

  // Reset selected swatches when the active product changes
  React.useEffect(() => {
    setActiveColor(product.colors[0]?.name || 'Default');
    setActiveSize(product.sizes[0] || 'Standard');
  }, [product]);

  // Verify wishlist saved state
  const isSaved = wishlist.some(item => item.id === product.id);



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

        </div>
      </div>

      {/* 3. PRODUCT DESCRIPTION SECTION */}
      <section className="product-tabs-section">
        <div className="tab-body-content">
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
