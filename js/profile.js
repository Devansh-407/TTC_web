// Profile page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart system if not already initialized
    if (!window.cartSystem) {
        window.cartSystem = new CartSystem();
    }
    
    // Update profile UI
    updateProfilePageUI();
});

function updateProfilePageUI() {
    const orderCount = document.getElementById('order-count');
    const favouriteCount = document.getElementById('favourite-count');
    const cartItemCount = document.getElementById('cart-item-count');
    const ordersList = document.getElementById('orders-list');
    
    if (window.cartSystem) {
        if (orderCount) orderCount.textContent = '0'; // Placeholder for orders
        if (favouriteCount) favouriteCount.textContent = window.cartSystem.favourites.length;
        if (cartItemCount) cartItemCount.textContent = window.cartSystem.cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (ordersList) {
            ordersList.innerHTML = `
                <div class="order-item">
                    <div class="order-info">
                        <h3>No orders yet</h3>
                        <p>Start shopping to see your orders here</p>
                    </div>
                    <div class="order-actions">
                        <button class="btn btn-primary" onclick="window.location.href='gifts.html'">Browse Gifts</button>
                    </div>
                </div>
            `;
        }
    }
}

function editProfile() {
    window.cartSystem.showNotification('Profile editing coming soon!', 'info');
}

function showOrders() {
    window.cartSystem.showNotification('Orders page coming soon!', 'info');
}

function showFavourites() {
    window.location.href = 'favourites.html';
}
