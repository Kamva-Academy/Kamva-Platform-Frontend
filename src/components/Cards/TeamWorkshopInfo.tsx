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
  Divider,
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
import { useNavigate, useParams } from 'react-router-dom'
import { Mentor } from '../../types/models';
import { stringToColor } from '../../utils/stringToColor'
import moment from 'moment-jalaali';
moment.loadPersian({ usePersianDigits: true })

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
  startProblemTime: string,
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
  mentorsInRoom = [{ name: 'iman alipour', id: 0 }, { name: 'alireza hashemi', id: 1 }, { name: 'x y', id: 2 }, { name: 'z p', id: 3 }],
  startProblemTime = "2022-08-03T12:39:30+04:30",
  teamLevel = 'مرحله sdfsadf asdf asdf asd fasd f ۴',
}) => {
  const startProblemTimeMoment: moment.Moment = moment(startProblemTime)
  const navigate = useNavigate()
  const { eventId, fsmId } = useParams();
  const [click, setClick] = useState(false);

  {/* this function redirects mentor to a teams page, this team could have requested mentor or not, if so, we use the
available playerId field, otherwise we fetch one team members Id and use it to access their page */}
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

    <Card /* main team card coomponent*/
      sx={{
        maxWidth: 300,
        marginTop: '0px',
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

      <Box> {/* this box is used to glue team header and members and name together so that when we use the attribute space-between stretch happends between level/time widget and members */}
        <Stack /* this stack holds the header of each teams card */
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
          {mentorsInRoom.length > 0 ?
            <Stack direction="row" sx={{ justifyContent: 'start', alignItems: "center" }}>
              <Typography sx={{ fontSize: "8px", margin: '10px' }}>
                {`همیاران: `}
              </Typography>
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
            </Stack>
            :
            <Typography align='right' sx={{ ":dir": 'rtl', fontSize: "8px", margin: '10px' }}>
              {`همیاری بالای سر این تیم نیست`}
            </Typography>
          }
        </Stack>

        <CardActionArea disabled> {/* this action holds each cards name and members */}
          <CardContent sx={{ paddingBottom: '0px' }}>
            <Typography gutterBottom variant="h3">
              {name}
            </Typography>
            <Grid container direction="row" justifyContent="start">
              {members.length > 0 ? <ul>
                {members.map((member) => (
                  (member?.first_name || member?.last_name) ?
                    <li key={member.id}>
                      <Typography>
                        {`${member?.first_name} ${member?.last_name}`}
                      </Typography>
                    </li>
                    :
                    <li key={member.id}>
                      <Typography>
                        {'بی‌نام'}
                      </Typography>
                    </li>
                ))}
              </ul>
                : <Typography>
                  {'این تیم هیچ عضوی ندارد.'}
                </Typography>}
            </Grid>
          </CardContent>
        </CardActionArea>
      </Box>


      <CardActions sx={{ paddingTop: '0px' }}> {/* this action hols the redirect button and also the time and level widgets*/}
        <Grid container direction="column" spacing={1}>
          <Grid item
            sx={(theme) => ({
              justifyContent: 'end',
            })}
          >
            <Divider sx={{ margin: '15px auto 15px auto' }}></Divider>
            {startProblemTimeMoment && <Stack direction={'row'} sx={{ justifyContent: "space-between", fontSize: '10px', padding: '0 0 10px 0', alignItems: 'center' }}> {/* this stack is for time chip and the level team is in */}
              <Box>
                {teamLevel ? `گام: ${teamLevel}` : 'تیم هنوز وارد هیچ گامی نشده است'}
              </Box>
              <Tooltip title={'زمان حضور تیم در این گام'} arrow>
                <span>
                  <Button disabled sx={{ padding: 0 }}>
                    <TimeChip startTime={startProblemTimeMoment} />
                  </Button>
                </span>
              </Tooltip>
            </Stack>}
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
                سرزدن به تیم
              </Button>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};


type TimeChipPropsType = {
  startTime: moment.Moment
}

/* the time chip is the chip that has the timer in it that shows how long the team has been on current problem
we use the useEffect to initiate the timeInterval and later on we return the destructor to control the 'out'sideEffects*/
const TimeChip: FC<TimeChipPropsType> = (props) => {
  const [elapsedTime, setElapsedTime] = useState(moment.utc(moment.duration(moment().diff(props.startTime)).asMilliseconds()).format('hh:mm:ss'))
  useEffect(() => {
    const changeInterval = setInterval(() => { setElapsedTime(moment.utc(moment.duration(moment().diff(props.startTime)).asMilliseconds()).format('hh:mm:ss')) }, 1000)
    return (
      () => clearInterval(changeInterval)
    )
  }, []);
  return (
    <Chip
      variant="outlined"
      icon={<AccessTimeIcon />}
      label={elapsedTime}
      size="small"
      sx={{ fontSize: '10px', marginLeft: '10px', alignSelf: 'center', justifySelf: 'end' }}
    />
  )
}

const mapStateToProps = (state, ownProps) => ({
  playerIdFromRedux: state.events.playerId[ownProps.teamId],
  token: state.account.token,
});

export default connect(mapStateToProps, {
  deleteRequestMentor: deleteRequestMentorAction,
  getPlayerFromTeam: getPlayerFromTeamAction,
})(TeamWorkshopInfo);
