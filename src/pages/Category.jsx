import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Filter } from 'lucide-react';
import './Category.css';

export const Category = () => {
  const { 
    products, 
    filterCategory, 
    setFilterCategory, 
    searchQuery, 
    setSearchQuery,
    filters,
    setFilters,
    resetFilters
  } = useContext(AppContext);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Constants for filters options
  const filterOptions = {
    ageRanges: ['0-6 Months', '6-12 Months', '3-36 Months', '12-36 Months', '3-18 Months', '6-24 Months', '1-5 Years', '18 Months - 6 Years', 'Maternity'],
    genders: ['Boys', 'Girls', 'Unisex', 'Women'],
    sizes: ['0-3M', '3-6M', '6-12M', '1-2Y', '2-3Y', '3-4Y', '4-5Y', 'S', 'M', 'L', 'XL', 'One Size', 'Free Size']
  };

  // Categories definition for header filter chips
  const categoryChips = [
    { name: 'All Products', key: 'all' },
    { name: 'Sweaters', key: 'sweaters' },
    { name: 'Frocks', key: 'frocks' },
    { name: 'Baba Suits', key: 'suits' },
    { name: 'Blankets', key: 'blankets' },
    { name: 'Accessories', key: 'accessories' }
  ];

  // Handle Sort Change
  const handleSortChange = (e) => {
    setFilters(prev => ({ ...prev, sortBy: e.target.value }));
  };

  // Toggle Checkboxes for Filters
  const handleCheckboxChange = (filterType, value) => {
    setFilters(prev => {
      const currentList = prev[filterType] || [];
      const updatedList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return { ...prev, [filterType]: updatedList };
    });
  };

  // Range Slider Handle
  const handlePriceSliderChange = (e) => {
    setFilters(prev => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }));
  };

  // Toggle inStock filter
  const handleInStockToggle = () => {
    setFilters(prev => ({ ...prev, inStockOnly: !prev.inStockOnly }));
  };

  // Apply filters on products list using useMemo
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Category Filter
    if (filterCategory !== 'all') {
      result = result.filter(p => p.category === filterCategory);
    }

    // 2. Search Query Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        p => p.name.toLowerCase().includes(query) || 
             p.categoryDisplay.toLowerCase().includes(query) ||
             p.description.toLowerCase().includes(query)
      );
    }

    // 3. Age Range Filter
    if (filters.ageRange.length > 0) {
      result = result.filter(p => filters.ageRange.includes(p.ageRange));
    }

    // 4. Gender Filter
    if (filters.gender.length > 0) {
      result = result.filter(p => filters.gender.includes(p.gender));
    }

    // 5. Size Filter
    if (filters.sizes.length > 0) {
      result = result.filter(p => 
        p.sizes && p.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // 6. Price Filter
    result = result.filter(p => p.price <= filters.priceRange[1]);

    // 7. Availability Filter
    if (filters.inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    // 8. Sorting
    if (filters.sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } // default is popularity (raw index or ID order)

    return result;
  }, [products, filterCategory, searchQuery, filters]);

  // Compute category header label
  const categoryHeaderTitle = useMemo(() => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    const found = categoryChips.find(c => c.key === filterCategory);
    return found ? found.name : 'All Products';
  }, [filterCategory, searchQuery]);

  return (
    <div className="category-page-container container">
      {/* 1. Category Chip Quick Links */}
      <div className="category-chips-row">
        {categoryChips.map((chip) => (
          <button 
            key={chip.key}
            className={`category-chip ${filterCategory === chip.key && !searchQuery ? 'active' : ''}`}
            onClick={() => {
              setSearchQuery(''); // Clear search on chip click
              setFilterCategory(chip.key);
            }}
          >
            {chip.name}
          </button>
        ))}
      </div>

      {/* 2. Top bar: Summary & Sorting */}
      <div className="category-top-controls">
        <div className="summary-text">
          Showing <strong>{filteredProducts.length}</strong> products
        </div>

        <div className="controls-right">
          {/* Mobile Filter Button */}
          <button className="mobile-filter-trigger btn btn-outline" onClick={() => setMobileFiltersOpen(true)}>
            <Filter size={16} /> Filters
          </button>

          <div className="sort-wrapper">
            <ArrowUpDown size={16} className="sort-icon" />
            <select value={filters.sortBy} onChange={handleSortChange} aria-label="Sort products">
              <option value="popularity">Sort By: Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Average Rating</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Main grid containing left filters + right products */}
      <div className="category-main-content">
        {/* Left Sidebar Filter (Desktop) */}
        <aside className="filters-sidebar">
          <div className="sidebar-section-header">
            <SlidersHorizontal size={18} />
            <h3>Filters</h3>
            <button className="clear-all-link" onClick={resetFilters}>Clear All</button>
          </div>

          <div className="sidebar-divider"></div>

          {/* Age range checkboxes */}
          <div className="filter-group">
            <h4>Age Range</h4>
            <div className="checkbox-list">
              {filterOptions.ageRanges.map((age) => (
                <label key={age} className="checkbox-item">
                  <input 
                    type="checkbox" 
                    checked={filters.ageRange.includes(age)}
                    onChange={() => handleCheckboxChange('ageRange', age)}
                  />
                  <span>{age}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-divider"></div>

          {/* Price Range Slider */}
          <div className="filter-group">
            <h4>Max Price</h4>
            <div className="price-slider-box">
              <input 
                type="range" 
                min="0" 
                max="10000" 
                step="250"
                value={filters.priceRange[1]}
                onChange={handlePriceSliderChange}
                aria-label="Filter by price"
              />
              <div className="price-labels">
                <span>₹0</span>
                <span>₹{filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="sidebar-divider"></div>

          {/* Gender */}
          <div className="filter-group">
            <h4>Gender</h4>
            <div className="checkbox-list">
              {filterOptions.genders.map((gender) => (
                <label key={gender} className="checkbox-item">
                  <input 
                    type="checkbox"
                    checked={filters.gender.includes(gender)}
                    onChange={() => handleCheckboxChange('gender', gender)}
                  />
                  <span>{gender}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-divider"></div>

          {/* Sizes */}
          <div className="filter-group">
            <h4>Sizes</h4>
            <div className="checkbox-list inline-grid">
              {filterOptions.sizes.map((size) => (
                <label key={size} className="checkbox-item">
                  <input 
                    type="checkbox"
                    checked={filters.sizes.includes(size)}
                    onChange={() => handleCheckboxChange('sizes', size)}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="sidebar-divider"></div>

          {/* Availability */}
          <div className="filter-group">
            <label className="checkbox-item in-stock-label">
              <input 
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={handleInStockToggle}
              />
              <strong>In Stock Only</strong>
            </label>
          </div>
        </aside>

        {/* Right Product Grid */}
        <main className="products-list-panel">
          <h2 className="listing-header-title">{categoryHeaderTitle}</h2>
          
          {filteredProducts.length === 0 ? (
            <div className="empty-products-state">
              <div className="empty-emoji">🥺</div>
              <h3>Oops! No Products Found</h3>
              <p>We couldn't find any products matching your filters. Try widening your price range or clearing checkmarks.</p>
              <button className="btn btn-primary" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="category-products-grid">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* 4. MOBILE FILTERS SLIDE-UP DRAWER */}
      {mobileFiltersOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileFiltersOpen(false)}>
          <div className="mobile-filters-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h3>Filters</h3>
              <div className="drawer-actions">
                <button className="clear-all-link" onClick={resetFilters}>Clear All</button>
                <button className="close-drawer-btn" onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="drawer-content">
              {/* Age range */}
              <div className="filter-group">
                <h4>Age Range</h4>
                <div className="checkbox-list">
                  {filterOptions.ageRanges.map((age) => (
                    <label key={age} className="checkbox-item">
                      <input 
                        type="checkbox" 
                        checked={filters.ageRange.includes(age)}
                        onChange={() => handleCheckboxChange('ageRange', age)}
                      />
                      <span>{age}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-divider"></div>

              {/* Price range slider */}
              <div className="filter-group">
                <h4>Max Price</h4>
                <div className="price-slider-box">
                  <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    step="250"
                    value={filters.priceRange[1]}
                    onChange={handlePriceSliderChange}
                    aria-label="Filter by price"
                  />
                  <div className="price-labels">
                    <span>₹0</span>
                    <span>₹{filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <div className="sidebar-divider"></div>

              {/* Gender */}
              <div className="filter-group">
                <h4>Gender</h4>
                <div className="checkbox-list">
                  {filterOptions.genders.map((gender) => (
                    <label key={gender} className="checkbox-item">
                      <input 
                        type="checkbox"
                        checked={filters.gender.includes(gender)}
                        onChange={() => handleCheckboxChange('gender', gender)}
                      />
                      <span>{gender}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-divider"></div>

              {/* Sizes */}
              <div className="filter-group">
                <h4>Sizes</h4>
                <div className="checkbox-list inline-grid">
                  {filterOptions.sizes.map((size) => (
                    <label key={size} className="checkbox-item">
                      <input 
                        type="checkbox"
                        checked={filters.sizes.includes(size)}
                        onChange={() => handleCheckboxChange('sizes', size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="sidebar-divider"></div>

              {/* Stock */}
              <div className="filter-group">
                <label className="checkbox-item">
                  <input 
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={handleInStockToggle}
                  />
                  <strong>In Stock Only</strong>
                </label>
              </div>
            </div>

            <div className="drawer-footer">
              <button className="btn btn-primary w-full" onClick={() => setMobileFiltersOpen(false)}>
                Apply Filters ({filteredProducts.length} Items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
