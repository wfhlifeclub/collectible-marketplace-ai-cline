import { Star, Heart, Timer } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onFavorite: (id: string) => void;
}

export function ProductCard({ product, onFavorite }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={() => onFavorite(product.id)}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {product.title}
        </h3>
        
        <div className="mt-2 flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">
            {product.bids} bids
          </span>
        </div>
        
        <div className="mt-2 flex items-center gap-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">{product.rating}</span>
          <span className="text-sm text-gray-500 ml-2">{product.seller}</span>
        </div>
        
        <div className="mt-3 flex items-center gap-1 text-sm text-gray-500">
          <Timer className="w-4 h-4" />
          <span>{product.timeLeft}</span>
        </div>
        
        <span className="mt-2 inline-block px-2 py-1 text-xs font-medium rounded-full
          ${product.condition === 'New' ? 'bg-green-100 text-green-800' : 
          product.condition === 'Used' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-blue-100 text-blue-800'}">
          {product.condition}
        </span>
      </div>
    </div>
  );
}