import {
  Button,
  ButtonGroup,
  Container,
  Grid,
  Hidden,
  makeStyles,
  Paper,
} from '@material-ui/core';
import ClassIcon from '@material-ui/icons/Class';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import Articles from '../components/SpecialComponents/MentorPage/Articles';
import MentorWorkshops from '../components/SpecialComponents/MentorPage/MentorWorkshops';
import Teams from '../components/SpecialComponents/MentorPage/Teams';
import { getWorkshopTeams } from '../redux/actions/mentor';
import {
  getAllArticles,
  getAllWorkshops,
  getUnreadNotifications,
} from '../redux/actions/mentor';

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

const tabs = [
  {
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: MentorWorkshops,
  },
  {
    label: 'مقالات',
    icon: ClassIcon,
    component: Articles,
  },
  {
    label: 'تیم‌ها',
    icon: GroupIcon,
    component: Teams,
  },
  {
    label: 'درخواست‌ها',
    component: Teams,
    props: {
      mode: 'notifications',
    },
  },
];

const MentorPage = ({
  workshops,
  teams,
  getAllWorkshops,
  getAllArticles,
  getUnreadNotifications,
  getWorkshopTeams,
}) => {
  const t = useTranslate();
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      getUnreadNotifications();
    }, 10000);
    return () => clearInterval(interval);
  }, [getUnreadNotifications]);

  useEffect(() => {
    workshops.forEach((workshop) => {
      if (!teams[workshop.id]) {
        getWorkshopTeams({ fsmId: workshop.id });
      }
    });
  }, [getWorkshopTeams, workshops, teams]);

  useEffect(() => {
    getAllWorkshops();
    getAllArticles();
  }, [getAllWorkshops, getAllArticles]);

  const TabComponent = tabs[tabIndex].component;

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
              <ButtonGroup orientation="vertical" color="primary" fullWidth>
                {tabs.map((tab, index) => (
                  <Button
                    key={index}
                    onClick={() => setTabIndex(index)}
                    variant={tabIndex === index && 'contained'}
                    startIcon={tab.icon && <tab.icon />}>
                    {tab.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Grid>
            <Hidden xsDown>
              <Grid item fullWidth>
                <Button
                  fullWidth
                  color="primary"
                  component={Link}
                  to="/"
                  startIcon={<ExitToAppIcon />}>
                  {t('back')}
                </Button>
              </Grid>
            </Hidden>
          </Grid>
          <Grid item sm={9} xs={12}>
            <Paper elevation={3} classNames={classes.rightBox}>
              <TabComponent {...tabs[tabIndex].props} />
            </Paper>
          </Grid>
          <Hidden smUp>
            <Grid item fullWidth>
              <Button fullWidth color="primary" startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops,
  teams: state.mentor.teams,
});

export default connect(mapStateToProps, {
  getAllWorkshops,
  getUnreadNotifications,
  getWorkshopTeams,
  getAllArticles,
})(MentorPage);
