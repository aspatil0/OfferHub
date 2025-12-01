document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.getElementById('products-grid');
  const search = document.getElementById('search-input');
  if(!grid) return;

  function renderFeatured(){
    grid.innerHTML='';
    const featured = OfferHub.randomProducts(12);
    featured.forEach(p=>grid.appendChild(OfferHub.renderProductCard(p)));
    // react to coupons changes to update badges
    window.addEventListener('offerhub:couponsUpdated', ()=>{
      grid.innerHTML = '';
      OfferHub.randomProducts(12).forEach(p=> grid.appendChild(OfferHub.renderProductCard(p)));
    });
  }

  function renderBestOfferForTerm(term){
    grid.innerHTML = '';
    const t = term.trim().toLowerCase();
    const matched = OFFERHUB_PRODUCTS.filter(p => p.name.toLowerCase().includes(t));
    if(matched.length === 0){
      const el = document.createElement('div');
      el.className = 'center small';
      el.textContent = 'No products found for "' + term + '"';
      grid.appendChild(el);
      return;
    }
    // Find best by highest discount and then lowest price
    matched.sort((a,b)=> {
      if(b.discount === a.discount) return a.price - b.price;
      return b.discount - a.discount;
    });
    const best = matched[0];
    // Render a compact best-offer card
    // Render using OfferHub helper to keep consistent card layout
    grid.appendChild(OfferHub.renderProductCard(best));
  }

  // initial
  renderFeatured();

  search.addEventListener('input', (e)=>{
    const term = e.target.value;
    if(!term) renderFeatured(); else renderBestOfferForTerm(term);
  });
});
