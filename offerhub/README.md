# OfferHub - Dummy Static Site

A small static demo website to show product offers and coupon buying/selling.

Features:
- Responsive navbar
- Home page with featured offers
- Products search page (filters and shows best offer)
- Sell coupon page (step-by-step form; adds coupon to Buy page)
- Buy coupon page (coupon details blurred until payment simulated)
- Data is static JSON; coupons stored in localStorage

How to run
1. Open `index.html` in your browser (no server required). For file-based testing, you can also use a static server:

   python -m http.server 8000

2. Visit:
- `index.html` - home
- `products.html` - products and search
- `buy-coupon.html` - browse / buy coupons
- `sell-coupon.html` - submit coupons

How data is stored
- Products are defined in `js/data.js` as `OFFERHUB_PRODUCTS` (static JSON)
   - Each product has an `image_url` for display in product cards (placeholder images used).
   - The site now uses a premium theme: glassmorphism UI, deep navy background, gold accent, and Playfair/Poppins fonts.
- Default coupons are `OFFERHUB_COUPONS_DEFAULT` and the running app keeps coupons persisted in `localStorage` key `offerhub_coupons_v1`.

Logo
- Place your logo file (for example the attachment) in the `images/` folder and name it `offerhub-logo.png` so the site will pick it up automatically. A fallback placeholder `images/offerhub-logo-placeholder.svg` is included and will be used if the PNG is absent.

Sticky header
- The navbar is sticky (stays visible at the top) and uses a blur/glass effect. If you want to adjust padding or behavior, see the `.site-header` and `.site-header nav` rules in `css/styles.css`.

Notes
- This is a front-end-only prototype. No scraping, no backend.
- Modular JS with clear functions for easy upgrade to API-based backend.
