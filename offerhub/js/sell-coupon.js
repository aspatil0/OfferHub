document.addEventListener('DOMContentLoaded', ()=>{
  const container = document.getElementById('sell-steps');
  if(!container) return;
  const steps = [];
  let state = {platform:'Amazon',category:'Electronics',code:'',price:0,description:'',sellerPhone:''};
  function render(){
    container.innerHTML = '';
    const step1 = document.createElement('div');
    step1.className = 'step';
    step1.innerHTML = `
      <h3>Step 1: Enter Coupon Details</h3>
      <label class="small">Platform</label>
      <select id="platform-select">
        <option>Amazon</option>
        <option>Flipkart</option>
        <option>Myntra</option>
        <option>Ajio</option>
      </select>
      <label class="small">Coupon Code</label>
      <input id="coupon-code" placeholder="Enter code from GPay/PhonePe/Paytm etc" />
      <label class="small">Price (What buyer pays to reveal)</label>
      <input id="coupon-price" type="number" min="1" />
      <div style="text-align:right;margin-top:0.6rem;">
        <button id="to-step-2" class="primary">Next</button>
      </div>
    `;
    container.appendChild(step1);

    const step2 = document.createElement('div');
    step2.className = 'step';
    step2.innerHTML = `
      <h3>Step 2: More Info</h3>
      <label class="small">Category</label>
      <select id="coupon-category">
          <option>Electronics</option>
          <option>Mobiles</option>
          <option>Apparel</option>
          <option>Footwear</option>
          <option>Accessories</option>
          <option>Home</option>
          <option>Beauty</option>
      </select>
      <label class="small">Short Description</label>
      <input id="coupon-desc" placeholder="Short description about coupon" />
      <label class="small">Seller Phone Number</label>
      <input id="seller-phone" placeholder="Enter phone number" />
      <div style="display:flex;gap:.5rem;justify-content:space-between;margin-top:0.6rem;">
        <button id="back-to-step-1">Back</button>
        <button id="submit-coupon" class="primary">Submit Coupon</button>
      </div>
    `;
    container.appendChild(step2);

    const step3 = document.createElement('div');
    step3.className = 'step';
    step3.id = 'step-3';
    step3.innerHTML = `
      <h3>Step 3: Done!</h3>
      <p>Once a buyer purchases your coupon, we will send you ₹30 as your share.</p>
      <div class="center"><button id="sell-another">Sell Another</button></div>
    `;
    container.appendChild(step3);

    // Hook events
    document.getElementById('to-step-2').addEventListener('click', ()=>{
      const code = document.getElementById('coupon-code').value.trim();
      const platform = document.getElementById('platform-select').value;
      const price = Number(document.getElementById('coupon-price').value);
      if(!code || !price){
        alert('Please add coupon code and price');
        return;
      }
      state.platform = platform; state.code = code; state.price = price;
      // show step 2
      step1.style.display='none'; step2.style.display='block'; step3.style.display='none';
    });
    document.getElementById('back-to-step-1').addEventListener('click', ()=>{
      step1.style.display='block'; step2.style.display='none'; step3.style.display='none';
    });
    document.getElementById('submit-coupon').addEventListener('click', ()=>{
      const category = document.getElementById('coupon-category').value;
      const desc = document.getElementById('coupon-desc').value.trim();
      const phone = document.getElementById('seller-phone').value.trim();
      if(!category || !desc || !phone){
        alert('Please fill all required details');
        return;
      }
      state.category = category; state.description = desc; state.sellerPhone = phone;
      // add coupon
      const coupons = OfferHub.getCoupons();
      const newId = (coupons.length ? Math.max(...coupons.map(c=>c.id)) : 0) + 1;
      const newCoupon = {id:newId,platform:state.platform,category:state.category,description:state.description,price:state.price,code:state.code,revealed:false,sellerPhone:state.sellerPhone};
      coupons.push(newCoupon);
      OfferHub.saveCoupons(coupons);
      // Show success
      step1.style.display='none'; step2.style.display='none'; step3.style.display='block';
    });

    document.getElementById('sell-another').addEventListener('click', ()=>{
      document.getElementById('coupon-code').value=''; document.getElementById('coupon-price').value='';
      document.getElementById('coupon-desc').value=''; document.getElementById('seller-phone').value='';
      // reset to step 1
      step1.style.display='block'; step2.style.display='none'; step3.style.display='none';
    });

    // initial state: show only step1
    step1.style.display='block'; step2.style.display='none'; step3.style.display='none';
  }

  render();
});
