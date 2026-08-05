import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Search, Heart, ShoppingCart, Menu, X } from 'lucide-react';
import logoImg from '../assets/logo.png';
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

          <div className="logo-section" onClick={() => navigateTo('home')}>
            <img src={logoImg} alt="AP Oswal Logo" className="brand-logo-img" />
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
