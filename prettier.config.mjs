/** @type {import("prettier").Config} */
const config = {
  trailingComma: "all",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn", "cva"],
};

export default config;
