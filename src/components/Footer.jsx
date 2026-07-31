import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Facebook, Instagram, Youtube, Twitter, Send, CheckCircle } from 'lucide-react';
import './Footer.css';

export const Footer = () => {
  const { navigateTo } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-top container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="brand-name">AP <span>Oswal</span></span>
          </div>
          <p className="brand-pitch">
            Soft, breathable, and premium woollen wear for newborns and toddlers. Hand-knitted comfort crafted with care, tradition, and certified skin-friendly fibers.
          </p>
          <div className="social-links">
            <a href="#facebook" aria-label="Facebook"><Facebook size={18} /></a>
            <a href="#instagram" aria-label="Instagram"><Instagram size={18} /></a>
            <a href="#youtube" aria-label="Youtube"><Youtube size={18} /></a>
            <a href="#twitter" aria-label="Twitter"><Twitter size={18} /></a>
          </div>
        </div>

        {/* Shop Categories */}
        <div className="footer-col">
          <h3>Shop</h3>
          <ul>
            <li><a href="#sweaters" onClick={(e) => { e.preventDefault(); navigateTo('category', null, 'sweaters'); }}>Sweaters</a></li>
            <li><a href="#frocks" onClick={(e) => { e.preventDefault(); navigateTo('category', null, 'frocks'); }}>Baby Frocks</a></li>
            <li><a href="#suits" onClick={(e) => { e.preventDefault(); navigateTo('category', null, 'suits'); }}>Baba Suits</a></li>
            <li><a href="#blankets" onClick={(e) => { e.preventDefault(); navigateTo('category', null, 'blankets'); }}>Blankets</a></li>
            <li><a href="#accessories" onClick={(e) => { e.preventDefault(); navigateTo('category', null, 'accessories'); }}>Accessories</a></li>
          </ul>
        </div>

        {/* Help/Services Column */}
        <div className="footer-col">
          <h3>Customer Service</h3>
          <ul>
            <li><a href="#orders" onClick={(e) => { e.preventDefault(); navigateTo('orders'); }}>Track Your Order</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact Support</a></li>
            <li><a href="#shipping" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>Shipping & Delivery</a></li>
            <li><a href="#returns" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>Easy Returns Policy</a></li>
            <li><a href="#locator" onClick={(e) => { e.preventDefault(); navigateTo('locator'); }}>Find a Store</a></li>
          </ul>
        </div>

        {/* Newsletter Signup Column */}
        <div className="footer-col newsletter-col">
          <h3>Join the AP Oswal Family</h3>
          <p>Subscribe for catalog launches, discount sales, and newborn woollen care tips.</p>
          
          {subscribed ? (
            <div className="newsletter-success">
              <CheckCircle size={18} />
              <span>Woohoo! Welcome to the family! 🎉</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="footer-divider container"></div>

      {/* Footer Bottom info and payments */}
      <div className="footer-bottom container">
        <p className="copyright-text">
          &copy; {new Date().getFullYear()} AP Oswal Newborn Woollens. All rights reserved. Crafted with care in Jaipur.
        </p>
        <div className="payment-badges">
          <span className="payment-badge">UPI</span>
          <span className="payment-badge">RuPay</span>
          <span className="payment-badge">Visa</span>
          <span className="payment-badge">MasterCard</span>
          <span className="payment-badge">COD</span>
        </div>
      </div>
    </footer>
  );
};
