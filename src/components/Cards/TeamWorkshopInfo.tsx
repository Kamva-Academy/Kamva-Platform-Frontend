import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import AccessTimeIcon from '@mui/icons-material/AccessTime'

import {
  deleteRequestMentorAction,
  getPlayerFromTeamAction,
} from '../../redux/slices/events';
import { useNavigate, useParams } from 'react-router-dom';
import { Mentor } from '../../types/models';
import { stringToColor } from '../../utils/stringToColor'

type TeamWorkshopInfoPropsType = {
  name: string,
  members: any[],
  teamId: number,
  token: string,
  playerId: number,
  playerIdFromRedux: number,
  deleteRequestMentor: Function,
  getPlayerFromTeam: Function,
  mentorsInRoom: Mentor[],
  timeSpentOnProblem: String,
  teamLevel: String
}

const TeamWorkshopInfo: FC<TeamWorkshopInfoPropsType> = ({
  name,
  members,
  teamId,
  token,
  playerId,
  playerIdFromRedux,
  deleteRequestMentor,
  getPlayerFromTeam,
  mentorsInRoom = [{ id: 1, name: "Alireza Hashemi" }, { id: 2, name: "Erfan Moeini" }, { id: 3, name: "Sadegh Salimi" }, { id: 0, name: "Iman Aliour" }],
  timeSpentOnProblem = '۲ دقیقه',
  teamLevel = 'مرحله ۴',
}) => {
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
    <Card
      sx={{
        maxWidth: 300,
        height: '100%',
        width: '100%',
        padding: '0px !important',
        backgroundColor: 'rgb(255, 255, 255, 0.94)',
        fontSize: '1rem',
        textDecoration: 'none',
        overflow: 'hidden',
        boxShadow: '0 0 1px 0rem rgba(0, 0, 0, 0.5)',
        transition: 'transform 0.1s ease-in-out',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        '&:hover': {
          transform: 'translateY(-0.1rem) scale(1.01)',
          boxShadow: '0 0.5em 1rem -1rem rgba(2, 2, 2, 2.5)',
        },
      }}
    >

      <Stack
        direction="row"
        sx={{
          padding: "10px",
          background: '#eee',
          height: "40px",
          display: 'flex',
          justifyContent: "space-between",
          alignItems: 'center'
        }}
      >
        {playerId ? <NotificationsActive sx={{ animation: "bellRing 1.4s infinite", width: "40px" }} color="primary" /> : <Box />}
        {mentorsInRoom.length > 0 &&
          <AvatarGroup
            max={3}
            sx={{
              justifySelf: 'center',
              '& .MuiAvatar-root': { width: 26, height: 26, fontSize: 12, backgroundColor: "#0088aa" },
            }}
          >
            {mentorsInRoom.map((mentor: Mentor) =>
              <Tooltip key={mentor.id} title={mentor.name} arrow>
                <Avatar
                  sx={{
                    backgroundColor: `${stringToColor(mentor.name)} !important`,
                  }}
                  alt={mentor.name}
                  src={mentor.profilePicturePath || '/margbarmuimargbarmui'} />
              </Tooltip>
            )}
          </AvatarGroup>
        }
      </Stack>
      <CardActionArea disabled>
        <CardContent>
          <Typography gutterBottom variant="h3" align="center">
            {name}
          </Typography>
          <Grid container direction="row" justifyContent="center">
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
          <Grid item
            sx={(theme) => ({
              justifyContent: 'end',
            })}
          >
            <Stack direction={'row'} sx={{justifyContent: "space-between", fontSize: '8px', padding: '10px', alignItems: 'center'}}>
              <Box>
                {teamLevel}
              </Box>
              <Chip
                variant="outlined"
                icon={<AccessTimeIcon />}
                label={timeSpentOnProblem}
                size="small"
                sx={{fontSize: 'inherit'}}
              />
            </Stack>
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

const mapStateToProps = (state, ownProps) => ({
  playerIdFromRedux: state.events.playerId[ownProps.teamId],
  token: state.account.token,
});

export default connect(mapStateToProps, {
  deleteRequestMentor: deleteRequestMentorAction,
  getPlayerFromTeam: getPlayerFromTeamAction,
})(TeamWorkshopInfo);
