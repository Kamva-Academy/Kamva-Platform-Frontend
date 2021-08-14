import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
          justify="center"
          alignItems="center"
          className={classes.fullHeight}>
          <Grid
            direction="column"
            item
            container
            spacing={2}
            alignItems="center"
            justify="space-around"
            xs={12}
            md={6}>
            <Grid item>
              <Typography gutterBottom variant="h1" align='center'>ثبت‌نام شما با موفقیت انجام شد!</Typography>
            </Grid>
            <Grid item>
              <Button component={Link} to='/events' variant='contained' color='primary'>بازگشت</Button>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Index;
