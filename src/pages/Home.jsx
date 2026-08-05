import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Truck, RotateCcw, ShieldCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import './Home.css';

// PNG illustrations
import babySweaterImg from '../assets/baby_sweater.png';
import babyFrockImg from '../assets/baby_frock.png';
import babyOnesieImg from '../assets/baby_onesie.png';
import babyBlanketImg from '../assets/baby_blanket.png';
import babyBeanieImg from '../assets/baby_beanie.png';
import teddyBearImg from '../assets/teddy_bear.png';
import babyOnesieHeroImg from '../assets/baby_onesie_hero.png';
import babyCarrierImg from '../assets/baby_carrier.png';

export const Home = () => {
  const { products, navigateTo } = useContext(AppContext);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Carousel slides definition
  const slides = [
    {
      id: 1,
      title: 'Knitted Baby Sweaters',
      subtitle: 'Soft Warmth for Newborns',
      desc: 'Handcrafted cardigans and check print sweater sets knitted with premium babysoft wool.',
      cta: 'Explore Sweaters',
      category: 'sweaters',
      bgGradient: 'linear-gradient(135deg, #FFE3E0 0%, #FFF0D4 100%)',
      badgeColor: '#FF6B35',
      illustration: teddyBearImg
    },
    {
      id: 2,
      title: 'Cozy Fleece Fur Suits',
      subtitle: 'Teddy Bear & Bunny Onesies',
      desc: 'Double-zipped velvet fleece onesies with ears on the hood, keeping infants cozy down to 10°C.',
      cta: 'Shop Baba Suits',
      category: 'suits',
      bgGradient: 'linear-gradient(135deg, #E0F2F1 0%, #F5FBEF 100%)',
      badgeColor: '#8BC34A',
      illustration: babyOnesieHeroImg
    },
    {
      id: 3,
      title: 'Soft Embossed Blankets',
      subtitle: 'Wrap Your Baby in Pure Love',
      desc: 'Heavy double-layered fleece star-print baby blankets, safe for skin contact and crib bedding.',
      cta: 'Explore Blankets',
      category: 'blankets',
      bgGradient: 'linear-gradient(135deg, #E8F0FE 0%, #F3E8FF 100%)',
      badgeColor: '#4FB0C6',
      illustration: babyCarrierImg
    }
  ];

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Category list for rounded tiles grid
  const categoryTiles = [
    { name: 'Sweaters', key: 'sweaters', icon: babySweaterImg, bgColor: '#FFEAD2' },
    { name: 'Frocks', key: 'frocks', icon: babyFrockImg, bgColor: '#FFEAD2' },
    { name: 'Baba Suits', key: 'suits', icon: babyOnesieImg, bgColor: '#E8F5E9' },
    { name: 'Blankets', key: 'blankets', icon: babyBlanketImg, bgColor: '#EDE7F6' },
    { name: 'Accessories', key: 'accessories', icon: babyBeanieImg, bgColor: '#FCF6BD' }
  ];

  // Filter products for featured list (first 4 items that are inStock)
  const featuredProducts = products.slice(0, 5);

  // New arrivals list (items marked isNew)
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="homepage-content">
      {/* 1. HERO CAROUSEL BANNER */}
      <section className="hero-carousel-section container">
        <div className="carousel-wrapper" style={{ background: slides[currentSlide].bgGradient }}>
          {/* Text Content */}
          <div className="carousel-text-area">
            <span className="carousel-badge" style={{ backgroundColor: slides[currentSlide].badgeColor }}>
              FEATURED COLLECTION
            </span>
            <h1 className="carousel-title">{slides[currentSlide].title}</h1>
            <h2 className="carousel-subtitle">{slides[currentSlide].subtitle}</h2>
            <p className="carousel-description">{slides[currentSlide].desc}</p>
            <button 
              className="btn btn-primary carousel-cta-btn"
              onClick={() => navigateTo('category', null, slides[currentSlide].category)}
            >
              {slides[currentSlide].cta} <ArrowRight size={16} />
            </button>
          </div>

          {/* Decorative Vector Frame */}
          <div className="carousel-graphic-area">
            <div className="graphic-circle" style={{ borderColor: slides[currentSlide].badgeColor }}>
              {/* Soft floating dots */}
              <div className="dot dot-1" style={{ backgroundColor: '#FF6B35' }}></div>
              <div className="dot dot-2" style={{ backgroundColor: '#FFC857' }}></div>
              <div className="dot dot-3" style={{ backgroundColor: '#4FB0C6' }}></div>
            </div>
            {/* Cute illustration drawing */}
            <img 
              src={slides[currentSlide].illustration} 
              alt={slides[currentSlide].title} 
              className="graphic-image" 
            />
          </div>

          {/* Navigation Controls */}
          <button className="carousel-arrow left" onClick={handlePrevSlide} aria-label="Previous Slide">
            <ChevronLeft size={20} />
          </button>
          <button className="carousel-arrow right" onClick={handleNextSlide} aria-label="Next Slide">
            <ChevronRight size={20} />
          </button>

          {/* Slide Indicator Dots */}
          <div className="carousel-dots">
            {slides.map((_, idx) => (
              <button 
                key={idx} 
                className={`dot-indicator ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SHOP BY CATEGORY GRID */}
      <section className="shop-by-category container">
        <h2 className="section-title text-center">Shop by Category</h2>
        <p className="section-subtitle text-center">Gentle solutions, custom crafted for every little step</p>
        
        <div className="category-tiles-grid">
          {categoryTiles.map((tile) => (
            <div 
              key={tile.key} 
              className="category-tile-card hover-lift"
              onClick={() => navigateTo('category', null, tile.key)}
            >
              <div className="category-tile-icon" style={{ backgroundColor: tile.bgColor }}>
                <img src={tile.icon} alt={tile.name} className="category-img" />
              </div>
              <span className="category-tile-name">{tile.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. PROMOTIONAL DOUBLE BANNERS */}
      <section className="promo-banners container">
        <div className="promo-banner-card banner-pink hover-lift" onClick={() => navigateTo('category', null, 'frocks')}>
          <div className="banner-text">
            <span className="banner-mini-tag">COZY WINTER</span>
            <h3>Delightful Woollen Frocks</h3>
            <p>Ruffled hand-knit skirts and wool bloomers. Keeps your little princess cozy.</p>
            <span className="banner-link">Shop Frocks <ArrowRight size={14} /></span>
          </div>
          <img src={babyFrockImg} alt="Delightful Woollen Frocks" className="banner-img" />
        </div>
        <div className="promo-banner-card banner-blue hover-lift" onClick={() => navigateTo('category', null, 'accessories')}>
          <div className="banner-text">
            <span className="banner-mini-tag">EARS COVERED</span>
            <h3>Monkey Caps & beanies</h3>
            <p>Double-layered winter hoods and pom-pom caps to insulate active toddlers.</p>
            <span className="banner-link">Explore Now <ArrowRight size={14} /></span>
          </div>
          <img src={babyBeanieImg} alt="Monkey Caps & beanies" className="banner-img" />
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS SECTION */}
      <section className="featured-products container">
        <div className="section-header">
          <div>
            <h2 className="section-title">Best Sellers</h2>
            <p className="section-subtitle">Top products loved by thousands of parents</p>
          </div>
          <button className="btn btn-outline" onClick={() => navigateTo('category', null, 'all')}>
            View All Products
          </button>
        </div>

        <div className="products-grid-scroll">
          {featuredProducts.map((prod) => (
            <div key={prod.id} className="scroll-product-item">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="new-arrivals container">
        <h2 className="section-title text-center">New Arrivals</h2>
        <p className="section-subtitle text-center">Fresh picks for your growing toddlers</p>
        
        <div className="home-products-grid">
          {newArrivals.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>


    </div>
  );
};
