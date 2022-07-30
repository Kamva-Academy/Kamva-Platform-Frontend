import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  makeStyles,
  Typography,
} from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';
import React from 'react';
import { connect } from 'react-redux';

import {
  deleteRequestMentorAction,
  getPlayerFromTeamAction,
} from '../../redux/slices/events2';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
  },
  icon: {
    textAlign: 'center',
  },
});

const TeamInfo = ({
  name,
  members,
  teamId,
  fsmId,
  token,
  playerId,
  deleteRequestMentor,
  getPlayerFromTeam,
}) => {
  const classes = useStyles();

  const redirect = () => {
    if (!playerId) {
      getPlayerFromTeam({ teamId, id: fsmId, token });
    } else {
      window.open(`https://kamva.academy/join/${playerId}/${token}/`);
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea disabled>
        <CardContent>
          {playerId && <NotificationsActive color="primary" />}
          <Typography gutterBottom variant="h3" align="center">
            {name}
          </Typography>
          <Grid container direction="row" justify="center">
            <ol>
              {members.map((member) => (
                <li key={member.id}>
                  <Typography>
                    {`${member?.first_name} ${member?.last_name}`}
                  </Typography>
                </li>
              ))}
            </ol>
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Grid container direction="column" spacing={1}>
          <Grid item>
            {playerId ? (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => {
                  deleteRequestMentor({ teamId, fsmId });
                  redirect();
                }}>
                پاسخ به درخواست
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={redirect}>
                مشاهده
              </Button>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  token: state.account.token,
});

export default connect(mapStateToProps, {
  deleteRequestMentor: deleteRequestMentorAction,
  getPlayerFromTeam: getPlayerFromTeamAction,
})(TeamInfo);
