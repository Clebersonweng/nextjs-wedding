/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
     "./app/**/*.{js,ts,jsx,tsx}",
     "./pages/**/*.{js,ts,jsx,tsx}",
     "./components/**/*.{js,ts,jsx,tsx}",
     "./node_modules/tw-elements/dist/js/**/*.js",
 
     // Or if using `src` directory:
     "./src/**/*.{js,ts,jsx,tsx}",
     "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  theme: {
     extend: {
        colors: {
           primary: { "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd", "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8", "800": "#1e40af", "900": "#1e3a8a" }
        },
        gridTemplateColumns: {
           '24': 'repeat(24, minmax(0, 1fr))',
        },
        spacing: {
           '128': '32rem',
           '144': '36rem',
        },
        borderRadius: {
           '4xl': '2rem',
        }
     }
  },
  plugins: [],
};