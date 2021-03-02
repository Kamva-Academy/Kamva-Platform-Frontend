import { createMuiTheme } from '@material-ui/core';

import { ZeroDay } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const ZeroDayMuiTheme = createMuiTheme({
  direction: 'rtl',
  ...theme(ZeroDay),
  typography
});

export default ZeroDayMuiTheme;
