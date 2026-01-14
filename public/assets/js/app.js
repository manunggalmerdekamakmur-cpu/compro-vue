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
    
    const initPerformance = () => {
        // Log performance metrics
        if (window.performance && performance.getEntriesByType) {
            setTimeout(() => {
                const navTiming = performance.getEntriesByType('navigation')[0]
                if (navTiming) {
                    console.log('Page Load Time:', navTiming.loadEventEnd - navTiming.startTime)
                    console.log('DOM Ready:', navTiming.domContentLoadedEventEnd - navTiming.startTime)
                }
            }, 1000)
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            init()
            initSmoothScroll()
            initPerformance()
        })
    } else {
        init()
        initSmoothScroll()
        initPerformance()
    }
})()