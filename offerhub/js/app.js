(function(){
  window.OfferHub = {};
  function renderHeader(){
    const header = document.getElementById('header');
    if(!header) return;
    header.classList.add('site-header');
    header.innerHTML = `
      <nav class="container">
        <div class="logo"><a href="index.html" aria-label="OfferHub"><img class="site-logo" src="images/logo.png" alt="OfferHub" onerror="this.onerror=null;this.src='images/offerhub-logo-placeholder.svg'" /></a></div>
        <div class="nav-links">
          <a href="index.html">Home</a>
          <a href="products.html">Products</a>
          <a href="buy-coupon.html">Buy Coupon</a>
          <a href="sell-coupon.html">Sell Coupon</a>
        </div>
        <div class="menu-toggle">☰</div>
      </nav>
    `;
    const menu = header.querySelector('.menu-toggle');
    menu && menu.addEventListener('click', ()=>{
      const navlinks = header.querySelector('.nav-links');
      if(navlinks.style.display === 'flex') navlinks.style.display='none'; else navlinks.style.display='flex';
    })
  }

  const STORAGE_COUPONS_KEY = 'offerhub_coupons_v1';

  function loadCoupons(){
    const stored = localStorage.getItem(STORAGE_COUPONS_KEY);
    if(stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_COUPONS_KEY,JSON.stringify(OFFERHUB_COUPONS_DEFAULT));
    return JSON.parse(localStorage.getItem(STORAGE_COUPONS_KEY));
  }

  function saveCoupons(list){
    localStorage.setItem(STORAGE_COUPONS_KEY,JSON.stringify(list));
    // notify listeners
    window.dispatchEvent(new Event('offerhub:couponsUpdated'));
  }

  function formatCurrency(num){
    return '₹' + num.toLocaleString('en-IN');
  }

  // Get random subset
  function randomProducts(count=6){
    const p = OFFERHUB_PRODUCTS.slice();
    const shuffled = p.sort(()=>0.5-Math.random());
    return shuffled.slice(0,count);
  }

  function countCouponsByCategory(category){
    const coupons = OfferHub.getCoupons();
    return coupons.filter(c => c.category === category).length;
  }

  function renderProductCard(product, options = {}){
    const div = document.createElement('div');
    div.className = 'product-card';
    const couponsCount = countCouponsByCategory(product.category);
    if(couponsCount > 0){
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = couponsCount === 1 ? '1 Coupon Available for this Product' : couponsCount + ' Coupons Available for this Product';
      div.appendChild(badge);
    }
    const contentHtml = `
      <div class="platform-pill">${product.platform}</div>
      <div class="card-content">
        <h3>${product.name}</h3>
        <div class="meta">${product.category}</div>
        <div class="price"><strong>${formatCurrency(product.price)}</strong><span class="discount-pill">${product.discount}% off</span></div>
        <a class="buy-link" href="${product.platform_url}" target="_blank">Buy Now</a>
      </div>
    `;
    div.innerHTML = contentHtml;
    return div;
  }

  // Expose functions
  OfferHub.renderHeader = renderHeader;
  OfferHub.loadCoupons = loadCoupons;
  OfferHub.saveCoupons = saveCoupons;
  OfferHub.getCoupons = () => loadCoupons();
  OfferHub.formatCurrency = formatCurrency;
  OfferHub.randomProducts = randomProducts;
  OfferHub.countCouponsByCategory = countCouponsByCategory;
  OfferHub.renderProductCard = renderProductCard;

  // Initialise common
  document.addEventListener('DOMContentLoaded',()=>{
    renderHeader();
    // add scroll listener to add subtle scrolled style to header
    const header = document.getElementById('header');
    if(header){
      window.addEventListener('scroll', ()=>{
        if(window.scrollY > 6) header.classList.add('scrolled'); else header.classList.remove('scrolled');
      });
    }
  });
  // Re-render if local storage updated in other tabs
  window.addEventListener('storage',(e)=>{
    if(e.key === STORAGE_COUPONS_KEY){
      window.dispatchEvent(new Event('offerhub:couponsUpdated'));
    }
  });
})();
