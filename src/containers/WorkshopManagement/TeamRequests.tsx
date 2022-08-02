import { Grid, Tab, Tabs, Paper } from '@mui/material';
import React, { useEffect, useState, useRef, FC } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import TeamWorkshopInfoCard from '../../components/Cards/TeamWorkshopInfo';
import { getRequestSubscription } from '../../parse/mentor';
import {
  createRequestMentorAction,
  getRequestMentorAction,
  removeRequestMentorAction,
} from '../../redux/slices/events';

import { Team } from "../../types/models"

type TeamPropsType = {
  teamsRequests: string[],
  eventTeams: Team[],
  getRequestMentor: Function,
  createRequestMentor: Function,
  removeRequestMentor: Function,
}

const Teams: FC<TeamPropsType> = ({
  teamsRequests = [],
  eventTeams = [],
  getRequestMentor = undefined,
  createRequestMentor = undefined,
  removeRequestMentor = undefined,
}) => {
  const { fsmId } = useParams();
  const subscriptionRef = useRef(null);

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

  const reqTeams = eventTeams.filter(
    (team) => teamsRequests[team.id + '.' + fsmId]
  );
  const nonReqTeams = eventTeams.filter(
    (team) => !teamsRequests[team.id + '.' + fsmId]
  );

  return (
    <>
      <Grid container spacing={2}
        alignItems='stretch'
        justifyContent="center"
        sx={(theme) => ({
          height: '100%',
          justifyContent: 'space-between',
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

const mapStateToProps = (state) => {
  console.log(state.events)
  return {
    eventTeams: state.events.allEventTeams,
    teamsRequests: state.events.teamsRequests || {},
  }
};

export default connect(mapStateToProps, {
  getRequestMentor: getRequestMentorAction,
  createRequestMentor: createRequestMentorAction,
  removeRequestMentor: removeRequestMentorAction,
})(Teams);
