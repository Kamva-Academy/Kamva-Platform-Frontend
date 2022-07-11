import { Button, ButtonGroup, Container, Grid, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import appendPreviousParams from '../utils/AppendPreviousParams';

const Index = () => {
  useEffect(() => {
    document.title = 'کاموا';
  }, [])

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
              بستر برگزاری رویداد و کارگاه آنلاین
            </Typography>
          </Grid>
          <Grid item>
            <ButtonGroup size="large" variant="contained" color="primary">
              <Button component={Link} to={appendPreviousParams("/login")}>
                ورود
              </Button>
              <Button component={Link} to={appendPreviousParams("/create_account")}>
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
          }} component={Link} to={appendPreviousParams("/about_us")}>
          درباره‌ی کاموا
        </Button>
      </Grid>
    </Container>
  );
};

export default Index;
