// Base de datos completa de productos
const products = [
    {
        id: 1,
        name: "KAWAZAKI NINJA ZX-10R",
        category: "sport",
        specs: "1000cc • 200HP • 320km/h",
        price: 30000,
        image: "imagenes/Ninja.jpg",
        badge: "NUEVO",
        description: "La motocicleta deportiva definitiva para los amantes de la velocidad extrema",
        features: {
            engine: "1000cc",
            power: "200HP",
            topSpeed: "320km/h",
            weight: "195kg",
            fuel: "17L",
            transmission: "6 velocidades"
        }
    },
    {
        id: 2,
        name: "YAMAHA R500 ADVENTURE",
        category: "adventure",
        specs: "850cc • 95HP • Todo Terreno",
        price: 32000,
        image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800",
        badge: "DESTACADO",
        description: "Conquista cualquier terreno con la máxima versatilidad",
        features: {
            engine: "850cc",
            power: "95HP",
            topSpeed: "200km/h",
            weight: "220kg",
            fuel: "20L",
            transmission: "6 velocidades"
        }
    },
    {
        id: 3,
        name: "BOXER BM150",
        category: "mototaxi",
        specs: "150cc • 75HP • Ideal para trabajar",
        price: 3000,
        image: "imagenes/Mototaxi.jpg",
        description: "Estilo clásico y funcionalidad para el día a día",
        features: {
            engine: "150cc",
            power: "75HP",
            topSpeed: "180km/h",
            weight: "240kg",
            fuel: "18L",
            transmission: "4 velocidades"
        }
    },
    {
        id: 4,
        name: "SEGWAY B110S",
        category: "electric",
        specs: "Eléctrica • 150HP • 150km autonomía",
        price: 1600,
        image: "imagenes/Segway.png",
        badge: "ECO",
        description: "El futuro de las motocicletas con potencia eléctrica",
        features: {
            engine: "Motor Eléctrico",
            power: "150HP",
            topSpeed: "100km/h",
            weight: "210kg",
            fuel: "250km autonomía",
            transmission: "Automática"
        }
    },
    {
        id: 5,
        name: "JCH RACING 250",
        category: "sport",
        specs: "650cc • 85HP • Ciudad",
        price: 10000,
        image: "imagenes/jchracing.jpeg",
        description: "Perfecta para el uso urbano con estilo deportivo",
        features: {
            engine: "650cc",
            power: "85HP",
            topSpeed: "220km/h",
            weight: "185kg",
            fuel: "15L",
            transmission: "6 velocidades"
        }
    },
    {
        id: 6,
        name: "HERO XPULSE 200",
        category: "adventure",
        specs: "200cc • 90HP • Off-Road",
        price: 3000,
        image: "imagenes/hero.png",
        description: "Diseñada para aventuras extremas fuera de carretera",
        features: {
            engine: "200cc",
            power: "90HP",
            topSpeed: "190km/h",
            weight: "215kg",
            fuel: "19L",
            transmission: "5 velocidades"
        }
    },
    {
        id: 7,
        name: "HONDA GL150 CARGO",
        category: "mototaxi",
        specs: "125cc • 80HP • Ciudad y Trabajo",
        price: 3500,
        image: "imagenes/hondataxi.jpg",
        description: "Clásica con toda la potencia que necesitas",
        features: {
            engine: "125cc",
            power: "50HP",
            topSpeed: "120km/h",
            weight: "230kg",
            fuel: "22L",
            transmission: "4 velocidades"
        }
    },
    {
        id: 8,
        name: "ZITMUV Z-ODIN PRO 125E",
        category: "electric",
        specs: "Eléctrica • 180HP • 300km autonomía",
        price: 6200,
        image: "imagenes/zitmuv.jpg",
        badge: "NUEVO",
        description: "Deportiva eléctrica de alto rendimiento",
        features: {
            engine: "Motor Eléctrico",
            power: "180HP",
            topSpeed: "200km/h",
            weight: "200kg",
            fuel: "300km autonomía",
            transmission: "Automática"
        }
    },
    {
        id: 6,
        name: "VOGE 300 DS",
        category: "adventure",
        specs: "292cc • 25.5HP • Recta",
        price: 16000,
        image: "imagenes/voge.png",
        description: "Diseñada para conquistar rutas de larga distancia",
        features: {
            engine: "292cc",
            power: "25.5HP",
            topSpeed: "190km/h",
            weight: "215kg",
            fuel: "19L",
            transmission: "5 velocidades"
        }
    },
    {
        id: 7,
        name: "DAIMO CGL150",
        category: "mototaxi",
        specs: "125cc • 80HP • Ciudad y Trabajo",
        price: 2500,
        image: "imagenes/daimo.jpg",
        description: "Clásica con toda la potencia para trabajar",
        features: {
            engine: "125cc",
            power: "50HP",
            topSpeed: "120km/h",
            weight: "230kg",
            fuel: "22L",
            transmission: "4 velocidades"
        }
    },
    {
        id: 8,
        name: "S-LIKE T9",
        category: "electric",
        specs: "Eléctrica • 50HP • 150km autonomía",
        price: 3000,
        image: "imagenes/like.jpg",
        badge: "NUEVO",
        description: "Eléctrica de alto rendimiento",
        features: {
            engine: "Motor Eléctrico",
            power: "50HP",
            topSpeed: "100km/h",
            weight: "20kg",
            fuel: "150km autonomía",
            transmission: "Automática"
        }
    }
];

// Variables globales
let cart = [];
let filteredProducts = [...products];

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    checkURLParams();
});

function initializePage() {
    setupMobileMenu();
    setupCart();
    setupFilters();
    loadProducts();
    updateProductsCount();
}

// Verificar parámetros URL
function checkURLParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('cat');
    
    if (category) {
        document.getElementById('categoryFilter').value = category;
        applyFilters();
    }
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

// Cart Setup
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
    if (btnCheckout) btnCheckout.addEventListener('click', checkoutWhatsApp);
    
    updateCartUI();
}

// Filters Setup
function setupFilters() {
    document.getElementById('searchInput').addEventListener('input', applyFilters);
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('sortFilter').addEventListener('change', applyFilters);
}

// Apply Filters
function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const sortBy = document.getElementById('sortFilter').value;
    
    // Filtrar
    filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
                            product.specs.toLowerCase().includes(searchTerm) ||
                            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // Ordenar
    switch(sortBy) {
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        default:
            filteredProducts.sort((a, b) => a.id - b.id);
    }
    
    loadProducts();
    updateProductsCount();
}

// Clear Filters
function clearFilters() {
    document.getElementById('searchInput').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('sortFilter').value = 'default';
    applyFilters();
    showNotification('Filtros limpiados', 'info');
}

// Load Products
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (filteredProducts.length === 0) {
        grid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }
    
    grid.style.display = 'grid';
    noResults.style.display = 'none';
    
    grid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="openProductModal(${product.id})">
            <div class="product-image">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <button class="product-wishlist" onclick="event.stopPropagation(); toggleWishlist(${product.id})">
                    <i class="far fa-heart"></i>
                </button>
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.toUpperCase()}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-specs">${product.specs}</p>
                <div class="product-footer">
                    <div class="product-price">${product.price.toLocaleString()}</div>
                    <div class="product-actions">
                        <button class="btn-view-details" onclick="event.stopPropagation(); openProductModal(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-add-cart" onclick="event.stopPropagation(); addToCart(${product.id})">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Update Products Count
function updateProductsCount() {
    const count = document.getElementById('productsCount');
    const total = filteredProducts.length;
    count.textContent = `${total} motocicleta${total !== 1 ? 's' : ''} disponible${total !== 1 ? 's' : ''}`;
}

// Open Product Modal
function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const modal = document.getElementById('productModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <button class="modal-close" onclick="closeProductModal()">
            <i class="fas fa-times"></i>
        </button>
        <div class="modal-grid">
            <div class="modal-image">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="modal-details">
                <div class="modal-category">${product.category.toUpperCase()}</div>
                <h2>${product.name}</h2>
                <p style="color: #808080; font-size: 1.1rem; margin-bottom: 1rem;">${product.description}</p>
                <div class="modal-price">${product.price.toLocaleString()}</div>
                
                <div class="modal-specs">
                    <h3>ESPECIFICACIONES</h3>
                    <div class="specs-list">
                        <div class="spec-item">
                            <i class="fas fa-cog"></i>
                            <div>
                                <div class="spec-label">Motor</div>
                                <div class="spec-value">${product.features.engine}</div>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-bolt"></i>
                            <div>
                                <div class="spec-label">Potencia</div>
                                <div class="spec-value">${product.features.power}</div>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-tachometer-alt"></i>
                            <div>
                                <div class="spec-label">Velocidad Máxima</div>
                                <div class="spec-value">${product.features.topSpeed}</div>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-weight"></i>
                            <div>
                                <div class="spec-label">Peso</div>
                                <div class="spec-value">${product.features.weight}</div>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-gas-pump"></i>
                            <div>
                                <div class="spec-label">Combustible</div>
                                <div class="spec-value">${product.features.fuel}</div>
                            </div>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-gears"></i>
                            <div>
                                <div class="spec-label">Transmisión</div>
                                <div class="spec-value">${product.features.transmission}</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-modal-cart" onclick="addToCart(${product.id}); closeProductModal();">
                        <i class="fas fa-cart-plus"></i> AGREGAR AL CARRITO
                    </button>
                    <button class="btn-modal-whatsapp" onclick="contactWhatsApp(${product.id})">
                        <i class="fab fa-whatsapp"></i> CONSULTAR
                    </button>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Cerrar con overlay
    document.getElementById('modalOverlay').onclick = closeProductModal;
}

// Close Product Modal
function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
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
    
    // Animación
    const cartIcon = document.getElementById('cartIcon');
    cartIcon.style.animation = 'none';
    setTimeout(() => {
        cartIcon.style.animation = 'pulse 0.5s ease';
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
                        <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.3rem;">${item.name}</h4>
                        <p style="color: #FF4500; font-weight: 700; font-size: 1.1rem;">${item.price.toLocaleString()}</p>
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
    
    cartTotal.textContent = `${total.toLocaleString()}`;
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
    showNotification('Producto eliminado', 'info');
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
        message += `   • Precio: ${item.price.toLocaleString()} c/u\n`;
        message += `   • Subtotal: ${itemTotal.toLocaleString()}\n\n`;
    });
    
    message += `💰 *TOTAL: ${total.toLocaleString()}*\n\n`;
    message += '¿Podrían ayudarme con más información sobre disponibilidad y formas de pago? ¡Gracias! 😊';
    
    const phoneNumber = '59165017227';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    showNotification('Redirigiendo a WhatsApp...', 'success');
}

// Contact WhatsApp
function contactWhatsApp(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    let message = `¡Hola! 🏍️ Me interesa el siguiente modelo:\n\n`;
    message += `*${product.name}*\n`;
    message += `Categoría: ${product.category.toUpperCase()}\n`;
    message += `Precio: ${product.price.toLocaleString()}\n\n`;
    message += `¿Podrían darme más información? ¡Gracias! 😊`;
    
    const phoneNumber = '59165017227';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
}

// Toggle Wishlist
function toggleWishlist(productId) {
    showNotification('Agregado a favoritos', 'success');
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

// Scroll Effects
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});