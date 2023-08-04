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
  SvgIcon,
  IconButton,
} from '@mui/material';
import { NotificationsActive } from '@mui/icons-material';
import React, { FC, useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import {
  deleteRequestMentorAction,
  getPlayerFromTeamAction,
} from 'redux/slices/events';
import { useNavigate, useParams } from 'react-router-dom'
import { Mentor } from 'types/models';
import { stringToColor } from 'utils/stringToColor'
import { getTeamStateSubscription, getTeamState } from 'parse/team';
import { e2p } from 'utils/translateNumber';
import {
  announceMentorDeparture, getMentorsInRoom,
  getMentorsInRoomSubscription
} from 'parse/mentorsInRoom';
var moment = require('moment');

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
  teamStage: String,
  isStarred: Boolean,
  toggleStar: Function
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
  isStarred,
  toggleStar,
}) => {
  const { eventId, fsmId } = useParams();
  const [click, setClick] = useState(false);
  const stateChangeSubscriberRef = useRef(null);
  const mentorsInRoomSubscriberRef = useRef(null);
  const [teamEnterTimeToState, setTeamEnterTimeToState] = useState('')
  const [currentStateName, setCurrentStateName] = useState('')
  const [mentorsInRoom, setMentorsInRoom] = useState([]);
  const [showStarAnimation, setShowStarAnimation] = useState(false)


  useEffect(() => setShowStarAnimation(false), [])

  // useEffect(() => {
  //   const subscribeOnMentorArrival = async () => {
  //     const mentorsInRoom = await getMentorsInRoom(teamId)
  //     await checkForOfflineMentors();
  //     setMentorsInRoom(mentorsInRoom);
  //     const subscriber = await getMentorsInRoomSubscription(teamId);
  //     subscriber.on('create', async (newState) => {
  //       if (newState.get('uuid') === teamId) {
  //         setMentorsInRoom(await getMentorsInRoom(teamId));
  //       }
  //     });
  //     subscriber.on('update', async (newState) => {
  //       if (newState.get('uuid') === teamId) {
  //         setMentorsInRoom(await getMentorsInRoom(teamId))
  //       }
  //     });
  //     mentorsInRoomSubscriberRef.current = subscriber;
  //   }
  //   subscribeOnMentorArrival();
  //   return (() => {
  //     mentorsInRoomSubscriberRef.current?.unsubscribe();
  //   })
  // }, [])

  const checkForOfflineMentors = async () => {
    for (let i = 0; i < mentorsInRoom.length; i++) {
      if (Math.abs(moment.duration(moment().diff(moment(mentorsInRoom[i].get('MentorLastUpdated'), 'HH:mm:ss'))).asMilliseconds()) > 20000) {
        await announceMentorDeparture(mentorsInRoom[i].get('uuid'), mentorsInRoom[i].get('MentorId'))
      }
    }
  }

  // useEffect(() => {
  //   let updateInterval
  //   if (mentorsInRoom?.length > 0) {
  //     updateInterval = setInterval(checkForOfflineMentors, 10000)
  //   }

  //   return (() => {
  //     if (updateInterval) {
  //       clearInterval(updateInterval)
  //     }
  //   })
  // }, [mentorsInRoom])

  useEffect(() => {
    const subscribeOnStateChange = async () => {
      const state = await getTeamState(teamId);
      if (!state) {
        return
      };
      setCurrentStateName(state.get('currentStateName'))
      setTeamEnterTimeToState(state.get('teamEnterTimeToState'))
      const subscriber = await getTeamStateSubscription();
      subscriber.on('create', (newState) => {
        if (newState.get('uuid') === teamId) {
          const currentStageNameTmp = newState.get('currentStateName');
          const teamEnterTimeToStateTmp = moment()
          setCurrentStateName(currentStageNameTmp)
          setTeamEnterTimeToState(teamEnterTimeToStateTmp)
        }
      });
      subscriber.on('update', (newState) => {
        if (newState.get('uuid') === teamId) {
          const currentStageNameTmp = newState.get('currentStateName');
          const teamEnterTimeToStateTmp = moment()
          setCurrentStateName(currentStageNameTmp)
          setTeamEnterTimeToState(teamEnterTimeToStateTmp)
        }
      });
      stateChangeSubscriberRef.current = subscriber;
    }
    subscribeOnStateChange()

    return () => {
      stateChangeSubscriberRef.current?.unsubscribe();
    };
  }, []);

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
      window.open(`/event/${eventId}/workshop/${fsmId}?playerId=${playerId || playerIdFromRedux}&teamId=${teamId}`, '_blank');
    }
  }, [playerId, click, playerIdFromRedux])

  return (
    <Card /* main team card component*/
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
          {playerId ?
            <NotificationsActive sx={{ animation: "bellRing 1.4s infinite" }} color="primary" />
            :
            <SvgIcon sx={{ ...(isStarred ? { color: 'gold' } : { color: '#fea91a' }), ...((showStarAnimation && isStarred) && { animation: "starred 0.9s 1" }) }} onClick={() => { setShowStarAnimation(true); toggleStar(teamId); }} component={isStarred ? StarIcon : StarBorderIcon} />
          }
          {mentorsInRoom?.length > 0 ?
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
                {mentorsInRoom.map((mentor: any) => {
                  return <Tooltip key={mentor.get('MentorId')} title={mentor.get('MentorName')} arrow>
                    <Avatar
                      sx={{
                        backgroundColor: `${stringToColor(mentor.get('MentorName'))} !important`,
                      }}
                      alt={mentor.get('MentorName')}
                      src={mentor.get('MentorProfilePictureSrc') || '/margbarmuimargbarmui'} />
                  </Tooltip>
                }
                )}
              </AvatarGroup>
            </Stack>
            :
            <Typography align='right' sx={{ ":dir": 'rtl', fontSize: "8px", margin: '10px' }}>
              {`همیاری بالای سر این گروه نیست`}
            </Typography>
          }
        </Stack>

        <CardActionArea disabled> {/* this action holds each cards name and members */}
          <CardContent sx={{ paddingBottom: '0px' }}>
            <Typography marginLeft='5px' gutterBottom variant="h3">
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
                  {'این گروه هیچ عضوی ندارد.'}
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
            <>
              <Divider sx={{ margin: '15px auto 15px auto', width: '80%' }}></Divider>
              <Stack direction={'row'} sx={{ justifyContent: "space-between", fontSize: '10px', padding: '0 0 10px 0', alignItems: 'center' }}> {/* this stack is for time chip and the level team is in */}
                <Box>
                  {currentStateName ? `گام: ${currentStateName}` : 'گروه هنوز وارد کارگاه نشده است.'}
                </Box>
                {teamEnterTimeToState && <Tooltip title={'زمان حضور گروه در این گام'} arrow>
                  <span>
                    <Button disabled sx={{ padding: 0 }}>
                      <TimeChip startTime={teamEnterTimeToState} />
                    </Button>
                  </span>
                </Tooltip>}
              </Stack>
            </>

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
                سرزدن به گروه
              </Button>
            )}
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};


type TimeChipPropsType = {
  startTime: string
}

/* the time chip is the chip that has the timer in it that shows how long the team has been on current problem
we use the useEffect to initiate the timeInterval and later on we return the destructor to control the 'out'sideEffects*/
const TimeChip: FC<TimeChipPropsType> = (props) => {

  // TODO: fix toff where diff showed 3:30:30 more time
  const [elapsedTime, setElapsedTime] = useState(e2p(moment.utc(moment.duration(moment().diff(moment(props.startTime, 'HH:mm:ss'))).asMilliseconds()).format('HH:mm:ss')))
  useEffect(() => {
    const changeInterval = setInterval(() => { setElapsedTime(e2p(moment.utc(moment.duration(moment().diff(moment(props.startTime, 'HH:mm:ss'))).asMilliseconds()).format('HH:mm:ss'))) }, 1000)
    return (
      () => clearInterval(changeInterval)
    )
  }, [props.startTime]);
  return (
    <Chip
      variant="outlined"
      icon={<AccessTimeIcon />}
      label={elapsedTime}
      size="small"
      sx={{ fontSize: '10px', marginLeft: '10px', alignSelf: 'center', justifySelf: 'end', width: '80px', padding: '1px 2px', justifyContent: 'space-between' }}
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
