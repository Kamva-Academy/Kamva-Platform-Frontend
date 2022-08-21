import React from "react";
import { Grid } from "@mui/material";
import TeamWorkshopInfoCard from '../../components/Cards/TeamWorkshopInfo';


const TeamsTab = ({reqTeams, nonReqTeams, fsmId, teamsRequests, toggleStar}) => {

    return(
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
                  toggleStar={toggleStar}
                />
              </Grid>
            ))}
            {nonReqTeams?.map((team) => (
              <Grid container item xs={12} sm={6} md={4} key={team.id} alignItems='center' justifyContent='center'>
                <TeamWorkshopInfoCard
                  {...team}
                  teamId={team.id}
                  fsmId={fsmId}
                  toggleStar={toggleStar}
                />
              </Grid>
            ))}
          </Grid>
    )
}

export default TeamsTab;