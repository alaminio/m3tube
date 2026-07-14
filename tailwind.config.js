/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ]
      },
      colors: {
        ink: {
          950: "#08090d",
          900: "#0b0d12",
          800: "#12151d",
          700: "#1a1e2a",
          600: "#242a3a"
        },
        brand: {
          400: "#ff5f83",
          500: "#ff2b5a",
          600: "#e51e4d"
        },
        iris: {
          400: "#9a80ff",
          500: "#7c5cff",
          600: "#5e3ee6"
        }
      },
      boxShadow: {
        glow: "0 8px 30px rgba(255, 43, 90, 0.35)",
        glass: "0 10px 30px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "brand-grad":
          "linear-gradient(135deg, #ff2b5a 0%, #7c5cff 100%)"
      },
      animation: {
        "fade-in": "fadeIn 200ms ease-out"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(4px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};
