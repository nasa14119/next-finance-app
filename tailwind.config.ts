import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./frontend/src/**/*.{js,ts,jsx,tsx,mdx}", // Archivos en src
    "./frontend/src/app/**/*.{js,ts,jsx,tsx,mdx}", // Archivos en src/app
    "./frontend/src/pages/**/*.{js,ts,jsx,tsx,mdx}", // Archivos en src/pages
    "./frontend/src/components/**/*.{js,ts,jsx,tsx,mdx}", // Archivos en src/components
  ],
  theme: {
    colors: {
      text: "#ffffff",
      background: "#000000",
      primary: "#39d9dc",
      secondary: "#8ca208",
      "blend-green": "#2a490f",
      accent: "#8bf426",
      dager: "#d62828",
      black: "#000000",
      white: "#ffffff",
      rose: "#be143c",
      pink: "#db2777",
      yellow: "#f6d83a",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
