import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Define Custom Colors
      colors: {
        // Primary accent color: Warm Sage Green (#7E9F8E)
        sage: {
          DEFAULT: '#7E9F8E', // Use DEFAULT for the main color reference
        },
        // Secondary accent color: deep, warm navy (#2C3E50)
        navy: {
          DEFAULT: '#2C3E50',
        },
        // Background color: Off-white/Cream (#FAF9F6)
        cream: {
          DEFAULT: '#FAF9F6',
        },
        // Interactive/success color: Mustard (#E7BB41)
        mustard: {
          DEFAULT: '#E7BB41',
        },
      },
      
      fontFamily: {
        // 🚨 UPDATED: Using the actual CSS variables from Next.js Geist setup
        // Headings typography (Serif-like Monospace): 
        serif: ['var(--font-geist-mono)', ...defaultTheme.fontFamily.serif],
        // Body typography (Sans-serif font):
        sans: ['var(--font-geist-sans)', ...defaultTheme.fontFamily.sans],
      },

      // 🚨 ADDED: Custom Filter for Hero Image Darkening
      brightness: {
        '50': '.50', // Utility class: brightness-50 (equivalent to brightness(50%))
      },
    },
  },
  // Ensure the 'filters' and 'color-adjust' functionality is enabled if needed
  // For modern Tailwind (v3+), filters are enabled by default.
  plugins: [], 
};

export default config;