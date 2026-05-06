// ====== UTILITIES ======
function getCart() {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateHeaderCart();
}

function formatPrice(p) {
    return new Intl.NumberFormat('vi-VN').format(p) + 'd';
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ====== HEADER CART COUNT ======
function updateHeaderCart() {
    const cart = getCart();
    const total = cart.reduce((s, i) => s + i.qty, 0);
    const el = document.getElementById('cartCount');
    el.textContent = total;
    el.style.display = total > 0 ? 'flex' : 'none';
}

// ====== RENDER THUMBNAIL ======
// Hỗ trợ: item.image (URL ảnh), item.catLabel (text fallback)
function renderThumb(item) {
    if (item.image) {
        return `<img src="${item.image}" alt="${item.name}"
                    style="width:100%;height:100%;object-fit:cover;border-radius:9px;"
                    onerror="this.parentElement.innerHTML='<span>${item.catLabel || 'SP'}</span>'">`;
    }
    return `<span>${item.catLabel || 'SP'}</span>`;
}

// ====== RENDER CART ======
function renderCart() {
    const cart = getCart();
    const list       = document.getElementById('cartItemsList');
    const totalItems = document.getElementById('totalItems');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl    = document.getElementById('totalPrice');
    const shippingEl = document.getElementById('shipping');

    const itemCount = cart.reduce((s, i) => s + i.qty, 0);
    totalItems.textContent = itemCount;

    if (cart.length === 0) {
        list.innerHTML = `
            <div class="empty-cart">
                <h3>Giỏ hàng trống</h3>
                <p>Hãy thêm sản phẩm vào giỏ hàng để tiếp tục mua sắm</p>
                <a href="index.html" class="btn-primary">Khám phá sản phẩm</a>
            </div>
        `;
        subtotalEl.textContent = '0d';
        shippingEl.textContent = '0d';
        totalEl.textContent    = '0d';
        return;
    }

    const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const shipping = subtotal > 5000000 ? 0 : 30000;
    const total    = subtotal + shipping;

    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = shipping === 0 ? 'Miễn phí' : formatPrice(shipping);
    totalEl.textContent    = formatPrice(total);

    list.innerHTML = cart.map(item => `
        <div class="cart-item-row" id="item-${item.id}">
            <div class="cart-item-thumb">
                ${renderThumb(item)}
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-specs">${item.specs || ''}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="qty-control">
                <button class="qty-btn" onclick="changeQty(${item.id}, -1)">&#8722;</button>
                <input class="qty-num" type="number" value="${item.qty}" min="1" max="99"
                    onchange="setQty(${item.id}, this.value)">
                <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            </div>
            <div class="cart-item-total-col">
                <div class="cart-item-total">${formatPrice(item.price * item.qty)}</div>
                <button class="btn-remove" onclick="removeItem(${item.id})" title="Xóa">Xóa</button>
            </div>
        </div>
    `).join('');
}

// ====== CART ACTIONS ======
function changeQty(id, delta) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    saveCart(cart);
}

function setQty(id, val) {
    const cart = getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;
    item.qty = Math.max(1, parseInt(val) || 1);
    saveCart(cart);
}

function removeItem(id) {
    const cart = getCart().filter(i => i.id !== id);
    saveCart(cart);
    showToast('Đã xóa sản phẩm khỏi giỏ hàng');
}

function clearCart() {
    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
        saveCart([]);
        showToast('Đã xóa tất cả sản phẩm');
    }
}

function checkout() {
    const cart = getCart();
    if (cart.length === 0) {
        showToast('Giỏ hàng đang trống!');
        return;
    }
    showToast('Đặt hàng thành công! Cảm ơn bạn đã mua hàng tại QuangStore!');
    setTimeout(() => { saveCart([]); }, 2000);
}

// ====== INIT ======
updateHeaderCart();
renderCart();