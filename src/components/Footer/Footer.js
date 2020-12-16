import { Grid, Typography } from '@material-ui/core';
import React from 'react';

import InstitutionCard from './InstitutionCard';
import Institutions from './Institutions';

const Footer = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}>
      <Grid container item direction="row" justify="space-evenly" sm={6}>
        {Institutions.map((institution, index) => {
          return (
            <InstitutionCard
              key={index}
              img_src={institution.img_src}
              name={institution.name}
              site_url={institution.site_url}
            />
          );
        })}
      </Grid>
      <Grid item xs={12} justify="center">
        <Typography align="center">
          «به راه بادیه رفتن به از نشستن باطل / و گر مراد نیابم به قدر وسع
          بکوشم»
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
