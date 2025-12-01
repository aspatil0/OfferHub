// Dummy JSON data for OfferHub
const OFFERHUB_PRODUCTS = [
  {id:1,name:"Sony WH-1000XM4 Wireless Headphones",price:19800,discount:26,platform:"Amazon",platform_url:"https://amazon.example.com/product/1",category:"Electronics",image_url:"https://picsum.photos/seed/product-1/520/320"},
  {id:2,name:"OnePlus 9R 5G",price:35999,discount:25,platform:"Flipkart",platform_url:"https://flipkart.example.com/product/2",category:"Mobiles",image_url:"https://picsum.photos/seed/product-2/520/320"},
  {id:3,name:"Levis Men's Jeans",price:2299,discount:40,platform:"Myntra",platform_url:"https://myntra.example.com/product/3",category:"Apparel",image_url:"https://picsum.photos/seed/product-3/520/320"},
  {id:4,name:"Nike Running Shoes",price:6599,discount:15,platform:"Ajio",platform_url:"https://ajio.example.com/product/4",category:"Footwear",image_url:"https://picsum.photos/seed/product-4/520/320"},
  {id:5,name:'Samsung 55" 4K Smart TV',price:49990,discount:20,platform:'Amazon',platform_url:'https://amazon.example.com/product/5',category:'Electronics',image_url:'https://picsum.photos/seed/product-5/520/320'},
  {id:6,name:"HP Pavilion Laptop",price:45990,discount:10,platform:"Flipkart",platform_url:"https://flipkart.example.com/product/6",category:"Computers",image_url:"https://picsum.photos/seed/product-6/520/320"},
  {id:7,name:"Ray-Ban Sunglasses",price:7399,discount:35,platform:"Myntra",platform_url:"https://myntra.example.com/product/7",category:"Accessories",image_url:"https://picsum.photos/seed/product-7/520/320"},
  {id:8,name:"Garnier Facewash",price:149,discount:33,platform:"Amazon",platform_url:"https://amazon.example.com/product/8",category:"Beauty",image_url:"https://picsum.photos/seed/product-8/520/320"},
  {id:9,name:"KitchenAid Mixer",price:35999,discount:12,platform:"Amazon",platform_url:"https://amazon.example.com/product/9",category:"Home",image_url:"https://picsum.photos/seed/product-9/520/320"},
  {id:10,name:"Samsung Galaxy Buds",price:7999,discount:18,platform:"Flipkart",platform_url:"https://flipkart.example.com/product/10",category:"Electronics",image_url:"https://picsum.photos/seed/product-10/520/320"},
  {id:11,name:"Zara Dress for Women",price:3999,discount:30,platform:"Ajio",platform_url:"https://ajio.example.com/product/11",category:"Apparel",image_url:"https://picsum.photos/seed/product-11/520/320"},
  {id:12,name:"Ultima Water Bottle",price:999,discount:5,platform:"Amazon",platform_url:"https://amazon.example.com/product/12",category:"Home",image_url:"https://picsum.photos/seed/product-12/520/320"}
];

// Pre-populate with a sample coupon
const OFFERHUB_COUPONS_DEFAULT = [
  {id:1,platform:'Flipkart',category:'Electronics',description:'20% off on mobile accessories',price:50,code:'FLIP20OFF',revealed:false,sellerPhone:'9876543210'},
  {id:2,platform:'Amazon',category:'Apparel',description:'25% off on select apparel',price:30,code:'AMZ25APP',revealed:false,sellerPhone:'9123456780'}
];
