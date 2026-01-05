// Main JavaScript File - Common functionality across all pages

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation functionality
    initializeNavigation();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize smooth scrolling
    initializeSmoothScroll();
    
    // Initialize header scroll effect
    initializeHeaderScroll();
    
    // Initialize newsletter forms
    initializeNewsletterForms();
    
    // Initialize cart functionality
    initializeCart();
    
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize responsive navigation
    initializeResponsiveNav();
});

// Navigation functionality
function initializeNavigation() {
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
    
    // Handle "Get Started" button
    const getStartedBtn = document.querySelector('.header .btn-primary');
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', function() {
            window.location.href = 'gifts.html';
        });
    }
    
    // Set active nav link based on current page
    setActiveNavLink();
}

function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.createElement('button');
    mobileMenuToggle.className = 'mobile-menu-toggle';
    mobileMenuToggle.innerHTML = '☰';
    mobileMenuToggle.style.display = 'none';
    mobileMenuToggle.style.cssText = `
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #333;
        padding: 0.5rem;
    `;
    
    const header = document.querySelector('.header-content');
    if (header) {
        header.insertBefore(mobileMenuToggle, header.firstChild);
    }
    
    const nav = document.querySelector('.nav');
    if (nav && mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('mobile-open');
            this.innerHTML = nav.classList.contains('mobile-open') ? '✕' : '☰';
        });
    }
}

// Smooth scroll functionality
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header scroll effect
function initializeHeaderScroll() {
    let lastScrollTop = 0;
    const headerElement = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (headerElement) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                headerElement.style.transform = 'translateY(-100%)';
            } else {
                headerElement.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    });
}

    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (email && isValidEmail(email)) {
                showNotification('Thank you for subscribing! Check your email for confirmation.');
                this.reset();
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    });

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : '#ff4444'};
            color: white;
            padding: 1rem 1.5rem;
    const addToCartButtons = document.querySelectorAll('.btn-primary');
    addToCartButtons.forEach(button => {
        if (button.textContent.includes('Customize') || button.textContent.includes('Add to Cart')) {
            button.addEventListener('click', function(e) {
                if (!this.classList.contains('no-cart')) {
                    e.preventDefault();
                    addToCart(this);
                }
            });
        }
    });
}

// Tooltips functionality
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const title = this.getAttribute('title');
            this.setAttribute('data-tooltip', title);
            this.removeAttribute('title');
            
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = title;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 4px;
                font-size: 0.875rem;
                z-index: 1000;
                pointer-events: none;
                white-space: nowrap;
            `;
            
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            
            this.tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltip) {
                this.tooltip.remove();
                this.tooltip = null;
            }
            const title = this.getAttribute('data-tooltip');
            if (title) {
                this.setAttribute('title', title);
                this.removeAttribute('data-tooltip');
            }
        });
    });
}

// Responsive navigation
function initializeResponsiveNav() {
    function handleResponsiveNav() {
        const navList = document.querySelector('.nav-list');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        
        if (navList && window.innerWidth <= 768) {
            navList.style.display = navList.classList.contains('mobile-open') ? 'flex' : 'none';
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'block';
            }
        } else {
            navList.style.display = 'flex';
            if (mobileMenuToggle) {
                mobileMenuToggle.style.display = 'none';
            }
        }
    }

    window.addEventListener('resize', handleResponsiveNav);
    handleResponsiveNav();
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function addToCart(button) {
    const productCard = button.closest('.gift-card, .gallery-item, .example-card');
    if (productCard) {
        const title = productCard.querySelector('h3, .gallery-item-title, .example-title').textContent;
        const priceElement = productCard.querySelector('.gift-price, .gallery-item-price, .example-price');
        const price = priceElement ? priceElement.textContent : 'Price not available';
        
        // Update cart count
        updateCartCount();
        
        // Show notification
        showNotification(`${title} added to cart!`);
        
        // Add button animation
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
        cartCount.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 200);
    }
}

function showNotification(message, type = 'success') {
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

// Lazy loading for images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            img.style.opacity = '1';
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.5s ease';
    imageObserver.observe(img);
});

// Search functionality
const searchInputs = document.querySelectorAll('input[type="search"], .search-input');
searchInputs.forEach(input => {
    input.addEventListener('input', function(e) {
        const query = e.target.value.toLowerCase();
        // Implement search logic here
        if (query.length > 2) {
            performSearch(query);
        }
    });
});

function performSearch(query) {
    // This would typically make an API call
    console.log('Searching for:', query);
}

// Currency formatter for Indian Rupees
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
}

// Phone number formatter for Indian numbers
function formatIndianPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0,5)} ${cleaned.slice(5)}`;
    }
    return phone;
}

// Date formatter
function formatDate(date) {
    return new Intl.DateTimeFormat('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

// Global functions for checkout compatibility
function initializeCheckout() {
    // UPI/COD compatibility logic
    const paymentMethods = {
        upi: {
            name: 'UPI',
            available: true,
            icon: '📱'
        },
        cod: {
            name: 'Cash on Delivery',
            available: true,
            icon: '💵'
        },
        card: {
            name: 'Credit/Debit Card',
            available: true,
            icon: '💳'
        },
        netbanking: {
            name: 'Net Banking',
            available: true,
            icon: '🏦'
        }
    };
    
    return paymentMethods;
}

function calculateShipping(address) {
    // Pan India shipping logic
    const baseShipping = 99;
    const freeShippingThreshold = 999;
    
    // Calculate based on cart total (would be implemented in real cart)
    return {
        base: baseShipping,
        free: false,
        estimatedDays: '5-7 business days'
    };
}

function validateIndianPincode(pincode) {
    // Indian pincode validation (6 digits)
    const pincodeRegex = /^[1-9][0-9]{5}$/;
    return pincodeRegex.test(pincode);
}

// Export functions for use in other scripts
window.HeartfeltGifts = {
    formatINR,
    formatIndianPhone,
    formatDate,
    initializeCheckout,
    calculateShipping,
    validateIndianPincode
};

// Initialize page
console.log('Heartfelt Gifts website initialized');
});
