import {
  Button,
  ButtonGroup,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';

import {
  deleteRequestMentorAction,
  getPlayerFromTeamAction,
} from '../../redux/slices/events';
import { useNavigate, useParams } from 'react-router-dom';

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
  token,
  playerId,
  playerIdFromRedux,
  deleteRequestMentor,
  getPlayerFromTeam,
}) => {
  const classes = useStyles();
  const navigate = useNavigate()
  const { eventId, fsmId } = useParams();
  const [click, setClick] = useState(false);

  const redirect = () => {
    setClick(true);
    if (!playerId) {
      getPlayerFromTeam({ teamId, id: fsmId, token });
    }
  };
  useEffect(() => {
    if ((playerId || playerIdFromRedux) && click) {
      setClick(false);
      navigate(`/event/${eventId}/workshop/${fsmId}?playerId=${playerId || playerIdFromRedux}`);
    }
  }, [playerId, click, playerIdFromRedux])

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
                  console.log('i was clicked in pasokh be darkhast')
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

const mapStateToProps = (state, ownProps) => ({
  playerIdFromRedux: state.events.playerId[ownProps.teamId],
  token: state.account.token,
});

export default connect(mapStateToProps, {
  deleteRequestMentor: deleteRequestMentorAction,
  getPlayerFromTeam: getPlayerFromTeamAction,
})(TeamInfo);
