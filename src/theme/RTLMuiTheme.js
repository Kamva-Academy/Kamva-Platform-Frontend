import { createMuiTheme } from '@material-ui/core';

import theme from './theme';
import typography from './typography';

const RTLMuiTheme = createMuiTheme({
  direction: 'rtl',
  ...theme,
  typography
});

export default RTLMuiTheme;
