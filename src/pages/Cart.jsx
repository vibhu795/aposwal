import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductIcon } from '../components/ProductIcons';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Gift } from 'lucide-react';
import './Cart.css';

export const Cart = () => {
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    cartSubtotal, 
    cartDiscount, 
    navigateTo 
  } = useContext(AppContext);

  // Promo code handling
  const [promoInput, setPromoInput] = useState('');
  const [activeCoupon, setActiveCoupon] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');

  const shippingThreshold = 999;
  const shippingCost = cartSubtotal >= shippingThreshold ? 0 : 99;

  const promoDiscount = useMemo(() => {
    if (activeCoupon === 'BABYBLISS') {
      return Math.round(cartSubtotal * 0.1); // 10% off
    }
    return 0;
  }, [activeCoupon, cartSubtotal]);

  const cartTotal = useMemo(() => {
    return cartSubtotal + shippingCost - promoDiscount;
  }, [cartSubtotal, shippingCost, promoDiscount]);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    
    if (promoInput.trim().toUpperCase() === 'BABYBLISS') {
      setActiveCoupon('BABYBLISS');
      setCouponSuccess('Promo code applied successfully! 10% discount has been deducted.');
      setPromoInput('');
    } else if (promoInput.trim() === '') {
      setCouponError('Please enter a coupon code.');
    } else {
      setCouponError('Invalid coupon code. Try entering "BABYBLISS".');
    }
  };

  const handleRemovePromo = () => {
    setActiveCoupon('');
    setCouponSuccess('');
    setPromoInput('');
  };

  return (
    <div className="cart-page-container container">
      <h1 className="page-main-title">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-view">
          <div className="empty-cart-emoji">🛒</div>
          <h2>Your Cart is Empty!</h2>
          <p>Add some cute outfits, sensory toys, or babycare essentials to start shopping.</p>
          <button className="btn btn-primary" onClick={() => navigateTo('category', null, 'all')}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-content-grid">
          {/* Left Panel: Items list */}
          <div className="cart-items-section">
            <div className="items-list-header">
              <span>Product Details</span>
              <span className="col-center">Quantity</span>
              <span className="col-right">Subtotal</span>
            </div>

            <div className="cart-items-list">
              {cart.map((item, idx) => (
                <div key={`${item.product.id}-${item.color}-${item.size}`} className="cart-item-row">
                  {/* Image & specs info */}
                  <div className="cart-item-product-info">
                    <div className="cart-item-image-box" style={{ backgroundColor: item.product.imageBg }}>
                      <ProductIcon type={item.product.iconType} className="cart-item-svg" />
                    </div>
                    <div className="cart-item-meta">
                      <h3 className="cart-item-name" onClick={() => navigateTo('product-detail', item.product.id)}>
                        {item.product.name}
                      </h3>
                      <span className="cart-item-unit-price">₹{item.product.price} each</span>
                    </div>
                  </div>

                  {/* Quantity Stepper controller */}
                  <div className="cart-item-qty-stepper col-center">
                    <div className="qty-control-box">
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.color, item.size, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button 
                        onClick={() => updateCartQuantity(item.product.id, item.color, item.size, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      className="remove-trash-btn" 
                      onClick={() => removeFromCart(item.product.id, item.color, item.size)}
                      title="Remove product"
                    >
                      <Trash2 size={16} /> <span>Remove</span>
                    </button>
                  </div>

                  {/* Price subtotal */}
                  <div className="cart-item-subtotal col-right">
                    <span>₹{item.product.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Back Button */}
            <div className="cart-actions-bottom">
              <button className="btn btn-outline" onClick={() => navigateTo('category', null, 'all')}>
                <ShoppingBag size={16} /> Add More Items
              </button>
            </div>
          </div>

          {/* Right Panel: Checkout Summary */}
          <div className="cart-summary-section">
            <div className="summary-card">
              <h3>Order Summary</h3>
              <div className="summary-divider"></div>

              {/* Promo input field */}
              <div className="promo-code-container">
                <form onSubmit={handleApplyPromo} className="promo-form">
                  <div className="promo-input-box">
                    <Gift size={16} className="gift-icon" />
                    <input 
                      type="text" 
                      placeholder="Coupon Code (e.g. BABYBLISS)" 
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn btn-secondary">Apply</button>
                </form>

                {couponError && <p className="promo-msg error">{couponError}</p>}
                {couponSuccess && (
                  <div className="promo-success-alert">
                    <p className="promo-msg success">{couponSuccess}</p>
                    <button className="remove-promo-btn" onClick={handleRemovePromo}>Remove Coupon</button>
                  </div>
                )}
              </div>

              <div className="summary-divider"></div>

              {/* Pricing breakdowns */}
              <div className="summary-rows">
                <div className="summary-row">
                  <span>Cart Subtotal ({cart.length} items)</span>
                  <span>₹{cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="summary-row text-success">
                    <span>Product Discounts</span>
                    <span>- ₹{cartDiscount}</span>
                  </div>
                )}
                {activeCoupon && (
                  <div className="summary-row text-success">
                    <span>Promo Coupon Discount (10%)</span>
                    <span>- ₹{promoDiscount}</span>
                  </div>
                )}
                <div className="summary-row">
                  <span>Shipping Charges</span>
                  <span>{shippingCost === 0 ? 'FREE' : `₹${shippingCost}`}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="shipping-progress-helper">
                    Add <strong>₹{shippingThreshold - cartSubtotal}</strong> more for <strong>FREE Shipping!</strong>
                  </div>
                )}
              </div>

              <div className="summary-divider"></div>

              {/* Grand Total */}
              <div className="summary-row total-payable-row">
                <span>Total Amount</span>
                <span>₹{cartTotal}</span>
              </div>

              {/* Checkout Action Button */}
              <button 
                className="btn btn-primary checkout-action-btn w-full"
                onClick={() => navigateTo('checkout')}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
