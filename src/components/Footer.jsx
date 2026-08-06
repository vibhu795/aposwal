import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Facebook, Instagram, Youtube, Twitter, Send, CheckCircle } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Footer.css';

export const Footer = () => {
  const { navigateTo } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    const scriptUrl = import.meta.env.VITE_GOOGLE_SHEET_SCRIPT_URL;

    if (scriptUrl) {
      try {
        const formData = new URLSearchParams();
        formData.append('email', email);

        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: formData.toString()
        });
      } catch (error) {
        console.error('Error submitting to Google Sheet:', error);
      }
    } else {
      console.warn('VITE_GOOGLE_SHEET_SCRIPT_URL is not defined in the .env file.');
    }

    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="main-footer">
      <div className="footer-top container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src={logoImg} alt="AP Oswal Logo" className="footer-logo-img" />
          </div>
          <p className="brand-pitch">
            Soft, breathable, and premium woollen wear for newborns and toddlers. Hand-knitted comfort crafted with care, tradition, and certified skin-friendly fibers.
          </p>
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
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact Support</a></li>
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
          The content of this site is copyright-protected and is the property of Ap Oswal.
        </p>
      </div>
    </footer>
  );
};
