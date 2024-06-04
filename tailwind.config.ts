import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      'text': '#ffffff',
      'background': '#000000',
      'primary': '#39d9dc',
      'secondary': '#8ca208',
      'accent': '#8bf426',
      'dager': '#d62828', 
      'black': "#000000", 
      'white': '#ffffff', 
      'rose' : '#be143c', 
      'pink': '#db2777', 
      'yellow': "#f6d83a"
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
