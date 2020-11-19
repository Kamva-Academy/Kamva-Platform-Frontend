import React, { useEffect, useState } from 'react';
import { getWorkshopTeams } from '../../../redux/actions/mentor';
import { connect } from 'react-redux';
import TeamCard from '../../Cards/TeamCard';
import { Grid, Tab, Tabs } from '@material-ui/core';

function Teams({ workshops, teams, getWorkshopTeams }) {
  const [workshopNumber, setWorkshopNumber] = useState(0);

  useEffect(() => {
    getWorkshopTeams({ fsmId: workshops[workshopNumber].id });
  }, [getWorkshopTeams, workshops, workshopNumber]);

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Tabs
          value={workshopNumber}
          onChange={(e, val) => setWorkshopNumber(val)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto">
          {workshops.map((workshop) => (
            <Tab label={workshop.name} />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={2} alignItems="center" justify="center">
          {teams.map((team) => {
            return (
              <Grid item xs={12} sm={6} md={4}>
                <TeamCard
                  team={team}
                  fsmId={workshops[workshopNumber].id}
                  fsmFirstState={workshops[workshopNumber].first_state}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => ({
  workshops: state.mentor.workshops,
  teams: state.mentor.teams,
});
export default connect(mapStateToProps, { getWorkshopTeams })(Teams);
