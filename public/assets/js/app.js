(function() {
    'use strict';
    
    // Debounce utility
    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Throttle utility
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    const init = () => {
        updateYear();
        initSmoothScroll();
        initHeader();
        initBackToTop();
        initMobileMenu();
        initProductDetail();
        initImageLoading();
    };
    
    const updateYear = () => {
        const yearElements = document.querySelectorAll('#year, .current-year');
        const currentYear = new Date().getFullYear();
        yearElements.forEach(el => {
            if (el) el.textContent = currentYear;
        });
    };
    
    const initSmoothScroll = () => {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const id = link.getAttribute('href').substring(1);
                const element = document.getElementById(id);
                if (element) {
                    const headerHeight = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
                    window.scrollTo({ 
                        top: offsetPosition, 
                        behavior: window.innerWidth < 768 ? 'auto' : 'smooth' 
                    });
                    
                    if (window.innerWidth < 768) {
                        closeMobileMenu();
                    }
                }
            }
        });
    };
    
    const initHeader = () => {
        const header = document.querySelector('header');
        if (!header) return;
        
        const handleScroll = throttle(() => {
            if (window.scrollY > 60) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    };
    
    const initBackToTop = () => {
        const backToTop = document.getElementById('backToTop');
        if (!backToTop) return;
        
        const handleScroll = throttle(() => {
            backToTop.classList.toggle('visible', window.pageYOffset > 300);
        }, 100);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ 
                top: 0, 
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
    
    const initMobileMenu = () => {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (!hamburger || !navMenu) return;
        
        const toggleMenu = () => {
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            document.body.style.overflow = !isExpanded ? 'hidden' : '';
            
            const icon = hamburger.querySelector('i');
            if (icon) {
                icon.className = !isExpanded ? 'fas fa-times' : 'fas fa-bars';
            }
        };
        
        const closeMobileMenu = () => {
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            const icon = hamburger.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        };
        
        hamburger.addEventListener('click', toggleMenu);
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
        
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }, 250));
        
        window.closeMobileMenu = closeMobileMenu;
    };
    
    const initProductDetail = () => {
        const modal = document.querySelector('.modal');
        const modalClose = document.querySelector('.modal-close');
        const thumbnails = document.querySelectorAll('.thumbnail-item');
        
        if (!modal || !modalClose) return;
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const mainImg = document.querySelector('.main-image');
                if (mainImg) {
                    const newSrc = this.querySelector('img').src;
                    mainImg.style.opacity = '0';
                    setTimeout(() => {
                        mainImg.src = newSrc;
                        mainImg.style.opacity = '1';
                    }, 150);
                }
            });
        });
        
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        modalClose.addEventListener('click', closeModal);
        
        document.querySelector('.main-image-container')?.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };
    
    const initImageLoading = () => {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        images.forEach(img => {
            if (img.getAttribute('loading') !== 'lazy') {
                img.setAttribute('loading', 'lazy');
            }
            imageObserver.observe(img);
        });
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 100);
    }
    
    window.scrollToElement = function(elementId, headerHeight = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            window.scrollTo({ 
                top: offsetPosition, 
                behavior: window.innerWidth < 768 ? 'auto' : 'smooth' 
            });
        }
    };
})();