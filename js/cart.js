// Cart functionality
class CartSystem {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        this.user = JSON.parse(localStorage.getItem('user')) || null;
        this.initializeCart();
    }

    initializeCart() {
        this.updateCartUI();
        this.updateFavouritesUI();
        this.updateProfileUI();
    }

    // Cart Methods
    addToCart(product) {
        const existingItem = this.cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += product.quantity || 1;
        } else {
            this.cart.push({
                ...product,
                quantity: product.quantity || 1,
                addedAt: new Date().toISOString()
            });
        }
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Product added to cart!', 'success');
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartUI();
        this.showNotification('Product removed from cart', 'info');
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, parseInt(quantity));
            this.saveCart();
            this.updateCartUI();
        }
    }

    getCartTotal() {
        return this.cart.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[₹,]/g, ''));
            return total + (price * item.quantity);
        }, 0);
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.getElementById('cart-items');
        const cartTotal = document.getElementById('cart-total');
        const cartEmpty = document.getElementById('cart-empty');

        if (cartCount) {
            const count = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = count;
            cartCount.classList.toggle('zero', count === 0);
        }

        if (cartItems) {
            if (this.cart.length === 0) {
                cartItems.innerHTML = '<p class="empty-cart-message">Your cart is empty</p>';
            } else {
                cartItems.innerHTML = this.cart.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.image || 'images/default-product.jpg'}" alt="${item.title}">
                        </div>
                        <div class="cart-item-details">
                            <h4 class="cart-item-title">${item.title}</h4>
                            <p class="cart-item-price">${item.price}</p>
                            <div class="cart-item-quantity">
                                <button class="quantity-btn" onclick="cartSystem.updateQuantity('${item.id}', ${item.quantity - 1})">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="cartSystem.updateQuantity('${item.id}', this.value)">
                                <button class="quantity-btn" onclick="cartSystem.updateQuantity('${item.id}', ${item.quantity + 1})">+</button>
                            </div>
                        </div>
                        <button class="remove-item" onclick="cartSystem.removeFromCart('${item.id}')">×</button>
                    </div>
                `).join('');
            }
        }

        if (cartTotal) {
            cartTotal.textContent = this.formatINR(this.getCartTotal());
        }

        if (cartEmpty) {
            cartEmpty.style.display = this.cart.length === 0 ? 'block' : 'none';
        }
    }

    // Favourites Methods
    toggleFavourite(product) {
        const index = this.favourites.findIndex(item => item.id === product.id);
        if (index > -1) {
            this.favourites.splice(index, 1);
            this.showNotification('Removed from favourites', 'info');
        } else {
            this.favourites.push({
                ...product,
                addedAt: new Date().toISOString()
            });
            this.showNotification('Added to favourites!', 'success');
        }
        this.saveFavourites();
        this.updateFavouritesUI();
    }

    saveFavourites() {
        localStorage.setItem('favourites', JSON.stringify(this.favourites));
    }

    updateFavouritesUI() {
        const favouritesCount = document.querySelector('.favourites-count');
        const favouritesItems = document.getElementById('favourites-items');
        const favouritesEmpty = document.getElementById('favourites-empty');

        if (favouritesCount) {
            const count = this.favourites.length;
            favouritesCount.textContent = count;
            favouritesCount.classList.toggle('zero', count === 0);
        }

        if (favouritesItems) {
            if (this.favourites.length === 0) {
                favouritesItems.innerHTML = '<p class="empty-favourites-message">No favourites yet</p>';
            } else {
                favouritesItems.innerHTML = this.favourites.map(item => `
                    <div class="favourite-item">
                        <div class="favourite-item-image">
                            <img src="${item.image || 'images/default-product.jpg'}" alt="${item.title}">
                        </div>
                        <div class="favourite-item-details">
                            <h4 class="favourite-item-title">${item.title}</h4>
                            <p class="favourite-item-price">${item.price}</p>
                        </div>
                        <button class="remove-favourite" onclick="cartSystem.toggleFavourite(${JSON.stringify(item).replace(/"/g, '&quot;')})">×</button>
                    </div>
                `).join('');
            }
        }

        if (favouritesEmpty) {
            favouritesEmpty.style.display = this.favourites.length === 0 ? 'block' : 'none';
        }
    }

    // Authentication Methods
    login(email, password) {
        // Simulate login (in real app, this would be an API call)
        this.user = {
            id: 'user_' + Date.now(),
            email: email,
            name: email.split('@')[0],
            phone: '+91 98765 43210',
            address: '123, Craft Street, Mumbai, Maharashtra 400001, India',
            avatar: 'images/default-avatar.png',
            loginAt: new Date().toISOString()
        };
        this.saveUser();
        this.updateProfileUI();
        this.showNotification('Login successful!', 'success');
        return true;
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        this.updateProfileUI();
        this.showNotification('Logged out successfully', 'info');
        window.location.href = 'index.html';
    }

    saveUser() {
        if (this.user) {
            localStorage.setItem('user', JSON.stringify(this.user));
        }
    }

    updateProfileUI() {
        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');
        const profileAvatar = document.getElementById('profile-avatar');
        const profileNameLarge = document.getElementById('profile-name-large');
        const profileEmailLarge = document.getElementById('profile-email-large');
        const profilePhone = document.getElementById('profile-phone');
        const profileAddress = document.getElementById('profile-address');
        const profileAvatarLarge = document.getElementById('profile-avatar-large');

        if (this.user) {
            if (profileName) profileName.textContent = this.user.name;
            if (profileEmail) profileEmail.textContent = this.user.email;
            if (profileNameLarge) profileNameLarge.textContent = this.user.name;
            if (profileEmailLarge) profileEmailLarge.textContent = this.user.email;
            if (profilePhone) profilePhone.textContent = this.user.phone;
            if (profileAddress) profileAddress.textContent = this.user.address;
            if (profileAvatar) profileAvatar.src = this.user.avatar;
            if (profileAvatarLarge) profileAvatarLarge.src = this.user.avatar;
        } else {
            if (profileName) profileName.textContent = 'Guest User';
            if (profileEmail) profileEmail.textContent = 'guest@example.com';
            if (profileNameLarge) profileNameLarge.textContent = 'Guest User';
            if (profileEmailLarge) profileEmailLarge.textContent = 'guest@example.com';
            if (profilePhone) profilePhone.textContent = '+91 98765 43210';
            if (profileAddress) profileAddress.textContent = '123, Craft Street, Mumbai, Maharashtra 400001, India';
            if (profileAvatar) profileAvatar.src = 'images/default-avatar.png';
            if (profileAvatarLarge) profileAvatarLarge.src = 'images/default-avatar.png';
        }
    }

    // Utility Methods
    formatINR(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#ff4444' : '#2196f3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Global cart system instance
let cartSystem;

// UI Functions
function toggleCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar) {
        cartSidebar.classList.toggle('open');
        if (overlay) {
            overlay.classList.toggle('show');
        }
    } else {
        window.location.href = 'cart.html';
    }
}

function toggleFavourites() {
    const favouritesSidebar = document.getElementById('favourites-sidebar');
    const overlay = document.getElementById('overlay');
    
    if (favouritesSidebar) {
        favouritesSidebar.classList.toggle('open');
        if (overlay) {
            overlay.classList.toggle('show');
        }
    } else {
        window.location.href = 'favourites.html';
    }
}

function toggleProfile() {
    const profileDropdown = document.getElementById('profile-dropdown');
    
    if (profileDropdown) {
        profileDropdown.classList.toggle('show');
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function closeDropdown(e) {
            if (!e.target.closest('.profile-icon') && !e.target.closest('.profile-dropdown')) {
                profileDropdown.classList.remove('show');
                document.removeEventListener('click', closeDropdown);
            }
        });
    } else {
        if (cartSystem.user) {
            window.location.href = 'profile.html';
        } else {
            showAuthModal();
        }
    }
}

function showAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.classList.add('show');
    }
}

function closeAuth() {
    const authModal = document.getElementById('auth-modal');
    if (authModal) {
        authModal.classList.remove('show');
    }
}

function switchToSignUp() {
    const authTitle = document.getElementById('auth-title');
    const authForm = document.getElementById('auth-form');
    const authSwitch = document.querySelector('.auth-switch p');
    
    if (authTitle) authTitle.textContent = 'Sign Up';
    if (authSwitch) authSwitch.innerHTML = 'Already have an account? <a href="#" onclick="switchToSignIn()">Sign In</a>';
}

function switchToSignIn() {
    const authTitle = document.getElementById('auth-title');
    const authForm = document.getElementById('auth-form');
    const authSwitch = document.querySelector('.auth-switch p');
    
    if (authTitle) authTitle.textContent = 'Sign In';
    if (authSwitch) authSwitch.innerHTML = 'Don\'t have an account? <a href="#" onclick="switchToSignUp()">Sign Up</a>';
}

function logout() {
    if (cartSystem) {
        cartSystem.logout();
    }
}

function checkout() {
    if (cartSystem.cart.length === 0) {
        cartSystem.showNotification('Your cart is empty!', 'error');
        return;
    }
    
    if (!cartSystem.user) {
        cartSystem.showNotification('Please login to checkout', 'error');
        showAuthModal();
        return;
    }
    
    cartSystem.showNotification('Proceeding to checkout...', 'success');
    // In a real app, this would navigate to checkout page
}

function showProfile() {
    window.location.href = 'profile.html';
}

function showOrders() {
    cartSystem.showNotification('Orders page coming soon!', 'info');
}

function editProfile() {
    cartSystem.showNotification('Profile editing coming soon!', 'info');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    cartSystem = new CartSystem();
    
    // Add overlay if not present
    if (!document.getElementById('overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'overlay';
        overlay.className = 'overlay';
        overlay.onclick = function() {
            document.getElementById('cart-sidebar')?.classList.remove('open');
            document.getElementById('favourites-sidebar')?.classList.remove('open');
            document.getElementById('auth-modal')?.classList.remove('show');
            overlay.classList.remove('show');
        };
        document.body.appendChild(overlay);
    }
    
    // Handle auth form submission
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('auth-email').value;
            const password = document.getElementById('auth-password').value;
            
            if (cartSystem.login(email, password)) {
                closeAuth();
                authForm.reset();
            }
        });
    }
    
    // Update "Get Started" button
    const getStartedBtn = document.querySelector('.header .btn-primary');
    if (getStartedBtn) {
        getStartedBtn.remove();
    }
    
    // Add header actions if not present
    const headerContent = document.querySelector('.header-content');
    if (headerContent && !document.querySelector('.header-actions')) {
        const headerActions = document.createElement('div');
        headerActions.className = 'header-actions';
        headerActions.innerHTML = `
            <div class="cart-icon" onclick="toggleCart()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 2L6 9l11 11 11-11 11-11 11z"/>
                    <path d="M20.13 5.41L18 3.38l-1.41 1.41 1.41 1.41L20.13 5.41z"/>
                    <path d="M7 14H5a3 3 0 0 0-3-3V7a3 3 0 0 0 3-3h2"/>
                    <path d="M1 1h10l2 2H7a2 2 0 0 1-2 2v8a2 2 0 0 0 2 2h8l2-2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h2z"/>
                </svg>
                <span class="cart-count">0</span>
            </div>
            <div class="favourites-icon" onclick="toggleFavourites()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 10.46l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 12.46l7.78-7.78a5.5 5.5 0 0 0 7.78 0z"/>
                    <path d="M12 2l7.78 7.78"/>
                    <path d="m4.22 4.22 1.06 1.06L12 12.46l-7.78 7.78"/>
                </svg>
                <span class="favourites-count">0</span>
            </div>
            <div class="profile-icon" onclick="toggleProfile()">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="13" r="4"/>
                </svg>
            </div>
        `;
        headerContent.appendChild(headerActions);
    }
    
    // Add cart and favourites sidebars if not present
    if (!document.getElementById('cart-sidebar')) {
        const cartSidebar = document.createElement('div');
        cartSidebar.id = 'cart-sidebar';
        cartSidebar.className = 'cart-sidebar';
        cartSidebar.innerHTML = `
            <div class="cart-header">
                <h3>Your Cart</h3>
                <button class="close-cart" onclick="toggleCart()">×</button>
            </div>
            <div class="cart-items" id="cart-items">
                <p class="empty-cart-message">Your cart is empty</p>
            </div>
            <div class="cart-footer">
                <div class="cart-total">
                    <span>Total: ₹<span id="cart-total">0</span></span>
                </div>
                <button class="btn btn-primary btn-large" onclick="checkout()">Checkout</button>
            </div>
        `;
        document.body.appendChild(cartSidebar);
    }
    
    if (!document.getElementById('favourites-sidebar')) {
        const favouritesSidebar = document.createElement('div');
        favouritesSidebar.id = 'favourites-sidebar';
        favouritesSidebar.className = 'favourites-sidebar';
        favouritesSidebar.innerHTML = `
            <div class="favourites-header">
                <h3>Your Favourites</h3>
                <button class="close-favourites" onclick="toggleFavourites()">×</button>
            </div>
            <div class="favourites-items" id="favourites-items">
                <p class="empty-favourites-message">No favourites yet</p>
            </div>
            <div class="favourites-footer">
                <button class="btn btn-outline btn-large" onclick="window.location.href='favourites.html'">View All Favourites</button>
            </div>
        `;
        document.body.appendChild(favouritesSidebar);
    }
    
    if (!document.getElementById('profile-dropdown')) {
        const profileDropdown = document.createElement('div');
        profileDropdown.id = 'profile-dropdown';
        profileDropdown.className = 'profile-dropdown';
        profileDropdown.innerHTML = `
            <div class="profile-header">
                <div class="profile-avatar">
                    <img src="images/default-avatar.png" alt="Profile" id="profile-avatar">
                </div>
                <div class="profile-info">
                    <h4 id="profile-name">Guest User</h4>
                    <p id="profile-email">guest@example.com</p>
                </div>
            </div>
            <div class="profile-menu">
                <a href="#" class="profile-menu-item" onclick="showProfile()">Profile</a>
                <a href="#" class="profile-menu-item" onclick="showOrders()">Orders</a>
                <a href="#" class="profile-menu-item" onclick="showFavourites()">Favourites</a>
                <a href="#" class="profile-menu-item logout" onclick="logout()">Logout</a>
            </div>
        `;
        document.querySelector('.header-actions').appendChild(profileDropdown);
    }
    
    if (!document.getElementById('auth-modal')) {
        const authModal = document.createElement('div');
        authModal.id = 'auth-modal';
        authModal.className = 'auth-modal';
        authModal.innerHTML = `
            <div class="auth-content">
                <div class="auth-header">
                    <h2 id="auth-title">Sign In</h2>
                    <button class="close-auth" onclick="closeAuth()">×</button>
                </div>
                <div class="auth-body">
                    <form id="auth-form">
                        <div class="form-group">
                            <label for="auth-email" class="form-label">Email</label>
                            <input type="email" id="auth-email" class="form-input" placeholder="Enter your email" required>
                        </div>
                        <div class="form-group">
                            <label for="auth-password" class="form-label">Password</label>
                            <input type="password" id="auth-password" class="form-input" placeholder="Enter your password" required>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary btn-large">Sign In</button>
                        </div>
                    </form>
                    <div class="auth-switch">
                        <p>Don't have an account? <a href="#" onclick="switchToSignUp()">Sign Up</a></p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(authModal);
    }
});

// Export for global access
window.cartSystem = cartSystem;
window.toggleCart = toggleCart;
window.toggleFavourites = toggleFavourites;
window.toggleProfile = toggleProfile;
window.showAuthModal = showAuthModal;
window.closeAuth = closeAuth;
window.switchToSignUp = switchToSignUp;
window.switchToSignIn = switchToSignIn;
window.logout = logout;
window.checkout = checkout;
window.showProfile = showProfile;
window.showOrders = showOrders;
window.editProfile = editProfile;
