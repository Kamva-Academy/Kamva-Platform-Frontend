import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  Box
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

function Teams({
  addUserToTeam,
  createTeam,
  event,

  allEventTeams,
}) {
  const { fsmId } = useParams();
  const [newTeamName, setNewTeamName] = useState('');
  const [username, setUserName] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState('');

  const doCreateTeam = () => {
    createTeam({ name: newTeamName, registration_form: event?.registration_form })
  }

  const doAddUserToTeam = () => {
    addUserToTeam({ teamId: selectedTeamId, username })
  }

  return (
    <>
      <Grid container spacing={2} margin='-8px' marginBottom='30px'>
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

        <Box width='100%' height='30px'></Box>
        <Divider width='100%'></Divider>
        <Box width='100%' height='10px'></Box>

        <Grid item xs={12}>
          <Typography variant='h4'>
            {'افزودن کاربر به تیم'}
          </Typography>
        </Grid>
        <Grid item container xs spacing={1}>
          <Grid item xs={12} sm={4}>
            <TextField
              value={username}
              size="small"
              fullWidth
              variant="outlined"
              label="نام کاربری"
              inputProps={{ className: 'ltr-input' }}
              onChange={(e) => { setUserName(e.target.value) }}
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
              disabled={!username || !selectedTeamId}
              fullWidth
              variant="contained"
              color="primary"
              onClick={doAddUserToTeam}>
              {'بیافزا'}
            </Button>
          </Grid>
        </Grid>

        <Box width='100%' height='30px'></Box>
        <Divider width='100%'></Divider>
        <Box width='100%' height='10px'></Box>

        <Grid item xs={12}>
          <Typography variant='h4'>
            {'تیم‌ها'}
          </Typography>
        </Grid>
        <Grid container spacing={2}
          alignItems='stretch'
          justifyContent="center"
          sx={(theme) => ({
            height: '100%',
            marginTop: '4px',
            justifyContent: 'start',
            [theme.breakpoints.down('sm')]: {
              justifyContent: 'center',
              marginRight: "0px",
            },
          })}
        >
          {allEventTeams?.slice().sort((a, b) => {
            if (!isNaN(parseInt(a.name)) && !isNaN(parseInt(b.name)) && parseInt(b.name) !== parseInt(a.name)) {
              return parseInt(a.name) - parseInt(b.name)
            }
            return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
          }).map((team) => (
            <Grid container item xs={12} sm={6} md={4} key={team.id} alignItems='center' justifyContent='center'>
              <TeamInfoCard
                {...team}
                teamId={team.id}
                fsmId={fsmId}
                chatRoom={team.chat_room}
              />
            </Grid>
          ))}
        </Grid>
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
