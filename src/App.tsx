import React, { useState, useEffect } from 'react';
import { Search, Bell, User, Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ContentRow } from './components/ContentRow';
import { SearchResults } from './components/SearchResults';
import { mockMovies, mockShows, featuredContent } from './data/mockData';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const allContent = [...mockMovies, ...mockShows];
  const filteredContent = searchQuery 
    ? allContent.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    setIsSearching(searchQuery.length > 0);
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      {isSearching ? (
        <SearchResults content={filteredContent} searchQuery={searchQuery} />
      ) : (
        <>
          <HeroBanner featuredContent={featuredContent} />
          
          <div className="relative z-10 -mt-32">
            <ContentRow 
              title="Trending Now" 
              content={mockMovies.slice(0, 10)} 
            />
            <ContentRow 
              title="Popular on StreamFlix" 
              content={mockShows.slice(0, 10)} 
            />
            <ContentRow 
              title="Action Movies" 
              content={mockMovies.filter(movie => movie.genre.includes('Action'))} 
            />
            <ContentRow 
              title="Comedy Shows" 
              content={mockShows.filter(show => show.genre.includes('Comedy'))} 
            />
            <ContentRow 
              title="Drama Series" 
              content={mockShows.filter(show => show.genre.includes('Drama'))} 
            />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
