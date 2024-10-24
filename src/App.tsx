import React, { useState } from 'react';
import { ShoppingBag, Bell, User } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { AuthModal } from './components/AuthModal';
import { FilterModal, Filters } from './components/FilterModal';
import type { Product } from './types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Sony PlayStation 5 Digital Edition',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=1200&q=80',
    condition: 'New',
    seller: 'GameStop',
    rating: 4.8,
    bids: 23,
    timeLeft: '2d 5h',
  },
  {
    id: '2',
    title: 'MacBook Pro 16-inch M1 Pro',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    condition: 'Used',
    seller: 'TechHub',
    rating: 4.9,
    bids: 15,
    timeLeft: '1d 3h',
  },
  {
    id: '3',
    title: 'Canon EOS R5 Mirrorless Camera',
    price: 3299.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80',
    condition: 'New',
    seller: 'CameraWorld',
    rating: 4.7,
    bids: 31,
    timeLeft: '4d 12h',
  },
];

function App() {
  const [products] = useState<Product[]>(MOCK_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    priceRange: { min: 0, max: null, label: 'All Prices' },
    conditions: [],
    minRating: 0,
    sortBy: 'price-asc',
  });

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = filters.priceRange.max === null 
        ? product.price >= filters.priceRange.min
        : product.price >= filters.priceRange.min && product.price <= filters.priceRange.max;
      const matchesCondition = filters.conditions.length === 0 || filters.conditions.includes(product.condition);
      const matchesRating = product.rating >= filters.minRating;
      
      return matchesSearch && matchesPrice && matchesCondition && matchesRating;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'ending-soon':
          return a.timeLeft.localeCompare(b.timeLeft);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">marketplace</span>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-6 h-6 text-gray-600" />
              </button>
              <button 
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <User className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="mt-4 flex justify-center">
            <SearchBar 
              onSearch={setSearchQuery}
              onFilter={() => setIsFilterModalOpen(true)}
            />
          </div>
        </div>
        
        <div className="border-t">
          <div className="max-w-7xl mx-auto">
            <CategoryBar />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onFavorite={(id) => console.log('Favorited:', id)}
            />
          ))}
        </div>
      </main>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}

export default App;