import {
  Button,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  fullHeight: {
    minHeight: '100vh',
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className={classes.fullHeight}>
          <Grid
            direction="column"
            item
            container
            spacing={2}
            alignItems="center"
            justifyContent="space-around"
            xs={12}
            md={6}>
            <Grid item>
              <Typography gutterBottom variant="h1" align="center">
                ثبت‌نام شما موفق نبود :(
              </Typography>
              <Typography variant="h4" align="center">
                چنانچه هزینه‌ای از حساب شما کسر شده، به ما بگویید.
              </Typography>
            </Grid>
            {/* <Grid item>
              <Button
                component={Link}
                to="/events"
                variant="contained"
                color="primary">
                بازگشت
              </Button>
            </Grid> */}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
