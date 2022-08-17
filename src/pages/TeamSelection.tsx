import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Stack,
  Skeleton,
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClearIcon from '@mui/icons-material/Clear';
import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import AreYouSure from '../components/Dialog/AreYouSure';
import MakeInvitation from '../components/organisms/dialogs/MakeInvitation';
import {
  createTeamAndJoinAction,
  deleteInvitationAction,
  deleteTeamAction,
  getMyInvitationsAction,
  getOneEventInfoAction,
  getOneRegistrationReceiptAction,
  getTeamAction,
  getTeamInvitationsAction,
  inviteSomeoneAction,
  respondInvitationAction,
} from '../redux/slices/events';
import { addNotificationAction } from '../redux/slices/notifications';
import Layout from '../containers/Layout';
import { Team, EventType } from '../types/models';

const PROFILE_PICTURE = process.env.PUBLIC_URL + '/images/profile.png';

type TeamSelectionPropsType = {
  getMyInvitations: any;
  deleteTeam: any;
  respondInvitation: any;
  deleteInvitation: any;
  addNotification: any;
  getOneEventInfo: any;
  getTeam: any;
  getTeamInvitations: any;
  getOneRegistrationReceipt: any;
  inviteSomeone: any;
  createTeamAndJoin: any;

  event: EventType;
  team: Team;
  myInvitations: any[],
  teamInvitations: any[],
  registrationReceipt: any,
  isFetching: boolean;
}

const TeamSelection: FC<TeamSelectionPropsType> = ({
  getMyInvitations,
  deleteTeam,
  respondInvitation,
  deleteInvitation,
  addNotification,
  getOneEventInfo,
  getTeam,
  getTeamInvitations,
  getOneRegistrationReceipt,
  inviteSomeone,
  createTeamAndJoin,

  event,
  team,
  myInvitations,
  teamInvitations,
  registrationReceipt,
  isFetching,
}) => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [isCreateInvitationDialogOpen, changeCreateInvitationDialogStatus] = useState(false);
  const [isDeleteTeamDialogOpen, changeDeleteTeamDialogStatus] = useState(false);
  const [respondingInvitationId, setRespondingInvitationId] = useState('');
  const [newTeamName, setNewTeamName] = useState('');
  const [isHead, setHeadStatus] = useState(false);

  useEffect(() => {
    getOneEventInfo({ eventId });
  }, []);

  useEffect(() => {
    if (event?.registration_receipt) {
      getOneRegistrationReceipt({ id: event.registration_receipt });
    }
    if (event?.id) {
      getMyInvitations({ registrationReceiptId: event.id });
    }
  }, [event]);

  useEffect(() => {
    if (registrationReceipt?.team) {
      const teamId = registrationReceipt.team;
      getTeam({ teamId });
      getTeamInvitations({ teamId });
    }
  }, [registrationReceipt]);

  if (event?.user_registration_status == 'NotRegistered') {
    navigate(`/event/${eventId}/registration_form/`);
  }

  useEffect(() => {
    if (registrationReceipt?.id && registrationReceipt?.id === team?.team_head) {
      setHeadStatus(true);
    } else {
      setHeadStatus(false);
    }
  }, [registrationReceipt, team]);

  const doCreateTeam = () => {
    if (!newTeamName) {
      addNotification({
        message: 'لطفاً نام تیم را وارد کنید.',
        type: 'error',
      });
      return;
    }
    createTeamAndJoin({
      name: newTeamName,
      registration_form: event?.registration_form,
    });
  };

  const submitDeleteTeam = (teamId) => {
    deleteTeam({ teamId }).then((response) => {
      if (response.type?.endsWith('fulfilled')) {
        window.location.reload();
      }
    })
  }

  return (
    <Layout>
      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-start"
        spacing={2}>
        <Grid item xs={12}>
          <Typography gutterBottom align="center" variant='h1'>
            {'تیم‌کشی'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Grid
            container
            justifyContent="center"
            alignItems="flex-end">
            <Paper sx={{ position: 'relative', padding: 1, width: '100%' }}>
              <Stack spacing={2}>
                {registrationReceipt && !registrationReceipt?.team && !team && (
                  <>
                    <Typography variant="caption">
                      {
                        'شما در تیمی عضو نیستید. یا خودتان یک تیم بسازید  و دیگران را به آن دعوت کنید، یا یکی از دعوت‌نامه‌هایی را که برایتان ارسال شده، قبول کنید.'
                      }
                    </Typography>
                    <Stack spacing={1}>
                      <Typography align="center" variant="h2">
                        {'ایجاد تیم جدید'}
                      </Typography>
                      <TextField
                        size="small"
                        fullWidth
                        variant="outlined"
                        value={newTeamName}
                        label="نام تیم"
                        onChange={(e) => setNewTeamName(e.target.value)}
                      />
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={doCreateTeam}>
                        {'ایجاد'}
                      </Button>
                    </Stack>
                  </>
                )}
                {team &&
                  <>
                    <Typography align="center" variant="h2" gutterBottom>
                      {`تیم «${team.name}»`}
                    </Typography>
                    {(
                      <Box sx={{ position: 'absolute', right: 0, top: 0, marginTop: '0px !important' }}>
                        <Tooltip title="حذف تیم" arrow>
                          <IconButton
                            size="small"
                            onClick={() => changeDeleteTeamDialogStatus(true)}>
                            <ClearIcon
                              style={{ fontSize: '20px', color: 'red' }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    )}
                    {team?.members?.map((member, index) => {
                      return (
                        <Stack
                          justifyContent="center"
                          alignItems="center"
                          key={index}>
                          <img
                            alt=""
                            style={{ borderRadius: '5px', objectFit: 'cover' }}
                            src={member.profile_picture || PROFILE_PICTURE}
                            width="200px"
                            height="200px"
                          />
                          <Typography align="center">
                            {`${member.first_name} ${member.last_name}`}
                          </Typography>
                        </Stack>
                      );
                    })}
                  </>
                }
                {!registrationReceipt && !team &&
                  <Stack alignItems='center' justifyContent='center' spacing={2}>
                    <Skeleton width='80%' height={60} animation="wave" />
                    <Stack >
                      <Skeleton variant='rectangular' width={150} height={150} />
                      <Skeleton animation="wave" width='100%' />
                    </Stack>
                  </Stack>
                }
              </Stack>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Paper>
            <Stack sx={{ position: 'relative', paddingTop: 1 }}>
              <Typography align="center" variant="h2" gutterBottom>
                {'دعوت‌نامه‌های ارسالی'}
              </Typography>
              {isHead && (
                <Box sx={{ position: 'absolute', right: 0, top: 0 }}>
                  <Tooltip title={'دعوت عضو جدید به تیم'} arrow>
                    <IconButton
                      size="small"
                      onClick={
                        team?.id
                          ? () => {
                            changeCreateInvitationDialogStatus(true);
                          }
                          : () => { }
                      }>
                      <AddCircleOutlineIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                </Box>
              )}
              <Divider variant="middle" />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">فرد دعوت‌شده</TableCell>
                      <TableCell align="center">لغو دعوت</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {teamInvitations?.map((invitation, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {`${invitation?.first_name} ${invitation.last_name}`}
                        </TableCell>
                        <TableCell align="center">
                          <Tooltip title="پس‌گرفتن دعوت‌نامه" arrow>
                            <IconButton
                              size="small"
                              onClick={() => {
                                deleteInvitation({
                                  invitationId: invitation?.id,
                                });
                              }}>
                              <ClearIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Paper>

          <Paper sx={{ marginTop: 4 }}>
            <Stack sx={{ paddingTop: 1 }}>
              <Typography align="center" variant="h2" gutterBottom>
                {'دعوت‌نامه‌های دریافتی'}
              </Typography>
              <Divider variant="middle" />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">تیم</TableCell>
                      <TableCell align="center">نام سرگروه</TableCell>
                      <TableCell align="center">شماره تلفن سرگروه</TableCell>
                      <TableCell align="center">پاسخ</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {myInvitations.map((invitation, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">
                          {invitation.team_name}
                        </TableCell>
                        <TableCell align="center">
                          {`${invitation.head_first_name} ${invitation.head_last_name}`}
                        </TableCell>
                        <TableCell align="center">
                          {invitation.head_phone_number}
                        </TableCell>
                        <TableCell align="center">
                          {invitation.has_accepted && (
                            <IconButton size="small" disabled={team}>
                              <CheckCircleIcon style={{ color: '#00d130' }} />
                            </IconButton>
                          )}
                          {!invitation.has_accepted && (
                            <Tooltip arrow title={'پذیرفتن درخواست'}>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  setRespondingInvitationId(invitation?.id);
                                }}>
                                <CheckCircleIcon
                                  color={
                                    team === invitation.team ? 'secondary' : null
                                  }
                                />
                              </IconButton>
                            </Tooltip>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <MakeInvitation
        open={isCreateInvitationDialogOpen}
        inviteSomeone={inviteSomeone}
        handleClose={() => changeCreateInvitationDialogStatus(false)}
        teamId={team?.id}
      />
      <AreYouSure
        open={isDeleteTeamDialogOpen}
        handleClose={() =>
          changeDeleteTeamDialogStatus(!isDeleteTeamDialogOpen)
        }
        callBackFunction={() => submitDeleteTeam(team.id)}
      />
      <AreYouSure
        open={respondingInvitationId}
        handleClose={() => setRespondingInvitationId('')}
        callBackFunction={() =>
          respondInvitation({
            invitationId: respondingInvitationId,
            has_accepted: 'true',
          })
        }
      />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  event: state.events.event,
  registrationReceipt: state.events.registrationReceipt,
  team: state.events.team,
  //todo: handle not showing self invitation, in back:
  myInvitations: state.events.myInvitations.filter(
    (invitation) => invitation.head_phone_number !== invitation.phone_number
  ),
  teamInvitations: state.events.teamInvitations,
  isFetching: state.events.isFetching,
});

export default connect(
  mapStateToProps,
  {
    getMyInvitations: getMyInvitationsAction,
    deleteTeam: deleteTeamAction,
    respondInvitation: respondInvitationAction,
    deleteInvitation: deleteInvitationAction,
    createTeamAndJoin: createTeamAndJoinAction,
    inviteSomeone: inviteSomeoneAction,
    getTeamInvitations: getTeamInvitationsAction,
    getOneEventInfo: getOneEventInfoAction,
    addNotification: addNotificationAction,
    getOneRegistrationReceipt: getOneRegistrationReceiptAction,
    getTeam: getTeamAction,
  }
)(TeamSelection);
