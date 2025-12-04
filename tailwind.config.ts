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
        // Use the 'defaultTheme.fontFamily' property to access the default fonts
        // Headings typography: Serif-font
        serif: ['var(--font-heading)', ...defaultTheme.fontFamily.serif],
        // Body typography: Sans-serif font
        sans: ['var(--font-body)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;