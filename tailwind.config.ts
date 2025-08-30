import type { Config } from "tailwindcss";
import twAnimateCss from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./src/app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [twAnimateCss],
};

export default config;
