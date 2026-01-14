// app.js - Optimized for Performance
(function() {
    'use strict';
    
    // DOM Cache dengan lazy loading
    const getElement = (id) => document.getElementById(id);
    
    // Cache untuk elements yang sering digunakan
    let cachedElements = {};
    
    const getCachedElement = (id) => {
        if (!cachedElements[id]) {
            cachedElements[id] = getElement(id);
        }
        return cachedElements[id];
    };
    
    // Initialize dengan debounce untuk scroll events
    function init() {
        // Set current year in footer
        const yearElement = getCachedElement('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        initBackToTop();
        initProductFilter();
        initProductModal();
        
        // Lazy load contact form jika ada
        if (getCachedElement('contactForm')) {
            initContactForm();
        }
    }
    
    // Back to Top dengan throttle
    function initBackToTop() {
        const backToTopBtn = getCachedElement('backToTop');
        if (!backToTopBtn) return;
        
        let scrollTimeout;
        const handleScroll = () => {
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(() => {
                backToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
                scrollTimeout = null;
            }, 100);
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Product Filter dengan event delegation
    function initProductFilter() {
        const productGrid = document.querySelector('.products-grid');
        if (!productGrid) return;
        
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.filter-btn')) return;
            
            const button = e.target.closest('.filter-btn');
            const filterValue = button.dataset.filter || 'all';
            const productCards = productGrid.querySelectorAll('.product-card');
            
            // Remove active class dari semua buttons
            document.querySelectorAll('.filter-btn').forEach(btn => 
                btn.classList.remove('active'));
            
            // Add active class ke clicked button
            button.classList.add('active');
            
            // Filter products
            productCards.forEach(card => {
                if (filterValue === 'all' || card.classList.contains(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Contact Form dengan validasi sederhana
    function initContactForm() {
        const contactForm = getCachedElement('contactForm');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
                submitBtn.disabled = true;
                
                // Simulasi pengiriman
                setTimeout(() => {
                    this.reset();
                    
                    const successMsg = getCachedElement('formSuccess');
                    if (successMsg) {
                        successMsg.textContent = 'Pesan Anda telah berhasil dikirim!';
                        successMsg.style.display = 'block';
                        
                        setTimeout(() => {
                            successMsg.style.display = 'none';
                        }, 5000);
                    }
                    
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    function validateForm(form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'Field ini wajib diisi');
                isValid = false;
            } else if (field.type === 'email' && !isValidEmail(field.value)) {
                showError(field, 'Format email tidak valid');
                isValid = false;
            } else {
                clearError(field);
            }
        });
        
        return isValid;
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function showError(field, message) {
        field.classList.add('error');
        const errorId = field.id + 'Error';
        const errorElement = getCachedElement(errorId);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearError(field) {
        field.classList.remove('error');
        const errorId = field.id + 'Error';
        const errorElement = getCachedElement(errorId);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    // Product Modal
    function initProductModal() {
        const modal = getCachedElement('productModal');
        if (!modal) return;
        
        // Close modal dengan event delegation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.modal-close') || 
                e.target.closest('.modal-overlay')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close dengan ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Smooth scroll untuk anchor links
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link || link.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
    
    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();