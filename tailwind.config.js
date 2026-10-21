/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dusk: {
          light: '#a83279',
          DEFAULT: '#8b2671',
          dark: '#581747',
        },
        plum: {
          light: '#351257',
          DEFAULT: '#220b38',
          dark: '#140622',
        },
        mustard: {
          light: '#f5cd5d',
          DEFAULT: '#e5b83b',
          dark: '#b3891d',
        },
        wood: {
          light: '#a77348',
          DEFAULT: '#8b5a2b',
          dark: '#5c4033',
        },
        crt: {
          green: '#33ff33',
          dark: '#0a1a0a',
          glow: '#00ff66',
        },
        acme: {
          red: '#dc2626',
          hover: '#b91c1c',
          yellow: '#f59e0b',
        }
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', 'monospace'],
        cartoon: ['"Comic Sans MS"', '"Chalkboard SE"', 'cursive', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        squash: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '50%': { transform: 'scale(1.15, 0.85)' },
        },
        bulge: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.3s ease-in-out infinite',
        squash: 'squash 0.4s ease-in-out',
        bulge: 'bulge 1.2s ease-in-out infinite',
        scanline: 'scanline 8s linear infinite',
      }
    },
  },
  plugins: [],
}

