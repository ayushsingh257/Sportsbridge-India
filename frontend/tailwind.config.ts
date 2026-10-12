import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48", // primary vibrant red
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        surface: {
          light: "#ffffff",
          subtle: "#f8fafc",
          card: "#ffffff",
          dark: "#0b0b0d",
          charcoal: "#161619",
          borderDark: "#26262b",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        glass: "0 4px 30px rgba(0, 0, 0, 0.05)",
        "glass-dark": "0 4px 30px rgba(0, 0, 0, 0.4)",
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px -1px rgba(0, 0, 0, 0.08)",
        "card-hover": "0 10px 25px -5px rgba(225, 29, 72, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        DEFAULT: "0.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
