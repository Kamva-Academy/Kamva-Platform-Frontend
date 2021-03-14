import { createMuiTheme } from '@material-ui/core';

import { Workshop } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const MuiTheme = createMuiTheme({
  ...theme(Workshop),
  typography
});

export default MuiTheme;
