import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';

interface HeroBannerProps {
  featuredContent: Array<{
    id: number;
    title: string;
    description: string;
    backdrop: string;
    genre: string;
    rating: number;
  }>;
}

export function HeroBanner({ featuredContent }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % featuredContent.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredContent.length]);

  const current = featuredContent[currentIndex];

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${current.backdrop})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center h-full px-4 md:px-8 max-w-7xl mx-auto">
        <div className="max-w-lg md:max-w-2xl">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight">
            {current.title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-yellow-500 text-black px-2 py-1 text-sm font-semibold rounded">
              ★ {current.rating}
            </span>
            <span className="text-gray-300 text-sm md:text-base">
              {current.genre}
            </span>
          </div>

          <p className="text-gray-200 text-base md:text-lg leading-relaxed mb-8 max-w-xl">
            {current.description}
          </p>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button className="flex items-center justify-center space-x-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded font-semibold hover:bg-gray-200 transition-colors duration-200">
              <Play className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" />
              <span className="text-sm md:text-base">Play</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 bg-gray-600/70 text-white px-6 md:px-8 py-3 md:py-4 rounded font-semibold hover:bg-gray-600/90 transition-colors duration-200">
              <Info className="w-5 h-5 md:w-6 md:h-6" />
              <span className="text-sm md:text-base">More Info</span>
            </button>
          </div>
        </div>
      </div>

      {/* Content Indicators */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        {featuredContent.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
