import { Button, Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  fullHeight: {
    minHeight: '100vh',
  },
}));

const Index = () => {
  const navigate = useNavigate();
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
                ثبت‌نام شما با موفقیت انجام شد!
              </Typography>
            </Grid>
            {/* <Grid item>
              <Button
                onClick={() => navigate("/events")}
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
