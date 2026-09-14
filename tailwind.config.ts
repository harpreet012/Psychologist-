import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F8F4EC",
          soft: "#F2ECE0",
          deep: "#EFE7D8",
        },
        sage: {
          50: "#F1F3EC",
          100: "#E1E6D6",
          200: "#C4CFAE",
          300: "#A6B489",
          400: "#8A9A6C",
          500: "#6F7D55",
          600: "#586344",
          700: "#454F36",
          800: "#333A28",
        },
        clay: {
          100: "#EFE4D6",
          200: "#E3D2BC",
          300: "#D2B896",
        },
        lavender: {
          100: "#EAE5F2",
          200: "#D3C8E6",
          300: "#B7A6D1",
          400: "#9A85B8",
        },
        charcoal: {
          DEFAULT: "#2B2823",
          soft: "#4A463F",
          muted: "#726C61",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        organic: "63% 37% 54% 46% / 43% 47% 53% 57%",
        "organic-2": "38% 62% 63% 37% / 41% 44% 56% 59%",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(43, 40, 35, 0.15)",
        card: "0 4px 20px -8px rgba(43, 40, 35, 0.12)",
        glass: "0 8px 32px -12px rgba(43, 40, 35, 0.14)",
      },
      maxWidth: {
        content: "1240px",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.35)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s ease-out forwards",
      },
    },
  },
  plugins: [],
};
export default config;
