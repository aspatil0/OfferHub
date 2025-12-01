document.addEventListener('DOMContentLoaded', ()=>{
  const container = document.getElementById('home-products');
  if(!container) return;
  const products = OfferHub.randomProducts(8);
  products.forEach(p => {
    const el = OfferHub.renderProductCard(p);
    container.appendChild(el);
  });
  window.addEventListener('offerhub:couponsUpdated', ()=>{
    container.innerHTML = '';
    OfferHub.randomProducts(8).forEach(p=> container.appendChild(OfferHub.renderProductCard(p)));
  });
});
