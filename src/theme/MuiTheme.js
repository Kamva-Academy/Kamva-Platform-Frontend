import { createMuiTheme } from '@material-ui/core';
import typography from './typography';
import theme from './theme';

const MuiTheme = createMuiTheme({
  ...theme,
  typography
});

export default MuiTheme;
