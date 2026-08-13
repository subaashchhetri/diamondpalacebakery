/**
 * Coffee House Interactive Menu SPA Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const splashScreen = document.getElementById('splash-screen');
  const menuScreen = document.getElementById('menu-screen');
  const sliderContainer = document.getElementById('slider-container');
  const sliderHandle = document.getElementById('slider-handle');
  const moreTrigger = document.getElementById('more-trigger');
  const drawerMenu = document.getElementById('drawer-menu');
  const drawerClose = document.getElementById('drawer-close');
  const drawerContainer = drawerMenu.querySelector('.drawer-container');
  const productList = document.getElementById('product-list');
  const categoryContainer = document.getElementById('sidebar-categories');
  const cartFab = document.getElementById('cart-fab');
  const cartCount = cartFab.querySelector('.cart-count');
  
  // Cart Specific Elements
  const cartMenu = document.getElementById('cart-menu');
  const cartClose = document.getElementById('cart-close');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartTotalAmount = document.getElementById('cart-total-amount');
  const orderNowBtn = document.getElementById('order-now-btn');
  const cartSheetContainer = cartMenu.querySelector('.cart-container');
  
  // Cart state
  const cart = {};
  
  // --- Initialize App ---
  initSlider();
  initCategories();
  initDrawer();
  initCart();
  
  // ==========================================
  // 1. DRAG TO UNLOCK SLIDER (SPLASH SCREEN)
  // ==========================================
  function initSlider() {
    let isDragging = false;
    let startX = 0;
    let maxDrag = 0;
    
    // Calculate bounds
    function updateBounds() {
      const containerWidth = sliderContainer.clientWidth;
      const handleWidth = sliderHandle.clientWidth;
      maxDrag = containerWidth - handleWidth - 8; // account for padding
    }
    
    // Start drag
    function dragStart(e) {
      updateBounds();
      isDragging = true;
      startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      sliderHandle.style.transition = 'none';
    }
    
    // Dragging
    function dragMove(e) {
      if (!isDragging) return;
      
      const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
      let deltaX = currentX - startX;
      
      // Keep within bounds [0, maxDrag]
      if (deltaX < 0) deltaX = 0;
      if (deltaX > maxDrag) deltaX = maxDrag;
      
      sliderHandle.style.transform = `translateX(${deltaX}px)`;
      
      // Calculate opacity of text (fades as you drag)
      const swipeText = sliderContainer.querySelector('.swipe-text');
      if (swipeText) {
        const opacity = 1 - (deltaX / maxDrag);
        swipeText.style.opacity = opacity.toFixed(2);
      }
    }
    
    // End drag
    function dragEnd() {
      if (!isDragging) return;
      isDragging = false;
      
      // Check transform translateX value
      const matrix = new WebKitCSSMatrix(window.getComputedStyle(sliderHandle).transform);
      const currentX = matrix.m41;
      
      if (currentX >= maxDrag * 0.9) {
        // Unlock menu (slide all the way and animate screen change)
        sliderHandle.style.transition = 'transform 0.2s ease-out';
        sliderHandle.style.transform = `translateX(${maxDrag}px)`;
        
        // Success feedback
        sliderHandle.style.backgroundColor = '#4caf50'; // Green success flash
        sliderHandle.querySelector('i').className = 'fa-solid fa-check';
        
        unlockApp();
      } else {
        // Bounce back
        sliderHandle.style.transition = 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        sliderHandle.style.transform = 'translateX(0px)';
        const swipeText = sliderContainer.querySelector('.swipe-text');
        if (swipeText) {
          swipeText.style.transition = 'opacity 0.3s';
          swipeText.style.opacity = '1';
        }
      }
    }
    
    // Event listeners for touch and mouse
    sliderHandle.addEventListener('mousedown', dragStart);
    window.addEventListener('mousemove', dragMove);
    window.addEventListener('mouseup', dragEnd);
    
    sliderHandle.addEventListener('touchstart', dragStart, { passive: true });
    window.addEventListener('touchmove', dragMove, { passive: false });
    window.addEventListener('touchend', dragEnd);
    
    // Prevent default scroll behaviors while swiping
    sliderContainer.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
  }
  
  function unlockApp() {
    setTimeout(() => {
      // Fade out splash
      splashScreen.style.opacity = '0';
      splashScreen.style.transform = 'scale(0.96)';
      
      setTimeout(() => {
        splashScreen.classList.remove('active');
        menuScreen.classList.add('active');
        
        // Reset scroll position to 0 to prevent "Address Bar Viewport Offset Lock" bug on Chrome/Webviews
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        
        // Trigger default active category rendering
        const activeCategory = categoryContainer.querySelector('.category-btn.active');
        const categoryId = activeCategory ? activeCategory.getAttribute('data-category') : 'muffins';
        renderCategoryItems(categoryId);
      }, 400);
    }, 300);
  }
  
  // ==========================================
  // 2. CATEGORY SWITCHING & PRODUCTS RENDERING
  // ==========================================
  function initCategories() {
    categoryContainer.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const categoryId = btn.getAttribute('data-category');
        
        // Remove active class from all
        categoryContainer.querySelectorAll('.category-btn').forEach(c => c.classList.remove('active'));
        
        // Add active to clicked
        btn.classList.add('active');
        
        // Render items with short fade transitions
        productList.style.opacity = '0';
        productList.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
          renderCategoryItems(categoryId);
          productList.style.opacity = '1';
          productList.style.transform = 'translateY(0)';
        }, 150);
      });
    });
  }
  
  function renderCategoryItems(categoryId) {
    productList.innerHTML = '';
    
    const items = window.MENU_DATA && window.MENU_DATA.items[categoryId];
    
    if (!items || items.length === 0) {
      productList.innerHTML = `
        <div class="product-loader">
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>No items found in this category.</p>
        </div>
      `;
      return;
    }
    
    // Render cards
    items.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'product-card';
      // Staggered animation delay
      card.style.animationDelay = `${index * 0.1}s`;
      
      card.innerHTML = `
        <div class="product-img-box">
          <img class="product-img" src="${item.image}" alt="${item.name}">
        </div>
        <h3 class="product-title">${item.name}</h3>
        <p class="product-price">NRs. ${item.price}</p>
        <p class="product-desc">${item.description}</p>
      `;
      
      // Quick add to cart trigger on card click (excluding image hover/drag anomalies)
      card.addEventListener('click', () => {
        triggerAddToCart(item);
      });
      
      productList.appendChild(card);
    });
  }
  
  // ==========================================
  // 3. DRAWER OVERLAY MENU
  // ==========================================
  function initDrawer() {
    moreTrigger.addEventListener('click', () => {
      drawerMenu.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock scrolling
    });
    
    const closeMenu = () => {
      drawerMenu.classList.remove('active');
      document.body.style.overflow = ''; // Unlock scrolling
    };
    
    drawerClose.addEventListener('click', closeMenu);
    
    // Dismiss when tapping outside the sheet overlay
    drawerMenu.addEventListener('click', (e) => {
      if (!drawerContainer.contains(e.target)) {
        closeMenu();
      }
    });
    
    // Escape key handling
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawerMenu.classList.contains('active')) {
        closeMenu();
      }
    });
    
    // Toggle active link highlights
    const drawerLinks = drawerMenu.querySelectorAll('.drawer-link');
    drawerLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        drawerLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // If clicking "Home", we can return to the splash screen!
        if (link.id === 'link-home') {
          closeMenu();
          returnToSplash();
        } else {
          // Mock click for other tabs
          alert(`Navigation: ${link.textContent} page.`);
        }
      });
    });
  }
  
  function returnToSplash() {
    menuScreen.style.opacity = '0';
    menuScreen.style.transform = 'scale(1.04)';
    
    setTimeout(() => {
      menuScreen.classList.remove('active');
      splashScreen.classList.add('active');
      splashScreen.style.opacity = '1';
      splashScreen.style.transform = 'scale(1)';
      
      // Reset the slider handle
      sliderHandle.style.transform = 'translateX(0px)';
      sliderHandle.style.backgroundColor = 'var(--color-primary)';
      sliderHandle.querySelector('i').className = 'fa-solid fa-arrow-right';
      const swipeText = sliderContainer.querySelector('.swipe-text');
      if (swipeText) {
        swipeText.style.opacity = '1';
      }
    }, 400);
  }
  
  // ==========================================
  // 4. CART OVERLAY & ORDER NOW VIA WHATSAPP
  // ==========================================
  function initCart() {
    // Open cart sheet when floating cart is clicked
    cartFab.addEventListener('click', () => {
      renderCart();
      cartMenu.classList.add('active');
    });
    
    const closeCart = () => {
      cartMenu.classList.remove('active');
    };
    
    cartClose.addEventListener('click', closeCart);
    
    // Close when tapping outside the sheet content panel
    cartMenu.addEventListener('click', (e) => {
      if (!cartSheetContainer.contains(e.target)) {
        closeCart();
      }
    });
    
    // Checkout order via WhatsApp redirect
    orderNowBtn.addEventListener('click', () => {
      placeWhatsAppOrder();
    });
  }
  
  function triggerAddToCart(item) {
    if (cart[item.id]) {
      cart[item.id].quantity++;
    } else {
      cart[item.id] = {
        item: item,
        quantity: 1
      };
    }
    
    updateCartCount();
    
    // Scale animation feedback on Cart FAB
    cartFab.style.transform = 'scale(1.25)';
    setTimeout(() => {
      cartFab.style.transform = '';
    }, 200);
    
    showToast(`Added ${item.name} to cart!`);
  }
  
  function updateCartCount() {
    let totalQty = 0;
    for (const id in cart) {
      totalQty += cart[id].quantity;
    }
    cartCount.textContent = totalQty;
  }
  
  function renderCart() {
    cartItemsList.innerHTML = '';
    
    let totalSum = 0;
    let hasItems = false;
    
    for (const id in cart) {
      hasItems = true;
      const cartItem = cart[id];
      const itemTotal = Number(cartItem.item.price) * cartItem.quantity;
      totalSum += itemTotal;
      
      const row = document.createElement('div');
      row.className = 'cart-item-row';
      row.innerHTML = `
        <div class="cart-item-info">
          <img class="cart-item-thumb" src="${cartItem.item.image}" alt="${cartItem.item.name}">
          <div class="cart-item-details">
            <span class="cart-item-name">${cartItem.item.name}</span>
            <span class="cart-item-price">NRs. ${cartItem.item.price}</span>
          </div>
        </div>
        <div class="cart-item-controls">
          <button class="qty-btn dec-btn" data-id="${id}">-</button>
          <span class="qty-val">${cartItem.quantity}</span>
          <button class="qty-btn inc-btn" data-id="${id}">+</button>
        </div>
        <span class="cart-item-total">NRs. ${itemTotal}</span>
      `;
      
      // Hook quantity adjustments
      row.querySelector('.dec-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        adjustQuantity(id, -1);
      });
      row.querySelector('.inc-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        adjustQuantity(id, 1);
      });
      
      cartItemsList.appendChild(row);
    }
    
    if (!hasItems) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <i class="fa-solid fa-shopping-basket"></i>
          <p>Your cart is empty!</p>
          <span style="font-size: 11px; color: var(--color-text-muted); display: block; margin-top: 5px;">
            Click on any item card in the menu to add it to your order.
          </span>
        </div>
      `;
    }
    
    cartTotalAmount.textContent = `NRs. ${totalSum}`;
  }
  
  function adjustQuantity(id, delta) {
    if (!cart[id]) return;
    
    cart[id].quantity += delta;
    if (cart[id].quantity <= 0) {
      delete cart[id];
    }
    
    updateCartCount();
    renderCart();
  }
  
  function placeWhatsAppOrder() {
    let orderSummary = '';
    let totalSum = 0;
    let hasItems = false;
    
    for (const id in cart) {
      hasItems = true;
      const cartItem = cart[id];
      const itemTotal = Number(cartItem.item.price) * cartItem.quantity;
      totalSum += itemTotal;
      
      orderSummary += `• ${cartItem.quantity} x ${cartItem.item.name} (NRs. ${itemTotal})\n`;
    }
    
    if (!hasItems) {
      alert("Please add at least one item to your cart before ordering!");
      return;
    }
    
    const message = `Hello Diamond Palace Lords Plaza Bakery, I would like to place an order:\n\n*Order Details:*\n${orderSummary}\n*Total Amount:* NRs. ${totalSum}\n\nPlease confirm my order. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/9779705107888?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }
  
  function showToast(message) {
    // Check if toast container exists
    let toast = document.querySelector('.toast-container');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-container';
      document.body.appendChild(toast);
      
      // Quick styling inject for the dynamic toast container
      const style = document.createElement('style');
      style.textContent = `
        .toast-container {
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
        }
        .toast-item {
          background-color: rgba(30, 30, 30, 0.95);
          color: #fff;
          font-family: 'Outfit', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 12px 24px;
          border-radius: 30px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
          animation: toastIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards,
                     toastOut 0.3s ease-in 2s forwards;
          border-left: 3px solid var(--color-primary);
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toastOut {
          to { opacity: 0; transform: translateY(-10px); }
        }
      `;
      document.head.appendChild(style);
    }
    
    const toastItem = document.createElement('div');
    toastItem.className = 'toast-item';
    toastItem.textContent = message;
    toast.appendChild(toastItem);
    
    // Remove from DOM after transition completes
    setTimeout(() => {
      toastItem.remove();
    }, 2400);
  }

  // Prevent overall iOS Safari window elastic scroll bouncing
  document.addEventListener('touchmove', function(e) {
    let isScrollable = false;
    let parent = e.target;
    
    // Bubble up to see if gesture started in scrollable panels
    while (parent && parent !== document.body) {
      if (parent.classList && (
        parent.classList.contains('product-list') || 
        parent.classList.contains('sidebar-categories') || 
        parent.classList.contains('cart-items-list')
      )) {
        isScrollable = true;
        break;
      }
      parent = parent.parentNode;
    }
    
    // Prevent default body scrolling if touch is outside scrollable panels
    if (!isScrollable) {
      e.preventDefault();
    }
  }, { passive: false });
});
