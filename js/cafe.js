(() => {
  const products = [
    { id: 'flat-white', name: 'Honey flat white', category: 'coffee', note: 'Espresso, silky milk & a little local honey.', price: 180, icon: '☕', badge: 'A LITTLE FAVORITE', color: '#e8d5b8' },
    { id: 'mocha', name: 'Midnight mocha', category: 'coffee', note: 'Chocolate-kissed espresso, warm and lovely.', price: 210, icon: '🍫', badge: 'COZY PICK', color: '#d8b8a0' },
    { id: 'cold-brew', name: 'Citrus cold brew', category: 'coolers', note: 'Slow-steeped coffee with a bright citrus twist.', price: 195, icon: '🧋', badge: 'COOL & BRIGHT', color: '#d7dfc3' },
    { id: 'berry-fizz', name: 'Berry garden fizz', category: 'coolers', note: 'Bubbly berries, lime, and a little sparkle.', price: 170, icon: '🥤', badge: 'FRESHLY FIZZY', color: '#e6c6c6' },
    { id: 'peach-tea', name: 'Peach cloud tea', category: 'tea', note: 'Gentle black tea, peach, and a soft cream cap.', price: 165, icon: '🍑', badge: 'SOFT MOMENT', color: '#efd0ae' },
    { id: 'matcha', name: 'Garden matcha', category: 'tea', note: 'Bright green tea whisked slowly with oat milk.', price: 220, icon: '🍵', badge: 'GREEN & GENTLE', color: '#cbd8bb' },
    { id: 'truffle', name: 'Cocoa cloud bites', category: 'chocolate', note: 'Little dark chocolate truffles, made for sharing.', price: 145, icon: '🍬', badge: 'TINY TREAT', color: '#dbc7b2' },
    { id: 'brownie', name: 'Brown butter brownie', category: 'chocolate', note: 'Fudgy center, crisp edges, no notes.', price: 155, icon: '🍰', badge: 'BAKED WITH LOVE', color: '#d5b4a0' }
  ];
  const labels = { coffee: 'COFFEE', coolers: 'COOL DRINK', tea: 'TEA TIME', chocolate: 'SWEET TREAT' };
  const grid = document.getElementById('product-grid');
  const search = document.getElementById('menu-search');
  const emptyState = document.getElementById('empty-state');
  const cart = new Map();
  let category = 'all';
  const formatPrice = amount => `₹${amount.toLocaleString('en-IN')}`;

  function renderProducts() {
    const query = search.value.trim().toLowerCase();
    const visible = products.filter(product => (category === 'all' || product.category === category) && `${product.name} ${product.note} ${product.category}`.toLowerCase().includes(query));
    grid.innerHTML = visible.map(product => `
      <article class="product-card">
        <div class="product-art" style="--art-bg:${product.color}">
          <span class="product-badge">${product.badge}</span><span class="product-icon" aria-hidden="true">${product.icon}</span>
        </div>
        <div class="product-detail"><h3>${product.name}</h3><p>${product.note}</p>
          <div class="product-bottom"><span class="product-price">${formatPrice(product.price)}</span><button class="add-button" type="button" data-add="${product.id}" aria-label="Add ${product.name} to your tray">Add <span>+</span></button></div>
        </div>
      </article>`).join('');
    emptyState.hidden = visible.length > 0;
  }

  function renderCart() {
    const items = [...cart.entries()];
    const count = items.reduce((sum, [, quantity]) => sum + quantity, 0);
    const total = items.reduce((sum, [id, quantity]) => sum + products.find(product => product.id === id).price * quantity, 0);
    document.getElementById('cart-count').textContent = count;
    document.getElementById('cart-total').textContent = formatPrice(total);
    const container = document.getElementById('cart-items');
    if (!items.length) {
      container.innerHTML = '<div class="cart-empty"><span>☕</span><p>Your tray is taking a little break.</p><small>Add a favorite from the menu to get started.</small></div>';
      return;
    }
    container.innerHTML = items.map(([id, quantity]) => {
      const product = products.find(item => item.id === id);
      return `<article class="cart-line"><span class="cart-line-icon" aria-hidden="true">${product.icon}</span><div><h3>${product.name}</h3><small>${formatPrice(product.price)} each</small></div><div class="quantity-stepper"><button type="button" data-quantity="${id}" data-change="-1" aria-label="Remove one ${product.name}">−</button><span>${quantity}</span><button type="button" data-quantity="${id}" data-change="1" aria-label="Add one ${product.name}">+</button></div></article>`;
    }).join('');
  }

  function toggleCart(open) {
    const panel = document.getElementById('cart-panel');
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    document.querySelector('.cart-trigger').setAttribute('aria-expanded', String(open));
    document.getElementById('cart-scrim').classList.toggle('open', open);
    document.body.classList.toggle('cart-open', open);
    if (open) document.querySelector('.cart-close').focus();
  }

  let toastTimer;
  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) { toast = document.createElement('div'); toast.className = 'toast'; toast.setAttribute('role', 'status'); document.body.append(toast); }
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1700);
  }

  grid.addEventListener('click', event => {
    const button = event.target.closest('[data-add]');
    if (!button) return;
    const id = button.dataset.add;
    cart.set(id, (cart.get(id) || 0) + 1);
    renderCart();
    button.classList.add('added');
    button.innerHTML = 'Added <span>✓</span>';
    window.setTimeout(() => { if (button.isConnected) { button.classList.remove('added'); button.innerHTML = 'Add <span>+</span>'; } }, 950);
    showToast(`${products.find(product => product.id === id).name} added to your tray`);
  });

  document.querySelectorAll('.category-tab').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.category;
    document.querySelectorAll('.category-tab').forEach(tab => {
      const active = tab === button;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    renderProducts();
  }));
  search.addEventListener('input', renderProducts);
  document.getElementById('cart-items').addEventListener('click', event => {
    const button = event.target.closest('[data-quantity]');
    if (!button) return;
    const id = button.dataset.quantity;
    const next = (cart.get(id) || 0) + Number(button.dataset.change);
    if (next <= 0) cart.delete(id); else cart.set(id, next);
    renderCart();
  });
  document.querySelector('.cart-trigger').addEventListener('click', () => toggleCart(true));
  document.querySelector('.cart-close').addEventListener('click', () => toggleCart(false));
  document.getElementById('cart-scrim').addEventListener('click', () => toggleCart(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') toggleCart(false); });
  const dialog = document.getElementById('demo-dialog');
  document.getElementById('demo-checkout').addEventListener('click', () => { toggleCart(false); dialog.showModal(); });
  document.querySelector('.demo-close').addEventListener('click', () => dialog.close());
  document.getElementById('demo-ok').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.getElementById('year').textContent = new Date().getFullYear();
  renderProducts();
  renderCart();
})();
