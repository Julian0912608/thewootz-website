/* ═══════════════════════════════
   THEWOOTZ — theme.js
   ═══════════════════════════════ */
(function () {
  'use strict';

  // ── SCROLL PROGRESS ──
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.prepend(bar);
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // ── MOBILE NAV ──
  function initMobileNav() {
    const ham = document.getElementById('hamburger');
    const nav = document.getElementById('mobileNav');
    if (!ham || !nav) return;
    ham.addEventListener('click', () => {
      const open = ham.classList.toggle('is-open');
      nav.classList.toggle('is-open', open);
      ham.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        ham.classList.remove('is-open');
        nav.classList.remove('is-open');
        ham.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ── CART DRAWER ──
  function initCart() {
    const overlay = document.getElementById('cartOverlay');
    const drawer  = document.getElementById('cartDrawer');
    const closeBtn = document.getElementById('cartClose');
    const cartBtns = document.querySelectorAll('[data-cart-toggle]');

    function open() {
      overlay.classList.add('is-open');
      drawer.classList.add('is-open');
      drawer.setAttribute('aria-hidden', 'false');
      overlay.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('is-open');
      drawer.classList.remove('is-open');
      drawer.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    cartBtns.forEach(btn => btn.addEventListener('click', open));
    if (closeBtn) closeBtn.addEventListener('click', close);
    if (overlay) overlay.addEventListener('click', close);

    // ESC key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) close();
    });
  }

  // ── AJAX ADD TO CART ──
  function initAddToCart() {
    document.addEventListener('click', async (e) => {
      const btn = e.target.closest('[data-add-to-cart]');
      if (!btn) return;
      e.preventDefault();

      const variantId = btn.dataset.variantId || btn.closest('form')?.querySelector('[name="id"]')?.value;
      if (!variantId) return;

      const qty = parseInt(btn.dataset.quantity || 1);
      btn.disabled = true;
      btn.textContent = 'Toevoegen...';

      try {
        const res = await fetch('/cart/add.js', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ id: variantId, quantity: qty })
        });
        if (!res.ok) throw new Error('Add to cart failed');
        const item = await res.json();

        await refreshCart();
        openCartDrawer();
        showToast(`✓ ${item.title} toegevoegd`);

        // Meta Pixel
        if (typeof fbq !== 'undefined') {
          fbq('track', 'AddToCart', {
            content_ids: [variantId],
            content_name: item.title,
            value: item.price / 100,
            currency: 'EUR'
          });
        }
      } catch (err) {
        showToast('Kon product niet toevoegen. Probeer opnieuw.');
      } finally {
        btn.disabled = false;
        btn.textContent = btn.dataset.originalText || 'In winkelwagen';
      }
    });

    // Store original button text
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.dataset.originalText = btn.textContent.trim();
    });
  }

  // ── REFRESH CART DRAWER ──
  async function refreshCart() {
    try {
      const res = await fetch('/cart.js', { headers: { 'Accept': 'application/json' } });
      const cart = await res.json();
      renderCart(cart);
    } catch (e) {
      console.error('Cart refresh failed', e);
    }
  }

  function renderCart(cart) {
    const body   = document.getElementById('cartBody');
    const footer = document.getElementById('cartFooter');
    const badge  = document.getElementById('cartCount');

    if (!body) return;

    // Update badge
    const count = cart.item_count || 0;
    document.querySelectorAll('[data-cart-count]').forEach(el => el.textContent = count);

    if (count === 0) {
      body.innerHTML = '<p class="cart-drawer__empty">Je winkelwagen is nog leeg.</p>';
      if (footer) footer.hidden = true;
      return;
    }

    body.innerHTML = cart.items.map(item => `
      <div class="cart-item">
        <div class="cart-item__image">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
        </div>
        <div class="cart-item__details">
          <div class="cart-item__name">${item.product_title}</div>
          ${item.variant_title && item.variant_title !== 'Default Title'
            ? `<div style="font-size:.72rem;color:var(--mist);margin-bottom:3px">${item.variant_title}</div>` : ''}
          <div class="cart-item__price">${formatMoney(item.line_price)}</div>
        </div>
      </div>
    `).join('');

    if (footer) {
      footer.hidden = false;
      const totalEl = document.getElementById('cartTotal');
      if (totalEl) totalEl.textContent = formatMoney(cart.total_price);
    }
  }

  function formatMoney(cents) {
    return '€' + (cents / 100).toFixed(2).replace('.', ',');
  }

  function openCartDrawer() {
    const overlay = document.getElementById('cartOverlay');
    const drawer  = document.getElementById('cartDrawer');
    if (overlay) overlay.classList.add('is-open');
    if (drawer)  drawer.classList.add('is-open');
  }

  // ── TOAST ──
  function showToast(msg) {
    const t = document.getElementById('toast');
    if (!t) return;
    t.textContent = msg;
    t.classList.add('is-visible');
    setTimeout(() => t.classList.remove('is-visible'), 3000);
  }

  // ── FADE IN ON SCROLL ──
  function initFadeIn() {
    const items = document.querySelectorAll('.fade-up');
    if (!items.length) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('is-visible'); });
    }, { threshold: 0.08 });
    items.forEach(el => obs.observe(el));
  }

  // ── PRODUCT GALLERY ──
  function initProductGallery() {
    const thumbs = document.querySelectorAll('[data-gallery-thumb]');
    const main   = document.getElementById('galleryMain');
    if (!thumbs.length || !main) return;
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        const src = thumb.dataset.src;
        const alt = thumb.dataset.alt || '';
        main.src = src;
        main.alt = alt;
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  // ── VARIANT SELECTOR ──
  function initVariants() {
    document.querySelectorAll('.variant-option').forEach(option => {
      option.addEventListener('click', () => {
        const group = option.closest('.variant-options');
        group.querySelectorAll('.variant-option').forEach(o => o.classList.remove('active'));
        option.classList.add('active');

        // Update hidden input
        const input = document.querySelector('[name="id"]');
        if (input && option.dataset.variantId) {
          input.value = option.dataset.variantId;
        }
      });
    });
  }

  // ── EMAIL FUNNEL ──
  function initEmailFunnel() {
    const form = document.getElementById('emailFunnelForm');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = form.querySelector('[name="contact[email]"]')?.value;
      if (!email) return;

      if (typeof fbq !== 'undefined') fbq('track', 'Lead', { content_name: 'newsletter' });
      showToast('✓ Inschrijving gelukt! Je kortingscode komt per e-mail.');
      form.reset();
    });
  }

  // ── INIT ──
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initMobileNav();
    initCart();
    initAddToCart();
    initFadeIn();
    initProductGallery();
    initVariants();
    initEmailFunnel();
    refreshCart();
  });

  // Expose for Liquid templates
  window.ThemeCart = { refresh: refreshCart, open: openCartDrawer, toast: showToast };
})();
