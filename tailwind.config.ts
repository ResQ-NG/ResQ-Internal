import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ResQ brand colors (in addition to CSS-variable-driven palette)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          blue: "#0000FF",
          "blue-dark": "#3333FF",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          red: "#F00033",
          "red-dark": "#FF3366",
        },
        surface: {
          light: "#F7F7F7",
          dark: "#121212",
        },
        success: {
          green: "#17A34A",
          "green-dark": "#22C55E",
        },
        // Typography tokens
        primaryDark: "#222222",
        "primaryDark-dark": "#E5E5E5",
        captionDark: "#979797",
        "captionDark-dark": "#A3A3A3",
        // Hero gradient stops for from-/via-/to-
        "resq-deep": "#001a3d",
        "resq-mid": "#000814",
        "resq-black": "#000000",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        sans: ["var(--font-metropolis)", "system-ui", "sans-serif"],
        metropolis: ["var(--font-metropolis)", "system-ui", "sans-serif"],
        "metropolis-thin": ["var(--font-metropolis-thin)", "system-ui", "sans-serif"],
        "metropolis-extralight": ["var(--font-metropolis-extralight)", "system-ui", "sans-serif"],
        "metropolis-light": ["var(--font-metropolis-light)", "system-ui", "sans-serif"],
        "metropolis-regular": ["var(--font-metropolis-regular)", "system-ui", "sans-serif"],
        "metropolis-medium": ["var(--font-metropolis-medium)", "system-ui", "sans-serif"],
        "metropolis-semibold": ["var(--font-metropolis-semibold)", "system-ui", "sans-serif"],
        "metropolis-bold": ["var(--font-metropolis-bold)", "system-ui", "sans-serif"],
        "metropolis-extrabold": ["var(--font-metropolis-extrabold)", "system-ui", "sans-serif"],
        "metropolis-black": ["var(--font-metropolis-black)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-hero":
          "linear-gradient(to bottom right, var(--gradient-start) 0%, var(--gradient-mid) 50%, var(--gradient-end) 100%)",
        "gradient-hero-radial":
          "radial-gradient(circle, var(--gradient-radial-inner) 0%, var(--gradient-radial-mid) 45%, var(--gradient-radial-outer) 70%)",
        "gradient-primary": "linear-gradient(135deg, #0000FF 0%, #3333FF 100%)",
        "gradient-accent": "linear-gradient(135deg, #F00033 0%, #FF3366 100%)",
        "gradient-surface": "linear-gradient(180deg, #121212 0%, #1a1a1a 100%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};

export default config;
