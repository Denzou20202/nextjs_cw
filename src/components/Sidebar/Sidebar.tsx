'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './Sidebar.css';

const SidebarComponent: React.FC = () => {
  const pathname = usePathname();

  const isActive = useCallback(
    (path: string) => {
      return pathname === path;
    },
    [pathname],
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <Link href="/">🎬 MoviesHub</Link>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">MEDIA</h3>
          <ul className="nav-list">
            <li>
              <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
                🎥 Movies
              </Link>
            </li>
            <li>
              <a href="#" className="nav-link">
                📺 TV Shows
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                🎵 Music
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                📚 Audiobooks
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">ACCOUNT</h3>
          <ul className="nav-list">
            <li>
              <a href="#" className="nav-link">
                ❤️ Favorites
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                🔖 Watchlist
              </a>
            </li>
            <li>
              <a href="#" className="nav-link">
                ⚙️ Settings
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
};

export const Sidebar = React.memo(SidebarComponent);
