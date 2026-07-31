import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { 
  Wishlist, 
  AccountOrders, 
  StoreLocator, 
  AboutUs, 
  ContactUs 
} from './pages/OtherPages';

import './App.css';

const AppContent = () => {
  const { page } = useContext(AppContext);

  return (
    <div className="app-layout">
      {/* Central Sticky Header and Menu */}
      <Navbar />

      {/* Main viewport */}
      <main className="main-content-viewport">
        {page === 'home' && <Home />}
        {page === 'category' && <Category />}
        {page === 'product-detail' && <ProductDetail />}
        {page === 'cart' && <Cart />}
        {page === 'checkout' && <Checkout />}
        {page === 'wishlist' && <Wishlist />}
        {page === 'account' && <AccountOrders />}
        {page === 'orders' && <AccountOrders />}
        {page === 'locator' && <StoreLocator />}
        {page === 'about' && <AboutUs />}
        {page === 'contact' && <ContactUs />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Overlay feedback notifications */}
      <ToastContainer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
