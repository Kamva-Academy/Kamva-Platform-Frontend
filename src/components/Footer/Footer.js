import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { useTranslate } from 'react-redux-multilingual/lib/context';

import InstitutionCard from './InstitutionCard';

const Institutions = [
  {
    name: 'zharfaStudentSociety',
    img_src: process.env.PUBLIC_URL + '/zharfa.png',
    site_url: '',
  },
  {
    name: 'rastaScientificExtensiveSociety',
    img_src: process.env.PUBLIC_URL + '/Rasta-logo.png',
    site_url: '',
  },
];

const Footer = () => {
  const t = useTranslate();

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
              name={t(institution.name)}
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
