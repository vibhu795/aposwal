import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, Heart, ShoppingCart, User, Menu, X, Gift, PhoneCall, MapPin } from 'lucide-react';
import './Navbar.css';

export const Navbar = () => {
  const { 
    navigateTo, 
    cartItemCount, 
    wishlist, 
    searchQuery, 
    setSearchQuery 
  } = useContext(AppContext);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchInputActive, setSearchInputActive] = useState(false);

  const categories = [
    { name: 'All Products', id: 'all', categoryKey: 'all' },
    { name: 'Sweaters', id: 'sweaters', categoryKey: 'sweaters' },
    { name: 'Frocks', id: 'frocks', categoryKey: 'frocks' },
    { name: 'Baba Suits', id: 'suits', categoryKey: 'suits' },
    { name: 'Blankets', id: 'blankets', categoryKey: 'blankets' },
    { name: 'Accessories', id: 'accessories', categoryKey: 'accessories' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateTo('category', null, 'all');
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (categoryKey) => {
    if (categoryKey === 'sale') {
      navigateTo('category', null, 'all');
      // Set sorting to sale or active filter, but simple category is clean
    } else if (categoryKey === 'new') {
      navigateTo('category', null, 'all');
    } else {
      navigateTo('category', null, categoryKey);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <Gift size={14} />
          <span>Free delivery on orders above ₹999! | Use Code: <strong>BABYBLISS</strong></span>
        </div>
        <div className="announcement-links">
          <a href="#store-locator" onClick={(e) => { e.preventDefault(); navigateTo('locator'); }} className="top-bar-link"><MapPin size={12} /> Store Locator</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }} className="top-bar-link"><PhoneCall size={12} /> Contact Us</a>
        </div>
      </div>

      {/* 2. MAIN HEADER (Sticky) */}
      <header className="main-header">
        <div className="header-container container">
          {/* Mobile Hamburger */}
          <button 
            className="mobile-hamburger" 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="logo-section" onClick={() => navigateTo('home')}>
            <svg viewBox="0 0 100 100" className="logo-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="42" fill="var(--secondary)" opacity="0.15" />
              <circle cx="50" cy="50" r="28" fill="var(--primary)" stroke="var(--text-main)" strokeWidth="2.5" />
              <line x1="20" y1="20" x2="70" y2="70" stroke="var(--text-main)" strokeWidth="3" strokeLinecap="round" />
              <line x1="80" y1="20" x2="30" y2="70" stroke="var(--text-main)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="20" r="4" fill="var(--secondary)" stroke="var(--text-main)" strokeWidth="1.5" />
              <circle cx="80" cy="20" r="4" fill="var(--secondary)" stroke="var(--text-main)" strokeWidth="1.5" />
              <path d="M35 50 Q50 65 65 50" stroke="var(--surface)" strokeWidth="2" fill="none" strokeLinecap="round" />
              <path d="M40 40 Q50 25 60 40" stroke="var(--surface)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <span className="brand-name">AP <span>Oswal</span></span>
          </div>

          {/* Search bar */}
          <form className={`search-bar-form ${searchInputActive ? 'focused' : ''}`} onSubmit={handleSearchSubmit}>
            <input 
              type="text" 
              placeholder="Search woollen sweaters, baby soft suits, booties..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchInputActive(true)}
              onBlur={() => setSearchInputActive(false)}
            />
            <button type="submit" aria-label="Search">
              <Search size={20} />
            </button>
          </form>

          {/* Action Icons */}
          <div className="header-actions">
            <button 
              className="action-btn" 
              onClick={() => navigateTo('wishlist')} 
              title="Wishlist"
              aria-label={`Wishlist, ${wishlist.length} items`}
            >
              <Heart size={22} strokeWidth={2} />
              {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
            </button>

            <button 
              className="action-btn" 
              onClick={() => navigateTo('cart')} 
              title="Cart"
              aria-label={`Shopping Cart, ${cartItemCount} items`}
            >
              <ShoppingCart size={22} strokeWidth={2} />
              {cartItemCount > 0 && <span className="action-badge bg-primary">{cartItemCount}</span>}
            </button>

            <button 
              className="action-btn" 
              onClick={() => navigateTo('account')} 
              title="My Account"
              aria-label="My Account"
            >
              <User size={22} strokeWidth={2} />
            </button>
          </div>
        </div>
      </header>

      {/* 3. CATEGORIES NAVIGATION BAR (Desktop) */}
      <nav className="desktop-navigation">
        <div className="nav-container container">
          <ul className="nav-list">
            {categories.map((cat) => (
              <li key={cat.id} className="nav-item">
                <a 
                  href={`#${cat.id}`} 
                  onClick={(e) => {
                    e.preventDefault();
                    handleCategoryClick(cat.categoryKey);
                  }}
                  className={`nav-link ${cat.categoryKey === 'sale' ? 'nav-link-sale' : ''}`}
                >
                  {cat.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 4. MOBILE HAMBURGER MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="drawer-logo" onClick={() => { navigateTo('home'); setMobileMenuOpen(false); }}>
                <span className="brand-name">AP <span>Oswal</span></span>
              </div>
              <button className="close-drawer-btn" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">
                <X size={24} />
              </button>
            </div>

            <div className="drawer-search">
              <form onSubmit={handleSearchSubmit}>
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                  <Search size={18} />
                </button>
              </form>
            </div>

            <div className="drawer-content">
              <h3>Shop Categories</h3>
              <ul className="drawer-menu-list">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <a 
                      href={`#${cat.id}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(cat.categoryKey);
                      }}
                      className={cat.categoryKey === 'sale' ? 'drawer-sale-link' : ''}
                    >
                      {cat.name}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="drawer-divider"></div>

              <h3>My AP Oswal</h3>
              <ul className="drawer-menu-list secondary-list">
                <li><a href="#wishlist" onClick={(e) => { e.preventDefault(); navigateTo('wishlist'); setMobileMenuOpen(false); }}>Wishlist ({wishlist.length})</a></li>
                <li><a href="#orders" onClick={(e) => { e.preventDefault(); navigateTo('orders'); setMobileMenuOpen(false); }}>Track Order / Account</a></li>
                <li><a href="#locator" onClick={(e) => { e.preventDefault(); navigateTo('locator'); setMobileMenuOpen(false); }}>Store Locator</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); setMobileMenuOpen(false); }}>About Us</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); setMobileMenuOpen(false); }}>Contact Customer Care</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
