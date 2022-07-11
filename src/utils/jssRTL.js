import jssPreset from '@mui/styles/jssPreset';
import { create } from 'jss';
import rtl from 'jss-rtl';

export default create({ plugins: [...jssPreset().plugins, rtl()] });
