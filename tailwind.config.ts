import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                orbitron: ["var(--font-orbitron)"], // Nome da classe Tailwind
                inter: ["var(--font-inter)"],
            },
        },
    },
    plugins: [],
};

export default config;