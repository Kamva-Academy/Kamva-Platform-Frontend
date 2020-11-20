import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  makeStyles,
  Grid,
  Paper,
  ButtonGroup,
  Hidden,
  Badge,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import ClassIcon from '@material-ui/icons/Class';
import { connect } from 'react-redux';
import {
  getAllWorkshops,
  getUnreadNotifications,
} from '../redux/actions/mentor';
import { Link } from 'react-router-dom';
import MentorWorkshops from '../components/SpecialComponents/MentorPage/MentorWorkshops';
import Teams from '../components/SpecialComponents/MentorPage/Teams';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  rightBox: {
    padding: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MentorPage = ({ getAllWorkshops, getUnreadNotifications }) => {
  const classes = useStyles();
  const [tabNumber, setTabNumber] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      getUnreadNotifications();
    }, 10000);
    return () => clearInterval(interval);
  }, [getUnreadNotifications]);

  useEffect(() => {
    getAllWorkshops();
  }, [getAllWorkshops]);

  return (
    <>
      <Container className={classes.container}>
        <Grid container spacing={2} direction="row" justify="center">
          <Grid
            container
            item
            sm={3}
            xs={12}
            direction="column"
            justify="space-between">
            <Grid item>
              <ButtonGroup
                orientation="vertical"
                variant="contained"
                color="primary"
                fullWidth>
                <Button
                  onClick={() => setTabNumber(0)}
                  startIcon={<ClassIcon />}>
                  کارگاه‌ها
                </Button>
                <Button
                  onClick={() => setTabNumber(1)}
                  startIcon={<GroupIcon />}>
                  تیم‌ها
                </Button>
                <Button onClick={() => setTabNumber(2)}>
                  <Badge badgeContent={'!'} color="secondary">
                    درخواست‌ها
                  </Badge>
                </Button>
              </ButtonGroup>
            </Grid>
            <Hidden xsDown>
              <Grid item fullWidth>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  component={Link}
                  to="/"
                  startIcon={<ExitToAppIcon />}>
                  بازگشت
                </Button>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Paper elevation={3} classNames={classes.rightBox}>
              {tabNumber === 0 && <MentorWorkshops />}
              {tabNumber === 1 && <Teams />}
            </Paper>
          </Grid>
          <Hidden smUp>
            <Grid item fullWidth>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                startIcon={<ExitToAppIcon />}>
                بازگشت
              </Button>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </>
  );
};

export default connect(null, {
  getAllWorkshops,
  getUnreadNotifications,
})(MentorPage);
