import { createMuiTheme } from '@material-ui/core';

import theme from './theme';
import typography from './typography';

const MuiTheme = createMuiTheme({
  ...theme,
  typography
});

export default MuiTheme;
