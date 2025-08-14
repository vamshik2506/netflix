import React, { useState } from 'react';
import { Play, Plus, ThumbsUp, ChevronDown } from 'lucide-react';

interface ContentCardProps {
  item: {
    id: number;
    title: string;
    thumbnail: string;
    genre: string;
    rating: number;
    year: number;
    description?: string;
  };
}

export function ContentCard({ item }: ContentCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 w-48 md:w-64 transform transition-all duration-300 hover:scale-110 hover:z-20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Card */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={item.thumbnail}
          alt={item.title}
          className={`w-full h-32 md:h-40 object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {!imageLoaded && (
          <div className="w-full h-32 md:h-40 bg-gray-800 animate-pulse flex items-center justify-center">
            <div className="text-gray-600 text-sm">Loading...</div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-semibold text-sm md:text-base truncate mb-1">
              {item.title}
            </h3>
            <div className="flex items-center space-x-2 text-xs text-gray-300">
              <span>★ {item.rating}</span>
              <span>{item.year}</span>
              <span className="bg-gray-600 px-2 py-1 rounded text-xs">
                {item.genre}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Card on Hover */}
      {isHovered && (
        <div className="absolute top-0 left-0 right-0 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 transform translate-y-8">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="w-full h-32 md:h-40 object-cover rounded-t-lg"
          />
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex space-x-2">
                <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Play className="w-4 h-4 text-black" fill="currentColor" />
                </button>
                <button className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors">
                  <Plus className="w-4 h-4 text-white" />
                </button>
                <button className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors">
                  <ThumbsUp className="w-4 h-4 text-white" />
                </button>
              </div>
              <button className="w-8 h-8 border-2 border-gray-500 rounded-full flex items-center justify-center hover:border-white transition-colors">
                <ChevronDown className="w-4 h-4 text-white" />
              </button>
            </div>

            <h3 className="text-white font-semibold text-sm mb-2">
              {item.title}
            </h3>

            <div className="flex items-center space-x-2 text-xs text-gray-300 mb-2">
              <span className="bg-green-600 px-2 py-1 rounded">
                {Math.round(item.rating * 10)}% Match
              </span>
              <span>{item.year}</span>
            </div>

            <p className="text-gray-400 text-xs leading-relaxed">
              {item.description || `Experience the amazing ${item.genre.toLowerCase()} adventure in ${item.title}. A must-watch series that will keep you entertained.`}
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {item.genre.split(', ').map((genre, index) => (
                <span key={index} className="text-gray-400 text-xs">
                  {genre}{index < item.genre.split(', ').length - 1 ? ' •' : ''}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
