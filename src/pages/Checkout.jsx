import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { CreditCard, Check, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import './Checkout.css';

export const Checkout = () => {
  const { 
    cart, 
    cartSubtotal, 
    completeOrder, 
    navigateTo 
  } = useContext(AppContext);

  // Current Checkout Step: 1 (Address) | 2 (Shipping) | 3 (Payment)
  const [step, setStep] = useState(1);

  // Address Forms state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    shippingMethod: 'standard',
    paymentMethod: 'cod',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Calculations
  const shippingCost = formData.shippingMethod === 'express' ? 150 : (cartSubtotal >= 999 ? 0 : 99);
  const checkoutTotal = cartSubtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateAddressForm = () => {
    const errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required.';
    if (!formData.phone.trim() || formData.phone.length < 10) errors.phone = 'Valid 10-digit Phone is required.';
    if (!formData.address.trim()) errors.address = 'Street Address is required.';
    if (!formData.city.trim()) errors.city = 'City is required.';
    if (!formData.state.trim()) errors.state = 'State is required.';
    if (!formData.pincode.trim() || formData.pincode.length !== 6) errors.pincode = 'Valid 6-digit Pincode is required.';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (validateAddressForm()) {
        setStep(2);
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'card') {
      const cardErrors = {};
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        cardErrors.cardNumber = 'Valid 16-digit card number required.';
      }
      if (!formData.cardExpiry || !formData.cardExpiry.includes('/')) {
        cardErrors.cardExpiry = 'MM/YY required.';
      }
      if (!formData.cardCvv || formData.cardCvv.length !== 3) {
        cardErrors.cardCvv = '3-digit CVV required.';
      }

      if (Object.keys(cardErrors).length > 0) {
        setFormErrors(prev => ({ ...prev, ...cardErrors }));
        return;
      }
    }

    // Submit order
    completeOrder(formData, formData.paymentMethod.toUpperCase());
  };

  return (
    <div className="checkout-page-container container">
      {/* 1. PROGRESS STEPS ROW */}
      <div className="checkout-progress-stepper">
        <div className={`step-item ${step >= 1 ? 'active' : ''} ${step > 1 ? 'completed' : ''}`}>
          <div className="step-badge">{step > 1 ? <Check size={14} /> : '1'}</div>
          <span>Address</span>
        </div>
        <div className="step-connector"></div>
        <div className={`step-item ${step >= 2 ? 'active' : ''} ${step > 2 ? 'completed' : ''}`}>
          <div className="step-badge">{step > 2 ? <Check size={14} /> : '2'}</div>
          <span>Shipping</span>
        </div>
        <div className="step-connector"></div>
        <div className={`step-item ${step >= 3 ? 'active' : ''}`}>
          <div className="step-badge">3</div>
          <span>Payment</span>
        </div>
      </div>

      <div className="checkout-content-grid">
        {/* Left column: Dynamic forms depending on step */}
        <div className="checkout-form-section">
          {step === 1 && (
            <div className="form-card fade-in">
              <h3>Shipping Address</h3>
              <div className="form-grid">
                <div className="form-field full-width">
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName"
                    name="fullName"
                    placeholder="e.g. Priyanshu Sharma"
                    value={formData.fullName}
                    onChange={handleInputChange}
                  />
                  {formErrors.fullName && <span className="field-error">{formErrors.fullName}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  {formErrors.phone && <span className="field-error">{formErrors.phone}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="pincode">Pincode</label>
                  <input 
                    type="text" 
                    id="pincode"
                    name="pincode"
                    placeholder="6-digit code"
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                  {formErrors.pincode && <span className="field-error">{formErrors.pincode}</span>}
                </div>

                <div className="form-field full-width">
                  <label htmlFor="address">Address (House No, Building, Street, Area)</label>
                  <input 
                    type="text" 
                    id="address"
                    name="address"
                    placeholder="Flat 302, Cuddly Heights, Sector 15"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  {formErrors.address && <span className="field-error">{formErrors.address}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="city">City</label>
                  <input 
                    type="text" 
                    id="city"
                    name="city"
                    placeholder="Mumbai"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                  {formErrors.city && <span className="field-error">{formErrors.city}</span>}
                </div>

                <div className="form-field">
                  <label htmlFor="state">State</label>
                  <input 
                    type="text" 
                    id="state"
                    name="state"
                    placeholder="Maharashtra"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                  {formErrors.state && <span className="field-error">{formErrors.state}</span>}
                </div>
              </div>

              <div className="form-actions-row">
                <button className="btn btn-outline" onClick={() => navigateTo('cart')}>
                  <ArrowLeft size={16} /> Back to Cart
                </button>
                <button className="btn btn-primary" onClick={handleNextStep}>
                  Next: Shipping Method <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="form-card fade-in">
              <h3>Shipping Method</h3>
              <div className="shipping-methods-list">
                <label className={`shipping-method-item ${formData.shippingMethod === 'standard' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="shippingMethod" 
                    value="standard" 
                    checked={formData.shippingMethod === 'standard'}
                    onChange={handleInputChange}
                  />
                  <div className="method-details">
                    <span className="method-title">Standard Delivery (3-5 Business Days)</span>
                    <span className="method-desc">Safe delivery with sanitized eco-packaging.</span>
                  </div>
                  <span className="method-cost">{cartSubtotal >= 999 ? 'FREE' : '₹99'}</span>
                </label>

                <label className={`shipping-method-item ${formData.shippingMethod === 'express' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="shippingMethod" 
                    value="express" 
                    checked={formData.shippingMethod === 'express'}
                    onChange={handleInputChange}
                  />
                  <div className="method-details">
                    <span className="method-title">Express Next-Day Delivery</span>
                    <span className="method-desc">Guaranteed next-day dispatch. Perfect for urgent baby showers.</span>
                  </div>
                  <span className="method-cost">₹150</span>
                </label>
              </div>

              <div className="form-actions-row">
                <button className="btn btn-outline" onClick={handlePrevStep}>
                  <ArrowLeft size={16} /> Back to Address
                </button>
                <button className="btn btn-primary" onClick={handleNextStep}>
                  Next: Payment <ArrowRight size={16} />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-card fade-in">
              <h3>Payment Options</h3>
              <form onSubmit={handleSubmitOrder}>
                <div className="payment-methods-list">
                  <label className={`payment-method-item ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="cod" 
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                    />
                    <div className="method-details">
                      <span className="method-title">Cash on Delivery (COD)</span>
                      <span className="method-desc">Pay in cash or UPI scan on package delivery.</span>
                    </div>
                  </label>

                  <label className={`payment-method-item ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="card" 
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <div className="method-details">
                      <span className="method-title">Credit / Debit Card (Secure checkout)</span>
                      <span className="method-desc">We accept Visa, MasterCard, RuPay cards.</span>
                    </div>
                  </label>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="credit-card-details-fields fade-in">
                    <div className="form-field full-width">
                      <label htmlFor="cardNumber">Card Number</label>
                      <input 
                        type="text" 
                        id="cardNumber"
                        name="cardNumber"
                        placeholder="1234 5678 9876 5432"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                      />
                      {formErrors.cardNumber && <span className="field-error">{formErrors.cardNumber}</span>}
                    </div>
                    <div className="form-field">
                      <label htmlFor="cardExpiry">Expiry Date</label>
                      <input 
                        type="text" 
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        maxLength={5}
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                      />
                      {formErrors.cardExpiry && <span className="field-error">{formErrors.cardExpiry}</span>}
                    </div>
                    <div className="form-field">
                      <label htmlFor="cardCvv">CVV</label>
                      <input 
                        type="password" 
                        id="cardCvv"
                        name="cardCvv"
                        placeholder="123"
                        maxLength={3}
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                      />
                      {formErrors.cardCvv && <span className="field-error">{formErrors.cardCvv}</span>}
                    </div>
                  </div>
                )}

                <div className="secure-badge">
                  <ShieldCheck size={18} />
                  <span>Your transaction is encrypted. 256-bit Secure Sockets Layer protocol.</span>
                </div>

                <div className="form-actions-row">
                  <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
                    <ArrowLeft size={16} /> Back to Shipping
                  </button>
                  <button type="submit" className="btn btn-primary place-order-btn">
                    Place Order (₹{checkoutTotal})
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Right column: Items Summary Sidebar */}
        <div className="checkout-summary-section">
          <div className="summary-card">
            <h3>Cart Review</h3>
            <div className="summary-divider"></div>

            <div className="checkout-items-list-compact">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.color}-${item.size}`} className="checkout-compact-item">
                  <div className="compact-item-meta">
                    <span className="compact-qty">{item.quantity}x</span>
                    <span className="compact-name">{item.product.name}</span>
                    <span className="compact-specs">{item.color} / {item.size}</span>
                  </div>
                  <span className="compact-price">₹{item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-totals-box">
              <div className="total-row">
                <span>Items Subtotal</span>
                <span>₹{cartSubtotal}</span>
              </div>
              <div className="total-row">
                <span>Shipping Fees</span>
                <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="total-row final-payable">
                <span>Net Payable</span>
                <span>₹{checkoutTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
