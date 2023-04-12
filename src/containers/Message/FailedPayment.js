import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const FailedPayment = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: '100vh' }}>
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
              ثبت‌نام شما ناموفق بود :(
            </Typography>
            <Typography variant="h4" align="center">
              چنانچه هزینه‌ای از حساب شما کسر شده، به پاسخگوی سایت اطلاع دهید تا بررسی کنیم.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={() => navigate(-1)}
              variant="contained"
              color="primary">
              حله
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FailedPayment;
