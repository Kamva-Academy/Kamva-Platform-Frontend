import {
  Breakpoint,
  Theme,
  useTheme,
} from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

type BreakpointOrNull = Breakpoint | null;

const useWidth = () => {
  // todo
  // const theme: Theme = useTheme();
  // const keys: Breakpoint[] = [...theme.breakpoints.keys].reverse();
  // return (
  //   keys.reduce((output: BreakpointOrNull, key: Breakpoint) => {
  //     const matches = useMediaQuery(theme.breakpoints.up(key));
  //     return !output && matches ? key : output;
  //   }, null) || 'xs'
  // );
  return 'xs';
};

export default useWidth;
