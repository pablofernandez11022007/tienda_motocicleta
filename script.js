// Base de datos de productos
const products = [
    {
        id: 1,
        name: "KAWASAKI NINJA ZX-10R",
        category: "sport",
        specs: "1000cc • 200HP • 320km/h",
        price: 30000,
        image: "imagenes/Ninja.jpg",
        featured: true,
        badge: "NUEVO"
    },
    {
        id: 2,
        name: "YAMAHA R500 ADVENTURE",
        category: "adventure",
        specs: "850cc • 95HP • Todo Terreno",
        price: 32000,
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
        featured: true,
        badge: "DESTACADO"
    },
    {
        id: 3,
        name: "BOXER BM150",
        category: "mototaxi",
        specs: "150cc • 75HP • Ideal para trabajar",
        price: 3000,
        image: "imagenes/Mototaxi.jpg",
        featured: true
    },
    {
        id: 4,
        name: "SEGWAY B110S",
        category: "electric",
        specs: "Eléctrica • 150HP • 150km autonomía",
        price: 1600,
        image: "imagenes/Segway.png",
        featured: true,
        badge: "ECO"
    },
    {
        id: 5,
        name: "SULFER STREET 650",
        category: "sport",
        specs: "650cc • 85HP • Ciudad",
        price: 18000,
        image: "https://images.unsplash.com/photo-1568772831734-e00d82e6cedf?w=800",
        featured: false
    },
    {
        id: 6,
        name: "SULFER TRAIL 800",
        category: "adventure",
        specs: "800cc • 90HP • Off-Road",
        price: 29000,
        image: "https://images.unsplash.com/photo-1599819177924-82e9d2f5f2b4?w=800",
        featured: false
    }
];

// Carrito (memoria durante la sesión)
let cart = [];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupSearch();
    setupCart();
    loadFeaturedProducts();
    setupScrollEffects();
    setupContactForm();
}

// Mobile Menu
function setupMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Search
function setupSearch() {
    const searchBtn = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchClose = document.getElementById('searchClose');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
}

// Cart
function setupCart() {
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.getElementById('cartClose');
    const cartOverlay = document.getElementById('cartOverlay');
    const btnCheckout = document.getElementById('btnCheckout');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            cartSidebar.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    const closeCart = () => {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    
    if (btnCheckout) {
        btnCheckout.addEventListener('click', checkoutWhatsApp);
    }
    
    updateCartUI();
}

// Load Featured Products
function loadFeaturedProducts() {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    const featuredProducts = products.filter(p => p.featured);
    
    featuredGrid.innerHTML = featuredProducts.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-specs">${product.specs}</p>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toLocaleString()}</div>
                    <button class="btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartUI();
    showNotification(`${product.name} agregado al carrito`, 'success');
    
    // Animación del icono
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'bounce 0.5s ease';
    }, 10);
}

// Update Cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartBody = document.getElementById('cartBody');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartBody.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
        cartTotal.textContent = '$0';
        return;
    }
    
    let total = 0;
    cartBody.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item" style="background: #f5f5f5; padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                <div style="display: flex; gap: 1rem;">
                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 8px;">
                    <div style="flex: 1;">
                        <h4 style="font-size: 1rem; font-weight: 700; margin-bottom: 0.3rem;">${item.name}</h4>
                        <p style="color: #FF4500; font-weight: 700;">$${item.price.toLocaleString()}</p>
                        <div style="display: flex; align-items: center; gap: 0.8rem; margin-top: 0.5rem;">
                            <button onclick="updateQuantity(${item.id}, -1)" style="width: 30px; height: 30px; border: 2px solid #000; background: #fff; border-radius: 5px; cursor: pointer; font-weight: 700;">-</button>
                            <span style="font-weight: 700;">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" style="width: 30px; height: 30px; border: 2px solid #000; background: #fff; border-radius: 5px; cursor: pointer; font-weight: 700;">+</button>
                            <button onclick="removeFromCart(${item.id})" style="margin-left: auto; background: #FF4500; color: #fff; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; font-weight: 600;">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotal.textContent = `$${total.toLocaleString()}`;
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    updateCartUI();
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    showNotification('Producto eliminado del carrito', 'info');
}

// Checkout WhatsApp
function checkoutWhatsApp() {
    if (cart.length === 0) {
        showNotification('Tu carrito está vacío', 'warning');
        return;
    }
    
    let message = '¡Hola! 🏍️ Me interesa realizar el siguiente pedido:\n\n';
    let total = 0;
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        message += `${index + 1}. *${item.name}*\n`;
        message += `   • Categoría: ${item.category.toUpperCase()}\n`;
        message += `   • Cantidad: ${item.quantity}\n`;
        message += `   • Precio: $${item.price.toLocaleString()} c/u\n`;
        message += `   • Subtotal: $${itemTotal.toLocaleString()}\n\n`;
    });
    
    message += `💰 *TOTAL: $${total.toLocaleString()}*\n\n`;
    message += '¿Podrían ayudarme con más información? Gracias! 😊';
    
    const phoneNumber = '59165017227';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    showNotification('Redirigiendo a WhatsApp...', 'success');
}

// Scroll Effects
function setupScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
            this.reset();
        });
    }
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    
    const colors = {
        success: '#4CAF50',
        error: '#F44336',
        warning: '#FF9800',
        info: '#2196F3'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${colors[type]};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        font-weight: 600;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);