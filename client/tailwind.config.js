module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", "sans-serif"],
        manrope: ["var(--font-manrope)", "sans-serif"],
        archive: ['"Archive Black"', "sans-serif"],
      },
    },

    colors: {
      purpleDark: "#A371F4",
      purpleLight: "#9171FF",
      bgDark: "rgba(6, 5, 10, 0.32)",
      ash: "#C7C7C7",
      deepBlack: "#0A0813",
      lightGreen: "#DCFCE7",
      faintWhite: "#DBEAFE",
      darkAsh: "#8A8F98",
      purpleLightier: "#F3E8FF",
      indigo: "#291769",
      green: "#22C55E",
    },
  },
  plugins: [],
};
