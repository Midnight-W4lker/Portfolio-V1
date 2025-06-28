module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
  extend: {
    boxShadow: {
      glow: '0 0 12px 2px rgba(255,255,255,0.4)',
      'glow-dark': '0 0 12px 2px rgba(0,0,0,0.4)',
    },
  },
  },
  darkMode: 'class', // Enable dark mode support
  screens: {
    'sm': '640px',
    'md': '768px',
    'lg': '1024px', 
    'xl': '1280px',
  },
  plugins: [],
}
