import { createTheme } from '@mui/material';

import { Workshop } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const MuiTheme = createTheme({
  ...theme(Workshop),
  typography
});

export default MuiTheme;
