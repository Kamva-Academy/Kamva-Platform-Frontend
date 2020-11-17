import React from 'react';
import Institutions from './Institutions';
import InstitutionCard from './InstitutionCard'
import {
  Grid,
} from '@material-ui/core';

const Footer = () => {
  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={2}
    >
      <Grid container item direction='row' justify='center' sm={6}>
        {Institutions.map((institution) => {
          return (
            <InstitutionCard
              img_src={institution.img_src}
              name={institution.name}
              site_url={institution.site_url}
            />
          )
        })}
      </Grid>
      <Grid item xs={12} justify='center' alignItems='center'>
        به امید این که سال آینده، احتیاجی به سایت برای برگزاری ای‌لیمپیاد نباشد :)
      </Grid>
    </Grid>
  );
}


export default Footer;