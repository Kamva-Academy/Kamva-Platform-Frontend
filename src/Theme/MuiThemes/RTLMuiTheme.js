import { createMuiTheme } from '@material-ui/core';

import { Workshop } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const RTLMuiTheme = createMuiTheme({
  direction: 'rtl',
  ...theme(Workshop),
  typography
});

export default RTLMuiTheme;
