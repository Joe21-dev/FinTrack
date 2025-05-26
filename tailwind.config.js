/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EBF5FF',
          100: '#D6EBFF',
          200: '#ADD6FF',
          300: '#84C1FF',
          400: '#5DACFF',
          500: '#4A90E2', // primary
          600: '#3B78C0',
          700: '#2C609F',
          800: '#1E487E',
          900: '#0F305D',
        },
        secondary: {
          50: '#E0F7F6',
          100: '#C2EEEC',
          200: '#A3E5E2',
          300: '#85DCD8',
          400: '#67D3CE',
          500: '#4DB6AC', // secondary
          600: '#3E958D',
          700: '#2F746E',
          800: '#1F534F',
          900: '#103230',
        },
        accent: {
          50: '#FFFDE7',
          100: '#FFF9C4',
          200: '#FFF59D',
          300: '#FFF176', // accent
          400: '#FFEE58',
          500: '#FFEB3B',
          600: '#FDD835',
          700: '#FBC02D',
          800: '#F9A825',
          900: '#F57F17',
        },
        background: {
          light: '#F5F5F5',
          dark: '#121212',
        },
        text: {
          primary: '#333333',
          secondary: '#666666',
          light: '#FFFFFF',
        },
        success: {
          500: '#4CAF50',
        },
        warning: {
          500: '#FF9800',
        },
        error: {
          500: '#F44336',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'title': '24px',
        'subtitle': '18px',
        'body': '16px',
        'small': '14px',
        'button': '16px',
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '20px',
        '6': '24px',
        '8': '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },
      boxShadow: {
        'card': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'dropdown': '0 2px 15px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '6px',
      }
    },
  },
  plugins: [],
};