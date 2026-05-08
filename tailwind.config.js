/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f8fafc", // Gris muy claro (slate-50)
        surface: "#ffffff",
        primary: "#0f172a",    // Slate-900 para textos y botones principales
        secondary: "#475569",  // Slate-600 para textos secundarios
        border: "#e2e8f0",     // Slate-200 para bordes
        accent: "#2563eb",     // Azul profesional (solo para interacciones clave)
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
