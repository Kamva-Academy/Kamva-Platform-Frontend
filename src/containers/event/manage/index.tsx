import {Box, Button, ButtonGroup, Grid, Paper} from '@mui/material';
import {makeStyles} from '@mui/styles'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GroupIcon from '@mui/icons-material/Group';
import ClassIcon from '@mui/icons-material/Class';
import DiscountIcon from '@mui/icons-material/Discount';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InfoIcon from '@mui/icons-material/Info';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

import React, { useEffect, useState, FC } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link, useParams } from 'react-router-dom';
import {getEventTeamsAction, getOneEventInfoAction} from '../../../redux/slices/events';

import LayoutForMentors from '../../LayoutForMentors';
import DiscountCode from './DiscountCode';
import Info from './Info';
import RegistrationForm from './RegistrationForm';
import RegistrationReceipts from './RegistrationReceipts';
import Teams from './Teams';
import Workshops from './Workshops';

const useStyles = makeStyles((theme) => ({
  rightBox: {
    padding: 2,
  },
}));

const tabs:{label: string, icon: any, component: any}[] = [
  {
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: Info,
  },
  {
    label: 'فرم ثبت‌نام',
    icon: HistoryEduIcon,
    component: RegistrationForm,
  },
  {
    label: 'رسیدهای ثبت‌نام',
    icon: ConfirmationNumberIcon,
    component: RegistrationReceipts,
  },
  {
    label: 'کد تخفیف',
    icon: DiscountIcon,
    component: DiscountCode,
  },
  {
    label: 'تیم‌ها',
    icon: GroupIcon,
    component: Teams,
  },
  {
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: Workshops,
  },
];

type EventType = {
  getOneEventInfo: Function,
  getEventTeams: Function,
  event: any
}

const Event: FC<EventType> = ({
  getOneEventInfo,
  getEventTeams,
  event
}) => {
  const t = useTranslate();
  const { eventId } = useParams();
  const [tabIndex, setTabIndex] = useState(0);
  const classes = useStyles();

  useEffect(() => {
    getOneEventInfo({ eventId });
  }, []);

  useEffect(() => {
    if (event?.registration_form) {
      getEventTeams({ registrationFormId: event?.registration_form });
    }
  }, [event]);

  const TabComponent = tabs[tabIndex].component;

  return (
    <LayoutForMentors>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid
          container
          item
          sm={3}
          xs={12}
          direction="column"
          justifyContent="flex-start">
          <Grid item>
            <ButtonGroup variant="outlined"orientation="vertical" color="primary" fullWidth>
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
                to={`/event/${event?.id}`}
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={9} xs={12} >
          <Paper elevation={3} className={classes.rightBox} sx={{padding: '10px 20px'}}>
            <TabComponent registrationFormId={event?.registration_form} />
          </Paper>
        </Grid>
      </Grid>
    </LayoutForMentors>
  );
};

const mapStateToProps = (state) => ({
  event: state.events.event,
});

export default connect(
  mapStateToProps,
  {
    getOneEventInfo: getOneEventInfoAction,
    getEventTeams: getEventTeamsAction,
  }
)(Event);
