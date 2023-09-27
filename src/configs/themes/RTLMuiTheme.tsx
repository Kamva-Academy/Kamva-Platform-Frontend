import { createTheme } from '@mui/material';
import { Workshop } from './MuiVariables';
import theme from './theme';
import typography from './typography';
import iranyekanweblight from '../fonts/iranyekanweblight.woff';
import iranyekanwebthin from '../fonts/iranyekanwebthin.woff';
import iranyekanwebbold from '../fonts/iranyekanwebbold.woff';
import iranyekanwebregular from '../fonts/iranyekanwebregular.woff';
import iranyekanwebmedium from '../fonts/iranyekanwebmedium.woff';
import iranyekanwebextrabold from '../fonts/iranyekanwebextrabold.woff';
import iranyekanwebblack from '../fonts/iranyekanwebblack.woff';
import iranyekanwebextrablack from '../fonts/iranyekanwebextrablack.woff';


const RTLMuiTheme = createTheme({
  direction: 'rtl',
  ...theme(Workshop),
  typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: `

      @font-face {
        font-family: "Lalezar";
        src: url("https://cdn.fontcdn.ir/Fonts/Lalezar/148c72044161f7fdd874a7743f5402f15b04bc2b9a609d2734deb22057bef2d5.woff2") format("woff2");
        font-weight: 400;
        font-style: normal;
      }

      @font-face {
        font-family: iranyekan;
        font-display: fallback;
        font-style: normal;
        font-weight: 700;
        src: url(${iranyekanwebbold}) format('woff');
      }
      
      @font-face {
        font-family: iranyekan;
        font-display: fallback;
        font-style: normal;
        font-weight: 100;
        src: url(${iranyekanwebthin}) format('woff');
      }
      
      @font-face {
        font-family: iranyekan;
        font-display: fallback;
        font-style: normal;
        font-weight: 300;
        src: url(${iranyekanweblight}) format('woff');
      }
      
      @font-face {
        font-family: iranyekan;
        font-display: fallback;
        font-style: normal;
        font-weight: 400;
        src: url(${iranyekanwebregular}) format('woff');
      }
      
      @font-face {
        font-family: iranyekan;
        font-display: fallback;
        font-style: normal;
        font-weight: 500;
        src: url(${iranyekanwebmedium}) format('woff');
      }
      
      @font-face {
        font-family: iranyekan;
        font-display: fallback;
        font-style: normal;
        font-weight: 800;
        src: url(${iranyekanwebextrabold}) format('woff');
      }
      
      @font-face {
        font-family: iranyekan;
        font-display: fallback;
        font-style: normal;
        font-weight: 900;
        src: url(${iranyekanwebblack}) format('woff');
      }
      
      @font-face {
        font-family: iranyekan;
        font-display: fallback;
        font-style: normal;
        font-weight: 950;
        src: url(${iranyekanwebextrablack}) format('woff');
      }
      `,
    },
  },
});

export default RTLMuiTheme;
