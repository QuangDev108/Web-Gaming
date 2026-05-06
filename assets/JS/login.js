// ====== USER DATA ======
const USERS = [
    { username: 'admin', password: 'admin123', fullName: 'Admin QuangStore', role: 'admin' },
    { username: 'user',  password: 'user123',  fullName: 'Nguyễn Văn A',     role: 'user'  },
];

// ====== UI HELPERS ======
function showAlert(msg, type = 'danger') {
    const el = document.getElementById('alertBox');
    el.textContent = msg;
    el.className = `alert alert-${type} show`;
    setTimeout(() => el.classList.remove('show'), 5000);
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// ====== DEMO FILL ======
function fillDemo(role) {
    if (role === 'admin') {
        document.getElementById('username').value = 'admin';
        document.getElementById('password').value = 'admin123';
        showToast('Đã điền tài khoản Admin!');
    } else {
        document.getElementById('username').value = 'user';
        document.getElementById('password').value = 'user123';
        showToast('Đã điền tài khoản User!');
    }
}

// ====== LOGIN ======
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (!username || !password) {
        showAlert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    const btn = document.getElementById('btnSubmit');
    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Đang đăng nhập...';

    setTimeout(() => {
        const user = USERS.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            showAlert(`Chào mừng ${user.fullName}! Đang chuyển hướng...`, 'success');
            setTimeout(() => { window.location.href = 'index.html'; }, 1200);
        } else {
            showAlert('Tên đăng nhập hoặc mật khẩu không đúng!');
            btn.disabled = false;
            btn.innerHTML = '<i class="fa-solid fa-right-to-bracket"></i> Đăng nhập';
        }
    }, 800);
}

// ====== ENTER KEY ======
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleLogin();
});