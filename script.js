// RHB WEAR storefront interactions — edit the products and WhatsApp number below.
const STORE_WHATSAPP = "923001234567"; // Replace with your business WhatsApp number (country code, no +)

const products = [
  {id:1,name:"Blush Garden Lawn Suit",category:"Lawn",price:3850,tag:"NEW ARRIVAL",image:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=850&q=85"},
  {id:2,name:"Ivory Embroidered 3-Piece",category:"Unstitched",price:6250,tag:"BESTSELLER",image:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=850&q=85"},
  {id:3,name:"Rose Everyday Pret",category:"Ready to Wear",price:4950,tag:"JUST IN",image:"https://images.unsplash.com/photo-1583391733956-6c78276477e4?auto=format&fit=crop&w=850&q=85"},
  {id:4,name:"The Festive Grace Suit",category:"Formal",price:8950,tag:"LIMITED EDITION",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=850&q=85"},
  {id:5,name:"Soft Bloom Printed Suit",category:"Unstitched",price:4250,tag:"NEW ARRIVAL",image:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=850&q=85"},
  {id:6,name:"Everyday Elegance Set",category:"Ready to Wear",price:5450,tag:"CUSTOMER FAVOURITE",image:"https://images.unsplash.com/photo-1583391733956-6c78276477e4?auto=format&fit=crop&w=850&q=85"},
  {id:7,name:"Champagne Occasion Suit",category:"Formal",price:11200,tag:"OCCASION EDIT",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=850&q=85"},
  {id:8,name:"Summer Breeze Lawn",category:"Lawn",price:3650,tag:"SEASONAL PICK",image:"https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=850&q=85"}
];

let cart = [];
let activeFilter = "All";
let searchTerm = "";

const $ = (id) => document.getElementById(id);
const formatPrice = (price) => "Rs. " + Number(price).toLocaleString("en-PK");

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2400);
}

function renderProducts() {
  let list = products.filter((product) => {
    const matchesCategory = activeFilter === "All" || product.category === activeFilter;
    const matchesSearch = (product.name + " " + product.category).toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const sort = $("sortSelect").value;
  if (sort === "low") list.sort((a,b) => a.price - b.price);
  if (sort === "high") list.sort((a,b) => b.price - a.price);
  $("productGrid").innerHTML = list.map((p) => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <span class="product-label">${p.tag}</span>
        <button class="quick-add" data-add="${p.id}">ADD TO BAG +</button>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category.toUpperCase()}</div>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price">${formatPrice(p.price)}</div>
      </div>
    </article>`).join("");
  $("emptyState").classList.toggle("hidden", list.length > 0);
}

function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.quantity, 0);
  const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
  $("cartCount").textContent = count;
  $("drawerCount").textContent = `(${count})`;
  $("cartSubtotal").textContent = formatPrice(total);
  if (!cart.length) {
    $("cartItems").innerHTML = '<div class="cart-empty">Your bag is waiting for something beautiful.<br><br><a href="#shop" class="text-link" id="continueShopping">DISCOVER THE COLLECTION ↗</a></div>';
    $("checkoutBtn").disabled = true;
    $("checkoutBtn").style.opacity = ".5";
  } else {
    $("cartItems").innerHTML = cart.map(item => `
      <div class="cart-row">
        <img src="${item.image}" alt="${item.name}">
        <div><h4>${item.name}</h4><small>${formatPrice(item.price)}</small>
          <div class="qty-controls"><button data-qty="${item.id}" data-change="-1">−</button><span>${item.quantity}</span><button data-qty="${item.id}" data-change="1">+</button></div>
          <button class="remove-item" data-remove="${item.id}">REMOVE</button>
        </div>
        <div class="cart-row-price">${formatPrice(item.price * item.quantity)}</div>
      </div>`).join("");
    $("checkoutBtn").disabled = false;
    $("checkoutBtn").style.opacity = "1";
  }
}

function openCart() {
  $("cartDrawer").classList.add("open");
  $("overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  $("cartDrawer").classList.remove("open");
  $("overlay").classList.remove("open");
  document.body.style.overflow = "";
}
function addToCart(id) {
  const product = products.find(p => p.id === Number(id));
  if (!product) return;
  const existing = cart.find(item => item.id === product.id);
  if (existing) existing.quantity += 1;
  else cart.push({...product, quantity:1});
  renderCart();
  showToast("A beautiful choice — added to your bag.");
}

$("productGrid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});
$("cartItems").addEventListener("click", (event) => {
  const qtyButton = event.target.closest("[data-qty]");
  const removeButton = event.target.closest("[data-remove]");
  if (qtyButton) {
    const item = cart.find(p => p.id === Number(qtyButton.dataset.qty));
    if (item) item.quantity += Number(qtyButton.dataset.change);
    cart = cart.filter(p => p.quantity > 0);
    renderCart();
  }
  if (removeButton) {
    cart = cart.filter(p => p.id !== Number(removeButton.dataset.remove));
    renderCart();
  }
});

$("filterPills").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("selected", p === button));
  renderProducts();
});
document.querySelectorAll("[data-category-link]").forEach(link => {
  link.addEventListener("click", () => {
    activeFilter = link.dataset.categoryLink;
    document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("selected", p.dataset.filter === activeFilter));
    renderProducts();
  });
});
$("sortSelect").addEventListener("change", renderProducts);
$("clearFilters").addEventListener("click", () => {
  activeFilter = "All"; searchTerm = "";
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("selected", p.dataset.filter === "All"));
  renderProducts();
});
$("searchToggle").addEventListener("click", () => $("searchBar").classList.toggle("open"));
$("searchSubmit").addEventListener("click", () => {
  searchTerm = $("searchInput").value.trim();
  activeFilter = "All";
  document.querySelectorAll(".filter-pill").forEach(p => p.classList.toggle("selected", p.dataset.filter === "All"));
  renderProducts();
  $("shop").scrollIntoView({behavior:"smooth"});
});
$("searchInput").addEventListener("keydown", e => { if(e.key === "Enter") $("searchSubmit").click(); });
$("cartToggle").addEventListener("click", openCart);
$("closeCart").addEventListener("click", closeCart);
$("overlay").addEventListener("click", closeCart);
$("checkoutBtn").addEventListener("click", () => {
  if (!cart.length) return;
  closeCart();
  $("checkoutModal").classList.add("open");
});
$("closeCheckout").addEventListener("click", () => $("checkoutModal").classList.remove("open"));
$("checkoutModal").addEventListener("click", (e) => { if(e.target === $("checkoutModal")) $("checkoutModal").classList.remove("open"); });

$("checkoutForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cart.length) return;
  const data = new FormData(event.currentTarget);
  const orderLines = cart.map(item => `${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`).join("\n");
  const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
  const message = `Assalam-o-Alaikum RHB Wear! I would like to place an order:\n\n${orderLines}\n\nSubtotal: ${formatPrice(total)}\n\nName: ${data.get("name")}\nPhone: ${data.get("phone")}\nCity: ${data.get("city")}\nAddress: ${data.get("address")}\nPayment: ${data.get("payment")}`;
  if (!STORE_WHATSAPP || STORE_WHATSAPP === "923001234567") {
    showToast("Please set your real WhatsApp number in script.js first.");
    return;
  }
  window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  $("checkoutModal").classList.remove("open");
});

$("footerWhatsApp").addEventListener("click", (event) => {
  event.preventDefault();
  if (!STORE_WHATSAPP || STORE_WHATSAPP === "923001234567") {
    showToast("Please add your WhatsApp number in script.js.");
    return;
  }
  window.open(`https://wa.me/${STORE_WHATSAPP}`, "_blank", "noopener");
});
$("mobileMenuBtn").addEventListener("click", () => $("mobileNav").classList.toggle("open"));
$("mobileNav").querySelectorAll("a").forEach(link => link.addEventListener("click", () => $("mobileNav").classList.remove("open")));
$("newsletterForm").addEventListener("submit", (event) => {
  event.preventDefault();
  $("newsletterMessage").textContent = "Thank you for joining the RHB Wear list.";
  event.currentTarget.reset();
});
$("year").textContent = new Date().getFullYear();

renderProducts();
renderCart();
