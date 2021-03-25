import { Grid, IconButton, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}));

const InstitutionCard = ({ img_src, name, site_url }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={6} sm={3}>
        <IconButton as="a" href={site_url}>
          <img className={classes.img} src={img_src} alt={name} />
        </IconButton>
        <Typography align="center">{name}</Typography>
      </Grid>
    </>
  );
};

export default InstitutionCard;
