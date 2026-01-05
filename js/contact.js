// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart system if not already initialized
    if (!window.cartSystem) {
        window.cartSystem = new CartSystem();
    }
    
    // Initialize contact form
    initializeContactForm();
    
    // Initialize FAQ accordion
    initializeFAQ();
    
    // Initialize map directions
    initializeMap();
    
    // Initialize social media links
    initializeSocialLinks();
});

function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('contact-name').value,
                email: document.getElementById('contact-email').value,
                phone: document.getElementById('contact-phone').value,
                message: document.getElementById('contact-message').value
            };
            
            // Validate form
            if (!validateContactForm(formData)) {
                return;
            }
            
            // Show success message
            if (window.cartSystem) {
                window.cartSystem.showNotification('Thank you for contacting us! We will get back to you soon.', 'success');
            }
            
            // Reset form
            contactForm.reset();
            
            // In a real application, this would send the form data to a server
            console.log('Contact form submitted:', formData);
        });
    }
}

function validateContactForm(formData) {
    let isValid = true;
    
    // Validate name
    if (!formData.name || formData.name.trim().length < 2) {
        if (window.cartSystem) {
            window.cartSystem.showNotification('Please enter your name', 'error');
        }
        isValid = false;
    }
    
    // Validate email
    if (!formData.email || !isValidEmail(formData.email)) {
        if (window.cartSystem) {
            window.cartSystem.showNotification('Please enter a valid email address', 'error');
        }
        isValid = false;
    }
    
    // Validate phone (Indian format)
    if (!formData.phone || !/^(\+91|0)?[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
        if (window.cartSystem) {
            window.cartSystem.showNotification('Please enter a valid Indian phone number', 'error');
        }
        isValid = false;
    }
    
    // Validate message
    if (!formData.message || formData.message.trim().length < 10) {
        if (window.cartSystem) {
            window.cartSystem.showNotification('Please enter a message (minimum 10 characters)', 'error');
        }
        isValid = false;
    }
    
    return isValid;
}

function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    }
                });
                
                // Toggle current FAQ item
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0';
                }
            });
        }
    });
}

function initializeMap() {
    const mapContainer = document.querySelector('.map-container');
    const mapDirections = document.querySelector('.map-directions');
    
    if (mapDirections) {
        mapDirections.addEventListener('click', function() {
            // Open Google Maps with the address
            const address = '123, Craft Street, Mumbai, Maharashtra 400001, India';
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(googleMapsUrl, '_blank');
        });
    }
    
    if (mapContainer) {
        mapContainer.addEventListener('click', function() {
            const address = '123, Craft Street, Mumbai, Maharashtra 400001, India';
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(googleMapsUrl, '_blank');
        });
    }
}

function initializeSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                window.open(href, '_blank');
            }
        });
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone number formatting for Indian numbers
function formatIndianPhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
        return `+91 ${cleaned.slice(0,5)} ${cleaned.slice(5)}`;
    }
    return phone;
}

// Copy to clipboard functionality
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        if (window.cartSystem) {
            window.cartSystem.showNotification('Copied to clipboard!', 'success');
        }
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        if (window.cartSystem) {
            window.cartSystem.showNotification('Failed to copy to clipboard', 'error');
        }
    });
}

// Export functions for global access
window.initializeContactForm = initializeContactForm;
window.validateContactForm = validateContactForm;
window.initializeFAQ = initializeFAQ;
window.initializeMap = initializeMap;
window.initializeSocialLinks = initializeSocialLinks;
window.formatIndianPhone = formatIndianPhone;
window.copyToClipboard = copyToClipboard;
