import '../Theme/Styles/OurTeam.css';

import { Container, Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import ResponsiveAppBar from '../components/Appbar/ResponsiveAppBar';
import OurTeamMemberCard from '../components/SpecialComponents/Homepage/components/OurTeamMemberCard';
import { getLandingData } from '../redux/actions/landing';

const teams = ['کمیته برگزاری', 'فنی', 'علمی', 'رسانه', 'بازی', 'تست'];

function OurTeam({ members = [], getLandingData }) {
  useEffect(() => {
    getLandingData();
    document.getElementById('tab0').checked = true;
  }, []);

  return (
    <>
      <ResponsiveAppBar mode="LANDING" />
      <Container maxWidth="md" style={{ marginTop: 80 }}>
        <div className="our-team-page">
          <div className="tab-wrap">
            {teams.map((team, index) => (
              <>
                <input
                  type="radio"
                  id={'tab' + index}
                  name="tabGroup1"
                  className="tab"
                />
                <label htmlFor={'tab' + index}>{team}</label>
              </>
            ))}
            {teams.map((team) => (
              <div className="tab__content" key={team}>
                <Grid container spacing={2} justify="center">
                  {members
                    .filter((member) => member.team === team)
                    .map((member, index) => (
                      <Grid
                        container
                        item
                        key={index}
                        xs={6}
                        sm={4}
                        md={3}
                        alignItems="flex-start"
                        justify="center">
                        <OurTeamMemberCard member={member} />
                      </Grid>
                    ))}
                </Grid>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}

const mapStatesToProps = (state) => ({
  members: state.landing.members,
});

export default connect(mapStatesToProps, { getLandingData })(OurTeam);
