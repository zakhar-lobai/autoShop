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
      },
      borderWidth: {
        'w05': '0.5px',
      },
      spacing: {
        '1': '1px',
        '5': '5px',
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
        '41': '41.66666667%',
        '37': '37px',
      },
      fontSize: {
        'base': '14px',
        '25': '25px',
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
