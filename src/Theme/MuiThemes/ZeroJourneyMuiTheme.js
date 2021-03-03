import { createMuiTheme } from '@material-ui/core';

import { ZeroJourney } from '../MuiVariables';
import theme from '../theme';
import typography from '../typography';

const ZeroJourneyMuiTheme = createMuiTheme({
  direction: 'rtl',
  ...theme(ZeroJourney),
  typography
});

export default ZeroJourneyMuiTheme;
