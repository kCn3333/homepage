/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./App.tsx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Jost"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#050505',
          card: '#0c0c0c',
          border: '#2a2a2a',
          text: '#e5e5e5', 
          green: '#4CAF50',
          dim: '#888888',
        }
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite',
        'glitch': 'glitch 1s linear infinite',
        'wander': 'wander 15s infinite alternate',
        'wander-slow': 'wander 20s infinite alternate-reverse',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
        wander: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(50px, 50px) scale(1)' },
        }
      }
    }
  },
  plugins: [],
}