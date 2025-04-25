/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        secondary: {
          50: "#f8f7ff",
          100: "#f0eeff",
          200: "#e4ddff",
          300: "#d1c4ff",
          400: "#b197fc",
          500: "#9361fc",
          600: "#8047e9",
          700: "#6a3de8",
          800: "#5730c5",
          900: "#4a2b9e",
        },
        dark: {
          50: "#f6f6f7",
          100: "#e0e2e7",
          200: "#c0c4cf",
          300: "#9ba1b4",
          400: "#757d98",
          500: "#5a6280",
          600: "#484d69",
          700: "#3a3f55",
          800: "#2d3143",
          900: "#1f2231",
          950: "#131620",
        },
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"],
      },
      animation: {
        "gradient-x": "gradient-x 15s ease infinite",
        "micro-bounce": "micro-bounce 0.5s ease-in-out",
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-up": "slide-up 0.3s ease-in-out",
      },
      keyframes: {
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "micro-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-3px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
        "3xl": "32px",
      },
    },
  },
  plugins: [],
};
