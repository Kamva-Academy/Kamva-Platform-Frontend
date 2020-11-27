import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import AuthDialog from '../components/Dialog/AuthDialog/AuthDialog';

const useStyles = makeStyles((theme) => ({
  centerItems: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  paper: {
    background: '#f8f1f1',
    padding: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(4),
  },
}));

function Survey({ isLoggedIn }) {
  const classes = useStyles();
  const [authDialogOpen, setAuthDialogOpen] = useState();
  return (
    <>
      <Container className={classes.centerItems} maxWidth="sm">
        <Paper className={classes.paper}>
          {isLoggedIn ? (
            <>
              <Typography component="h3" variant="h2" gutterBottom>
                برای کمک به برگزاری بهتر رویدادهای بعدی، لطفا در این نظرسنجی
                کوتاه شرکت کنید.
              </Typography>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                className={classes.button}
                as="a"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfdRqjzxFBTpx9FjYP9UY4VwvaJZ-d8tqupWKOi1v3IG-qxJw/viewform?usp=sf_link"
                target="_blank">
                <Typography variant="h4">شرکت در نظرسنجی</Typography>
              </Button>
            </>
          ) : (
            <>
              <Typography component="h3" variant="h2" gutterBottom>
                برای شرکت در نظرسنجی ابتدا وارد شوید
              </Typography>
              <Button
                color="primary"
                variant="contained"
                size="large"
                fullWidth
                className={classes.button}
                onClick={() => setAuthDialogOpen(true)}>
                <Typography variant="h4">ورود</Typography>
              </Button>
            </>
          )}
        </Paper>
      </Container>
      <AuthDialog
        open={authDialogOpen}
        handleClose={() => setAuthDialogOpen(false)}
      />
    </>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: !!state.account.token,
});

export default connect(mapStateToProps)(Survey);
