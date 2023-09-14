import { Box, Button, ButtonGroup, Grid, Paper } from '@mui/material';
import { makeStyles } from '@mui/styles'
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
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  getEventTeamsAction,
  getOneEventInfoAction,
} from 'redux/slices/events';

import Layout from 'components/template/GeneralLayout';
import DiscountCode from './DiscountCode';
import Info from './Info';
import RegistrationForm from './RegistrationForm';
import RegistrationReceipts from './RegistrationReceipts';
import Teams from './Teams';
import Workshops from './Workshops';

const tabs: { name: string, label: string, icon: any, component: any }[] = [
  {
    name: 'info',
    label: 'اطلاعات کلی',
    icon: InfoIcon,
    component: Info,
  },
  {
    name: 'registration-form',
    label: 'فرم ثبت‌نام',
    icon: HistoryEduIcon,
    component: RegistrationForm,
  },
  {
    name: 'registration-receipts',
    label: 'رسیدهای ثبت‌نام',
    icon: ConfirmationNumberIcon,
    component: RegistrationReceipts,
  },
  {
    name: 'discount-codes',
    label: 'کد تخفیف',
    icon: DiscountIcon,
    component: DiscountCode,
  },
  {
    name: 'teams',
    label: 'تیم‌ها',
    icon: GroupIcon,
    component: Teams,
  },
  {
    name: 'workshops',
    label: 'کارگاه‌ها',
    icon: ClassIcon,
    component: Workshops,
  },
];

const SECTIONS = {
  'info': 0,
  'registration-form': 1,
  'registration-receipts': 2,
  'discount-codes': 3,
  'teams': 4,
  'workshops': 5
}

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
  const { programId, section } = useParams();
  const [tabIndex, setTabIndex] = useState(SECTIONS[section]);
  const TabComponent = tabs[SECTIONS[section]].component;
  const navigate = useNavigate();

  useEffect(() => {
    getOneEventInfo({ programId });
  }, []);

  useEffect(() => {
    if (event?.registration_form) {
      getEventTeams({ registrationFormId: event?.registration_form });
    }
  }, [event?.registration_form]);

  return (
    <Layout>
      <Grid container spacing={2} direction="row" justifyContent="center">
        <Grid
          container
          item
          sm={3}
          xs={12}
          direction="column"
          justifyContent="flex-start">
          <Grid item>
            <ButtonGroup variant="outlined" orientation="vertical" color="primary" fullWidth>
              {tabs.map((tab, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setTabIndex(index)
                    navigate(`/program/${programId}/manage/${tabs[index].name}`)
                  }}
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
                to={`/program/${event?.id}`}
                startIcon={<ExitToAppIcon />}>
                {t('back')}
              </Button>
            </Grid>
          </Box>
        </Grid>
        <Grid item sm={9} xs={12} >
          <Paper elevation={3} sx={{ padding: '10px 20px' }}>
            {event?.registration_form &&
              <TabComponent registrationFormId={event.registration_form} />
            }
          </Paper>
        </Grid>
      </Grid>
    </Layout>
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
