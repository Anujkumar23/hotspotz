/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: "0px",
      sm: "575px",
      // // => @media (min-width: 640px) { ... }
      md: "768px",
      // // => @media (min-width: 768px) { ... }
      lg: "1024px",
      // // => @media (min-width: 1024px) { ... }
      xl: "1280px",
      // // => @media (min-width: 1280px) { ... }
      "2xl": "1536px",
      // // => @media (min-width: 1536px) { ... }

      // xs: '450px',
      // => @media (min-width: 450px) { ... }

      // sm: '575px',
      // => @media (min-width: 576px) { ... }

      // md: '768px',
      // => @media (min-width: 768px) { ... }

      // lg: '992px',
      // => @media (min-width: 992px) { ... }

      // xl: '1200px',
      // => @media (min-width: 1200px) { ... }

      // '2xl': '1400px',
      // => @media (min-width: 1400px) { ... }
    },

    // screens: {
    //   "2xl": { max: "1535px" },
    //   // => @media (max-width: 1535px) { ... }

    //   xl: { max: "1279px" },
    //   // => @media (max-width: 1279px) { ... }

    //   lg: { max: "1023px" },
    //   // => @media (max-width: 1023px) { ... }

    //   md: { max: "767px" },
    //   // => @media (max-width: 767px) { ... }

    //   sm: { max: "639px" },
    // },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-ltr":
          "linear-gradient(to right, #e6e6e6 5%, #cccccc 25%, #e6e6e6 35%)",
      },

      backgroundSize: {
        "x-y": "1000px 100%",
      },
      boxShadow: {
        custom: "1px 2px 4px 1px rgba(0, 0, 0, 0.08)",
        header: " -1px 4px 20px 14px rgba(0, 0, 0, 0.2)",
        button: "-1px 4px 2px 1px rgba(13,122,205,1)",
      },
      animation: {
        "animate-ltr": "animate 3s ease-out infinite ",
        "transition-width": "width 0.5s ease-in-out ",
      },
      keyframes: {
        animate: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        width: {
          "0%": { width: "0px" },
          "100%": { width: "100%" },
        },
      },
    },
  },
  plugins: [],
};
