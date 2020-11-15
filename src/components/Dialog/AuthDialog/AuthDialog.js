import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
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
import { login } from '../../../redux/actions/account';
import { connect } from 'react-redux';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  rightImage: {
    background: `url(${process.env.PUBLIC_URL + '/auth.png'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
  leftContainer: {
    height: 300,
    padding: theme.spacing(2),
  },
  leftGrid: {
    height: '100%',
  },
  buttonProgress: {
    color: green[500],
  },
}));

function AuthDialog({ open, handelClose, login, isFetching }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const t = useTranslate();

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handelClose}>
      <form>
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
                  <TextField
                    label="آدرس ایمیل"
                    type="email"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    inputProps={{ className: 'ltr-input' }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="رمز عبور"
                    fullWidth
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    inputProps={{ className: 'ltr-input' }}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    onClick={() => login({ username: email, password })}
                    disabled={isFetching}
                    color="primary">
                    {isFetching ? (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    ) : (
                      t('login')
                    )}
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Grid>
          <Grid item sm={5} className={classes.rightImage}></Grid>
        </Grid>
      </form>
    </Dialog>
  );
}

const mapStateToProps = (state) => ({
  isFetching: state.account.isFetching,
});

export default connect(mapStateToProps, { login })(AuthDialog);
