import { createTheme, adaptV4Theme } from '@mui/material';

import { Workshop } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const MuiTheme = createTheme(adaptV4Theme({
  ...theme(Workshop),
  typography
}));

export default MuiTheme;
