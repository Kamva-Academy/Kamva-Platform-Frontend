import { directionType } from '../../types/global';
import MuiTheme from './MuiTheme';
import RTLMuiTheme from './RTLMuiTheme';

const selectTheme = (direction: directionType) => {
  if (direction === 'rtl') {
    return RTLMuiTheme;
  } else {
    return MuiTheme;
  }
};

export default selectTheme;
