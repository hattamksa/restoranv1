// Global Variables
let cartItems = [];

// DOM Elements
const orderItemsContainer = document.getElementById('order-items');
const orderTotal = document.getElementById('order-total');
const cartCount = document.querySelector('.cart-count');
const checkoutForm = document.getElementById('checkout-form');
const orderDaySelect = document.getElementById('order-day');
const orderTimeSelect = document.getElementById('order-time');
const successModal = document.getElementById('success-modal');
const closeSuccessModal = document.getElementById('close-success-modal');
const overlay = document.getElementById('overlay');

// Load cart from localStorage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateOrderSummary();
        updateCartCount();
    } else {
        // Redirect to home if cart is empty
        window.location.href = 'index.html';
    }
}

// Update order summary
function updateOrderSummary() {
    orderItemsContainer.innerHTML = '';

    if (cartItems.length === 0) {
        orderItemsContainer.innerHTML = '<p class="empty-cart">Keranjang belanja Anda kosong.</p>';
        orderTotal.textContent = 'Rp 0';
        return;
    }

    cartItems.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <div class="order-item-details">
                <div class="order-item-image">
                    <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/60x60?text=${encodeURIComponent(item.name)}'">
                </div>
                <div>
                    <h4 class="order-item-name">${item.name}</h4>
                    <p class="order-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                </div>
            </div>
            <div class="order-item-quantity">
                <button class="order-quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="order-quantity-value">${item.quantity}</span>
                <button class="order-quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <div class="order-item-subtotal">
                Rp ${(item.price * item.quantity).toLocaleString('id-ID')}
            </div>
        `;
        orderItemsContainer.appendChild(orderItem);
    });

    // Add event listeners to order item buttons
    addOrderItemEventListeners();

    // Update order total
    const total = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    orderTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Add event listeners to order item buttons
function addOrderItemEventListeners() {
    // Decrease quantity buttons
    const decreaseButtons = orderItemsContainer.querySelectorAll('.decrease');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            decreaseQuantity(itemId);
        });
    });

    // Increase quantity buttons
    const increaseButtons = orderItemsContainer.querySelectorAll('.increase');
    increaseButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = parseInt(button.getAttribute('data-id'));
            increaseQuantity(itemId);
        });
    });
}

// Update cart count
function updateCartCount() {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Decrease item quantity
function decreaseQuantity(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    if (item.quantity > 1) {
        item.quantity--;
    } else {
        removeFromCart(itemId);
    }

    updateOrderSummary();
    updateCartCount();
    saveCartToLocalStorage();
}

// Increase item quantity
function increaseQuantity(itemId) {
    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    item.quantity++;
    updateOrderSummary();
    updateCartCount();
    saveCartToLocalStorage();
}

// Remove item from cart
function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    
    if (cartItems.length === 0) {
        // Redirect to home if cart becomes empty
        window.location.href = 'index.html';
    } else {
        updateOrderSummary();
        updateCartCount();
        saveCartToLocalStorage();
    }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Clear cart
function clearCart() {
    cartItems = [];
    localStorage.removeItem('cartItems');
}

// Show success modal
function showSuccessModal() {
    successModal.classList.add('active');
    overlay.classList.add('active');
}

// Hide success modal
function hideSuccessModal() {
    successModal.classList.remove('active');
    overlay.classList.remove('active');
}

// Handle form submission
function handleFormSubmit(event) {

    event.preventDefault();

    // Get form data
        customerName= document.getElementById('customer-name').value
        customerPhone = document.getElementById('customer-phone').value
        customerAddress = document.getElementById('customer-address').value
        customerEmail = document.getElementById('customer-email').value
        customerNotes = document.getElementById('customer-notes').value
        const items = cartItems
        console.log(items)
    const formData = {
        orderDay: orderDaySelect.value,
        orderTime: orderTimeSelect.value,
        customerName: document.getElementById('customer-name').value,
        customerPhone: document.getElementById('customer-phone').value,
        customerAddress: document.getElementById('customer-address').value,
        customerEmail: document.getElementById('customer-email').value,
        customerNotes: document.getElementById('customer-notes').value,
        paymentMethod: document.querySelector('input[name="payment-method"]:checked').value,
        items: cartItems,
        total: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
    };
     let message = `Hello, I would like to place an order:\n\n`;
                message += `Name: ${customerName}\n`;
                message += `Address: ${customerAddress}\n`;
                message += `Phone: ${customerPhone}\n\n`;
                message += `Order Details:\n`;
        //  cart.forEach(item => {
        //             message += `- ${item.product.name} x${item.quantity}: ${formatPrice(item.product.price * item.quantity)}\n`;
        //         });
     clearCart();
     console.log('Order submitted:', formData);
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `https://wa.me/6287886425562?text=${encodedMessage}`;
    // In a real application, you would send this data to a server
    

    // Clear cart


    // Show success modal
    // showSuccessModal();
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Load cart from localStorage
    loadCartFromLocalStorage();

    // Form submission
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleFormSubmit);
    }

    // Close success modal button click
    if (closeSuccessModal) {
        closeSuccessModal.addEventListener('click', hideSuccessModal);
    }

    // Overlay click
    if (overlay) {
        overlay.addEventListener('click', hideSuccessModal);
    }
});

