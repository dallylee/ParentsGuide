/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography';

export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                pastel: {
                    1: '#cfe8ff', // blue
                    2: '#ffe3d8', // coral
                    3: '#e6ffd8', // green
                    4: '#f5e8ff', // purple
                },
                bg: '#f7faf9',
            },
            boxShadow: {
                'soft': '0 6px 16px rgba(31,41,55,0.08)',
                'glow': '0 0 24px var(--glow)',
            },
            fontFamily: {
                sans: ['system-ui', 'sans-serif'],
            }
        },
    },
    plugins: [
        typography(),
    ],
}
