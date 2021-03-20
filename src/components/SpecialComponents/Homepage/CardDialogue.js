import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  Hidden,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '300px',
    padding: theme.spacing(2),
    overflowX: 'hidden',
  },
  image: (props) => ({
    backgroundImage: `url(${process.env.PUBLIC_URL}${props.image})`,
    backgroundSize: 'cover !important',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    boxShadow: '2px 2px 5px gray',
    height: 'inherit',
  }),
  text: {
    overFlowY: 'scroll'
  },
  description: {
    textAlign: 'left',
  }
}));

function CardDialogue({
  open,
  handleClose,
  name,
  post,
  image,
  description,
}) {

  const classes = useStyles({ image });

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose} style={{ overflow: 'hidden' }}>
      <Grid
        container
        className={classes.container}
        alignItems='center'
        justify='center'>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom variant="h4" align="center">
            {"«" + name + "»"}
          </Typography>
        </Grid >
        <Grid item container direction='column' xs={12} sm={8} spacing={1} justify='center' className={classes.text}>
          {
            description.map((paragraph, index) => (
              <Grid item key={index} >
                <Typography component="h4" variant="h6" gutterBottom className={classes.description}>
                  {paragraph}
                </Typography>
              </Grid>
            ))
          }
        </Grid>
        {/* <Hidden xsDown="true">
          <Grid sm={6} item className={classes.image}></Grid>
        </Hidden> */}
      </Grid>
    </Dialog >
  );
}


export default CardDialogue;