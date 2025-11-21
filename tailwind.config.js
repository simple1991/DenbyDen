/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'xs': '360px',   // 小屏手机
      'sm': '640px',   // 大屏手机/小平板
      'md': '768px',   // 平板
      'lg': '1024px',  // 小桌面
      'xl': '1280px',  // 桌面
      '2xl': '1536px', // 大桌面
    },
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
      fontSize: {
        // 针对1080p屏幕优化字体大小
        'xs-mobile': ['0.75rem', { lineHeight: '1.5' }],    // 12px
        'sm-mobile': ['0.875rem', { lineHeight: '1.5' }],  // 14px
        'base-mobile': ['1rem', { lineHeight: '1.6' }],     // 16px
        'lg-mobile': ['1.125rem', { lineHeight: '1.6' }],   // 18px
      },
    },
  },
  plugins: [],
}


