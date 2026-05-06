// ====== PRODUCT DATA ======
const products = [
    { id: 1,  name: "PC Gaming Beast i9 RTX 4090",          category: "gaming",      price: 89000000,  oldPrice: 99000000,  badge: "HOT",  specs: "i9-14900K | RTX 4090 | 64GB RAM | 2TB SSD",      catLabel: "PC",     img: "./assets/images/PC_Gaming_Beast.jpg" },
    { id: 2,  name: "Laptop ASUS ROG Zephyrus G16",          category: "gaming",      price: 52000000,  oldPrice: 58000000,  badge: "SALE", specs: "Ryzen 9 | RTX 4070 | 32GB | 1TB",                catLabel: "Laptop", img: "./assets/images/Laptop_ASUS_ROG_Zephyrus_G16.webp" },
    { id: 3,  name: "Workstation Dell Precision 7680",        category: "workstation", price: 120000000, oldPrice: null,      badge: "NEW",  specs: "Xeon W | RTX A4000 | 128GB ECC | 4TB",           catLabel: "WS",     img: "./assets/images/Workstation_Dell_Precision_7680.webp" },
    { id: 4,  name: "MacBook Pro M3 Max 16",                  category: "laptop",      price: 99000000,  oldPrice: 105000000, badge: "SALE", specs: "M3 Max | 48GB | 1TB SSD | Liquid Retina XDR",    catLabel: "Laptop", img: "./assets/images/MacBook Pro_M3_Max_16.jpeg" },
    { id: 5,  name: "PC Văn phòng Core i5 Gen 13",            category: "van-phong",   price: 18500000,  oldPrice: null,      badge: null,   specs: "i5-13400 | UHD 730 | 16GB | 512GB SSD",          catLabel: "PC",     img: "./assets/images/pcvan-phong-i3.jpg" },
    { id: 6,  name: "Intel Core i9-14900K Processor",          category: "linh-kien",   price: 13500000,  oldPrice: 15000000,  badge: "SALE", specs: "24 nhân 32 luồng | 6.0GHz Turbo | LGA1700",      catLabel: "CPU",    img: "./assets/images/Intel_Core i9-14900K_Processor.jpg" },
    { id: 7,  name: "NVIDIA RTX 4080 Super 16GB",              category: "linh-kien",   price: 28000000,  oldPrice: null,      badge: "NEW",  specs: "16GB GDDR6X | DLSS 3 | Ray Tracing",             catLabel: "GPU",    img: "./assets/images/NVIDIA_RTX_4080.png" },
    { id: 8,  name: "Laptop Lenovo ThinkPad X1 Carbon",        category: "laptop",      price: 42000000,  oldPrice: 46000000,  badge: null,   specs: "i7-1365U | 32GB | 1TB | 14\" 2.8K OLED",        catLabel: "Laptop", img: "./assets/images/Laptop_Lenovo_ThinkPad X1_Carbon.webp" },
    { id: 9,  name: "PC Gaming Ryzen 9 RTX 4080",              category: "gaming",      price: 68000000,  oldPrice: 72000000,  badge: "HOT",  specs: "R9 7900X | RTX 4080 | 32GB DDR5 | 1TB",         catLabel: "PC",     img: "./assets/images/PCGaming_Ryzen9_RTX-4080.jpg" },
    { id: 10, name: "Màn hình ASUS ROG Swift 32\" 4K 240Hz",   category: "phu-kien",    price: 22000000,  oldPrice: 25000000,  badge: "SALE", specs: "32\" IPS | 4K | 240Hz | HDR1000 | G-Sync",      catLabel: "MH",     img: "./assets/images/Man_hinh_ASUSROG_Swift 32.png" },
    { id: 11, name: "Bàn phím cơ Keychron Q5 Pro",             category: "phu-kien",    price: 4200000,   oldPrice: null,      badge: "NEW",  specs: "96% | QMK/VIA | Gasket mount | RGB",             catLabel: "KB",     img: "./assets/images/Keychron_Q5_Pro.webp" },
    { id: 12, name: "Laptop Dell XPS 15 OLED 2025",            category: "laptop",      price: 65000000,  oldPrice: 70000000,  badge: null,   specs: "i9-14900H | RTX 4070 | 64GB | 2TB | OLED",      catLabel: "Laptop", img: "./assets/images/LaptopDell_XPS15OLED 2025.jpg" },
    { id: 13, name: "SSD Samsung 990 Pro 4TB NVMe",            category: "linh-kien",   price: 5800000,   oldPrice: 6500000,   badge: "SALE", specs: "PCIe 4.0 | 7450MB/s Read | M.2 2280",           catLabel: "SSD",    img: "./assets/images/SSD_Samsung990_Pro4TB.png" },
    { id: 14, name: "RAM Corsair Dominator 64GB DDR5 6400",    category: "linh-kien",   price: 8200000,   oldPrice: null,      badge: null,   specs: "2x32GB | DDR5-6400 | CL32 | RGB",                catLabel: "RAM",    img: "./assets/images/Corsair_Dominator64GB.jpg" },
    { id: 15, name: "Chuột Logitech G Pro X Superlight 2",     category: "phu-kien",    price: 2800000,   oldPrice: 3200000,   badge: "HOT",  specs: "32000 DPI | 95g | 300h pin | 2.4GHz",           catLabel: "Mouse",  img: "./assets/images/Logitech_GProX_Superlight2.jpg" },
    { id: 16, name: "Workstation HP Z6 G5 Dual Xeon",          category: "workstation", price: 185000000, oldPrice: null,      badge: "NEW",  specs: "2x Xeon Gold | 256GB ECC | RTX A5000",           catLabel: "WS",     img: "./assets/images/Workstation_HPZ6G5_DualXeon.jpg" },
];

// ====== STATE ======
const state = {
    category: 'all',
    q: '',
    sort: 'mac-dinh',
    page: 1,
    limit: 8,
};

// ====== UTILITIES ======
/**
 * Bỏ dấu tiếng Việt để tìm kiếm không phân biệt dấu
 */
function removeVietnameseTones(str) {
    if (!str) return '';
    return str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
}

function formatPrice(p) {
    return new Intl.NumberFormat('vi-VN').format(p) + 'đ';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

function getCatLabel(cat) {
    const labels = {
        gaming: 'PC Gaming',
        laptop: 'Laptop',
        workstation: 'Workstation',
        'linh-kien': 'Linh kiện',
        'phu-kien': 'Phụ kiện',
        'van-phong': 'Văn phòng',
    };
    return labels[cat] || cat;
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
    if (!el) return;
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
            specs: product.specs,
            image: product.img 
        });
    }
    saveCart(cart);
    showToast(`Đã thêm "${product.name.slice(0, 30)}..." vào giỏ hàng`);
}

function buyNow(id) {
    addToCart(id);
    window.location.href = 'cart.html';
}


// ====== FILTER, SEARCH, SORT ======
/**
 * Lấy danh sách sản phẩm đã lọc + sắp xếp dựa theo state hiện tại
 * @returns {Array} filtered & sorted products
 */
function getFilteredProducts() {
    let result = [...products];

    // 1. Lọc theo danh mục
    if (state.category && state.category !== 'all') {
        result = result.filter(p => p.category === state.category);
    }

    // 2. Tìm kiếm theo tên + specs (có hỗ trợ không dấu)
    if (state.q && state.q.trim() !== '') {
        const searchTerm = removeVietnameseTones(state.q.toLowerCase().trim());
        result = result.filter(p => {
            const name = removeVietnameseTones(p.name.toLowerCase());
            const specs = removeVietnameseTones(p.specs.toLowerCase());
            return name.includes(searchTerm) || specs.includes(searchTerm);
        });
    }

    // 3. Sắp xếp
    if (state.sort === 'tu-thap-den-cao') {
        result.sort((a, b) => a.price - b.price);
    } else if (state.sort === 'tu-cao-den-thap') {
        result.sort((a, b) => b.price - a.price);
    }

    return result;
}

// ====== RENDER ======

function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    const filtered = getFilteredProducts();
    const totalProducts = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalProducts / state.limit));

    // Giới hạn page hợp lệ
    state.page = Math.max(1, Math.min(state.page, totalPages));

    // Phân trang
    const startIndex = (state.page - 1) * state.limit;
    const paged = filtered.slice(startIndex, startIndex + state.limit);

    // Cập nhật thông tin phân trang & badge
    const countBadge = document.getElementById('countBadge');
    if (countBadge) countBadge.textContent = `Hiển thị ${totalProducts} sản phẩm`;

    const pageInfo = document.getElementById('pageInfo');
    if (pageInfo) pageInfo.textContent = `Trang ${state.page} / ${totalPages}`;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.disabled = state.page <= 1;
    if (nextBtn) nextBtn.disabled = state.page >= totalPages;

    // Trường hợp không có sản phẩm
    if (paged.length === 0) {
        grid.innerHTML = `
            <div class="empty-state" style="grid-column:1/-1; text-align:center; padding:60px 20px;">
                <i class="fa-solid fa-box-open" style="font-size:80px; color:#ddd;"></i>
                <h3 style="margin:20px 0; color:#2c3e50;">Không tìm thấy sản phẩm</h3>
                <p style="color:#7f8c8d;">Thử tìm kiếm với từ khóa khác hoặc đặt lại bộ lọc</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = paged.map(p => {
        const discountPct = p.oldPrice
            ? Math.round((1 - p.price / p.oldPrice) * 100)
            : null;

        return `
            <div class="product-card">
                ${p.badge ? `<span class="product-badge badge-${p.badge.toLowerCase()}">${p.badge}</span>` : ''}
                <div class="product-img">
                    ${p.img
                        ? `<img src="${p.img}" alt="${p.name}"
                               loading="lazy"
                               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
                           <span class="product-img-label" style="display:none">${p.catLabel}</span>`
                        : `<span class="product-img-label">${p.catLabel}</span>`
                    }
                </div>
                <div class="product-info">
                    <span class="product-cat">${getCatLabel(p.category)}</span>
                    <h3 class="product-name">${p.name}</h3>
                    <p class="product-specs">${p.specs}</p>
                    <div class="product-pricing">
                        <span class="product-price">${formatPrice(p.price)}</span>
                        ${p.oldPrice ? `<span class="product-old-price">${formatPrice(p.oldPrice)}</span>` : ''}
                        ${discountPct ? `<span class="product-discount">-${discountPct}%</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="btn-cart" onclick="addToCart(${p.id})">Thêm giỏ</button>
                        <button class="btn-buy"  onclick="buyNow(${p.id})">Mua ngay</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ====== SEARCH & FILTER ACTIONS ======

function doSearch() {
    const input = document.getElementById('searchInput');
    state.q = input ? input.value : '';
    state.page = 1;
    renderProducts();
}

function filterProducts(cat) {
    state.category = cat;
    state.page = 1;
    renderProducts();
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

function resetFilter() {
    state.category = 'all';
    state.q = '';
    state.sort = 'mac-dinh';
    state.page = 1;

    const searchInput = document.getElementById('searchInput');
    const sortSelect  = document.getElementById('sortSelect');
    if (searchInput) searchInput.value = '';
    if (sortSelect)  sortSelect.value  = 'mac-dinh';

    renderProducts();
}

function filterAndRender() {
    const sortSelect = document.getElementById('sortSelect');
    state.sort = sortSelect ? sortSelect.value : 'mac-dinh';

    const searchInput = document.getElementById('searchInput');
    state.q = searchInput ? searchInput.value : '';

    state.page = 1;
    renderProducts();
}

function changePage(dir) {
    const filtered = getFilteredProducts();
    const totalPages = Math.max(1, Math.ceil(filtered.length / state.limit));
    state.page = Math.max(1, Math.min(totalPages, state.page + dir));
    renderProducts();
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
}

// ====== COUNTDOWN ======
function startCountdown() {
    let h = 8, m = 45, s = 30;
    setInterval(() => {
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        const hoursEl   = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        if (hoursEl)   hoursEl.textContent   = String(h).padStart(2, '0');
        if (minutesEl) minutesEl.textContent  = String(m).padStart(2, '0');
        if (secondsEl) secondsEl.textContent  = String(s).padStart(2, '0');
    }, 1000);
}

// ====== HEADER SCROLL ======
window.addEventListener('scroll', () => {
    document.getElementById('header')?.classList.toggle('scrolled', window.scrollY > 50);
});

// ====== INIT ======
updateCartUI();
renderProducts();
startCountdown();