(function() {
    'use strict';
    
    const init = () => {
        const yearElement = document.getElementById('year')
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear()
        }
    }
    
    const initSmoothScroll = () => {
        document.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault()
                const id = e.target.getAttribute('href').substring(1)
                const element = document.getElementById(id)
                if (element) {
                    const headerHeight = 80
                    const elementPosition = element.getBoundingClientRect().top
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    })
                }
            }
        })
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init()
            initSmoothScroll()
        })
    } else {
        init()
        initSmoothScroll()
    }
})()