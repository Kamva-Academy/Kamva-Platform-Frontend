import { Button, ButtonGroup, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import appendPreviousParams from '../utils/AppendPreviousParams';

const Landing = ({ token }) => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'کاموا';
  }, [])

  useEffect(() => {
    if (token) {
      navigate('/events');
    }
  }, [token])

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: '100vh',
        }}>
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
            <Typography variant="h1" align="center">
              کاموا
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h2" align="center">
              پتلفرم برگزاری دوره‌های آنلاین
            </Typography>
          </Grid>
          <Grid item>
            <ButtonGroup size="large" variant="contained" color="primary">
              <Button onClick={() => navigate(appendPreviousParams("/login"))}>
                ورود
              </Button>
              <Button onClick={() => navigate(appendPreviousParams("/create-account"))}>
                ثبت‌نام
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Button size="large" variant="contained" color="primary"
          sx={{
            position: 'fixed',
            bottom: 20,
            left: 20,
          }} onClick={() => navigate(appendPreviousParams("/about-us"))}>
          درباره‌ی کاموا
        </Button>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
});

export default connect(mapStateToProps)(Landing);
