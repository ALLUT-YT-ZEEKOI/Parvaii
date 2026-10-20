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
      title: 'The Chandrika Zari Kurti',
      subtitle: 'Pure Chanderi Handloom Silk with Navy Floral Threadwork',
      category: 'straight',
      fabric: 'chanderi',
      price: 245,
      image: 'assets/images/kurti-chanderi.jpg',
      badge: 'Bestseller',
      craft: 'Handcrafted Zardozi & Resham Embroidery',
      colors: ['#C9B7A5', '#0B162A'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Woven in the historic looms of Chanderi, this straight-cut luxury kurti merges raw champagne sand silk with hand-embellished midnight navy motifs along the yoke and scalloped sleeves.',
      origin: 'Chanderi, Madhya Pradesh',
      care: 'Dry clean only. Store wrapped in pure muslin cloth.'
    },
    {
      id: 'parvaii-02',
      title: 'The Nilambari Royal Anarkali',
      subtitle: 'Flared Midnight Silk Gown Kurti with Champagne Border',
      category: 'anarkali',
      fabric: 'silk',
      price: 360,
      image: 'assets/images/kurti-anarkali.jpg',
      badge: 'Heritage',
      craft: 'Hand-Pleated Kalidar Cut with Sheer Organza Drape',
      colors: ['#0B162A', '#C9B7A5'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      description: 'An architectural 24-kali flared Anarkali rendered in nocturnal midnight navy silk. Finished with artisanal champagne sand hem borders and a featherweight silk organza dupatta.',
      origin: 'Varanasi Weavers Guild',
      care: 'Specialist dry clean only.'
    },
    {
      id: 'parvaii-03',
      title: 'The Vrinda Angrakha Tunic',
      subtitle: 'Artisanal Overlap Wrap with Tassels & Chikankari Stitch',
      category: 'angrakha',
      fabric: 'mulmul',
      price: 280,
      image: 'assets/images/kurti-angrakha.jpg',
      badge: 'Artisanal',
      craft: 'Handmade Potli Tassels & Delicate Shadow Work',
      colors: ['#C9B7A5', '#0B162A'],
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      description: 'Inspired by royal Awadhi drapes, the Vrinda features a diagonal Angrakha wrap contour, finished with hand-braided midnight piping and cascading jewel-toned tassels.',
      origin: 'Lucknow Atelier',
      care: 'Gentle hand wash in cold water with mild silk soap.'
    }
  ];

  /* --------------------------------------------------------------------------
     02. APPLICATION STATE
     -------------------------------------------------------------------------- */
  const state = {
    cart: [
      {
        id: 'parvaii-01',
        title: 'The Chandrika Zari Kurti',
        price: 245,
        size: 'M',
        color: 'Champagne Sand',
        image: 'assets/images/kurti-chanderi.jpg',
        quantity: 1
      }
    ],
    wishlist: ['parvaii-02'],
    filter: 'all',
    sortBy: 'featured',
    promoCode: '',
    discount: 0,
    freeShippingThreshold: 300,
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
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <img src="${product.image}" alt="${product.title}" class="product-img" loading="lazy">
            <div class="card-quick-actions">
              <div class="card-size-picker">
                ${product.sizes.map(size => `
                  <button class="size-pill-btn" data-action="quick-add" data-id="${product.id}" data-size="${size}">
                    ${size}
                  </button>
                `).join('')}
              </div>
              <button class="quick-view-btn" data-action="quick-view" data-id="${product.id}">
                Quick Look & Craft Story
              </button>
            </div>
          </div>
          <div class="product-info">
            <div class="product-meta">
              <span>${product.fabric.toUpperCase()}</span>
              <span>${product.category.toUpperCase()}</span>
            </div>
            <h3 class="product-title">${product.title}</h3>
            <p class="product-craft-tag">${product.craft}</p>
            <div class="product-swatches">
              ${product.colors.map(col => `
                <span class="color-swatch" style="background-color: ${col};" title="Available in tone ${col}"></span>
              `).join('')}
            </div>
            <div class="product-price-row">
              <span class="product-price">$${product.price}</span>
              <button class="add-bag-link" data-action="quick-add" data-id="${product.id}" data-size="${product.sizes[0]}">
                Add to Bag 
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
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

  function addToCart(product, size = 'M', color = 'Signature') {
    const existing = state.cart.find(item => item.id === product.id && item.size === size);
    if (existing) {
      existing.quantity += 1;
    } else {
      state.cart.push({
        id: product.id,
        title: product.title,
        price: product.price,
        size: size,
        color: color,
        image: product.image,
        quantity: 1
      });
    }
    renderCart();
    openCartDrawer();
    showToast(`Added "${product.title}" (Size ${size}) to bag.`, 'bag');
  }

  function renderCart() {
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
    if (els.shippingProgress && els.shippingNotice) {
      const remaining = state.freeShippingThreshold - finalSubtotal;
      if (remaining <= 0) {
        els.shippingProgress.style.width = '100%';
        els.shippingNotice.innerHTML = '✨ <strong>Complimentary Express Shipping</strong> Unlocked!';
      } else {
        const pct = Math.min(100, Math.round((finalSubtotal / state.freeShippingThreshold) * 100));
        els.shippingProgress.style.width = `${pct}%`;
        els.shippingNotice.innerHTML = `Add <strong>$${remaining.toFixed(0)}</strong> more for Complimentary Express Shipping`;
      }
    }

    if (els.cartSubtotal) {
      els.cartSubtotal.textContent = `$${finalSubtotal.toFixed(2)}`;
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
          <p style="font-size: 0.85rem; color: var(--c-muted);">Discover our handcrafted Chanderi & royal silk silhouettes.</p>
        </div>
      `;
      return;
    }

    els.cartItemsList.innerHTML = state.cart.map((item, idx) => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-info">
          <h4 class="cart-item-name">${item.title}</h4>
          <span class="cart-item-meta">Size: ${item.size} • ${item.color}</span>
          <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
          <div class="qty-control">
            <button class="qty-btn" data-cart-action="dec" data-index="${idx}">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn" data-cart-action="inc" data-index="${idx}">+</button>
          </div>
        </div>
        <button class="remove-item-btn" data-cart-action="remove" data-index="${idx}">Remove</button>
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

    els.quickviewContent.innerHTML = `
      <div class="modal-media">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="modal-details">
        <span class="product-meta" style="margin-bottom: 0.5rem;">${product.origin}</span>
        <h2 style="font-size: 2.25rem; margin-bottom: 0.5rem;">${product.title}</h2>
        <p style="font-family: var(--font-display); font-size: 1.85rem; color: var(--c-midnight); font-weight: 600; margin-bottom: 1.25rem;">$${product.price}</p>
        <p style="font-size: 0.95rem; color: var(--c-muted); line-height: 1.7; margin-bottom: 1.75rem;">${product.description}</p>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: 0.5rem;">Select Size</label>
          <div style="display: flex; gap: 0.5rem;" id="modalSizePicker">
            ${product.sizes.map((s, idx) => `
              <button class="size-pill-btn ${idx === 1 ? 'active' : ''}" style="padding: 0.45rem 1rem; color: var(--c-midnight); border-color: var(--c-border);" data-size="${s}">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>

        <div style="background: var(--c-sand-subtle); padding: 1rem 1.25rem; border-left: 3px solid var(--c-sand-dark); margin-bottom: 1.75rem;">
          <p style="font-size: 0.8rem; color: var(--c-midnight);"><strong>Craft Note:</strong> ${product.craft}</p>
          <p style="font-size: 0.75rem; color: var(--c-muted); margin-top: 0.25rem;">Care: ${product.care}</p>
        </div>

        <button class="btn-primary" id="modalAddCartBtn" style="width: 100%;">
          <span>Add to Bag • $${product.price}</span>
        </button>
      </div>
    `;

    // Size selection inside modal
    let selectedSize = product.sizes[0];
    const sizeBtns = els.quickviewContent.querySelectorAll('#modalSizePicker button');
    sizeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach(b => {
          b.style.background = '';
          b.style.color = 'var(--c-midnight)';
        });
        btn.style.background = 'var(--c-midnight)';
        btn.style.color = 'var(--c-sand)';
        selectedSize = btn.dataset.size;
      });
    });

    const addBtn = els.quickviewContent.querySelector('#modalAddCartBtn');
    addBtn.addEventListener('click', () => {
      addToCart(product, selectedSize);
      closeQuickView();
    });

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
      els.searchResults.innerHTML = '<p style="color: var(--c-muted); font-size: 0.9rem;">Type to search silhouettes, Chanderi silks, or embroidery styles...</p>';
      return;
    }

    const matches = CATALOG.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.fabric.toLowerCase().includes(query) ||
      item.craft.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      els.searchResults.innerHTML = `<p style="color: var(--c-muted);">No garments found matching "${query}".</p>`;
      return;
    }

    els.searchResults.innerHTML = `
      <div style="display: grid; gap: 1rem; margin-top: 1rem;">
        ${matches.map(m => `
          <div style="display: flex; gap: 1.25rem; align-items: center; cursor: pointer; padding: 0.5rem; border-bottom: 1px solid var(--c-border);" data-search-id="${m.id}">
            <img src="${m.image}" alt="${m.title}" style="width: 54px; height: 68px; object-fit: cover;">
            <div>
              <h4 style="font-size: 1.15rem; color: var(--c-midnight);">${m.title}</h4>
              <p style="font-size: 0.8rem; color: var(--c-muted);">${m.craft} • $${m.price}</p>
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
     15. CHECKOUT FLOW SIMULATION
     -------------------------------------------------------------------------- */
  function setupCheckoutModal() {
    if (els.checkoutBtn) {
      els.checkoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('Your bag is empty! Select a kurti first.', 'alert');
          return;
        }
        closeCartDrawer();
        openCheckoutModal();
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
        els.checkoutPayBtn.innerHTML = '<span>Processing Encrypted Payment...</span>';
        setTimeout(() => {
          closeCheckoutModal();
          state.cart = [];
          renderCart();
          showToast('Order confirmed! An artisan package is being prepared for you.', 'check');
        }, 1500);
      });
    }
  }

  function openCheckoutModal() {
    if (!els.checkoutModal) return;
    els.checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';

    const subtotalRaw = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const finalSub = subtotalRaw - (subtotalRaw * state.discount);

    const summaryEl = document.getElementById('checkoutSummaryTotal');
    if (summaryEl) {
      summaryEl.textContent = `$${finalSub.toFixed(2)}`;
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

  // Lookbook Hotspots direct action
  document.querySelectorAll('.lookbook-pin').forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = pin.dataset.id;
      const product = CATALOG.find(p => p.id === id);
      if (product) openQuickView(product);
    });
  });

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
