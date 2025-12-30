/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brilliant/Duolingo inspired color palette
        brilliant: {
          blue: '#4A90E2',
          darkBlue: '#2E5C8A',
          lightBlue: '#6BA3E8',
        },
        duolingo: {
          green: '#58CC02',
          darkGreen: '#3B9A00',
          lightGreen: '#7ED321',
        },
        accent: {
          orange: '#FF9500',
          purple: '#9B59B6',
          pink: '#E91E63',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
}

