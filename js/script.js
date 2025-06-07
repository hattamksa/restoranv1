// Global Variables
let menuItems = [];
let cartItems = [];

// DOM Elements
const menuContainer = document.getElementById('menu-container');
const cartIcon = document.getElementById('cart-icon');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.querySelector('.cart-count');
const checkoutBtn = document.getElementById('checkout-btn');
const continueBtn = document.getElementById('continue-btn');
const foodDetailModal = document.getElementById('food-detail-modal');
const closeModal = document.getElementById('close-modal');
const foodDetail = document.getElementById('food-detail');
const overlay = document.getElementById('overlay');

// Fetch menu data
async function fetchMenuData() {
    try {
        const response = await fetch('data/menu.json');
        menuItems = await response.json();
        displayMenuItems();
    } catch (error) {
        console.error('Error fetching menu data:', error);
        menuContainer.innerHTML = '<p class="error">Failed to load menu items. Please try again later.</p>';
    }
}

// Display menu items
function displayMenuItems() {
    if (!menuContainer) return;

    menuContainer.innerHTML = '';

    menuItems.forEach(item => {
        const fallbackImage = `https://placehold.co/300x200?text=${encodeURIComponent(item.name)}`;
        const menuItem = document.createElement('div');
        menuItem.classList.add('menu-item');
        menuItem.innerHTML = `
            <div class="menu-item-image">
                <img src="${item.image || fallbackImage}" alt="${item.name}" onerror="this.src='${fallbackImage}'">
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-description">${item.shortDescription}</p>
                <p class="menu-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                <div class="menu-item-actions">
                    <button class="detail-btn" data-id="${item.id}">Lihat Detail</button>
                    <button class="add-to-cart-btn" data-id="${item.id}">+ Keranjang</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItem);
    });

    addMenuEventListeners();
}

// Add event listeners to menu buttons
function addMenuEventListeners() {
    document.querySelectorAll('.detail-btn').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            showFoodDetail(itemId);
        });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            addToCart(itemId, 1);
        });
    });
}

// Show food detail modal
function showFoodDetail(itemId) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    const fallbackImage = `https://placehold.co/400x300?text=${encodeURIComponent(item.name)}`;

    foodDetail.innerHTML = `
        <div class="food-detail-image">
            <img src="${item.image || fallbackImage}" alt="${item.name}" onerror="this.src='${fallbackImage}'">
        </div>
        <div class="food-detail-content">
            <h2 class="food-detail-title">${item.name}</h2>
            <p class="food-detail-price">Rp ${item.price.toLocaleString('id-ID')}</p>
            <p class="food-detail-description">${item.description}</p>
            <div class="food-detail-quantity">
                <span>Jumlah:</span>
                <button class="detail-quantity-btn decrease">-</button>
                <span class="detail-quantity-value">1</span>
                <button class="detail-quantity-btn increase">+</button>
            </div>
            <button class="btn add-to-cart-detail-btn" data-id="${item.id}">Tambah ke Keranjang</button>
        </div>
    `;

    // Quantity controls
    let quantity = 1;
    const quantityValue = foodDetail.querySelector('.detail-quantity-value');

    foodDetail.querySelector('.decrease').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityValue.textContent = quantity;
        }
    });

    foodDetail.querySelector('.increase').addEventListener('click', () => {
        quantity++;
        quantityValue.textContent = quantity;
    });

    foodDetail.querySelector('.add-to-cart-detail-btn').addEventListener('click', () => {
        addToCart(itemId, quantity);
        closeFoodDetail();
    });

    foodDetailModal.classList.add('active');
    overlay.classList.add('active');
}

// Close food detail modal
function closeFoodDetail() {
    foodDetailModal.classList.remove('active');
    overlay.classList.remove('active');
}

// Add item to cart
function addToCart(itemId, quantity) {
    const item = menuItems.find(item => item.id === itemId);
    if (!item) return;

    const existingItem = cartItems.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ ...item, quantity });
    }

    updateCart();
    saveCartToLocalStorage();
    showCart();
}

// Update cart
function updateCart() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    cartItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Keranjang belanja Anda kosong.</p>';
        cartTotal.textContent = 'Rp 0';
        return;
    }

    cartItems.forEach(item => {
        const fallbackImage = `https://placehold.co/80x80?text=${encodeURIComponent(item.name)}`;
        console.log(fallbackImage);
        console.log('test')
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image || fallbackImage}" alt="${item.name}" onerror="this.src='${fallbackImage}'">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-title">${item.name}</h4>
                <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">Hapus</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });

    addCartItemEventListeners();

    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Cart item button listeners
function addCartItemEventListeners() {
    cartItemsContainer.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            decreaseQuantity(itemId);
        });
    });

    cartItemsContainer.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            increaseQuantity(itemId);
        });
    });

    cartItemsContainer.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            removeFromCart(itemId);
        });
    });
}

// Quantity handlers
function decreaseQuantity(itemId) {
    const item = cartItems.find(i => i.id === itemId);
    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(itemId);
    }
    updateCart();
    saveCartToLocalStorage();
}

function increaseQuantity(itemId) {
    const item = cartItems.find(i => i.id === itemId);
    item.quantity++;
    updateCart();
    saveCartToLocalStorage();
}

function removeFromCart(itemId) {
    cartItems = cartItems.filter(i => i.id !== itemId);
    updateCart();
    saveCartToLocalStorage();
}

// Cart sidebar
function showCart() {
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
}

function hideCart() {
    cartSidebar.classList.remove('active');
    overlay.classList.remove('active');
}

// Storage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartFromLocalStorage() {
    const saved = localStorage.getItem('cartItems');
    if (saved) {
        cartItems = JSON.parse(saved);
        updateCart();
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    fetchMenuData();
    loadCartFromLocalStorage();

    cartIcon?.addEventListener('click', showCart);
    closeCart?.addEventListener('click', hideCart);
    continueBtn?.addEventListener('click', hideCart);
    checkoutBtn?.addEventListener('click', () => window.location.href = 'checkout.html');
    closeModal?.addEventListener('click', closeFoodDetail);
    overlay?.addEventListener('click', () => {
        hideCart();
        closeFoodDetail();
    });
});
