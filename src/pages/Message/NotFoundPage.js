import { Button, ButtonGroup, Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import appendPreviousParams from 'utils/AppendPreviousParams';

const NotFoundPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = 'کاموا - خطای ۴۰۴';
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
            🧶 خطای ۴۰۴ 🧶🐈
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3" align="center">
                کاموای این رنگی رو تموم کردیم؛ اما رنگای دیگه‌ای داریم.
            </Typography>
          </Grid>
          <Grid item>
            <ButtonGroup size="large" variant="contained" color="primary">
              <Button onClick={() => navigate(appendPreviousParams("/"))}>
                صفحه اصلی
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFoundPage;
