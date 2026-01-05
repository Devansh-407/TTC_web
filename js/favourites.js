// Favourites page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart system if not already initialized
    if (!window.cartSystem) {
        window.cartSystem = new CartSystem();
    }
    
    // Update favourites UI
    updateFavouritesPageUI();
});

function updateFavouritesPageUI() {
    const favouritesItems = document.getElementById('favourites-items');
    const favouritesEmpty = document.getElementById('favourites-empty');
    
    if (favouritesItems && window.cartSystem) {
        if (window.cartSystem.favourites.length === 0) {
            if (favouritesEmpty) {
                favouritesEmpty.style.display = 'block';
            }
            if (favouritesItems) {
                favouritesItems.innerHTML = '';
            }
        } else {
            if (favouritesEmpty) {
                favouritesEmpty.style.display = 'none';
            }
            if (favouritesItems) {
                favouritesItems.innerHTML = window.cartSystem.favourites.map(item => `
                    <div class="favourite-item">
                        <div class="favourite-item-image">
                            <img src="${item.image || 'images/default-product.jpg'}" alt="${item.title}">
                        </div>
                        <div class="favourite-item-details">
                            <h4 class="favourite-item-title">${item.title}</h4>
                            <p class="favourite-item-price">${item.price}</p>
                            <p class="favourite-item-description">${item.description || 'Beautiful handcrafted gift'}</p>
                            <div class="favourite-item-actions">
                                <button class="btn btn-primary" onclick="addToCartFromFavourites(${JSON.stringify(item).replace(/"/g, '&quot;')})">Add to Cart</button>
                                <button class="btn btn-outline" onclick="window.location.href='gifts.html'">View Details</button>
                            </div>
                        </div>
                        <button class="remove-favourite" onclick="removeFromFavourites(${JSON.stringify(item).replace(/"/g, '&quot;')})">×</button>
                    </div>
                `).join('');
            }
        }
    }
}

function addToCartFromFavourites(product) {
    if (window.cartSystem) {
        window.cartSystem.addToCart(product);
    }
}

function removeFromFavourites(product) {
    if (window.cartSystem) {
        window.cartSystem.toggleFavourite(product);
        updateFavouritesPageUI();
    }
}
