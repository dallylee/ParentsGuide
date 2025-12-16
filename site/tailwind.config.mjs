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
                sans: ['Lato', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
                serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
            },
            typography: (theme) => ({
                DEFAULT: {
                    css: {
                        fontFamily: theme('fontFamily.sans').join(', '),
                        fontSize: '15px',
                        fontWeight: '300',
                        h1: {
                            fontFamily: theme('fontFamily.serif').join(', '),
                            fontWeight: '400',
                        },
                        h2: {
                            fontFamily: theme('fontFamily.serif').join(', '),
                            fontWeight: '400',
                        },
                        h3: {
                            fontFamily: theme('fontFamily.serif').join(', '),
                            fontWeight: '400',
                        },
                        h4: {
                            fontFamily: theme('fontFamily.serif').join(', '),
                            fontWeight: '400',
                        },
                    },
                },
            }),
        },
    },
    plugins: [
        typography(),
    ],
}
