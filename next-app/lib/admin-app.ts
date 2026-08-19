// @ts-nocheck
import MBSCMS from "@/lib/cms-store";

var content: any = null;
var currentRoute = '';

  /* ================================================================
     HELPERS
     ================================================================ */

  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
  }

  function formatPrice(num) {
    if (num === null || num === undefined) return 'Rs. 0';
    return 'Rs. ' + Number(num).toLocaleString();
  }

  function formatDate(iso) {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('en-PK', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function generateId(prefix) {
    return MBSCMS.generateId(prefix);
  }

  function toSlug(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  function refresh() {
    content = MBSCMS.getAll();
  }

  function getVal(path) {
    return MBSCMS.get(path);
  }

  function setVal(path, value) {
    MBSCMS.set(path, value);
  }

  /* ================================================================
     TOAST
     ================================================================ */

  function showToast(message, type) {
    type = type || 'info';
    var container = document.getElementById('toast-container');
    if (!container) return;
    var toast = document.createElement('div');
    toast.className = 'toast toast--' + type;
    var icon = '';
    if (type === 'success') {
      icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    } else if (type === 'error') {
      icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    } else {
      icon = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }
    toast.innerHTML = icon + '<span>' + escapeHTML(message) + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3000);
  }

  /* ================================================================
     MODAL
     ================================================================ */

  function showModal(title, bodyHTML, footerButtons) {
    var overlay = document.getElementById('modal-overlay');
    var titleEl = document.getElementById('modal-title');
    var bodyEl = document.getElementById('modal-body');
    var footerEl = document.getElementById('modal-footer');
    if (!overlay) return;
    titleEl.textContent = title;
    bodyEl.innerHTML = bodyHTML;
    footerEl.innerHTML = '';
    if (footerButtons && footerButtons.length) {
      footerButtons.forEach(function (btn) {
        var button = document.createElement('button');
        button.className = 'btn ' + (btn.className || 'btn--outline');
        button.textContent = btn.label;
        if (btn.onClick) button.addEventListener('click', btn.onClick);
        footerEl.appendChild(button);
      });
    }
    overlay.classList.add('active');
  }

  function closeModal() {
    var overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
  }

  /* ================================================================
     SIDEBAR
     ================================================================ */

  var SIDEBAR_SECTIONS = [
    {
      title: 'MAIN',
      links: [
        { label: 'Dashboard', hash: '#/', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
        { label: 'View Site', href: '/', external: true, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' }
      ]
    },
    {
      title: 'WEBSITE',
      links: [
        { label: 'Website Content', hash: '#/website', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>' },
        { label: 'Navigation', hash: '#/navigation', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>' },
        { label: 'Pages', hash: '#/pages', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' },
        { label: 'Sections', hash: '#/sections', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/></svg>' }
      ]
    },
    {
      title: 'HOMEPAGE',
      links: [
        { label: 'Homepage CMS', hash: '#/homepage', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' },
        { label: 'Hero Editor', hash: '#/hero', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
        { label: 'Footer', hash: '#/footer', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="9" y1="21" x2="15" y2="21"/></svg>' }
      ]
    },
    {
      title: 'CATALOG',
      links: [
        { label: 'Products', hash: '#/products', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
        { label: 'Categories', hash: '#/categories', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>' }
      ]
    },
    {
      title: 'CONTENT',
      links: [
        { label: 'Media Library', hash: '#/media', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>' },
        { label: 'Social Links', hash: '#/social', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>' },
        { label: 'Contact Info', hash: '#/contact', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>' }
      ]
    },
    {
      title: 'MANAGEMENT',
      links: [
        { label: 'Orders', hash: '#/orders', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>' },
        { label: 'Customers', hash: '#/customers', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>' }
      ]
    },
    {
      title: 'SYSTEM',
      links: [
        { label: 'Design Settings', hash: '#/settings', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' },
        { label: 'SEO', hash: '#/seo', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' }
      ]
    }
  ];

  function renderSidebar() {
    sidebarEl = document.getElementById('sidebar-nav');
    if (!sidebarEl) return;
    var html = '';
    SIDEBAR_SECTIONS.forEach(function (section) {
      html += '<div class="sidebar-section">';
      html += '<div class="sidebar-section-title">' + escapeHTML(section.title) + '</div>';
      section.links.forEach(function (link) {
        var isActive = false;
        if (link.hash) {
          isActive = (link.hash === '#/' && (currentRoute === '' || currentRoute === '/' || currentRoute === '/dashboard')) ||
                     (link.hash !== '#/' && currentRoute.indexOf(link.hash.replace('#', '')) === 0 && (currentRoute === link.hash.replace('#', '') || link.hash === '#/' || link.hash.indexOf('#/' + currentRoute.split('/')[1]) === 0));
          if (link.hash === '#/' || link.hash === '#/dashboard') {
            isActive = currentRoute === '' || currentRoute === '/' || currentRoute === '/dashboard';
          } else {
            var routeBase = link.hash.replace('#', '');
            isActive = currentRoute === routeBase;
          }
        }
        var activeClass = isActive ? ' active' : '';
        if (link.external) {
          html += '<a href="' + escapeHTML(link.href) + '" class="sidebar-link' + activeClass + '" target="_blank">' + link.icon + '<span>' + escapeHTML(link.label) + '</span></a>';
        } else {
          html += '<a href="' + escapeHTML(link.hash) + '" class="sidebar-link' + activeClass + '">' + link.icon + '<span>' + escapeHTML(link.label) + '</span></a>';
        }
      });
      html += '</div>';
    });
    sidebarEl.innerHTML = html;
  }

  /* ================================================================
     ROUTER
     ================================================================ */

  function getRouteParts() {
    var hash = window.location.hash || '#/';
    var clean = hash.replace('#', '');
    if (clean === '' || clean === '/') return { base: '/dashboard', param: null };
    var parts = clean.split('/').filter(Boolean);
    var base = '/' + (parts[0] || '');
    var param = parts[1] || null;
    return { base: base, param: param, full: clean, parts: parts };
  }

  function setupRouter() {
    window.addEventListener('hashchange', handleRoute);
  }

  function handleRoute() {
    var route = getRouteParts();
    var full = route.full || '/dashboard';
    currentRoute = full;
    removePageListeners();
    refresh();
    renderSidebar();

    var contentArea = document.getElementById('admin-content');
    var titleEl = document.getElementById('page-title');
    if (!contentArea) return;

    var html = '';
    var title = 'Dashboard';

    if (full === '/' || full === '/dashboard' || full === '') {
      title = 'Dashboard';
      html = renderDashboard();
    } else if (full === '/website') {
      title = 'Website Content';
      html = renderWebsiteContent();
    } else if (full === '/homepage') {
      title = 'Homepage CMS';
      html = renderHomepageCMS();
    } else if (full === '/hero') {
      title = 'Hero Editor';
      html = renderHeroEditor();
    } else if (full === '/navigation') {
      title = 'Navigation Management';
      html = renderNavigation();
    } else if (full === '/pages') {
      title = 'Pages Management';
      html = renderPages();
    } else if (full === '/sections') {
      title = 'Section Management';
      html = renderSections();
    } else if (full === '/products') {
      title = 'Products';
      html = renderProducts();
    } else if (full === '/products/add') {
      title = 'Add Product';
      html = renderProductForm(null);
    } else if (full.indexOf('/products/edit/') === 0) {
      var pid = route.parts[2] || null;
      title = 'Edit Product';
      html = renderProductForm(pid);
    } else if (full === '/categories') {
      title = 'Categories';
      html = renderCategories();
    } else if (full === '/categories/add') {
      title = 'Add Category';
      html = renderCategoryForm(null);
    } else if (full.indexOf('/categories/edit/') === 0) {
      var cid = route.parts[2] || null;
      title = 'Edit Category';
      html = renderCategoryForm(cid);
    } else if (full === '/media') {
      title = 'Media Library';
      html = renderMedia();
    } else if (full === '/orders') {
      title = 'Orders';
      html = renderOrders();
    } else if (full === '/customers') {
      title = 'Customers';
      html = renderCustomers();
    } else if (full === '/social') {
      title = 'Social Links';
      html = renderSocial();
    } else if (full === '/contact') {
      title = 'Contact Information';
      html = renderContact();
    } else if (full === '/footer') {
      title = 'Footer Management';
      html = renderFooter();
    } else if (full === '/settings') {
      title = 'Design Settings';
      html = renderDesignSettings();
    } else if (full === '/seo') {
      title = 'SEO Management';
      html = renderSEO();
    } else {
      title = 'Not Found';
      html = '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg><h3 class="empty-state__title">Page Not Found</h3><p class="empty-state__text">The page you are looking for does not exist.</p></div>';
    }

    contentArea.innerHTML = html;
    if (titleEl) titleEl.textContent = title;
    window.scrollTo(0, 0);
    attachPageListeners();
  }

  function navigateTo(hash) {
    window.location.hash = hash;
  }

  /* ================================================================
     PAGE: DASHBOARD
     ================================================================ */

  function renderDashboard() {
    var products = MBSCMS.getProducts();
    var categories = MBSCMS.getCategories();
    var orders = getVal('orders') || [];
    var customers = getVal('customers') || [];

    var html = '';
    html += '<div class="stats-grid">';
    html += '<div class="stat-card"><div class="stat-card__icon stat-card__icon--gold"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div><div class="stat-card__value">' + products.length + '</div><div class="stat-card__label">Total Products</div></div>';
    html += '<div class="stat-card"><div class="stat-card__icon stat-card__icon--dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></div><div class="stat-card__value">' + categories.length + '</div><div class="stat-card__label">Total Categories</div></div>';
    html += '<div class="stat-card"><div class="stat-card__icon stat-card__icon--green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg></div><div class="stat-card__value">' + orders.length + '</div><div class="stat-card__label">Total Orders</div></div>';
    html += '<div class="stat-card"><div class="stat-card__icon stat-card__icon--blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg></div><div class="stat-card__value">' + customers.length + '</div><div class="stat-card__label">Total Customers</div></div>';
    html += '</div>';

    html += '<div class="mt-24">';
    html += '<div class="card"><div class="card-header"><h3 class="card-title">Recent Orders</h3></div><div class="card-body">';
    if (orders.length === 0) {
      html += '<div class="empty-state" style="padding:40px 20px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><h3 class="empty-state__title">No orders yet</h3><p class="empty-state__text">Orders will appear here once customers start purchasing.</p></div>';
    } else {
      html += '<p class="text-muted">You have ' + orders.length + ' order(s).</p>';
    }
    html += '</div></div>';
    html += '</div>';

    html += '<div class="mt-24">';
    html += '<h2 style="font-family:\'Cormorant Garamond\',serif;font-size:22px;margin-bottom:16px">Quick Actions</h2>';
    html += '<div class="quick-actions">';
    html += '<a href="#/products/add" class="quick-action"><div class="quick-action__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div><span class="quick-action__label">Add Product</span></a>';
    html += '<a href="#/categories/add" class="quick-action"><div class="quick-action__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></div><span class="quick-action__label">Add Category</span></a>';
    html += '<a href="#/homepage" class="quick-action"><div class="quick-action__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div><span class="quick-action__label">Edit Homepage</span></a>';
    html += '<a href="#/media" class="quick-action"><div class="quick-action__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></div><span class="quick-action__label">Upload Media</span></a>';
    html += '<a href="#/navigation" class="quick-action"><div class="quick-action__icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg></div><span class="quick-action__label">Manage Navigation</span></a>';
    html += '</div></div>';

    return html;
  }

  /* ================================================================
     PAGE: WEBSITE CONTENT
     ================================================================ */

  function renderWebsiteContent() {
    var site = getVal('site') || {};
    var html = '';
    html += '<div class="card"><div class="card-body">';
    html += '<div class="form-group"><label class="form-label">Site Name</label><input type="text" class="form-input" id="site-name" value="' + escapeHTML(site.name || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Tagline</label><input type="text" class="form-input" id="site-tagline" value="' + escapeHTML(site.tagline || '') + '"></div>';
    html += imageInputWithUpload('site-logo', 'Logo URL', site.logo);

    html += '<hr style="border:none;border-top:1px solid var(--admin-border);margin:24px 0">';
    html += '<h3 style="font-size:16px;font-weight:600;margin-bottom:16px">Announcement Bar</h3>';
    var ann = site.announcement || {};
    html += '<div class="form-group"><label class="form-label">Text</label><input type="text" class="form-input" id="ann-text" value="' + escapeHTML(ann.text || '') + '"></div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Link Text</label><input type="text" class="form-input" id="ann-link-text" value="' + escapeHTML(ann.linkText || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Link URL</label><input type="text" class="form-input" id="ann-link-url" value="' + escapeHTML(ann.linkUrl || '') + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label class="form-label">Enabled</label><label class="toggle"><input type="checkbox" id="ann-enabled"' + (ann.enabled ? ' checked' : '') + '><span class="toggle__slider"></span></label></div>';

    html += '<hr style="border:none;border-top:1px solid var(--admin-border);margin:24px 0">';
    html += '<h3 style="font-size:16px;font-weight:600;margin-bottom:16px">Contact</h3>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Phone</label><input type="text" class="form-input" id="site-phone" value="' + escapeHTML(site.contactPhone || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Email</label><input type="text" class="form-input" id="site-email" value="' + escapeHTML(site.email || '') + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label class="form-label">Address</label><textarea class="form-textarea" id="site-address">' + escapeHTML(site.address || '') + '</textarea></div>';
    html += '<div class="form-group"><label class="form-label">Business Hours</label><input type="text" class="form-input" id="site-hours" value="' + escapeHTML(site.businessHours || '') + '"></div>';

    html += '<hr style="border:none;border-top:1px solid var(--admin-border);margin:24px 0">';
    html += '<div class="form-group"><label class="form-label">WhatsApp Number</label><input type="text" class="form-input" id="site-whatsapp" value="' + escapeHTML(site.whatsappNumber || '') + '"></div>';

    html += '<div class="flex-between mt-24"><div></div><button class="btn btn--primary" id="save-website-content">Save Changes</button></div>';
    html += '</div></div>';
    return html;
  }

  /* ================================================================
     PAGE: HOMEPAGE CMS
     ================================================================ */

  function renderHomepageCMS() {
    var hp = getVal('homepage') || {};
    var sections = [
      { key: 'hero', name: 'Hero' },
      { key: 'categories', name: 'Categories' },
      { key: 'featured', name: 'Featured Collection' },
      { key: 'editorial', name: 'Editorial Banner' },
      { key: 'brandStory', name: 'Brand Story' },
      { key: 'whyMbs', name: 'Why MBS' },
      { key: 'signature', name: 'Signature Collection' },
      { key: 'social', name: 'Social Section' },
      { key: 'whatsappCta', name: 'WhatsApp CTA' }
    ];

    var html = '';
    html += '<div class="page-header"><div><p class="page-subtitle">Manage all homepage sections. Enable/disable, reorder, and edit content.</p></div></div>';

    sections.forEach(function (sec) {
      var data = hp[sec.key] || {};
      var enabled = data.enabled !== false;
      var order = data.order || '—';
      html += '<div class="section-editor" data-section="' + sec.key + '">';
      html += '<div class="section-editor__header" onclick="window.__adminToggleSection(\'' + sec.key + '\')">';
      html += '<div class="section-editor__title">';
      html += '<span class="badge ' + (enabled ? 'badge--active' : 'badge--inactive') + '">' + (enabled ? 'Enabled' : 'Disabled') + '</span>';
      html += escapeHTML(sec.name);
      html += ' <span class="text-muted" style="font-weight:400;font-size:13px">(Order: ' + order + ')</span>';
      html += '</div>';
      html += '<div class="flex gap-8">';
      if (sec.key === 'hero') {
        html += '<a href="#/hero" class="btn btn--sm btn--outline" onclick="event.stopPropagation()">Edit</a>';
      }
      html += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transition:transform 0.2s" id="chevron-' + sec.key + '"><polyline points="6 9 12 15 18 9"/></svg>';
      html += '</div></div>';
      html += '<div class="section-editor__body" id="section-body-' + sec.key + '">';
      html += renderSectionForm(sec.key, sec.name, data);
      html += '</div>';
      html += '</div>';
    });

    return html;
  }

  function renderSectionForm(key, name, data) {
    var html = '';
    html += '<div class="form-group"><label class="form-label">Eyebrow</label><input type="text" class="form-input cms-section-field" data-section="' + key + '" data-field="eyebrow" value="' + escapeHTML(data.eyebrow || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Heading</label><input type="text" class="form-input cms-section-field" data-section="' + key + '" data-field="heading" value="' + escapeHTML(data.heading || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Order</label><input type="number" class="form-input cms-section-field" data-section="' + key + '" data-field="order" value="' + escapeHTML(data.order || '') + '" min="0"></div>';
    if (key === 'brandStory') {
      html += '<div class="form-group"><label class="form-label">Text</label><textarea class="form-textarea cms-section-field" data-section="' + key + '" data-field="text">' + escapeHTML(data.text || '') + '</textarea></div>';
      html += '<div class="form-group"><label class="form-label">Text 2</label><textarea class="form-textarea cms-section-field" data-section="' + key + '" data-field="text2">' + escapeHTML(data.text2 || '') + '</textarea></div>';
    } else if (key !== 'whyMbs' && key !== 'social') {
      html += '<div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea cms-section-field" data-section="' + key + '" data-field="description">' + escapeHTML(data.description || '') + '</textarea></div>';
    }
    if (data.buttonText !== undefined) {
      html += '<div class="form-row">';
      html += '<div class="form-group"><label class="form-label">Button Text</label><input type="text" class="form-input cms-section-field" data-section="' + key + '" data-field="buttonText" value="' + escapeHTML(data.buttonText || '') + '"></div>';
      html += '<div class="form-group"><label class="form-label">Button URL</label><input type="text" class="form-input cms-section-field" data-section="' + key + '" data-field="buttonUrl" value="' + escapeHTML(data.buttonUrl || '') + '"></div>';
      html += '</div>';
    }
    if (data.image !== undefined) {
      var imgId = 'section-img-' + key;
      html += '<div class="form-group"><label class="form-label">Image</label>';
      html += '<div class="image-input-row">';
      html += '<input type="text" class="form-input cms-section-field" data-section="' + key + '" data-field="image" value="' + escapeHTML(data.image || '') + '" placeholder="Enter image URL or upload..." style="flex:1" id="' + imgId + '">';
      html += '<button type="button" class="btn btn--sm btn--outline upload-trigger-btn" data-target="' + imgId + '" title="Upload from PC"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Upload</button>';
      html += '<button type="button" class="btn btn--sm btn--primary browse-trigger-btn" data-target="' + imgId + '" title="Pick from media library"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Browse</button>';
      html += '</div>';
      if (data.image) {
        html += '<div class="mt-8"><img src="' + escapeHTML(data.image) + '" class="image-preview image-preview--lg" onerror="this.style.display=\'none\'"></div>';
      }
      html += '</div>';
    }
    html += '<div class="form-group"><label class="form-label">Enabled</label><label class="toggle"><input type="checkbox" class="cms-section-toggle" data-section="' + key + '"' + (data.enabled !== false ? ' checked' : '') + '><span class="toggle__slider"></span></label></div>';
    if (key === 'whyMbs') {
      var trustBlocks = data.blocks || [];
      html += '<div class="form-group"><label class="form-label" style="font-weight:600;margin-top:8px">Trust Blocks</label>';
      html += '<div id="whyMbs-blocks">';
      for (var bi = 0; bi < trustBlocks.length; bi++) {
        var block = trustBlocks[bi];
        html += '<div class="card" style="padding:16px;margin-bottom:12px;background:var(--admin-surface-alt)">';
        html += '<div class="form-group"><label class="form-label">Title</label><input type="text" class="form-input cms-section-field" data-section="' + key + '" data-field="blocks.' + bi + '.title" value="' + escapeHTML(block.title || '') + '"></div>';
        html += '<div class="form-group"><label class="form-label">Text</label><textarea class="form-textarea cms-section-field" data-section="' + key + '" data-field="blocks.' + bi + '.text">' + escapeHTML(block.text || '') + '</textarea></div>';
        html += '</div>';
      }
      html += '</div></div>';
    }
    html += '<div class="flex-between"><div></div><button class="btn btn--primary btn--sm cms-section-save" data-section="' + key + '">Save ' + escapeHTML(name) + '</button></div>';
    return html;
  }

  /* ================================================================
     PAGE: HERO EDITOR
     ================================================================ */

  function renderHeroEditor() {
    var hero = getVal('homepage.hero') || {};
    var html = '';
    html += '<div class="card"><div class="card-body">';
    html += '<div class="form-group"><label class="form-label">Eyebrow</label><input type="text" class="form-input" id="hero-eyebrow" value="' + escapeHTML(hero.eyebrow || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Heading</label><input type="text" class="form-input" id="hero-heading" value="' + escapeHTML(hero.heading || '') + '"><p class="form-hint">Use &lt;br&gt; for line break</p></div>';
    html += '<div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="hero-description">' + escapeHTML(hero.description || '') + '</textarea></div>';

    html += '<h3 style="font-size:16px;font-weight:600;margin:20px 0 12px">Primary Button</h3>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Button Text</label><input type="text" class="form-input" id="hero-primary-text" value="' + escapeHTML(hero.primaryButtonText || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Button URL</label><input type="text" class="form-input" id="hero-primary-url" value="' + escapeHTML(hero.primaryButtonUrl || '') + '"></div>';
    html += '</div>';

    html += '<h3 style="font-size:16px;font-weight:600;margin:20px 0 12px">Secondary Button</h3>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Button Text</label><input type="text" class="form-input" id="hero-secondary-text" value="' + escapeHTML(hero.secondaryButtonText || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Button URL</label><input type="text" class="form-input" id="hero-secondary-url" value="' + escapeHTML(hero.secondaryButtonUrl || '') + '"></div>';
    html += '</div>';

    html += '<h3 style="font-size:16px;font-weight:600;margin:20px 0 12px">Images</h3>';
    html += imageInputWithUpload('hero-image', 'Hero Image', hero.image);
    html += imageInputWithUpload('hero-mobile-image', 'Mobile Hero Image', hero.mobileImage);

    html += '<div class="form-group"><label class="form-label">Overlay Opacity: <strong id="hero-overlay-val">' + (hero.overlay !== undefined ? hero.overlay : 0.4) + '</strong></label><input type="range" id="hero-overlay" min="0" max="1" step="0.1" value="' + (hero.overlay !== undefined ? hero.overlay : 0.4) + '" style="width:100%"></div>';
    html += '<div class="form-group"><label class="form-label">Enabled</label><label class="toggle"><input type="checkbox" id="hero-enabled"' + (hero.enabled !== false ? ' checked' : '') + '><span class="toggle__slider"></span></label></div>';

    html += '<div class="flex-between mt-24"><a href="#/homepage" class="btn btn--outline">Cancel</a><button class="btn btn--primary" id="save-hero">Save Hero</button></div>';
    html += '</div></div>';
    return html;
  }

  /* ================================================================
     PAGE: NAVIGATION
     ================================================================ */

  function renderNavigation() {
    var navItems = MBSCMS.getNavigation();
    var html = '';
    html += '<div class="page-header"><div><p class="page-subtitle">Manage your site navigation links.</p></div><button class="btn btn--primary" id="add-nav-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Link</button></div>';
    html += '<div class="card"><div class="table-wrapper"><table>';
    html += '<thead><tr><th>Label</th><th>URL</th><th>Order</th><th>Enabled</th><th>Actions</th></tr></thead>';
    html += '<tbody>';
    if (navItems.length === 0) {
      html += '<tr><td colspan="5" class="text-muted" style="text-align:center;padding:32px">No navigation items.</td></tr>';
    }
    navItems.forEach(function (item) {
      html += '<tr>';
      html += '<td><strong>' + escapeHTML(item.label) + '</strong></td>';
      html += '<td class="text-muted">' + escapeHTML(item.url) + '</td>';
      html += '<td>' + (item.order || '—') + '</td>';
      html += '<td>' + (item.enabled ? '<span class="badge badge--active">Enabled</span>' : '<span class="badge badge--inactive">Disabled</span>') + '</td>';
      html += '<td><div class="table-actions">';
      html += '<button class="btn btn--sm btn--outline edit-nav-btn" data-id="' + escapeHTML(item.id) + '">Edit</button>';
      html += '<button class="btn btn--sm btn--danger delete-nav-btn" data-id="' + escapeHTML(item.id) + '" data-label="' + escapeHTML(item.label) + '">Delete</button>';
      html += '</div></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  }

  /* ================================================================
     PAGE: PAGES MANAGEMENT
     ================================================================ */

  function renderPages() {
    var pages = [
      { key: 'about', label: 'Our Story', desc: 'About page content' },
      { key: 'contact', label: 'Contact', desc: 'Contact page content' }
    ];
    var html = '';
    html += '<div class="page-header"><div><p class="page-subtitle">Manage page content and metadata.</p></div></div>';
    pages.forEach(function (page) {
      var pageData = getVal('pages.' + page.key) || {};
      html += '<div class="section-editor">';
      html += '<div class="section-editor__header" onclick="window.__adminTogglePage(\'' + page.key + '\')">';
      html += '<div class="section-editor__title">' + escapeHTML(page.label) + ' <span class="text-muted" style="font-weight:400;font-size:13px">— ' + escapeHTML(page.desc) + '</span></div>';
      html += '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" id="page-chevron-' + page.key + '"><polyline points="6 9 12 15 18 9"/></svg>';
      html += '</div>';
      html += '<div class="section-editor__body" id="page-body-' + page.key + '">';
      html += '<div class="form-group"><label class="form-label">Page Title / Heading</label><input type="text" class="form-input page-field" data-page="' + page.key + '" data-field="heading" value="' + escapeHTML(pageData.heading || '') + '"></div>';
      html += '<div class="form-group"><label class="form-label">Subheading</label><input type="text" class="form-input page-field" data-page="' + page.key + '" data-field="subheading" value="' + escapeHTML(pageData.subheading || '') + '"></div>';
      html += '<div class="form-group"><label class="form-label">Content</label><textarea class="form-textarea page-field" data-page="' + page.key + '" data-field="content" style="min-height:150px">' + escapeHTML(pageData.content || '') + '</textarea></div>';
      html += '<div class="flex-between"><div></div><button class="btn btn--primary btn--sm save-page-btn" data-page="' + page.key + '">Save Page</button></div>';
      html += '</div></div>';
    });
    return html;
  }

  /* ================================================================
     PAGE: SECTIONS MANAGEMENT
     ================================================================ */

  function renderSections() {
    var hp = getVal('homepage') || {};
    var sections = [
      { key: 'hero', name: 'Hero', link: '#/hero' },
      { key: 'categories', name: 'Categories', link: null },
      { key: 'featured', name: 'Featured Collection', link: null },
      { key: 'editorial', name: 'Editorial Banner', link: null },
      { key: 'brandStory', name: 'Brand Story', link: null },
      { key: 'whyMbs', name: 'Why MBS', link: null },
      { key: 'signature', name: 'Signature Collection', link: null },
      { key: 'social', name: 'Social Section', link: null },
      { key: 'whatsappCta', name: 'WhatsApp CTA', link: null }
    ];
    var html = '';
    html += '<div class="page-header"><div><p class="page-subtitle">Overview of all homepage sections.</p></div></div>';
    html += '<div class="card"><div class="table-wrapper"><table>';
    html += '<thead><tr><th>Section</th><th>Enabled</th><th>Order</th><th>Actions</th></tr></thead>';
    html += '<tbody>';
    sections.forEach(function (sec) {
      var data = hp[sec.key] || {};
      html += '<tr>';
      html += '<td><strong>' + escapeHTML(sec.name) + '</strong></td>';
      html += '<td>' + (data.enabled !== false ? '<span class="badge badge--active">Enabled</span>' : '<span class="badge badge--inactive">Disabled</span>') + '</td>';
      html += '<td>' + (data.order || '—') + '</td>';
      html += '<td><div class="table-actions">';
      if (sec.link) {
        html += '<a href="' + sec.link + '" class="btn btn--sm btn--outline">Edit</a>';
      } else {
        html += '<a href="#/homepage" class="btn btn--sm btn--outline">Edit</a>';
      }
      html += '</div></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  }

  /* ================================================================
     PAGE: PRODUCTS LIST
     ================================================================ */

  function renderProducts() {
    var products = MBSCMS.getProducts();
    var categories = MBSCMS.getCategories();
    var catMap = {};
    categories.forEach(function (c) { catMap[c.id] = c.name; });

    var html = '';
    html += '<div class="page-header"><div><p class="page-subtitle">Manage your product catalog.</p></div><a href="#/products/add" class="btn btn--primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Product</a></div>';

    html += '<div class="card">';
    html += '<div class="card-body" style="padding-bottom:12px">';
    html += '<div class="flex gap-16" style="flex-wrap:wrap">';
    html += '<div class="search-bar" style="flex:1;min-width:200px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="text" class="form-input" id="product-search" placeholder="Search products..."></div>';
    html += '<div style="min-width:180px"><select class="form-select" id="product-category-filter"><option value="">All Categories</option>';
    categories.forEach(function (c) {
      html += '<option value="' + escapeHTML(c.id) + '">' + escapeHTML(c.name) + '</option>';
    });
    html += '</select></div>';
    html += '</div></div>';

    html += '<div class="table-wrapper"><table id="products-table">';
    html += '<thead><tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Badge</th><th>Featured</th><th>Status</th><th>Actions</th></tr></thead>';
    html += '<tbody>';
    if (products.length === 0) {
      html += '<tr><td colspan="8" class="text-muted" style="text-align:center;padding:32px">No products yet. Click "Add Product" to create one.</td></tr>';
    }
    products.forEach(function (p) {
      html += '<tr data-product-id="' + escapeHTML(p.id) + '" data-name="' + escapeHTML((p.name || '').toLowerCase()) + '" data-category="' + escapeHTML(p.category || '') + '">';
      html += '<td><img src="' + escapeHTML(p.image || '') + '" class="image-preview" onerror="this.src=\'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%2280%22><rect fill=%22%23eee%22 width=%2280%22 height=%2280%22/></svg>\'"></td>';
      html += '<td><strong>' + escapeHTML(p.name) + '</strong><div class="text-muted" style="font-size:12px">' + escapeHTML(p.sku || '') + '</div></td>';
      html += '<td>' + escapeHTML(catMap[p.category] || p.category || '—') + '</td>';
      html += '<td>';
      if (p.salePrice && p.salePrice < p.price) {
        html += '<span style="text-decoration:line-through;color:var(--admin-text-muted)">' + formatPrice(p.price) + '</span> <strong class="text-danger">' + formatPrice(p.salePrice) + '</strong>';
      } else {
        html += '<strong>' + formatPrice(p.price) + '</strong>';
      }
      html += '</td>';
      html += '<td>' + (p.badge ? '<span class="badge badge--featured">' + escapeHTML(p.badge) + '</span>' : '—') + '</td>';
      html += '<td>' + (p.featured ? '<span class="badge badge--featured">Featured</span>' : '—') + '</td>';
      html += '<td>' + (p.status === 'active' ? '<span class="badge badge--active">Active</span>' : '<span class="badge badge--inactive">Draft</span>') + '</td>';
      html += '<td><div class="table-actions">';
      html += '<a href="#/products/edit/' + escapeHTML(p.id) + '" class="btn btn--sm btn--outline">Edit</a>';
      html += '<button class="btn btn--sm btn--outline duplicate-product-btn" data-id="' + escapeHTML(p.id) + '">Duplicate</button>';
      html += '<button class="btn btn--sm btn--danger delete-product-btn" data-id="' + escapeHTML(p.id) + '" data-name="' + escapeHTML(p.name) + '">Delete</button>';
      html += '</div></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  }

  /* ================================================================
     PAGE: PRODUCT FORM (ADD/EDIT)
     ================================================================ */

  function renderProductForm(productId) {
    var product = null;
    if (productId) {
      product = MBSCMS.getProduct(productId);
    }
    var isEdit = !!product;
    var categories = MBSCMS.getCategories();

    var name = product ? product.name : '';
    var slug = product ? product.slug : '';
    var category = product ? product.category : '';
    var description = product ? product.description : '';
    var shortDesc = product ? product.shortDescription : '';
    var status = product ? product.status : 'active';
    var featured = product ? product.featured : false;
    var bestSeller = product ? product.bestSeller : false;
    var badge = product ? (product.badge || '') : '';
    var price = product ? product.price : '';
    var salePrice = product ? (product.salePrice || '') : '';
    var sku = product ? (product.sku || '') : '';
    var stock = product ? (product.stock || 0) : 0;
    var image = product ? (product.image || '') : '';
    var images = product ? (product.images || []) : [];
    var variants = product ? (product.variants || []) : [];

    var html = '';
    html += '<div class="card">';

    html += '<div class="tabs" id="product-tabs">';
    html += '<button class="tab active" data-tab="general">General</button>';
    html += '<button class="tab" data-tab="pricing">Pricing & Inventory</button>';
    html += '<button class="tab" data-tab="images">Images</button>';
    html += '<button class="tab" data-tab="variants">Variants</button>';
    html += '</div>';

    html += '<div class="card-body">';

    html += '<div class="tab-content active" id="tab-general">';
    html += '<div class="form-group"><label class="form-label">Product Name</label><input type="text" class="form-input" id="prod-name" value="' + escapeHTML(name) + '"></div>';
    html += '<div class="form-group"><label class="form-label">Slug</label><input type="text" class="form-input" id="prod-slug" value="' + escapeHTML(slug) + '"><p class="form-hint">Auto-generated from name. Edit if needed.</p></div>';
    html += '<div class="form-group"><label class="form-label">Category</label><select class="form-select" id="prod-category"><option value="">Select category</option>';
    categories.forEach(function (c) {
      html += '<option value="' + escapeHTML(c.id) + '"' + (c.id === category ? ' selected' : '') + '>' + escapeHTML(c.name) + '</option>';
    });
    html += '</select></div>';
    html += '<div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="prod-description">' + escapeHTML(description) + '</textarea></div>';
    html += '<div class="form-group"><label class="form-label">Short Description</label><textarea class="form-textarea" id="prod-short-description" style="min-height:60px">' + escapeHTML(shortDesc) + '</textarea></div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Status</label><select class="form-select" id="prod-status"><option value="active"' + (status === 'active' ? ' selected' : '') + '>Active</option><option value="draft"' + (status === 'draft' ? ' selected' : '') + '>Draft</option></select></div>';
    html += '<div class="form-group"><label class="form-label">Badge</label><select class="form-select" id="prod-badge"><option value=""' + (!badge ? ' selected' : '') + '>None</option><option value="Sale"' + (badge === 'Sale' ? ' selected' : '') + '>Sale</option><option value="New"' + (badge === 'New' ? ' selected' : '') + '>New</option><option value="Bestseller"' + (badge === 'Bestseller' ? ' selected' : '') + '>Bestseller</option><option value="Popular"' + (badge === 'Popular' ? ' selected' : '') + '>Popular</option></select></div>';
    html += '</div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Featured</label><label class="toggle"><input type="checkbox" id="prod-featured"' + (featured ? ' checked' : '') + '><span class="toggle__slider"></span></label></div>';
    html += '<div class="form-group"><label class="form-label">Best Seller</label><label class="toggle"><input type="checkbox" id="prod-bestseller"' + (bestSeller ? ' checked' : '') + '><span class="toggle__slider"></span></label></div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="tab-content" id="tab-pricing">';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Price (Rs.)</label><input type="number" class="form-input" id="prod-price" value="' + escapeHTML(price) + '" min="0"></div>';
    html += '<div class="form-group"><label class="form-label">Sale Price (Rs.)</label><input type="number" class="form-input" id="prod-sale-price" value="' + escapeHTML(salePrice) + '" min="0"><p class="form-hint">Leave empty if no sale price.</p></div>';
    html += '</div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">SKU</label><input type="text" class="form-input" id="prod-sku" value="' + escapeHTML(sku) + '"></div>';
    html += '<div class="form-group"><label class="form-label">Stock</label><input type="number" class="form-input" id="prod-stock" value="' + escapeHTML(stock) + '" min="0"></div>';
    html += '</div>';
    html += '</div>';

    html += '<div class="tab-content" id="tab-images">';
    html += imageInputWithUpload('prod-main-image', 'Main Image', image);
    html += '<div class="form-group"><label class="form-label">Gallery Images</label><div id="gallery-images-list">';
    images.forEach(function (img, i) {
      html += '<div class="flex gap-8 mb-8 gallery-item" style="align-items:center">';
      html += '<img src="' + escapeHTML(img) + '" class="image-preview" onerror="this.style.display=\'none\'">';
      html += '<input type="text" class="form-input gallery-url-input" value="' + escapeHTML(img) + '" placeholder="Enter image URL" style="flex:1">';
      html += '<button type="button" class="btn btn--sm btn--outline gallery-upload-btn" data-gallery-index="' + i + '" title="Upload from PC"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></button>';
      html += '<button class="btn btn--sm btn--danger remove-gallery-btn" data-index="' + i + '">Remove</button>';
      html += '</div>';
    });
    html += '</div>';
    html += '<button class="btn btn--sm btn--outline mt-8" id="add-gallery-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Image</button>';
    html += '</div>';

    html += '<div class="tab-content" id="tab-variants">';
    html += '<div id="variants-list">';
    variants.forEach(function (v, i) {
      html += renderVariantRow(v, i);
    });
    html += '</div>';
    html += '<button class="btn btn--sm btn--outline mt-16" id="add-variant-btn"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Variant</button>';
    html += '</div>';

    html += '</div>';

    html += '<div class="card-footer flex-between">';
    html += '<a href="#/products" class="btn btn--outline">Cancel</a>';
    html += '<button class="btn btn--primary" id="save-product-btn" data-id="' + escapeHTML(productId || '') + '">' + (isEdit ? 'Update Product' : 'Save Product') + '</button>';
    html += '</div>';
    html += '</div>';
    return html;
  }

  function renderVariantRow(v, index) {
    var html = '';
    html += '<div class="flex gap-8 mb-12 variant-row" style="align-items:flex-end;flex-wrap:wrap">';
    html += '<div class="form-group mb-0" style="flex:1;min-width:120px"><label class="form-label">Name</label><input type="text" class="form-input variant-name" value="' + escapeHTML(v.name || '') + '"></div>';
    html += '<div class="form-group mb-0" style="flex:1;min-width:120px"><label class="form-label">Value</label><input type="text" class="form-input variant-value" value="' + escapeHTML(v.value || '') + '"></div>';
    html += '<div class="form-group mb-0" style="flex:1;min-width:100px"><label class="form-label">Price</label><input type="number" class="form-input variant-price" value="' + escapeHTML(v.price || '') + '" min="0"></div>';
    html += '<div class="form-group mb-0" style="flex:1;min-width:80px"><label class="form-label">Stock</label><input type="number" class="form-input variant-stock" value="' + escapeHTML(v.stock || 0) + '" min="0"></div>';
    html += '<div class="form-group mb-0" style="flex:1;min-width:100px"><label class="form-label">Status</label><select class="form-select variant-status"><option value="active"' + (v.status === 'active' || !v.status ? ' selected' : '') + '>Active</option><option value="draft"' + (v.status === 'draft' ? ' selected' : '') + '>Draft</option></select></div>';
    html += '<div class="form-group mb-0" style="padding-top:22px"><button class="btn btn--sm btn--danger remove-variant-btn" data-index="' + index + '">Remove</button></div>';
    html += '</div>';
    return html;
  }

  /* ================================================================
     PAGE: CATEGORIES LIST
     ================================================================ */

  function renderCategories() {
    var categories = MBSCMS.getCategories();
    var html = '';
    html += '<div class="page-header"><div><p class="page-subtitle">Manage product categories.</p></div><a href="#/categories/add" class="btn btn--primary"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Category</a></div>';
    html += '<div class="card"><div class="table-wrapper"><table>';
    html += '<thead><tr><th>Image</th><th>Name</th><th>Slug</th><th>Order</th><th>Featured</th><th>Enabled</th><th>Actions</th></tr></thead>';
    html += '<tbody>';
    if (categories.length === 0) {
      html += '<tr><td colspan="7" class="text-muted" style="text-align:center;padding:32px">No categories yet.</td></tr>';
    }
    categories.forEach(function (c) {
      html += '<tr>';
      html += '<td><img src="' + escapeHTML(c.image || '') + '" class="image-preview" onerror="this.style.display=\'none\'"></td>';
      html += '<td><strong>' + escapeHTML(c.name) + '</strong></td>';
      html += '<td class="text-muted">' + escapeHTML(c.slug || '') + '</td>';
      html += '<td>' + (c.displayOrder || '—') + '</td>';
      html += '<td>' + (c.featured ? '<span class="badge badge--featured">Featured</span>' : '—') + '</td>';
      html += '<td>' + (c.enabled !== false ? '<span class="badge badge--active">Enabled</span>' : '<span class="badge badge--inactive">Disabled</span>') + '</td>';
      html += '<td><div class="table-actions">';
      html += '<a href="#/categories/edit/' + escapeHTML(c.id) + '" class="btn btn--sm btn--outline">Edit</a>';
      html += '<button class="btn btn--sm btn--danger delete-category-btn" data-id="' + escapeHTML(c.id) + '" data-name="' + escapeHTML(c.name) + '">Delete</button>';
      html += '</div></td>';
      html += '</tr>';
    });
    html += '</tbody></table></div></div>';
    return html;
  }

  /* ================================================================
     PAGE: CATEGORY FORM (ADD/EDIT)
     ================================================================ */

  function renderCategoryForm(categoryId) {
    var cat = null;
    if (categoryId) {
      var cats = MBSCMS.getCategories();
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].id === categoryId) { cat = cats[i]; break; }
      }
    }
    var isEdit = !!cat;
    var name = cat ? cat.name : '';
    var slug = cat ? cat.slug : '';
    var desc = cat ? (cat.description || '') : '';
    var image = cat ? (cat.image || '') : '';
    var heroImage = cat ? (cat.heroImage || '') : '';
    var bannerImage = cat ? (cat.bannerImage || '') : '';
    var order = cat ? (cat.displayOrder || '') : '';
    var featured = cat ? !!cat.featured : false;
    var enabled = cat ? cat.enabled !== false : true;

    var html = '';
    html += '<div class="card"><div class="card-body">';
    html += '<div class="form-group"><label class="form-label">Category Name</label><input type="text" class="form-input" id="cat-name" value="' + escapeHTML(name) + '"></div>';
    html += '<div class="form-group"><label class="form-label">Slug</label><input type="text" class="form-input" id="cat-slug" value="' + escapeHTML(slug) + '"><p class="form-hint">Auto-generated from name.</p></div>';
    html += '<div class="form-group"><label class="form-label">Description</label><textarea class="form-textarea" id="cat-description">' + escapeHTML(desc) + '</textarea></div>';

    html += imageInputWithUpload('cat-image', 'Category Image', image);
    html += imageInputWithUpload('cat-hero-image', 'Hero Image', heroImage);
    html += imageInputWithUpload('cat-banner-image', 'Banner Image', bannerImage);

    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Display Order</label><input type="number" class="form-input" id="cat-order" value="' + escapeHTML(order) + '" min="0"></div>';
    html += '<div></div>';
    html += '</div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Featured</label><label class="toggle"><input type="checkbox" id="cat-featured"' + (featured ? ' checked' : '') + '><span class="toggle__slider"></span></label></div>';
    html += '<div class="form-group"><label class="form-label">Enabled</label><label class="toggle"><input type="checkbox" id="cat-enabled"' + (enabled ? ' checked' : '') + '><span class="toggle__slider"></span></label></div>';
    html += '</div>';

    html += '<div class="flex-between mt-24"><a href="#/categories" class="btn btn--outline">Cancel</a><button class="btn btn--primary" id="save-category-btn" data-id="' + escapeHTML(categoryId || '') + '">' + (isEdit ? 'Update Category' : 'Save Category') + '</button></div>';
    html += '</div></div>';
    return html;
  }

  /* ================================================================
     PAGE: MEDIA LIBRARY
     ================================================================ */

  function renderMedia() {
    var media = MBSCMS.getMedia();
    var html = '';
    html += '<div class="page-header"><div><p class="page-subtitle">Manage your media files.</p></div></div>';

    html += '<div class="card mb-24"><div class="card-body">';
    html += '<h3 style="font-size:16px;font-weight:600;margin-bottom:12px">Upload Images</h3>';
    html += '<div class="media-upload-zone" id="media-drop-zone">';
    html += '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--admin-text-muted)" stroke-width="1.5" style="margin-bottom:12px"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>';
    html += '<p style="font-size:15px;font-weight:500;margin-bottom:4px">Drag & drop images here</p>';
    html += '<p style="font-size:13px;color:var(--admin-text-muted);margin-bottom:12px">or</p>';
    html += '<button type="button" class="btn btn--primary" id="media-browse-btn"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:6px"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Browse Files</button>';
    html += '<p style="font-size:12px;color:var(--admin-text-muted);margin-top:8px">JPG, PNG, WebP — Max 10MB each</p>';
    html += '</div>';
    html += '<input type="file" id="media-file-input" accept="image/jpeg,image/png,image/webp" multiple style="display:none">';
    html += '</div></div>';

    html += '<div class="card mb-24"><div class="card-body">';
    html += '<h3 style="font-size:16px;font-weight:600;margin-bottom:12px;cursor:pointer" id="toggle-url-input">+ Add by URL</h3>';
    html += '<div id="url-input-area" style="display:none">';
    html += '<div class="flex gap-8">';
    html += '<input type="text" class="form-input" id="media-url-input" placeholder="Enter image URL..." style="flex:1">';
    html += '<input type="text" class="form-input" id="media-name-input" placeholder="Name (optional)" style="max-width:200px">';
    html += '<select class="form-select" id="media-type-input" style="max-width:150px"><option value="other">Other</option><option value="products">Products</option><option value="categories">Categories</option><option value="banners">Banners</option><option value="website">Website</option></select>';
    html += '<button class="btn btn--primary" id="add-media-btn">Add</button>';
    html += '</div></div></div></div>';

    html += '<div class="card"><div class="card-body">';
    html += '<div class="flex gap-16 mb-20" style="flex-wrap:wrap">';
    html += '<div class="search-bar" style="flex:1;min-width:200px"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg><input type="text" class="form-input" id="media-search" placeholder="Search media..."></div>';
    html += '<div style="min-width:150px"><select class="form-select" id="media-type-filter"><option value="">All Types</option><option value="products">Products</option><option value="categories">Categories</option><option value="banners">Banners</option><option value="website">Website</option><option value="other">Other</option></select></div>';
    html += '</div>';

    html += '<div class="flex gap-16" style="flex-wrap:wrap" id="media-grid">';
    if (media.length === 0) {
      html += '<div class="empty-state" style="width:100%"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--admin-text-muted)" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg><p class="empty-state__heading">No media yet</p><p class="empty-state__text">Upload images using the area above.</p></div>';
    }
    media.forEach(function (item) {
      var imgSrc = escapeHTML(item.url || '');
      var itemName = escapeHTML(item.name || 'Unnamed');
      var itemType = escapeHTML(item.type || 'other');
      var sizeInfo = '';
      if (item.url && item.url.indexOf('data:image') === 0) {
        var bytes = Math.round((item.url.length * 3) / 4);
        if (bytes > 1024) sizeInfo = ' (' + Math.round(bytes / 1024) + ' KB)';
        else sizeInfo = ' (' + bytes + ' B)';
      }
      html += '<div class="media-item" style="width:180px;border:1px solid var(--admin-border);border-radius:var(--admin-radius);overflow:hidden" data-media-name="' + itemName + '" data-media-type="' + itemType + '">';
      html += '<img src="' + imgSrc + '" style="width:100%;height:120px;object-fit:cover;display:block" onerror="this.style.display=\'none\'">';
      html += '<div style="padding:10px">';
      html += '<div style="font-size:13px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="' + itemName + '">' + itemName + '</div>';
      html += '<div style="font-size:11px;color:var(--admin-text-muted)">' + itemType + sizeInfo + '</div>';
      html += '<div class="flex gap-8 mt-8">';
      html += '<button class="btn btn--sm btn--outline copy-media-url-btn" data-url="' + imgSrc + '">Copy URL</button>';
      html += '<button class="btn btn--sm btn--danger delete-media-btn" data-id="' + escapeHTML(item.id) + '">Delete</button>';
      html += '</div></div></div>';
    });
    html += '</div></div></div>';
    return html;
  }

  /* ================================================================
     PAGE: SOCIAL LINKS
     ================================================================ */

  function renderSocial() {
    var social = getVal('social') || {};
    var html = '';
    html += '<div class="card"><div class="card-body">';
    html += '<p class="page-subtitle mb-20">Manage your social media links.</p>';
    html += '<div class="form-group"><label class="form-label">Instagram URL</label><input type="text" class="form-input" id="social-instagram" value="' + escapeHTML(social.instagram || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Facebook URL</label><input type="text" class="form-input" id="social-facebook" value="' + escapeHTML(social.facebook || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">YouTube URL</label><input type="text" class="form-input" id="social-youtube" value="' + escapeHTML(social.youtube || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">TikTok URL</label><input type="text" class="form-input" id="social-tiktok" value="' + escapeHTML(social.tiktok || '') + '"></div>';
    html += '<div class="flex-between mt-24"><div></div><button class="btn btn--primary" id="save-social">Save Changes</button></div>';
    html += '</div></div>';
    return html;
  }

  /* ================================================================
     PAGE: CONTACT INFO
     ================================================================ */

  function renderContact() {
    var site = getVal('site') || {};
    var html = '';
    html += '<div class="card"><div class="card-body">';
    html += '<p class="page-subtitle mb-20">Manage contact information.</p>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label class="form-label">Phone</label><input type="text" class="form-input" id="contact-phone" value="' + escapeHTML(site.contactPhone || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">WhatsApp Number</label><input type="text" class="form-input" id="contact-whatsapp" value="' + escapeHTML(site.whatsappNumber || '') + '"></div>';
    html += '</div>';
    html += '<div class="form-group"><label class="form-label">Email</label><input type="text" class="form-input" id="contact-email" value="' + escapeHTML(site.email || '') + '"></div>';
    html += '<div class="form-group"><label class="form-label">Address</label><textarea class="form-textarea" id="contact-address">' + escapeHTML(site.address || '') + '</textarea></div>';
    html += '<div class="form-group"><label class="form-label">Business Hours</label><input type="text" class="form-input" id="contact-hours" value="' + escapeHTML(site.businessHours || '') + '"></div>';
    html += '<div class="flex-between mt-24"><div></div><button class="btn btn--primary" id="save-contact">Save Changes</button></div>';
    html += '</div></div>';
    return html;
  }

  /* ================================================================
     PAGE: FOOTER MANAGEMENT
     ================================================================ */

  function renderFooter() {
    var footer = getVal('footer') || {};
    var shopLinks = footer.shopLinks || [];
    var companyLinks = footer.companyLinks || [];
    var supportLinks = footer.supportLinks || [];

    var html = '';
    html += '<div class="card"><div class="card-body">';
    html += '<div class="form-group"><label class="form-label">Footer Description</label><textarea class="form-textarea" id="footer-description">' + escapeHTML(footer.description || '') + '</textarea></div>';
    html += '<div class="form-group"><label class="form-label">Copyright Text</label><input type="text" class="form-input" id="footer-copyright" value="' + escapeHTML(footer.copyright || '') + '"></div>';

    html += '<hr style="border:none;border-top:1px solid var(--admin-border);margin:24px 0">';
    html += renderFooterLinkSection('Shop Links', 'shop', shopLinks);
    html += '<hr style="border:none;border-top:1px solid var(--admin-border);margin:24px 0">';
    html += renderFooterLinkSection('Company Links', 'company', companyLinks);
    html += '<hr style="border:none;border-top:1px solid var(--admin-border);margin:24px 0">';
    html += renderFooterLinkSection('Support Links', 'support', supportLinks);

    html += '<div class="flex-between mt-24"><div></div><button class="btn btn--primary" id="save-footer">Save Changes</button></div>';
    html += '</div></div>';
    return html;
  }

  function renderFooterLinkSection(title, key, links) {
    var html = '';
    html += '<h3 style="font-size:16px;font-weight:600;margin-bottom:12px">' + escapeHTML(title) + '</h3>';
    html += '<div id="footer-links-' + key + '">';
    links.forEach(function (link, i) {
      html += '<div class="flex gap-8 mb-8 footer-link-row" style="align-items:center">';
      html += '<input type="text" class="form-input footer-link-label" data-group="' + key + '" value="' + escapeHTML(link.label || '') + '" placeholder="Label" style="flex:1">';
      html += '<input type="text" class="form-input footer-link-url" data-group="' + key + '" value="' + escapeHTML(link.url || '') + '" placeholder="URL" style="flex:2">';
      html += '<button class="btn btn--sm btn--danger remove-footer-link" data-group="' + key + '" data-index="' + i + '">Remove</button>';
      html += '</div>';
    });
    html += '</div>';
    html += '<button class="btn btn--sm btn--outline mt-8 add-footer-link-btn" data-group="' + key + '"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add Link</button>';
    return html;
  }

  /* ================================================================
     PAGE: ORDERS (PLACEHOLDER)
     ================================================================ */

  function renderOrders() {
    var orders = getVal('orders') || [];
    if (orders.length > 0) {
      var html = '<div class="card"><div class="card-body"><p>You have ' + orders.length + ' order(s).</p></div></div>';
      return html;
    }
    return '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg><h3 class="empty-state__title">No orders yet</h3><p class="empty-state__text">Orders will appear here once customers start purchasing.</p></div>';
  }

  /* ================================================================
     PAGE: CUSTOMERS (PLACEHOLDER)
     ================================================================ */

  function renderCustomers() {
    var customers = getVal('customers') || [];
    if (customers.length > 0) {
      return '<div class="card"><div class="card-body"><p>You have ' + customers.length + ' customer(s).</p></div></div>';
    }
    return '<div class="empty-state"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><h3 class="empty-state__title">No customers yet</h3><p class="empty-state__text">Customer data will appear here.</p></div>';
  }

  /* ================================================================
     PAGE: DESIGN SETTINGS
     ================================================================ */

  function renderDesignSettings() {
    var design = getVal('design') || {};
    var colors = [
      { key: 'primaryColor', label: 'Primary Color' },
      { key: 'secondaryColor', label: 'Secondary Color' },
      { key: 'backgroundColor', label: 'Background Color' },
      { key: 'textColor', label: 'Text Color' },
      { key: 'accentColor', label: 'Accent Color' }
    ];
    var html = '';
    html += '<div class="card"><div class="card-body">';
    html += '<p class="page-subtitle mb-20">Customize the design theme colors.</p>';
    colors.forEach(function (c) {
      html += '<div class="form-group"><label class="form-label">' + escapeHTML(c.label) + '</label>';
      html += '<div class="flex gap-8" style="align-items:center">';
      html += '<input type="color" class="design-color-picker" data-key="' + c.key + '" value="' + escapeHTML(design[c.key] || '#000000') + '" style="width:50px;height:40px;border:1px solid var(--admin-border);border-radius:var(--admin-radius);cursor:pointer;padding:2px">';
      html += '<input type="text" class="form-input design-color-input" data-key="' + c.key + '" value="' + escapeHTML(design[c.key] || '') + '" style="max-width:150px">';
      html += '</div></div>';
    });

    html += '<hr style="border:none;border-top:1px solid var(--admin-border);margin:24px 0">';
    html += '<h3 style="font-size:16px;font-weight:600;margin-bottom:16px">Preview</h3>';
    html += '<div id="design-preview" style="border:1px solid var(--admin-border);border-radius:var(--admin-radius);overflow:hidden">';
    html += '<div style="background-color:' + escapeHTML(design.primaryColor || '#C6A15B') + ';color:#fff;padding:20px;text-align:center;font-weight:600">Primary Color</div>';
    html += '<div style="background-color:' + escapeHTML(design.backgroundColor || '#F8F5F0') + ';color:' + escapeHTML(design.textColor || '#17130F') + ';padding:20px;text-align:center">Background & Text</div>';
    html += '<div style="background-color:' + escapeHTML(design.secondaryColor || '#17130F') + ';color:#fff;padding:20px;text-align:center;font-weight:600">Secondary Color</div>';
    html += '<div style="background-color:' + escapeHTML(design.accentColor || '#D4B76E') + ';color:#fff;padding:20px;text-align:center;font-weight:600">Accent Color</div>';
    html += '</div>';

    html += '<div class="flex-between mt-24"><button class="btn btn--danger" id="reset-design-defaults">Reset to Defaults</button><button class="btn btn--primary" id="save-design">Save Changes</button></div>';
    html += '</div></div>';
    return html;
  }

  /* ================================================================
     PAGE: SEO MANAGEMENT
     ================================================================ */

  function renderSEO() {
    var seo = getVal('seo') || {};
    var seoPages = [
      { key: 'home', label: 'Home' },
      { key: 'shop', label: 'Shop' },
      { key: 'about', label: 'About' },
      { key: 'contact', label: 'Contact' }
    ];
    var html = '';
    html += '<div class="card">';

    html += '<div class="tabs" id="seo-tabs">';
    seoPages.forEach(function (p, i) {
      html += '<button class="tab' + (i === 0 ? ' active' : '') + '" data-tab="seo-' + p.key + '">' + escapeHTML(p.label) + '</button>';
    });
    html += '</div>';

    html += '<div class="card-body">';
    seoPages.forEach(function (p, i) {
      var data = seo[p.key] || {};
      html += '<div class="tab-content' + (i === 0 ? ' active' : '') + '" id="tab-seo-' + p.key + '">';
      html += '<div class="form-group"><label class="form-label">Page Title</label><input type="text" class="form-input seo-title" data-seo-page="' + p.key + '" value="' + escapeHTML(data.title || '') + '"></div>';
      html += '<div class="form-group"><label class="form-label">Meta Description</label><textarea class="form-textarea seo-description" data-seo-page="' + p.key + '">' + escapeHTML(data.description || '') + '</textarea></div>';
      html += '<div class="form-group"><label class="form-label">Meta Keywords</label><input type="text" class="form-input seo-keywords" data-seo-page="' + p.key + '" value="' + escapeHTML(data.keywords || '') + '"></div>';
      html += '<div class="flex-between"><div></div><button class="btn btn--primary btn--sm save-seo-btn" data-seo-page="' + p.key + '">Save ' + escapeHTML(p.label) + ' SEO</button></div>';
      html += '</div>';
    });

    html += '</div></div>';
    return html;
  }

  /* ================================================================
     SECTION TOGGLE (Homepage CMS)
     ================================================================ */

  function toggleSection(key) {
    var body = document.getElementById('section-body-' + key);
    var chevron = document.getElementById('chevron-' + key);
    if (body) {
      body.classList.toggle('open');
    }
    if (chevron) {
      chevron.style.transform = body && body.classList.contains('open') ? 'rotate(180deg)' : '';
    }
  }

  function togglePage(key) {
    var body = document.getElementById('page-body-' + key);
    var chevron = document.getElementById('page-chevron-' + key);
    if (body) {
      body.classList.toggle('open');
    }
    if (chevron) {
      chevron.style.transform = body && body.classList.contains('open') ? 'rotate(180deg)' : '';
    }
  }

  /* ================================================================
     EVENT LISTENERS
     ================================================================ */

  function attachPageListeners() {
    var contentArea = document.getElementById('admin-content');
    if (!contentArea) return;

    contentArea.addEventListener('click', handleContentClick);
    contentArea.addEventListener('change', handleContentChange);
    contentArea.addEventListener('input', handleContentInput);
  }

  function removePageListeners() {
    var contentArea = document.getElementById('admin-content');
    if (!contentArea) return;
    contentArea.removeEventListener('click', handleContentClick);
    contentArea.removeEventListener('change', handleContentChange);
    contentArea.removeEventListener('input', handleContentInput);
  }

  function handleContentClick(e) {
    var target = e.target;

    // Delegation: find closest actionable element
    var btn = target.closest ? target.closest('[data-action]') : null;

    // Save Website Content
    if (target.id === 'save-website-content') {
      e.preventDefault();
      saveWebsiteContent();
      return;
    }

    // Save Hero
    if (target.id === 'save-hero') {
      e.preventDefault();
      saveHero();
      return;
    }

    // Add Nav
    if (target.id === 'add-nav-btn' || (target.closest && target.closest('#add-nav-btn'))) {
      e.preventDefault();
      showNavForm(null);
      return;
    }

    // Edit Nav
    if (target.classList.contains('edit-nav-btn')) {
      e.preventDefault();
      var navId = target.getAttribute('data-id');
      var navItems = MBSCMS.getNavigation();
      var navItem = null;
      for (var i = 0; i < navItems.length; i++) {
        if (navItems[i].id === navId) { navItem = navItems[i]; break; }
      }
      showNavForm(navItem);
      return;
    }

    // Delete Nav
    if (target.classList.contains('delete-nav-btn')) {
      e.preventDefault();
      var delId = target.getAttribute('data-id');
      var delLabel = target.getAttribute('data-label');
      showModal('Delete Navigation Item', '<p>Are you sure you want to delete <strong>' + escapeHTML(delLabel) + '</strong>?</p>', [
        { label: 'Cancel', className: 'btn btn--outline', onClick: closeModal },
        { label: 'Delete', className: 'btn btn--danger', onClick: function () {
          MBSCMS.deleteNavItem(delId);
          refresh();
          closeModal();
          showToast('Navigation item deleted', 'success');
          navigateTo('#/navigation');
        }}
      ]);
      return;
    }

    // Save Product
    if (target.id === 'save-product-btn') {
      e.preventDefault();
      saveProduct(target.getAttribute('data-id'));
      return;
    }

    // Duplicate Product
    if (target.classList.contains('duplicate-product-btn')) {
      e.preventDefault();
      var dupId = target.getAttribute('data-id');
      var dupProduct = MBSCMS.getProduct(dupId);
      if (dupProduct) {
        var clone = JSON.parse(JSON.stringify(dupProduct));
        clone.id = null;
        clone.name = clone.name + ' (Copy)';
        clone.slug = toSlug(clone.name);
        MBSCMS.addProduct(clone);
        refresh();
        showToast('Product duplicated', 'success');
        navigateTo('#/products');
      }
      return;
    }

    // Delete Product
    if (target.classList.contains('delete-product-btn')) {
      e.preventDefault();
      var prodId = target.getAttribute('data-id');
      var prodName = target.getAttribute('data-name');
      showModal('Delete Product', '<p>Are you sure you want to delete <strong>' + escapeHTML(prodName) + '</strong>? This cannot be undone.</p>', [
        { label: 'Cancel', className: 'btn btn--outline', onClick: closeModal },
        { label: 'Delete', className: 'btn btn--danger', onClick: function () {
          MBSCMS.deleteProduct(prodId);
          refresh();
          closeModal();
          showToast('Product deleted', 'success');
          navigateTo('#/products');
        }}
      ]);
      return;
    }

    // Save Category
    if (target.id === 'save-category-btn') {
      e.preventDefault();
      saveCategory(target.getAttribute('data-id'));
      return;
    }

    // Delete Category
    if (target.classList.contains('delete-category-btn')) {
      e.preventDefault();
      var catId = target.getAttribute('data-id');
      var catName = target.getAttribute('data-name');
      showModal('Delete Category', '<p>Are you sure you want to delete <strong>' + escapeHTML(catName) + '</strong>? Products in this category will not be deleted.</p>', [
        { label: 'Cancel', className: 'btn btn--outline', onClick: closeModal },
        { label: 'Delete', className: 'btn btn--danger', onClick: function () {
          MBSCMS.deleteCategory(catId);
          refresh();
          closeModal();
          showToast('Category deleted', 'success');
          navigateTo('#/categories');
        }}
      ]);
      return;
    }

    // Add Media
    if (target.id === 'add-media-btn') {
      e.preventDefault();
      addMediaItem();
      return;
    }

    // Copy Media URL
    if (target.classList.contains('copy-media-url-btn')) {
      e.preventDefault();
      var url = target.getAttribute('data-url');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          showToast('URL copied to clipboard', 'success');
        });
      } else {
        var tempInput = document.createElement('input');
        tempInput.value = url;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        showToast('URL copied to clipboard', 'success');
      }
      return;
    }

    // Delete Media
    if (target.classList.contains('delete-media-btn')) {
      e.preventDefault();
      var mediaId = target.getAttribute('data-id');
      showModal('Delete Media', '<p>Are you sure you want to delete this media item? This cannot be undone.</p>', [
        { label: 'Cancel', className: 'btn btn--outline', onClick: closeModal },
        { label: 'Delete', className: 'btn btn--danger', onClick: function () {
          MBSCMS.deleteMedia(mediaId);
          refresh();
          closeModal();
          showToast('Media deleted', 'success');
          navigateTo('#/media');
        }}
      ]);
      return;
    }

    // Upload trigger buttons (next to image inputs)
    if (target.classList.contains('upload-trigger-btn')) {
      e.preventDefault();
      var targetId = target.getAttribute('data-target');
      var fileInput = createFileInput('upload-trigger-' + Date.now(), 'image/*');
      fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
          uploadImageFile(this.files[0], function(dataUrl) {
            var input = document.getElementById(targetId);
            if (input) {
              input.value = dataUrl;
              input.dispatchEvent(new Event('input', { bubbles: true }));
            }
            document.body.removeChild(fileInput);
          });
        }
      });
      fileInput.click();
      return;
    }

    // Browse trigger buttons (media library picker)
    if (target.classList.contains('browse-trigger-btn')) {
      e.preventDefault();
      var targetId = target.getAttribute('data-target');
      showMediaBrowserModal(function(url) {
        var input = document.getElementById(targetId);
        if (input) {
          input.value = url;
          input.dispatchEvent(new Event('input', { bubbles: true }));
        }
      });
      return;
    }

    // Gallery upload buttons
    if (target.classList.contains('gallery-upload-btn')) {
      e.preventDefault();
      var galleryItem = target.closest ? target.closest('.gallery-item') : null;
      if (!galleryItem) return;
      var urlInput = galleryItem.querySelector('.gallery-url-input');
      var fileInput = createFileInput('gallery-upload-' + Date.now(), 'image/*');
      fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
          uploadImageFile(this.files[0], function(dataUrl) {
            if (urlInput) {
              urlInput.value = dataUrl;
              urlInput.dispatchEvent(new Event('input', { bubbles: true }));
            }
            document.body.removeChild(fileInput);
          });
        }
      });
      fileInput.click();
      return;
    }

    // Media library browse button
    if (target.id === 'media-browse-btn') {
      e.preventDefault();
      var fileInput = document.getElementById('media-file-input');
      if (fileInput) fileInput.click();
      return;
    }

    // Toggle URL input area
    if (target.id === 'toggle-url-input') {
      e.preventDefault();
      var area = document.getElementById('url-input-area');
      if (area) area.style.display = area.style.display === 'none' ? 'block' : 'none';
      return;
    }

    // Save Social
    if (target.id === 'save-social') {
      e.preventDefault();
      saveSocial();
      return;
    }

    // Save Contact
    if (target.id === 'save-contact') {
      e.preventDefault();
      saveContact();
      return;
    }

    // Save Footer
    if (target.id === 'save-footer') {
      e.preventDefault();
      saveFooter();
      return;
    }

    // Save Design
    if (target.id === 'save-design') {
      e.preventDefault();
      saveDesign();
      return;
    }

    // Reset Design Defaults
    if (target.id === 'reset-design-defaults') {
      e.preventDefault();
      showModal('Reset Design', '<p>Reset all colors to defaults?</p>', [
        { label: 'Cancel', className: 'btn btn--outline', onClick: closeModal },
        { label: 'Reset', className: 'btn btn--danger', onClick: function () {
          MBSCMS.set('design', { primaryColor: '#C6A15B', secondaryColor: '#17130F', backgroundColor: '#F8F5F0', textColor: '#17130F', accentColor: '#D4B76E' });
          refresh();
          closeModal();
          showToast('Design reset to defaults', 'success');
          navigateTo('#/settings');
        }}
      ]);
      return;
    }

    // Save SEO
    if (target.classList.contains('save-seo-btn')) {
      e.preventDefault();
      saveSEO(target.getAttribute('data-seo-page'));
      return;
    }

    // Add Gallery Image
    if (target.id === 'add-gallery-btn') {
      e.preventDefault();
      var list = document.getElementById('gallery-images-list');
      if (list) {
        var idx = list.querySelectorAll('.gallery-item').length;
        var div = document.createElement('div');
        div.className = 'flex gap-8 mb-8 gallery-item';
        div.style.alignItems = 'center';
        div.innerHTML = '<img src="" class="image-preview" style="display:none"><input type="text" class="form-input gallery-url-input" value="" placeholder="Enter image URL" style="flex:1"><button type="button" class="btn btn--sm btn--outline gallery-upload-btn" title="Upload from PC"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg></button><button class="btn btn--sm btn--danger remove-gallery-btn" data-index="' + idx + '">Remove</button>';
        list.appendChild(div);
      }
      return;
    }

    // Remove Gallery Image
    if (target.classList.contains('remove-gallery-btn')) {
      e.preventDefault();
      var galleryItem = target.closest ? target.closest('.gallery-item') : null;
      if (galleryItem && galleryItem.parentNode) {
        galleryItem.parentNode.removeChild(galleryItem);
      }
      return;
    }

    // Add Variant
    if (target.id === 'add-variant-btn') {
      e.preventDefault();
      var variantsList = document.getElementById('variants-list');
      if (variantsList) {
        var vIdx = variantsList.querySelectorAll('.variant-row').length;
        var vDiv = document.createElement('div');
        vDiv.innerHTML = renderVariantRow({ name: '', value: '', price: '', stock: 0, status: 'active' }, vIdx);
        variantsList.appendChild(vDiv.firstChild);
      }
      return;
    }

    // Remove Variant
    if (target.classList.contains('remove-variant-btn')) {
      e.preventDefault();
      var vRow = target.closest ? target.closest('.variant-row') : null;
      if (vRow && vRow.parentNode) {
        vRow.parentNode.removeChild(vRow);
      }
      return;
    }

    // Add Footer Link
    if (target.classList.contains('add-footer-link-btn')) {
      e.preventDefault();
      var group = target.getAttribute('data-group');
      var container = document.getElementById('footer-links-' + group);
      if (container) {
        var linkIdx = container.querySelectorAll('.footer-link-row').length;
        var linkDiv = document.createElement('div');
        linkDiv.className = 'flex gap-8 mb-8 footer-link-row';
        linkDiv.style.alignItems = 'center';
        linkDiv.innerHTML = '<input type="text" class="form-input footer-link-label" data-group="' + group + '" value="" placeholder="Label" style="flex:1"><input type="text" class="form-input footer-link-url" data-group="' + group + '" value="" placeholder="URL" style="flex:2"><button class="btn btn--sm btn--danger remove-footer-link" data-group="' + group + '" data-index="' + linkIdx + '">Remove</button>';
        container.appendChild(linkDiv);
      }
      return;
    }

    // Remove Footer Link
    if (target.classList.contains('remove-footer-link')) {
      e.preventDefault();
      var linkRow = target.closest ? target.closest('.footer-link-row') : null;
      if (linkRow && linkRow.parentNode) {
        linkRow.parentNode.removeChild(linkRow);
      }
      return;
    }

    // Tab switching
    var tabBtn = target.closest ? target.closest('.tab') : null;
    if (tabBtn && tabBtn.parentNode) {
      e.preventDefault();
      var tabId = tabBtn.getAttribute('data-tab');
      var tabs = tabBtn.parentNode.querySelectorAll('.tab');
      for (var t = 0; t < tabs.length; t++) {
        tabs[t].classList.remove('active');
      }
      tabBtn.classList.add('active');
      var tabContents = document.querySelectorAll('.tab-content');
      for (var tc = 0; tc < tabContents.length; tc++) {
        tabContents[tc].classList.remove('active');
      }
      var targetContent = document.getElementById('tab-' + tabId);
      if (targetContent) targetContent.classList.add('active');
      return;
    }

    // Section save buttons
    if (target.classList.contains('cms-section-save')) {
      e.preventDefault();
      var sectionKey = target.getAttribute('data-section');
      saveHomepageSection(sectionKey);
      return;
    }

    // Page save buttons
    if (target.classList.contains('save-page-btn')) {
      e.preventDefault();
      var pageKey = target.getAttribute('data-page');
      savePage(pageKey);
      return;
    }
  }

  function handleContentChange(e) {
    var target = e.target;

    // Design color pickers sync with text inputs
    if (target.classList.contains('design-color-picker')) {
      var key = target.getAttribute('data-key');
      var textInput = document.querySelector('.design-color-input[data-key="' + key + '"]');
      if (textInput) textInput.value = target.value;
      updateDesignPreview();
      return;
    }

    if (target.classList.contains('design-color-input')) {
      var key2 = target.getAttribute('data-key');
      var picker = document.querySelector('.design-color-picker[data-key="' + key2 + '"]');
      if (picker && /^#[0-9A-Fa-f]{6}$/.test(target.value)) {
        picker.value = target.value;
      }
      updateDesignPreview();
      return;
    }
  }

  function handleContentInput(e) {
    var target = e.target;

    // Auto-slug for product name
    if (target.id === 'prod-name') {
      var slugField = document.getElementById('prod-slug');
      if (slugField && !slugField.getAttribute('data-custom')) {
        slugField.value = toSlug(target.value);
      }
    }

    // Mark slug as custom if user edits it
    if (target.id === 'prod-slug') {
      target.setAttribute('data-custom', 'true');
    }

    // Auto-slug for category name
    if (target.id === 'cat-name') {
      var catSlugField = document.getElementById('cat-slug');
      if (catSlugField && !catSlugField.getAttribute('data-custom')) {
        catSlugField.value = toSlug(target.value);
      }
    }

    if (target.id === 'cat-slug') {
      target.setAttribute('data-custom', 'true');
    }

    // Hero overlay slider
    if (target.id === 'hero-overlay') {
      var valEl = document.getElementById('hero-overlay-val');
      if (valEl) valEl.textContent = target.value;
    }

    // Live image preview updates
    if (target.tagName === 'INPUT' && target.type === 'text') {
      var previewImg = target.parentNode ? target.parentNode.querySelector('.image-preview, img[src]') : null;
      if (!previewImg && target.nextElementSibling) {
        var sib = target.nextElementSibling;
        if (sib.tagName === 'IMG' || (sib.querySelector && sib.querySelector('img'))) {
          previewImg = sib.tagName === 'IMG' ? sib : sib.querySelector('img');
        }
      }
      if (previewImg) {
        if (target.value) {
          previewImg.src = target.value;
          previewImg.style.display = '';
        } else {
          previewImg.style.display = 'none';
        }
      }
      // Also update gallery image previews
      if (target.classList.contains('gallery-url-input')) {
        var galleryItem = target.closest ? target.closest('.gallery-item') : null;
        if (galleryItem) {
          var img = galleryItem.querySelector('img');
          if (img) {
            if (target.value) {
              img.src = target.value;
              img.style.display = '';
            } else {
              img.style.display = 'none';
            }
          }
        }
      }
    }
  }

  function updateDesignPreview() {
    var design = {};
    var pickers = document.querySelectorAll('.design-color-picker');
    for (var i = 0; i < pickers.length; i++) {
      design[pickers[i].getAttribute('data-key')] = pickers[i].value;
    }
    var preview = document.getElementById('design-preview');
    if (preview) {
      preview.innerHTML = '<div style="background-color:' + design.primaryColor + ';color:#fff;padding:20px;text-align:center;font-weight:600">Primary Color</div>' +
        '<div style="background-color:' + design.backgroundColor + ';color:' + design.textColor + ';padding:20px;text-align:center">Background & Text</div>' +
        '<div style="background-color:' + design.secondaryColor + ';color:#fff;padding:20px;text-align:center;font-weight:600">Secondary Color</div>' +
        '<div style="background-color:' + design.accentColor + ';color:#fff;padding:20px;text-align:center;font-weight:600">Accent Color</div>';
    }
  }

  /* ================================================================
     SAVE FUNCTIONS
     ================================================================ */

  function saveWebsiteContent() {
    setVal('site.name', document.getElementById('site-name').value);
    setVal('site.tagline', document.getElementById('site-tagline').value);
    setVal('site.logo', document.getElementById('site-logo').value);
    setVal('site.announcement.text', document.getElementById('ann-text').value);
    setVal('site.announcement.linkText', document.getElementById('ann-link-text').value);
    setVal('site.announcement.linkUrl', document.getElementById('ann-link-url').value);
    setVal('site.announcement.enabled', document.getElementById('ann-enabled').checked);
    setVal('site.contactPhone', document.getElementById('site-phone').value);
    setVal('site.email', document.getElementById('site-email').value);
    setVal('site.address', document.getElementById('site-address').value);
    setVal('site.businessHours', document.getElementById('site-hours').value);
    setVal('site.whatsappNumber', document.getElementById('site-whatsapp').value);
    refresh();
    showToast('Website content saved', 'success');
  }

  function saveHero() {
    setVal('homepage.hero.eyebrow', document.getElementById('hero-eyebrow').value);
    setVal('homepage.hero.heading', document.getElementById('hero-heading').value);
    setVal('homepage.hero.description', document.getElementById('hero-description').value);
    setVal('homepage.hero.primaryButtonText', document.getElementById('hero-primary-text').value);
    setVal('homepage.hero.primaryButtonUrl', document.getElementById('hero-primary-url').value);
    setVal('homepage.hero.secondaryButtonText', document.getElementById('hero-secondary-text').value);
    setVal('homepage.hero.secondaryButtonUrl', document.getElementById('hero-secondary-url').value);
    setVal('homepage.hero.image', document.getElementById('hero-image').value);
    setVal('homepage.hero.mobileImage', document.getElementById('hero-mobile-image').value);
    setVal('homepage.hero.overlay', parseFloat(document.getElementById('hero-overlay').value));
    setVal('homepage.hero.enabled', document.getElementById('hero-enabled').checked);
    refresh();
    showToast('Hero section saved', 'success');
  }

  function saveHomepageSection(key) {
    var fields = document.querySelectorAll('.cms-section-field[data-section="' + key + '"]');
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var fieldName = field.getAttribute('data-field');
      var value = field.value;
      setVal('homepage.' + key + '.' + fieldName, value);
    }
    var toggle = document.querySelector('.cms-section-toggle[data-section="' + key + '"]');
    if (toggle) {
      setVal('homepage.' + key + '.enabled', toggle.checked);
    }
    refresh();
    showToast(key.replace(/([A-Z])/g, ' $1').replace(/^./, function (s) { return s.toUpperCase(); }) + ' section saved', 'success');
  }

  function savePage(key) {
    var fields = document.querySelectorAll('.page-field[data-page="' + key + '"]');
    for (var i = 0; i < fields.length; i++) {
      var field = fields[i];
      var fieldName = field.getAttribute('data-field');
      setVal('pages.' + key + '.' + fieldName, field.value);
    }
    refresh();
    showToast('Page saved', 'success');
  }

  function saveSocial() {
    setVal('social.instagram', document.getElementById('social-instagram').value);
    setVal('social.facebook', document.getElementById('social-facebook').value);
    setVal('social.youtube', document.getElementById('social-youtube').value);
    setVal('social.tiktok', document.getElementById('social-tiktok').value);
    refresh();
    showToast('Social links saved', 'success');
  }

  function saveContact() {
    setVal('site.contactPhone', document.getElementById('contact-phone').value);
    setVal('site.whatsappNumber', document.getElementById('contact-whatsapp').value);
    setVal('site.email', document.getElementById('contact-email').value);
    setVal('site.address', document.getElementById('contact-address').value);
    setVal('site.businessHours', document.getElementById('contact-hours').value);
    refresh();
    showToast('Contact information saved', 'success');
  }

  function saveFooter() {
    setVal('footer.description', document.getElementById('footer-description').value);
    setVal('footer.copyright', document.getElementById('footer-copyright').value);

    var groups = ['shop', 'company', 'support'];
    groups.forEach(function (g) {
      var labels = document.querySelectorAll('.footer-link-label[data-group="' + g + '"]');
      var urls = document.querySelectorAll('.footer-link-url[data-group="' + g + '"]');
      var links = [];
      for (var i = 0; i < labels.length; i++) {
        var labelVal = labels[i].value;
        var urlVal = urls[i] ? urls[i].value : '';
        if (labelVal || urlVal) {
          links.push({ label: labelVal, url: urlVal });
        }
      }
      setVal('footer.' + g + 'Links', links);
    });
    refresh();
    showToast('Footer saved', 'success');
  }

  function saveDesign() {
    var design = {};
    var inputs = document.querySelectorAll('.design-color-input');
    var hexRe = /^#[0-9A-Fa-f]{6}$/;
    for (var i = 0; i < inputs.length; i++) {
      var val = inputs[i].value.trim();
      if (val && !hexRe.test(val)) {
        showToast('Invalid hex color for ' + inputs[i].getAttribute('data-key') + ': ' + val, 'error');
        inputs[i].focus();
        return;
      }
      design[inputs[i].getAttribute('data-key')] = val;
    }
    setVal('design', design);
    refresh();
    showToast('Design settings saved', 'success');
  }

  function saveSEO(pageKey) {
    var title = document.querySelector('.seo-title[data-seo-page="' + pageKey + '"]');
    var desc = document.querySelector('.seo-description[data-seo-page="' + pageKey + '"]');
    var keywords = document.querySelector('.seo-keywords[data-seo-page="' + pageKey + '"]');
    if (title) setVal('seo.' + pageKey + '.title', title.value);
    if (desc) setVal('seo.' + pageKey + '.description', desc.value);
    if (keywords) setVal('seo.' + pageKey + '.keywords', keywords.value);
    refresh();
    showToast('SEO settings saved', 'success');
  }

  function saveProduct(productId) {
    var nameInput = document.getElementById('prod-name');
    if (!nameInput.value.trim()) {
      showToast('Product name is required', 'error');
      nameInput.focus();
      return;
    }
    var data = {
      name: document.getElementById('prod-name').value,
      slug: document.getElementById('prod-slug').value || toSlug(document.getElementById('prod-name').value),
      category: document.getElementById('prod-category').value,
      description: document.getElementById('prod-description').value,
      shortDescription: document.getElementById('prod-short-description').value,
      status: document.getElementById('prod-status').value,
      featured: document.getElementById('prod-featured').checked,
      bestSeller: document.getElementById('prod-bestseller').checked,
      badge: document.getElementById('prod-badge').value || null,
      price: parseFloat(document.getElementById('prod-price').value) || 0,
      salePrice: parseFloat(document.getElementById('prod-sale-price').value) || null,
      sku: document.getElementById('prod-sku').value,
      stock: parseInt(document.getElementById('prod-stock').value, 10) || 0,
      image: document.getElementById('prod-main-image').value
    };

    // Gallery images
    var galleryInputs = document.querySelectorAll('.gallery-url-input');
    var images = [];
    for (var i = 0; i < galleryInputs.length; i++) {
      if (galleryInputs[i].value) {
        images.push(galleryInputs[i].value);
      }
    }
    if (images.length === 0 && data.image) {
      images.push(data.image);
    }
    data.images = images;

    // Variants
    var variantRows = document.querySelectorAll('.variant-row');
    var variants = [];
    for (var v = 0; v < variantRows.length; v++) {
      var row = variantRows[v];
      var vName = row.querySelector('.variant-name');
      var vValue = row.querySelector('.variant-value');
      var vPrice = row.querySelector('.variant-price');
      var vStock = row.querySelector('.variant-stock');
      var vStatus = row.querySelector('.variant-status');
      if (vName && vName.value) {
        variants.push({
          name: vName.value,
          value: vValue ? vValue.value : vName.value,
          price: vPrice ? (parseFloat(vPrice.value) || data.price) : data.price,
          stock: vStock ? (parseInt(vStock.value, 10) || 0) : 0,
          status: vStatus ? vStatus.value : 'active'
        });
      }
    }
    data.variants = variants;

    // Ensure salePrice is null if empty
    if (!data.salePrice) data.salePrice = null;

    if (productId) {
      MBSCMS.updateProduct(productId, data);
    } else {
      MBSCMS.addProduct(data);
    }
    refresh();
    showToast(productId ? 'Product updated' : 'Product saved', 'success');
    navigateTo('#/products');
  }

  function saveCategory(categoryId) {
    var nameInput = document.getElementById('cat-name');
    if (!nameInput.value.trim()) {
      showToast('Category name is required', 'error');
      nameInput.focus();
      return;
    }
    var data = {
      name: document.getElementById('cat-name').value,
      slug: document.getElementById('cat-slug').value || toSlug(document.getElementById('cat-name').value),
      description: document.getElementById('cat-description').value,
      image: document.getElementById('cat-image').value,
      heroImage: document.getElementById('cat-hero-image').value,
      bannerImage: document.getElementById('cat-banner-image').value,
      displayOrder: parseInt(document.getElementById('cat-order').value, 10) || 0,
      featured: document.getElementById('cat-featured').checked,
      enabled: document.getElementById('cat-enabled').checked
    };

    if (categoryId) {
      MBSCMS.updateCategory(categoryId, data);
    } else {
      MBSCMS.addCategory(data);
    }
    refresh();
    showToast(categoryId ? 'Category updated' : 'Category saved', 'success');
    navigateTo('#/categories');
  }

  function addMediaItem() {
    var urlInput = document.getElementById('media-url-input');
    var nameInput = document.getElementById('media-name-input');
    var typeInput = document.getElementById('media-type-input');
    var url = urlInput ? urlInput.value.trim() : '';
    var name = nameInput ? nameInput.value.trim() : '';
    var type = typeInput ? typeInput.value : 'other';
    if (!url) {
      showToast('Please enter a URL', 'error');
      return;
    }
    MBSCMS.addMedia({ url: url, name: name || url.split('/').pop(), type: type });
    refresh();
    showToast('Media added', 'success');
    navigateTo('#/media');
  }

  /* ================================================================
     NAV FORM (MODAL)
     ================================================================ */

  function showNavForm(item) {
    var isEdit = !!item;
    var label = item ? item.label : '';
    var url = item ? item.url : '';
    var order = item ? (item.order || '') : '';
    var enabled = item ? item.enabled !== false : true;

    var body = '';
    body += '<div class="form-group"><label class="form-label">Label</label><input type="text" class="form-input" id="nav-modal-label" value="' + escapeHTML(label) + '"></div>';
    body += '<div class="form-group"><label class="form-label">URL</label><input type="text" class="form-input" id="nav-modal-url" value="' + escapeHTML(url) + '"></div>';
    body += '<div class="form-group"><label class="form-label">Order</label><input type="number" class="form-input" id="nav-modal-order" value="' + escapeHTML(order) + '" min="0"></div>';
    body += '<div class="form-group"><label class="form-label">Enabled</label><label class="toggle"><input type="checkbox" id="nav-modal-enabled"' + (enabled ? ' checked' : '') + '><span class="toggle__slider"></span></label></div>';

    showModal(isEdit ? 'Edit Navigation Item' : 'Add Navigation Item', body, [
      { label: 'Cancel', className: 'btn btn--outline', onClick: closeModal },
      { label: isEdit ? 'Update' : 'Add', className: 'btn btn--primary', onClick: function () {
        var navData = {
          label: document.getElementById('nav-modal-label').value,
          url: document.getElementById('nav-modal-url').value,
          order: parseInt(document.getElementById('nav-modal-order').value, 10) || 0,
          enabled: document.getElementById('nav-modal-enabled').checked
        };
        if (!navData.label) {
          showToast('Label is required', 'error');
          return;
        }
        if (isEdit) {
          MBSCMS.updateNavItem(item.id, navData);
        } else {
          MBSCMS.addNavItem(navData);
        }
        refresh();
        closeModal();
        showToast(isEdit ? 'Navigation updated' : 'Navigation added', 'success');
        navigateTo('#/navigation');
      }}
    ]);
  }

  /* ================================================================
     IMAGE UPLOAD UTILITIES
     ================================================================ */

  function compressImage(file, maxWidth, quality) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader();
      reader.onload = function(e) {
        var img = new Image();
        img.onload = function() {
          var canvas = document.createElement('canvas');
          var w = img.width;
          var h = img.height;
          if (w > maxWidth) {
            h = (maxWidth / w) * h;
            w = maxWidth;
          }
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          var dataUrl = canvas.toDataURL('image/jpeg', quality || 0.7);
          resolve(dataUrl);
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function uploadImageFile(file, callback) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      showToast('Image must be under 10MB', 'error');
      return;
    }
    showToast('Processing image...', 'info');
    compressImage(file, 1200, 0.75).then(function(dataUrl) {
      try {
        var testKey = '__size_test__';
        localStorage.setItem(testKey, dataUrl);
        localStorage.removeItem(testKey);
      } catch (e) {
        showToast('Storage full! Delete some media first.', 'error');
        return;
      }
      callback(dataUrl);
    }).catch(function() {
      showToast('Failed to process image', 'error');
    });
  }

  function createFileInput(id, accept) {
    var input = document.createElement('input');
    input.type = 'file';
    input.id = id || 'hidden-file-input';
    input.accept = accept || 'image/*';
    input.style.display = 'none';
    document.body.appendChild(input);
    return input;
  }

  function showMediaBrowserModal(callback) {
    var media = MBSCMS.getMedia();
    var html = '<div style="max-height:400px;overflow-y:auto">';
    if (media.length === 0) {
      html += '<div class="empty-state"><p class="empty-state__text">No media uploaded yet. Upload images in the Media Library first.</p></div>';
    } else {
      html += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:12px">';
      media.forEach(function(item) {
        html += '<div class="media-browser-item" data-url="' + escapeHTML(item.url) + '" style="cursor:pointer;border:2px solid transparent;border-radius:8px;overflow:hidden;transition:border-color 0.2s">';
        html += '<img src="' + escapeHTML(item.url) + '" style="width:100%;height:80px;object-fit:cover;display:block" onerror="this.style.display=\'none\'">';
        html += '<div style="padding:6px;font-size:11px;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + escapeHTML(item.name) + '</div>';
        html += '</div>';
      });
      html += '</div>';
    }
    html += '</div>';

    showModal('Select Image', html, [
      { label: 'Cancel', className: 'btn btn--outline', onClick: closeModal }
    ]);

    setTimeout(function() {
      var items = document.querySelectorAll('.media-browser-item');
      items.forEach(function(item) {
        item.addEventListener('click', function() {
          var url = this.getAttribute('data-url');
          callback(url);
          closeModal();
        });
        item.addEventListener('mouseenter', function() {
          this.style.borderColor = 'var(--admin-primary)';
        });
        item.addEventListener('mouseleave', function() {
          this.style.borderColor = 'transparent';
        });
      });
    }, 50);
  }

  function imageInputWithUpload(id, label, value, cssClass) {
    var html = '<div class="form-group"><label class="form-label">' + label + '</label>';
    html += '<div class="image-input-row">';
    html += '<input type="text" class="form-input ' + (cssClass || '') + '" id="' + id + '" value="' + escapeHTML(value || '') + '" placeholder="Enter image URL or upload..." style="flex:1">';
    html += '<button type="button" class="btn btn--sm btn--outline upload-trigger-btn" data-target="' + id + '" title="Upload from PC"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg> Upload</button>';
    html += '<button type="button" class="btn btn--sm btn--primary browse-trigger-btn" data-target="' + id + '" title="Pick from media library"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> Browse</button>';
    html += '</div>';
    if (value) {
      html += '<div class="mt-8"><img src="' + escapeHTML(value) + '" class="image-preview image-preview--lg" onerror="this.style.display=\'none\'"></div>';
    }
    html += '</div>';
    return html;
  }

  /* ================================================================
     GLOBAL EVENT LISTENERS
     ================================================================ */

  function setupEventListeners() {
    // Logout button
    var logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        sessionStorage.removeItem('mbs_admin_auth');
        sessionStorage.removeItem('mbs_admin_auth_time');
        window.location.href = '/admin/login';
      });
    }

    // Mobile menu toggle
    var menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', function () {
        var sidebar = document.getElementById('admin-sidebar');
        if (sidebar) {
          sidebar.classList.toggle('open');
          var overlay = document.getElementById('sidebar-overlay');
          if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'sidebar-overlay';
            overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);z-index:90;display:none';
            overlay.addEventListener('click', function () {
              sidebar.classList.remove('open');
              overlay.style.display = 'none';
            });
            document.body.appendChild(overlay);
          }
          overlay.style.display = sidebar.classList.contains('open') ? 'block' : 'none';
        }
      });
    }

    // Modal close
    var modalClose = document.getElementById('modal-close');
    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    var modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeModal();
      });
    }

    // Reset button
    var resetBtn = document.getElementById('btn-reset-cms');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        showModal('Reset All Content', '<p>This will reset ALL content to defaults. This cannot be undone.</p><p>Are you sure?</p>', [
          { label: 'Cancel', className: 'btn btn--outline', onClick: closeModal },
          { label: 'Reset Everything', className: 'btn btn--danger', onClick: function () {
            MBSCMS.reset();
            refresh();
            closeModal();
            showToast('All content has been reset to defaults', 'success');
            window.location.hash = '#/';
            window.location.reload();
          }}
        ]);
      });
    }

    // Sidebar link clicks close mobile menu
    document.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('.sidebar-link') : null;
      if (link) {
        var sidebar = document.getElementById('admin-sidebar');
        if (sidebar) sidebar.classList.remove('open');
        var overlay = document.getElementById('sidebar-overlay');
        if (overlay) overlay.style.display = 'none';
      }
    });

    // Product search & filter (delegated)
    document.addEventListener('input', function (e) {
      if (e.target.id === 'product-search') {
        filterProducts();
      }
    });
    document.addEventListener('change', function (e) {
      if (e.target.id === 'product-category-filter') {
        filterProducts();
      }
    });

    // Media search & filter (delegated)
    document.addEventListener('input', function (e) {
      if (e.target.id === 'media-search') {
        filterMedia();
      }
    });
    document.addEventListener('change', function (e) {
      if (e.target.id === 'media-type-filter') {
        filterMedia();
      }
    });

    // Media library drag and drop
    var dropZone = document.getElementById('media-drop-zone');
    var fileInput = document.getElementById('media-file-input');

    if (dropZone && fileInput) {
      dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('media-upload-zone--active');
      });
      dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('media-upload-zone--active');
      });
      dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('media-upload-zone--active');
        var files = e.dataTransfer.files;
        handleMediaFiles(files);
      });
      fileInput.addEventListener('change', function() {
        handleMediaFiles(this.files);
        this.value = '';
      });
    }

    function handleMediaFiles(files) {
      if (!files || files.length === 0) return;
      var count = 0;
      var total = files.length;
      showToast('Uploading ' + total + ' image(s)...', 'info');

      function processNext() {
        if (count >= total) {
          showToast('All images uploaded!', 'success');
          refresh();
          navigateTo('#/media');
          return;
        }
        var file = files[count];
        if (!file.type.startsWith('image/')) {
          count++;
          processNext();
          return;
        }
        uploadImageFile(file, function(dataUrl) {
          MBSCMS.addMedia({
            url: dataUrl,
            name: file.name,
            type: 'other'
          });
          count++;
          processNext();
        });
      }
      processNext();
    }
  }

  function filterProducts() {
    var searchVal = (document.getElementById('product-search').value || '').toLowerCase();
    var catVal = document.getElementById('product-category-filter').value;
    var rows = document.querySelectorAll('#products-table tbody tr[data-product-id]');
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var name = row.getAttribute('data-name') || '';
      var cat = row.getAttribute('data-category') || '';
      var matchSearch = !searchVal || name.indexOf(searchVal) !== -1;
      var matchCat = !catVal || cat === catVal;
      row.style.display = (matchSearch && matchCat) ? '' : 'none';
    }
  }

  function filterMedia() {
    var searchVal = (document.getElementById('media-search').value || '').toLowerCase();
    var typeVal = document.getElementById('media-type-filter').value;
    var items = document.querySelectorAll('.media-item');
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var name = item.getAttribute('data-media-name') || '';
      var type = item.getAttribute('data-media-type') || '';
      var matchSearch = !searchVal || name.indexOf(searchVal) !== -1;
      var matchType = !typeVal || type === typeVal;
      item.style.display = (matchSearch && matchType) ? '' : 'none';
    }
  }

  /* ================================================================
     INIT
     ================================================================ */

  function init() {
    (window as any).__adminToggleSection = toggleSection;
    (window as any).__adminTogglePage = togglePage;
    MBSCMS.init();
    content = MBSCMS.getAll();
    renderSidebar();
    setupRouter();
    handleRoute();
    setupEventListeners();
  }

export default {
  init: init,
  toggleSection: toggleSection,
  togglePage: togglePage
};
