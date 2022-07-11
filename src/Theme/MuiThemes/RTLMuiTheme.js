import { createTheme } from '@mui/material';

import { Workshop } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const RTLMuiTheme = createTheme({
  direction: 'rtl',
  ...theme(Workshop),
  typography
});

export default RTLMuiTheme;
