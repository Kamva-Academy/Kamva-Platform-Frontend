import { createTheme, adaptV4Theme } from '@mui/material';

import { Workshop } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const RTLMuiTheme = createTheme(adaptV4Theme({
  direction: 'rtl',
  ...theme(Workshop),
  typography
}));

export default RTLMuiTheme;
