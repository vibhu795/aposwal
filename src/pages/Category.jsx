import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, X, Filter } from 'lucide-react';
import { getSearchRelevanceScore } from '../utils/search';
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
  const [selectedSuiteSize, setSelectedSuiteSize] = useState('all');
  const [selectedSweaterType, setSelectedSweaterType] = useState('all');

  // Reset Baba Suit and Sweater filters when changing categories or search query
  React.useEffect(() => {
    setSelectedSuiteSize('all');
    setSelectedSweaterType('all');
  }, [filterCategory, searchQuery]);

  // Constants for filters options
  const filterOptions = {
    ageRanges: ['0-6 Months', '6-12 Months', '3-36 Months', '12-36 Months', '3-18 Months', '6-24 Months', '1-5 Years', '18 Months - 6 Years', 'Maternity'],
    genders: ['Boys', 'Girls', 'Unisex', 'Women'],
    sizes: ['0-3M', '3-6M', '6-12M', '1-2Y', '2-3Y', '3-4Y', '4-5Y', 'Small', 'Medium', 'Large', 'Extra Large', 'One Size', 'Free Size']
  };

  // Categories definition for header filter chips
  const categoryChips = [
    { name: 'All Products', key: 'all' },
    { name: 'Sweaters', key: 'sweaters' },
    { name: 'Frocks', key: 'frocks' },
    { name: 'Baba Suits', key: 'suits' },
    { name: 'Blankets', key: 'blankets' },
    { name: 'Accessories', key: 'accessories' },
    { name: 'Swed', key: 'swed' },
    { name: 'Caps', key: 'caps' },
    { name: 'Monkey Caps', key: 'monkey-caps' },
    { name: 'Vest', key: 'vests' },
    { name: 'Babysoft fursuits', key: 'babysoft-fursuits' }
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
    const searchScores = new Map();
    if (searchQuery) {
      result = result.filter(p => {
        const score = getSearchRelevanceScore(p, searchQuery);
        if (score > 0) {
          searchScores.set(p.id, score);
          return true;
        }
        return false;
      });
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
        p.sizes && p.sizes.some(size => {
          return filters.sizes.some(filterSize => {
            if (filterSize === size) return true;
            // Map S / Small
            if ((filterSize === 'Small' || filterSize === 'S') && (size === 'Small' || size === 'S')) return true;
            // Map M / Medium / mean
            if ((filterSize === 'Medium' || filterSize === 'M' || filterSize === 'mean') && (size === 'Medium' || size === 'M' || size === 'mean')) return true;
            // Map L / Large
            if ((filterSize === 'Large' || filterSize === 'L') && (size === 'Large' || size === 'L')) return true;
            // Map XL / Extra Large
            if ((filterSize === 'Extra Large' || filterSize === 'XL') && (size === 'Extra Large' || size === 'XL')) return true;
            return false;
          });
        })
      );
    }

    // 5b. Baba Suits specific size filter
    if (filterCategory === 'suits' && selectedSuiteSize !== 'all') {
      result = result.filter(p => 
        p.sizes && p.sizes.some(size => {
          if (selectedSuiteSize === 'Small' && (size === 'Small' || size === 'S')) return true;
          if (selectedSuiteSize === 'Medium' && (size === 'Medium' || size === 'M' || size === 'mean')) return true;
          if (selectedSuiteSize === 'Large' && (size === 'Large' || size === 'L')) return true;
          if (selectedSuiteSize === 'Extra Large' && (size === 'Extra Large' || size === 'XL')) return true;
          return false;
        })
      );
    }

    // 5c. Sweaters specific style filter
    if (filterCategory === 'sweaters' && selectedSweaterType !== 'all') {
      result = result.filter(p => p.sweaterType === selectedSweaterType);
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
    } else if (searchQuery) {
      result.sort((a, b) => {
        const scoreA = searchScores.get(a.id) || 0;
        const scoreB = searchScores.get(b.id) || 0;
        return scoreB - scoreA;
      });
    } // default is popularity (raw index or ID order)

    return result;
  }, [products, filterCategory, searchQuery, filters, selectedSuiteSize, selectedSweaterType]);

  // Compute category header label
  const categoryHeaderTitle = useMemo(() => {
    if (searchQuery) return `Search Results for "${searchQuery}"`;
    const found = categoryChips.find(c => c.key === filterCategory);
    return found ? found.name : 'All Products';
  }, [filterCategory, searchQuery]);

  return (
    <div className="category-page-container container">

      {/* 2. Top bar: Summary & Sorting */}
      <div className="category-top-controls">
        <div className="summary-text">
          Showing <strong>{filteredProducts.length}</strong> products
        </div>

      </div>

      {/* 3. Main grid containing left filters + right products */}
      <div className="category-main-content">

        {/* Right Product Grid */}
        <main className="products-list-panel">
          <h2 className="listing-header-title">{categoryHeaderTitle}</h2>
          
          {filterCategory === 'suits' && (
            <div className="baba-suits-size-filters">
              <span className="size-filter-label">Filter by Size:</span>
              <div className="size-filter-buttons">
                {['all', 'Small', 'Medium', 'Large', 'Extra Large'].map((sizeOpt) => (
                  <button
                    key={sizeOpt}
                    className={`size-filter-opt-btn ${selectedSuiteSize === sizeOpt ? 'active' : ''}`}
                    onClick={() => setSelectedSuiteSize(sizeOpt)}
                  >
                    {sizeOpt === 'all' ? 'All Sizes' : sizeOpt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filterCategory === 'sweaters' && (
            <div className="baba-suits-size-filters">
              <span className="size-filter-label">Filter by Type:</span>
              <div className="size-filter-buttons">
                {[
                  { key: 'all', label: 'All Sweaters' },
                  { key: 'round-neck', label: 'Round Neck' },
                  { key: 'front-open', label: 'Front Open' },
                  { key: 'regular', label: 'Others' }
                ].map((typeOpt) => (
                  <button
                    key={typeOpt.key}
                    className={`size-filter-opt-btn ${selectedSweaterType === typeOpt.key ? 'active' : ''}`}
                    onClick={() => setSelectedSweaterType(typeOpt.key)}
                  >
                    {typeOpt.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          
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

    </div>
  );
};
