import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { MapPin, Phone, Mail, Clock, Heart, Search, HelpCircle, Package, Send } from 'lucide-react';
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
// 2. ACCOUNT & ORDERS PAGE component
// ==========================================
export const AccountOrders = () => {
  const { orders, navigateTo } = useContext(AppContext);
  const [activeTrackingId, setActiveTrackingId] = useState(null);

  const toggleTrack = (orderId) => {
    setActiveTrackingId(activeTrackingId === orderId ? null : orderId);
  };

  return (
    <div className="other-page-container container fade-in text-left">
      <h1 className="other-page-title"><Package size={26} className="title-icon" /> My Account & Orders</h1>
      <p className="other-page-subtitle">Manage billing settings, view transaction receipts and track shipping status.</p>

      <div className="account-layout-grid">
        {/* Left Card: Profile Meta */}
        <div className="account-profile-card">
          <div className="profile-avatar">👶</div>
          <h3>Priyanshu Sharma</h3>
          <span className="profile-email">priyanshu@gmail.com</span>
          <span className="profile-phone">+91 98765 43210</span>
          
          <div className="profile-divider"></div>
          
          <div className="profile-stat-row">
            <span>Orders Placed</span>
            <strong>{orders.length}</strong>
          </div>
          <div className="profile-stat-row">
            <span>Primary Wallet Balance</span>
            <strong>₹0.00</strong>
          </div>
        </div>

        {/* Right Card: Order History */}
        <div className="account-orders-section">
          <h3>Order History ({orders.length})</h3>
          
          {orders.length === 0 ? (
            <div className="empty-state-card text-center">
              <div className="empty-state-emoji">📦</div>
              <h3>No Orders Placed Yet</h3>
              <p>When you purchase products, your order status and details will be tracked here.</p>
              <button className="btn btn-primary" onClick={() => navigateTo('category', null, 'all')}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((ord) => (
                <div key={ord.orderId} className="order-history-card">
                  <div className="order-card-header">
                    <div>
                      <span className="order-id">Order ID: <strong>{ord.orderId}</strong></span>
                      <span className="order-date">Placed: {ord.date}</span>
                    </div>
                    <span className="order-status-badge status-processing">{ord.status}</span>
                  </div>

                  <div className="order-card-items">
                    {ord.items.map((item, index) => (
                      <div key={index} className="order-card-item-row">
                        <span>{item.quantity}x {item.product.name} ({item.color} / {item.size})</span>
                        <span>₹{item.product.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-card-footer">
                    <span>Paid via: <strong>{ord.paymentMethod}</strong></span>
                    <span>Total Amount: <strong>₹{ord.total}</strong></span>
                  </div>

                  <button className="btn btn-secondary track-toggle-btn" onClick={() => toggleTrack(ord.orderId)}>
                    {activeTrackingId === ord.orderId ? 'Hide Tracking Details' : 'Track Package'}
                  </button>

                  {/* Simulated Tracking Timeline */}
                  {activeTrackingId === ord.orderId && (
                    <div className="simulated-tracking-timeline fade-in">
                      <div className="timeline-step done">
                        <div className="timeline-node">✓</div>
                        <div className="timeline-meta">
                          <strong>Order Placed & Confirmed</strong>
                          <span>We have received your payment.</span>
                        </div>
                      </div>
                      <div className="timeline-step active">
                        <div className="timeline-node">●</div>
                        <div className="timeline-meta">
                          <strong>Sanitized Packaging & Processing</strong>
                          <span>Your items are being packed in eco-friendly protective wrappers.</span>
                        </div>
                      </div>
                      <div className="timeline-step pending">
                        <div className="timeline-node">○</div>
                        <div className="timeline-meta">
                          <strong>Courier Dispatch</strong>
                          <span>Pending handover to DTDC Shipping Hub.</span>
                        </div>
                      </div>
                      <div className="timeline-step pending">
                        <div className="timeline-node">○</div>
                        <div className="timeline-meta">
                          <strong>Out for Delivery</strong>
                          <span>Simulated notification will flash on your screen.</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


// ==========================================
// 3. STORE LOCATOR PAGE component
// ==========================================
export const StoreLocator = () => {
  const storeList = [
    { id: 1, city: 'Jaipur', name: 'AP Oswal - Raja Park Flagship', address: '6/321 Raja Park, Valmiki Marg, Jaipur, Rajasthan, 302004', phone: '+91 8000781759', hours: '10:00 AM - 8:30 PM' },
    { id: 2, city: 'New Delhi', name: 'AP Oswal - Delhi Distribution Hub', address: 'Shop 4B, Chandni Chowk Wholesale Market, New Delhi, 110006', phone: '+91 11 4350 5678', hours: '10:30 AM - 8:30 PM' },
    { id: 3, city: 'Ludhiana', name: 'AP Oswal - Ludhiana Factory Outlet', address: 'Oswal Complex, Industrial Area A, Ludhiana, Punjab, 141003', phone: '+91 161 502 9876', hours: '10:00 AM - 8:00 PM' }
  ];

  return (
    <div className="other-page-container container fade-in text-left">
      <h1 className="other-page-title"><MapPin size={26} className="title-icon" /> Store Locator</h1>
      <p className="other-page-subtitle">Visit us in-store to inspect material fabrics and get pediatric sizing assistance.</p>

      <div className="store-locator-grid">
        {/* Left Side: Stores list */}
        <div className="stores-list-cards">
          {storeList.map((store) => (
            <div key={store.id} className="store-card hover-lift">
              <span className="store-city-badge">{store.city}</span>
              <h3>{store.name}</h3>
              <p className="store-address"><MapPin size={14} /> {store.address}</p>
              <p className="store-phone"><Phone size={14} /> {store.phone}</p>
              <p className="store-hours"><Clock size={14} /> {store.hours}</p>
            </div>
          ))}
        </div>

        {/* Right Side: Mock Map view */}
        <div className="mock-map-box">
          <div className="map-placeholder">
            <span className="map-placeholder-emoji">🗺️</span>
            <h3>Interactive Map Placeholder</h3>
            <p>Select a store location card on the left to pin-point direct driving coordinates.</p>
            <div className="map-gps-compass">GPS Connection Active</div>
          </div>
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
              <span className="success-check-emoji">✉️</span>
              <h4>Thank you for writing to us!</h4>
              <p>We have logged your ticket. A support agent will respond to your email address within 12-24 business hours.</p>
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

              <button type="submit" className="btn btn-primary contact-submit-btn w-full">
                Send Message <Send size={16} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
