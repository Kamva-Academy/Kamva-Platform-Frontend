import {
  Box,
  Button,
  ButtonGroup,
  Grid,
  Paper,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import React, { FC, useEffect, useState } from 'react';
import { connect, ConnectedComponent } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useParams } from 'react-router-dom';
import('../../types/models')
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import TimelineIcon from '@mui/icons-material/Timeline';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import {
  getEventTeamsAction,
  getOneEventInfoAction,
} from '../../redux/slices/events';
import {
  getOneWorkshopsInfoAction,
} from '../../redux/slices/workshop';
import Layout from '../../containers/Layout';
import Design from './Design';
import Edges from './Edges';
import IndividualRequests from './IndividualRequests';
import Info from './Info';
import TeamRequests from './TeamRequests';
import { Workshop, Event } from '../../types/models';
import Mentors from './Mentors';


type EventPropsType = {
  getEventTeams: Function,
  getOneEventInfo: Function,
  getOneWorkshopsInfo: Function,
  workshop: Workshop,
  event: Event,
}

const EventComponent: FC<EventPropsType> = ({
  getEventTeams,
  getOneEventInfo,
  getOneWorkshopsInfo,
  workshop,
  event,
}) => {
  const t = useTranslate();
  const { fsmId, eventId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const [tabs, setTabs] = useState<{ label: string; icon: any; component: ConnectedComponent<any, any> | FC<any>; props?: any }[]>([
    {
      label: 'اطلاعات کلی',
      icon: InfoIcon,
      component: Info,
    },
    {
      label: 'طراحی',
      icon: DesignServicesIcon,
      component: Design,
    },
    {
      label: 'یال‌ها',
      icon: TimelineIcon,
      component: Edges,
    },
    {
      label: 'همیارها',
      icon: PersonIcon,
      component: Mentors,
    },
  ])

  const TabComponent = tabs[tabIndex].component;
  useEffect(() => {
    getOneEventInfo({ eventId });
    getOneWorkshopsInfo({ fsmId });
  }, []);

  useEffect(() => {
    if (workshop?.fsm_learning_type == 'Supervised') {
      if (workshop?.fsm_p_type == 'Team' && !tabs.some(tab => tab.label == 'درخواست‌های تیمی')) {
        setTabs([
          ...tabs,
          {
            label: 'درخواست‌های تیمی',
            icon: QuestionAnswerIcon,
            component: TeamRequests,
          },
        ])
      } else if (workshop?.fsm_p_type == 'Individual' && !tabs.some(tab => tab.label == 'درخواست‌های فردی')) {
        setTabs([
          ...tabs,
          {
            label: 'درخواست‌های فردی',
            icon: QuestionAnswerIcon,
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
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid container item sm={3} xs={12} direction="column" justifyContent="flex-start">
          <Grid item>
            <ButtonGroup variant="outlined" orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => setTabIndex(index)}
                  variant={tabIndex == index ? 'contained' : 'outlined'}
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
          <Paper elevation={3} sx={{ padding: 2 }}>
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
)(EventComponent);
