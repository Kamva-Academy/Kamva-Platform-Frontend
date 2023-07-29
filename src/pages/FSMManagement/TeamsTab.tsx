import React from "react";
import { Grid } from "@mui/material";


const TeamsTab = ({ reqTeams, nonReqTeams }) => {

  return (
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
      })}>
      {reqTeams?.map((team) => (
        <Grid container item xs={12} sm={6} md={4} key={team.id} alignItems='center' justifyContent='center'>
          {team.component}
        </Grid>
      ))}
      {nonReqTeams?.map((team) => (
        <Grid container item xs={12} sm={6} md={4} key={team.id} alignItems='center' justifyContent='center'>
          {team.component}
        </Grid>
      ))}
    </Grid>
  )
}

export default TeamsTab;