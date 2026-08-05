import React, { createContext, useState, useEffect } from 'react';
import productsData from '../data/products.json';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation / Page state
  const [page, setPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');

  // Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // Cart & Wishlist (initialize from localStorage if exists)
  const [cart, setCart] = useState(() => {
    const localCart = localStorage.getItem('cuddle_cove_cart');
    return localCart ? JSON.parse(localCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const localWishlist = localStorage.getItem('cuddle_cove_wishlist');
    return localWishlist ? JSON.parse(localWishlist) : [];
  });

  const [orders, setOrders] = useState(() => {
    const localOrders = localStorage.getItem('cuddle_cove_orders');
    return localOrders ? JSON.parse(localOrders) : [];
  });

  // Sidebar Filter States
  const [filters, setFilters] = useState({
    ageRange: [],
    priceRange: [0, 10000],
    gender: [],
    sizes: [],
    colors: [],
    inStockOnly: false,
    sortBy: 'popularity'
  });

  // Toast State
  const [toasts, setToasts] = useState([]);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('cuddle_cove_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cuddle_cove_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('cuddle_cove_orders', JSON.stringify(orders));
  }, [orders]);

  // Navigate helper
  const navigateTo = (targetPage, productId = null, category = 'all') => {
    setPage(targetPage);
    if (productId) {
      setSelectedProductId(productId);
    }
    if (category !== 'all') {
      setFilterCategory(category);
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast Helpers
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove toast after 3 seconds
    setTimeout(() => {
      removeToast(id);
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Functions
  const addToCart = (product, quantity = 1, color = null, size = null) => {
    if (!product.inStock) {
      addToast('Sorry, this product is currently out of stock!', 'error');
      return;
    }

    const selectedColor = color || (product.colors && product.colors[0]?.name) || 'Default';
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';

    setCart((prevCart) => {
      // Find matching item in cart
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      if (existingItemIndex > -1) {
        // Increment quantity
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        addToast(`Updated quantity of ${product.name} in cart!`, 'success');
        return newCart;
      } else {
        // Add new item
        addToast(`Added ${product.name} to cart!`, 'success');
        return [...prevCart, { product, quantity, color: selectedColor, size: selectedSize }];
      }
    });
  };

  const removeFromCart = (productId, color, size) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(
        (item) => item.product.id === productId && item.color === color && item.size === size
      );
      if (itemToRemove) {
        addToast(`Removed ${itemToRemove.product.name} from cart!`, 'info');
      }
      return prevCart.filter(
        (item) => !(item.product.id === productId && item.color === color && item.size === size)
      );
    });
  };

  const updateCartQuantity = (productId, color, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, color, size);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.color === color && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist Functions
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.id === product.id);
      if (exists) {
        addToast(`Removed ${product.name} from Wishlist`, 'info');
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        addToast(`Saved ${product.name} to Wishlist`, 'success');
        return [...prevWishlist, product];
      }
    });
  };

  // Checkout Function
  const completeOrder = (shippingInfo, paymentMethod) => {
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const orderDate = new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const newOrder = {
      orderId,
      date: orderDate,
      items: [...cart],
      total: orderTotal + (orderTotal > 999 ? 0 : 99), // Shipping charge mock
      status: 'Processing',
      shippingInfo,
      paymentMethod
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    addToast('Order Placed Successfully!', 'success');
    navigateTo('home');
    return orderId;
  };

  // Computed Values
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDiscount = cart.reduce((sum, item) => sum + (item.product.originalPrice - item.product.price) * item.quantity, 0);
  
  // Filters reset
  const resetFilters = () => {
    setFilters({
      ageRange: [],
      priceRange: [0, 10000],
      gender: [],
      sizes: [],
      colors: [],
      inStockOnly: false,
      sortBy: 'popularity'
    });
  };

  return (
    <AppContext.Provider
      value={{
        page,
        setPage,
        selectedProductId,
        setSelectedProductId,
        filterCategory,
        setFilterCategory,
        searchQuery,
        setSearchQuery,
        cart,
        wishlist,
        orders,
        filters,
        setFilters,
        resetFilters,
        toasts,
        addToast,
        removeToast,
        navigateTo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        completeOrder,
        cartItemCount,
        cartSubtotal,
        cartDiscount,
        products: productsData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
