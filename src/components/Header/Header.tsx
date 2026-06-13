'use client';

import React, { useCallback, useState } from 'react';
import './Header.css';

interface HeaderProps {
  onSearch: (query: string) => void;
  onFilterClick: () => void;
  initialQuery?: string;
}

const HeaderComponent: React.FC<HeaderProps> = ({ onSearch, onFilterClick, initialQuery = '' }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [prevInitialQuery, setPrevInitialQuery] = useState(initialQuery);

  if (initialQuery !== prevInitialQuery) {
    setPrevInitialQuery(initialQuery);
    setSearchQuery(initialQuery);
  }

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onSearch(searchQuery);
      }
    },
    [onSearch, searchQuery],
  );

  const handleClear = useCallback(() => {
    setSearchQuery('');
    onSearch('');
  }, [onSearch]);

  return (
    <header className="header">
      <div className="header-container">
        <button className="filter-btn" onClick={onFilterClick}>
          <span className="filter-icon">⚙</span> Filters
        </button>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-btn">
            Search
          </button>
          {searchQuery && (
            <button type="button" className="clear-btn" onClick={handleClear}>
              Clear
            </button>
          )}
        </form>
        <div className="user-info">
          <div className="user-avatar"></div>
          <span className="user-name">User</span>
        </div>
      </div>
    </header>
  );
};

export const Header = React.memo(HeaderComponent);
