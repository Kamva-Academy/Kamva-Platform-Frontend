import { jssPreset } from '@material-ui/core/styles';
import { create } from 'jss';
import rtl from 'jss-rtl';

export default create({ plugins: [...jssPreset().plugins, rtl()] });
