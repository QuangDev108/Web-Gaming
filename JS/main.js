// ====== PRODUCT DATA ======
const products = [
    { id: 1,  name: "PC Gaming Beast i9 RTX 4090",          category: "gaming",      price: 89000000,  oldPrice: 99000000,  badge: "HOT",  specs: "i9-14900K | RTX 4090 | 64GB RAM | 2TB SSD",        catLabel: "PC" },
    { id: 2,  name: "Laptop ASUS ROG Zephyrus G16",          category: "gaming",      price: 52000000,  oldPrice: 58000000,  badge: "SALE", specs: "Ryzen 9 | RTX 4070 | 32GB | 1TB",                  catLabel: "Laptop" },
    { id: 3,  name: "Workstation Dell Precision 7680",        category: "workstation", price: 120000000, oldPrice: null,      badge: "NEW",  specs: "Xeon W | RTX A4000 | 128GB ECC | 4TB",             catLabel: "WS" },
    { id: 4,  name: "MacBook Pro M3 Max 16\"",               category: "laptop",      price: 99000000,  oldPrice: 105000000, badge: "SALE", specs: "M3 Max | 48GB | 1TB SSD | Liquid Retina XDR",      catLabel: "Laptop" },
    { id: 5,  name: "PC Văn phòng Core i5 Gen 13",           category: "van-phong",   price: 18500000,  oldPrice: null,      badge: null,   specs: "i5-13400 | UHD 730 | 16GB | 512GB SSD",            catLabel: "PC" },
    { id: 6,  name: "Intel Core i9-14900K Processor",         category: "linh-kien",   price: 13500000,  oldPrice: 15000000,  badge: "SALE", specs: "24 nhân 32 luồng | 6.0GHz Turbo | LGA1700",        catLabel: "CPU" },
    { id: 7,  name: "NVIDIA RTX 4080 Super 16GB",             category: "linh-kien",   price: 28000000,  oldPrice: null,      badge: "NEW",  specs: "16GB GDDR6X | DLSS 3 | Ray Tracing",               catLabel: "GPU" },
    { id: 8,  name: "Laptop Lenovo ThinkPad X1 Carbon",       category: "laptop",      price: 42000000,  oldPrice: 46000000,  badge: null,   specs: "i7-1365U | 32GB | 1TB | 14\" 2.8K OLED",          catLabel: "Laptop" },
    { id: 9,  name: "PC Gaming Ryzen 9 RTX 4080",             category: "gaming",      price: 68000000,  oldPrice: 72000000,  badge: "HOT",  specs: "R9 7900X | RTX 4080 | 32GB DDR5 | 1TB",           catLabel: "PC" },
    { id: 10, name: "Màn hình ASUS ROG Swift 32\" 4K 240Hz",  category: "phu-kien",    price: 22000000,  oldPrice: 25000000,  badge: "SALE", specs: "32\" IPS | 4K | 240Hz | HDR1000 | G-Sync",         catLabel: "MH" },
    { id: 11, name: "Bàn phím cơ Keychron Q5 Pro",            category: "phu-kien",    price: 4200000,   oldPrice: null,      badge: "NEW",  specs: "96% | QMK/VIA | Gasket mount | RGB",               catLabel: "KB" },
    { id: 12, name: "Laptop Dell XPS 15 OLED 2025",           category: "laptop",      price: 65000000,  oldPrice: 70000000,  badge: null,   specs: "i9-14900H | RTX 4070 | 64GB | 2TB | OLED",         catLabel: "Laptop" },
    { id: 13, name: "SSD Samsung 990 Pro 4TB NVMe",           category: "linh-kien",   price: 5800000,   oldPrice: 6500000,   badge: "SALE", specs: "PCIe 4.0 | 7450MB/s Read | M.2 2280",             catLabel: "SSD" },
    { id: 14, name: "RAM Corsair Dominator 64GB DDR5 6400",   category: "linh-kien",   price: 8200000,   oldPrice: null,      badge: null,   specs: "2x32GB | DDR5-6400 | CL32 | RGB",                  catLabel: "RAM" },
    { id: 15, name: "Chuột Logitech G Pro X Superlight 2",    category: "phu-kien",    price: 2800000,   oldPrice: 3200000,   badge: "HOT",  specs: "32000 DPI | 95g | 300h pin | 2.4GHz",              catLabel: "Mouse" },
    { id: 16, name: "Workstation HP Z6 G5 Dual Xeon",         category: "workstation", price: 185000000, oldPrice: null,      badge: "NEW",  specs: "2x Xeon Gold | 256GB ECC | RTX A5000",             catLabel: "WS" },
];

const ITEMS_PER_PAGE = 8;
let currentPage = 1;
let currentCategory = 'all';
let filteredProducts = [...products];

// ====== UTILITIES ======
function formatPrice(p) {
    return new Intl.NumberFormat('vi-VN').format(p) + 'đ';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ====== CART ======
function getCart() {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cart = getCart();
    const total = cart.reduce((s, i) => s + i.qty, 0);
    const el = document.getElementById('cartCount');
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    const cart = getCart();
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            catLabel: product.catLabel,
            specs: product.specs
        });
    }
    saveCart(cart);
    showToast(`Da them "${product.name.slice(0, 30)}..." vao gio hang`);
}

function buyNow(id) {
    addToCart(id);
    window.location.href = 'cart.html';
}

// ====== FILTER & RENDER ======
function filterProducts(cat) {
    currentCategory = cat;
    currentPage = 1;
    filterAndRender();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function resetFilter() {
    currentCategory = 'all';
    currentPage = 1;
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'mac-dinh';
    filterAndRender();
}

function filterAndRender() {
    const search = document.getElementById('searchInput').value.toLowerCase();
    const sort = document.getElementById('sortSelect').value;

    filteredProducts = products.filter(p => {
        const matchCat = currentCategory === 'all' || p.category === currentCategory;
        const matchSearch = p.name.toLowerCase().includes(search) || p.specs.toLowerCase().includes(search);
        return matchCat && matchSearch;
    });

    if (sort === 'tu-thap-den-cao') filteredProducts.sort((a, b) => a.price - b.price);
    if (sort === 'tu-cao-den-thap') filteredProducts.sort((a, b) => b.price - a.price);

    currentPage = 1;
    renderProducts();
}

function getCatLabel(cat) {
    const labels = {
        gaming: 'PC Gaming', laptop: 'Laptop', workstation: 'Workstation',
        'linh-kien': 'Linh kien', 'phu-kien': 'Phu kien', 'van-phong': 'Van phong'
    };
    return labels[cat] || cat;
}

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paged = filteredProducts.slice(start, start + ITEMS_PER_PAGE);
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    document.getElementById('countBadge').textContent = `Hien thi ${filteredProducts.length} san pham`;
    document.getElementById('pageInfo').textContent = `Trang ${currentPage} / ${totalPages || 1}`;
    document.getElementById('prevBtn').disabled = currentPage <= 1;
    document.getElementById('nextBtn').disabled = currentPage >= totalPages;

    if (paged.length === 0) {
        grid.innerHTML = `<div class="empty-state">Khong tim thay san pham phu hop</div>`;
        return;
    }

    grid.innerHTML = paged.map(p => `
        <div class="product-card">
            ${p.badge ? `<span class="product-badge badge-${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
            <div class="product-img">
                <span class="product-img-label">${p.catLabel}</span>
            </div>
            <div class="product-info">
                <span class="product-cat">${getCatLabel(p.category)}</span>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-specs">${p.specs}</p>
                <div class="product-pricing">
                    <span class="product-price">${formatPrice(p.price)}</span>
                    ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
                    ${p.oldPrice ? `<span class="product-discount">-${Math.round((1 - p.price / p.oldPrice) * 100)}%</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-cart" onclick="addToCart(${p.id})">Them gio</button>
                    <button class="btn-buy" onclick="buyNow(${p.id})">Mua ngay</button>
                </div>
            </div>
        </div>
    `).join('');
}

function changePage(dir) {
    const total = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
    currentPage = Math.max(1, Math.min(total, currentPage + dir));
    renderProducts();
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

// ====== COUNTDOWN ======
function startCountdown() {
    let h = 8, m = 45, s = 30;
    setInterval(() => {
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        document.getElementById('hours').textContent   = String(h).padStart(2, '0');
        document.getElementById('minutes').textContent = String(m).padStart(2, '0');
        document.getElementById('seconds').textContent = String(s).padStart(2, '0');
    }, 1000);
}

// ====== HEADER SCROLL ======
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// ====== INIT ======
updateCartUI();
filterAndRender();
startCountdown();