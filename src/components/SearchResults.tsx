import React from 'react';
import { ContentCard } from './ContentCard';

interface SearchResultsProps {
  content: Array<{
    id: number;
    title: string;
    thumbnail: string;
    genre: string;
    rating: number;
    year: number;
    description?: string;
  }>;
  searchQuery: string;
}

export function SearchResults({ content, searchQuery }: SearchResultsProps) {
  return (
    <div className="pt-24 px-4 md:px-8 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Search results for "{searchQuery}"
        </h2>
        <p className="text-gray-400">
          {content.length} {content.length === 1 ? 'result' : 'results'} found
        </p>
      </div>

      {content.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-400">
            Try different keywords or browse our categories
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {content.map((item) => (
            <div key={item.id} className="transform hover:scale-105 transition-transform duration-200">
              <ContentCard item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
