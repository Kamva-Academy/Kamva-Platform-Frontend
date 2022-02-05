import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';

import appendPreviousParams from '../utils/AppendPreviousParams';

const useStyles = makeStyles(() => ({
  fullHeight: {
    minHeight: '100vh',
  },
}));

const Index = () => {
  const classes = useStyles();

  return (
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
              <Button component={Link} to={appendPreviousParams("/about_us")}>
                درباره‌ی کاموا
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Index;
