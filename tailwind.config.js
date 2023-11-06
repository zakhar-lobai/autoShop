module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        'yellow': '#D8B074',
        'greyc': '#959595',
      },
      borderWidth: {
        'w05': '0.5px',
      },
      spacing: {
        '1': '1px',
        '10': '10px',
        '15': '15px',
        '20': '20px',
        '30': '30px',
        '45': '45px',
        '100': '100px',
        'one': '1%',
        'three': '3%',
        'four': '4%',
      },
      width: {
        'desk': '1240px',
        '41': '41.66666667%'
      },
      fontSize: {
        'base': '14px',
      },
      lineHeight: {
        'p-base': '22.7px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
