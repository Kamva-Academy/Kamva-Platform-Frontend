import {
  Grid,
  Typography,
} from '@mui/material';
import React from 'react';

const Footer = ({ Media }) => {
  return (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      spacing={2}
    >
      <Grid item>
        <Media />
      </Grid>
      <Grid item justifyContent='center'>
        <Typography align='center'>
          تمامی حقوق برای کارسوق ریاضی مهرگان محفوظ است. ۱۳۹۹-۱۴۰۰
        </Typography>
      </Grid>
    </Grid>
  );
}


export default Footer;