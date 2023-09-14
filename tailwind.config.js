const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      translate: {
        center: "translate(-50%, -50%)",
      },
      backgroundImage: {
        "main-gradient":
          "radial-gradient(114.29% 42.52% at 103.66% 58.94%, #D0F8F1 0%, #D1F3FF 18.23%, #ECF8FF 51.28%, #E1FFFA 80.21%, #D0F2FF 93.23%)",
        "second-gradient":
          "radial-gradient(56.07% 115.65% at 93.66% 158.94%, #D0F8F1 0%, #D1F3FF 18.23%, #ECF8FF 51.28%, #E1FFFA 80.21%, #D0F2FF 93.23%)",
      },
      colors: {
        corduroy: "#4A5754",
        orange: "#E1523A",
        orangeDark: "#E3533A",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        anakiwa: {
          50: "#F2FAFD",
          100: "hsl(var(--anakiwa))",
          100: "#E4F3FA",
          200: "#C2E8F5",
          300: "#A3DFF0",
          400: "#50C3E0",
          500: "#29ACCE",
          950: "#103241",
        },
        tuatara: {
          100: "#E5E6E8",
          200: "#CDCFD4",
          700: "#4A4C54",
          950: "#242528",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-display)", "Space Grotesk"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "overlay-show": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "content-show": {
          from: { opacity: 0, transform: "translate(-50%, -48%) scale(0.96)" },
          to: { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
        },
        "slide-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "slide-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "overlay-show": "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "content-show": "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        "slide-down": "slide-down 0.2s ease-out",
        "slide-up": "slide-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
