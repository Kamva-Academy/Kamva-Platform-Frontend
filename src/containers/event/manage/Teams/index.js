import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import TeamInfoCard from '../../../../components/Cards/TeamInfo';
import {
  addUserToTeamAction,
  createRequestMentorAction,
  createTeamAction,
  getRequestMentorAction,
  removeRequestMentorAction,
} from '../../../../redux/slices/events';
import AddTeamsViaCSV from './AddTeamsViaCSV';

function Teams({
  addUserToTeam,
  createTeam,
  event,

  allEventTeams,
}) {
  const { fsmId } = useParams();
  const [newTeamName, setNewTeamName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState('');

  const doCreateTeam = () => {
    createTeam({ name: newTeamName, registration_form: event?.registration_form })
  }

  const doAddUserToTeam = () => {
    addUserToTeam({ teamId: selectedTeamId, phone_number: userPhoneNumber })
  }

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography variant='h4'>
            {'ساخت تیم'}
          </Typography>
        </Grid>
        <Grid item container xs spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              value={newTeamName}
              size="small"
              fullWidth
              variant="outlined"
              label="نام تیم"
              onChange={(e) => { setNewTeamName(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              disabled={!newTeamName}
              fullWidth
              variant="contained"
              color="primary"
              onClick={doCreateTeam}>
              {'بساز'}
            </Button>
          </Grid>
        </Grid>

        <AddTeamsViaCSV />

        <Grid item xs={12}>
          <Typography variant='h4'>
            {'افزودن کاربر به تیم'}
          </Typography>
        </Grid>
        <Grid item container xs spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              value={userPhoneNumber}
              size="small"
              fullWidth
              variant="outlined"
              label="شماره تلفن"
              inputProps={{ className: 'ltr-input' }}
              onChange={(e) => { setUserPhoneNumber(e.target.value) }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl size="small" fullWidth variant="outlined">
              <InputLabel>تیم</InputLabel>
              <Select defaultValue="" onChange={(e) => setSelectedTeamId(e.target.value)} label="تیم">
                {allEventTeams?.map((team) => (
                  <MenuItem key={team.id} value={team.id}>
                    {team.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              disabled={!userPhoneNumber || !selectedTeamId}
              fullWidth
              variant="contained"
              color="primary"
              onClick={doAddUserToTeam}>
              {'بیافزا'}
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='h4'>
            {'تیم‌ها'}
          </Typography>
        </Grid>
        {allEventTeams?.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team.id}>
            <TeamInfoCard
              {...team}
              teamId={team.id}
              fsmId={fsmId}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  allWorkshops: state.events.myWorkshops || [],
  allEventTeams: state.events.allEventTeams || [],
  requestTeams: state.events.requestTeams || {},
  event: state.events.event,
});

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
  createTeam: createTeamAction,
  addUserToTeam: addUserToTeamAction,
})(Teams);
