import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Hidden,
  Paper,
} from '@mui/material';
import ClassIcon from '@mui/icons-material/Class';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { useHistory } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from 'tss-react/mui';

import {
  getEventTeamsAction,
  getOneEventInfoAction,
} from '../../redux/slices/events';
import {
  getOneWorkshopsInfoAction,
} from '../../redux/slices/workshop2';
import Layout from '../Layout';
import Design from './Design';
import Edges from './Edges';
import IndividualRequests from './IndividualRequests';
import Info from './Info';
import TeamRequests from './TeamRequests';

const useStyles = makeStyles()((theme) => {
  return{
  rightBox: {
    padding: theme.spacing(2),
  },
}
});

const Event = ({
  getEventTeams,
  getOneEventInfo,
  getOneWorkshopsInfo,
  workshop,
  event,
}) => {
  const { classes } = useStyles();
  const t = useTranslate();
  const { fsmId, eventId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState([
    {
      label: 'اطلاعات کلی',
      icon: '',
      component: Info,
    },
    {
      label: 'طراحی',
      icon: '',
      component: Design,
    },
    {
      label: 'یال‌ها',
      icon: '',
      component: Edges,
    },
  ])

  const TabComponent = tabs[tabIndex].component;

  useEffect(() => {
    getOneEventInfo({ eventId });
    getOneWorkshopsInfo({ fsmId });
  }, []);

  useEffect(() => {
    console.log('effect ran')
    console.log(workshop)
    if (workshop?.fsm_learning_type == 'Supervised') {
      console.log('supervised')
      if (workshop?.fsm_p_type == 'Team' && !tabs.some(tab => tab.label == 'درخواست‌های تیمی')) {
        console.log('team...')
        setTabs([
          ...tabs,
          {
            label: 'درخواست‌های تیمی',
            icon: '',
            component: TeamRequests,
          },
        ])
      } else if (workshop?.fsm_p_type == 'Individual' && !tabs.some(tab => tab.label == 'درخواست‌های فردی')) {
        setTabs([
          ...tabs,
          {
            label: 'درخواست‌های فردی',
            icon: '',
            component: IndividualRequests,
          },
        ])
      }
    }
  }, [workshop])

  useEffect(() => {
    if (event?.registration_form) {
      getEventTeams({ registrationFormId: event?.registration_form });
    }
  }, [event]);

  return (
    <Layout>
      <Grid container spacing={2} direction="row" justify="center">
        <Grid container item sm={3} xs={12} direction="column" justify="flex-start">
          <Grid item>
            <ButtonGroup orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => setTabIndex(index)}
                  variant={tabIndex == index && 'contained'}
                  startIcon={tab.icon && <tab.icon />}>
                  {tab.label}
                </Button>
              ))}
            </ButtonGroup>
          </Grid>
          <Box mt={1}>
            <Grid item>
              <Button
                fullWidth
                variant='outlined'
                color="primary"
                component={Link}
                to={`/event/${eventId}/`}
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper elevation={3} className={classes.rightBox}>
            <TabComponent {...tabs[tabIndex].props} />
          </Paper>
        </Grid>
      </Grid>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  event: state.events.event,
  workshop: state.workshop.workshop,
});

export default connect(
  mapStateToProps,
  {
    getEventTeams: getEventTeamsAction,
    getOneEventInfo: getOneEventInfoAction,
    getOneWorkshopsInfo: getOneWorkshopsInfoAction,
  }
)(Event);
