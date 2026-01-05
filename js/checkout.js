// Checkout System - UPI/COD Compatibility for Indian Market
// This file handles the checkout logic specifically for Indian payment methods

class IndianCheckout {
    constructor() {
        this.paymentMethods = {
            upi: {
                name: 'UPI',
                available: true,
                icon: '📱',
                apps: ['PhonePe', 'Google Pay', 'Paytm', 'Amazon Pay']
            },
            cod: {
                name: 'Cash on Delivery',
                available: true,
                icon: '💵',
                description: 'Pay when you receive your order'
            },
            card: {
                name: 'Credit/Debit Card',
                available: true,
                icon: '💳',
                types: ['Visa', 'Mastercard', 'RuPay', 'American Express']
            },
            netbanking: {
                name: 'Net Banking',
                available: true,
                icon: '🏦',
                banks: this.getIndianBanks()
            },
            wallet: {
                name: 'Mobile Wallet',
                available: true,
                icon: '💼',
                providers: ['Paytm Wallet', 'Amazon Pay Balance', 'PhonePe Wallet']
            }
        };
        
        this.shippingRates = {
            standard: {
                name: 'Standard Delivery',
                cost: 99,
                estimatedDays: '5-7 business days',
                freeAbove: 999
            },
            express: {
                name: 'Express Delivery',
                cost: 199,
                estimatedDays: '2-3 business days',
                freeAbove: null
            },
            premium: {
                name: 'Premium Delivery',
                cost: 299,
                estimatedDays: '1-2 business days',
                freeAbove: null
            }
        };
        
        this.initializeCheckout();
    }
    
    getIndianBanks() {
        return [
            'State Bank of India',
            'HDFC Bank',
            'ICICI Bank',
            'Axis Bank',
            'Kotak Mahindra Bank',
            'Punjab National Bank',
            'Bank of Baroda',
            'Canara Bank',
            'Union Bank of India',
            'Indian Bank',
            'IDFC First Bank',
            'Yes Bank'
        ];
    }
    
    initializeCheckout() {
        // Add checkout event listeners
        this.addCheckoutEventListeners();
        
        // Initialize payment method selection
        this.initializePaymentMethods();
        
        // Set up shipping calculations
        this.initializeShipping();
        
        // Add Indian address validation
        this.initializeAddressValidation();
    }
    
    addCheckoutEventListeners() {
        // Add to cart buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary') && 
                (e.target.textContent.includes('Customize') || 
                 e.target.textContent.includes('Add to Cart'))) {
                this.handleAddToCart(e.target);
            }
        });
        
        // Checkout form submission
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.addEventListener('submit', (e) => {
                this.handleCheckout(e);
            });
        }
    }
    
    handleAddToCart(button) {
        const productCard = button.closest('.gift-card, .gallery-item, .example-card');
        if (productCard) {
            const title = productCard.querySelector('h3, .gallery-item-title, .example-title')?.textContent || 'Unknown Product';
            const priceElement = productCard.querySelector('.gift-price, .gallery-item-price, .example-price');
            const price = priceElement ? priceElement.textContent : '₹0';
            
            // Add to cart
            this.addToCart({
                title: title,
                price: price,
                quantity: 1,
                custom: false
            });
            
            // Show notification
            this.showNotification(`${title} added to cart!`, 'success');
            
            // Update cart UI
            this.updateCartUI();
        }
    }
    
    addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        
        // Check if product already exists
        const existingIndex = cart.findIndex(item => item.title === product.title);
        if (existingIndex > -1) {
            cart[existingIndex].quantity += product.quantity;
        } else {
            cart.push(product);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    
    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            
            // Animate cart count
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
    }
    
    initializePaymentMethods() {
        // This would be called on checkout page
        const paymentContainer = document.getElementById('payment-methods');
        if (paymentContainer) {
            paymentContainer.innerHTML = this.renderPaymentMethods();
            this.addPaymentMethodListeners();
        }
    }
    
    renderPaymentMethods() {
        let html = '<div class="payment-methods-grid">';
        
        Object.entries(this.paymentMethods).forEach(([key, method]) => {
            html += `
                <div class="payment-method" data-method="${key}">
                    <div class="payment-method-icon">${method.icon}</div>
                    <div class="payment-method-info">
                        <h4>${method.name}</h4>
                        ${method.description ? `<p>${method.description}</p>` : ''}
                        ${method.apps ? `<p class="payment-apps">${method.apps.join(', ')}</p>` : ''}
                        ${method.banks ? `<p class="payment-banks">${method.banks.length}+ banks supported</p>` : ''}
                    </div>
                    <div class="payment-method-radio">
                        <input type="radio" name="payment_method" value="${key}" id="payment_${key}">
                        <label for="payment_${key}"></label>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    addPaymentMethodListeners() {
        const paymentMethods = document.querySelectorAll('.payment-method');
        paymentMethods.forEach(method => {
            method.addEventListener('click', function() {
                // Remove active class from all methods
                paymentMethods.forEach(m => m.classList.remove('active'));
                // Add active class to clicked method
                this.classList.add('active');
                // Check the radio button
                const radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                
                // Handle specific payment method logic
                const methodType = this.dataset.method;
                handlePaymentMethodSelection(methodType);
            });
        });
    }
    
    initializeShipping() {
        const shippingContainer = document.getElementById('shipping-options');
        if (shippingContainer) {
            shippingContainer.innerHTML = this.renderShippingOptions();
            this.addShippingListeners();
        }
    }
    
    renderShippingOptions() {
        let html = '<div class="shipping-options-grid">';
        
        Object.entries(this.shippingRates).forEach(([key, rate]) => {
            const cost = rate.cost === 0 ? 'FREE' : `₹${rate.cost}`;
            html += `
                <div class="shipping-option" data-shipping="${key}">
                    <div class="shipping-info">
                        <h4>${rate.name}</h4>
                        <p>${rate.estimatedDays}</p>
                        ${rate.freeAbove ? `<p class="free-shipping">Free above ₹${rate.freeAbove}</p>` : ''}
                    </div>
                    <div class="shipping-cost">
                        <span class="cost">${cost}</span>
                        <input type="radio" name="shipping_method" value="${key}" id="shipping_${key}">
                        <label for="shipping_${key}"></label>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
        return html;
    }
    
    addShippingListeners() {
        const shippingOptions = document.querySelectorAll('.shipping-option');
        shippingOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options
                shippingOptions.forEach(o => o.classList.remove('active'));
                // Add active class to clicked option
                this.classList.add('active');
                // Check the radio button
                const radio = this.querySelector('input[type="radio"]');
                if (radio) radio.checked = true;
                
                // Update order total
                updateOrderTotal();
            });
        });
    }
    
    initializeAddressValidation() {
        const addressForm = document.getElementById('address-form');
        if (addressForm) {
            addressForm.addEventListener('submit', (e) => {
                e.preventDefault();
                if (this.validateIndianAddress(addressForm)) {
                    this.saveAddress(addressForm);
                    this.showNotification('Address saved successfully!', 'success');
                }
            });
        }
    }
    
    validateIndianAddress(form) {
        const pincode = form.querySelector('[name="pincode"]').value;
        const state = form.querySelector('[name="state"]').value;
        const phone = form.querySelector('[name="phone"]').value;
        
        // Validate Indian pincode (6 digits)
        if (!/^[1-9][0-9]{5}$/.test(pincode)) {
            this.showNotification('Please enter a valid 6-digit Indian pincode', 'error');
            return false;
        }
        
        // Validate Indian phone number
        if (!/^(\+91|0)?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) {
            this.showNotification('Please enter a valid Indian phone number', 'error');
            return false;
        }
        
        // Validate state (should be one of Indian states)
        const indianStates = [
            'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
            'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
            'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
            'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
            'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
            'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Mumbai',
            'Kolkata', 'Chennai', 'Bengaluru', 'Hyderabad', 'Pune', 'Ahmedabad'
        ];
        
        if (!indianStates.includes(state)) {
            this.showNotification('Please select a valid Indian state', 'error');
            return false;
        }
        
        return true;
    }
    
    saveAddress(form) {
        const addressData = {
            name: form.querySelector('[name="name"]').value,
            address: form.querySelector('[name="address"]').value,
            city: form.querySelector('[name="city"]').value,
            state: form.querySelector('[name="state"]').value,
            pincode: form.querySelector('[name="pincode"]').value,
            phone: form.querySelector('[name="phone"]').value
        };
        
        localStorage.setItem('shippingAddress', JSON.stringify(addressData));
    }
    
    handleCheckout(e) {
        e.preventDefault();
        
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return;
        }
        
        // Get selected payment method
        const selectedPayment = document.querySelector('input[name="payment_method"]:checked');
        if (!selectedPayment) {
            this.showNotification('Please select a payment method', 'error');
            return;
        }
        
        // Get selected shipping method
        const selectedShipping = document.querySelector('input[name="shipping_method"]:checked');
        if (!selectedShipping) {
            this.showNotification('Please select a shipping method', 'error');
            return;
        }
        
        // Process payment based on method
        this.processPayment(selectedPayment.value, selectedShipping.value);
    }
    
    processPayment(paymentMethod, shippingMethod) {
        const orderData = {
            cart: JSON.parse(localStorage.getItem('cart') || '[]'),
            paymentMethod: paymentMethod,
            shippingMethod: shippingMethod,
            address: JSON.parse(localStorage.getItem('shippingAddress') || '{}'),
            total: this.calculateTotal(),
            orderDate: new Date().toISOString(),
            orderId: this.generateOrderId()
        };
        
        switch (paymentMethod) {
            case 'upi':
                this.initiateUPIPayment(orderData);
                break;
            case 'cod':
                this.processCODOrder(orderData);
                break;
            case 'card':
                this.initiateCardPayment(orderData);
                break;
            case 'netbanking':
                this.initiateNetBanking(orderData);
                break;
            case 'wallet':
                this.initiateWalletPayment(orderData);
                break;
            default:
                this.showNotification('Invalid payment method', 'error');
        }
    }
    
    initiateUPIPayment(orderData) {
        // Generate UPI payment URL
        const upiUrl = this.generateUPIUrl(orderData);
        
        // Show UPI payment modal
        this.showUPIPaymentModal(upiUrl, orderData);
    }
    
    generateUPIUrl(orderData) {
        const merchantUPI = 'heartfeltgifts@paytm';
        const amount = orderData.total;
        const orderId = orderData.orderId;
        const note = `Payment for order ${orderId}`;
        
        return `upi://pay?pa=${merchantUPI}&pn=Heartfelt%20Gifts&am=${amount}&cu=INR&tr=${orderId}&tn=${encodeURIComponent(note)}`;
    }
    
    showUPIPaymentModal(upiUrl, orderData) {
        const modal = document.createElement('div');
        modal.className = 'upi-payment-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Complete UPI Payment</h3>
                <div class="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiUrl)}" alt="UPI QR Code">
                </div>
                <p>Scan QR code or click below to open your UPI app</p>
                <div class="upi-apps">
                    ${this.paymentMethods.upi.apps.map(app => `
                        <button class="upi-app-btn" data-app="${app}">${app}</button>
                    `).join('')}
                </div>
                <button class="btn btn-outline" onclick="this.closest('.upi-payment-modal').remove()">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add event listeners for UPI apps
        modal.querySelectorAll('.upi-app-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.open(upiUrl, '_blank');
            });
        });
        
        // Check payment status periodically
        this.checkPaymentStatus(orderData.orderId);
    }
    
    processCODOrder(orderData) {
        // For COD, create order immediately
        this.createOrder(orderData);
        
        // Show COD confirmation
        this.showCODConfirmation(orderData);
    }
    
    showCODConfirmation(orderData) {
        const modal = document.createElement('div');
        modal.className = 'cod-confirmation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Order Confirmed!</h3>
                <div class="order-summary">
                    <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                    <p><strong>Total Amount:</strong> ₹${orderData.total}</p>
                    <p><strong>Payment Method:</strong> Cash on Delivery</p>
                    <p><strong>Estimated Delivery:</strong> ${this.getEstimatedDelivery(orderData.shippingMethod)}</p>
                </div>
                <div class="cod-instructions">
                    <h4>Cash on Delivery Instructions:</h4>
                    <ul>
                        <li>Please keep the exact amount ready</li>
                        <li>Our delivery partner will call you before delivery</li>
                        <li>Payment to be made in cash only</li>
                        <li>Please check your order before payment</li>
                    </ul>
                </div>
                <button class="btn btn-primary" onclick="this.closest('.cod-confirmation-modal').remove()">Got it!</button>
            </div>
        `;
        
        document.body.appendChild(modal);
    }
    
    initiateCardPayment(orderData) {
        // Redirect to payment gateway or show card form
        this.showCardPaymentForm(orderData);
    }
    
    showCardPaymentForm(orderData) {
        const modal = document.createElement('div');
        modal.className = 'card-payment-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Card Payment</h3>
                <form id="card-payment-form">
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxlength="19">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Expiry Date</label>
                            <input type="text" placeholder="MM/YY" maxlength="5">
                        </div>
                        <div class="form-group">
                            <label>CVV</label>
                            <input type="text" placeholder="123" maxlength="3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Cardholder Name</label>
                        <input type="text" placeholder="John Doe">
                    </div>
                    <div class="payment-actions">
                        <button type="submit" class="btn btn-primary">Pay ₹${orderData.total}</button>
                        <button type="button" class="btn btn-outline" onclick="this.closest('.card-payment-modal').remove()">Cancel</button>
                    </div>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add card formatting
        this.addCardFormatting(modal);
        
        // Handle form submission
        modal.querySelector('#card-payment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.processCardPayment(orderData);
        });
    }
    
    addCardFormatting(modal) {
        const cardInput = modal.querySelector('input[placeholder*="1234"]');
        const expiryInput = modal.querySelector('input[placeholder="MM/YY"]');
        const cvvInput = modal.querySelector('input[placeholder="123"]');
        
        // Card number formatting
        cardInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
        
        // Expiry date formatting
        expiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
        
        // CVV formatting
        cvvInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }
    
    processCardPayment(orderData) {
        // Simulate card processing
        this.showNotification('Processing payment...', 'info');
        
        setTimeout(() => {
            this.createOrder(orderData);
            this.showNotification('Payment successful! Order confirmed.', 'success');
            document.querySelector('.card-payment-modal')?.remove();
        }, 2000);
    }
    
    initiateNetBanking(orderData) {
        this.showNetBankingModal(orderData);
    }
    
    showNetBankingModal(orderData) {
        const modal = document.createElement('div');
        modal.className = 'netbanking-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Select Your Bank</h3>
                <div class="banks-grid">
                    ${this.paymentMethods.netbanking.banks.map(bank => `
                        <button class="bank-btn" data-bank="${bank}">${bank}</button>
                    `).join('')}
                </div>
                <button class="btn btn-outline" onclick="this.closest('.netbanking-modal').remove()">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add bank selection listeners
        modal.querySelectorAll('.bank-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const bank = btn.dataset.bank;
                this.redirectToBank(bank, orderData);
            });
        });
    }
    
    redirectToBank(bank, orderData) {
        // In a real implementation, this would redirect to the bank's payment gateway
        this.showNotification(`Redirecting to ${bank}...`, 'info');
        
        setTimeout(() => {
            this.createOrder(orderData);
            this.showNotification('Order placed! Please complete payment on your bank portal.', 'success');
            document.querySelector('.netbanking-modal')?.remove();
        }, 2000);
    }
    
    initiateWalletPayment(orderData) {
        this.showWalletModal(orderData);
    }
    
    showWalletModal(orderData) {
        const modal = document.createElement('div');
        modal.className = 'wallet-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Select Wallet</h3>
                <div class="wallets-grid">
                    ${this.paymentMethods.wallet.providers.map(provider => `
                        <button class="wallet-btn" data-wallet="${provider}">${provider}</button>
                    `).join('')}
                </div>
                <button class="btn btn-outline" onclick="this.closest('.wallet-modal').remove()">Cancel</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add wallet selection listeners
        modal.querySelectorAll('.wallet-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const wallet = btn.dataset.wallet;
                this.processWalletPayment(wallet, orderData);
            });
        });
    }
    
    processWalletPayment(wallet, orderData) {
        this.showNotification(`Processing payment via ${wallet}...`, 'info');
        
        setTimeout(() => {
            this.createOrder(orderData);
            this.showNotification('Payment successful! Order confirmed.', 'success');
            document.querySelector('.wallet-modal')?.remove();
        }, 2000);
    }
    
    createOrder(orderData) {
        // Save order to localStorage (in real app, this would be sent to server)
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        orders.push(orderData);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        // Clear cart
        localStorage.removeItem('cart');
        
        // Update UI
        this.updateCartUI();
        
        // Redirect to order confirmation page
        setTimeout(() => {
            window.location.href = 'order-confirmation.html';
        }, 2000);
    }
    
    calculateTotal() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const subtotal = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[₹,]/g, ''));
            return sum + (price * item.quantity);
        }, 0);
        
        // Add shipping cost
        const selectedShipping = document.querySelector('input[name="shipping_method"]:checked')?.value || 'standard';
        const shippingCost = this.shippingRates[selectedShipping].cost;
        
        // Check if shipping is free
        if (this.shippingRates[selectedShipping].freeAbove && subtotal >= this.shippingRates[selectedShipping].freeAbove) {
            return subtotal;
        }
        
        return subtotal + shippingCost;
    }
    
    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `HFG${timestamp}${random}`;
    }
    
    getEstimatedDelivery(shippingMethod) {
        return this.shippingRates[shippingMethod].estimatedDays;
    }
    
    checkPaymentStatus(orderId) {
        // In a real implementation, this would poll the server for payment status
        const checkInterval = setInterval(() => {
            // Simulate payment success after 30 seconds
            if (Math.random() > 0.8) {
                clearInterval(checkInterval);
                this.showNotification('Payment received! Order confirmed.', 'success');
                document.querySelector('.upi-payment-modal')?.remove();
                
                // Create order
                const orderData = {
                    orderId: orderId,
                    paymentStatus: 'paid',
                    orderDate: new Date().toISOString()
                };
                this.createOrder(orderData);
            }
        }, 5000);
        
        // Stop checking after 2 minutes
        setTimeout(() => {
            clearInterval(checkInterval);
        }, 120000);
    }
    
    showNotification(message, type = 'info') {
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

// Payment method selection handler
function handlePaymentMethodSelection(methodType) {
    // Show/hide additional fields based on payment method
    const additionalFields = document.getElementById('payment-additional-fields');
    if (additionalFields) {
        switch (methodType) {
            case 'upi':
                additionalFields.innerHTML = `
                    <div class="upi-fields">
                        <label>Enter UPI ID</label>
                        <input type="text" placeholder="your-upi-id@paytm" name="upi_id">
                    </div>
                `;
                break;
            case 'cod':
                additionalFields.innerHTML = `
                    <div class="cod-info">
                        <p>You will pay when you receive your order. Please keep the exact amount ready.</p>
                    </div>
                `;
                break;
            default:
                additionalFields.innerHTML = '';
        }
    }
}

// Order total update function
function updateOrderTotal() {
    const checkout = new IndianCheckout();
    const total = checkout.calculateTotal();
    const totalElement = document.getElementById('order-total');
    if (totalElement) {
        totalElement.textContent = `₹${total}`;
    }
}

// Initialize checkout system
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('checkout') || 
        window.location.pathname.includes('cart')) {
        window.indianCheckout = new IndianCheckout();
    }
});

// Export for global access
window.IndianCheckout = IndianCheckout;
window.handlePaymentMethodSelection = handlePaymentMethodSelection;
window.updateOrderTotal = updateOrderTotal;
