// app.js - Optimized for Vue
(function() {
    'use strict';
    
    console.log('Manunggal App Loaded - Vue Version');
    
    // DOM Cache
    const DOM_CACHE = new Map();
    const getElement = (id) => {
        if (!DOM_CACHE.has(id)) {
            DOM_CACHE.set(id, document.getElementById(id));
        }
        return DOM_CACHE.get(id);
    };
    
    const DOM = {
        get backToTop() { return getElement('backToTop'); },
        get contactForm() { return getElement('contactForm'); },
        get year() { return getElement('year'); }
    };
    
    // Initialize when DOM is ready
    function init() {
        // Set current year in footer
        if (DOM.year) {
            DOM.year.textContent = new Date().getFullYear();
        }
        
        // Initialize back to top button
        initBackToTop();
        
        // Initialize form validation
        initContactForm();
        
        // Initialize product filter functionality
        initProductFilter();
        
        // Initialize product modal if exists
        initProductModal();
        
        console.log('Manunggal App Initialized Successfully');
    }
    
    // Back to Top functionality
    function initBackToTop() {
        const backToTopBtn = DOM.backToTop;
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Product Filter functionality
    function initProductFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');
        
        if (filterButtons.length === 0 || productCards.length === 0) return;
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.dataset.filter || 'all';
                
                // Filter products
                productCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.classList.contains(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Contact Form functionality
    function initContactForm() {
        const contactForm = DOM.contactForm;
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Reset form
                    this.reset();
                    
                    // Show success message
                    const successMsg = document.getElementById('formSuccess');
                    if (successMsg) {
                        successMsg.textContent = 'Pesan Anda telah berhasil dikirim!';
                        successMsg.style.display = 'block';
                        
                        // Hide message after 5 seconds
                        setTimeout(() => {
                            successMsg.style.display = 'none';
                        }, 5000);
                    }
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateField(input);
            });
            
            input.addEventListener('input', () => {
                clearError(input);
            });
        });
    }
    
    // Form validation helpers
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        clearError(field);
        
        const value = field.value.trim();
        const errorId = field.id + 'Error';
        const errorElement = document.getElementById(errorId);
        
        if (field.hasAttribute('required') && !value) {
            showError(field, errorElement, 'Field ini wajib diisi');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showError(field, errorElement, 'Format email tidak valid');
                return false;
            }
        }
        
        return true;
    }
    
    function showError(field, errorElement, message) {
        field.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearError(field) {
        field.classList.remove('error');
        const errorId = field.id + 'Error';
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    // Product Modal functionality
    function initProductModal() {
        const modal = document.getElementById('productModal');
        const modalOverlay = document.getElementById('modalOverlay');
        const modalClose = document.getElementById('modalClose');
        
        if (!modal || !modalOverlay || !modalClose) return;
        
        // Close modal on overlay click
        modalOverlay.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close modal on close button click
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        // Close modal on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Open product modal (can be called from product detail pages)
    window.openProductModal = function(productData) {
        const modal = document.getElementById('productModal');
        if (!modal) return;
        
        // Populate modal with product data
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');
        const modalImage = modal.querySelector('.modal-main-image img');
        
        if (modalTitle && productData.title) {
            modalTitle.textContent = productData.title;
        }
        
        if (modalDescription && productData.description) {
            modalDescription.textContent = productData.description;
        }
        
        if (modalImage && productData.image) {
            modalImage.src = productData.image;
            modalImage.alt = productData.title || 'Product Image';
        }
        
        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Smooth scroll for anchor links (for Vue router compatibility)
    document.addEventListener('click', function(e) {
        // Only handle links that start with #
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const href = e.target.getAttribute('href');
            
            // Skip if it's just #
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                const headerHeight = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
    
    // Initialize when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();