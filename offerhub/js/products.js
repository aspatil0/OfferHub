document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.getElementById('products-grid');
  const pagination = document.getElementById('pagination-controls');
  const search = document.getElementById('search-input');
  if(!grid) return;

  // Pagination state
  const perPage = 8; // show 8 products per page
  let currentPage = 1;
  let currentProducts = OFFERHUB_PRODUCTS.slice();

  // Render the products for a given page
  function renderPage(page=1){
    grid.innerHTML = '';
    const total = currentProducts.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    page = Math.max(1, Math.min(totalPages, page));
    currentPage = page;
    const start = (page - 1) * perPage;
    const end = Math.min(start + perPage, total);
    const pageItems = currentProducts.slice(start, end);

    if(pageItems.length === 0){
      const el = document.createElement('div');
      el.className = 'center small';
      el.textContent = 'No products available.';
      grid.appendChild(el);
    } else {
      pageItems.forEach(p => grid.appendChild(OfferHub.renderProductCard(p)));
    }

    // If there is another page, append a 'Go to next page' card as the last item in the grid
    if(page < totalPages){
      const nextCard = document.createElement('div');
      nextCard.className = 'product-card next-page-card center';
      nextCard.style.display = 'flex';
      nextCard.style.flexDirection = 'column';
      nextCard.style.alignItems = 'center';
      nextCard.style.justifyContent = 'center';
      nextCard.style.cursor = 'pointer';
      nextCard.style.padding = '2rem';
      nextCard.innerHTML = `<div style="font-weight:700;margin-bottom:8px">Go to next page</div><div class="small">Page ${page+1} of ${totalPages} · ${total - end} more products</div>`;
      nextCard.addEventListener('click', ()=>{
        renderPage(page + 1);
        // scroll to top of products on navigation for better UX
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      grid.appendChild(nextCard);
    }

    renderPaginationControls(totalPages);
  }

  // Renders Prev/Next and page numbers in pagination area
  function renderPaginationControls(totalPages){
    if(!pagination) return;
    pagination.innerHTML = '';
    if(totalPages <= 1) return; // hide controls if single page

    const prev = document.createElement('button');
    prev.className = 'page-button';
    prev.textContent = 'Prev';
    prev.disabled = currentPage === 1;
    prev.addEventListener('click', ()=>{ renderPage(currentPage - 1); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    pagination.appendChild(prev);

    // Page numbers (show limited range)
    const range = 3; // pages to show before/after current
    const start = Math.max(1, currentPage - range);
    const end = Math.min(totalPages, currentPage + range);
    for(let i=start;i<=end;i++){
      const btn = document.createElement('button');
      btn.className = 'page-button';
      btn.textContent = i;
      if(i === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => { renderPage(i); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
      pagination.appendChild(btn);
    }

    const next = document.createElement('button');
    next.className = 'page-button';
    next.textContent = 'Next';
    next.disabled = currentPage === totalPages;
    next.addEventListener('click', ()=>{ renderPage(currentPage + 1); grid.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
    pagination.appendChild(next);
  }

  function renderProductsList(products){
    currentProducts = products.slice();
    currentPage = 1;
    renderPage(currentPage);
  }

  // initial render: show all products paginated
  renderProductsList(OFFERHUB_PRODUCTS);

  // search uses simple filtering and will use the same pagination controls
  search.addEventListener('input', (e)=>{
    const term = (e.target.value || '').trim().toLowerCase();
    if(!term){
      renderProductsList(OFFERHUB_PRODUCTS);
      return;
    }
    const matched = OFFERHUB_PRODUCTS.filter(p => p.name.toLowerCase().includes(term) || p.category.toLowerCase().includes(term) || p.platform.toLowerCase().includes(term));
    if(matched.length === 0){
      grid.innerHTML = '';
      const el = document.createElement('div');
      el.className = 'center small';
      el.textContent = 'No products found for "' + e.target.value + '"';
      grid.appendChild(el);
      pagination.innerHTML = '';
      return;
    }
    renderProductsList(matched);
  });

  // Re-render badges if coupons change
  window.addEventListener('offerhub:couponsUpdated', ()=>{
    // rerender the current page to update badges and product counts
    renderPage(currentPage);
  });
});
