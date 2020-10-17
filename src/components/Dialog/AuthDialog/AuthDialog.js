import React from 'react';
import {
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useTranslate } from 'react-redux-multilingual/lib/context';

const useStyles = makeStyles((theme) => ({
  rightImage: {
    background: `url(${process.env.PUBLIC_URL + '/auth.png'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  leftContainer: {
    height: 350,
    padding: theme.spacing(2),
  },
  leftGrid: {
    height: '100%',
  },
}));

export default function AuthDialog({ open, handelClose }) {
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handelClose}>
      <Grid container>
        <Grid item sm={7}>
          <IconButton
            aria-label="close"
            onClick={handelClose}
            className={classes.closeIcon}>
            <CloseIcon />
          </IconButton>
          <Container className={classes.leftContainer}>
            <Grid
              container
              direction="column"
              justify="space-between"
              alignItems="stretch"
              className={classes.leftGrid}>
              <Grid item>
                <Typography component="h3" variant="h2" align="center">
                  ورود
                </Typography>
              </Grid>
              <Grid item>
                <TextField label="آدرس ایمیل" fullWidth variant="outlined" />
              </Grid>
              <Grid item>
                <Button fullWidth variant="contained" color="primary">
                  {t('login')}
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Grid>
        <Grid item sm={5} className={classes.rightImage}></Grid>
      </Grid>
    </Dialog>
  );
}
