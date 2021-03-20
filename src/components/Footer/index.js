import {
  Grid,
  Typography,
} from '@material-ui/core';
import React from 'react';

const Footer = ({ Media }) => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <Media />
      </Grid>
      <Grid item justify='center'>
        <Typography align='center'>
          تمامی حقوق برای کارسوق ریاضی مهرگان محفوظ است. ۱۳۹۹-۱۴۰۰
        </Typography>
      </Grid>
    </Grid>
  );
}


export default Footer;