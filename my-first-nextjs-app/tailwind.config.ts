import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#E59500',
        secondary: '#10B981',
        background: {
          light: '#E2E8F0',
          dark: '#1C1917',
        },
        text: {
          light: '#1C1917',
          dark: '#E2E8F0',
        },
        heading: {
          light: '#1C1917', 
          dark: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Roboto', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
