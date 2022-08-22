import { Tab, Box, Tabs, Typography, Grid } from '@mui/material';
import React, { useEffect, useRef, FC, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import { getRequestSubscription } from '../../parse/mentor';
import {
  createRequestMentorAction,
  getRequestMentorAction,
  removeRequestMentorAction,
} from '../../redux/slices/events';

import { Team } from "../../types/models";
import TeamsTab from './TeamsTab';

const Teams: FC<TeamPropsType> = ({
  teamsRequests = [],
  eventTeams = [],
  getRequestMentor = undefined,
  createRequestMentor = undefined,
  removeRequestMentor = undefined,
}) => {
  const { fsmId } = useParams();
  const subscriptionRef = useRef(null);
  const [starredTeams, setStarredTeams] = useState([])
  const [teams, setTeams] = useState([...eventTeams])
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    setStarredTeams(JSON.parse(localStorage.getItem('starredTeams')) || [])
  }, [])

  useEffect(() => {
    const subscribe = async () => {
      await getRequestMentor();
      const subscription = await getRequestSubscription();
      subscription.on('create', (requestMentor) => {
        const playerId = requestMentor.get('playerId');
        const teamId = requestMentor.get('teamId');
        const fsmId = requestMentor.get('fsmId');
        createRequestMentor({ playerId, teamId, fsmId });
      });
      subscription.on('delete', (requestMentor) => {
        const teamId = requestMentor.get('teamId');
        const fsmId = requestMentor.get('fsmId');
        removeRequestMentor({
          teamId,
          fsmId,
        });
      });
      subscriptionRef.current = subscription;
    }
    subscribe()
    return () => {
      subscriptionRef.current?.unsubscribe();
    };
  }, []);



  const toggleStar = (teamId: String) => {
    if (starredTeams.indexOf(teamId) !== -1) {
      setStarredTeams((prevArr) => prevArr.filter(id => id !== teamId))
    } else {
      setStarredTeams((prevArr) => [...prevArr, teamId])
    }
  }


  useEffect(() => {
    localStorage.setItem('starredTeams', JSON.stringify(starredTeams))
    setTeams([...eventTeams].map(team => starredTeams.indexOf(team.id) === -1 ? { ...team, isStarred: false } : { ...team, isStarred: true }))
  }, [eventTeams, starredTeams])

  const reqTeams = teams.filter(
    (team) => teamsRequests[team.id + '.' + fsmId]).sort((a, b) => {
    if (!isNaN(parseInt(a.name)) && !isNaN(parseInt(b.name)) && parseInt(b.name) !== parseInt(a.name)){
      return parseInt(a.name) - parseInt(b.name)
    }
    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
  });

  const nonReqTeams = teams.filter(
    (team) => !teamsRequests[team.id + '.' + fsmId]).sort((a, b) => {
    if (!isNaN(parseInt(a.name)) && !isNaN(parseInt(b.name)) && parseInt(b.name) !== parseInt(a.name)){
      return parseInt(a.name) - parseInt(b.name)
    }
    return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
  })

  return (
    <>
      <Grid container spacing={2}
        alignItems='stretch'
        justifyContent="center"
        sx={(theme) => ({
          height: '100%',
          justifyContent: 'start',
          [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            marginRight: "0px",
          },
        })}
      >
        {reqTeams?.map((team) => (
          <Grid container item xs={12} sm={6} md={4} key={team.id} alignItems='center' justifyContent='center'
          >
            <TeamWorkshopInfoCard
              {...team}
              teamId={team.id}
              fsmId={fsmId}
              playerId={
                teamsRequests[team.id + '.' + fsmId]
              }
            />
          </Grid>
        ))}
        {nonReqTeams?.map((team) => (
          <Grid container item xs={12} sm={6} md={4} key={team.id} alignItems='center' justifyContent='center'>
            <TeamWorkshopInfoCard
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

const mapStateToProps = (state) =>
({
  eventTeams: state.events.allEventTeams,
  teamsRequests: state.events.teamsRequests || {},
});

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
})(Teams);


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type TeamPropsType = {
  teamsRequests: string[],
  eventTeams: Team[],
  getRequestMentor: Function,
  createRequestMentor: Function,
  removeRequestMentor: Function,
}
