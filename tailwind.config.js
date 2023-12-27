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
        'w1': '1px',
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
        '35px': '35px',
        '35p': '35%',
        '38': '38px',
        '40p': '40%',
        '40': '40px',
        '45': '45px',
        '50px': '50px',
        '55px': '55px',
        '58p': '58.33333333%;',
        '60px': '60px',
        '70': '70px',
        '72px': '72px',
        '80': '80px',
        '85p': '85%',
        '85px': '85px',
        '100': '100px',
        '120px': '120px',
        '150px': '150px',
        '190': '190px',
        '210px': '210px',
        'one': '1%',
        'three': '3%',
        'four': '4%',
      },
      width: {
        '16': '16%',
        '16per': '16.6666667%',
        'desk': '1240px',
        '41': '41.66666667%',
        '45p': '45%',
        '37': '37px',
        '50': '50%',
        '58per': '58.33333333%',
        '85px': '85px',
        '85per': '85%',
        '125': '125px',
        '130px': '130px',
        '140px': '140px',
        '170px': '170px',
        '200px': '200px'
      },
      height: {
        '4': '4px',
        '48vw': '48vw',
        '50px': '50px',
        '90vw': '90vw',
        '150px': '150px',
        '170px': '170px',
        '250px': '250px',
      },
      fontSize: {
        'small': '12px',
        'base': '14px',
        '18': '18px',
        '21': '21px',
        '22': '22px',
        '25': '25px',
        '30': '30px',
        '35': '35px',
        '45': '45px',
      },
      lineHeight: {
        'p-base': '22.7px'
      },
      backgroundImage: {
        'ourfleet-specialoffers': "url('/src/assets/images/our-fleet/special-offers.png')",
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
