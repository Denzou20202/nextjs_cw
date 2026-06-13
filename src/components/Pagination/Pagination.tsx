import Link from 'next/link';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  searchParams: Record<string, string>;
}

const buildHref = (searchParams: Record<string, string>, page: number): string => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(searchParams)) {
    if (key !== 'page' && value) params.set(key, value);
  }
  if (page > 1) params.set('page', String(page));
  const qs = params.toString();
  return qs ? `/?${qs}` : '/';
};

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, searchParams }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (currentPage > 4) pages.push('...');
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 3) pages.push('...');
    pages.push(totalPages);
  }

  return (
    <div className="pagination">
      {currentPage > 1 ? (
        <Link href={buildHref(searchParams, currentPage - 1)} className="pagination-btn">
          Previous
        </Link>
      ) : (
        <span className="pagination-btn disabled">Previous</span>
      )}
      <div className="pagination-pages">
        {pages.map((page, index) =>
          typeof page === 'number' ? (
            <Link
              key={index}
              href={buildHref(searchParams, page)}
              className={`pagination-page ${page === currentPage ? 'active' : ''}`}
            >
              {page}
            </Link>
          ) : (
            <span key={index} className="pagination-ellipsis">
              {page}
            </span>
          ),
        )}
      </div>
      {currentPage < totalPages ? (
        <Link href={buildHref(searchParams, currentPage + 1)} className="pagination-btn">
          Next
        </Link>
      ) : (
        <span className="pagination-btn disabled">Next</span>
      )}
    </div>
  );
};
