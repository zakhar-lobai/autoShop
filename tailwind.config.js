module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, 
  theme: {
    extend: {
      colors: {
        'yellow': '#D8B074',
        'greyc': '#959595',
        'primary': '#D8B074',
        'black': '#000',
        'base': '#222222',
        'box-grey': '#3E3E3E',
        'btn-hover': '#5E5E5E',
        'form-bg': '#515151',
      },
      borderWidth: {
        'w05': '0.5px',
      },
      spacing: {
        '1': '1px',
        '5': '5px',
        '9': '9%',
        '10': '10px',
        '12': '12px',
        '15': '15px',
        '18': '18px',
        '20': '20px',
        '25': '25px',
        '30': '30px',
        '34p': '34%',
        '35p': '35%',
        '38': '38px',
        '40p': '40%',
        '40': '40px',
        '45': '45px',
        '50px': '50px',
        '55px': '55px',
        '58p': '58.33333333%;',
        '70': '70px',
        '80': '80px',
        '85p': '85%',
        '100': '100px',
        '190': '190px',
        '210px': '210px',
        'one': '1%',
        'three': '3%',
        'four': '4%',
      },
      width: {
        '16per': '16.6666667%',
        'desk': '1240px',
        '41': '41.66666667%',
        '45p': '45%',
        '37': '37px',
        '50': '50%',
        '85px': '85px',
        '125': '125px',
        '130px': '130px',
      },
      height: {
        '4': '4px',
        '150px': '150px',
      },
      fontSize: {
        'base': '14px',
        '18': '18px',
        '21': '21px',
        '22': '22px',
        '25': '25px',
        '35': '35px',
      },
      lineHeight: {
        'p-base': '22.7px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.underline-custom': {
          textDecoration: 'none',
          position: 'relative',
        },
        '.underline-custom:hover': {
          color: '#D8B074',
          transition: 'width 0.5s ease',
        },
        '.underline-custom::before': {
          content: "''",
          position: 'absolute',
          width: '0%',
          height: '5px',
          background: '#D8B074', // Color of the underline
          bottom: '-10px', // Adjust this value for positioning
          left: '50%', // Start from the center
          transform: 'translateX(-50%)',
          transition: 'width 0.5s ease', // Adjust the transition speed if needed
        },
        '.underline-custom:hover::before': {
          width: '100%', // Expand to the sides
        },
      };

      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
}
