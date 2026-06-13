'use client';

import React, { useCallback, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { FilterPanel } from '../FilterPanel/FilterPanel';
import { Header } from '../Header/Header';
import type { Genre } from '../../models/movie';

interface Filters {
  genre?: number;
  year?: string;
  sortBy?: string;
}

interface MoviesControlsProps {
  genres: Genre[];
  searchQuery: string;
  filters: Filters;
}

export const MoviesControls: React.FC<MoviesControlsProps> = ({ genres, searchQuery, filters }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = useCallback(
    (query: string) => {
      const params = new URLSearchParams();
      if (query) params.set('q', query);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname],
  );

  const handleFilterApply = useCallback(
    (appliedFilters: Filters) => {
      const params = new URLSearchParams();
      if (appliedFilters.genre) params.set('genre', String(appliedFilters.genre));
      if (appliedFilters.year) params.set('year', appliedFilters.year);
      if (appliedFilters.sortBy) params.set('sortBy', appliedFilters.sortBy);
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [router, pathname],
  );

  const handleReset = useCallback(() => {
    router.push(pathname);
  }, [router, pathname]);

  return (
    <>
      <Header
        onSearch={handleSearch}
        onFilterClick={() => setIsFilterOpen(true)}
        initialQuery={searchQuery}
      />
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleFilterApply}
        onReset={handleReset}
        genres={genres}
        initialFilters={filters}
      />
    </>
  );
};
