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
import { Link, useNavigate, useParams } from 'react-router-dom';
import('../../types/models')
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
import { Workshop, EventType } from '../../types/models';
import Mentors from './Mentors';

type EventPropsType = {
  getEventTeams: Function,
  getOneEventInfo: Function,
  getOneWorkshopsInfo: Function,
  workshop: Workshop,
  event: EventType,
}

const SECTIONS = {
  'info': 0,
  'design': 1,
  'edges': 2,
  'mentors': 3,
  'requests': 4,
}

const EventComponent: FC<EventPropsType> = ({
  getEventTeams,
  getOneEventInfo,
  getOneWorkshopsInfo,
  workshop,
  event,
}) => {
  const t = useTranslate();
  const navigate = useNavigate();
  const { fsmId, eventId, section } = useParams();
  const [tabIndex, setTabIndex] = useState(SECTIONS[section]);
  const [tabs, setTabs] = useState<{ name: string, label: string; icon: any; component: ConnectedComponent<any, any> | FC<any>; props?: any }[]>([
    {
      name: 'info',
      label: 'اطلاعات کلی',
      icon: InfoIcon,
      component: Info,
    },
    {
      name: 'design',
      label: 'طراحی',
      icon: DesignServicesIcon,
      component: Design,
    },
    {
      name: 'edges',
      label: 'یال‌ها',
      icon: TimelineIcon,
      component: Edges,
    },
    {
      name: 'mentors',
      label: 'همیارها',
      icon: PersonIcon,
      component: Mentors,
    }
  ])

  useEffect(() => {
    if (workshop && workshop.id == fsmId && workshop.fsm_learning_type == 'Supervised') {
      if (workshop.fsm_p_type == 'Team') {
        setTabs([
          ...tabs,
          {
            name: 'requests',
            label: 'درخواست‌ها',
            icon: QuestionAnswerIcon,
            component: TeamRequests,
          },
        ])
      } else if (workshop.fsm_p_type == 'Individual') {
        setTabs([
          ...tabs,
          {
            name: 'requests',
            label: 'درخواست‌ها',
            icon: QuestionAnswerIcon,
            component: IndividualRequests,
          },
        ])
      }
    }
  }, [workshop])
  const TabComponent = tabs[tabIndex]?.component;

  useEffect(() => {
    getOneEventInfo({ eventId });
    getOneWorkshopsInfo({ fsmId });
  }, []);

  useEffect(() => {
    if (event && event.registration_form) {
      getEventTeams({ registrationFormId: event.registration_form });
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
                  onClick={() => {
                    setTabIndex(index)
                    navigate(`/event/${eventId}/workshop/${fsmId}/manage/${tabs[index].name}`)
                  }
                  }
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
          <Paper elevation={3} sx={{ padding: 2 }} >
            {TabComponent ? <TabComponent {...tabs[tabIndex]?.props} /> : <></>}
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

export default connect(mapStateToProps, {
  getEventTeams: getEventTeamsAction,
  getOneEventInfo: getOneEventInfoAction,
  getOneWorkshopsInfo: getOneWorkshopsInfoAction,
})(EventComponent);
