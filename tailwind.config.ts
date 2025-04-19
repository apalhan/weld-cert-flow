
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(217, 91%, 60%)",
          foreground: "hsl(0, 0%, 98%)",
        },
        secondary: {
          DEFAULT: "hsl(220, 14%, 96%)",
          foreground: "hsl(222, 47%, 11%)",
        },
        industrial: {
          100: "hsl(220, 14%, 96%)",
          200: "hsl(220, 13%, 91%)",
          300: "hsl(216, 12%, 84%)",
          400: "hsl(218, 11%, 65%)",
          500: "hsl(220, 9%, 46%)",
          600: "hsl(215, 14%, 34%)",
          700: "hsl(217, 19%, 27%)",
          800: "hsl(215, 28%, 17%)",
          900: "hsl(221, 39%, 11%)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
