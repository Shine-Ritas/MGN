/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  './pages/**/*.{ts,tsx}',
  './components/**/*.{ts,tsx}',
  './app/**/*.{ts,tsx}',
  './src/**/*.{ts,tsx}',
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  extend: {
    colors: {
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
      background: "var(--background)",
      foreground: "var(--foreground)",
      "sub-background": "var(--sub-background)",
      primary: {
        DEFAULT: "var(--primary)",
        foreground: "var(--primary-foreground)",
        muted: "var(--primary-muted)",
      },
      "neon-primary" : {
        DEFAULT: "var(--neon-primary)",
        foreground: "var(--neon-primary-foreground)",
      },
      "violet" : {
        DEFAULT: "var(--violet)",
        foreground: "var(--violet-foreground)",
      },
      phover:"var(--phover)",
      secondary: {
        DEFAULT: "var(--secondary)",
        foreground: "var(--secondary-foreground)",
      },
      
      destructive: {
        DEFAULT: "var(--destructive)",
        foreground: "var(--destructive-foreground)",
      },
      muted: {
        DEFAULT: "var(--muted)",
        foreground: "var(--muted-foreground)",
      },
      accent: {
        DEFAULT: "var(--accent)",
        foreground: "var(--accent-foreground)",
      },
      popover: {
        DEFAULT: "var(--popover)",
        foreground: "var(--popover-foreground)",
      },
      card: {
        DEFAULT: "var(--card)",
        foreground: "var(--card-foreground)",
      },
      gold: "var(--gold)",
      silver: "var(--silver)",
      success: "var(--success)",
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    fontSize: {
      xxs: "11px",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      "spin-slow": "spin 3s linear infinite",
    },
  },
};
// eslint-disable-next-line no-undef
export const plugins = [
  require("tailwindcss-animate"),
  require('@tailwindcss/typography')
];