/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Larger font sizes for better readability
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px (was 12px)
        'sm': ['1rem', { lineHeight: '1.5rem' }],         // 16px (was 14px)
        'base': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px (was 16px)
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px (was 18px)
        'xl': ['1.5rem', { lineHeight: '2rem' }],         // 24px (was 20px)
        '2xl': ['1.75rem', { lineHeight: '2.25rem' }],    // 28px (was 24px)
        '3xl': ['2rem', { lineHeight: '2.5rem' }],        // 32px (was 30px)
        '4xl': ['2.5rem', { lineHeight: '3rem' }],        // 40px (was 36px)
        '5xl': ['3rem', { lineHeight: '1' }],             // 48px
      },
      colors: {
        // Primary accent - Industrial Orange/Yellow
        primary: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
          800: '#92400E',
          900: '#78350F',
        },
        // Sidebar dark colors
        sidebar: {
          DEFAULT: '#1F2937',
          dark: '#111827',
          light: '#374151',
          border: '#374151',
        },
        // Status colors
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          info: '#3B82F6',
        },
        // Dashboard background
        dashboard: {
          bg: '#F3F4F6',
          card: '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}
