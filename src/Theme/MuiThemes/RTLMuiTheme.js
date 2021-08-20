import { createTheme } from '@material-ui/core';

import { Workshop } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const RTLMuiTheme = createTheme({
  direction: 'rtl',
  ...theme(Workshop),
  typography
});

export default RTLMuiTheme;
