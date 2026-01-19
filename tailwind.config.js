/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a7d3e',
        'primary-dark': '#0d5527',
        'primary-light': '#2ecc71',
        secondary: '#ffc107',
        'secondary-dark': '#e6b800',
        accent: '#2196f3',
        light: '#f8fff9',
        dark: '#1a1a1a',
        gray: '#6c757d',
        'gray-light': '#f8f9fa',
        white: '#ffffff',
        success: '#28a745',
        warning: '#ffc107',
        danger: '#dc3545',
        info: '#17a2b8',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a7d3e 0%, #0d5527 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #ffc107 0%, #e6b800 100%)',
        'gradient-light': 'linear-gradient(135deg, #f8fff9 0%, #e8f5e9 100%)',
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'lg': '0 8px 32px rgba(0, 0, 0, 0.2)',
        'hover': '0 12px 48px rgba(0, 0, 0, 0.25)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '12px',
        'lg': '20px',
        'full': '50px',
      },
      maxWidth: {
        'container': '1200px',
      },
      spacing: {
        'xs': '0.5rem',
        'sm': '1rem',
        'md': '2rem',
        'lg': '3rem',
        'xl': '5rem',
      },
    },
  },
  plugins: [],
}