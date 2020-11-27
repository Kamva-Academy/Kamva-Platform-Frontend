import {
  Grid,
  IconButton,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme) => ({
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
}))

const InstitutionCard = ({ img_src, name, site_url }) => {
  const classes = useStyles();
  return (
    <Grid item xs={5} sm={3}>
      <Tooltip
        title={name}
        placement="bottom"
      >
        <IconButton as='a' href={site_url}>
          <img
            className={classes.img}
            src={img_src}
            alt={name}
          />
        </IconButton>
      </Tooltip>
    </Grid>
  )
}

export default InstitutionCard;