import { createTheme } from '@material-ui/core';

import { ZeroJourneyer } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const ZeroJourneyMuiTheme = createTheme({
  direction: 'rtl',
  ...theme(ZeroJourneyer),
  typography
});

export default ZeroJourneyMuiTheme;
