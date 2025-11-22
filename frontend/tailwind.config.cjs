module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', // blue-600
          600: '#2563EB',
          700: '#1D4ED8'
        },
        accent: '#06b6d4', // teal-ish
        muted: '#6b7280'
      },
      borderRadius: {
        lg: '12px',
        xl: '16px'
      },
      boxShadow: {
        soft: '0 6px 18px rgba(16,24,40,0.06)',
        card: '0 6px 20px rgba(16,24,40,0.08)'
      }
    }
  },
  plugins: [],
};
