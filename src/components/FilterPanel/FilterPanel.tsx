'use client';

import React, { useCallback, useMemo, useState } from 'react';
import './FilterPanel.css';

interface Filters {
  genre?: number;
  year?: string;
  sortBy?: string;
}

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  onReset: () => void;
  genres: { id: number; name: string }[];
  initialFilters?: Filters;
}

const FilterPanelComponent: React.FC<FilterPanelProps> = ({
  isOpen,
  onClose,
  onApply,
  onReset,
  genres,
  initialFilters = {},
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setFilters(initialFilters);
    }
  }

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const years = useMemo(() => Array.from({ length: 50 }, (_, i) => currentYear - i), [currentYear]);

  const sortOptions = useMemo(
    () => [
      { value: 'popularity.desc', label: 'Популярность (по убыванию)' },
      { value: 'popularity.asc', label: 'Популярность (по возрастанию)' },
      { value: 'vote_average.desc', label: 'Рейтинг (по убыванию)' },
      { value: 'vote_average.asc', label: 'Рейтинг (по возрастанию)' },
      { value: 'release_date.desc', label: 'Дата выпуска (новые)' },
      { value: 'release_date.asc', label: 'Дата выпуска (старые)' },
    ],
    [],
  );

  const handleFilterChange = useCallback(
    (key: keyof Filters, value: string | number | undefined) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value || undefined,
      }));
    },
    [],
  );

  const handleApply = useCallback(() => {
    onApply(filters);
    onClose();
  }, [filters, onApply, onClose]);

  const handleReset = useCallback(() => {
    setFilters({});
    onReset();
  }, [onReset]);

  if (!isOpen) return null;

  return (
    <>
      <div className="filter-overlay" onClick={onClose}></div>
      <div className="filter-panel">
        <div className="filter-header">
          <h3>Фильтры</h3>
          <button className="filter-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="filter-content">
          <div className="filter-group">
            <label className="filter-label">Жанр</label>
            <select
              className="filter-select"
              value={filters.genre || ''}
              onChange={(e) =>
                handleFilterChange('genre', e.target.value ? parseInt(e.target.value) : undefined)
              }
            >
              <option value="">Все жанры</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Год</label>
            <select
              className="filter-select"
              value={filters.year || ''}
              onChange={(e) => handleFilterChange('year', e.target.value || undefined)}
            >
              <option value="">Все годы</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Сортировка</label>
            <select
              className="filter-select"
              value={filters.sortBy || ''}
              onChange={(e) => handleFilterChange('sortBy', e.target.value || undefined)}
            >
              <option value="">По умолчанию</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="filter-footer">
          <button className="filter-btn-reset" onClick={handleReset}>
            Сбросить
          </button>
          <button className="filter-btn-apply" onClick={handleApply}>
            Применить
          </button>
        </div>
      </div>
    </>
  );
};

export const FilterPanel = React.memo(FilterPanelComponent);
