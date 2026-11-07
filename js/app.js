/**
 * ==========================================================================
 * PARVAII HAUTE COUTURE — INTERACTIVE APPLICATION CORE
 * Colors: Midnight Navy (#0B162A) & Champagne Sand (#C9B7A5)
 * Modern Vanilla JavaScript (ES6+) with zero dependencies
 * ==========================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     01. PRODUCT CATALOG DATA STORE
     -------------------------------------------------------------------------- */
  const CATALOG = [
    {
      id: 'parvaii-01',
      title: 'Midnight Bloom Top',
      subtitle: 'A little floral charm, a little everyday elegance.',
      category: 'tops',
      fabric: 'cotton',
      price: 499,
      image: 'assets/images/kurti-navy-floral.jpg',
      badge: 'THE FIRST DROP',
      spec: 'Colour: Navy Blue',
      craft: 'Colour: Navy Blue • Floral Charm',
      colors: ['#0B162A'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'A little floral charm, a little everyday elegance. Meet Midnight Bloom, a beautiful navy blue floral top designed to bring effortless style to your everyday wardrobe.',
      origin: 'Trivandrum Atelier',
      care: 'Gentle hand wash in cold water.'
    },
    {
      id: 'parvaii-02',
      title: 'The Everyday Edit',
      subtitle: 'A beautiful addition to your everyday wardrobe.',
      category: 'tops',
      fabric: 'cotton',
      price: 299,
      image: 'assets/images/kurti-yellow-floral.jpg',
      badge: 'NEW ARRIVAL',
      spec: 'Attached Sleeves',
      craft: 'Attached Sleeves • Easy to Style',
      colors: ['#D4A017'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'A beautiful addition to your everyday wardrobe. Easy to style, comfortable to wear, and perfect for days when you want to feel effortlessly put together. Attached Sleeves included.',
      origin: 'Trivandrum Atelier',
      care: 'Hand wash in cold water. Dry in shade.'
    },
    {
      id: 'parvaii-03',
      title: 'The Indigo Bloom Dress',
      subtitle: 'A breezy printed midi silhouette for effortless charm.',
      category: 'dresses',
      fabric: 'cotton',
      price: 699,
      image: 'assets/images/kurti-blue-dress.jpg',
      badge: 'LIMITED DROP',
      spec: 'Printed Midi',
      craft: 'Sleeveless Midi • Pure Soft Cotton',
      colors: ['#1B2E4B'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'A beautiful blue printed midi silhouette designed to bring everyday ease and natural charm to your wardrobe. Lightweight, breathable, and gracefully tailored.',
      origin: 'Trivandrum Atelier',
      care: 'Gentle hand wash in cold water.'
    }
  ];

  /* --------------------------------------------------------------------------
     02. APPLICATION STATE & PERSISTENCE
     -------------------------------------------------------------------------- */
  function getInitialCart() {
    try {
      const data = localStorage.getItem('parvaii_cart');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function getInitialWishlist() {
    try {
      const data = localStorage.getItem('parvaii_wishlist');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  const state = {
    cart: getInitialCart(),
    wishlist: getInitialWishlist(),
    filter: 'all',
    sortBy: 'featured',
    promoCode: '',
    discount: 0,
    deliveryFee: 50,
    upcomingWaitlist: []
  };

  /* --------------------------------------------------------------------------
     03. DOM ELEMENT REFERENCES
     -------------------------------------------------------------------------- */
  const els = {
    header: document.getElementById('siteHeader'),
    menuToggleBtn: document.getElementById('menuToggleBtn'),
    menuCloseBtn: document.getElementById('menuCloseBtn'),
    menuDrawer: document.getElementById('menuDrawer'),
    menuOverlay: document.getElementById('menuOverlay'),
    menuLinks: document.querySelectorAll('.menu-link'),
    cartDrawerOverlay: document.getElementById('cartDrawerOverlay'),
    cartOpenBtns: document.querySelectorAll('.cart-open-btn'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartBadge: document.getElementById('cartBadgeCount'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartSubtotal: document.getElementById('cartSubtotalAmount'),
    shippingProgress: document.getElementById('shippingProgressBar'),
    shippingNotice: document.getElementById('shippingNoticeText'),
    productGrid: document.getElementById('productGrid'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    sortSelect: document.getElementById('sortSelect'),
    wishlistCount: document.getElementById('wishlistCount'),
    quickviewModal: document.getElementById('quickviewModal'),
    quickviewClose: document.getElementById('quickviewClose'),
    quickviewContent: document.getElementById('quickviewContent'),
    searchModal: document.getElementById('searchModal'),
    searchOpenBtns: document.querySelectorAll('.search-open-btn'),
    searchCloseBtn: document.getElementById('searchCloseBtn'),
    searchField: document.getElementById('searchField'),
    searchResults: document.getElementById('searchResults'),
    toastContainer: document.getElementById('toastContainer'),
    // Loupe Elements
    loupeContainer: document.getElementById('loupeContainer'),
    loupeGlass: document.getElementById('loupeGlass'),
    loupeImg: document.getElementById('loupeImg'),
    // Fit Finder
    bustSlider: document.getElementById('bustSlider'),
    bustValue: document.getElementById('bustValue'),
    waistSlider: document.getElementById('waistSlider'),
    waistValue: document.getElementById('waistValue'),
    heightSlider: document.getElementById('heightSlider'),
    heightValue: document.getElementById('heightValue'),
    fitPrefBtns: document.querySelectorAll('.fit-pref-btn'),
    recommendedSize: document.getElementById('recommendedSize'),
    specGarmentChest: document.getElementById('specGarmentChest'),
    specKurtiLength: document.getElementById('specKurtiLength'),
    specKurtiNote: document.getElementById('specKurtiNote'),
    specEase: document.getElementById('specEase'),
    specEaseNote: document.getElementById('specEaseNote'),
    applySizeBtn: document.getElementById('applySizeBtn'),
    // Upcoming Silhouettes Waitlist
    upcomingNotifyBtns: document.querySelectorAll('.upcoming-notify-btn'),
    // Promo Form
    promoForm: document.getElementById('promoForm'),
    promoInput: document.getElementById('promoInput'),
    // Checkout
    checkoutBtn: document.getElementById('checkoutBtn'),
    checkoutModal: document.getElementById('checkoutModal'),
    checkoutCloseBtn: document.getElementById('checkoutCloseBtn'),
    checkoutPayBtn: document.getElementById('checkoutPayBtn')
  };

  /* --------------------------------------------------------------------------
     04. INITIALIZATION
     -------------------------------------------------------------------------- */
  function init() {
    setupScrollEffects();
    setupMenuDrawer();
    renderProducts();
    renderCart();
    setupCartDrawer();
    setupQuickView();
    setupSearchModal();
    setupWeaveLoupe();
    setupFitFinder();
    setupUpcomingNotify();
    setupPromoCode();
    setupCheckoutModal();
    setupScrollReveals();
    setupHeroBanner();
    setupLuxury360();
    setupProductPage();
  }

  /* --------------------------------------------------------------------------
     04b. HERO BANNER SLIDER & INTERACTIONS
     -------------------------------------------------------------------------- */
  function setupHeroBanner() {
    let currentHeroSlide = 0;
    const totalHeroSlides = 5;
    const slideNumberEl = document.getElementById('heroSlideNumber');
    const progressFillEl = document.getElementById('heroProgressFill');
    const prevBtn = document.getElementById('heroPrevBtn');
    const nextBtn = document.getElementById('heroNextBtn');

    function updateHeroSlide(index) {
      currentHeroSlide = (index + totalHeroSlides) % totalHeroSlides;
      if (slideNumberEl) {
        slideNumberEl.innerHTML = `${String(currentHeroSlide + 1).padStart(2, '0')} <small>/ 05</small>`;
      }
      if (progressFillEl) {
        const pct = (currentHeroSlide + 1) * 20;
        progressFillEl.style.width = `${pct}%`;
        const bar = progressFillEl.parentElement;
        if (bar) bar.setAttribute('aria-valuenow', pct);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => updateHeroSlide(currentHeroSlide - 1));
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => updateHeroSlide(currentHeroSlide + 1));
    }

    // Keyboard navigation when not focused in input fields
    document.addEventListener('keydown', (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') return;
      if (els.searchModal && els.searchModal.classList.contains('active')) return;
      if (els.quickviewModal && els.quickviewModal.classList.contains('active')) return;

      if (e.key === 'ArrowRight') updateHeroSlide(currentHeroSlide + 1);
      if (e.key === 'ArrowLeft') updateHeroSlide(currentHeroSlide - 1);
    });
  }

  /* --------------------------------------------------------------------------
     05. SCROLL EFFECTS & STICKY HEADER
     -------------------------------------------------------------------------- */
  function setupScrollEffects() {
    if (!els.header) return;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 80) {
        els.header.classList.add('header-scrolled');
      } else {
        els.header.classList.remove('header-scrolled');
      }
    }, { passive: true });

    // Maison Philosophy Hotspot overlay click
    const philosophyHotspot = document.querySelector('.philosophy-hotspot');
    if (philosophyHotspot) {
      const scrollToStory = () => {
        const target = document.getElementById('story') || document.getElementById('weave');
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      };
      philosophyHotspot.addEventListener('click', scrollToStory);
      philosophyHotspot.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          scrollToStory();
        }
      });
    }
  }

  function setupMenuDrawer() {
    if (!els.menuToggleBtn || !els.menuDrawer || !els.menuOverlay) return;

    function openMenu() {
      els.menuDrawer.classList.add('is-open');
      els.menuDrawer.setAttribute('aria-hidden', 'false');
      els.menuOverlay.hidden = false;
      els.menuToggleBtn.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
    }

    function closeMenu() {
      els.menuDrawer.classList.remove('is-open');
      els.menuDrawer.setAttribute('aria-hidden', 'true');
      els.menuOverlay.hidden = true;
      els.menuToggleBtn.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }

    els.menuToggleBtn.addEventListener('click', openMenu);
    if (els.menuCloseBtn) els.menuCloseBtn.addEventListener('click', closeMenu);
    els.menuOverlay.addEventListener('click', closeMenu);
    els.menuLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && els.menuDrawer.classList.contains('is-open')) {
        closeMenu();
      }
    });
  }

  /* --------------------------------------------------------------------------
     06. PRODUCT GRID RENDERING & FILTERING
     -------------------------------------------------------------------------- */
  function renderProducts() {
    if (!els.productGrid) return;

    let items = [...CATALOG];

    // Filter
    if (state.filter !== 'all') {
      items = items.filter(item => item.category === state.filter || item.fabric === state.filter);
    }

    // Sort
    if (state.sortBy === 'price-low') {
      items.sort((a, b) => a.price - b.price);
    } else if (state.sortBy === 'price-high') {
      items.sort((a, b) => b.price - a.price);
    }

    els.productGrid.innerHTML = items.map(product => {
      const isWishlisted = state.wishlist.includes(product.id);
      return `
        <article class="product-card reveal-on-scroll" data-id="${product.id}">
          <div class="product-media-wrap">
            <span class="card-badge">${product.badge}</span>
            <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" 
                    aria-label="Save to Wishlist" 
                    data-action="wishlist" 
                    data-id="${product.id}">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
            <a href="product.html?id=${product.id}" class="card-hover-action" aria-label="View Details for ${product.title}">
              <span>✦ Explore Piece Details →</span>
            </a>
          </div>
          <div class="product-info">
            <span class="product-eyebrow">${product.spec}</span>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-subtitle">${product.craft || product.subtitle}</p>
            <div class="product-meta-row">
              <span class="product-price">₹${product.price}</span>
              <span class="product-sizes-badge">Sizes: XS – XL</span>
            </div>
            <div class="product-card-divider"></div>
            <div class="product-card-actions">
              <a href="product.html?id=${product.id}" class="btn-card-details" aria-label="View Details for ${product.title}">
                <span>View Details</span>
              </a>
              <button class="btn-card-order" data-action="quick-add" data-id="${product.id}" data-size="${product.sizes[0]}" aria-label="Order Now ${product.title}">
                <span>Order Now</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    attachProductCardEvents();
    setupScrollReveals();
  }

  function attachProductCardEvents() {
    els.productGrid.querySelectorAll('[data-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = btn.dataset.action;
        const id = btn.dataset.id;
        const product = CATALOG.find(item => item.id === id);
        if (!product) return;

        if (action === 'wishlist') {
          toggleWishlist(id, btn);
        } else if (action === 'quick-add') {
          const size = btn.dataset.size || product.sizes[0];
          addToCart(product, size);
        } else if (action === 'quick-view') {
          openQuickView(product);
        }
      });
    });

    // Filter Buttons
    els.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        els.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.filter = btn.dataset.filter;
        renderProducts();
      });
    });

    // Sort Select
    if (els.sortSelect) {
      els.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }
  }

  /* --------------------------------------------------------------------------
     07. WISHLIST MANAGEMENT
     -------------------------------------------------------------------------- */
  function toggleWishlist(id, btn) {
    const index = state.wishlist.indexOf(id);
    const product = CATALOG.find(p => p.id === id);

    if (index > -1) {
      state.wishlist.splice(index, 1);
      btn.classList.remove('active');
      btn.querySelector('svg').setAttribute('fill', 'none');
      showToast(`Removed "${product.title}" from your wishlist.`, 'heart');
    } else {
      state.wishlist.push(id);
      btn.classList.add('active');
      btn.querySelector('svg').setAttribute('fill', 'currentColor');
      showToast(`Saved "${product.title}" to your wishlist.`, 'heart');
    }

    if (els.wishlistCount) {
      els.wishlistCount.textContent = state.wishlist.length;
    }
  }

  const headerWishlistBtn = document.getElementById('headerWishlistBtn');
  if (headerWishlistBtn) {
    headerWishlistBtn.addEventListener('click', () => {
      if (state.wishlist.length > 0) {
        showToast(`Your atelier wishlist has ${state.wishlist.length} curated silhouette${state.wishlist.length > 1 ? 's' : ''}.`, 'heart');
      } else {
        showToast('Your atelier wishlist is currently empty.', 'heart');
      }
    });
  }

  /* --------------------------------------------------------------------------
     08. CART SYSTEM & SLIDE-OVER DRAWER
     -------------------------------------------------------------------------- */
  function setupCartDrawer() {
    els.cartOpenBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartDrawer();
      });
    });

    if (els.cartCloseBtn) {
      els.cartCloseBtn.addEventListener('click', closeCartDrawer);
    }

    if (els.cartDrawerOverlay) {
      els.cartDrawerOverlay.addEventListener('click', (e) => {
        if (e.target === els.cartDrawerOverlay) {
          closeCartDrawer();
        }
      });
    }

    // Keyboard ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeQuickView();
        closeSearchModal();
        closeCheckoutModal();
      }
    });
  }

  function openCartDrawer() {
    els.cartDrawerOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    els.cartDrawerOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function addToCart(product, size = 'M', color = 'Signature', qty = 1, openDrawer = true) {
    const quantity = Math.max(1, parseInt(qty, 10) || 1);
    const existing = state.cart.find(item => item.id === product.id && item.size === size);
    if (existing) {
      existing.quantity += quantity;
    } else {
      state.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        size: size,
        color: color,
        image: product.image,
        quantity: quantity
      });
    }
    renderCart();
    if (openDrawer) {
      openCartDrawer();
    } else {
      const qtyText = quantity > 1 ? `${quantity}x ` : '';
      showToast(`Added ${qtyText}"${product.title}" (${size}) to bag.`, 'bag');
    }
  }

  function renderCart() {
    try {
      localStorage.setItem('parvaii_cart', JSON.stringify(state.cart));
    } catch (e) {}

    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotalRaw = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotalRaw * state.discount;
    const finalSubtotal = subtotalRaw - discountAmount;

    if (els.cartBadge) {
      els.cartBadge.textContent = totalItems;
      els.cartBadge.style.transform = 'scale(1.25)';
      setTimeout(() => els.cartBadge.style.transform = 'scale(1)', 200);
    }

    // Shipping progress
    // Delivery fee & policy notice
    if (els.shippingProgress && els.shippingNotice) {
      els.shippingProgress.style.width = '100%';
      els.shippingNotice.innerHTML = '✦ <strong>Delivery Charge: ₹50</strong> &bull; Cash on Delivery: Not Available';
    }

    if (els.cartSubtotal) {
      const grandTotal = finalSubtotal > 0 ? (finalSubtotal + state.deliveryFee) : 0;
      els.cartSubtotal.textContent = `₹${grandTotal.toFixed(0)}`;

      const checkoutLabel = document.getElementById('checkoutBtnLabel');
      if (checkoutLabel) {
        if (state.cart.length > 0) {
          checkoutLabel.textContent = `Order via WhatsApp • ₹${grandTotal.toFixed(0)}`;
        } else {
          checkoutLabel.textContent = 'Order via WhatsApp';
        }
      }
    }

    // Cart Items
    if (!els.cartItemsList) return;

    if (state.cart.length === 0) {
      els.cartItemsList.innerHTML = `
        <div class="empty-cart-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <p style="font-family: var(--font-display); font-size: 1.35rem; margin-bottom: 0.5rem;">Your shopping bag is empty</p>
          <p style="font-size: 0.85rem; color: var(--c-muted);">Discover pieces worth falling for.</p>
        </div>
      `;
      return;
    }

    els.cartItemsList.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-header">
            <h4 class="cart-item-name">${item.title}</h4>
            <button class="remove-item-btn" data-cart-action="remove" data-index="${idx}" aria-label="Remove item">Remove</button>
          </div>
          <span class="cart-item-meta">Size: ${item.size} &bull; ${item.color}</span>
          <div class="cart-item-bottom">
            <div class="qty-control">
              <button class="qty-btn" data-cart-action="dec" data-index="${idx}" aria-label="Decrease quantity">&minus;</button>
              <span class="qty-number">${item.quantity}</span>
              <button class="qty-btn" data-cart-action="inc" data-index="${idx}" aria-label="Increase quantity">&plus;</button>
            </div>
            <span class="cart-item-price">₹${(item.price * item.quantity).toFixed(0)}</span>
          </div>
        </div>
      </div>
    `).join('');

    // Attach cart item listeners
    els.cartItemsList.querySelectorAll('[data-cart-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.cartAction;
        const index = parseInt(btn.dataset.index, 10);
        if (action === 'inc') {
          state.cart[index].quantity += 1;
        } else if (action === 'dec') {
          if (state.cart[index].quantity > 1) {
            state.cart[index].quantity -= 1;
          } else {
            state.cart.splice(index, 1);
          }
        } else if (action === 'remove') {
          state.cart.splice(index, 1);
        }
        renderCart();
      });
    });
  }

  /* --------------------------------------------------------------------------
     09. PROMO CODE SYSTEM
     -------------------------------------------------------------------------- */
  function setupPromoCode() {
    if (!els.promoForm) return;

    els.promoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = els.promoInput.value.trim().toUpperCase();

      if (code === 'PARVAII10') {
        state.discount = 0.10;
        state.promoCode = code;
        renderCart();
        showToast('Code PARVAII10 applied! 10% Haute Couture discount added.', 'discount');
        els.promoInput.disabled = true;
      } else if (code === 'HERITAGE20') {
        state.discount = 0.20;
        state.promoCode = code;
        renderCart();
        showToast('VIP Code HERITAGE20 applied! 20% discount added.', 'discount');
        els.promoInput.disabled = true;
      } else {
        showToast('Invalid code. Try "PARVAII10" for 10% off.', 'alert');
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. UPCOMING PRODUCT DROPS & VIP WAITLIST
     -------------------------------------------------------------------------- */
  function setupUpcomingNotify() {
    const notifyBtns = els.upcomingNotifyBtns || document.querySelectorAll('.upcoming-notify-btn');
    notifyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const product = btn.dataset.product || 'Upcoming Silhouette';
        if (btn.classList.contains('waitlisted')) {
          showToast(`You are already on the priority list for "${product}"!`, 'info');
          return;
        }
        btn.classList.add('waitlisted');
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg><span>Waitlisted</span>`;

        // Update counter if present on card
        const card = btn.closest('.upcoming-card');
        if (card) {
          const countEl = card.querySelector('.waitlist-count');
          if (countEl) {
            const currentMatch = countEl.textContent.match(/(\d+)/);
            const currentCount = currentMatch ? parseInt(currentMatch[1], 10) : 100;
            countEl.textContent = `✦ ${(currentCount + 1).toLocaleString()} Waiting`;
          }
        }

        if (!state.upcomingWaitlist.includes(product)) {
          state.upcomingWaitlist.push(product);
        }

        showToast(`You're on the priority waitlist for "${product}"! We'll alert you 2 hours before the public drop.`, 'sparkle');
      });
    });
  }

  /* --------------------------------------------------------------------------
     11. ADVANCED FEATURE 2: VIRTUAL WEAVE & FABRIC LOUPE
     -------------------------------------------------------------------------- */
  function setupWeaveLoupe() {
    if (!els.loupeContainer || !els.loupeGlass || !els.loupeImg) return;

    const glass = els.loupeGlass;
    const img = els.loupeImg;
    const zoom = 2.8;

    glass.style.backgroundImage = `url('${img.src}')`;

    els.loupeContainer.addEventListener('mouseenter', () => {
      glass.style.display = 'block';
      const w = img.offsetWidth;
      const h = img.offsetHeight;
      glass.style.backgroundSize = `${w * zoom}px ${h * zoom}px`;
    });

    els.loupeContainer.addEventListener('mouseleave', () => {
      glass.style.display = 'none';
    });

    els.loupeContainer.addEventListener('mousemove', (e) => {
      const rect = els.loupeContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const glassRadius = glass.offsetWidth / 2;

      // Position glass centered at cursor
      glass.style.left = `${x - glassRadius}px`;
      glass.style.top = `${y - glassRadius}px`;

      // Calculate zoomed background coordinates
      const bgX = (x * zoom) - glassRadius;
      const bgY = (y * zoom) - glassRadius;

      glass.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    });
  }

  /* --------------------------------------------------------------------------
     12. ADVANCED FEATURE 3: SMART FIT & SIZE RECOMMENDER
     -------------------------------------------------------------------------- */
  function setupFitFinder() {
    if (!els.bustSlider) return;
    let currentFitPref = 'comfort';

    function recalculateSize() {
      const bust = parseFloat(els.bustSlider.value);
      const waist = parseFloat(els.waistSlider.value);
      const height = parseFloat(els.heightSlider.value);

      if (els.bustValue) els.bustValue.textContent = `${bust}"`;
      if (els.waistValue) els.waistValue.textContent = `${waist}"`;
      if (els.heightValue) els.heightValue.textContent = `${Math.floor(height / 12)}'${height % 12}"`;

      let size = 'M';
      let easeValue = '+3 inches';
      let easeNote = 'Comfort Drape';
      let kurtiValue = '44 inches';
      let kurtiNote = 'Calf Length';

      // Kurti Sizing logic based on garment ease
      let garmentChest = bust + 3;

      if (currentFitPref === 'tailored') {
        garmentChest = bust + 2;
        easeValue = '+2 inches';
        easeNote = 'Contoured Fit';
      } else if (currentFitPref === 'relaxed') {
        garmentChest = bust + 4.5;
        easeValue = '+4.5 inches';
        easeNote = 'Relaxed Flow';
      }

      if (garmentChest <= 35) size = 'XS';
      else if (garmentChest <= 38) size = 'S';
      else if (garmentChest <= 41) size = 'M';
      else if (garmentChest <= 44) size = 'L';
      else if (garmentChest <= 47) size = 'XL';
      else size = 'XXL';

      if (height < 62) {
        kurtiValue = '41 inches';
        kurtiNote = 'Tailored Petite';
      } else if (height > 68) {
        kurtiValue = '47 inches';
        kurtiNote = 'Statuesque Fall';
      }

      if (els.recommendedSize) els.recommendedSize.textContent = size;
      if (els.specGarmentChest) els.specGarmentChest.textContent = `${garmentChest.toFixed(1)}"`;
      if (els.specKurtiLength) els.specKurtiLength.textContent = kurtiValue;
      if (els.specKurtiNote) els.specKurtiNote.textContent = kurtiNote;
      if (els.specEase) els.specEase.textContent = easeValue;
      if (els.specEaseNote) els.specEaseNote.textContent = easeNote;
    }

    if (els.bustSlider) els.bustSlider.addEventListener('input', recalculateSize);
    if (els.waistSlider) els.waistSlider.addEventListener('input', recalculateSize);
    if (els.heightSlider) els.heightSlider.addEventListener('input', recalculateSize);

    els.fitPrefBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        els.fitPrefBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFitPref = btn.dataset.pref;
        recalculateSize();
      });
    });

    if (els.applySizeBtn) {
      els.applySizeBtn.addEventListener('click', () => {
        const size = els.recommendedSize.textContent;
        showToast(`Fit preference calibrated: Size ${size} selected across collections!`, 'check');
      });
    }

    recalculateSize();
  }

  /* --------------------------------------------------------------------------
     13. QUICK VIEW MODAL
     -------------------------------------------------------------------------- */
  function setupQuickView() {
    if (els.quickviewClose) {
      els.quickviewClose.addEventListener('click', closeQuickView);
    }
    if (els.quickviewModal) {
      els.quickviewModal.addEventListener('click', (e) => {
        if (e.target === els.quickviewModal) closeQuickView();
      });
    }
  }

  function openQuickView(product) {
    if (!els.quickviewContent) return;

    let selectedSize = product.sizes && product.sizes.length > 1 ? product.sizes[1] : (product.sizes[0] || 'M');
    let quantity = 1;

    function getWhatsappUrl() {
      const totalPrice = product.price * quantity;
      const text = `Hello Parvaii Atelier! I would like to order:\n\n*${product.title}*\n• Size: ${selectedSize}\n• Quantity: ${quantity}\n• Total: ₹${totalPrice}\n\nPlease assist with payment and dispatch details.`;
      return `https://wa.me/916238962054?text=${encodeURIComponent(text)}`;
    }

    els.quickviewContent.innerHTML = `
      <div class="modal-media">
        <span class="modal-media-badge">${product.badge || 'ATELIER EXCLUSIVE'}</span>
        <img src="${product.image}" alt="${product.title}">
        <div class="modal-media-origin-tag">
          <span>✦ Pure Cotton Atelier Edit &bull; Handcrafted in Trivandrum</span>
        </div>
      </div>
      <div class="modal-details">
        <div class="modal-header-row">
          <span class="modal-eyebrow">${product.origin} &bull; ${product.spec || 'Pure Cotton'}</span>
          <span class="modal-stock-status">
            <span class="stock-pulse"></span>
            In Stock
          </span>
        </div>

        <h2 class="modal-product-title">${product.title}</h2>

        <div class="modal-price-wrap">
          <span class="modal-price" id="quickviewPriceDisplay">₹${product.price}</span>
          <span class="modal-price-tax">MRP inclusive of all taxes &bull; Trivandrum Atelier</span>
        </div>

        <p class="modal-description">${product.description}</p>

        <!-- Size Selection -->
        <div class="modal-option-header">
          <span class="modal-option-label">Select Size: <strong id="quickviewSizeLabel">${selectedSize}</strong></span>
          <button type="button" class="modal-size-guide-btn" id="modalSizeGuideTrigger">✦ Size Chart</button>
        </div>
        <div class="modal-size-picker" id="modalSizePicker" role="radiogroup" aria-label="Select Size">
          ${product.sizes.map(s => `
            <button type="button" class="modal-size-btn ${s === selectedSize ? 'is-selected' : ''}" data-size="${s}" aria-checked="${s === selectedSize ? 'true' : 'false'}" role="radio">
              ${s}
            </button>
          `).join('')}
        </div>

        <!-- Quantity Stepper ("num btn") -->
        <div class="modal-option-header" style="margin-bottom: 0.45rem;">
          <span class="modal-option-label">Quantity</span>
          <span style="font-size: 0.72rem; color: var(--c-muted);">Subtotal: <strong style="color: var(--c-midnight);" id="quickviewSubtotalDisplay">₹${product.price}</strong></span>
        </div>
        <div class="modal-purchase-controls">
          <div class="modal-qty-stepper">
            <button type="button" class="qty-btn qty-minus" id="quickviewQtyMinus" aria-label="Decrease Quantity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
            <span class="qty-count" id="quickviewQtyCount">1</span>
            <button type="button" class="qty-btn qty-plus" id="quickviewQtyPlus" aria-label="Increase Quantity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </button>
          </div>

          <div style="font-size: 0.72rem; color: #64748B;">
            <span>Standard Kerala Delivery: ₹50</span>
          </div>
        </div>

        <!-- Dual Action Buttons: Add to Cart & Buy Now -->
        <div class="modal-actions-group">
          <button type="button" class="btn-modal-cart" id="modalAddCartBtn">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>
            <span>Add to Cart</span>
          </button>

          <button type="button" class="btn-modal-buynow" id="modalBuyNowBtn">
            <span>Buy Now</span>
            <span class="btn-arrow">→</span>
          </button>
        </div>

        <!-- Instant WhatsApp Ordering Direct Option -->
        <a href="${getWhatsappUrl()}" class="modal-whatsapp-direct" id="modalWhatsappDirect" target="_blank" rel="noopener noreferrer">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
          </svg>
          <span>Or Order via WhatsApp Assistant (+91 62389 62054)</span>
        </a>

        <!-- Specs & Garment Care -->
        <div class="modal-garment-specs">
          <div class="spec-row">
            <span class="spec-key">Fabric & Style:</span>
            <span class="spec-val">${product.craft || product.spec}</span>
          </div>
          <div class="spec-row">
            <span class="spec-key">Wash Care:</span>
            <span class="spec-val">${product.care}</span>
          </div>
          <div class="spec-row">
            <span class="spec-key">Origin:</span>
            <span class="spec-val">Handcrafted in our Trivandrum Atelier</span>
          </div>
        </div>

        <!-- Trust Badges -->
        <div class="modal-trust-strip">
          <span class="trust-item"><span class="trust-icon">✦</span> 100% Breathable Cotton</span>
          <span class="trust-item"><span class="trust-icon">✦</span> Atelier Packaging</span>
          <span class="trust-item"><span class="trust-icon">✦</span> Direct Artisanship</span>
        </div>
      </div>
    `;

    // Elements
    const sizeBtns = els.quickviewContent.querySelectorAll('#modalSizePicker .modal-size-btn');
    const sizeLabel = els.quickviewContent.querySelector('#quickviewSizeLabel');
    const qtyCount = els.quickviewContent.querySelector('#quickviewQtyCount');
    const qtyMinus = els.quickviewContent.querySelector('#quickviewQtyMinus');
    const qtyPlus = els.quickviewContent.querySelector('#quickviewQtyPlus');
    const subtotalDisplay = els.quickviewContent.querySelector('#quickviewSubtotalDisplay');
    const addCartBtn = els.quickviewContent.querySelector('#modalAddCartBtn');
    const buyNowBtn = els.quickviewContent.querySelector('#modalBuyNowBtn');
    const whatsappLink = els.quickviewContent.querySelector('#modalWhatsappDirect');
    const sizeGuideBtn = els.quickviewContent.querySelector('#modalSizeGuideTrigger');

    function updateView() {
      if (qtyCount) qtyCount.textContent = quantity;
      if (sizeLabel) sizeLabel.textContent = selectedSize;
      const subtotal = product.price * quantity;
      if (subtotalDisplay) subtotalDisplay.textContent = `₹${subtotal}`;
      if (buyNowBtn) buyNowBtn.innerHTML = `<span>Buy Now &bull; ₹${subtotal}</span><span class="btn-arrow">→</span>`;
      if (whatsappLink) whatsappLink.href = getWhatsappUrl();
    }

    // Initialize with current values
    updateView();

    // Size Selection
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => {
          b.classList.remove('is-selected');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('is-selected');
        btn.setAttribute('aria-checked', 'true');
        selectedSize = btn.dataset.size;
        updateView();
      });
    });

    // Quantity Stepper ("num btn")
    if (qtyMinus) {
      qtyMinus.addEventListener('click', () => {
        if (quantity > 1) {
          quantity -= 1;
          updateView();
        }
      });
    }

    if (qtyPlus) {
      qtyPlus.addEventListener('click', () => {
        if (quantity < 10) {
          quantity += 1;
          updateView();
        }
      });
    }

    // Size guide prompt
    if (sizeGuideBtn) {
      sizeGuideBtn.addEventListener('click', () => {
        showToast('Size Guide: XS (32"), S (34"), M (36"), L (38"), XL (40") Bust.', 'info');
      });
    }

    // Add To Cart
    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        addToCart(product, selectedSize, 'Signature', quantity, true);
        closeQuickView();
      });
    }

    // Buy Now: Add to cart and immediately open WhatsApp!
    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        addToCart(product, selectedSize, 'Signature', quantity, false);
        closeQuickView();
        const total = product.price * quantity + 50;
        const msg = `Hello PARVAII Atelier! 🌸\n\nI would like to order:\n\n1. *${product.title}*\n   • Size: ${selectedSize}\n   • Quantity: ${quantity}\n   • Price: ₹${product.price} each (₹${product.price * quantity})\n\n──────────────\n• Delivery Charge: ₹50 (Kerala)\n• *TOTAL PAYABLE: ₹${total}*\n──────────────\n\n*My Delivery Details:*\n• Name:\n• Delivery Address:\n• Pincode:\n• Phone Number:\n\nPlease confirm my order and share payment details. Thank you!`;
        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        showToast('Connecting directly to WhatsApp with your order details...', 'bag');
      });
    }

    els.quickviewModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (els.quickviewModal) {
      els.quickviewModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  /* --------------------------------------------------------------------------
     14. SEARCH MODAL SYSTEM
     -------------------------------------------------------------------------- */
  function setupSearchModal() {
    els.searchOpenBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearchModal();
      });
    });

    if (els.searchCloseBtn) els.searchCloseBtn.addEventListener('click', closeSearchModal);
    if (els.searchModal) {
      els.searchModal.addEventListener('click', (e) => {
        if (e.target === els.searchModal) closeSearchModal();
      });
    }

    if (els.searchField) {
      els.searchField.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        renderSearchResults(query);
      });
    }

    // Quick tag clicks
    document.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const term = tag.textContent.trim();
        if (els.searchField) {
          els.searchField.value = term;
          renderSearchResults(term.toLowerCase());
        }
      });
    });
  }

  function openSearchModal() {
    els.searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (els.searchField) els.searchField.focus();
    }, 100);
  }

  function closeSearchModal() {
    els.searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderSearchResults(query) {
    if (!els.searchResults) return;

    if (!query) {
      els.searchResults.innerHTML = '<p style="color: var(--c-muted); font-size: 0.9rem;">Type to search styles, floral tops, or new arrivals...</p>';
      return;
    }

    const matches = CATALOG.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      (item.spec && item.spec.toLowerCase().includes(query)) ||
      item.craft.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      els.searchResults.innerHTML = `<p style="color: var(--c-muted);">No styles found matching "${query}".</p>`;
      return;
    }

    els.searchResults.innerHTML = `
      <div style="display: grid; gap: 1rem; margin-top: 1rem;">
        ${matches.map(m => `
          <div style="display: flex; gap: 1.25rem; align-items: center; cursor: pointer; padding: 0.5rem; border-bottom: 1px solid var(--c-border);" data-search-id="${m.id}">
            <img src="${m.image}" alt="${m.title}" style="width: 54px; height: 68px; object-fit: cover; border-radius: 6px;">
            <div>
              <h4 style="font-size: 1.15rem; color: var(--c-midnight);">${m.title}</h4>
              <p style="font-size: 0.8rem; color: var(--c-muted);">${m.spec || m.craft} • ₹${m.price}</p>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    els.searchResults.querySelectorAll('[data-search-id]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.searchId;
        const prod = CATALOG.find(p => p.id === id);
        if (prod) {
          closeSearchModal();
          openQuickView(prod);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     15. DIRECT WHATSAPP ORDER & CHECKOUT FLOW
     -------------------------------------------------------------------------- */
  const WHATSAPP_PHONE = '916238962054';

  function buildCartWhatsAppMessage() {
    if (state.cart.length === 0) return '';

    const subtotalRaw = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotalRaw * state.discount;
    const finalSub = subtotalRaw - discountAmount;
    const grandTotal = finalSub > 0 ? (finalSub + state.deliveryFee) : 0;

    const itemsList = state.cart.map((item, idx) => {
      return `${idx + 1}. *${item.title}*\n   • Size: ${item.size}\n   • Quantity: ${item.quantity}\n   • Price: ₹${item.price} each (₹${item.price * item.quantity})`;
    }).join('\n\n');

    let msg = `Hello PARVAII Atelier! 🌸\n\nI would like to place an order from your collection:\n\n${itemsList}\n\n`;
    msg += `──────────────\n`;
    msg += `• Subtotal: ₹${subtotalRaw.toFixed(0)}\n`;
    if (state.discount > 0) {
      msg += `• Promo Discount (${(state.discount * 100).toFixed(0)}%): -₹${discountAmount.toFixed(0)}\n`;
    }
    msg += `• Delivery Charge: ₹${state.deliveryFee} (Kerala)\n`;
    msg += `• *TOTAL PAYABLE: ₹${grandTotal.toFixed(0)}*\n`;
    msg += `──────────────\n\n`;
    msg += `*My Delivery Details:*\n`;
    msg += `• Name:\n`;
    msg += `• Delivery Address:\n`;
    msg += `• Pincode:\n`;
    msg += `• Phone Number:\n\n`;
    msg += `Please confirm my order and share payment details. Thank you!`;

    return msg;
  }

  function setupCheckoutModal() {
    if (els.checkoutBtn) {
      els.checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (state.cart.length === 0) {
          showToast('Your shopping bag is empty. Please select a piece first.', 'alert');
          return;
        }

        const msg = buildCartWhatsAppMessage();
        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        showToast('Connecting directly to WhatsApp with your order details...', 'bag');
      });
    }

    if (els.checkoutCloseBtn) {
      els.checkoutCloseBtn.addEventListener('click', closeCheckoutModal);
    }

    if (els.checkoutModal) {
      els.checkoutModal.addEventListener('click', (e) => {
        if (e.target === els.checkoutModal) closeCheckoutModal();
      });
    }

    if (els.checkoutPayBtn) {
      els.checkoutPayBtn.addEventListener('click', () => {
        els.checkoutPayBtn.innerHTML = '<span>Connecting to WhatsApp Concierge...</span>';
        setTimeout(() => {
          closeCheckoutModal();
          const msg = buildCartWhatsAppMessage();
          const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }, 600);
      });
    }
  }

  function openCheckoutModal() {
    if (!els.checkoutModal) return;
    closeCartDrawer();
    els.checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const subtotalRaw = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalSub = subtotalRaw - (subtotalRaw * state.discount);
    const grandTotal = finalSub > 0 ? (finalSub + state.deliveryFee) : 0;

    const summaryEl = document.getElementById('checkoutSummaryTotal');
    if (summaryEl) {
      summaryEl.textContent = `₹${grandTotal.toFixed(0)}`;
    }
  }

  function closeCheckoutModal() {
    if (els.checkoutModal) {
      els.checkoutModal.classList.remove('active');
      document.body.style.overflow = '';
      if (els.checkoutPayBtn) {
        els.checkoutPayBtn.innerHTML = '<span>Complete Order & Authorize</span>';
      }
    }
  }

  /* --------------------------------------------------------------------------
     16. TOAST NOTIFICATION ENGINE
     -------------------------------------------------------------------------- */
  function showToast(message, type = 'info') {
    if (!els.toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    let iconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    `;

    if (type === 'heart') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      `;
    } else if (type === 'bag') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      `;
    } else if (type === 'check') {
      iconSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    els.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  /* --------------------------------------------------------------------------
     17. SCROLL OBSERVER (INTERSECTION OBSERVER)
     -------------------------------------------------------------------------- */
  function setupScrollReveals() {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal-on-scroll:not(.revealed)').forEach(el => {
      observer.observe(el);
    });
  }

  /* --------------------------------------------------------------------------
     18. PARVAII LUXURY 360 INTERACTIVE VIEWER & 3D GLB STUDIO
     -------------------------------------------------------------------------- */
  function setupLuxury360() {
    const section = document.getElementById('luxury-360');
    if (!section) return;

    const stage = section.querySelector('.stage');
    const modelViewer = section.querySelector('#kurti3d');
    const turner = section.querySelector('#turner');
    const product = section.querySelector('#product');
    const rotateBtn = section.querySelector('#rotateBtn');
    const zoomBtn = section.querySelector('#zoomBtn');
    const resetBtn = section.querySelector('#resetBtn');
    const thumbs = Array.from(section.querySelectorAll('.thumb'));
    const overlay = document.getElementById('detailOverlay');
    const detailImage = document.getElementById('detailImage');
    const closeDetail = document.getElementById('closeDetail');

    let is3dActive = false;

    // Synchronize 3D model-viewer events
    if (modelViewer) {
      modelViewer.addEventListener('load', () => {
        is3dActive = true;
        if (stage) stage.classList.add('has-3d-model');
        if (rotateBtn) rotateBtn.setAttribute('aria-pressed', 'true');
      });

      modelViewer.addEventListener('error', (err) => {
        console.warn('3D Model Viewer error, falling back to 2D view:', err);
        is3dActive = false;
        if (stage) stage.classList.remove('has-3d-model');
      });

      // Synchronize front/back thumbnail active states with 3D camera orbit
      modelViewer.addEventListener('camera-change', () => {
        if (!is3dActive) return;
        try {
          const orbit = modelViewer.getCameraOrbit();
          if (orbit) {
            // orbit.theta is in radians
            const deg = ((orbit.theta * 180 / Math.PI) % 360 + 360) % 360;
            const side = (deg >= 90 && deg < 270) ? 'back' : 'front';
            thumbs.forEach(t => {
              if (t.dataset.view === 'front' || t.dataset.view === 'back') {
                t.classList.toggle('active', t.dataset.view === side);
              }
            });
          }
        } catch (_) {}
      });
    }

    // 2D fallback state variables
    let angle = 0, scale = 1, auto = false, drag = false, startX = 0, startAngle = 0, raf = 0, last = 0;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function render2D(immediate = false) {
      if (!turner) return;
      turner.style.transition = immediate ? 'none' : '';
      turner.style.transform = `rotateY(${angle}deg) scale(${scale})`;
      const normAngle = ((angle % 360) + 360) % 360;
      const side = normAngle >= 90 && normAngle < 270 ? 'back' : 'front';
      thumbs.forEach(t => {
        if (t.dataset.view === 'front' || t.dataset.view === 'back') {
          t.classList.toggle('active', t.dataset.view === side);
        }
      });
    }

    function stopAuto2D() {
      auto = false;
      if (rotateBtn) rotateBtn.setAttribute('aria-pressed', 'false');
      cancelAnimationFrame(raf);
    }

    function tick2D(time) {
      if (!auto) return;
      if (last) angle += (time - last) * 0.012;
      last = time;
      render2D(true);
      raf = requestAnimationFrame(tick2D);
    }

    // 1. Rotate Button (Toggle 360° Auto-Rotation)
    if (rotateBtn) {
      rotateBtn.addEventListener('click', () => {
        if (is3dActive && modelViewer) {
          modelViewer.autoRotate = !modelViewer.autoRotate;
          rotateBtn.setAttribute('aria-pressed', String(modelViewer.autoRotate));
          return;
        }

        if (reduced) {
          angle += 180;
          render2D();
          return;
        }
        auto = !auto;
        rotateBtn.setAttribute('aria-pressed', String(auto));
        if (auto) {
          last = 0;
          raf = requestAnimationFrame(tick2D);
        } else {
          cancelAnimationFrame(raf);
        }
      });
    }

    // 2. Zoom Button
    if (zoomBtn) {
      zoomBtn.addEventListener('click', () => {
        if (is3dActive && modelViewer) {
          const isZoomed = modelViewer.dataset.zoomed === 'true';
          if (isZoomed) {
            modelViewer.cameraOrbit = '0deg 75deg 105%';
            modelViewer.dataset.zoomed = 'false';
            zoomBtn.setAttribute('aria-pressed', 'false');
          } else {
            modelViewer.cameraOrbit = '0deg 75deg 70%';
            modelViewer.dataset.zoomed = 'true';
            zoomBtn.setAttribute('aria-pressed', 'true');
          }
          return;
        }

        scale = scale === 1 ? 1.35 : 1;
        zoomBtn.setAttribute('aria-pressed', String(scale > 1));
        render2D();
      });
    }

    // 3. Reset Button
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (is3dActive && modelViewer) {
          modelViewer.cameraOrbit = '0deg 75deg 105%';
          modelViewer.autoRotate = true;
          modelViewer.dataset.zoomed = 'false';
          if (rotateBtn) rotateBtn.setAttribute('aria-pressed', 'true');
          if (zoomBtn) zoomBtn.setAttribute('aria-pressed', 'false');
          thumbs.forEach(t => {
            if (t.dataset.view === 'front') t.classList.add('active');
            if (t.dataset.view === 'back') t.classList.remove('active');
          });
          return;
        }

        stopAuto2D();
        angle = 0;
        scale = 1;
        if (zoomBtn) zoomBtn.setAttribute('aria-pressed', 'false');
        render2D();
      });
    }

    // 4. Thumbnails (Front / Back / Fabric Details / Side Detail)
    thumbs.forEach(t => {
      t.addEventListener('click', () => {
        if (t.dataset.view === 'detail') {
          if (overlay && detailImage) {
            detailImage.src = t.dataset.image;
            overlay.hidden = false;
          }
          return;
        }

        if (is3dActive && modelViewer) {
          modelViewer.autoRotate = false;
          if (rotateBtn) rotateBtn.setAttribute('aria-pressed', 'false');
          const targetOrbit = t.dataset.view === 'back' ? '180deg 75deg 105%' : '0deg 75deg 105%';
          modelViewer.cameraOrbit = targetOrbit;
          thumbs.forEach(other => other.classList.toggle('active', other === t));
          return;
        }

        stopAuto2D();
        angle = t.dataset.view === 'back' ? 180 : 0;
        render2D();
      });
    });

    // 2D Fallback Drag handlers
    if (product) {
      product.addEventListener('pointerdown', e => {
        if (e.button !== 0 || is3dActive) return;
        stopAuto2D();
        drag = true;
        startX = e.clientX;
        startAngle = angle;
        product.setPointerCapture(e.pointerId);
        if (turner) turner.style.transition = 'none';
      });

      product.addEventListener('pointermove', e => {
        if (!drag || is3dActive) return;
        angle = startAngle + (e.clientX - startX) * 0.65;
        render2D(true);
      });

      function finish() {
        drag = false;
        if (turner) turner.style.transition = '';
      }

      product.addEventListener('pointerup', finish);
      product.addEventListener('pointercancel', finish);

      product.addEventListener('keydown', e => {
        if (is3dActive) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          stopAuto2D();
          angle += (e.key === 'ArrowRight' ? 30 : -30);
          render2D();
        }
      });

      product.addEventListener('wheel', e => {
        if (is3dActive) return;
        if (document.activeElement === product || e.ctrlKey || e.metaKey) {
          e.preventDefault();
          scale = Math.min(1.7, Math.max(0.75, scale + (e.deltaY < 0 ? 0.1 : -0.1)));
          if (zoomBtn) zoomBtn.setAttribute('aria-pressed', String(scale > 1));
          render2D();
        }
      }, { passive: false });
    }

    // Modal Handlers
    if (closeDetail && overlay) {
      closeDetail.addEventListener('click', () => {
        overlay.hidden = true;
      });
    }

    if (overlay) {
      overlay.addEventListener('click', e => {
        if (e.target === overlay) overlay.hidden = true;
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay && !overlay.hidden) {
        overlay.hidden = true;
      }
    });

    render2D();
  }

  /* --------------------------------------------------------------------------
     18. DEDICATED ATELIER PRODUCT DETAIL PAGE (PDP)
     -------------------------------------------------------------------------- */
  function setupProductPage() {
    const pdpContainer = document.getElementById('productDetailPage');
    if (!pdpContainer) return;

    const urlParams = new URLSearchParams(window.location.search);
    const prodId = urlParams.get('id') || 'parvaii-03';
    const product = CATALOG.find(p => p.id === prodId) || CATALOG[2];

    let selectedSize = product.sizes && product.sizes.length > 1 ? product.sizes[1] : (product.sizes[0] || 'M');
    let quantity = 1;

    // Update document title for luxury feel
    document.title = `${product.title} — PARVAII Atelier`;

    function getWhatsappUrl() {
      const total = product.price * quantity;
      const text = `Hello Parvaii Atelier! I would like to order:\n\n*${product.title}*\n• Size: ${selectedSize}\n• Quantity: ${quantity}\n• Total: ₹${total}\n\nPlease share payment and delivery details.`;
      return `https://wa.me/916238962054?text=${encodeURIComponent(text)}`;
    }

    pdpContainer.innerHTML = `
      <!-- Breadcrumbs Bar -->
      <nav class="product-breadcrumbs-bar" aria-label="Breadcrumb">
        <div class="product-breadcrumbs-inner">
          <a href="index.html#collections" class="back-link">
            <span>← Back to Collections</span>
          </a>
          <div class="breadcrumb-trail">
            <a href="index.html">Home</a>
            <span class="breadcrumb-sep">/</span>
            <a href="index.html#collections">Collections</a>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">${product.title}</span>
          </div>
        </div>
      </nav>

      <!-- Main Product Stage -->
      <section class="pdp-main-section">
        <div class="pdp-grid">
          
          <!-- Left Gallery Column -->
          <div class="pdp-gallery-wrap">
            <div class="pdp-main-media">
              <span class="pdp-media-badge">${product.badge || 'ATELIER EXCLUSIVE'}</span>
              <img id="pdpMainImage" src="${product.image}" alt="${product.title}">
            </div>
          </div>

          <!-- Right Editorial Info Column -->
          <div class="pdp-info-wrap">
            <div class="pdp-eyebrow-row">
              <span class="pdp-eyebrow">${product.origin} &bull; ${product.spec}</span>
              <span class="pdp-stock-badge">
                <span class="stock-pulse"></span>
                In Stock &bull; Ready to Dispatch
              </span>
            </div>

            <h1 class="pdp-title">${product.title}</h1>

            <div class="pdp-price-wrap">
              <span class="pdp-price" id="pdpDisplayPrice">₹${product.price}</span>
              <span class="pdp-tax-note">MRP inclusive of all taxes &bull; Standard Kerala Delivery ₹50</span>
            </div>

            <p class="pdp-description">${product.description}</p>

            <!-- Size Selector -->
            <div class="pdp-size-header">
              <span class="pdp-size-label">Select Size: <strong id="pdpSelectedSizeLabel">${selectedSize}</strong></span>
              <button type="button" class="pdp-size-guide-btn" id="pdpSizeGuideBtn">✦ Size Chart Guide</button>
            </div>
            <div class="pdp-size-chips" id="pdpSizeChips" role="radiogroup" aria-label="Select Size">
              ${product.sizes.map(s => `
                <button type="button" class="pdp-size-chip ${s === selectedSize ? 'is-active' : ''}" data-size="${s}" aria-checked="${s === selectedSize ? 'true' : 'false'}" role="radio">
                  ${s}
                </button>
              `).join('')}
            </div>

            <!-- Quantity & Actions Group -->
            <div class="pdp-actions-row">
              <div class="pdp-qty-stepper">
                <button type="button" class="pdp-qty-btn" id="pdpQtyDec" aria-label="Decrease Quantity">&minus;</button>
                <span class="pdp-qty-count" id="pdpQtyVal">1</span>
                <button type="button" class="pdp-qty-btn" id="pdpQtyInc" aria-label="Increase Quantity">&plus;</button>
              </div>

              <button type="button" class="pdp-btn-cart" id="pdpAddCartBtn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Add to Cart</span>
              </button>

              <button type="button" class="pdp-btn-buynow" id="pdpBuyNowBtn">
                <span id="pdpBuyNowText">Buy Now &bull; ₹${product.price}</span>
                <span class="btn-arrow">→</span>
              </button>
            </div>

            <!-- WhatsApp Direct Concierge -->
            <a href="${getWhatsappUrl()}" class="pdp-whatsapp-btn" id="pdpWhatsappLink" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              <span>Instant Order via WhatsApp Concierge (+91 62389 62054)</span>
            </a>

            <!-- Provenance & Craft Strip -->
            <div class="pdp-craft-provenance-box">
              <div class="provenance-item">
                <span class="provenance-icon">✦</span>
                <span class="provenance-text">100% Breathable Pure Cotton</span>
              </div>
              <div class="provenance-item">
                <span class="provenance-icon">🌿</span>
                <span class="provenance-text">Artisan Handcrafted in Trivandrum</span>
              </div>
              <div class="provenance-item">
                <span class="provenance-icon">📦</span>
                <span class="provenance-text">Bespoke Atelier Gift Packaging</span>
              </div>
            </div>

            <!-- Atelier Accordion Info Tabs -->
            <div class="pdp-accordions">
              <div class="pdp-accordion-item is-open">
                <button type="button" class="pdp-accordion-btn">
                  <span class="pdp-accordion-title">Fabric & Craftsmanship</span>
                  <span class="pdp-accordion-icon">+</span>
                </button>
                <div class="pdp-accordion-panel">
                  <p>Pure soft breathable cotton thoughtfully chosen for all-day Kerala comfort. Beautiful drape, fine stitching, and durable seams made to retain vibrancy wash after wash.</p>
                </div>
              </div>

              <div class="pdp-accordion-item">
                <button type="button" class="pdp-accordion-btn">
                  <span class="pdp-accordion-title">Garment Wash Care</span>
                  <span class="pdp-accordion-icon">+</span>
                </button>
                <div class="pdp-accordion-panel">
                  <p>${product.care} Hand wash in cold water with mild detergent. Dry inside out in shade to preserve print vibrancy. Gentle steam iron.</p>
                </div>
              </div>

              <div class="pdp-accordion-item">
                <button type="button" class="pdp-accordion-btn">
                  <span class="pdp-accordion-title">Shipping & Packaging</span>
                  <span class="pdp-accordion-icon">+</span>
                </button>
                <div class="pdp-accordion-panel">
                  <p>Dispatched with care within 24–48 hours from our Trivandrum atelier. Packaged in eco-conscious signature Parvaii wrap with a handwritten note.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- You May Also Adore Section -->
      <section class="pdp-related-section">
        <div class="container">
          <div class="section-header" style="margin-bottom: 2.5rem;">
            <span class="section-eyebrow">COMPLETE YOUR LOOK</span>
            <h2 class="section-title">You May Also Adore</h2>
          </div>
          <div class="product-grid pdp-related-grid">
            ${CATALOG.filter(p => p.id !== product.id).map(related => `
              <article class="product-card">
                <div class="product-media-wrap">
                  <span class="card-badge">${related.badge}</span>
                  <img src="${related.image}" alt="${related.title}" class="product-img">
                  <a href="product.html?id=${related.id}" class="card-hover-action">
                    <span>✦ Explore Piece Details →</span>
                  </a>
                </div>
                <div class="product-info">
                  <span class="product-eyebrow">${related.spec}</span>
                  <h3 class="product-title">${related.title}</h3>
                  <p class="product-subtitle">${related.craft || related.subtitle}</p>
                  <div class="product-meta-row">
                    <span class="product-price">₹${related.price}</span>
                    <span class="product-sizes-badge">Sizes: XS – XL</span>
                  </div>
                  <div class="product-card-divider"></div>
                  <div class="product-card-actions">
                    <a href="product.html?id=${related.id}" class="btn-card-details">
                      <span>View Details</span>
                    </a>
                    <button class="btn-card-order" data-action="quick-add" data-id="${related.id}" data-size="${related.sizes[0]}">
                      <span>Order Now</span>
                      <span class="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              </article>
            `).join('')}
          </div>
        </div>
      </section>
    `;

    // Interactivity
    const sizeChips = pdpContainer.querySelectorAll('#pdpSizeChips .pdp-size-chip');
    const sizeLabel = pdpContainer.querySelector('#pdpSelectedSizeLabel');
    const qtyVal = pdpContainer.querySelector('#pdpQtyVal');
    const qtyInc = pdpContainer.querySelector('#pdpQtyInc');
    const qtyDec = pdpContainer.querySelector('#pdpQtyDec');
    const buyNowText = pdpContainer.querySelector('#pdpBuyNowText');
    const addCartBtn = pdpContainer.querySelector('#pdpAddCartBtn');
    const buyNowBtn = pdpContainer.querySelector('#pdpBuyNowBtn');
    const whatsappLink = pdpContainer.querySelector('#pdpWhatsappLink');
    const sizeGuideBtn = pdpContainer.querySelector('#pdpSizeGuideBtn');

    function updatePdpView() {
      if (qtyVal) qtyVal.textContent = quantity;
      if (sizeLabel) sizeLabel.textContent = selectedSize;
      const subtotal = product.price * quantity;
      if (buyNowText) buyNowText.innerHTML = `Buy Now &bull; ₹${subtotal}`;
      if (whatsappLink) whatsappLink.href = getWhatsappUrl();
    }

    sizeChips.forEach(chip => {
      chip.addEventListener('click', () => {
        sizeChips.forEach(c => {
          c.classList.remove('is-active');
          c.setAttribute('aria-checked', 'false');
        });
        chip.classList.add('is-active');
        chip.setAttribute('aria-checked', 'true');
        selectedSize = chip.dataset.size;
        updatePdpView();
      });
    });

    if (qtyDec) {
      qtyDec.addEventListener('click', () => {
        if (quantity > 1) {
          quantity -= 1;
          updatePdpView();
        }
      });
    }

    if (qtyInc) {
      qtyInc.addEventListener('click', () => {
        if (quantity < 10) {
          quantity += 1;
          updatePdpView();
        }
      });
    }

    if (sizeGuideBtn) {
      sizeGuideBtn.addEventListener('click', () => {
        showToast('Size Guide: XS (32"), S (34"), M (36"), L (38"), XL (40") Bust.', 'info');
      });
    }

    if (addCartBtn) {
      addCartBtn.addEventListener('click', () => {
        addToCart(product, selectedSize, 'Signature', quantity, true);
      });
    }

    if (buyNowBtn) {
      buyNowBtn.addEventListener('click', () => {
        addToCart(product, selectedSize, 'Signature', quantity, false);
        const subtotal = product.price * quantity;
        const total = subtotal + 50;
        const msg = `Hello PARVAII Atelier! 🌸\n\nI would like to order:\n\n1. *${product.title}*\n   • Size: ${selectedSize}\n   • Quantity: ${quantity}\n   • Price: ₹${product.price} each (₹${subtotal})\n\n──────────────\n• Delivery Charge: ₹50 (Kerala)\n• *TOTAL PAYABLE: ₹${total}*\n──────────────\n\n*My Delivery Details:*\n• Name:\n• Delivery Address:\n• Pincode:\n• Phone Number:\n\nPlease confirm my order and share payment details. Thank you!`;
        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank', 'noopener,noreferrer');
        showToast('Connecting directly to WhatsApp with your order details...', 'bag');
      });
    }

    // Accordions
    pdpContainer.querySelectorAll('.pdp-accordion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.pdp-accordion-item');
        item.classList.toggle('is-open');
      });
    });

    // Attach quick add for related products
    pdpContainer.querySelectorAll('[data-action="quick-add"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const item = CATALOG.find(p => p.id === id);
        if (item) addToCart(item, item.sizes[0], 'Signature', 1, true);
      });
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
