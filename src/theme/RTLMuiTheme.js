import { createMuiTheme } from '@material-ui/core';
import typography from './typography';
import theme from './theme';

const RTLMuiTheme = createMuiTheme({
  direction: 'rtl',
  ...theme,
  typography
});

export default RTLMuiTheme;
