/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2F6F6D',
          hover: '#285F5D',
        },
        accent: '#8B5E3C',
        bg: '#FEF9F5',
        text: {
          DEFAULT: '#1A1A1A',
          muted: '#6B7280',
        },
        border: '#E5E7EB',
        topbar: '#F7F7F7',
        card: '#FFFFFF',
        // 实际网站使用的粉色/米色系
        pink: {
          light: '#FFF5F5',
          DEFAULT: '#FFE5E5',
          dark: '#FFCCCC',
        },
        beige: {
          light: '#FEF9F5',
          DEFAULT: '#F5F0EB',
          dark: '#E8E0D8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica', 'Arial', 'system-ui', 'sans-serif'],
        cn: ['Noto Sans SC', '思源黑体', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '5': '24px',
        '6': '32px',
        '7': '48px',
        '8': '64px',
        '9': '96px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.06)',
        modal: '0 8px 30px rgba(0,0,0,0.12)',
      },
      maxWidth: {
        container: '1200px',
      },
    },
  },
  plugins: [],
}


