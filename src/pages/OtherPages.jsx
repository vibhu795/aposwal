import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { MapPin, Phone, Mail, Clock, Heart, Search, HelpCircle, Send } from 'lucide-react';
import './OtherPages.css';

// ==========================================
// 1. WISHLIST PAGE component
// ==========================================
export const Wishlist = () => {
  const { wishlist, navigateTo } = useContext(AppContext);

  return (
    <div className="other-page-container container fade-in text-left">
      <h1 className="other-page-title"><Heart size={26} className="title-icon" /> My Wishlist ({wishlist.length})</h1>
      <p className="other-page-subtitle">Your saved items. Tap any item to inspect details or add to cart.</p>

      {wishlist.length === 0 ? (
        <div className="empty-state-card text-center">
          <div className="empty-state-emoji">💝</div>
          <h3>Your Wishlist is Empty</h3>
          <p>Tap the heart icon on any product to save it here for later.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('category', null, 'all')}>
            Browse Products
          </button>
        </div>
      ) : (
        <div className="wishlist-products-grid">
          {wishlist.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. STORE LOCATOR PAGE component
// ==========================================
export const StoreLocator = () => {
  const store = {
    city: 'Jaipur',
    name: 'AP Oswal - Raja Park Flagship',
    address: '6/321 Raja Park, Valmiki Marg, Jaipur, Rajasthan, 302004',
    phone: '+91 8000781759',
    hours: '10:00 AM - 8:30 PM',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=AP+Oswal+Raja+Park+Jaipur'
  };

  return (
    <div className="other-page-container container fade-in text-left">
      <h1 className="other-page-title justify-center"><MapPin size={26} className="title-icon" /> Store Locator</h1>
      <p className="other-page-subtitle text-center">Visit us in-store to inspect material fabrics and get pediatric sizing assistance.</p>

      <div className="store-locator-grid">
        {/* Left Column: Store Card */}
        <div className="store-card hover-lift">
          <span className="store-city-badge">{store.city}</span>
          <h3>{store.name}</h3>
          <p className="store-address"><MapPin size={16} /> {store.address}</p>
          <p className="store-phone"><Phone size={16} /> {store.phone}</p>
          <p className="store-hours"><Clock size={16} /> {store.hours}</p>
          
          <a 
            href={store.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary w-full text-center store-map-btn"
            style={{ marginTop: '20px', display: 'inline-block' }}
          >
            Get Directions
          </a>
        </div>

        {/* Right Column: Clickable Map Card */}
        <div className="mock-map-box">
          <a 
            href={store.mapUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="map-link-overlay-container"
            title="Click to view on Google Maps"
          >
            <iframe
              title="AP Oswal Raja Park Location Map"
              src="https://maps.google.com/maps?q=AP%20Oswal,%20Raja%20Park,%20Jaipur&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 'var(--radius-md)', pointerEvents: 'none' }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            <div className="map-hover-overlay">
              <div className="overlay-content">
                <span className="overlay-icon">📍</span>
                <h3>Open in Google Maps</h3>
                <p>Get live turn-by-turn navigation & directions</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 4. ABOUT PAGE component
// ==========================================
export const AboutUs = () => {
  return (
    <div className="other-page-container container fade-in text-left">
      <h1 className="other-page-title"><HelpCircle size={26} className="title-icon" /> About AP Oswal</h1>
      <p className="other-page-subtitle">Our mission: soft fabrics, hand-knitted warmth, and chemical-free wools.</p>

      <div className="about-content-block">
        <div className="about-hero-banner text-center">
          <h2>Softest Knitted Warmth for Newborns 🧶</h2>
          <p>Founded with a focus on newborn comfort, AP Oswal specializes in providing high-quality, soft, and breathable woollen clothes for babies. We source premium Vardhman BabySoft wool to create lightweight clothing designed to insulate without restricting mobility.</p>
        </div>

        <div className="about-values-grid">
          <div className="value-card">
            <span className="value-emoji">🐑</span>
            <h3>Vardhman BabySoft Wool</h3>
            <p>We source only high-grade baby woollen yarns, ensuring an ultra-fine, scratch-free texture that does not irritate newborn sensitive skin.</p>
          </div>
          <div className="value-card">
            <span className="value-emoji">🔒</span>
            <h3>Dye-Safe Certifications</h3>
            <p>Our knitting threads are processed with non-chemical, azo-free coloring agents to prevent skin allergies and rashes.</p>
          </div>
          <div className="value-card">
            <span className="value-emoji">🇮🇳</span>
            <h3>Hand-Knitted Heritage</h3>
            <p>AP Oswal combines classic traditional knitting structures (like Monkey Caps and check sweaters) with modern safe designs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 5. CONTACT PAGE component
// ==========================================
export const ContactUs = () => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactForm.name && contactForm.email && contactForm.message) {
      const text = `Hello!
*Name:* ${contactForm.name}
*Email:* ${contactForm.email}
*Message:* ${contactForm.message}`;
      
      const whatsappUrl = `https://wa.me/918000781759?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');

      setContactSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setContactSubmitted(false), 5000);
    }
  };

  return (
    <div className="other-page-container container fade-in text-left">
      <h1 className="other-page-title"><Mail size={26} className="title-icon" /> Contact Customer Care</h1>
      <p className="other-page-subtitle">We are here to help! Got size guide questions or order changes? Send us a message.</p>

      <div className="contact-layout-grid">
        {/* Left column: Contact details info */}
        <div className="contact-info-card">
          <h3>Get In Touch</h3>
          <p className="contact-lead-text">Our customer care representatives are available Mon-Sat, 9:00 AM to 6:00 PM IST.</p>
          
          <div className="contact-details-lines">
            <div className="contact-detail-line">
              <Phone size={18} />
              <div>
                <strong>Support Phone Line</strong>
                <span>+91 8000781759</span>
              </div>
            </div>
            <div className="contact-detail-line">
              <Mail size={18} />
              <div>
                <strong>Email Support Desk</strong>
                <span>aposwalindia@gmail.com</span>
              </div>
            </div>
            <div className="contact-detail-line">
              <MapPin size={18} />
              <div>
                <strong>HQ Mailing Office</strong>
                <span>6/321 Raja Park, Valmiki Marg, Jaipur, Rajasthan, 302004</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Message Form */}
        <div className="contact-form-card">
          <h3>Send Us a Message</h3>
          
          {contactSubmitted ? (
            <div className="contact-form-success text-center">
              <span className="success-check-emoji">💬</span>
              <h4>Opening WhatsApp...</h4>
              <p>We are opening WhatsApp to let you send your message directly to our support team.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit}>
              <div className="form-field-group">
                <label htmlFor="contactName">Your Name</label>
                <input 
                  type="text" 
                  id="contactName" 
                  placeholder="e.g. Priyanshu Sharma"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contactEmail">Email Address</label>
                <input 
                  type="email" 
                  id="contactEmail" 
                  placeholder="e.g. priyanshu@gmail.com"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  required
                />
              </div>

              <div className="form-field-group">
                <label htmlFor="contactMessage">Message / Questions</label>
                <textarea 
                  id="contactMessage" 
                  rows={4} 
                  placeholder="Write your message here..."
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-whatsapp contact-submit-btn w-full" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" style={{ width: '18px', height: '18px' }} fill="currentColor">
                  <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.982L2 22l5.233-1.371a9.994 9.994 0 004.773 1.21h.005c5.505 0 9.988-4.479 9.989-9.986 0-2.67-1.037-5.18-2.92-7.062A9.925 9.925 0 0012.012 2zM17.56 16.2c-.3-.15-1.774-.875-2.05-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075a9.426 9.426 0 01-2.414-1.49 10.428 10.428 0 01-1.67-2.08c-.175-.3-.02-.46.13-.61.137-.133.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.49-.508-.675-.518-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8 1.075-.275 1-.95 2.375-1.025 2.525-.075.15-.15.3-.025.525.42 1.3 1.34 2.38 2.59 2.9 1.25.52 2.35.42 3.225.29.3-.045.85-.35 1.025-.875.175-.525.175-.975.125-1.075-.05-.1-.2-.15-.5-.3z" />
                </svg>
                Send on WhatsApp
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
