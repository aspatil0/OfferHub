document.addEventListener('DOMContentLoaded', ()=>{
  const container = document.getElementById('buy-coupons');
  if(!container) return;

  function renderCoupons(){
    container.innerHTML = '';
    const coupons = OfferHub.getCoupons();
    if(coupons.length === 0){
      const el = document.createElement('div');
      el.className = 'center small';
      el.textContent = 'No coupons available now.';
      container.appendChild(el);
      return;
    }
    coupons.forEach(c => {
      const div = document.createElement('div');
      div.className = 'coupon-card';
      const codeText = c.revealed ? c.code : '****-****';
      const blurredClass = c.revealed ? '' : 'blur';
      div.innerHTML = `
        <div class="meta">${c.platform} • ${c.category}</div>
        <h3>${c.description}</h3>
        <div class="price">${OfferHub.formatCurrency(c.price)}</div>
        <div class="blur-wrap ${blurredClass}">
          <div class="small">Coupon Code</div>
          <div class="coupon-code">${codeText}</div>
        </div>
        <button class="buy-btn" data-id="${c.id}">${c.revealed ? 'Revealed' : 'Buy to Reveal Code'}</button>
      `;
      container.appendChild(div);
    });

    // attach events
    container.querySelectorAll('.buy-btn').forEach(btn => btn.addEventListener('click', onBuyClick));
  }

  function onBuyClick(e){
    const id = Number(e.target.dataset.id);
    const coupons = OfferHub.getCoupons();
    const index = coupons.findIndex(c => c.id === id);
    if(index === -1) return;
    // Simulate payment flow
    if(confirm('Simulate payment of ' + OfferHub.formatCurrency(coupons[index].price) + ' to buy this coupon?')){
      // Mark revealed and save
      coupons[index].revealed = true;
      OfferHub.saveCoupons(coupons);
      renderCoupons();
      alert('Thank you! The code is revealed. Once a buyer purchases your coupon, we will send you ₹30 as your share.');
    }
  }

  renderCoupons();
  window.addEventListener('offerhub:couponsUpdated', ()=> renderCoupons());
});
