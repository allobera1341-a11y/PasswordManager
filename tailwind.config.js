/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens — match CSS custom properties
        bg:           '#f4f5f7',
        surface:      '#ffffff',
        'surface-2':  '#f8f9fa',
        'surface-3':  '#f1f3f5',
        border:       '#e9ecef',
        'border-strong': '#ced4da',
        'text-primary':  '#1a1d23',
        'text-secondary':'#495057',
        'text-muted':    '#868e96',
        accent:       '#1c7ed6',
        'accent-hover':'#1971c2',
        'accent-light':'#e7f3ff',
        success:      '#2f9e44',
        warning:      '#e67700',
        danger:       '#c92a2a',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-md': '0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)',
        'card-lg': '0 8px 24px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        card: '12px',
      }
    },
  },
  plugins: [],
}
