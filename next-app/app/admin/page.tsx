"use client";
import { useEffect, useRef } from "react";

export default function AdminPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("@/lib/admin-app").then((mod) => {
      mod.default.init();
    });
  }, []);

  return (
    <div id="admin-layout" className="admin-layout">
      <aside id="admin-sidebar" className="admin-sidebar">
        <div className="sidebar-logo">
          <img src="/logo/logo.png" alt="MBS" width="32" height="32" />
          <span>MBS Islamic Admin</span>
        </div>
        <nav className="sidebar-nav" id="sidebar-nav"></nav>
      </aside>

      <div className="admin-main">
        <header className="admin-header" id="admin-header">
          <div className="admin-header__left">
            <button className="admin-header__menu-btn" id="menu-toggle" aria-label="Toggle menu">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <h1 className="admin-header__title" id="page-title">
              Dashboard
            </h1>
          </div>
          <div className="admin-header__right">
            <a href="/" className="btn btn--outline btn--sm" target="_blank" rel="noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              View Site
            </a>
            <button className="btn btn--ghost btn--sm" id="btn-logout">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
            <button className="btn btn--ghost btn--sm" id="btn-reset-cms" title="Reset all content to defaults">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
              </svg>
              Reset
            </button>
          </div>
        </header>

        <div className="admin-content" id="admin-content" ref={contentRef}></div>
      </div>

      <div className="toast-container" id="toast-container"></div>

      <div className="modal-overlay" id="modal-overlay">
        <div className="modal" id="modal">
          <div className="modal-header">
            <h3 className="modal-title" id="modal-title">
              Modal
            </h3>
            <button className="modal-close" id="modal-close" aria-label="Close">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div className="modal-body" id="modal-body"></div>
          <div className="modal-footer" id="modal-footer"></div>
        </div>
      </div>
    </div>
  );
}
