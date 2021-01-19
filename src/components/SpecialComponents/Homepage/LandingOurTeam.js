import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useTranslate } from 'react-redux-multilingual/lib/context';
import { Link } from 'react-router-dom';

import { getLandingData } from '../../../redux/actions/landing';
import getRandomSubarray from '../../../utils/getRandomSubarray';
import OurTeamMemberCard from './components/OurTeamMemberCard';

const useStyles = makeStyles((theme) => ({
  section6: {
    padding: theme.spacing(4, 2),
    backgroundColor: '#99b898',
    color: 'white',
  },
  moreButton: {
    margin: theme.spacing(2, 'auto', 0),
    textAlign: 'center',
    display: 'table',
  },
}));

function LandingOurTeam({ members = [], count = 4, getLandingData }) {
  const classes = useStyles();
  const t = useTranslate();

  useEffect(() => {
    getLandingData();
  }, []);

  if (members.length === 0) return <></>;

  return (
    <section className={classes.section6}>
      <Typography component="h2" variant="h2" gutterBottom align="center">
        {t('eventTeam')}
      </Typography>
      <Grid container spacing={4} justify="center">
        {getRandomSubarray(members, count).map((member, index) => (
          <Grid
            container
            item
            xs={6}
            sm={3}
            key={index}
            alignItems="flex-start"
            justify="center">
            <OurTeamMemberCard member={member} />
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.moreButton}
        component={Link}
        to="/our_team">
        {t('seeMore')}
      </Button>
    </section>
  );
}

const mapStatesToProps = (state) => ({
  members: state.landing.members,
});

export default connect(mapStatesToProps, { getLandingData })(LandingOurTeam);
